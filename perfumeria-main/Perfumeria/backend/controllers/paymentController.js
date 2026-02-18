const { MercadoPagoConfig, Preference } = require('mercadopago');
const Cart = require('../models/Cart'); // Import Cart model to clear it on success

// Initialize Mercado Pago
// Ensure token exists
if (!process.env.MP_ACCESS_TOKEN) {
    console.error("CRITICAL: MP_ACCESS_TOKEN is missing in environment variables.");
}

const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });

exports.createPreference = async (req, res) => {
    try {
        const { items, payer } = req.body;
        const userId = req.user ? req.user.id : null;

        console.log("Creating preference with items:", items.length);
        console.log("Payer info:", payer);

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ error: 'No items provided for payment' });
        }

        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

        // Prepare items for Mercado Pago
        const mpItems = items.map(item => {
            // Fix potential "undefined - Name" issue from frontend
            let title = item.title;
            if (!title || title.startsWith("undefined -")) {
                title = item.name || "Producto sin nombre";
            }
            return {
                id: item.id || item._id,
                title: title,
                quantity: Number(item.quantity),
                unit_price: Number(item.price),
                currency_id: 'ARS',
            };
        });

        // Prepare payer info - SAFE DEFAULTS
        const mpPayer = {
            name: payer?.name || 'Usuario',
            surname: payer?.surname || 'Generico',
            email: payer?.email || 'test_user_123456@testuser.com',
            phone: {
                area_code: "11",
                number: payer?.phone || "11111111"
            },
            identification: payer?.identification ? {
                type: "DNI",
                number: typeof payer.identification === 'string' ? payer.identification : payer.identification.number
            } : undefined
        };

        // Add address only if provided
        if (payer?.address) {
            mpPayer.address = {
                zip_code: payer.address.zip_code,
                street_name: payer.address.street_name,
                street_number: Number(payer.address.street_number)
            };
        }

        // Preparar datos de la orden para external_reference
        const orderData = {
            userId: userId,
            customerInfo: {
                name: payer?.name || 'Usuario',
                lastName: payer?.surname || 'Generico',
                email: payer?.email || 'test_user_123456@testuser.com',
                phone: payer?.phone || '11111111',
                dni: payer?.identification ?
                    (typeof payer.identification === 'string' ? payer.identification : payer.identification.number)
                    : 'N/A'
            },
            items: items.map(item => ({
                product: item.id || item._id,
                name: item.title || item.name,
                brand: item.brand || 'N/A',
                price: Number(item.price),
                quantity: Number(item.quantity),
                image: item.image || item.img
            })),
            deliveryType: 'pickup'
        };

        // Preference configuration
        const preferenceParams = {
            body: {
                items: mpItems,
                payer: mpPayer,
                back_urls: {
                    success: "http://localhost:5173/success",
                    failure: "http://localhost:5173/failure",
                    pending: "http://localhost:5173/pending"
                },
                external_reference: JSON.stringify(orderData),
                statement_descriptor: "Perfumeria Arabian"
            }
        };

        console.log("Preference Body to be sent:", JSON.stringify(preferenceParams.body, null, 2));

        const preference = new Preference(client);
        const result = await preference.create(preferenceParams);

        console.log('Preference created successfully:', result.id);
        res.json({ id: result.id, init_point: result.init_point });
    } catch (err) {
        console.error('Error creating preference:', err);
        // Log the actual response from Mercado Pago if available
        if (err.cause) {
            console.error('MP Error Cause:', JSON.stringify(err.cause, null, 2));
        }
        res.status(500).json({ error: 'Error al crear la preferencia de pago', details: err.message, cause: err.cause });
    }
};

exports.receiveWebhook = async (req, res) => {
    try {
        const query = req.query;
        const topic = query.topic || query.type;

        console.log('Webhook received:', { topic, query });

        if (topic === 'payment') {
            const paymentId = query.id || query['data.id'];
            console.log('Payment notification received:', paymentId);

            // Importar módulos necesarios
            const { Payment } = require('mercadopago');
            const Order = require('../models/Order');
            const Product = require('../models/Product');

            try {
                // Obtener información del pago desde Mercado Pago
                const payment = new Payment(client);
                const paymentData = await payment.get({ id: paymentId });

                console.log('Payment data:', {
                    id: paymentData.id,
                    status: paymentData.status,
                    external_reference: paymentData.external_reference
                });

                // Solo procesar pagos aprobados
                if (paymentData.status === 'approved') {
                    // Verificar si ya existe una orden con este payment ID
                    const existingOrder = await Order.findOne({
                        'paymentInfo.mercadoPagoId': paymentId
                    });

                    if (existingOrder) {
                        console.log('Order already exists for this payment:', existingOrder.orderNumber);
                        return res.sendStatus(200);
                    }

                    // Extraer información del external_reference si existe
                    let orderData;
                    try {
                        orderData = paymentData.external_reference ?
                            JSON.parse(paymentData.external_reference) : null;
                    } catch (e) {
                        console.log('Could not parse external_reference:', e.message);
                    }

                    // Si tenemos datos de la orden, crearla
                    if (orderData && orderData.items && orderData.customerInfo) {
                        // Validar stock antes de crear la orden
                        for (const item of orderData.items) {
                            const product = await Product.findById(item.product);
                            if (!product) {
                                console.error(`Product not found: ${item.product}`);
                                continue;
                            }
                            if (product.stock < item.quantity) {
                                console.error(`Insufficient stock for ${product.name}`);
                                // Aún así creamos la orden pero con estado especial
                            }
                        }

                        // Crear la orden
                        const order = new Order({
                            user: orderData.userId || null,
                            customerInfo: orderData.customerInfo,
                            items: orderData.items,
                            total: paymentData.transaction_amount,
                            deliveryType: orderData.deliveryType || 'pickup',
                            status: 'confirmed',
                            paymentInfo: {
                                mercadoPagoId: paymentId,
                                status: paymentData.status,
                                paymentType: paymentData.payment_type_id
                            }
                        });

                        await order.save();
                        console.log('Order created successfully:', order.orderNumber);

                        // Reducir stock de productos
                        for (const item of orderData.items) {
                            await Product.findByIdAndUpdate(
                                item.product,
                                { $inc: { stock: -item.quantity } }
                            );
                            console.log(`Stock reduced for product ${item.product}: -${item.quantity}`);
                        }
                    } else {
                        console.log('No order data in external_reference, skipping order creation');
                    }
                }
            } catch (paymentError) {
                console.error('Error processing payment webhook:', paymentError);
                // Aún así respondemos 200 para que Mercado Pago no reintente
            }
        }

        res.sendStatus(200);
    } catch (err) {
        console.error('Webhook error:', err);
        res.sendStatus(500);
    }
};

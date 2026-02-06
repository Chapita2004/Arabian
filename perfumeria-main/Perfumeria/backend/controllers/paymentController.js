const { MercadoPagoConfig, Preference } = require('mercadopago');

// Initialize Mercado Pago
const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });

exports.createPreference = async (req, res) => {
    try {
        const { items } = req.body;

        // Map items to Mercado Pago format
        const preferenceParams = {
            body: {
                items: items.map(item => ({
                    id: item.id,
                    title: item.title,
                    quantity: Number(item.quantity),
                    unit_price: Number(item.price), // Ensure it is a number
                    currency_id: 'ARS',
                })),
                back_urls: {
                    success: "http://localhost:5173/success",
                    failure: "http://localhost:5173/failure",
                    pending: "http://localhost:5173/pending"
                },
                auto_return: "approved",
            }
        };

        const preference = new Preference(client);
        const result = await preference.create(preferenceParams);

        res.json({ id: result.id });
    } catch (err) {
        console.error('Error creating preference:', err); // Debug error
        res.status(500).json({ error: 'Error al crear la preferencia de pago', details: err.message });
    }
};

exports.receiveWebhook = async (req, res) => {
    try {
        // Handle webhook notification
        const query = req.query;
        const topic = query.topic || query.type;

        if (topic === 'payment') {
            const paymentId = query.id || query['data.id'];
            console.log('Payment received:', paymentId);
            // TODO: Fetch payment status using Payment(client).get({ id: paymentId }) and update order status in DB
        }

        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

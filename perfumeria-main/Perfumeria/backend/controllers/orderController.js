const Order = require('../models/Order');
const Product = require('../models/Product');

// @desc    Crear nueva orden
// @route   POST /api/orders
// @access  Private
exports.createOrder = async (req, res) => {
    try {
        const { customerInfo, items, total, deliveryType, paymentInfo } = req.body;

        // Validar que haya items
        if (!items || items.length === 0) {
            return res.status(400).json({ error: 'No items in order' });
        }

        // Validar stock de cada producto
        for (const item of items) {
            const product = await Product.findById(item.product);
            if (!product) {
                return res.status(404).json({ error: `Product ${item.name} not found` });
            }
            if (product.stock < item.quantity) {
                return res.status(400).json({
                    error: `Insufficient stock for ${product.name}. Available: ${product.stock}`
                });
            }
        }

        // Crear orden
        const order = new Order({
            user: req.user ? req.user.id : null,
            customerInfo,
            items,
            total,
            deliveryType,
            paymentInfo,
            status: paymentInfo?.status === 'approved' ? 'confirmed' : 'pending'
        });

        await order.save();

        // Si el pago está aprobado, reducir stock
        if (paymentInfo?.status === 'approved') {
            for (const item of items) {
                await Product.findByIdAndUpdate(
                    item.product,
                    { $inc: { stock: -item.quantity } }
                );
            }
        }

        res.status(201).json(order);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Error creating order', details: error.message });
    }
};

// @desc    Obtener órdenes del usuario autenticado
// @route   GET /api/orders/my-orders
// @access  Private
exports.getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id })
            .populate('items.product', 'name brand image')
            .sort({ createdAt: -1 });

        res.json(orders);
    } catch (error) {
        console.error('Error fetching user orders:', error);
        res.status(500).json({ error: 'Error fetching orders', details: error.message });
    }
};

// @desc    Obtener todas las órdenes (Admin)
// @route   GET /api/orders
// @access  Private/Admin
exports.getAllOrders = async (req, res) => {
    try {
        const { status, limit = 50, page = 1 } = req.query;

        const query = status ? { status } : {};

        const orders = await Order.find(query)
            .populate('user', 'name email')
            .populate('items.product', 'name brand image')
            .sort({ createdAt: -1 })
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit));

        const total = await Order.countDocuments(query);

        res.json({
            orders,
            pagination: {
                total,
                page: parseInt(page),
                pages: Math.ceil(total / parseInt(limit))
            }
        });
    } catch (error) {
        console.error('Error fetching all orders:', error);
        res.status(500).json({ error: 'Error fetching orders', details: error.message });
    }
};

// @desc    Obtener orden por ID
// @route   GET /api/orders/:id
// @access  Private
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('user', 'name email')
            .populate('items.product', 'name brand image stock');

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        // Verificar que el usuario sea el dueño de la orden o sea admin
        if (req.user.role !== 'admin' && order.user && order.user._id.toString() !== req.user.id) {
            return res.status(403).json({ error: 'Access denied' });
        }

        res.json(order);
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ error: 'Error fetching order', details: error.message });
    }
};

// @desc    Actualizar estado de orden (Admin)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
exports.updateOrderStatus = async (req, res) => {
    try {
        const { status, notes } = req.body;

        const validStatuses = ['pending', 'confirmed', 'ready', 'completed', 'cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }

        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        order.status = status;
        if (notes) {
            order.notes = notes;
        }

        await order.save();

        res.json(order);
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ error: 'Error updating order', details: error.message });
    }
};

// @desc    Obtener estadísticas de órdenes (Admin)
// @route   GET /api/orders/stats
// @access  Private/Admin
exports.getOrderStats = async (req, res) => {
    try {
        const totalOrders = await Order.countDocuments();
        const pendingOrders = await Order.countDocuments({ status: 'pending' });
        const confirmedOrders = await Order.countDocuments({ status: 'confirmed' });
        const readyOrders = await Order.countDocuments({ status: 'ready' });
        const completedOrders = await Order.countDocuments({ status: 'completed' });

        // Calcular ingresos totales de órdenes completadas
        const completedOrdersData = await Order.find({ status: 'completed' });
        const totalRevenue = completedOrdersData.reduce((sum, order) => sum + order.total, 0);

        // Órdenes de hoy
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayOrders = await Order.countDocuments({
            createdAt: { $gte: today }
        });

        res.json({
            totalOrders,
            pendingOrders,
            confirmedOrders,
            readyOrders,
            completedOrders,
            totalRevenue,
            todayOrders
        });
    } catch (error) {
        console.error('Error fetching order stats:', error);
        res.status(500).json({ error: 'Error fetching stats', details: error.message });
    }
};

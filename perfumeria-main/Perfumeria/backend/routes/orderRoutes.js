const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

// @route   GET /api/orders/stats
// @desc    Get order statistics
// @access  Private/Admin
router.get('/stats', authMiddleware, adminMiddleware, orderController.getOrderStats);

// @route   GET /api/orders/my-orders
// @desc    Get current user's orders
// @access  Private
router.get('/my-orders', authMiddleware, orderController.getMyOrders);

// @route   GET /api/orders
// @desc    Get all orders (Admin)
// @access  Private/Admin
router.get('/', authMiddleware, adminMiddleware, orderController.getAllOrders);

// @route   POST /api/orders
// @desc    Create new order
// @access  Private (or Public for guest checkout)
router.post('/', orderController.createOrder);

// @route   GET /api/orders/:id
// @desc    Get order by ID
// @access  Private
router.get('/:id', authMiddleware, orderController.getOrderById);

// @route   PUT /api/orders/:id/status
// @desc    Update order status
// @access  Private/Admin
router.put('/:id/status', authMiddleware, adminMiddleware, orderController.updateOrderStatus);

module.exports = router;

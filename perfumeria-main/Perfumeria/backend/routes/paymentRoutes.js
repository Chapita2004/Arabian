const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// @route   POST api/payment/create-preference
// @desc    Create Mercado Pago preference
// @access  Public (or Private if you require login)
router.post('/create-preference', paymentController.createPreference);

// @route   POST api/payment/webhook
// @desc    Receive webhook notifications
// @access  Public
router.post('/webhook', paymentController.receiveWebhook);

module.exports = router;

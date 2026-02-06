const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const auth = require('../middlewares/authMiddleware');

router.get('/', auth, cartController.getCart);
router.post('/', auth, cartController.updateCart);

module.exports = router;

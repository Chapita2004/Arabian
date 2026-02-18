const express = require('express');
const router = express.Router();
const { createReview, getProductReviews, deleteReview, checkUserReview } = require('../controllers/reviewController');
const protect = require('../middlewares/authMiddleware');

router.post('/', protect, createReview);
router.get('/product/:productId', getProductReviews);
router.get('/check/:productId', protect, checkUserReview);
router.delete('/:id', protect, deleteReview);

module.exports = router;

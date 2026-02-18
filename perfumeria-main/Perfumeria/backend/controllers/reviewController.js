const Review = require('../models/Review');
const Product = require('../models/Product');

// Helper to update product average rating
const updateProductRating = async (productId) => {
    try {
        const reviews = await Review.find({ product: productId });

        if (reviews.length === 0) {
            await Product.findByIdAndUpdate(productId, {
                averageRating: 0,
                reviewCount: 0
            });
            return;
        }

        const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
        const average = sum / reviews.length;

        await Product.findByIdAndUpdate(productId, {
            averageRating: Math.round(average * 10) / 10,
            reviewCount: reviews.length
        });
    } catch (error) {
        console.error('Error updating product rating:', error);
    }
};

exports.createReview = async (req, res) => {
    try {
        console.log('[ReviewController] Creating review:', req.body);
        const { productId, rating, comment } = req.body;

        // Validation
        if (!rating || rating < 1 || rating > 5) {
            return res.status(400).json({ message: 'Rating must be between 1 and 5' });
        }

        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        const userId = req.user.id;

        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check for existing review
        const existingReview = await Review.findOne({ user: userId, product: productId });
        if (existingReview) {
            return res.status(400).json({ message: 'You have already reviewed this product' });
        }

        // Create review
        const review = await Review.create({
            user: userId,
            product: productId,
            rating,
            comment
        });

        // Update product stats
        await updateProductRating(productId);

        // Return populated review
        await review.populate('user', 'name');

        console.log('[ReviewController] Review created successfully:', review._id);
        res.status(201).json(review);
    } catch (error) {
        console.error('Create Review Error:', error);
        res.status(500).json({
            message: 'Server error creating review',
            error: error.message,
            stack: process.env.NODE_ENV === 'production' ? null : error.stack
        });
    }
};

exports.getProductReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ product: req.params.productId })
            .populate('user', 'name')
            .sort({ createdAt: -1 });

        res.json(reviews);
    } catch (error) {
        console.error('Get Reviews Error:', error);
        res.status(500).json({ message: 'Server error fetching reviews' });
    }
};

exports.deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // Check ownership or admin (assuming role is on req.user)
        // Adjust role check based on your User model, usually it's req.user.role
        if (review.user.toString() !== req.user.id && req.user.role !== 'admin' && req.user.role !== 'superadmin') {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const productId = review.product;
        await review.deleteOne();

        await updateProductRating(productId);

        res.json({ message: 'Review removed' });
    } catch (error) {
        console.error('Delete Review Error:', error);
        res.status(500).json({ message: 'Server error deleting review' });
    }
};

// Check if user has reviewed logic can be useful for UI state
exports.checkUserReview = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.json({ hasReviewed: false });
        }
        const review = await Review.findOne({ user: req.user.id, product: req.params.productId });
        res.json({ hasReviewed: !!review, review });
    } catch (error) {
        console.error('Check Review Error:', error);
        // Don't crash UI, just return false
        res.json({ hasReviewed: false });
    }
}

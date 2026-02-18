import api from './api';

const ReviewService = {
    // Create a review
    createReview: async (productId, rating, comment) => {
        const response = await api.post('/reviews', { productId, rating, comment });
        return response.data;
    },

    // Get all reviews for a product
    getProductReviews: async (productId) => {
        const response = await api.get(`/reviews/product/${productId}`);
        return response.data;
    },

    // Check if user has reviewed a product
    checkUserReview: async (productId) => {
        try {
            const response = await api.get(`/reviews/check/${productId}`);
            return response.data;
        } catch (error) {
            console.error('Error checking review status', error);
            return { hasReviewed: false };
        }
    },

    // Delete a review
    deleteReview: async (reviewId) => {
        const response = await api.delete(`/reviews/${reviewId}`);
        return response.data;
    }
};

export default ReviewService;

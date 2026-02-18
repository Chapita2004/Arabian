import React, { useState, useEffect } from 'react';
import ReviewService from '../api/review.service';
import StarRating from './StarRating';

const ReviewList = ({ productId, refreshTrigger }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchReviews();
    }, [productId, refreshTrigger]);

    const fetchReviews = async () => {
        try {
            const data = await ReviewService.getProductReviews(productId);
            setReviews(data);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        } finally {
            setLoading(false);
        }
    };

    // Native date formatting to avoid date-fns dependency
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    };

    if (loading) {
        return <div className="text-center py-8 text-white/40 animate-pulse">Cargando reseñas...</div>;
    }

    if (reviews.length === 0) {
        return (
            <div className="text-center py-12 border border-white/5 rounded-lg bg-white/[0.02]">
                <p className="text-white/50 text-lg">Aún no hay reseñas.</p>
                <p className="text-white/30 text-sm mt-2">Sé el primero en compartir tu opinión.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-light text-white mb-6 font-serif border-b border-white/10 pb-4">
                Reseñas de Clientes <span className="text-[#c2a35d] text-base ml-2">({reviews.length})</span>
            </h3>

            <div className="grid gap-6">
                {reviews.map((review) => (
                    <div key={review._id} className="bg-black/40 border border-white/5 p-6 rounded-lg hover:border-white/10 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h4 className="font-medium text-white">{review.user?.name || 'Usuario'}</h4>
                                <div className="text-white/30 text-xs mt-1">
                                    {formatDate(review.createdAt)}
                                </div>
                            </div>
                            <StarRating rating={review.rating} size="sm" />
                        </div>

                        {review.comment && (
                            <p className="text-white/80 text-sm leading-relaxed border-t border-white/5 pt-4 mt-2">
                                {review.comment}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewList;

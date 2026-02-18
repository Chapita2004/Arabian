import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StarRating from './StarRating';
import ReviewService from '../api/review.service';
import { useAuth } from '../context/AuthContext';

const ReviewForm = ({ productId, onReviewSubmitted }) => {
    const { user } = useAuth();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [hasReviewed, setHasReviewed] = useState(false);
    const [checkingStatus, setCheckingStatus] = useState(true);

    useEffect(() => {
        if (user && productId) {
            checkReviewStatus();
        } else {
            setCheckingStatus(false);
        }
    }, [user, productId]);

    const checkReviewStatus = async () => {
        try {
            const data = await ReviewService.checkUserReview(productId);
            setHasReviewed(data.hasReviewed);
        } catch (err) {
            console.error(err);
        } finally {
            setCheckingStatus(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (rating === 0) {
            setError('Por favor selecciona una calificación (estrellas).');
            return;
        }

        setLoading(true);

        try {
            await ReviewService.createReview(productId, rating, comment);
            setHasReviewed(true);
            setRating(0);
            setComment('');
            if (onReviewSubmitted) {
                onReviewSubmitted();
            }
        } catch (err) {
            console.error(err);
            const backendError = err.response?.data?.error;
            const message = err.response?.data?.message || 'Error al publicar la reseña.';
            setError(backendError ? `${message}: ${backendError}` : message);
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return (
            <div className="bg-black/40 border border-white/5 p-6 rounded-lg text-center backdrop-blur-sm">
                <p className="text-white/60">
                    <a href="/login" className="text-[#c2a35d] hover:underline">Inicia sesión</a> para dejar una reseña.
                </p>
            </div>
        );
    }

    if (checkingStatus) return null; // Or a small spinner

    if (hasReviewed) {
        return (
            <div className="bg-[#c2a35d]/10 border border-[#c2a35d]/30 p-6 rounded-lg text-center">
                <p className="text-[#c2a35d] font-medium">¡Gracias por tu reseña!</p>
                <p className="text-white/60 text-sm mt-1">Ya has compartido tu opinión sobre este producto.</p>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/60 border border-white/10 p-6 rounded-lg backdrop-blur-md"
        >
            <h3 className="text-xl font-light text-white mb-6 font-serif">Escribe una Reseña</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-white/80">Calificación</label>
                    <StarRating
                        rating={rating}
                        onRatingChange={setRating}
                        interactive={true}
                        size="lg"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="comment" className="block text-sm font-medium text-white/80">
                        Tu opinión <span className="text-white/40 font-normal">(opcional)</span>
                    </label>
                    <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        maxLength={500}
                        rows={4}
                        placeholder="¿Qué te pareció el aroma? ¿Cuánto dura?"
                        className="w-full bg-white/5 border border-white/10 rounded-md p-3 text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#c2a35d] focus:border-[#c2a35d] transition-all resize-none"
                    />
                    <div className="text-right text-xs text-white/40">
                        {comment.length} / 500
                    </div>
                </div>

                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-red-400 text-sm bg-red-500/10 p-3 rounded border border-red-500/20"
                        >
                            {error}
                        </motion.div>
                    )}
                </AnimatePresence>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#c2a35d] text-black font-bold py-3 px-4 rounded-md hover:bg-[#d4b46e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center uppercase tracking-wide text-sm"
                >
                    {loading ? (
                        <span className="flex items-center gap-2">
                            <svg className="animate-spin h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Publicando...
                        </span>
                    ) : 'Publicar Reseña'}
                </button>
            </form>
        </motion.div>
    );
};

export default ReviewForm;

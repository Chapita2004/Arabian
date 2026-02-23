import React from 'react';
import { Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import StarRating from './StarRating';
import { useAuth } from '../context/authContext';

const ReviewCard = ({ review, onDelete }) => {
    const { user } = useAuth();

    // Check if current user can delete this review
    const canDelete = user && (
        review.user._id === user.id ||
        ['admin', 'superadmin'].includes(user.role)
    );

    // Format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Hoy';
        if (diffDays === 1) return 'Ayer';
        if (diffDays < 7) return `Hace ${diffDays} días`;
        if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} semanas`;
        if (diffDays < 365) return `Hace ${Math.floor(diffDays / 30)} meses`;
        return `Hace ${Math.floor(diffDays / 365)} años`;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#0a0a0a] border border-white/5 p-4 md:p-6 hover:border-[#c2a35d]/30 transition-all"
        >
            <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        <p className="text-white font-bold text-sm uppercase tracking-wider">
                            {review.user?.name || 'Usuario'}
                        </p>
                        <StarRating rating={review.rating} size="sm" interactive={false} />
                    </div>
                    <p className="text-white/50 text-xs">
                        {formatDate(review.createdAt)}
                    </p>
                </div>

                {canDelete && (
                    <button
                        onClick={() => onDelete(review._id)}
                        className="text-white/30 hover:text-red-500 transition-colors"
                        title="Eliminar reseña"
                    >
                        <Trash2 size={16} />
                    </button>
                )}
            </div>

            {review.comment && (
                <p className="text-white/80 text-sm leading-relaxed">
                    {review.comment}
                </p>
            )}
        </motion.div>
    );
};

export default ReviewCard;

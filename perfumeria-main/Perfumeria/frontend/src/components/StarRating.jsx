import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const StarRating = ({
    rating = 0,
    onRatingChange = null,
    interactive = false,
    size = 'md',
    showNumber = false
}) => {
    const [hoverRating, setHoverRating] = React.useState(0);

    const sizeClasses = {
        sm: 'w-3.5 h-3.5',
        md: 'w-5 h-5',
        lg: 'w-6 h-6'
    };

    const handleClick = (value) => {
        if (interactive && onRatingChange) {
            onRatingChange(value);
        }
    };

    const handleMouseEnter = (value) => {
        if (interactive) {
            setHoverRating(value);
        }
    };

    const handleMouseLeave = () => {
        if (interactive) {
            setHoverRating(0);
        }
    };

    const displayRating = interactive && hoverRating > 0 ? hoverRating : rating;

    return (
        <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((value) => {
                const isFilled = value <= displayRating;
                const isHalfFilled = !isFilled && value - 0.5 <= displayRating;

                return (
                    <motion.button
                        key={value}
                        type="button"
                        onClick={() => handleClick(value)}
                        onMouseEnter={() => handleMouseEnter(value)}
                        onMouseLeave={handleMouseLeave}
                        disabled={!interactive}
                        whileHover={interactive ? { scale: 1.1 } : {}}
                        whileTap={interactive ? { scale: 0.9 } : {}}
                        className={`${interactive ? 'cursor-pointer' : 'cursor-default'} transition-colors`}
                    >
                        {isHalfFilled ? (
                            <div className="relative">
                                <Star className={`${sizeClasses[size]} text-white/20`} />
                                <div className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
                                    <Star className={`${sizeClasses[size]} text-[#c2a35d]`} fill="#c2a35d" />
                                </div>
                            </div>
                        ) : (
                            <Star
                                className={`${sizeClasses[size]} ${isFilled ? 'text-[#c2a35d]' : 'text-white/20'
                                    }`}
                                fill={isFilled ? '#c2a35d' : 'none'}
                            />
                        )}
                    </motion.button>
                );
            })}
            {showNumber && (
                <span className="text-white/70 text-sm ml-1">
                    {rating.toFixed(1)}
                </span>
            )}
        </div>
    );
};

export default StarRating;

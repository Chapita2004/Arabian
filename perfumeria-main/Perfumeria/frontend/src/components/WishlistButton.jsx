import React from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useWishlist } from '../context/WishlistContext';

const WishlistButton = ({ product, size = 'md', showLabel = false, className = '' }) => {
    const { isInWishlist, toggleWishlist } = useWishlist();
    const productId = product._id || product.id;
    const inWishlist = isInWishlist(productId);

    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
        lg: 'w-6 h-6'
    };

    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(product);
    };

    return (
        <motion.button
            onClick={handleClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`group flex items-center gap-2 transition-colors ${className}`}
            aria-label={inWishlist ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        >
            <Heart
                className={`${sizeClasses[size]} transition-all ${inWishlist
                        ? 'fill-[#c2a35d] text-[#c2a35d]'
                        : 'text-white/50 group-hover:text-[#c2a35d]'
                    }`}
                fill={inWishlist ? 'currentColor' : 'none'}
            />
            {showLabel && (
                <span className={`text-xs uppercase tracking-wider ${inWishlist ? 'text-[#c2a35d]' : 'text-white/70'
                    }`}>
                    {inWishlist ? 'En Favoritos' : 'Agregar a Favoritos'}
                </span>
            )}
        </motion.button>
    );
};

export default WishlistButton;

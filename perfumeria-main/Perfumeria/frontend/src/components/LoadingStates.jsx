import React from 'react';
import { motion } from 'framer-motion';

// Spinner Component
export const Spinner = ({ size = 'md', color = '#c2a35d' }) => {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
        xl: 'w-16 h-16'
    };

    return (
        <motion.div
            className={`${sizeClasses[size]} border-2 border-white/10 border-t-[${color}] rounded-full`}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            style={{ borderTopColor: color }}
        />
    );
};

// Full Page Loader
export const PageLoader = ({ message = 'Cargando...' }) => {
    return (
        <div className="min-h-screen bg-perfume-pattern flex items-center justify-center">
            <div className="text-center">
                <Spinner size="xl" />
                <p className="text-white/70 text-sm mt-4 uppercase tracking-wider">
                    {message}
                </p>
            </div>
        </div>
    );
};

// Skeleton for Product Card
export const ProductCardSkeleton = () => {
    return (
        <div className="bg-[#0a0a0a] border border-white/5 p-4 animate-pulse">
            {/* Image skeleton */}
            <div className="aspect-[3/4] bg-white/5 mb-4" />

            {/* Brand skeleton */}
            <div className="h-3 bg-white/5 w-1/2 mx-auto mb-2" />

            {/* Name skeleton */}
            <div className="h-4 bg-white/5 w-3/4 mx-auto mb-3" />

            {/* Price skeleton */}
            <div className="space-y-2 mb-3">
                <div className="h-3 bg-white/5 w-1/3 mx-auto" />
                <div className="h-5 bg-white/5 w-1/2 mx-auto" />
                <div className="h-2 bg-white/5 w-2/3 mx-auto" />
            </div>

            {/* Button skeleton */}
            <div className="h-10 bg-white/5 w-full" />
        </div>
    );
};

// Skeleton for Review Card
export const ReviewCardSkeleton = () => {
    return (
        <div className="bg-[#0a0a0a] border border-white/5 p-6 animate-pulse">
            <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                    <div className="h-4 bg-white/5 w-1/4 mb-2" />
                    <div className="h-3 bg-white/5 w-1/6" />
                </div>
            </div>
            <div className="space-y-2">
                <div className="h-3 bg-white/5 w-full" />
                <div className="h-3 bg-white/5 w-5/6" />
            </div>
        </div>
    );
};

// Inline Loader (for buttons)
export const InlineLoader = ({ text = 'Cargando...' }) => {
    return (
        <div className="flex items-center justify-center gap-2">
            <Spinner size="sm" />
            <span>{text}</span>
        </div>
    );
};

// Empty State Component
export const EmptyState = ({
    icon: Icon,
    title,
    message,
    actionLabel,
    onAction
}) => {
    return (
        <div className="bg-[#0a0a0a] border border-white/5 p-12 text-center">
            {Icon && <Icon className="w-16 h-16 text-white/20 mx-auto mb-4" />}
            <h3 className="text-white text-lg font-light uppercase tracking-wider mb-2">
                {title}
            </h3>
            <p className="text-white/50 text-sm mb-6">
                {message}
            </p>
            {actionLabel && onAction && (
                <button
                    onClick={onAction}
                    className="bg-[#c2a35d] text-black px-6 py-3 text-xs font-bold uppercase tracking-wider hover:bg-white transition-all"
                >
                    {actionLabel}
                </button>
            )}
        </div>
    );
};

export default {
    Spinner,
    PageLoader,
    ProductCardSkeleton,
    ReviewCardSkeleton,
    InlineLoader,
    EmptyState
};

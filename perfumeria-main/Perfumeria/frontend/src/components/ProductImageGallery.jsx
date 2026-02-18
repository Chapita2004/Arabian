import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';

const ProductImageGallery = ({ images = [], productName = '' }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [isZoomed, setIsZoomed] = useState(false);

    // Ensure images is always an array
    const imageArray = Array.isArray(images) ? images : [images];
    const totalImages = imageArray.length;

    // Navigation handlers
    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % totalImages);
    };

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + totalImages) % totalImages);
    };

    const goToImage = (index) => {
        setCurrentIndex(index);
    };

    // Keyboard navigation
    React.useEffect(() => {
        const handleKeyPress = (e) => {
            if (!isLightboxOpen) return;

            if (e.key === 'ArrowRight') goToNext();
            if (e.key === 'ArrowLeft') goToPrevious();
            if (e.key === 'Escape') setIsLightboxOpen(false);
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [isLightboxOpen, currentIndex]);

    // Touch/Swipe support for mobile
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    const minSwipeDistance = 50;

    const onTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) goToNext();
        if (isRightSwipe) goToPrevious();
    };

    if (totalImages === 0) {
        return (
            <div className="border border-white/10 bg-[#0a0a0a] p-12 flex items-center justify-center h-[600px]">
                <p className="text-white/40 text-sm uppercase tracking-widest">Sin imagen disponible</p>
            </div>
        );
    }

    return (
        <>
            {/* Main Gallery */}
            <div className="space-y-4">
                {/* Main Image Container */}
                <div className="relative group">
                    <div
                        className="relative border border-white/10 bg-[#0a0a0a] overflow-hidden cursor-zoom-in"
                        onClick={() => setIsLightboxOpen(true)}
                        onTouchStart={onTouchStart}
                        onTouchMove={onTouchMove}
                        onTouchEnd={onTouchEnd}
                    >
                        {/* Image */}
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="relative w-full h-[500px] md:h-[600px] flex items-center justify-center p-6 md:p-12"
                        >
                            <img
                                src={imageArray[currentIndex]}
                                alt={`${productName} - Imagen ${currentIndex + 1}`}
                                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                            />
                        </motion.div>

                        {/* Zoom Icon Overlay */}
                        <div className="absolute top-4 right-4 bg-black/60 p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            <ZoomIn className="w-5 h-5 text-white" />
                        </div>

                        {/* Navigation Arrows - Only show if multiple images */}
                        {totalImages > 1 && (
                            <>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        goToPrevious();
                                    }}
                                    className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-[#c2a35d] text-white p-2 md:p-3 transition-all opacity-0 group-hover:opacity-100"
                                    aria-label="Imagen anterior"
                                >
                                    <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        goToNext();
                                    }}
                                    className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-[#c2a35d] text-white p-2 md:p-3 transition-all opacity-0 group-hover:opacity-100"
                                    aria-label="Siguiente imagen"
                                >
                                    <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                                </button>
                            </>
                        )}

                        {/* Image Counter */}
                        {totalImages > 1 && (
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 px-3 py-1 rounded">
                                <span className="text-white text-xs tracking-wider">
                                    {currentIndex + 1} / {totalImages}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Thumbnails - Only show if multiple images */}
                {totalImages > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                        {imageArray.map((image, index) => (
                            <button
                                key={index}
                                onClick={() => goToImage(index)}
                                className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 border-2 transition-all overflow-hidden bg-[#0a0a0a] ${index === currentIndex
                                        ? 'border-[#c2a35d] opacity-100'
                                        : 'border-white/20 opacity-50 hover:opacity-100 hover:border-white/40'
                                    }`}
                            >
                                <img
                                    src={image}
                                    alt={`Miniatura ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {isLightboxOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4"
                        onClick={() => setIsLightboxOpen(false)}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setIsLightboxOpen(false)}
                            className="absolute top-4 right-4 bg-white/10 hover:bg-[#c2a35d] text-white p-3 rounded-full transition-all z-10"
                            aria-label="Cerrar"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* Navigation Arrows in Lightbox */}
                        {totalImages > 1 && (
                            <>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        goToPrevious();
                                    }}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-[#c2a35d] text-white p-4 rounded-full transition-all z-10"
                                    aria-label="Imagen anterior"
                                >
                                    <ChevronLeft className="w-8 h-8" />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        goToNext();
                                    }}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-[#c2a35d] text-white p-4 rounded-full transition-all z-10"
                                    aria-label="Siguiente imagen"
                                >
                                    <ChevronRight className="w-8 h-8" />
                                </button>
                            </>
                        )}

                        {/* Lightbox Image */}
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                            onTouchStart={onTouchStart}
                            onTouchMove={onTouchMove}
                            onTouchEnd={onTouchEnd}
                        >
                            <img
                                src={imageArray[currentIndex]}
                                alt={`${productName} - Imagen ${currentIndex + 1}`}
                                className="max-w-full max-h-full object-contain"
                            />
                        </motion.div>

                        {/* Image Counter in Lightbox */}
                        {totalImages > 1 && (
                            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/70 px-4 py-2 rounded">
                                <span className="text-white text-sm tracking-wider">
                                    {currentIndex + 1} / {totalImages}
                                </span>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ProductImageGallery;

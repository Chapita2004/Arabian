import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import SEO from './SEO';
import Breadcrumbs from './Breadcrumbs';
import WishlistButton from './WishlistButton';

const WishlistPage = () => {
    const navigate = useNavigate();
    const { wishlist, wishlistCount } = useWishlist();
    const { addToCart } = useCart();

    const breadcrumbItems = [
        { label: 'Inicio', path: '/' },
        { label: 'Mis Favoritos', path: null }
    ];

    return (
        <div className="bg-perfume-pattern min-h-screen pt-32 pb-20">
            <SEO
                title="Mis Favoritos - Arabian Exclusive"
                description="Tus productos favoritos guardados"
                url="/wishlist"
            />

            <div className="max-w-[1440px] mx-auto px-6">
                <Breadcrumbs items={breadcrumbItems} />

                {/* Header */}
                <div className="mb-12 text-center">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "80px" }}
                        className="h-[1px] bg-[#c2a35d] mx-auto mb-6"
                    />
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Heart className="w-8 h-8 text-[#c2a35d]" fill="currentColor" />
                        <h1 className="text-[#c2a35d] text-4xl md:text-5xl font-extralight uppercase tracking-tighter italic">
                            Mis Favoritos
                        </h1>
                    </div>
                    <p className="text-white/50 text-[10px] uppercase tracking-[0.4em]">
                        {wishlistCount} {wishlistCount === 1 ? 'Producto' : 'Productos'}
                    </p>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "80px" }}
                        className="h-[1px] bg-[#c2a35d] mx-auto mt-6"
                    />
                </div>

                {/* Wishlist Content */}
                {wishlistCount === 0 ? (
                    <div className="text-center py-20">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-[#0a0a0a] border border-white/5 p-12 max-w-md mx-auto"
                        >
                            <Heart className="w-16 h-16 text-white/20 mx-auto mb-6" />
                            <h2 className="text-white text-xl font-light uppercase tracking-wider mb-4">
                                No tienes favoritos aún
                            </h2>
                            <p className="text-white/50 text-sm mb-8">
                                Explora nuestro catálogo y guarda tus fragancias favoritas
                            </p>
                            <button
                                onClick={() => navigate('/')}
                                className="bg-[#c2a35d] text-black px-8 py-3 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-white transition-all"
                            >
                                Explorar Productos
                            </button>
                        </motion.div>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                        {wishlist.map((product, index) => {
                            const productId = product._id || product.id;
                            const productImage = product.image || product.img;
                            const transferPrice = Math.round(product.price * 0.9);
                            const installmentPrice = Math.round(product.price / 3);

                            return (
                                <motion.div
                                    key={productId}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group relative bg-[#0a0a0a] border border-white/5 p-4 hover:border-[#c2a35d]/30 transition-all duration-500 shadow-xl flex flex-col h-full"
                                >
                                    {/* Wishlist Button - Top Right */}
                                    <div className="absolute top-2 right-2 z-10">
                                        <WishlistButton product={product} size="sm" />
                                    </div>

                                    <Link to={`/product/${productId}`} className="aspect-[3/4] overflow-hidden mb-4 bg-black relative block">
                                        <img src={productImage} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                                    </Link>

                                    <p className="text-[#c2a35d] text-[10px] md:text-[9px] tracking-[0.2em] uppercase mb-1 text-center font-light">{product.brand}</p>

                                    <Link to={`/product/${productId}`}>
                                        <h3 className="text-white text-sm md:text-xs font-bold tracking-widest mb-1 uppercase text-center italic hover:text-[#c2a35d] transition-colors line-clamp-1">{product.name}</h3>
                                    </Link>

                                    {/* Pricing Section */}
                                    <div className="mb-3 text-center">
                                        <p className="text-white/40 font-light text-xs line-through mb-1">$ {Number(product.price).toLocaleString()}</p>
                                        <p className="text-[#c2a35d] font-bold text-lg mb-1">$ {transferPrice.toLocaleString()}</p>
                                        <p className="text-white/60 text-[9px] uppercase tracking-wider mb-1">10% off transferencia</p>
                                        <p className="text-white/50 text-[8px] tracking-wide">Hasta 3 cuotas sin interés de ${installmentPrice.toLocaleString()}</p>
                                    </div>

                                    <button
                                        onClick={() => addToCart(product)}
                                        className="w-full bg-[#c2a35d] text-black py-3 text-[11px] md:text-[9px] font-bold uppercase tracking-[0.1em] hover:bg-white transition-all duration-500 mt-auto flex items-center justify-center gap-2"
                                    >
                                        <ShoppingBag size={14} />
                                        Añadir al carrito
                                    </button>
                                </motion.div>
                            );
                        })}
                    </div>
                )}

                {/* Back Button */}
                {wishlistCount > 0 && (
                    <div className="mt-12 text-center">
                        <button
                            onClick={() => navigate('/')}
                            className="text-[#c2a35d] text-[9px] uppercase tracking-[0.3em] hover:text-white transition-colors"
                        >
                            ← Seguir Explorando
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WishlistPage;

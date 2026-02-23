import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// Importación de activos
import videoBg from './arabian-exclusive-comprar-bien.mp4';

// Componentes e Interfaces
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import AuthPage from "./components/AuthPage";
import AdminPanel from "./components/AdminPanel";
import CheckoutPage from "./components/CheckoutPage";
import Footer from "./components/Footer";
import PaymentResult from "./components/PaymentResult";
import OrderHistory from "./components/OrderHistory";
import ScrollToTop from "./components/ScrollToTop";
import SEO from './components/SEO';
import Breadcrumbs from './components/Breadcrumbs';
import WishlistButton from './components/WishlistButton';
import WishlistPage from './components/WishlistPage';
import StarRating from './components/StarRating';
import ReviewForm from './components/ReviewForm';
import ReviewList from './components/ReviewList';
import { ProductCardSkeleton, PageLoader, EmptyState } from './components/LoadingStates';
import { CartProvider, useCart } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import ProductService from './api/product.service';
import SidebarFilter from './components/SidebarFilter';
import { filterConfig } from './config/filterConfig';
import { Filter } from 'lucide-react';
import TermsPage from './components/TermsPage';
import PrivacyPage from './components/PrivacyPage';
import ShippingPage from './components/ShippingPage';
import ReturnsPage from './components/ReturnsPage';
import AboutPage from './components/AboutPage';
import FAQPage from './components/FAQPage';
import ProductImageGallery from './components/ProductImageGallery';


// --- MAPEO DE CATEGORÍAS ---
// Mapea las URLs amigables a los nombres exactos en la base de datos
const CATEGORY_MAP = {
  'arabes': 'Perfumes árabes',
  'nicho': 'Perfumes de nicho',
  'desodorantes': 'Desodorantes árabes'
};

const catalogCategories = [
  { id: 1, title: "Perfumes Árabes", subtitle: "Tradición y Opulencia", img: "https://images.unsplash.com/photo-1615631648086-325025c9e51e?q=80&w=1000&auto=format&fit=crop", path: "arabes", dbCategory: "Perfumes árabes" },
  { id: 2, title: "Perfumes de Nicho", subtitle: "Exclusividad Pura", img: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1000&auto=format&fit=crop", path: "nicho", dbCategory: "Perfumes de nicho" },
  { id: 3, title: "Desodorantes", subtitle: "Frescura Diaria", img: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1000&auto=format&fit=crop", path: "desodorantes", dbCategory: "Desodorantes árabes" }
];

// --- COMPONENTES DE APOYO ---
const PreLoader = () => (
  <motion.div className="fixed inset-0 z-[500] flex flex-col items-center justify-center bg-black" initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 1.2 } }}>
    <motion.div initial={{ width: 0 }} animate={{ width: "120px" }} className="h-[1px] bg-[#c2a35d] mb-8" />
    <h1 className="text-[#c2a35d] text-3xl font-light tracking-[0.8em] uppercase text-center font-serif">ARABIAN EXCLUSIVE</h1>
    <motion.div initial={{ width: 0 }} animate={{ width: "120px" }} className="h-[1px] bg-[#c2a35d] mt-8" />
  </motion.div>
);


const icons = [
  { src: "/logo-arabian.png", alt: "Arabian Exclusive Logo", size: "w-40 md:w-56" },
  { src: "/sello-arabian.png", alt: "Perfumes Árabes 100% Originales", size: "w-32 md:w-44" },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % icons.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="relative h-[85vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      <video className="absolute inset-0 w-full h-full object-cover z-0 grayscale-[0.3]" autoPlay loop muted playsInline>
        <source src={videoBg} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black z-10"></div>
      <div className="relative z-20 flex items-center justify-center" style={{ minHeight: 220, mixBlendMode: 'multiply' }}>
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={icons[current].src}
            alt={icons[current].alt}
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.15 }}
            transition={{ duration: 0.75, ease: "easeInOut" }}
            className={`${icons[current].size} drop-shadow-[0_0_24px_rgba(194,163,93,0.55)]`}
          />
        </AnimatePresence>
      </div>
    </header>
  );
};

const ArabicBrandBanner = () => {

  const brands = ["Lattafa", "Afnan", "Armaf", "Rasasi", "Al Haramain", "Ajmal", "Ard Al Zaafaran", "Maison Alhambra", "Khalis"];
  return (
    <div className="bg-[#0a0a0a] py-10 border-y border-[#c2a35d]/10 overflow-hidden relative">
      <motion.div className="flex whitespace-nowrap" animate={{ x: [0, -1000] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }}>
        {[...brands, ...brands, ...brands].map((brand, index) => (
          <span key={index} className="text-[#c2a35d] tracking-[0.5em] text-[10px] uppercase px-12 opacity-40 hover:opacity-100 transition-opacity cursor-default inline-block italic">{brand}</span>
        ))}
      </motion.div>
    </div>
  );
};

const ProductCard = ({ product, compact = false }) => {
  const { addToCart } = useCart();
  const productId = product._id || product.id;
  // Support both images array and single image field
  const productImage = (product.images && product.images.length > 0)
    ? product.images[0]
    : (product.image || product.img);


  // Compact version for mobile featured section (square images)
  if (compact) {
    return (
      <motion.div className="group relative bg-[#0a0a0a] border border-white/5 p-2 hover:border-[#c2a35d]/30 transition-all duration-500 shadow-xl flex flex-col h-full">
        <Link to={`/product/${productId}`} className="aspect-square overflow-hidden mb-2 bg-black relative block">
          <img src={productImage} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
        </Link>
        <p className="text-[#c2a35d] text-[7px] tracking-[0.15em] uppercase mb-0.5 text-center font-light">{product.brand}</p>
        <Link to={`/product/${productId}`}>
          <h3 className="text-white text-[9px] font-bold tracking-wider mb-0.5 uppercase text-center italic hover:text-[#c2a35d] transition-colors line-clamp-1">{product.name}</h3>
        </Link>
        <p className="text-white font-light text-[10px] mb-1.5 text-center tracking-wide opacity-90">$ {Number(product.price).toLocaleString()}</p>
        <button onClick={() => addToCart(product)} className="w-full bg-[#c2a35d] text-black py-1.5 text-[7px] font-bold uppercase tracking-wide hover:bg-white transition-all duration-500">Añadir</button>
      </motion.div>
    );
  }

  // Regular version with image
  const transferPrice = Math.round(product.price * 0.9); // 10% descuento
  const installmentPrice = Math.round(product.price / 3); // 3 cuotas

  return (
    <motion.div className="group relative bg-[#0a0a0a] border border-white/5 p-4 hover:border-[#c2a35d]/30 transition-all duration-500 shadow-xl flex flex-col h-full">
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

      {/* Rating */}
      {product.averageRating > 0 && (
        <div className="flex items-center justify-center gap-1 mb-2">
          <StarRating rating={product.averageRating} size="sm" interactive={false} />
          <span className="text-white/50 text-xs">({product.reviewCount})</span>
        </div>
      )}

      {/* Pricing Section */}
      <div className="mb-3 text-center">
        <p className="text-white/40 font-light text-xs line-through mb-1">$ {Number(product.price).toLocaleString()}</p>
        <p className="text-[#c2a35d] font-bold text-lg mb-1">$ {transferPrice.toLocaleString()}</p>
        <p className="text-white/60 text-[9px] uppercase tracking-wider mb-1">10% off transferencia</p>
        <p className="text-white/50 text-[8px] tracking-wide">Hasta 3 cuotas sin interés de ${installmentPrice.toLocaleString()}</p>
      </div>

      <button onClick={() => addToCart(product)} className="w-full bg-[#c2a35d] text-black py-3 text-[11px] md:text-[9px] font-bold uppercase tracking-[0.1em] hover:bg-white transition-all duration-500 mt-auto">Añadir al carrito</button>
    </motion.div>
  );
};

// --- VISTAS / PÁGINAS ---
const Home = ({ loading }) => {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await ProductService.getAll();
        console.log('Productos recibidos desde la API:', data);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoadingProducts(false);
      }
    };
    fetchProducts();
  }, []);

  // Schema.org Organization
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Store",
    "name": "Arabian Exclusive",
    "description": "Perfumería especializada en fragancias árabes y de nicho en San Juan, Argentina",
    "url": "https://arabianexclusive.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "San Juan",
      "addressRegion": "San Juan",
      "addressCountry": "AR"
    },
    "priceRange": "$$"
  };

  return (
    <div className={`transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>
      <SEO
        title="Arabian Exclusive - Perfumes Árabes y de Nicho en San Juan, Argentina"
        description="Descubrí la mejor selección de perfumes árabes, de nicho y desodorantes en San Juan. Lattafa, Rasasi, Armaf, Al Haramain y más marcas exclusivas. Envíos a todo el país."
        keywords="perfumes árabes, perfumes de nicho, Lattafa San Juan, Rasasi Argentina, Armaf, perfumería San Juan, fragancias árabes, desodorantes árabes, Al Haramain, perfumes importados"
        url="/"
        type="website"
        schemaData={organizationSchema}
      />
      <HeroSection />

      <ArabicBrandBanner />

      <section className="max-w-[1440px] mx-auto px-6 py-24 bg-perfume-pattern">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-[#c2a35d] text-xs uppercase tracking-[0.6em] mb-4">Nuestras Colecciones</h2>
          <p className="text-white text-3xl md:text-3xl font-light uppercase tracking-widest italic">Explora el Universo</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {catalogCategories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Link to={`/category/${cat.path}`} className="group relative h-[400px] md:h-[450px] overflow-hidden border border-white/10 block">
                <img src={cat.img} alt={cat.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 group-hover:opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 px-6">
                  <span className="text-[#c2a35d] text-xs uppercase tracking-[0.4em] mb-3 italic">{cat.subtitle}</span>
                  <h3 className="text-white text-2xl md:text-2xl font-light uppercase tracking-[0.3em] mb-4">{cat.title}</h3>
                  <div className="w-12 h-[1px] bg-[#c2a35d]" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <main className="max-w-[1440px] mx-auto px-6 py-20 bg-perfume-pattern">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#c2a35d] text-xs uppercase tracking-[0.5em] block mb-4 italic">Fragancias de Autor</span>
          <h2 className="text-white text-3xl md:text-4xl font-light tracking-[0.2em] uppercase italic">Seleccionados</h2>
        </motion.div>
        {loadingProducts ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[...Array(8)].map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : products.length === 0 ? (
          <EmptyState
            title="No hay productos disponibles"
            message="Vuelve pronto para ver nuestras fragancias exclusivas"
          />
        ) : (
          <div className="flex overflow-x-auto gap-2 pb-10 snap-x snap-mandatory md:grid md:grid-cols-4 md:gap-8 md:overflow-visible no-scrollbar">
            {products.slice(0, 8).map(product => {
              const productId = product._id || product.id;
              const productImage = (product.images && product.images.length > 0)
                ? product.images[0]
                : (product.image || product.img);


              return (
                <div key={productId} className="flex-shrink-0 w-[38%] md:w-auto snap-start">
                  {/* Mobile version - Fixed size */}
                  <div className="md:hidden bg-[#0a0a0a] border border-white/5 hover:border-[#c2a35d]/30 transition-all duration-500 flex flex-col h-full">
                    <Link to={`/product/${productId}`} className="block relative w-full h-32 bg-black overflow-hidden">
                      <img
                        src={productImage}
                        alt={product.name}
                        className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                      />
                    </Link>
                    <div className="p-2 flex flex-col flex-1">
                      <p className="text-[#c2a35d] text-[7px] tracking-wider uppercase text-center font-light mb-0.5">{product.brand}</p>
                      <Link to={`/product/${productId}`}>
                        <h3 className="text-white text-[9px] font-bold tracking-wide uppercase text-center italic hover:text-[#c2a35d] transition-colors line-clamp-1 mb-1">{product.name}</h3>
                      </Link>
                      <p className="text-white/40 font-light text-[8px] line-through text-center mb-0.5">$ {Number(product.price).toLocaleString()}</p>
                      <p className="text-[#c2a35d] font-bold text-[11px] text-center mb-1">$ {Math.round(product.price * 0.9).toLocaleString()}</p>
                      <p className="text-white/50 text-[6px] text-center tracking-wide mb-2">3 cuotas de ${Math.round(product.price / 3).toLocaleString()}</p>
                      <button
                        onClick={() => addToCart(product)}
                        className="w-full bg-[#c2a35d] text-black py-1.5 text-[7px] font-bold uppercase tracking-wide hover:bg-white transition-all duration-500 mt-auto"
                      >
                        Añadir
                      </button>
                    </div>
                  </div>

                  {/* Desktop version - Regular ProductCard */}
                  <div className="hidden md:block">
                    <ProductCard product={product} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Brand Showcase Section - El Balcón Style */}
      <section className="max-w-[1440px] mx-auto px-6 py-20 bg-perfume-pattern">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#c2a35d] text-xs uppercase tracking-[0.5em] block mb-4 italic">Nuestras Marcas</span>
          <h2 className="text-white text-3xl md:text-4xl font-light tracking-[0.2em] uppercase italic">Perfumes Árabes</h2>
        </motion.div>

        <div className="space-y-8">
          {['Lattafa', 'Rasasi', 'Ajmal', 'Al Haramain', 'Armaf', 'Ard Al Zaafaran', 'Afnan', 'Maison Alhambra', 'Khalis'].map((brand) => {
            // Get top 2 products for this brand
            const brandProducts = products
              .filter(p => p.brand?.toLowerCase() === brand.toLowerCase())
              .slice(0, 2);

            if (brandProducts.length === 0) return null;

            return (
              <motion.div
                key={brand}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[#0a0a0a] border border-white/5 overflow-hidden hover:border-[#c2a35d]/30 transition-all duration-500"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                  {/* Brand Image/Logo - Left Side */}
                  <div className="relative h-64 md:h-auto bg-gradient-to-br from-[#c2a35d]/10 to-black flex items-center justify-center border-b md:border-b-0 md:border-r border-white/5">
                    <div className="text-center p-8">
                      <h3 className="text-[#c2a35d] text-4xl md:text-5xl font-light uppercase tracking-[0.3em] italic mb-2">{brand}</h3>
                      <p className="text-white/40 text-[9px] uppercase tracking-widest">Perfumes Árabes</p>
                    </div>
                  </div>

                  {/* Products - Right Side */}
                  <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-2 divide-x divide-white/5">
                    {brandProducts.map((product, index) => {
                      const productId = product._id || product.id;
                      const productImage = (product.images && product.images.length > 0)
                        ? product.images[0]
                        : (product.image || product.img);

                      const transferPrice = Math.round(product.price * 0.9);
                      const installmentPrice = Math.round(product.price / 3);

                      return (
                        <Link
                          key={productId}
                          to={`/product/${productId}`}
                          className="group flex flex-col sm:flex-row md:flex-col p-2 sm:p-6 hover:bg-[#c2a35d]/5 transition-all duration-300"
                        >
                          {/* Product Image */}
                          <div className="relative w-full sm:w-32 md:w-full h-32 sm:h-32 md:h-56 overflow-hidden bg-black mb-2 sm:mb-0 sm:mr-4 md:mr-0 md:mb-4 flex-shrink-0">
                            <img
                              src={productImage}
                              alt={product.name}
                              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                            />
                          </div>

                          {/* Product Info */}
                          <div className="flex-1 flex flex-col justify-center">
                            <p className="text-[#c2a35d] text-[8px] md:text-[6px] tracking-wider uppercase mb-1 font-light">{product.brand}</p>
                            <h4 className="text-white text-[10px] md:text-sm font-bold uppercase mb-1 line-clamp-2 group-hover:text-[#c2a35d] transition-colors leading-tight">
                              {product.name}
                            </h4>

                            {/* Pricing */}
                            <div className="mb-2">
                              <p className="text-white/40 text-[9px] md:text-xs line-through mb-0.5">
                                $ {Number(product.price).toLocaleString()}
                              </p>
                              <p className="text-[#c2a35d] text-sm md:text-2xl font-bold mb-0.5">
                                $ {transferPrice.toLocaleString()}
                              </p>
                              <p className="hidden sm:block text-white/50 text-[9px] uppercase tracking-wider mb-1">
                                10% OFF Transferencia
                              </p>
                              <p className="text-white/60 text-[8px]">
                                3 x ${(Math.round(product.price / 3)).toLocaleString()}
                              </p>
                            </div>

                            {/* Add to Cart Button */}
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                addToCart(product);
                              }}
                              className="w-full bg-[#c2a35d] text-black py-1.5 md:py-2 text-[8px] md:text-[9px] font-bold uppercase tracking-wider hover:bg-white transition-all duration-300 mt-auto"
                            >
                              Añadir
                            </button>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

const ProductDetail = () => {
  const { productId } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allProducts, setAllProducts] = useState([]);
  const [suggestedProducts, setSuggestedProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await ProductService.getById(productId);
        console.log('Producto individual recibido:', data);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  // Fetch all products for suggestions
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const data = await ProductService.getAll();
        setAllProducts(data);
      } catch (error) {
        console.error('Error fetching all products:', error);
      }
    };
    fetchAllProducts();
  }, []);

  // Calculate suggested products
  useEffect(() => {
    if (product && allProducts.length > 0) {
      // Filter out current product and find related ones
      const suggestions = allProducts
        .filter(p => (p._id || p.id) !== (product._id || product.id))
        .map(p => {
          let score = 0;
          // Same brand gets highest priority
          if (p.brand === product.brand) score += 3;
          // Same category
          if (p.category === product.category) score += 2;
          // Same olfactory family
          if (p.olfactoryFamily && p.olfactoryFamily === product.olfactoryFamily) score += 1;
          return { ...p, score };
        })
        .filter(p => p.score > 0) // Only show products with some relation
        .sort((a, b) => b.score - a.score) // Sort by relevance
        .slice(0, 4); // Get top 4

      setSuggestedProducts(suggestions);
    }
  }, [product, allProducts]);

  if (loading) return <div className="text-white text-center py-40 font-serif tracking-widest">CARGANDO...</div>;
  if (!product) return <div className="text-white text-center py-40 font-serif tracking-widest">PRODUCTO NO ENCONTRADO</div>;

  const transferPrice = Math.round(product.price * 0.9);
  const installmentPrice = Math.round(product.price / 3);

  // Schema.org Product markup
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `${product.brand} ${product.name}`,
    "image": product.image || product.img,
    "description": product.description || `${product.brand} ${product.name} - ${product.size || '100ml'} ${product.concentration || 'Eau de Parfum'}`,
    "brand": {
      "@type": "Brand",
      "name": product.brand
    },
    "offers": {
      "@type": "Offer",
      "price": transferPrice,
      "priceCurrency": "ARS",
      "availability": product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "url": `https://arabianexclusive.com/product/${productId}`,
      "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]
    },
    "category": product.category,
    "sku": productId
  };

  // Show loading state
  if (loading) {
    return <PageLoader message="Cargando producto..." />;
  }

  // Show error if product not found
  if (!product) {
    return (
      <div className="bg-perfume-pattern min-h-screen pt-32">
        <div className="max-w-6xl mx-auto px-6">
          <EmptyState
            title="Producto no encontrado"
            message="El producto que buscas no existe o fue eliminado"
            actionLabel="Volver al catálogo"
            onAction={() => window.location.href = '/'}
          />
        </div>
      </div>
    );
  }

  // Breadcrumbs
  const categoryPath = catalogCategories.find(c => c.dbCategory === product.category)?.path;
  const breadcrumbItems = [
    { label: 'Inicio', path: '/' },
    { label: product.category, path: categoryPath ? `/category/${categoryPath}` : null },
    { label: product.name, path: null }
  ];

  return (
    <div className="bg-perfume-pattern min-h-screen text-white pt-32 pb-20">
      <SEO
        title={`${product.brand} ${product.name} - ${product.size || '100ml'} | Arabian Exclusive`}
        description={product.description || `Comprá ${product.brand} ${product.name} ${product.size || '100ml'} ${product.concentration || 'Eau de Parfum'} en Arabian Exclusive. ${product.gender || 'Unisex'}. Envíos a todo Argentina.`}
        keywords={`${product.brand}, ${product.name}, perfume ${product.brand}, ${product.category}, ${product.olfactoryFamily || ''}, perfumes San Juan`}
        url={`/product/${productId}`}
        type="product"
        price={transferPrice}
        currency="ARS"
        availability={product.stock > 0 ? "in stock" : "out of stock"}
        brand={product.brand}
        productName={product.name}
        image={product.image || product.img}
        schemaData={productSchema}
      />
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        <Breadcrumbs items={breadcrumbItems} />
        <Link to="/" className="text-[#c2a35d] text-xs uppercase tracking-[0.3em] mb-8 inline-block hover:text-white transition-colors">← Volver al catálogo</Link>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-20">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="sticky top-32">
              <ProductImageGallery
                images={product.images || (product.image ? [product.image] : (product.img ? [product.img] : []))}
                productName={product.name}
              />
            </div>
          </motion.div>

          {/* Product Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Brand & Title */}
            <div>
              <p className="text-[#c2a35d] text-xs md:text-sm tracking-[0.4em] uppercase mb-2 font-light">{product.brand}</p>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-light uppercase tracking-tighter italic text-white mb-4">{product.name}</h1>

              {/* Product Details Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                {product.size && (
                  <span className="text-[9px] uppercase tracking-widest px-3 py-1 border border-[#c2a35d]/30 text-[#c2a35d]">
                    {product.size}
                  </span>
                )}
                {product.concentration && (
                  <span className="text-[9px] uppercase tracking-widest px-3 py-1 border border-white/20 text-white/70">
                    {product.concentration}
                  </span>
                )}
                {product.gender && (
                  <span className="text-[9px] uppercase tracking-widest px-3 py-1 border border-white/20 text-white/70">
                    {product.gender}
                  </span>
                )}
              </div>

              {/* Stock Status */}
              {product.stock !== undefined && (
                <p className={`text-xs uppercase tracking-wider mb-4 ${product.stock > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {product.stock > 0 ? `✓ En stock (${product.stock} disponibles)` : '✗ Sin stock'}
                </p>
              )}
            </div>

            {/* Promotional Pricing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="border border-[#c2a35d]/20 bg-[#c2a35d]/5 p-4 md:p-6"
            >
              <p className="text-white/40 text-sm md:text-lg line-through mb-2">Precio lista: $ {Number(product.price).toLocaleString()}</p>
              <div className="flex items-baseline gap-3 mb-3">
                <p className="text-[#c2a35d] text-3xl md:text-4xl font-bold">$ {transferPrice.toLocaleString()}</p>
                <span className="text-white/70 text-xs md:text-sm uppercase tracking-wider">10% OFF Transferencia</span>
              </div>
              <p className="text-white/60 text-xs md:text-sm tracking-wide">
                💳 Hasta 3 cuotas sin interés de <span className="text-white font-semibold">$ {installmentPrice.toLocaleString()}</span>
              </p>
            </motion.div>

            {/* Description */}
            {product.description && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="border-t border-white/10 pt-6"
              >
                <h3 className="text-[#c2a35d] text-xs uppercase tracking-[0.5em] font-bold mb-3">Descripción</h3>
                <p className="text-gray-300 leading-relaxed font-light text-sm md:text-base">{product.description}</p>
              </motion.div>
            )}

            {/* Olfactory Family */}
            {product.olfactoryFamily && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="border-t border-white/10 pt-6"
              >
                <h3 className="text-[#c2a35d] text-xs uppercase tracking-[0.5em] font-bold mb-3">Familia Olfativa</h3>
                <p className="text-white/80 italic text-sm md:text-base">{product.olfactoryFamily}</p>
              </motion.div>
            )}

            {/* Fragrance Notes Pyramid */}
            {product.notes && (product.notes.head || product.notes.heart || product.notes.base) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="border-t border-white/10 pt-6"
              >
                <h3 className="text-[#c2a35d] text-xs uppercase tracking-[0.5em] font-bold mb-6">Pirámide Olfativa</h3>
                <div className="space-y-6">
                  {/* Top Notes */}
                  {product.notes.head && product.notes.head.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.7 }}
                      className="relative pl-8 border-l-2 border-[#c2a35d]/30"
                    >
                      <div className="absolute -left-2 top-0 w-4 h-4 bg-[#c2a35d] transform rotate-45"></div>
                      <span className="text-[10px] text-[#c2a35d] uppercase block tracking-widest mb-2 font-bold">Notas de Salida</span>
                      <div className="flex flex-wrap gap-2">
                        {product.notes.head.map((note, idx) => (
                          <span key={idx} className="text-xs px-3 py-1 bg-[#c2a35d]/10 border border-[#c2a35d]/30 text-white/90 italic">
                            {note}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Heart Notes */}
                  {product.notes.heart && product.notes.heart.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                      className="relative pl-8 border-l-2 border-[#c2a35d]/20"
                    >
                      <div className="absolute -left-2 top-0 w-4 h-4 bg-[#c2a35d]/70 transform rotate-45"></div>
                      <span className="text-[10px] text-[#c2a35d] uppercase block tracking-widest mb-2 font-bold">Corazón</span>
                      <div className="flex flex-wrap gap-2">
                        {product.notes.heart.map((note, idx) => (
                          <span key={idx} className="text-xs px-3 py-1 bg-[#c2a35d]/10 border border-[#c2a35d]/20 text-white/90 italic">
                            {note}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Base Notes */}
                  {product.notes.base && product.notes.base.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.9 }}
                      className="relative pl-8 border-l-2 border-[#c2a35d]/10"
                    >
                      <div className="absolute -left-2 top-0 w-4 h-4 bg-[#c2a35d]/40 transform rotate-45"></div>
                      <span className="text-[10px] text-[#c2a35d] uppercase block tracking-widest mb-2 font-bold">Fondo</span>
                      <div className="flex flex-wrap gap-2">
                        {product.notes.base.map((note, idx) => (
                          <span key={idx} className="text-xs px-3 py-1 bg-[#c2a35d]/10 border border-[#c2a35d]/10 text-white/90 italic">
                            {note}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Add to Cart Button */}
            <div className="space-y-3">
              <button
                onClick={() => addToCart(product)}
                disabled={product.stock === 0}
                className={`w-full py-4 md:py-5 text-xs md:text-sm font-bold uppercase tracking-[0.2em] transition-all duration-500 shadow-lg ${product.stock === 0
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-[#c2a35d] text-black hover:bg-white'
                  }`}
              >
                {product.stock === 0 ? 'Sin stock' : 'Añadir a mi colección'}
              </button>

              {/* Wishlist Button */}
              <div className="flex justify-center">
                <WishlistButton product={product} size="md" showLabel={true} className="text-white/70 hover:text-[#c2a35d]" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Suggestions Section */}
        {suggestedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="border-t border-white/10 pt-16"
          >
            <div className="text-center mb-12">
              <span className="text-[#c2a35d] text-xs uppercase tracking-[0.5em] block mb-3 italic">Descubre más</span>
              <h2 className="text-white text-2xl md:text-3xl font-light tracking-[0.2em] uppercase italic">También te puede gustar</h2>
            </div>

            {/* Suggestions Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {suggestedProducts.map(suggestedProduct => (
                <ProductCard key={suggestedProduct._id || suggestedProduct.id} product={suggestedProduct} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Reviews Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="border-t border-white/10 pt-16 mt-16"
        >
          <ReviewForm
            productId={product._id}
            onReviewSubmitted={() => window.location.reload()}
          />
          <ReviewList
            productId={product._id}
            averageRating={product.averageRating}
            reviewCount={product.reviewCount}
          />
        </motion.div>
      </div>
    </div>
  );
};

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categoryInfo = catalogCategories.find(c => c.path === categoryId);
  const dbCategoryName = CATEGORY_MAP[categoryId];

  // Get config for current category
  const currentFilters = filterConfig[dbCategoryName] || [];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await ProductService.getAll();
        console.log('Productos recibidos:', data);

        // Initial filter by category
        const categoryProducts = data.filter(p => p.category === dbCategoryName);
        setProducts(categoryProducts);
        setFilteredProducts(categoryProducts);

        // Reset filters when category changes
        setSelectedFilters({});
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [categoryId, dbCategoryName]);

  // Apply filters
  useEffect(() => {
    let result = products;

    // Apply each active filter
    Object.entries(selectedFilters).forEach(([filterId, values]) => {
      if (values.length > 0) {
        result = result.filter(product => {
          const productValue = product[filterId];
          if (!productValue) return false;
          return values.includes(productValue);
        });
      }
    });

    setFilteredProducts(result);
  }, [selectedFilters, products]);

  const handleFilterChange = (filterId, values) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterId]: values
    }));
  };

  // SEO metadata for category
  const categoryDescriptions = {
    'arabes': 'Explorá nuestra colección exclusiva de perfumes árabes en San Juan. Lattafa, Rasasi, Armaf, Al Haramain y más marcas premium. Fragancias orientales de larga duración.',
    'nicho': 'Descubrí perfumes de nicho únicos y exclusivos. Fragancias artesanales de alta gama que definen tu personalidad. Disponibles en San Juan, Argentina.',
    'desodorantes': 'Desodorantes árabes de larga duración. Frescura y elegancia en cada aplicación. Marcas premium importadas.'
  };

  const breadcrumbItems = [
    { label: 'Inicio', path: '/' },
    { label: categoryInfo?.title || 'Categoría', path: null }
  ];

  return (
    <div className="bg-perfume-pattern min-h-screen pt-32 pb-20">
      <SEO
        title={`${categoryInfo?.title || 'Categoría'} - Arabian Exclusive | San Juan`}
        description={categoryDescriptions[categoryId] || `Comprá ${categoryInfo?.title} en Arabian Exclusive, San Juan. Las mejores fragancias con envíos a todo el país.`}
        keywords={`${categoryInfo?.title}, perfumes ${categoryId}, fragancias ${categoryId} San Juan, ${categoryInfo?.title} Argentina`}
        url={`/category/${categoryId}`}
        type="website"
      />
      <div className="max-w-[1440px] mx-auto px-6">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="mb-12">
          <Link to="/" className="text-[#c2a35d] text-xs uppercase tracking-[0.3em] mb-6 inline-block hover:text-white transition-colors">← Volver al Inicio</Link>
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-white text-4xl md:text-6xl font-extralight uppercase tracking-tighter italic">{categoryInfo?.title || "Colección"}</h1>
              <p className="text-[#c2a35d] text-xs uppercase tracking-[0.4em] mt-3">{categoryInfo?.subtitle}</p>
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsFilterOpen(true)}
              className="md:hidden flex items-center gap-2 text-[#c2a35d] border border-[#c2a35d]/30 px-4 py-2 uppercase text-[10px] tracking-widest font-bold"
            >
              <Filter size={14} /> Filtrar
            </button>
          </div>
        </div>

        <div className="flex gap-12">
          {/* Sidebar Filters */}
          <SidebarFilter
            filters={currentFilters}
            selectedFilters={selectedFilters}
            onChange={handleFilterChange}
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
          />

          {/* Product Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="text-center text-white/50 py-20">Cargando productos...</div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-20 border border-white/5 bg-[#0a0a0a]">
                <p className="text-white/50 text-lg mb-4">No hay perfumes que coincidan con los filtros</p>
                <button
                  onClick={() => setSelectedFilters({})}
                  className="text-[#c2a35d] text-xs uppercase tracking-widest hover:underline"
                >
                  Limpiar filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
                {filteredProducts.map(product => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL ---
function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <HelmetProvider>
      <Router>
        <WishlistProvider>
          <CartProvider>
            <ScrollToTop />
            <AnimatePresence>
              {loading && <PreLoader />}
            </AnimatePresence>

            {/* Componentes Globales (Se ven en todas las páginas) */}
            <Navbar />
            <CartDrawer />

            <Routes>
              <Route path="/" element={<Home loading={loading} />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/category/:categoryId" element={<CategoryPage />} />
              <Route path="/product/:productId" element={<ProductDetail />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/success" element={<PaymentResult status="success" />} />
              <Route path="/failure" element={<PaymentResult status="failure" />} />
              <Route path="/pending" element={<PaymentResult status="pending" />} />
              <Route path="/mis-pedidos" element={<OrderHistory />} />
              <Route path="/terminos-y-condiciones" element={<TermsPage />} />
              <Route path="/politica-de-privacidad" element={<PrivacyPage />} />
              <Route path="/politica-de-envios" element={<ShippingPage />} />
              <Route path="/politica-de-devoluciones" element={<ReturnsPage />} />
              <Route path="/sobre-nosotros" element={<AboutPage />} />
              <Route path="/preguntas-frecuentes" element={<FAQPage />} />
            </Routes>

            {/* Footer Global */}
            <Footer />
          </CartProvider>
        </WishlistProvider>
      </Router>
    </HelmetProvider>
  );
}

export default App;
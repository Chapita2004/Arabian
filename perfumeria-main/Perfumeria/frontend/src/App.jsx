import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';

// Importación del video
import videoBg from './arabian-exclusive-comprar-bien.mp4';

// Componentes
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import AuthPage from "./components/AuthPage";
import { CartProvider } from './context/CartContext';
import { useCart } from './context/CartContext';

// 1. PRODUCTOS
const products = [
  { id: 1, brand: "Lattafa", name: "Khamrah", price: "95000", img: "/img_22278_190023cabc7.webp", category: "arabes" },
  { id: 2, brand: "Afnan", name: "9 PM", price: "78000", img: "/9pm-Eau-De-Parfum-de-Afnan-100ml-scaled.webp", category: "arabes" },
  { id: 3, brand: "Armaf", name: "Club de Nuit", price: "89000", img: "/club-de-nuit-man-edt-3.webp", category: "arabes" },
  { id: 4, brand: "Lattafa", name: "Yara", price: "72000", img: "/img-8149-8b35205fc6cb9fae2017180408689578-1024-1024.webp", category: "arabes" },
  { id: 5, brand: "Niche", name: "Royal Oud", price: "150000", img: "/img_22278_190023cabc7.webp", category: "nicho" },
  { id: 6, brand: "Luxury", name: "Fresh Deodorant", price: "12000", img: "/9pm-Eau-De-Parfum-de-Afnan-100ml-scaled.webp", category: "desodorantes" },
];

const catalogCategories = [
  { id: 1, title: "Perfumes Árabes", subtitle: "Tradición y Opulencia", img: "https://images.unsplash.com/photo-1615631648086-325025c9e51e?q=80&w=1000&auto=format&fit=crop", path: "arabes" },
  { id: 2, title: "Perfumes de Nicho", subtitle: "Exclusividad Pura", img: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1000&auto=format&fit=crop", path: "nicho" },
  { id: 3, title: "Desodorantes", subtitle: "Frescura Diaria", img: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1000&auto=format&fit=crop", path: "desodorantes" }
];

// --- COMPONENTE PRODUCT CARD (Letras más grandes para móvil) ---
const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  return (
    <motion.div className="group relative bg-[#0a0a0a] border border-white/5 p-4 md:p-4 hover:border-[#c2a35d]/30 transition-all duration-500 shadow-xl flex flex-col h-full">
      <div className="aspect-[3/4] overflow-hidden mb-4 bg-black relative">
        <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
      </div>
      {/* Marca: Aumentada de 8px a 10px (xs) en móvil */}
      <p className="text-[#c2a35d] text-[10px] md:text-[9px] tracking-[0.2em] uppercase mb-1 text-center">{product.brand}</p>
      {/* Nombre: Aumentado de 10px a 14px (sm/base) en móvil */}
      <h3 className="text-white text-sm md:text-xs font-bold tracking-widest mb-1 uppercase text-center italic line-clamp-1">{product.name}</h3>
      {/* Precio: Aumentado de 11px a 16px (base) en móvil */}
      <p className="text-white font-light text-base md:text-sm mb-4 text-center tracking-widest opacity-90">$ {Number(product.price).toLocaleString()}</p>
      <button
        onClick={() => addToCart(product)}
        className="w-full bg-[#c2a35d] text-black py-3 text-[11px] md:text-[9px] font-bold uppercase tracking-[0.1em] hover:bg-white transition-all duration-500 mt-auto"
      >
        Añadir al carrito
      </button>
    </motion.div>
  );
};

// --- PÁGINA DE CATEGORÍA ---
const CategoryPage = () => {
  const { categoryId } = useParams();
  const filteredProducts = products.filter(p => p.category === categoryId);
  const categoryInfo = catalogCategories.find(c => c.path === categoryId);

  return (
    <div className="bg-black min-h-screen pt-32 pb-20">
      <Navbar />
      <CartDrawer />
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="mb-12">
          <Link to="/" className="text-[#c2a35d] text-xs uppercase tracking-[0.3em] mb-6 inline-block hover:text-white transition-colors">← Volver al Inicio</Link>
          <h1 className="text-white text-4xl md:text-6xl font-extralight uppercase tracking-tighter italic">{categoryInfo?.title || "Colección"}</h1>
          <p className="text-[#c2a35d] text-xs uppercase tracking-[0.4em] mt-3">{categoryInfo?.subtitle}</p>
        </div>

        <div className="flex overflow-x-auto gap-4 pb-10 snap-x md:grid md:grid-cols-4 md:gap-8 md:overflow-visible no-scrollbar">
          {filteredProducts.map(product => (
            <div key={product.id} className="min-w-[75%] md:min-w-0 flex-shrink-0 snap-start">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ... (Resto de componentes PreLoader y ArabicBrandBanner igual)

const Home = ({ loading }) => (
  <div className={`bg-black transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>
    <Navbar />
    <CartDrawer />
    <header className="relative h-[85vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      <video className="absolute inset-0 w-full h-full object-cover z-0 grayscale-[0.3]" autoPlay loop muted playsInline>
        <source src={videoBg} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black z-10"></div>
      <div className="relative z-20">
        {/* Título Home: Aumentado en móvil para impacto */}
        <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-[#c2a35d] text-5xl md:text-8xl font-extralight uppercase tracking-tighter mb-4 italic">ARABIAN EXCLUSIVE</motion.h1>
        <motion.p className="text-white text-xs md:text-[11px] uppercase tracking-[0.6em] font-light">San Juan - Argentina</motion.p>
      </div>
    </header>

    <ArabicBrandBanner />

    <section className="max-w-[1440px] mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <h2 className="text-[#c2a35d] text-xs uppercase tracking-[0.6em] mb-4">Nuestras Colecciones</h2>
        <p className="text-white text-3xl md:text-3xl font-light uppercase tracking-widest italic">Explora el Universo</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {catalogCategories.map((cat) => (
          <Link to={`/category/${cat.path}`} key={cat.id} className="group relative h-[400px] md:h-[450px] overflow-hidden border border-white/10">
            <img src={cat.img} alt={cat.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 group-hover:opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 px-6">
              <span className="text-[#c2a35d] text-xs uppercase tracking-[0.4em] mb-3 italic">{cat.subtitle}</span>
              <h3 className="text-white text-2xl md:text-2xl font-light uppercase tracking-[0.3em] mb-4">{cat.title}</h3>
              <div className="w-12 h-[1px] bg-[#c2a35d]" />
            </div>
          </Link>
        ))}
      </div>
    </section>

    <main className="max-w-[1440px] mx-auto px-6 py-20 bg-[#050505]">
      <div className="text-center mb-16">
        <span className="text-[#c2a35d] text-xs uppercase tracking-[0.5em] block mb-4 italic">Fragancias de Autor</span>
        <h2 className="text-white text-3xl md:text-4xl font-light tracking-[0.2em] uppercase italic">Seleccionados</h2>
      </div>

      {/* Ajuste de min-width para que el carrusel móvil se vea más grande */}
      <div className="flex overflow-x-auto gap-4 pb-10 snap-x md:grid md:grid-cols-4 md:gap-8 md:overflow-visible no-scrollbar">
        {products.map(product => (
          <div key={product.id} className="min-w-[75%] md:min-w-0 flex-shrink-0 snap-start">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </main>

    <footer className="py-20 border-t border-white/5 text-center bg-[#050505]">
      <p className="text-[#c2a35d] text-xs tracking-[0.3em] uppercase opacity-50 italic px-4">Arabian Exclusive © 2026 — San Juan, Argentina</p>
    </footer>
  </div>
);

// El componente App y PreLoader se mantienen igual...
function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <CartProvider>
        <AnimatePresence>{loading && <PreLoader />}</AnimatePresence>
        <Routes>
          <Route path="/" element={<Home loading={loading} />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
        </Routes>
        <a href="https://wa.me/2646285919" className="fixed bottom-8 right-8 z-[200] bg-[#c2a35d] p-4 rounded-full shadow-2xl hover:scale-110 transition-all hover:bg-white group">
          <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
        </a>
      </CartProvider>
    </Router>
  );
}

// PreLoader (Se mantiene igual)
const PreLoader = () => (
  <motion.div className="fixed inset-0 z-[500] flex flex-col items-center justify-center bg-black" initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 1.2 } }}>
    <motion.div initial={{ width: 0 }} animate={{ width: "120px" }} className="h-[1px] bg-[#c2a35d] mb-8" />
    <h1 className="text-[#c2a35d] text-3xl font-light tracking-[0.8em] uppercase text-center font-serif">ARABIAN EXCLUSIVE</h1>
    <motion.div initial={{ width: 0 }} animate={{ width: "120px" }} className="h-[1px] bg-[#c2a35d] mt-8" />
  </motion.div>
);

const ArabicBrandBanner = () => {
  const brands = ["Lattafa", "Afnan", "Armaf", "Rasasi", "Al Haramain"];
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

export default App;
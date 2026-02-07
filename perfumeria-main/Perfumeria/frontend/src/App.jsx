import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';

// Importación de activos
import videoBg from './arabian-exclusive-comprar-bien.mp4';

// Componentes e Interfaces
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import AuthPage from "./components/AuthPage";
import AdminPanel from "./components/AdminPanel";
import CheckoutPage from "./components/CheckoutPage";
import Footer from "./components/Footer";
import { CartProvider, useCart } from './context/CartContext';
import ProductService from './api/product.service';
import SidebarFilter from './components/SidebarFilter';
import { filterConfig } from './config/filterConfig';
import { Filter } from 'lucide-react';

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

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const productId = product._id || product.id;
  const productImage = product.image || product.img;

  return (
    <motion.div className="group relative bg-[#0a0a0a] border border-white/5 p-4 hover:border-[#c2a35d]/30 transition-all duration-500 shadow-xl flex flex-col h-full">
      <Link to={`/product/${productId}`} className="aspect-[3/4] overflow-hidden mb-4 bg-black relative block">
        <img src={productImage} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
      </Link>
      <p className="text-[#c2a35d] text-[10px] md:text-[9px] tracking-[0.2em] uppercase mb-1 text-center font-light">{product.brand}</p>
      <Link to={`/product/${productId}`}>
        <h3 className="text-white text-sm md:text-xs font-bold tracking-widest mb-1 uppercase text-center italic hover:text-[#c2a35d] transition-colors line-clamp-1">{product.name}</h3>
      </Link>
      <p className="text-white font-light text-base md:text-sm mb-4 text-center tracking-widest opacity-90">$ {Number(product.price).toLocaleString()}</p>
      <button onClick={() => addToCart(product)} className="w-full bg-[#c2a35d] text-black py-3 text-[11px] md:text-[9px] font-bold uppercase tracking-[0.1em] hover:bg-white transition-all duration-500 mt-auto">Añadir al carrito</button>
    </motion.div>
  );
};

// --- VISTAS / PÁGINAS ---
const Home = ({ loading }) => {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

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

  return (
    <div className={`transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>
      <header className="relative h-[85vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <video className="absolute inset-0 w-full h-full object-cover z-0 grayscale-[0.3]" autoPlay loop muted playsInline>
          <source src={videoBg} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black z-10"></div>
        <div className="relative z-20">
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
        {loadingProducts ? (
          <div className="text-center text-white/50 py-20">Cargando productos...</div>
        ) : products.length === 0 ? (
          <div className="text-center text-white/50 py-20">No hay productos disponibles</div>
        ) : (
          <div className="flex overflow-x-auto gap-4 pb-10 snap-x md:grid md:grid-cols-4 md:gap-8 md:overflow-visible no-scrollbar">
            {products.slice(0, 4).map(product => (
              <div key={product._id} className="min-w-[75%] md:min-w-0 flex-shrink-0 snap-start">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await ProductService.getById(id);
        console.log('Producto individual recibido:', data);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="text-white text-center py-40 font-serif tracking-widest">CARGANDO...</div>;
  if (!product) return <div className="text-white text-center py-40 font-serif tracking-widest">PRODUCTO NO ENCONTRADO</div>;

  return (
    <div className="bg-black min-h-screen text-white pt-32 pb-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <Link to="/" className="text-[#c2a35d] text-xs uppercase tracking-[0.3em] mb-12 inline-block hover:text-white transition-colors">← Volver al catálogo</Link>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="relative group overflow-hidden border border-white/10 bg-[#0a0a0a] p-8 rounded-lg">
            <img src={product.image || product.img} alt={product.name} className="w-full h-auto object-contain max-h-[500px]" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <div>
              <p className="text-[#c2a35d] text-sm tracking-[0.4em] uppercase mb-2 font-light">{product.brand}</p>
              <h1 className="text-4xl md:text-6xl font-light uppercase tracking-tighter italic">{product.name}</h1>
              <p className="text-2xl mt-4 font-extralight text-white/80">$ {Number(product.price).toLocaleString()}</p>
            </div>
            {product.description && <p className="text-gray-400 leading-relaxed font-light text-lg">{product.description}</p>}
            {product.notes && (
              <div className="border-y border-white/10 py-8 space-y-6">
                <h3 className="text-[#c2a35d] text-xs uppercase tracking-[0.5em] font-bold">Pirámide Olfativa</h3>
                <div className="grid grid-cols-1 gap-6">
                  {product.notes.head && <div><span className="text-[10px] text-[#c2a35d] uppercase block tracking-widest mb-1">Notas de Salida</span><p className="italic font-light text-white/90">{product.notes.head.join(', ')}</p></div>}
                  {product.notes.heart && <div><span className="text-[10px] text-[#c2a35d] uppercase block tracking-widest mb-1">Corazón</span><p className="italic font-light text-white/90">{product.notes.heart.join(', ')}</p></div>}
                  {product.notes.base && <div><span className="text-[10px] text-[#c2a35d] uppercase block tracking-widest mb-1">Fondo</span><p className="italic font-light text-white/90">{product.notes.base.join(', ')}</p></div>}
                </div>
              </div>
            )}
            <button onClick={() => addToCart(product)} className="w-full bg-[#c2a35d] text-black py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white transition-all duration-500 shadow-lg">Añadir a mi colección</button>
          </motion.div>
        </div>
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

  return (
    <div className="bg-black min-h-screen pt-32 pb-20">
      <div className="max-w-[1440px] mx-auto px-6">
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
    <Router>
      <CartProvider>
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
        </Routes>

        {/* Footer Global */}
        <Footer />

        {/* Botón Flotante de WhatsApp */}
        <a
          href="https://wa.me/2646285919"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-8 right-8 z-[200] bg-[#c2a35d] p-4 rounded-full shadow-2xl hover:scale-110 transition-all hover:bg-white group"
        >
          <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>
      </CartProvider>
    </Router>
  );
}

export default App;
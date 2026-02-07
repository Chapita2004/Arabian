import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Menu, X, User, LogOut, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/authContext';
import ProductService from '../api/product.service';

// IMPORTACIÓN DEL LOGO
// Asumiendo que Navbar.jsx está en src/components y la imagen en public
import logoArabian from '../../public/logo-arabian.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setIsCartOpen, cartCount } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [allProducts, setAllProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const searchRef = useRef(null);

  // Debug log solicitado por usuario
  console.log('Usuario en Navbar:', user);

  // Fetch all products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await ProductService.getAll();
        setAllProducts(data);
      } catch (error) {
        console.error('Error fetching products for search:', error);
      } finally {
        setIsLoadingProducts(false);
      }
    };
    fetchProducts();
  }, []);

  // Handle search with debounce
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setIsSearchOpen(false);
      return;
    }

    const timeoutId = setTimeout(() => {
      const query = searchQuery.toLowerCase();
      const filtered = allProducts.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
      setSearchResults(filtered);
      setIsSearchOpen(true);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, allProducts]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleProductClick = (productId) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    navigate(`/product/${productId}`);
  };

  return (
    <nav className="w-full bg-[#0a0a0a] border-b border-[#332b1a] sticky top-0 z-[100]">
      <div className="bg-[#c2a35d] text-black text-[9px] py-2 text-center uppercase font-bold tracking-tighter">
        Catálogo Exclusivo: Perfumes Árabes & Nicho
      </div>
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 flex items-center justify-between h-20 gap-4">

        {/* LOGO */}
        <Link to="/" className="flex items-center flex-shrink-0">
          <img
            src={logoArabian}
            alt="Arabian Exclusive Logo"
            className="h-12 md:h-16 w-auto object-contain transition-transform duration-300 hover:scale-105"
          />
        </Link>

        {/* SEARCH BAR - CENTERED */}
        <div className="hidden md:flex flex-1 max-w-md mx-4 relative" ref={searchRef}>
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#c2a35d]/50" size={18} />
            <input
              type="text"
              placeholder="Buscar perfumes, marcas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-black/40 border border-white/10 text-white text-sm pl-10 pr-4 py-2.5 
                       focus:outline-none focus:border-[#c2a35d]/50 transition-all duration-300
                       placeholder:text-white/30 placeholder:text-xs placeholder:tracking-wider"
            />
          </div>

          {/* DROPDOWN RESULTS */}
          {isSearchOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-[#0a0a0a] border border-[#c2a35d]/20 
                          shadow-2xl max-h-[400px] overflow-y-auto z-50 animate-fadeIn">
              {searchResults.length === 0 ? (
                <div className="p-6 text-center text-white/40 text-sm">
                  No se encontraron productos
                </div>
              ) : (
                <>
                  {searchResults.slice(0, 5).map((product) => (
                    <button
                      key={product._id}
                      onClick={() => handleProductClick(product._id)}
                      className="w-full flex items-center gap-4 p-3 hover:bg-[#c2a35d]/10 
                               transition-colors border-b border-white/5 text-left group"
                    >
                      <img
                        src={product.image || product.img}
                        alt={product.name}
                        className="w-12 h-12 object-cover bg-black/50"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-[#c2a35d] text-[9px] uppercase tracking-widest mb-0.5">
                          {product.brand}
                        </p>
                        <p className="text-white text-sm font-medium truncate group-hover:text-[#c2a35d] transition-colors">
                          {product.name}
                        </p>
                        <p className="text-white/60 text-xs">
                          $ {Number(product.price).toLocaleString()}
                        </p>
                      </div>
                    </button>
                  ))}
                  {searchResults.length > 5 && (
                    <div className="p-3 text-center border-t border-[#c2a35d]/20">
                      <p className="text-[#c2a35d] text-xs">
                        +{searchResults.length - 5} resultados más
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        {/* USER & CART */}
        <div className="flex items-center space-x-4 md:space-x-6 flex-shrink-0">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="hidden md:block text-[#c2a35d] text-[10px] font-bold tracking-widest uppercase border border-[#c2a35d]/30 px-3 py-1 italic">
                Hola, {user.name}
              </span>
              <button onClick={handleLogout} className="text-white/40 hover:text-red-500 transition-colors">
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <Link to="/auth" className="text-[#c2a35d] flex items-center hover:text-white transition-colors">
              <User size={20} strokeWidth={1.5} />
              <span className="hidden md:inline ml-1 text-[10px] font-bold uppercase tracking-widest">Cuenta</span>
            </Link>
          )}

          <button onClick={() => setIsCartOpen(true)} className="text-[#c2a35d] flex items-center hover:text-white transition-colors relative">
            <ShoppingBag size={20} strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* MOBILE SEARCH BAR */}
      <div className="md:hidden px-4 pb-3" ref={searchRef}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#c2a35d]/50" size={16} />
          <input
            type="text"
            placeholder="Buscar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-black/40 border border-white/10 text-white text-sm pl-9 pr-4 py-2 
                     focus:outline-none focus:border-[#c2a35d]/50 transition-all duration-300
                     placeholder:text-white/30 placeholder:text-xs"
          />
        </div>

        {/* MOBILE DROPDOWN */}
        {isSearchOpen && (
          <div className="absolute left-4 right-4 mt-2 bg-[#0a0a0a] border border-[#c2a35d]/20 
                        shadow-2xl max-h-[300px] overflow-y-auto z-50">
            {searchResults.length === 0 ? (
              <div className="p-4 text-center text-white/40 text-sm">
                No se encontraron productos
              </div>
            ) : (
              <>
                {searchResults.slice(0, 5).map((product) => (
                  <button
                    key={product._id}
                    onClick={() => handleProductClick(product._id)}
                    className="w-full flex items-center gap-3 p-2.5 hover:bg-[#c2a35d]/10 
                             transition-colors border-b border-white/5 text-left"
                  >
                    <img
                      src={product.image || product.img}
                      alt={product.name}
                      className="w-10 h-10 object-cover bg-black/50"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-[#c2a35d] text-[8px] uppercase tracking-widest">
                        {product.brand}
                      </p>
                      <p className="text-white text-xs font-medium truncate">
                        {product.name}
                      </p>
                      <p className="text-white/60 text-[10px]">
                        $ {Number(product.price).toLocaleString()}
                      </p>
                    </div>
                  </button>
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, User, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

// IMPORTACIÓN DEL LOGO
// Asumiendo que Navbar.jsx está en src/components y la imagen en public
import logoArabian from '../../public/logo-arabian.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userName, setUserName] = useState(null);
  const { setIsCartOpen, cartCount } = useCart();
  const navigate = useNavigate();

  const checkUser = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUserName(userData.username);
    } else {
      setUserName(null);
    }
  };

  useEffect(() => {
    checkUser();
    window.addEventListener('storage', checkUser);
    window.addEventListener('authChange', checkUser);
    return () => {
      window.removeEventListener('storage', checkUser);
      window.removeEventListener('authChange', checkUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUserName(null);
    window.dispatchEvent(new Event('authChange'));
    navigate('/');
  };

  return (
    <nav className="w-full bg-[#0a0a0a] border-b border-[#332b1a] sticky top-0 z-[100]">
      <div className="bg-[#c2a35d] text-black text-[9px] py-2 text-center uppercase font-bold tracking-tighter">
        Catálogo Exclusivo: Perfumes Árabes & Nicho
      </div>
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 flex items-center justify-between h-20">

        {/* CONTENEDOR DEL LOGO ACTUALIZADO */}
        <Link to="/" className="flex items-center">
          <img
            src={logoArabian}
            alt="Arabian Exclusive Logo"
            /* h-16 (64px) en móvil y h-20 (80px) en PC */
            className="h-16 md:h-20 w-auto object-contain transition-transform duration-300 hover:scale-105"
          />
        </Link>

        <div className="flex items-center space-x-6">
          {userName ? (
            <div className="flex items-center gap-3">
              <span className="text-[#c2a35d] text-[10px] font-bold tracking-widest uppercase border border-[#c2a35d]/30 px-3 py-1 italic">
                Hola, {userName}
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
    </nav>
  );
};

export default Navbar;
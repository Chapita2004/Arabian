import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // La URL depende de si es login o registro
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';

    try {
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Algo salió mal');
      }

      if (isLogin) {
        // --- LOGIN EXITOSO ---
        localStorage.setItem('token', data.token);
        // Guardamos el objeto usuario que contiene el username
        localStorage.setItem('user', JSON.stringify(data.user));

        // LANZAMOS LOS EVENTOS: 
        // 1. 'storage' para otras pestañas
        // 2. 'authChange' para que el Navbar actual se entere YA MISMO
        window.dispatchEvent(new Event('storage'));
        window.dispatchEvent(new Event('authChange'));

        navigate('/'); // Volvemos al inicio
      } else {
        // --- REGISTRO EXITOSO ---
        alert('Registro exitoso, ahora inicia sesión con tus datos');
        setIsLogin(true);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-[#0a0a0a] border border-[#c2a35d]/20 p-10 shadow-2xl"
      >
        <h2 className="text-[#c2a35d] text-3xl font-light tracking-[0.3em] uppercase text-center mb-8 italic">
          {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div>
              <label className="text-[10px] uppercase tracking-widest text-gray-500 block mb-2 font-bold">Nombre de Usuario</label>
              <input
                type="text"
                className="w-full bg-transparent border-b border-white/10 text-white focus:border-[#c2a35d] outline-none py-2 transition-all placeholder:text-gray-800"
                placeholder="Ej: Juan Perez"
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required={!isLogin}
              />
            </div>
          )}

          <div>
            <label className="text-[10px] uppercase tracking-widest text-gray-500 block mb-2 font-bold">Email</label>
            <input
              type="email"
              className="w-full bg-transparent border-b border-white/10 text-white focus:border-[#c2a35d] outline-none py-2 transition-all placeholder:text-gray-800"
              placeholder="tu@email.com"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-widest text-gray-500 block mb-2 font-bold">Contraseña</label>
            <input
              type="password"
              className="w-full bg-transparent border-b border-white/10 text-white focus:border-[#c2a35d] outline-none py-2 transition-all placeholder:text-gray-800"
              placeholder="••••••••"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-[10px] uppercase text-center font-bold tracking-tighter bg-red-500/10 py-2 border border-red-500/20"
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            className="w-full bg-[#c2a35d] text-black py-4 text-[10px] font-extrabold uppercase tracking-[0.2em] hover:bg-white transition-all duration-500 active:scale-95"
          >
            {isLogin ? 'Entrar al Sistema' : 'Crear Mi Cuenta'}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-white/5 pt-6">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            className="text-gray-500 text-[9px] uppercase tracking-[0.2em] hover:text-[#c2a35d] transition-colors"
          >
            {isLogin ? '¿No tienes cuenta? Regístrate aquí' : '¿Ya tienes cuenta? Inicia sesión'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ProductService from '../api/product.service';
import Navbar from './Navbar';

const AdminPanel = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        brand: '',
        category: 'Perfumes árabes',
        price: '',
        stock: '',
        description: '',
        image: ''
    });
    const [message, setMessage] = useState({ type: '', text: '' });
    const [loading, setLoading] = useState(false);

    // Check if user is admin
    React.useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) {
            navigate('/auth');
            return;
        }
        const userData = JSON.parse(user);
        if (userData.role !== 'admin') {
            navigate('/');
        }
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            // Convert price and stock to numbers
            const productData = {
                ...formData,
                price: Number(formData.price),
                stock: Number(formData.stock)
            };

            await ProductService.create(productData);

            setMessage({ type: 'success', text: '✓ Producto creado exitosamente' });

            // Reset form
            setFormData({
                name: '',
                brand: '',
                category: 'Perfumes árabes',
                price: '',
                stock: '',
                description: '',
                image: ''
            });

            // Clear message after 3 seconds
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        } catch (error) {
            console.error('Error creating product:', error);
            setMessage({
                type: 'error',
                text: error.response?.data?.msg || 'Error al crear el producto'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-black min-h-screen">
            <Navbar />

            <div className="max-w-4xl mx-auto px-6 py-32">
                {/* Header */}
                <div className="mb-12 text-center">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "80px" }}
                        className="h-[1px] bg-[#c2a35d] mx-auto mb-6"
                    />
                    <h1 className="text-[#c2a35d] text-4xl md:text-5xl font-extralight uppercase tracking-tighter italic mb-4">
                        Panel de Administración
                    </h1>
                    <p className="text-white/50 text-[10px] uppercase tracking-[0.4em]">
                        Gestión de Productos
                    </p>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "80px" }}
                        className="h-[1px] bg-[#c2a35d] mx-auto mt-6"
                    />
                </div>

                {/* Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#0a0a0a] border border-white/5 p-8 md:p-12"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name */}
                        <div>
                            <label className="text-[#c2a35d] text-[9px] uppercase tracking-[0.3em] block mb-2">
                                Nombre del Producto
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full bg-black border border-white/10 text-white px-4 py-3 text-sm focus:border-[#c2a35d] focus:outline-none transition-colors"
                                placeholder="Ej: Khamrah"
                            />
                        </div>

                        {/* Brand */}
                        <div>
                            <label className="text-[#c2a35d] text-[9px] uppercase tracking-[0.3em] block mb-2">
                                Marca
                            </label>
                            <input
                                type="text"
                                name="brand"
                                value={formData.brand}
                                onChange={handleChange}
                                required
                                className="w-full bg-black border border-white/10 text-white px-4 py-3 text-sm focus:border-[#c2a35d] focus:outline-none transition-colors"
                                placeholder="Ej: Lattafa"
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="text-[#c2a35d] text-[9px] uppercase tracking-[0.3em] block mb-2">
                                Categoría
                            </label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                                className="w-full bg-black border border-white/10 text-white px-4 py-3 text-sm focus:border-[#c2a35d] focus:outline-none transition-colors"
                            >
                                <option value="Perfumes árabes">Perfumes Árabes</option>
                                <option value="Perfumes de nicho">Perfumes de Nicho</option>
                                <option value="Desodorantes árabes">Desodorantes Árabes</option>
                            </select>
                        </div>

                        {/* Price and Stock */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="text-[#c2a35d] text-[9px] uppercase tracking-[0.3em] block mb-2">
                                    Precio (ARS)
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                    className="w-full bg-black border border-white/10 text-white px-4 py-3 text-sm focus:border-[#c2a35d] focus:outline-none transition-colors"
                                    placeholder="95000"
                                />
                            </div>

                            <div>
                                <label className="text-[#c2a35d] text-[9px] uppercase tracking-[0.3em] block mb-2">
                                    Stock
                                </label>
                                <input
                                    type="number"
                                    name="stock"
                                    value={formData.stock}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                    className="w-full bg-black border border-white/10 text-white px-4 py-3 text-sm focus:border-[#c2a35d] focus:outline-none transition-colors"
                                    placeholder="10"
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="text-[#c2a35d] text-[9px] uppercase tracking-[0.3em] block mb-2">
                                Descripción
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="4"
                                className="w-full bg-black border border-white/10 text-white px-4 py-3 text-sm focus:border-[#c2a35d] focus:outline-none transition-colors resize-none"
                                placeholder="Descripción del producto..."
                            />
                        </div>

                        {/* Image URL */}
                        <div>
                            <label className="text-[#c2a35d] text-[9px] uppercase tracking-[0.3em] block mb-2">
                                URL de la Imagen
                            </label>
                            <input
                                type="url"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                className="w-full bg-black border border-white/10 text-white px-4 py-3 text-sm focus:border-[#c2a35d] focus:outline-none transition-colors"
                                placeholder="https://ejemplo.com/imagen.jpg"
                            />
                        </div>

                        {/* Message */}
                        {message.text && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`p-4 border ${message.type === 'success'
                                        ? 'bg-green-900/20 border-green-500/30 text-green-400'
                                        : 'bg-red-900/20 border-red-500/30 text-red-400'
                                    } text-sm text-center uppercase tracking-widest`}
                            >
                                {message.text}
                            </motion.div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#c2a35d] text-black py-4 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-white transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Guardando...' : 'Guardar Producto'}
                        </button>
                    </form>
                </motion.div>

                {/* Back to Home */}
                <div className="mt-8 text-center">
                    <button
                        onClick={() => navigate('/')}
                        className="text-[#c2a35d] text-[9px] uppercase tracking-[0.3em] hover:text-white transition-colors"
                    >
                        ← Volver al Inicio
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;

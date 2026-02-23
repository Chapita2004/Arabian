import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Package, ShoppingBag, Clock, CheckCircle, XCircle, Truck, Plus, X, Image as ImageIcon } from 'lucide-react';
import ProductService from '../api/product.service';
import OrderService from '../api/order.service';

const AdminPanel = () => {
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState(null);
    const [activeTab, setActiveTab] = useState('products'); // 'products', 'manage', or 'orders'

    // Product form state
    const [formData, setFormData] = useState({
        name: '',
        brand: '',
        category: 'Perfumes árabes',
        price: '',
        stock: '',
        description: '',
        images: [],
        gender: '',
        size: '',
        concentration: '',
        olfactoryFamily: '',
        notes: {
            top: [],
            heart: [],
            base: []
        }
    });
    const [newImageUrl, setNewImageUrl] = useState('');
    const [newTopNote, setNewTopNote] = useState('');
    const [newHeartNote, setNewHeartNote] = useState('');
    const [newBaseNote, setNewBaseNote] = useState('');
    const [message, setMessage] = useState({ type: '', text: '' });
    const [loading, setLoading] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    // Product management state
    const [products, setProducts] = useState([]);
    const [productsLoading, setProductsLoading] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    // Orders state
    const [orders, setOrders] = useState([]);
    const [ordersLoading, setOrdersLoading] = useState(false);
    const [orderFilter, setOrderFilter] = useState('all');
    const [stats, setStats] = useState(null);

    // Check if user is admin or superadmin
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) {
            navigate('/auth');
            return;
        }
        const userData = JSON.parse(user);
        if (!['admin', 'superadmin'].includes(userData.role)) {
            navigate('/');
            return;
        }
        setUserRole(userData.role);
        // If user is admin (not superadmin), default to orders tab
        if (userData.role === 'admin') {
            setActiveTab('orders');
        }
    }, [navigate]);

    // Fetch orders when tab changes
    useEffect(() => {
        if (activeTab === 'orders') {
            fetchOrders();
            fetchStats();
        }
    }, [activeTab]);

    const fetchOrders = async () => {
        setOrdersLoading(true);
        try {
            const params = orderFilter !== 'all' ? { status: orderFilter } : {};
            const data = await OrderService.getAllOrders(params);
            setOrders(data.orders || data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setOrdersLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const data = await OrderService.getOrderStats();
            setStats(data);
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

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
            const productData = {
                ...formData,
                price: Number(formData.price),
                stock: Number(formData.stock)
            };

            if (editingProduct) {
                await ProductService.update(editingProduct._id, productData);
                setMessage({ type: 'success', text: '✓ Producto actualizado exitosamente' });
                setEditingProduct(null);
                fetchProducts(); // Refresh product list
            } else {
                await ProductService.create(productData);
                setMessage({ type: 'success', text: '✓ Producto creado exitosamente' });
            }

            setFormData({
                name: '',
                brand: '',
                category: 'Perfumes árabes',
                price: '',
                stock: '',
                description: '',
                images: [],
                gender: '',
                size: '',
                concentration: '',
                olfactoryFamily: '',
                notes: {
                    top: [],
                    heart: [],
                    base: []
                }
            });
            setNewImageUrl('');
            setNewTopNote('');
            setNewHeartNote('');
            setNewBaseNote('');

            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        } catch (error) {
            console.error('Error creating product:', error);
            setMessage({ type: 'error', text: '✗ Error al crear producto' });
        } finally {
            setLoading(false);
        }
    };

    // Fetch all products for management
    const fetchProducts = async () => {
        setProductsLoading(true);
        try {
            const data = await ProductService.getAll();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setProductsLoading(false);
        }
    };

    // Load product into form for editing
    const handleEditProduct = (product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name || '',
            brand: product.brand || '',
            category: product.category || 'Perfumes árabes',
            price: product.price || '',
            stock: product.stock || '',
            description: product.description || '',
            images: product.images || [],
            gender: product.gender || '',
            size: product.size || '',
            concentration: product.concentration || '',
            olfactoryFamily: product.olfactoryFamily || '',
            notes: {
                top: product.notes?.top || [],
                heart: product.notes?.heart || [],
                base: product.notes?.base || []
            }
        });
        setActiveTab('products'); // Switch to form tab
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Delete product
    const handleDeleteProduct = async (productId) => {
        try {
            await ProductService.delete(productId);
            setMessage({ type: 'success', text: '✓ Producto eliminado exitosamente' });
            fetchProducts(); // Refresh list
            setDeleteConfirm(null);
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        } catch (error) {
            console.error('Error deleting product:', error);
            setMessage({ type: 'error', text: '✗ Error al eliminar producto' });
        }
    };

    // Cancel edit mode
    const handleCancelEdit = () => {
        setEditingProduct(null);
        setFormData({
            name: '',
            brand: '',
            category: 'Perfumes árabes',
            price: '',
            stock: '',
            description: '',
            images: [],
            gender: '',
            size: '',
            concentration: '',
            olfactoryFamily: '',
            notes: { top: [], heart: [], base: [] }
        });
        setNewImageUrl('');
        setNewTopNote('');
        setNewHeartNote('');
        setNewBaseNote('');
    };

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await OrderService.updateOrderStatus(orderId, newStatus);
            fetchOrders(); // Refresh orders
            fetchStats(); // Refresh stats
        } catch (error) {
            console.error('Error updating order status:', error);
            alert('Error al actualizar el estado de la orden');
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending':
                return <Clock className="w-4 h-4 text-yellow-500" />;
            case 'confirmed':
                return <Package className="w-4 h-4 text-blue-500" />;
            case 'ready':
                return <Truck className="w-4 h-4 text-green-500" />;
            case 'completed':
                return <CheckCircle className="w-4 h-4 text-green-600" />;
            case 'cancelled':
                return <XCircle className="w-4 h-4 text-red-500" />;
            default:
                return <Package className="w-4 h-4 text-gray-500" />;
        }
    };

    const getStatusText = (status) => {
        const statusMap = {
            pending: 'Pendiente',
            confirmed: 'Confirmado',
            ready: 'Listo',
            completed: 'Completado',
            cancelled: 'Cancelado'
        };
        return statusMap[status] || status;
    };

    return (
        <div className="bg-perfume-pattern min-h-screen">
            <div className="max-w-7xl mx-auto px-6 py-32">
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
                        Gestión Completa
                    </p>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "80px" }}
                        className="h-[1px] bg-[#c2a35d] mx-auto mt-6"
                    />
                </div>

                {/* Tabs */}
                <div className="flex gap-4 mb-8 border-b border-white/10">
                    {/* Products tab - Only visible for superadmin */}
                    {userRole === 'superadmin' && (
                        <>
                            <button
                                onClick={() => { setActiveTab('products'); handleCancelEdit(); }}
                                className={`pb-4 px-6 text-[10px] uppercase tracking-widest font-bold transition-all ${activeTab === 'products'
                                    ? 'text-[#c2a35d] border-b-2 border-[#c2a35d]'
                                    : 'text-white/50 hover:text-white/70'
                                    }`}
                            >
                                <Plus className="w-4 h-4 inline mr-2" />
                                {editingProduct ? 'Editar Producto' : 'Crear Producto'}
                            </button>
                            <button
                                onClick={() => { setActiveTab('manage'); fetchProducts(); }}
                                className={`pb-4 px-6 text-[10px] uppercase tracking-widest font-bold transition-all ${activeTab === 'manage'
                                    ? 'text-[#c2a35d] border-b-2 border-[#c2a35d]'
                                    : 'text-white/50 hover:text-white/70'
                                    }`}
                            >
                                <ShoppingBag className="w-4 h-4 inline mr-2" />
                                Gestionar Productos
                            </button>
                        </>
                    )}
                    <button
                        onClick={() => setActiveTab('orders')}
                        className={`pb-4 px-6 text-[10px] uppercase tracking-widest font-bold transition-all ${activeTab === 'orders'
                            ? 'text-[#c2a35d] border-b-2 border-[#c2a35d]'
                            : 'text-white/50 hover:text-white/70'
                            }`}
                    >
                        <Package className="w-4 h-4 inline mr-2" />
                        Pedidos
                    </button>
                </div>

                {/* Products Tab */}
                {activeTab === 'products' && (
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

                            {/* Image Gallery Manager */}
                            <div>
                                <label className="text-[#c2a35d] text-[9px] uppercase tracking-[0.3em] block mb-2">
                                    Galería de Imágenes
                                </label>

                                {/* Add New Image */}
                                <div className="flex gap-2 mb-4">
                                    <input
                                        type="url"
                                        value={newImageUrl}
                                        onChange={(e) => setNewImageUrl(e.target.value)}
                                        className="flex-1 bg-black border border-white/10 text-white px-4 py-3 text-sm focus:border-[#c2a35d] focus:outline-none transition-colors"
                                        placeholder="https://ejemplo.com/imagen.jpg"
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                if (newImageUrl.trim()) {
                                                    setFormData({
                                                        ...formData,
                                                        images: [...formData.images, newImageUrl.trim()]
                                                    });
                                                    setNewImageUrl('');
                                                }
                                            }
                                        }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (newImageUrl.trim()) {
                                                setFormData({
                                                    ...formData,
                                                    images: [...formData.images, newImageUrl.trim()]
                                                });
                                                setNewImageUrl('');
                                            }
                                        }}
                                        className="bg-[#c2a35d] text-black px-6 py-3 text-[10px] font-bold uppercase tracking-wider hover:bg-white transition-all duration-300 flex items-center gap-2"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Agregar
                                    </button>
                                </div>

                                {/* Images List */}
                                {formData.images.length > 0 ? (
                                    <div className="space-y-2">
                                        <p className="text-white/50 text-xs mb-3">
                                            {formData.images.length} imagen{formData.images.length !== 1 ? 'es' : ''} agregada{formData.images.length !== 1 ? 's' : ''}
                                            {formData.images.length > 0 && <span className="text-[#c2a35d] ml-2">(La primera será la imagen principal)</span>}
                                        </p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {formData.images.map((imageUrl, index) => (
                                                <div
                                                    key={index}
                                                    className="bg-black border border-white/10 p-3 flex items-center gap-3 group hover:border-[#c2a35d]/30 transition-all"
                                                >
                                                    {/* Image Preview */}
                                                    <div className="w-16 h-16 bg-black border border-white/5 flex-shrink-0 overflow-hidden">
                                                        <img
                                                            src={imageUrl}
                                                            alt={`Preview ${index + 1}`}
                                                            className="w-full h-full object-cover"
                                                            onError={(e) => {
                                                                e.target.style.display = 'none';
                                                                e.target.nextSibling.style.display = 'flex';
                                                            }}
                                                        />
                                                        <div className="w-full h-full hidden items-center justify-center">
                                                            <ImageIcon className="w-6 h-6 text-white/20" />
                                                        </div>
                                                    </div>

                                                    {/* Image Info */}
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-white/70 text-xs truncate mb-1">
                                                            {imageUrl}
                                                        </p>
                                                        {index === 0 && (
                                                            <span className="text-[#c2a35d] text-[8px] uppercase tracking-wider font-bold">
                                                                ★ Principal
                                                            </span>
                                                        )}
                                                    </div>

                                                    {/* Remove Button */}
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setFormData({
                                                                ...formData,
                                                                images: formData.images.filter((_, i) => i !== index)
                                                            });
                                                        }}
                                                        className="text-red-500 hover:text-red-400 transition-colors p-2 opacity-0 group-hover:opacity-100"
                                                        title="Eliminar imagen"
                                                    >
                                                        <X className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="bg-black border border-white/5 p-8 text-center">
                                        <ImageIcon className="w-12 h-12 text-white/10 mx-auto mb-3" />
                                        <p className="text-white/30 text-xs uppercase tracking-wider">
                                            No hay imágenes agregadas
                                        </p>
                                        <p className="text-white/20 text-[10px] mt-1">
                                            Agrega al menos una imagen para el producto
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Additional Product Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Gender */}
                                <div>
                                    <label className="text-[#c2a35d] text-[9px] uppercase tracking-[0.3em] block mb-2">
                                        Género
                                    </label>
                                    <select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        className="w-full bg-black border border-white/10 text-white px-4 py-3 text-sm focus:border-[#c2a35d] focus:outline-none transition-colors"
                                    >
                                        <option value="">Seleccionar...</option>
                                        <option value="Hombre">Hombre</option>
                                        <option value="Mujer">Mujer</option>
                                        <option value="Unisex">Unisex</option>
                                    </select>
                                </div>

                                {/* Size */}
                                <div>
                                    <label className="text-[#c2a35d] text-[9px] uppercase tracking-[0.3em] block mb-2">
                                        Tamaño
                                    </label>
                                    <input
                                        type="text"
                                        name="size"
                                        value={formData.size}
                                        onChange={handleChange}
                                        className="w-full bg-black border border-white/10 text-white px-4 py-3 text-sm focus:border-[#c2a35d] focus:outline-none transition-colors"
                                        placeholder="ej: 100ml, 50ml"
                                    />
                                </div>

                                {/* Concentration */}
                                <div>
                                    <label className="text-[#c2a35d] text-[9px] uppercase tracking-[0.3em] block mb-2">
                                        Concentración
                                    </label>
                                    <select
                                        name="concentration"
                                        value={formData.concentration}
                                        onChange={handleChange}
                                        className="w-full bg-black border border-white/10 text-white px-4 py-3 text-sm focus:border-[#c2a35d] focus:outline-none transition-colors"
                                    >
                                        <option value="">Seleccionar...</option>
                                        <option value="Extrait de Parfum">Extrait de Parfum</option>
                                        <option value="Eau de Parfum">Eau de Parfum (EDP)</option>
                                        <option value="Eau de Toilette">Eau de Toilette (EDT)</option>
                                        <option value="Eau de Cologne">Eau de Cologne (EDC)</option>
                                    </select>
                                </div>

                                {/* Olfactory Family */}
                                <div>
                                    <label className="text-[#c2a35d] text-[9px] uppercase tracking-[0.3em] block mb-2">
                                        Familia Olfativa
                                    </label>
                                    <input
                                        type="text"
                                        name="olfactoryFamily"
                                        value={formData.olfactoryFamily}
                                        onChange={handleChange}
                                        className="w-full bg-black border border-white/10 text-white px-4 py-3 text-sm focus:border-[#c2a35d] focus:outline-none transition-colors"
                                        placeholder="ej: Oriental, Amaderada, Floral"
                                    />
                                </div>
                            </div>

                            {/* Fragrance Notes */}
                            <div className="space-y-6">
                                <h3 className="text-[#c2a35d] text-sm uppercase tracking-wider border-b border-white/10 pb-2">
                                    Notas Olfativas
                                </h3>

                                {/* Top Notes */}
                                <div>
                                    <label className="text-[#c2a35d] text-[9px] uppercase tracking-[0.3em] block mb-2">
                                        Notas de Salida
                                    </label>
                                    <div className="flex gap-2 mb-3">
                                        <input
                                            type="text"
                                            value={newTopNote}
                                            onChange={(e) => setNewTopNote(e.target.value)}
                                            className="flex-1 bg-black border border-white/10 text-white px-4 py-2 text-sm focus:border-[#c2a35d] focus:outline-none transition-colors"
                                            placeholder="ej: Bergamota, Limón"
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    if (newTopNote.trim()) {
                                                        setFormData({
                                                            ...formData,
                                                            notes: {
                                                                ...formData.notes,
                                                                top: [...formData.notes.top, newTopNote.trim()]
                                                            }
                                                        });
                                                        setNewTopNote('');
                                                    }
                                                }
                                            }}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                if (newTopNote.trim()) {
                                                    setFormData({
                                                        ...formData,
                                                        notes: {
                                                            ...formData.notes,
                                                            top: [...formData.notes.top, newTopNote.trim()]
                                                        }
                                                    });
                                                    setNewTopNote('');
                                                }
                                            }}
                                            className="bg-[#c2a35d] text-black px-4 py-2 text-[10px] font-bold uppercase tracking-wider hover:bg-white transition-all duration-300"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                    {formData.notes?.top?.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {formData.notes.top?.map((note, index) => (
                                                <span
                                                    key={index}
                                                    className="bg-white/5 border border-white/10 px-3 py-1 text-xs text-white flex items-center gap-2 group hover:border-[#c2a35d]/30"
                                                >
                                                    {note}
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setFormData({
                                                                ...formData,
                                                                notes: {
                                                                    ...formData.notes,
                                                                    top: formData.notes.top.filter((_, i) => i !== index)
                                                                }
                                                            });
                                                        }}
                                                        className="text-red-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <X className="w-3 h-3" />
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Heart Notes */}
                                <div>
                                    <label className="text-[#c2a35d] text-[9px] uppercase tracking-[0.3em] block mb-2">
                                        Notas de Corazón
                                    </label>
                                    <div className="flex gap-2 mb-3">
                                        <input
                                            type="text"
                                            value={newHeartNote}
                                            onChange={(e) => setNewHeartNote(e.target.value)}
                                            className="flex-1 bg-black border border-white/10 text-white px-4 py-2 text-sm focus:border-[#c2a35d] focus:outline-none transition-colors"
                                            placeholder="ej: Rosa, Jazmín"
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    if (newHeartNote.trim()) {
                                                        setFormData({
                                                            ...formData,
                                                            notes: {
                                                                ...formData.notes,
                                                                heart: [...formData.notes.heart, newHeartNote.trim()]
                                                            }
                                                        });
                                                        setNewHeartNote('');
                                                    }
                                                }
                                            }}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                if (newHeartNote.trim()) {
                                                    setFormData({
                                                        ...formData,
                                                        notes: {
                                                            ...formData.notes,
                                                            heart: [...formData.notes.heart, newHeartNote.trim()]
                                                        }
                                                    });
                                                    setNewHeartNote('');
                                                }
                                            }}
                                            className="bg-[#c2a35d] text-black px-4 py-2 text-[10px] font-bold uppercase tracking-wider hover:bg-white transition-all duration-300"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                    {formData.notes?.heart?.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {formData.notes.heart?.map((note, index) => (
                                                <span
                                                    key={index}
                                                    className="bg-white/5 border border-white/10 px-3 py-1 text-xs text-white flex items-center gap-2 group hover:border-[#c2a35d]/30"
                                                >
                                                    {note}
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setFormData({
                                                                ...formData,
                                                                notes: {
                                                                    ...formData.notes,
                                                                    heart: formData.notes.heart.filter((_, i) => i !== index)
                                                                }
                                                            });
                                                        }}
                                                        className="text-red-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <X className="w-3 h-3" />
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Base Notes */}
                                <div>
                                    <label className="text-[#c2a35d] text-[9px] uppercase tracking-[0.3em] block mb-2">
                                        Notas de Fondo
                                    </label>
                                    <div className="flex gap-2 mb-3">
                                        <input
                                            type="text"
                                            value={newBaseNote}
                                            onChange={(e) => setNewBaseNote(e.target.value)}
                                            className="flex-1 bg-black border border-white/10 text-white px-4 py-2 text-sm focus:border-[#c2a35d] focus:outline-none transition-colors"
                                            placeholder="ej: Ámbar, Almizcle"
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    if (newBaseNote.trim()) {
                                                        setFormData({
                                                            ...formData,
                                                            notes: {
                                                                ...formData.notes,
                                                                base: [...formData.notes.base, newBaseNote.trim()]
                                                            }
                                                        });
                                                        setNewBaseNote('');
                                                    }
                                                }
                                            }}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                if (newBaseNote.trim()) {
                                                    setFormData({
                                                        ...formData,
                                                        notes: {
                                                            ...formData.notes,
                                                            base: [...formData.notes.base, newBaseNote.trim()]
                                                        }
                                                    });
                                                    setNewBaseNote('');
                                                }
                                            }}
                                            className="bg-[#c2a35d] text-black px-4 py-2 text-[10px] font-bold uppercase tracking-wider hover:bg-white transition-all duration-300"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                    {formData.notes?.base?.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {formData.notes.base?.map((note, index) => (
                                                <span
                                                    key={index}
                                                    className="bg-white/5 border border-white/10 px-3 py-1 text-xs text-white flex items-center gap-2 group hover:border-[#c2a35d]/30"
                                                >
                                                    {note}
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setFormData({
                                                                ...formData,
                                                                notes: {
                                                                    ...formData.notes,
                                                                    base: formData.notes.base.filter((_, i) => i !== index)
                                                                }
                                                            });
                                                        }}
                                                        className="text-red-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <X className="w-3 h-3" />
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
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
                            <div className="flex gap-4">
                                {editingProduct && (
                                    <button
                                        type="button"
                                        onClick={handleCancelEdit}
                                        className="flex-1 bg-white/10 text-white py-4 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-white/20 transition-all duration-500 border border-white/20"
                                    >
                                        Cancelar
                                    </button>
                                )}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`${editingProduct ? 'flex-1' : 'w-full'} bg-[#c2a35d] text-black py-4 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-white transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed`}
                                >
                                    {loading ? 'Guardando...' : (editingProduct ? 'Actualizar Producto' : 'Guardar Producto')}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}

                {/* Manage Products Tab */}
                {activeTab === 'manage' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <h2 className="text-[#c2a35d] text-xl uppercase tracking-widest mb-6 border-b border-white/10 pb-4">
                            Gestionar Productos
                        </h2>

                        {productsLoading ? (
                            <div className="text-center py-12 text-white/50">
                                <p>Cargando productos...</p>
                            </div>
                        ) : products.length === 0 ? (
                            <div className="text-center py-12 text-white/50">
                                <ShoppingBag className="w-16 h-16 mx-auto mb-4 opacity-20" />
                                <p>No hay productos en el catálogo</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {products.map((product) => (
                                    <div
                                        key={product._id}
                                        className="bg-[#0a0a0a] border border-white/10 p-4 hover:border-[#c2a35d]/30 transition-all group"
                                    >
                                        {/* Product Image */}
                                        <div className="aspect-square bg-black mb-4 overflow-hidden">
                                            <img
                                                src={product.images?.[0] || product.image || '/placeholder.jpg'}
                                                alt={product.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                onError={(e) => {
                                                    e.target.src = '/placeholder.jpg';
                                                }}
                                            />
                                        </div>

                                        {/* Product Info */}
                                        <div className="space-y-2 mb-4">
                                            <h3 className="text-white font-bold text-sm truncate">{product.name}</h3>
                                            <p className="text-white/50 text-xs uppercase tracking-wider">{product.brand}</p>
                                            <div className="flex items-center justify-between">
                                                <p className="text-[#c2a35d] font-bold">${product.price?.toLocaleString()}</p>
                                                <p className="text-white/50 text-xs">Stock: {product.stock}</p>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEditProduct(product)}
                                                className="flex-1 bg-[#c2a35d] text-black py-2 text-[9px] font-bold uppercase tracking-wider hover:bg-white transition-all duration-300"
                                            >
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => setDeleteConfirm(product)}
                                                className="flex-1 bg-red-900/20 border border-red-500/30 text-red-400 py-2 text-[9px] font-bold uppercase tracking-wider hover:bg-red-900/40 transition-all duration-300"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Delete Confirmation Modal */}
                        {deleteConfirm && (
                            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-[#0a0a0a] border border-red-500/30 p-8 max-w-md w-full"
                                >
                                    <h3 className="text-red-400 text-lg uppercase tracking-wider mb-4">
                                        Confirmar Eliminación
                                    </h3>
                                    <p className="text-white/70 mb-2">
                                        ¿Estás seguro de que deseas eliminar este producto?
                                    </p>
                                    <p className="text-white font-bold mb-6">
                                        {deleteConfirm.name}
                                    </p>
                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => setDeleteConfirm(null)}
                                            className="flex-1 bg-white/10 text-white py-3 text-[10px] font-bold uppercase tracking-wider hover:bg-white/20 transition-all duration-300"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            onClick={() => handleDeleteProduct(deleteConfirm._id)}
                                            className="flex-1 bg-red-600 text-white py-3 text-[10px] font-bold uppercase tracking-wider hover:bg-red-700 transition-all duration-300"
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </motion.div>
                            </div>
                        )}
                    </motion.div>
                )}

                {/* Orders Tab */}
                {activeTab === 'orders' && (
                    <div>
                        {/* Stats */}
                        {stats && (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                <div className="bg-[#0a0a0a] border border-white/5 p-6">
                                    <p className="text-white/50 text-xs uppercase tracking-wider mb-2">Total Pedidos</p>
                                    <p className="text-[#c2a35d] text-3xl font-light">{stats.totalOrders}</p>
                                </div>
                                <div className="bg-[#0a0a0a] border border-blue-500/20 p-6">
                                    <p className="text-white/50 text-xs uppercase tracking-wider mb-2">Confirmados</p>
                                    <p className="text-blue-500 text-3xl font-light">{stats.confirmedOrders}</p>
                                </div>
                                <div className="bg-[#0a0a0a] border border-green-500/20 p-6">
                                    <p className="text-white/50 text-xs uppercase tracking-wider mb-2">Listos</p>
                                    <p className="text-green-500 text-3xl font-light">{stats.readyOrders}</p>
                                </div>
                                <div className="bg-[#0a0a0a] border border-[#c2a35d]/20 p-6">
                                    <p className="text-white/50 text-xs uppercase tracking-wider mb-2">Ingresos</p>
                                    <p className="text-[#c2a35d] text-2xl font-light">$ {stats.totalRevenue?.toLocaleString()}</p>
                                </div>
                            </div>
                        )}

                        {/* Filters */}
                        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                            {['all', 'pending', 'confirmed', 'ready', 'completed'].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => {
                                        setOrderFilter(status);
                                        setTimeout(fetchOrders, 100);
                                    }}
                                    className={`px-4 py-2 text-[10px] uppercase tracking-widest font-bold whitespace-nowrap transition-all ${orderFilter === status
                                        ? 'bg-[#c2a35d] text-black'
                                        : 'bg-[#0a0a0a] text-white/50 border border-white/10 hover:border-[#c2a35d]/30'
                                        }`}
                                >
                                    {status === 'all' ? 'Todos' : getStatusText(status)}
                                </button>
                            ))}
                        </div>

                        {/* Orders List */}
                        {ordersLoading ? (
                            <div className="text-center py-12">
                                <p className="text-white/50">Cargando pedidos...</p>
                            </div>
                        ) : orders.length === 0 ? (
                            <div className="bg-[#0a0a0a] border border-white/5 p-12 text-center">
                                <Package className="w-16 h-16 text-white/20 mx-auto mb-4" />
                                <p className="text-white/50">No hay pedidos</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {orders.map((order) => (
                                    <div key={order._id} className="bg-[#0a0a0a] border border-white/5 p-6">
                                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                                            <div className="flex-1">
                                                <p className="text-[#c2a35d] text-sm font-bold uppercase tracking-wider mb-2">
                                                    {order.orderNumber}
                                                </p>
                                                <div className="space-y-1 text-xs text-white/50">
                                                    <p><span className="text-white/70">Cliente:</span> {order.customerInfo.name} {order.customerInfo.lastName}</p>
                                                    <p><span className="text-white/70">Email:</span> {order.customerInfo.email}</p>
                                                    <p><span className="text-white/70">Teléfono:</span> {order.customerInfo.phone}</p>
                                                    <p><span className="text-white/70">DNI:</span> {order.customerInfo.dni}</p>
                                                    <p><span className="text-white/70">Fecha:</span> {new Date(order.createdAt).toLocaleDateString('es-AR', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <div className="flex items-center gap-2 mb-2">
                                                    {getStatusIcon(order.status)}
                                                    <span className="text-sm font-bold uppercase tracking-wider text-white/70">
                                                        {getStatusText(order.status)}
                                                    </span>
                                                </div>
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                                    className="bg-black border border-white/10 text-white px-3 py-2 text-xs focus:border-[#c2a35d] focus:outline-none"
                                                >
                                                    <option value="pending">Pendiente</option>
                                                    <option value="confirmed">Confirmado</option>
                                                    <option value="ready">Listo para Retirar</option>
                                                    <option value="completed">Completado</option>
                                                    <option value="cancelled">Cancelado</option>
                                                </select>
                                            </div>
                                        </div>

                                        {/* Items */}
                                        <div className="border-t border-white/5 pt-4 space-y-2">
                                            {order.items.map((item, index) => (
                                                <div key={index} className="flex justify-between items-center text-sm">
                                                    <span className="text-white/70">{item.name} x{item.quantity}</span>
                                                    <span className="text-[#c2a35d]">$ {(item.price * item.quantity).toLocaleString()}</span>
                                                </div>
                                            ))}
                                            <div className="flex justify-between items-center pt-2 border-t border-[#c2a35d]/20">
                                                <span className="text-white uppercase tracking-widest text-sm font-bold">Total</span>
                                                <span className="text-[#c2a35d] text-xl font-light">$ {order.total.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

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

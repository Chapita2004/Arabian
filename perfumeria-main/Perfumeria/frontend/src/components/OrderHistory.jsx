import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Package, Clock, CheckCircle, XCircle, Truck } from 'lucide-react';
import OrderService from '../api/order.service';
import Breadcrumbs from './Breadcrumbs';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const navigate = useNavigate();

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const data = await OrderService.getMyOrders();
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
            if (error.response?.status === 401) {
                navigate('/auth');
            }
        } finally {
            setLoading(false);
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending':
                return <Clock className="w-5 h-5 text-yellow-500" />;
            case 'confirmed':
                return <Package className="w-5 h-5 text-blue-500" />;
            case 'ready':
                return <Truck className="w-5 h-5 text-green-500" />;
            case 'completed':
                return <CheckCircle className="w-5 h-5 text-green-600" />;
            case 'cancelled':
                return <XCircle className="w-5 h-5 text-red-500" />;
            default:
                return <Package className="w-5 h-5 text-gray-500" />;
        }
    };

    const getStatusText = (status) => {
        const statusMap = {
            pending: 'Pendiente',
            confirmed: 'Confirmado',
            ready: 'Listo para Retirar',
            completed: 'Completado',
            cancelled: 'Cancelado'
        };
        return statusMap[status] || status;
    };

    const getStatusColor = (status) => {
        const colorMap = {
            pending: 'text-yellow-500',
            confirmed: 'text-blue-500',
            ready: 'text-green-500',
            completed: 'text-green-600',
            cancelled: 'text-red-500'
        };
        return colorMap[status] || 'text-gray-500';
    };

    const filteredOrders = filter === 'all'
        ? orders
        : orders.filter(order => order.status === filter);

    if (loading) {
        return (
            <div className="bg-perfume-pattern min-h-screen">
                <div className="max-w-6xl mx-auto px-6 py-32 text-center">
                    <p className="text-white/50">Cargando pedidos...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-perfume-pattern min-h-screen">
            <div className="max-w-6xl mx-auto px-6 py-32">
                <Breadcrumbs items={[
                    { label: 'Inicio', path: '/' },
                    { label: 'Mi Cuenta', path: null },
                    { label: 'Mis Pedidos', path: null }
                ]} />
                {/* Header */}
                <div className="mb-12 text-center">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "80px" }}
                        className="h-[1px] bg-[#c2a35d] mx-auto mb-6"
                    />
                    <h1 className="text-[#c2a35d] text-4xl md:text-5xl font-extralight uppercase tracking-tighter italic mb-4">
                        Mis Pedidos
                    </h1>
                    <p className="text-white/50 text-[10px] uppercase tracking-[0.4em]">
                        Historial de Compras
                    </p>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "80px" }}
                        className="h-[1px] bg-[#c2a35d] mx-auto mt-6"
                    />
                </div>

                {/* Filters */}
                <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
                    {['all', 'pending', 'confirmed', 'ready', 'completed'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`px-4 py-2 text-[10px] uppercase tracking-widest font-bold whitespace-nowrap transition-all ${filter === status
                                ? 'bg-[#c2a35d] text-black'
                                : 'bg-[#0a0a0a] text-white/50 border border-white/10 hover:border-[#c2a35d]/30'
                                }`}
                        >
                            {status === 'all' ? 'Todos' : getStatusText(status)}
                        </button>
                    ))}
                </div>

                {/* Orders List */}
                {filteredOrders.length === 0 ? (
                    <div className="bg-[#0a0a0a] border border-white/5 p-12 text-center">
                        <Package className="w-16 h-16 text-white/20 mx-auto mb-4" />
                        <p className="text-white/50 text-sm mb-4">
                            {filter === 'all'
                                ? 'No tienes pedidos aún'
                                : `No tienes pedidos ${getStatusText(filter).toLowerCase()}`}
                        </p>
                        <button
                            onClick={() => navigate('/')}
                            className="bg-[#c2a35d] text-black px-6 py-3 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-white transition-all"
                        >
                            Ir a la Tienda
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredOrders.map((order) => (
                            <motion.div
                                key={order._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-[#0a0a0a] border border-white/5 p-6 hover:border-[#c2a35d]/30 transition-all"
                            >
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                                    <div>
                                        <p className="text-[#c2a35d] text-sm font-bold uppercase tracking-wider mb-1">
                                            {order.orderNumber}
                                        </p>
                                        <p className="text-white/50 text-xs">
                                            {new Date(order.createdAt).toLocaleDateString('es-AR', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {getStatusIcon(order.status)}
                                        <span className={`text-sm font-bold uppercase tracking-wider ${getStatusColor(order.status)}`}>
                                            {getStatusText(order.status)}
                                        </span>
                                    </div>
                                </div>

                                {/* Items */}
                                <div className="space-y-3 mb-4">
                                    {order.items.map((item, index) => (
                                        <div key={index} className="flex gap-4 items-center border-b border-white/5 pb-3 last:border-0">
                                            {item.image && (
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-12 h-12 object-cover bg-black"
                                                />
                                            )}
                                            <div className="flex-1">
                                                <p className="text-white text-sm font-bold">{item.name}</p>
                                                <p className="text-white/50 text-xs">{item.brand}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-white/50 text-xs">x{item.quantity}</p>
                                                <p className="text-[#c2a35d] text-sm font-light">
                                                    $ {(item.price * item.quantity).toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Total */}
                                <div className="flex justify-between items-center pt-4 border-t border-[#c2a35d]/20">
                                    <span className="text-white uppercase tracking-widest text-sm">Total</span>
                                    <span className="text-[#c2a35d] text-xl font-light">
                                        $ {order.total.toLocaleString()}
                                    </span>
                                </div>

                                {/* Ready for pickup message */}
                                {order.status === 'ready' && (
                                    <div className="mt-4 bg-green-500/10 border border-green-500/30 p-4">
                                        <p className="text-green-500 text-sm font-bold uppercase tracking-wider mb-1">
                                            ¡Tu pedido está listo!
                                        </p>
                                        <p className="text-white/70 text-xs">
                                            Puedes retirarlo en nuestro local. No olvides traer tu DNI.
                                        </p>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderHistory;

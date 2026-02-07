import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Navbar from './Navbar';
import PaymentService from '../api/payment.service';

const CheckoutPage = () => {
    const navigate = useNavigate();
    const { cartItems, cartCount } = useCart();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    });

    const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleCheckout = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Prepare order data for Mercado Pago
            const orderData = {
                items: cartItems.map(item => ({
                    title: `${item.brand} - ${item.name}`,
                    quantity: item.quantity,
                    unit_price: Number(item.price),
                    currency_id: 'ARS'
                })),
                payer: {
                    name: formData.name,
                    email: formData.email,
                    phone: {
                        number: formData.phone
                    }
                }
            };

            // Call payment service to create preference
            const response = await PaymentService.createPreference(orderData);

            // Redirect to Mercado Pago
            if (response.init_point) {
                window.location.href = response.init_point;
            }
        } catch (error) {
            console.error('Error creating payment:', error);
            alert('Error al procesar el pago. Por favor, intenta nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    if (cartCount === 0) {
        return (
            <div className="bg-black min-h-screen">
                <Navbar />
                <div className="max-w-4xl mx-auto px-6 py-32 text-center">
                    <h1 className="text-[#c2a35d] text-3xl font-light uppercase tracking-tighter italic mb-4">
                        Carrito Vacío
                    </h1>
                    <p className="text-white/50 text-sm mb-8">No hay productos en tu carrito</p>
                    <button
                        onClick={() => navigate('/')}
                        className="bg-[#c2a35d] text-black px-8 py-3 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-white transition-all"
                    >
                        Volver a la Tienda
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-black min-h-screen">
            <Navbar />

            <div className="max-w-6xl mx-auto px-6 py-32">
                {/* Header */}
                <div className="mb-12 text-center">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "80px" }}
                        className="h-[1px] bg-[#c2a35d] mx-auto mb-6"
                    />
                    <h1 className="text-[#c2a35d] text-4xl md:text-5xl font-extralight uppercase tracking-tighter italic mb-4">
                        Finalizar Compra
                    </h1>
                    <p className="text-white/50 text-[10px] uppercase tracking-[0.4em]">
                        {cartCount} Productos - Total: $ {total.toLocaleString()}
                    </p>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "80px" }}
                        className="h-[1px] bg-[#c2a35d] mx-auto mt-6"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Order Summary */}
                    <div className="bg-[#0a0a0a] border border-white/5 p-8">
                        <h2 className="text-[#c2a35d] text-xl font-light uppercase tracking-[0.3em] mb-6">
                            Resumen del Pedido
                        </h2>
                        <div className="space-y-4">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex justify-between items-center border-b border-white/5 pb-4">
                                    <div className="flex-1">
                                        <p className="text-white text-sm font-bold">{item.name}</p>
                                        <p className="text-white/50 text-xs">{item.brand}</p>
                                        <p className="text-white/50 text-xs">Cantidad: {item.quantity}</p>
                                    </div>
                                    <p className="text-[#c2a35d] font-light">
                                        $ {(item.price * item.quantity).toLocaleString()}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 pt-6 border-t border-[#c2a35d]/20">
                            <div className="flex justify-between items-center">
                                <span className="text-white uppercase tracking-[0.3em] text-sm">Total</span>
                                <span className="text-[#c2a35d] text-2xl font-light">
                                    $ {total.toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Checkout Form */}
                    <div className="bg-[#0a0a0a] border border-white/5 p-8">
                        <h2 className="text-[#c2a35d] text-xl font-light uppercase tracking-[0.3em] mb-6">
                            Datos de Contacto
                        </h2>
                        <form onSubmit={handleCheckout} className="space-y-6">
                            <div>
                                <label className="text-[#c2a35d] text-[9px] uppercase tracking-[0.3em] block mb-2">
                                    Nombre Completo
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-black border border-white/10 text-white px-4 py-3 text-sm focus:border-[#c2a35d] focus:outline-none transition-colors"
                                    placeholder="Juan Pérez"
                                />
                            </div>

                            <div>
                                <label className="text-[#c2a35d] text-[9px] uppercase tracking-[0.3em] block mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-black border border-white/10 text-white px-4 py-3 text-sm focus:border-[#c2a35d] focus:outline-none transition-colors"
                                    placeholder="correo@ejemplo.com"
                                />
                            </div>

                            <div>
                                <label className="text-[#c2a35d] text-[9px] uppercase tracking-[0.3em] block mb-2">
                                    Teléfono
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-black border border-white/10 text-white px-4 py-3 text-sm focus:border-[#c2a35d] focus:outline-none transition-colors"
                                    placeholder="2646285919"
                                />
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-[#c2a35d] text-black py-4 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-white transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Procesando...' : 'Pagar con Mercado Pago'}
                                </button>
                                <p className="text-white/30 text-[8px] text-center mt-4 uppercase tracking-widest">
                                    Serás redirigido a Mercado Pago
                                </p>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Back Button */}
                <div className="mt-8 text-center">
                    <button
                        onClick={() => navigate('/')}
                        className="text-[#c2a35d] text-[9px] uppercase tracking-[0.3em] hover:text-white transition-colors"
                    >
                        ← Seguir Comprando
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;

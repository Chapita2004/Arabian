import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useCart } from '../context/CartContext';
import PaymentService from '../api/payment.service';
import { Store, Truck } from 'lucide-react';
import SEO from './SEO';
import Breadcrumbs from './Breadcrumbs';

const CheckoutPage = () => {
    const navigate = useNavigate();
    const { cart, cartCount } = useCart();
    const [loading, setLoading] = useState(false);
    const [deliveryType, setDeliveryType] = useState('pickup');
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        dni: '',
        email: '',
        phone: '',
        zipCode: '',
        province: '',
        city: '',
        street: '',
        number: '',
        floor: ''
    });

    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

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
            // Base payer data
            const payerData = {
                name: formData.name,
                surname: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                identification: formData.dni
            };

            // Add address only if shipping is selected
            if (deliveryType === 'shipping') {
                payerData.address = {
                    zip_code: formData.zipCode,
                    street_name: formData.street,
                    street_number: formData.number
                };
            }

            // Prepare order data for Mercado Pago
            const orderData = {
                items: cart.map(item => ({
                    id: item.id,
                    title: `${item.brand} - ${item.name}`,
                    quantity: item.quantity,
                    price: Number(item.price), // backend expects price, controller maps it to unit_price
                    currency_id: 'ARS'
                })),
                payer: payerData
            };

            // Call payment service to create preference
            const response = await PaymentService.createPreference(orderData);

            // Redirect to Mercado Pago
            if (response.init_point) {
                window.location.href = response.init_point;
            } else {
                console.error("No init_point in response", response);
                alert("Error: No se pudo iniciar el pago.");
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
            <div className="bg-perfume-pattern min-h-screen">
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
        <div className="bg-perfume-pattern min-h-screen">
            <SEO
                title="Checkout - Arabian Exclusive"
                description="Finalizar compra"
                url="/checkout"
            />
            <Helmet>
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <div className="max-w-6xl mx-auto px-6 py-32">
                <Breadcrumbs items={[
                    { label: 'Inicio', path: '/' },
                    { label: 'Carrito', path: '/' },
                    { label: 'Checkout', path: null }
                ]} />
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
                            {cart.map((item) => (
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
                        <form onSubmit={handleCheckout} className="space-y-8">
                            {/* Sección 1: Datos Personales */}
                            <div>
                                <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-4 border-b border-white/10 pb-2">
                                    1. Datos Personales
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[#c2a35d] text-[9px] uppercase tracking-[0.2em] block mb-2">Nombre *</label>
                                        <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-black border border-white/10 text-white px-4 py-3 text-sm focus:border-[#c2a35d] focus:outline-none transition-colors" placeholder="Juan" />
                                    </div>
                                    <div>
                                        <label className="text-[#c2a35d] text-[9px] uppercase tracking-[0.2em] block mb-2">Apellido *</label>
                                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required className="w-full bg-black border border-white/10 text-white px-4 py-3 text-sm focus:border-[#c2a35d] focus:outline-none transition-colors" placeholder="Pérez" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="text-[#c2a35d] text-[9px] uppercase tracking-[0.2em] block mb-2">DNI / Documento *</label>
                                        <input type="text" name="dni" value={formData.dni} onChange={handleChange} required className="w-full bg-black border border-white/10 text-white px-4 py-3 text-sm focus:border-[#c2a35d] focus:outline-none transition-colors" placeholder="12345678" />
                                    </div>
                                </div>
                            </div>

                            {/* Sección 2: Contacto */}
                            <div>
                                <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-4 border-b border-white/10 pb-2">
                                    2. Contacto
                                </h3>
                                <div className="grid grid-cols-1 gap-4">
                                    <div>
                                        <label className="text-[#c2a35d] text-[9px] uppercase tracking-[0.2em] block mb-2">Email *</label>
                                        <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full bg-black border border-white/10 text-white px-4 py-3 text-sm focus:border-[#c2a35d] focus:outline-none transition-colors" placeholder="juan@ejemplo.com" />
                                    </div>
                                    <div>
                                        <label className="text-[#c2a35d] text-[9px] uppercase tracking-[0.2em] block mb-2">Teléfono / WhatsApp *</label>
                                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full bg-black border border-white/10 text-white px-4 py-3 text-sm focus:border-[#c2a35d] focus:outline-none transition-colors" placeholder="264..." />
                                    </div>
                                </div>
                            </div>

                            {/* Sección 3: Método de Entrega */}
                            <div>
                                <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-4 border-b border-white/10 pb-2">
                                    3. Método de Entrega
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                    {/* Opción 1: Retiro por el Local */}
                                    <div
                                        onClick={() => setDeliveryType('pickup')}
                                        className={`cursor-pointer border p-4 transition-all ${deliveryType === 'pickup'
                                            ? 'border-[#c2a35d] bg-[#c2a35d]/10'
                                            : 'border-white/10 hover:border-white/30'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3 mb-2">
                                            <Store className={`w-5 h-5 ${deliveryType === 'pickup' ? 'text-[#c2a35d]' : 'text-white/50'}`} />
                                            <span className={`text-sm font-bold uppercase tracking-widest ${deliveryType === 'pickup' ? 'text-[#c2a35d]' : 'text-white'}`}>
                                                Retiro por el Local
                                            </span>
                                        </div>
                                        <p className="text-white/50 text-xs">Retira tu pedido en nuestra sucursal de inmediato.</p>
                                    </div>

                                    {/* Opción 2: Envío a Domicilio (Deshabilitado) */}
                                    <div className="border border-white/5 p-4 opacity-50 relative overflow-hidden cursor-not-allowed">
                                        <div className="absolute top-0 right-0 bg-[#c2a35d] text-black text-[8px] font-bold px-2 py-1 uppercase tracking-widest">
                                            Próximamente
                                        </div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <Truck className="w-5 h-5 text-white/30" />
                                            <span className="text-white/30 text-sm font-bold uppercase tracking-widest">
                                                Envío a Domicilio
                                            </span>
                                        </div>
                                        <p className="text-white/30 text-xs">Recibe tu pedido en la comodidad de tu hogar.</p>
                                    </div>
                                </div>

                                {/* Formulario de Dirección (Solo si es envío) */}
                                {deliveryType === 'shipping' && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn">
                                        <div>
                                            <label className="text-[#c2a35d] text-[9px] uppercase tracking-[0.2em] block mb-2">Código Postal *</label>
                                            <input type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} required={deliveryType === 'shipping'} className="w-full bg-black border border-white/10 text-white px-4 py-3 text-sm focus:border-[#c2a35d] focus:outline-none transition-colors" placeholder="5400" />
                                        </div>
                                        <div>
                                            <label className="text-[#c2a35d] text-[9px] uppercase tracking-[0.2em] block mb-2">Provincia *</label>
                                            <input type="text" name="province" value={formData.province} onChange={handleChange} required={deliveryType === 'shipping'} className="w-full bg-black border border-white/10 text-white px-4 py-3 text-sm focus:border-[#c2a35d] focus:outline-none transition-colors" placeholder="San Juan" />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="text-[#c2a35d] text-[9px] uppercase tracking-[0.2em] block mb-2">Ciudad / Localidad *</label>
                                            <input type="text" name="city" value={formData.city} onChange={handleChange} required={deliveryType === 'shipping'} className="w-full bg-black border border-white/10 text-white px-4 py-3 text-sm focus:border-[#c2a35d] focus:outline-none transition-colors" />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="text-[#c2a35d] text-[9px] uppercase tracking-[0.2em] block mb-2">Calle *</label>
                                            <input type="text" name="street" value={formData.street} onChange={handleChange} required={deliveryType === 'shipping'} className="w-full bg-black border border-white/10 text-white px-4 py-3 text-sm focus:border-[#c2a35d] focus:outline-none transition-colors" />
                                        </div>
                                        <div>
                                            <label className="text-[#c2a35d] text-[9px] uppercase tracking-[0.2em] block mb-2">Número *</label>
                                            <input type="text" name="number" value={formData.number} onChange={handleChange} required={deliveryType === 'shipping'} className="w-full bg-black border border-white/10 text-white px-4 py-3 text-sm focus:border-[#c2a35d] focus:outline-none transition-colors" />
                                        </div>
                                        <div>
                                            <label className="text-[#c2a35d] text-[9px] uppercase tracking-[0.2em] block mb-2">Piso / Depto (Opcional)</label>
                                            <input type="text" name="floor" value={formData.floor} onChange={handleChange} className="w-full bg-black border border-white/10 text-white px-4 py-3 text-sm focus:border-[#c2a35d] focus:outline-none transition-colors" />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="pt-8">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-[#c2a35d] text-black py-4 text-[11px] font-bold uppercase tracking-[0.4em] hover:bg-white transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(194,163,93,0.3)] hover:shadow-[0_0_30px_rgba(194,163,93,0.5)]"
                                >
                                    {loading ? 'Procesando...' : 'Ir a Pagar'}
                                </button>
                                <div className="mt-4 flex justify-center gap-4 opacity-50">
                                    {/* Placeholder icons for payment methods */}
                                    <div className="h-6 w-10 bg-white/10 rounded"></div>
                                    <div className="h-6 w-10 bg-white/10 rounded"></div>
                                    <div className="h-6 w-10 bg-white/10 rounded"></div>
                                </div>
                                <p className="text-white/30 text-[8px] text-center mt-4 uppercase tracking-widest">
                                    Pago seguro procesado por Mercado Pago
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

import React, { useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import { useCart } from '../context/CartContext';

const PaymentResult = ({ status }) => {
    const [searchParams] = useSearchParams();
    const paymentId = searchParams.get('payment_id');
    const { cart, removeFromCart } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        if (status === 'success') {
            // Clear cart on success
            const clearCart = async () => {
                // Remove all items from cart context
                // We create a copy to iterate because removeFromCart modifies the array
                const itemsToRemove = [...cart];
                for (const item of itemsToRemove) {
                    await removeFromCart(item.id);
                }
            };
            clearCart();
        }
    }, [status]);

    const renderContent = () => {
        switch (status) {
            case 'success':
                return (
                    <>
                        <CheckCircle size={80} className="text-green-500 mb-6 mx-auto" />
                        <h1 className="text-[#c2a35d] text-3xl font-light uppercase tracking-tighter italic mb-4">
                            ¡Pago Exitoso!
                        </h1>
                        <p className="text-white/70 text-sm mb-6">
                            Tu pago ha sido procesado correctamente. <br />
                            ID de Pago: <span className="text-white font-mono">{paymentId}</span>
                        </p>
                        <p className="text-white/50 text-xs mb-8">
                            Gracias por tu compra. Te enviaremos un email con los detalles.
                        </p>
                    </>
                );
            case 'failure':
                return (
                    <>
                        <XCircle size={80} className="text-red-500 mb-6 mx-auto" />
                        <h1 className="text-[#c2a35d] text-3xl font-light uppercase tracking-tighter italic mb-4">
                            Pago Fallido
                        </h1>
                        <p className="text-white/70 text-sm mb-6">
                            Hubo un problema al procesar tu pago.
                        </p>
                        <button
                            onClick={() => navigate('/checkout')}
                            className="text-[#c2a35d] uppercase tracking-widest text-xs border-b border-[#c2a35d] hover:text-white pb-1"
                        >
                            Intentar nuevamente
                        </button>
                    </>
                );
            case 'pending':
                return (
                    <>
                        <Clock size={80} className="text-yellow-500 mb-6 mx-auto" />
                        <h1 className="text-[#c2a35d] text-3xl font-light uppercase tracking-tighter italic mb-4">
                            Pago Pendiente
                        </h1>
                        <p className="text-white/70 text-sm mb-6">
                            Tu pago está siendo procesado. Te avisaremos cuando se confirme.
                        </p>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className="bg-perfume-pattern min-h-screen flex flex-col items-center justify-center text-center px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#0a0a0a] border border-white/10 p-12 max-w-md w-full"
            >
                {renderContent()}

                <div className="mt-8 pt-8 border-t border-white/5">
                    <Link
                        to="/"
                        className="bg-[#c2a35d] text-black px-8 py-3 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-white transition-all inline-block"
                    >
                        Volver a la Tienda
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default PaymentResult;

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, CreditCard } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { config } from '../api/config';
import PaymentService from '../api/payment.service';

const CartDrawer = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, cartTotal } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const [preferenceId, setPreferenceId] = useState(null);

  // Initialize Mercado Pago
  initMercadoPago(config.MERCADOPAGO_PUBLIC_KEY, { locale: 'es-AR' });

  const handleCreatePreference = async () => {
    setIsLoading(true);
    try {
      const items = cart.map(item => ({
        id: item.id,
        title: item.name,
        quantity: Number(item.quantity),
        price: typeof item.price === 'string'
          ? parseFloat(item.price.replace(/[^0-9.-]+/g, ""))
          : item.price
      }));

      const data = await PaymentService.createPreference(items);

      if (data.id) {
        setPreferenceId(data.id);
      } else {
        alert("No se pudo generar el pago");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al conectar con el servidor de pagos");
    } finally {
      setIsLoading(false);
    }
  };

  const handleWhatsApp = () => {
    const message = cart.map(i => `- ${i.name} (x${i.quantity})`).join('\n');
    const url = `https://wa.me/TUNUMERO?text=Hola! Quiero mi pedido:\n${encodeURIComponent(message)}\n\nTotal: $${cartTotal.toLocaleString('es-AR')}`;
    window.open(url, '_blank');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
          />

          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-[#c2a35d]/30 z-[201] p-8 flex flex-col shadow-2xl"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-[#c2a35d] text-xl font-bold tracking-tighter uppercase">Tu Bolsa</h2>
              <button onClick={() => setIsCartOpen(false)}><X className="text-[#c2a35d]" /></button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-6 pr-2">
              {cart.length === 0 ? (
                <p className="text-gray-500 text-center uppercase text-[10px] tracking-widest mt-20">Tu bolsa está vacía</p>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-4 border-b border-white/5 pb-4 items-center">
                    <img src={item.img} alt={item.name} className="w-16 h-16 object-contain bg-[#111] rounded" />
                    <div className="flex-1">
                      <h4 className="text-[11px] font-bold uppercase text-white leading-tight">{item.name}</h4>
                      <p className="text-[#c2a35d] text-[10px] mt-1">{item.quantity} x ${item.price}</p>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-gray-600 hover:text-red-500"><Trash2 size={16} /></button>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="pt-8 border-t border-[#c2a35d]/20 space-y-4">
                <div className="flex justify-between mb-4">
                  <span className="text-[10px] uppercase tracking-widest text-gray-400">Total Estimado</span>
                  <span className="text-xl font-light text-[#c2a35d]">${cartTotal.toLocaleString('es-AR')}</span>
                </div>

                {/* BOTÓN ÚNICO DE PAGO */}
                {preferenceId ? (
                  <Wallet initialization={{ preferenceId: preferenceId }} customization={{ texts: { valueProp: 'smart_option' } }} />
                ) : (
                  <button
                    onClick={handleCreatePreference}
                    disabled={isLoading}
                    className="w-full bg-white text-black font-black py-4 uppercase text-[10px] tracking-[0.2em] hover:bg-[#c2a35d] hover:text-white transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <CreditCard size={14} />
                    {isLoading ? 'Procesando...' : 'Ir a Pagar'}
                  </button>
                )}

                <button
                  onClick={handleWhatsApp}
                  className="w-full border border-[#c2a35d]/50 text-[#c2a35d] font-bold py-3 uppercase text-[9px] tracking-[0.2em] hover:bg-[#c2a35d]/10 transition-colors"
                >
                  Pedido por WhatsApp
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
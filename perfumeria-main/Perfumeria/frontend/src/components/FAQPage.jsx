import React, { useState } from 'react';
import LegalPage from './LegalPage';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-black/30 border border-white/5 hover:border-[#c2a35d]/30 transition-colors">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-6 text-left flex items-center justify-between gap-4"
            >
                <h3 className="text-white font-bold text-lg">{question}</h3>
                {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-[#c2a35d] flex-shrink-0" />
                ) : (
                    <ChevronDown className="w-5 h-5 text-[#c2a35d] flex-shrink-0" />
                )}
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="px-6 pb-6 text-white/80 leading-relaxed">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FAQPage = () => {
    const faqs = [
        {
            question: '¿Cómo puedo realizar una compra?',
            answer: 'Es muy simple: navega por nuestro catálogo, agrega los productos que desees al carrito, completa tus datos de envío y selecciona tu método de pago preferido. Recibirás una confirmación por email con los detalles de tu pedido.'
        },
        {
            question: '¿Qué métodos de pago aceptan?',
            answer: 'Aceptamos Mercado Pago (tarjetas de crédito y débito), transferencia bancaria (con 10% de descuento) y efectivo en nuestra tienda física.'
        },
        {
            question: '¿Cuánto demora el envío?',
            answer: 'Los tiempos de entrega varían según tu ubicación: San Juan Capital (24-48 horas), Gran San Juan (2-4 días hábiles), y resto de Argentina (5-10 días hábiles). También ofrecemos retiro gratuito en tienda.'
        },
        {
            question: '¿Puedo devolver un producto?',
            answer: 'Sí, tienes 10 días corridos desde la recepción para ejercer tu derecho de arrepentimiento según la Ley de Defensa del Consumidor. El producto debe estar sin abrir, sin usar y con su embalaje original. Por razones de higiene, no se aceptan devoluciones de perfumes abiertos.'
        },
        {
            question: '¿Los perfumes son originales?',
            answer: '¡Absolutamente! Todos nuestros productos son 100% originales, importados directamente de las casas de perfumería. Garantizamos la autenticidad de cada fragancia.'
        },
        {
            question: '¿Tienen tienda física?',
            answer: 'Sí, estamos ubicados en San Juan, Argentina. Puedes visitarnos de lunes a viernes de 9:00 a 20:00 y sábados de 9:00 a 13:00. También ofrecemos retiro gratuito en tienda.'
        },
        {
            question: '¿Hacen envíos a todo el país?',
            answer: 'Sí, realizamos envíos a todo Argentina a través de correo (Andreani, OCA). Los costos y tiempos varían según el destino.'
        },
        {
            question: '¿Cuál es el costo de envío?',
            answer: 'El costo de envío depende de tu ubicación y el peso del paquete. En San Juan Capital, el envío es gratis en compras superiores a $50.000. El costo exacto se calcula en el checkout.'
        },
        {
            question: '¿Puedo rastrear mi pedido?',
            answer: 'Sí, una vez despachado tu pedido recibirás un email con el número de seguimiento. También puedes ver el estado en la sección "Mis Pedidos" de tu cuenta.'
        },
        {
            question: '¿Qué hago si recibo un producto dañado?',
            answer: 'Contáctanos dentro de las 48 horas de recibido enviando fotos del producto y embalaje a devoluciones@arabianexclusive.com. Nos haremos cargo del envío de devolución y ofreceremos reemplazo o reembolso.'
        },
        {
            question: '¿Necesito crear una cuenta para comprar?',
            answer: 'Sí, necesitas crear una cuenta para realizar compras. Esto te permite rastrear tus pedidos, guardar direcciones y acceder a ofertas exclusivas.'
        },
        {
            question: '¿Ofrecen garantía en los productos?',
            answer: 'Todos nuestros productos cuentan con garantía de autenticidad. Si recibes un producto defectuoso o diferente al pedido, lo reemplazamos sin costo.'
        },
        {
            question: '¿Puedo cambiar un producto por otro?',
            answer: 'Sí, puedes solicitar un cambio dentro de los 10 días de recibido. El producto debe estar sin abrir y el cambio está sujeto a disponibilidad de stock.'
        },
        {
            question: '¿Cómo sé qué fragancia elegir?',
            answer: 'Cada producto tiene una descripción detallada con notas olfativas, familia olfativa y recomendaciones. También puedes leer las reseñas de otros clientes o visitarnos en tienda para asesoramiento personalizado.'
        },
        {
            question: '¿Tienen programa de fidelidad o descuentos?',
            answer: 'Ofrecemos 10% de descuento en transferencias bancarias y promociones especiales regularmente. Suscríbete a nuestro newsletter para recibir ofertas exclusivas.'
        }
    ];

    return (
        <LegalPage
            title="Preguntas Frecuentes"
            lastUpdated="09 de Febrero de 2026"
            description="Respuestas a las preguntas más frecuentes sobre Arabian Exclusive"
        >
            <p className="text-white/80 leading-relaxed mb-8">
                Encuentra respuestas a las preguntas más comunes sobre nuestros productos, envíos, devoluciones y más.
            </p>

            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <FAQItem key={index} question={faq.question} answer={faq.answer} />
                ))}
            </div>

            <div className="mt-12 bg-gradient-to-r from-[#c2a35d]/10 to-transparent p-8 border-l-4 border-[#c2a35d]">
                <h3 className="text-[#c2a35d] text-xl font-bold mb-4">¿No encontraste tu respuesta?</h3>
                <p className="text-white/80 mb-4">
                    Estamos aquí para ayudarte. Contáctanos y responderemos todas tus consultas.
                </p>
                <ul className="list-none text-white/80 space-y-2">
                    <li>📧 Email: info@arabianexclusive.com</li>
                    <li>📍 Tienda: San Juan, Argentina</li>
                </ul>
            </div>
        </LegalPage>
    );
};

export default FAQPage;

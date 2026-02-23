import React from 'react';
import LegalPage from './LegalPage';

const ShippingPage = () => {
    return (
        <LegalPage
            title="Política de Envíos"
            lastUpdated="09 de Febrero de 2026"
            description="Información sobre envíos y entregas de Arabian Exclusive"
        >
            <section className="mb-8">
                <h2 className="text-[#c2a35d] text-xl uppercase tracking-wider mb-4">1. Zonas de Envío</h2>
                <p className="text-white/80 leading-relaxed mb-4">
                    Realizamos envíos a:
                </p>
                <ul className="list-disc list-inside text-white/80 leading-relaxed space-y-2 ml-4">
                    <li><strong>San Juan Capital:</strong> Envío gratis en compras superiores a $50.000</li>
                    <li><strong>Gran San Juan:</strong> Costo de envío según zona</li>
                    <li><strong>Resto de Argentina:</strong> A través de correo (Andreani, OCA)</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-[#c2a35d] text-xl uppercase tracking-wider mb-4">2. Tiempos de Entrega</h2>
                <div className="space-y-4">
                    <div className="bg-black/30 p-4 border-l-2 border-[#c2a35d]">
                        <h3 className="text-white font-bold mb-2">📍 San Juan Capital</h3>
                        <p className="text-white/80">24-48 horas hábiles</p>
                    </div>
                    <div className="bg-black/30 p-4 border-l-2 border-[#c2a35d]">
                        <h3 className="text-white font-bold mb-2">📍 Gran San Juan</h3>
                        <p className="text-white/80">2-4 días hábiles</p>
                    </div>
                    <div className="bg-black/30 p-4 border-l-2 border-[#c2a35d]">
                        <h3 className="text-white font-bold mb-2">📍 Resto de Argentina</h3>
                        <p className="text-white/80">5-10 días hábiles (según destino)</p>
                    </div>
                </div>
                <p className="text-white/60 text-sm mt-4">
                    * Los tiempos son estimados y pueden variar según disponibilidad y condiciones climáticas.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-[#c2a35d] text-xl uppercase tracking-wider mb-4">3. Costos de Envío</h2>
                <p className="text-white/80 leading-relaxed mb-4">
                    Los costos de envío se calculan según:
                </p>
                <ul className="list-disc list-inside text-white/80 leading-relaxed space-y-2 ml-4">
                    <li>Destino de entrega</li>
                    <li>Peso y volumen del paquete</li>
                    <li>Método de envío seleccionado</li>
                </ul>
                <p className="text-white/80 leading-relaxed mt-4">
                    El costo exacto se mostrará en el checkout antes de confirmar la compra.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-[#c2a35d] text-xl uppercase tracking-wider mb-4">4. Retiro en Tienda</h2>
                <p className="text-white/80 leading-relaxed mb-4">
                    Ofrecemos la opción de <strong className="text-[#c2a35d]">retiro gratuito</strong> en nuestra tienda física:
                </p>
                <div className="bg-black/30 p-6 border border-[#c2a35d]/20 mt-4">
                    <p className="text-white/80 mb-2">📍 <strong>Dirección:</strong> San Juan, Argentina</p>
                    <p className="text-white/80 mb-2">🕐 <strong>Horario:</strong> Lunes a Viernes 9:00 - 20:00, Sábados 9:00 - 13:00</p>
                    <p className="text-white/80">⏱️ <strong>Disponibilidad:</strong> 24-48 horas después de la compra</p>
                </div>
                <p className="text-white/60 text-sm mt-4">
                    * Recibirás un email cuando tu pedido esté listo para retirar.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-[#c2a35d] text-xl uppercase tracking-wider mb-4">5. Seguimiento de Pedidos</h2>
                <p className="text-white/80 leading-relaxed mb-4">
                    Una vez despachado tu pedido, recibirás:
                </p>
                <ul className="list-disc list-inside text-white/80 leading-relaxed space-y-2 ml-4">
                    <li>Email de confirmación de envío</li>
                    <li>Número de seguimiento (para envíos por correo)</li>
                    <li>Actualizaciones del estado de entrega</li>
                </ul>
                <p className="text-white/80 leading-relaxed mt-4">
                    Puedes rastrear tu pedido en la sección <strong className="text-[#c2a35d]">"Mis Pedidos"</strong> de tu cuenta.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-[#c2a35d] text-xl uppercase tracking-wider mb-4">6. Problemas con el Envío</h2>
                <p className="text-white/80 leading-relaxed mb-4">
                    Si tienes problemas con tu envío:
                </p>
                <ul className="list-disc list-inside text-white/80 leading-relaxed space-y-2 ml-4">
                    <li><strong>Pedido no recibido:</strong> Contáctanos después de 15 días hábiles</li>
                    <li><strong>Producto dañado:</strong> Reporta dentro de las 48 horas de recibido</li>
                    <li><strong>Dirección incorrecta:</strong> Contáctanos inmediatamente para modificarla</li>
                </ul>
                <p className="text-white/80 leading-relaxed mt-4">
                    Contacto: <strong className="text-[#c2a35d]">envios@arabianexclusive.com</strong>
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-[#c2a35d] text-xl uppercase tracking-wider mb-4">7. Embalaje</h2>
                <p className="text-white/80 leading-relaxed mb-4">
                    Todos nuestros productos son cuidadosamente embalados para garantizar que lleguen en perfectas condiciones. Utilizamos materiales de protección adecuados para fragancias.
                </p>
            </section>
        </LegalPage>
    );
};

export default ShippingPage;

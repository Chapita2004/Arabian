import React from 'react';
import LegalPage from './LegalPage';

const TermsPage = () => {
    return (
        <LegalPage
            title="Términos y Condiciones"
            lastUpdated="09 de Febrero de 2026"
            description="Términos y condiciones de uso de Arabian Exclusive"
        >
            <section className="mb-8">
                <h2 className="text-[#c2a35d] text-xl uppercase tracking-wider mb-4">1. Aceptación de Términos</h2>
                <p className="text-white/80 leading-relaxed mb-4">
                    Al acceder y utilizar el sitio web de Arabian Exclusive, usted acepta estar sujeto a estos Términos y Condiciones de Uso. Si no está de acuerdo con alguna parte de estos términos, no debe utilizar nuestro sitio web.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-[#c2a35d] text-xl uppercase tracking-wider mb-4">2. Uso del Sitio Web</h2>
                <p className="text-white/80 leading-relaxed mb-4">
                    Este sitio web es operado por Arabian Exclusive. El uso de este sitio está sujeto a las siguientes condiciones:
                </p>
                <ul className="list-disc list-inside text-white/80 leading-relaxed space-y-2 ml-4">
                    <li>El contenido de este sitio es únicamente para su información general y uso personal</li>
                    <li>Está sujeto a cambios sin previo aviso</li>
                    <li>No garantizamos que el sitio esté libre de errores o interrupciones</li>
                    <li>El uso no autorizado de este sitio puede dar lugar a una reclamación por daños y/o ser un delito penal</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-[#c2a35d] text-xl uppercase tracking-wider mb-4">3. Productos y Precios</h2>
                <p className="text-white/80 leading-relaxed mb-4">
                    Todos los productos están sujetos a disponibilidad. Nos reservamos el derecho de limitar las cantidades de cualquier producto que ofrecemos.
                </p>
                <ul className="list-disc list-inside text-white/80 leading-relaxed space-y-2 ml-4">
                    <li>Los precios están expresados en Pesos Argentinos (ARS)</li>
                    <li>Los precios pueden cambiar sin previo aviso</li>
                    <li>Nos reservamos el derecho de modificar o descontinuar productos en cualquier momento</li>
                    <li>Las imágenes son ilustrativas y pueden diferir del producto real</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-[#c2a35d] text-xl uppercase tracking-wider mb-4">4. Proceso de Compra</h2>
                <p className="text-white/80 leading-relaxed mb-4">
                    Al realizar un pedido, usted acepta proporcionar información actual, completa y precisa de compra y cuenta.
                </p>
                <p className="text-white/80 leading-relaxed mb-4">
                    Nos reservamos el derecho de rechazar o cancelar cualquier pedido por cualquier motivo, incluyendo pero no limitado a: disponibilidad de producto, errores en la descripción o precio del producto, o problemas identificados por nuestro departamento de prevención de fraude.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-[#c2a35d] text-xl uppercase tracking-wider mb-4">5. Métodos de Pago</h2>
                <p className="text-white/80 leading-relaxed mb-4">
                    Aceptamos los siguientes métodos de pago:
                </p>
                <ul className="list-disc list-inside text-white/80 leading-relaxed space-y-2 ml-4">
                    <li>Mercado Pago (tarjetas de crédito y débito)</li>
                    <li>Transferencia bancaria (10% de descuento)</li>
                    <li>Efectivo en tienda física</li>
                </ul>
                <p className="text-white/80 leading-relaxed mt-4">
                    Todos los pagos son procesados de forma segura a través de plataformas certificadas.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-[#c2a35d] text-xl uppercase tracking-wider mb-4">6. Derecho de Arrepentimiento</h2>
                <p className="text-white/80 leading-relaxed mb-4">
                    De acuerdo con la Ley de Defensa del Consumidor N° 24.240 de Argentina, usted tiene derecho a revocar la aceptación durante el plazo de <strong className="text-[#c2a35d]">10 días corridos</strong> contados a partir de la fecha de recepción del producto.
                </p>
                <p className="text-white/80 leading-relaxed mb-4">
                    Para ejercer este derecho, debe notificarnos de manera fehaciente. El producto debe ser devuelto en las mismas condiciones en que fue recibido, sin uso y con su embalaje original.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-[#c2a35d] text-xl uppercase tracking-wider mb-4">7. Propiedad Intelectual</h2>
                <p className="text-white/80 leading-relaxed mb-4">
                    Todo el contenido incluido en este sitio, como texto, gráficos, logos, imágenes, clips de audio, descargas digitales y compilaciones de datos, es propiedad de Arabian Exclusive y está protegido por las leyes de derechos de autor de Argentina.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-[#c2a35d] text-xl uppercase tracking-wider mb-4">8. Limitación de Responsabilidad</h2>
                <p className="text-white/80 leading-relaxed mb-4">
                    Arabian Exclusive no será responsable de ningún daño directo, indirecto, incidental, especial o consecuente que resulte del uso o la imposibilidad de usar nuestro sitio web o productos.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-[#c2a35d] text-xl uppercase tracking-wider mb-4">9. Ley Aplicable</h2>
                <p className="text-white/80 leading-relaxed mb-4">
                    Estos términos y condiciones se rigen por las leyes de la República Argentina. Cualquier disputa relacionada con estos términos estará sujeta a la jurisdicción exclusiva de los tribunales de San Juan, Argentina.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-[#c2a35d] text-xl uppercase tracking-wider mb-4">10. Contacto</h2>
                <p className="text-white/80 leading-relaxed mb-4">
                    Si tiene alguna pregunta sobre estos Términos y Condiciones, puede contactarnos:
                </p>
                <ul className="list-none text-white/80 leading-relaxed space-y-2">
                    <li>📧 Email: info@arabianexclusive.com</li>
                    <li>📍 Dirección: San Juan, Argentina</li>
                </ul>
            </section>
        </LegalPage>
    );
};

export default TermsPage;

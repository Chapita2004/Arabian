import React from 'react';
import LegalPage from './LegalPage';

const PrivacyPage = () => {
    return (
        <LegalPage
            title="Política de Privacidad"
            lastUpdated="09 de Febrero de 2026"
            description="Política de privacidad y protección de datos de Arabian Exclusive"
        >
            <section className="mb-8">
                <h2 className="text-[#c2a35d] text-xl uppercase tracking-wider mb-4">1. Información que Recopilamos</h2>
                <p className="text-white/80 leading-relaxed mb-4">
                    En Arabian Exclusive recopilamos la siguiente información personal cuando usted:
                </p>
                <ul className="list-disc list-inside text-white/80 leading-relaxed space-y-2 ml-4">
                    <li><strong>Crea una cuenta:</strong> Nombre, email, contraseña</li>
                    <li><strong>Realiza una compra:</strong> Dirección de envío, teléfono, información de pago</li>
                    <li><strong>Navega el sitio:</strong> Dirección IP, tipo de navegador, páginas visitadas</li>
                    <li><strong>Se comunica con nosotros:</strong> Contenido de mensajes, consultas</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-[#c2a35d] text-xl uppercase tracking-wider mb-4">2. Cómo Usamos su Información</h2>
                <p className="text-white/80 leading-relaxed mb-4">
                    Utilizamos la información recopilada para:
                </p>
                <ul className="list-disc list-inside text-white/80 leading-relaxed space-y-2 ml-4">
                    <li>Procesar y completar sus pedidos</li>
                    <li>Enviar confirmaciones de pedido y actualizaciones de envío</li>
                    <li>Mejorar nuestro sitio web y servicios</li>
                    <li>Personalizar su experiencia de compra</li>
                    <li>Enviar comunicaciones de marketing (solo con su consentimiento)</li>
                    <li>Prevenir fraudes y mejorar la seguridad</li>
                    <li>Cumplir con obligaciones legales</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-[#c2a35d] text-xl uppercase tracking-wider mb-4">3. Cookies y Tecnologías Similares</h2>
                <p className="text-white/80 leading-relaxed mb-4">
                    Utilizamos cookies y tecnologías similares para:
                </p>
                <ul className="list-disc list-inside text-white/80 leading-relaxed space-y-2 ml-4">
                    <li>Recordar sus preferencias y configuraciones</li>
                    <li>Mantener su sesión activa</li>
                    <li>Analizar el tráfico del sitio web</li>
                    <li>Mejorar la funcionalidad del sitio</li>
                </ul>
                <p className="text-white/80 leading-relaxed mt-4">
                    Puede configurar su navegador para rechazar cookies, pero esto puede afectar la funcionalidad del sitio.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-[#c2a35d] text-xl uppercase tracking-wider mb-4">4. Compartir Información con Terceros</h2>
                <p className="text-white/80 leading-relaxed mb-4">
                    No vendemos ni alquilamos su información personal. Podemos compartir información con:
                </p>
                <ul className="list-disc list-inside text-white/80 leading-relaxed space-y-2 ml-4">
                    <li><strong>Proveedores de servicios:</strong> Procesadores de pago (Mercado Pago), servicios de envío</li>
                    <li><strong>Cumplimiento legal:</strong> Cuando sea requerido por ley o para proteger nuestros derechos</li>
                    <li><strong>Transferencia de negocio:</strong> En caso de fusión, adquisición o venta de activos</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-[#c2a35d] text-xl uppercase tracking-wider mb-4">5. Seguridad de Datos</h2>
                <p className="text-white/80 leading-relaxed mb-4">
                    Implementamos medidas de seguridad técnicas y organizativas para proteger su información personal contra acceso no autorizado, pérdida o alteración:
                </p>
                <ul className="list-disc list-inside text-white/80 leading-relaxed space-y-2 ml-4">
                    <li>Encriptación SSL/TLS para transmisión de datos</li>
                    <li>Almacenamiento seguro de contraseñas (hashing)</li>
                    <li>Acceso restringido a información personal</li>
                    <li>Monitoreo regular de seguridad</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-[#c2a35d] text-xl uppercase tracking-wider mb-4">6. Sus Derechos</h2>
                <p className="text-white/80 leading-relaxed mb-4">
                    De acuerdo con la Ley de Protección de Datos Personales N° 25.326 de Argentina, usted tiene derecho a:
                </p>
                <ul className="list-disc list-inside text-white/80 leading-relaxed space-y-2 ml-4">
                    <li><strong>Acceso:</strong> Solicitar una copia de sus datos personales</li>
                    <li><strong>Rectificación:</strong> Corregir datos inexactos o incompletos</li>
                    <li><strong>Eliminación:</strong> Solicitar la eliminación de sus datos</li>
                    <li><strong>Oposición:</strong> Oponerse al procesamiento de sus datos</li>
                    <li><strong>Portabilidad:</strong> Recibir sus datos en formato estructurado</li>
                </ul>
                <p className="text-white/80 leading-relaxed mt-4">
                    Para ejercer estos derechos, contáctenos en: <strong className="text-[#c2a35d]">privacidad@arabianexclusive.com</strong>
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-[#c2a35d] text-xl uppercase tracking-wider mb-4">7. Retención de Datos</h2>
                <p className="text-white/80 leading-relaxed mb-4">
                    Conservamos su información personal durante el tiempo necesario para cumplir con los fines descritos en esta política, a menos que la ley requiera o permita un período de retención más largo.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-[#c2a35d] text-xl uppercase tracking-wider mb-4">8. Menores de Edad</h2>
                <p className="text-white/80 leading-relaxed mb-4">
                    Nuestro sitio web no está dirigido a menores de 18 años. No recopilamos intencionalmente información personal de menores.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-[#c2a35d] text-xl uppercase tracking-wider mb-4">9. Cambios a esta Política</h2>
                <p className="text-white/80 leading-relaxed mb-4">
                    Nos reservamos el derecho de actualizar esta Política de Privacidad en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación en el sitio web.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-[#c2a35d] text-xl uppercase tracking-wider mb-4">10. Contacto</h2>
                <p className="text-white/80 leading-relaxed mb-4">
                    Si tiene preguntas sobre esta Política de Privacidad o sobre cómo manejamos sus datos personales:
                </p>
                <ul className="list-none text-white/80 leading-relaxed space-y-2">
                    <li>📧 Email: privacidad@arabianexclusive.com</li>
                    <li>📍 Dirección: San Juan, Argentina</li>
                </ul>
            </section>
        </LegalPage>
    );
};

export default PrivacyPage;

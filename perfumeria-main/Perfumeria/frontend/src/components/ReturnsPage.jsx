import React from 'react';
import LegalPage from './LegalPage';

const ReturnsPage = () => {
    return (
        <LegalPage
            title="Política de Devoluciones"
            lastUpdated="09 de Febrero de 2026"
            description="Política de devoluciones y cambios de Arabian Exclusive"
        >
            <section className="mb-8">
                <h2 className="text-[#c2a35d] text-xl uppercase tracking-wider mb-4">1. Derecho de Arrepentimiento</h2>
                <p className="text-white/80 leading-relaxed mb-4">
                    De acuerdo con la <strong className="text-[#c2a35d]">Ley de Defensa del Consumidor N° 24.240</strong>, tienes derecho a arrepentirte de tu compra dentro de los <strong className="text-[#c2a35d]">10 días corridos</strong> desde que recibiste el producto.
                </p>
                <div className="bg-black/30 p-6 border-l-4 border-[#c2a35d] mt-4">
                    <p className="text-white font-bold mb-2">⏰ Plazo: 10 días corridos</p>
                    <p className="text-white/80">Contados desde la fecha de recepción del producto</p>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-[#c2a35d] text-xl uppercase tracking-wider mb-4">2. Condiciones para Devoluciones</h2>
                <p className="text-white/80 leading-relaxed mb-4">
                    Para que una devolución sea aceptada, el producto debe cumplir con:
                </p>
                <ul className="list-disc list-inside text-white/80 leading-relaxed space-y-2 ml-4">
                    <li>✅ Estar <strong>sin abrir y sin usar</strong></li>
                    <li>✅ Conservar su <strong>embalaje original</strong> en perfectas condiciones</li>
                    <li>✅ Incluir todos los <strong>accesorios y etiquetas</strong> originales</li>
                    <li>✅ No presentar signos de uso, daños o alteraciones</li>
                </ul>
                <div className="bg-red-900/20 border border-red-500/30 p-4 mt-4">
                    <p className="text-red-400 font-bold mb-2">⚠️ Importante:</p>
                    <p className="text-white/80">
                        Por razones de higiene y seguridad, <strong>no se aceptan devoluciones de perfumes que hayan sido abiertos o utilizados</strong>.
                    </p>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-[#c2a35d] text-xl uppercase tracking-wider mb-4">3. Proceso de Devolución</h2>
                <p className="text-white/80 leading-relaxed mb-4">
                    Para iniciar una devolución, sigue estos pasos:
                </p>
                <div className="space-y-4">
                    <div className="bg-black/30 p-4 border-l-2 border-[#c2a35d]">
                        <h3 className="text-white font-bold mb-2">Paso 1: Contacto</h3>
                        <p className="text-white/80">
                            Envía un email a <strong className="text-[#c2a35d]">devoluciones@arabianexclusive.com</strong> con:
                        </p>
                        <ul className="list-disc list-inside text-white/70 text-sm mt-2 ml-4">
                            <li>Número de pedido</li>
                            <li>Motivo de la devolución</li>
                            <li>Fotos del producto (si aplica)</li>
                        </ul>
                    </div>
                    <div className="bg-black/30 p-4 border-l-2 border-[#c2a35d]">
                        <h3 className="text-white font-bold mb-2">Paso 2: Autorización</h3>
                        <p className="text-white/80">
                            Recibirás un email con la autorización de devolución e instrucciones de envío.
                        </p>
                    </div>
                    <div className="bg-black/30 p-4 border-l-2 border-[#c2a35d]">
                        <h3 className="text-white font-bold mb-2">Paso 3: Envío</h3>
                        <p className="text-white/80">
                            Envía el producto a nuestra dirección o coordina el retiro (según corresponda).
                        </p>
                    </div>
                    <div className="bg-black/30 p-4 border-l-2 border-[#c2a35d]">
                        <h3 className="text-white font-bold mb-2">Paso 4: Inspección</h3>
                        <p className="text-white/80">
                            Revisaremos el producto para verificar que cumple con las condiciones.
                        </p>
                    </div>
                    <div className="bg-black/30 p-4 border-l-2 border-[#c2a35d]">
                        <h3 className="text-white font-bold mb-2">Paso 5: Reembolso</h3>
                        <p className="text-white/80">
                            Una vez aprobada, procesaremos el reembolso en 5-10 días hábiles.
                        </p>
                    </div>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-[#c2a35d] text-xl uppercase tracking-wider mb-4">4. Reembolsos</h2>
                <p className="text-white/80 leading-relaxed mb-4">
                    Los reembolsos se procesarán de la siguiente manera:
                </p>
                <ul className="list-disc list-inside text-white/80 leading-relaxed space-y-2 ml-4">
                    <li><strong>Tarjeta de crédito/débito:</strong> Reversión en 1-2 ciclos de facturación</li>
                    <li><strong>Transferencia bancaria:</strong> Devolución a la cuenta de origen en 5-10 días hábiles</li>
                    <li><strong>Efectivo:</strong> Devolución en tienda o transferencia bancaria</li>
                </ul>
                <p className="text-white/60 text-sm mt-4">
                    * Los costos de envío de devolución corren por cuenta del cliente, excepto en casos de productos defectuosos o error en el envío.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-[#c2a35d] text-xl uppercase tracking-wider mb-4">5. Cambios</h2>
                <p className="text-white/80 leading-relaxed mb-4">
                    Si deseas cambiar un producto por otro:
                </p>
                <ul className="list-disc list-inside text-white/80 leading-relaxed space-y-2 ml-4">
                    <li>El producto debe cumplir con las mismas condiciones que para devoluciones</li>
                    <li>El cambio está sujeto a disponibilidad de stock</li>
                    <li>Si hay diferencia de precio, deberás abonar o se te reembolsará la diferencia</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-[#c2a35d] text-xl uppercase tracking-wider mb-4">6. Productos Defectuosos</h2>
                <p className="text-white/80 leading-relaxed mb-4">
                    Si recibes un producto defectuoso o dañado:
                </p>
                <ul className="list-disc list-inside text-white/80 leading-relaxed space-y-2 ml-4">
                    <li>Contáctanos dentro de las <strong className="text-[#c2a35d]">48 horas</strong> de recibido</li>
                    <li>Envía fotos del producto y el embalaje</li>
                    <li>Nos haremos cargo del costo de envío de devolución</li>
                    <li>Ofreceremos reemplazo o reembolso completo</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-[#c2a35d] text-xl uppercase tracking-wider mb-4">7. Productos No Retornables</h2>
                <p className="text-white/80 leading-relaxed mb-4">
                    Por razones de higiene y seguridad, no se aceptan devoluciones de:
                </p>
                <ul className="list-disc list-inside text-white/80 leading-relaxed space-y-2 ml-4">
                    <li>Perfumes abiertos o usados</li>
                    <li>Productos en oferta o liquidación (salvo defecto)</li>
                    <li>Productos personalizados o hechos a medida</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-[#c2a35d] text-xl uppercase tracking-wider mb-4">8. Contacto</h2>
                <p className="text-white/80 leading-relaxed mb-4">
                    Para consultas sobre devoluciones:
                </p>
                <ul className="list-none text-white/80 leading-relaxed space-y-2">
                    <li>📧 Email: devoluciones@arabianexclusive.com</li>
                    <li>📍 Dirección: San Juan, Argentina</li>
                </ul>
            </section>
        </LegalPage>
    );
};

export default ReturnsPage;

import React from 'react';
import LegalPage from './LegalPage';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const AboutPage = () => {
    return (
        <LegalPage
            title="Sobre Nosotros"
            lastUpdated="09 de Febrero de 2026"
            description="Conoce Arabian Exclusive, tu tienda de perfumes árabes y de nicho en San Juan"
        >
            <section className="mb-8">
                <h2 className="text-[#c2a35d] text-xl uppercase tracking-wider mb-4">Nuestra Historia</h2>
                <p className="text-white/80 leading-relaxed mb-4">
                    <strong className="text-[#c2a35d]">Arabian Exclusive</strong> nace de la pasión por las fragancias únicas y exclusivas. Somos una tienda especializada en perfumes árabes y de nicho, dedicada a traer a San Juan las fragancias más exquisitas y difíciles de encontrar.
                </p>
                <p className="text-white/80 leading-relaxed mb-4">
                    Nuestra misión es ofrecer una experiencia olfativa única, donde cada fragancia cuenta una historia y cada cliente encuentra su aroma perfecto.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-[#c2a35d] text-xl uppercase tracking-wider mb-4">¿Qué nos hace diferentes?</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-black/30 p-6 border border-[#c2a35d]/20">
                        <h3 className="text-[#c2a35d] font-bold mb-3">✨ Fragancias Exclusivas</h3>
                        <p className="text-white/80 text-sm">
                            Seleccionamos cuidadosamente cada perfume, priorizando calidad, exclusividad y autenticidad.
                        </p>
                    </div>
                    <div className="bg-black/30 p-6 border border-[#c2a35d]/20">
                        <h3 className="text-[#c2a35d] font-bold mb-3">🌟 Productos Originales</h3>
                        <p className="text-white/80 text-sm">
                            Todos nuestros productos son 100% originales, importados directamente de las mejores casas de perfumería.
                        </p>
                    </div>
                    <div className="bg-black/30 p-6 border border-[#c2a35d]/20">
                        <h3 className="text-[#c2a35d] font-bold mb-3">💎 Asesoramiento Personalizado</h3>
                        <p className="text-white/80 text-sm">
                            Nuestro equipo está capacitado para ayudarte a encontrar la fragancia perfecta para cada ocasión.
                        </p>
                    </div>
                    <div className="bg-black/30 p-6 border border-[#c2a35d]/20">
                        <h3 className="text-[#c2a35d] font-bold mb-3">🚚 Envíos a Todo el País</h3>
                        <p className="text-white/80 text-sm">
                            Llevamos nuestras fragancias exclusivas a todo Argentina con envíos seguros y rápidos.
                        </p>
                    </div>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-[#c2a35d] text-xl uppercase tracking-wider mb-4">Nuestras Marcas</h2>
                <p className="text-white/80 leading-relaxed mb-4">
                    Trabajamos con las marcas más prestigiosas de perfumería árabe y de nicho:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {['Lattafa', 'Afnan', 'Armaf', 'Rasasi', 'Al Haramain', 'Maison Alhambra', 'Ard Al Zaafaran', 'Ajmal', 'Khalis'].map((brand) => (
                        <div key={brand} className="bg-black/30 p-4 text-center border border-white/5 hover:border-[#c2a35d]/30 transition-colors">
                            <p className="text-white font-bold">{brand}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-[#c2a35d] text-xl uppercase tracking-wider mb-4">Visítanos</h2>
                <div className="bg-black/30 p-8 border border-[#c2a35d]/20">
                    <div className="space-y-4">
                        <div className="flex items-start gap-4">
                            <MapPin className="w-6 h-6 text-[#c2a35d] flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="text-white font-bold mb-1">Ubicación</h3>
                                <p className="text-white/80">San Juan, Argentina</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Clock className="w-6 h-6 text-[#c2a35d] flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="text-white font-bold mb-1">Horarios</h3>
                                <p className="text-white/80">Lunes a Viernes: 9:00 - 20:00</p>
                                <p className="text-white/80">Sábados: 9:00 - 13:00</p>
                                <p className="text-white/80">Domingos: Cerrado</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Mail className="w-6 h-6 text-[#c2a35d] flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="text-white font-bold mb-1">Email</h3>
                                <p className="text-white/80">info@arabianexclusive.com</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Phone className="w-6 h-6 text-[#c2a35d] flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="text-white font-bold mb-1">Teléfono</h3>
                                <p className="text-white/80">Contáctanos por WhatsApp</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-[#c2a35d] text-xl uppercase tracking-wider mb-4">Compromiso con la Calidad</h2>
                <p className="text-white/80 leading-relaxed mb-4">
                    En Arabian Exclusive nos comprometemos a:
                </p>
                <ul className="list-disc list-inside text-white/80 leading-relaxed space-y-2 ml-4">
                    <li>Ofrecer solo productos 100% originales y auténticos</li>
                    <li>Brindar un servicio al cliente excepcional</li>
                    <li>Mantener los mejores precios del mercado</li>
                    <li>Garantizar la satisfacción de nuestros clientes</li>
                    <li>Actualizar constantemente nuestro catálogo con las últimas novedades</li>
                </ul>
            </section>

            <section className="mb-8">
                <div className="bg-gradient-to-r from-[#c2a35d]/10 to-transparent p-8 border-l-4 border-[#c2a35d]">
                    <p className="text-white/90 text-lg italic leading-relaxed">
                        "Nuestra pasión es ayudarte a encontrar la fragancia que refleje tu personalidad única. Cada perfume es una obra de arte, y estamos aquí para guiarte en este viaje olfativo."
                    </p>
                    <p className="text-[#c2a35d] mt-4 font-bold">- Equipo Arabian Exclusive</p>
                </div>
            </section>
        </LegalPage>
    );
};

export default AboutPage;

import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-[#050505] border-t border-white/5 pt-10 pb-8 px-5 md:px-6 md:pt-16 font-sans">
            <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-5 gap-12">

                {/* Columna 1: Branding */}
                <div className="space-y-6">
                    <h3 className="text-[#c2a35d] text-xl font-light tracking-[0.5em] uppercase">
                        ARABIAN <span className="block text-[10px] tracking-[0.8em] text-white/50">EXCLUSIVE</span>
                    </h3>
                    <p className="text-gray-400 text-xs leading-relaxed max-w-xs uppercase tracking-widest">
                        Nosotros te asesoramos. Vos elegís qué dejar en el aire.
                    </p>
                    <div className="flex space-x-6 text-[#c2a35d]">
                        <a href="https://instagram.com" target="_blank" className="hover:text-white transition-colors">IG</a>
                        <a href="https://wa.me/2646285919" target="_blank" className="hover:text-white transition-colors">WA</a>
                    </div>
                </div>

                {/* Columna 2: Categorías */}
                <div>
                    <h4 className="text-[#c2a35d] text-[11px] font-bold uppercase tracking-[0.3em] mb-6">Colecciones</h4>
                    <ul className="space-y-3 text-[11px] text-gray-400 uppercase tracking-widest">
                        <li><Link to="/category/arabes" className="hover:text-white transition-colors">Perfumes Árabes</Link></li>
                        <li><Link to="/category/nicho" className="hover:text-white transition-colors">Perfumes de Nicho</Link></li>
                        <li><Link to="/category/desodorantes" className="hover:text-white transition-colors">Desodorantes</Link></li>
                    </ul>
                </div>

                {/* Columna 3: Información */}
                <div>
                    <h4 className="text-[#c2a35d] text-[11px] font-bold uppercase tracking-[0.3em] mb-6">Información Legal</h4>
                    <ul className="space-y-3 text-[11px] text-gray-400 uppercase tracking-widest">
                        <li><Link to="/terminos-y-condiciones" className="hover:text-white transition-colors">Términos y Condiciones</Link></li>
                        <li><Link to="/politica-de-privacidad" className="hover:text-white transition-colors">Política de Privacidad</Link></li>
                        <li><Link to="/politica-de-envios" className="hover:text-white transition-colors">Envíos</Link></li>
                        <li><Link to="/politica-de-devoluciones" className="hover:text-white transition-colors">Devoluciones</Link></li>
                    </ul>
                </div>

                {/* Columna 3.5: Ayuda */}
                <div>
                    <h4 className="text-[#c2a35d] text-[11px] font-bold uppercase tracking-[0.3em] mb-6">Ayuda</h4>
                    <ul className="space-y-3 text-[11px] text-gray-400 uppercase tracking-widest">
                        <li><Link to="/sobre-nosotros" className="hover:text-white transition-colors">Sobre Nosotros</Link></li>
                        <li><Link to="/preguntas-frecuentes" className="hover:text-white transition-colors">FAQ</Link></li>
                        <li><Link to="/auth" className="hover:text-white transition-colors">Mi Cuenta</Link></li>
                    </ul>
                </div>

                {/* Columna 4: Newsletter */}
                <div className="space-y-4">
                    <h4 className="text-[#c2a35d] text-[11px] font-bold uppercase tracking-[0.3em] mb-2">Newsletter</h4>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">Suscribite para recibir novedades exclusivas.</p>
                    <form className="flex border-b border-[#c2a35d]/30 py-2">
                        <input
                            type="email"
                            placeholder="E-MAIL"
                            className="bg-transparent border-none text-[10px] w-full focus:outline-none focus:ring-0 text-white placeholder:text-gray-700 tracking-[0.2em]"
                        />
                        <button type="submit" className="text-[10px] text-[#c2a35d] font-bold hover:text-white transition-colors tracking-widest">
                            ENVIAR
                        </button>
                    </form>
                </div>
            </div>

            {/* Barra Inferior */}
            <div className="max-w-[1440px] mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div className="flex items-center space-x-6 opacity-30 grayscale hover:opacity-100 transition-opacity">
                    <span className="text-[9px] text-white border border-white/20 px-2 py-1">VISA</span>
                    <span className="text-[9px] text-white border border-white/20 px-2 py-1">MASTERCARD</span>
                    <span className="text-[9px] text-white border border-white/20 px-2 py-1">EFECTIVO</span>
                </div>
                <p className="text-[9px] text-gray-600 uppercase tracking-[0.4em] italic">
                    © 2026 ARABIAN EXCLUSIVE. DISEÑO DE ALTA GAMA.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
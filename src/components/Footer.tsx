import { Zap, Instagram, Facebook, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { useSiteStore } from '../store/useSiteStore';
import { Link } from 'react-router-dom';

export default function Footer() {
  const { settings } = useSiteStore();

  return (
    <footer id="contact" className="bg-black border-t border-white/10 pt-32 pb-12 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 mb-12 md:mb-20">
          {/* Brand */}
          <div>
            <a href="#home" className="flex items-center gap-2 group mb-6">
              {settings.logoUrl ? (
                <img src={settings.logoUrl} alt="Logo" className="h-8 object-contain" />
              ) : (
                <Zap className="w-8 h-8 text-blue-400 group-hover:text-blue-300 transition-colors" />
              )}
              <span className="text-xl font-bold tracking-tighter text-white uppercase">
                {settings.brandName}<span className="text-blue-400 font-light">{settings.brandHighlight}</span>
              </span>
            </a>
            <p className="text-gray-400 font-light text-sm leading-relaxed mb-8 max-w-sm">
              Transformando o cenário urbano com tecnologia, design e materiais de alta performance. Sua marca vista no futuro.
            </p>
            <div className="flex gap-4">
              <a href={settings.social.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-blue-500 hover:text-white transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href={settings.social.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-blue-500 hover:text-white transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href={settings.social.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-blue-500 hover:text-white transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Contato</h4>
            <ul className="flex flex-col gap-6">
              <li className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <a 
                  href="https://maps.app.goo.gl/xuPeqM4uEaSgLods5" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm font-light whitespace-pre-line"
                >
                  {settings.contact.address}
                </a>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-blue-400 shrink-0" />
                <a 
                  href={`tel:+${settings.contact.phone.replace(/\D/g, '')}`}
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm font-light"
                >
                  {settings.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-blue-400 shrink-0" />
                <a 
                  href={`mailto:${settings.contact.email}`}
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm font-light"
                >
                  {settings.contact.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Map */}
          <div className="w-full h-64 lg:h-full min-h-[250px] rounded-2xl overflow-hidden border border-white/10 relative group">
            <a 
              href="https://maps.app.goo.gl/xuPeqM4uEaSgLods5" 
              target="_blank" 
              rel="noopener noreferrer"
              className="absolute inset-0 z-10"
              title="Abrir no Google Maps"
            >
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                <span className="bg-blue-500 text-white px-6 py-3 rounded-full font-bold text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 shadow-lg flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Abrir no Google Maps
                </span>
              </div>
            </a>
            <iframe
              title="Localização"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(settings.contact.address)}&t=k&z=15&ie=UTF8&iwloc=&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="pointer-events-none"
            ></iframe>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <p className="text-gray-500 text-[10px] sm:text-xs uppercase tracking-widest">
            &copy; {new Date().getFullYear()} {settings.brandName} {settings.brandHighlight}. Todos os direitos reservados.
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <Link to="/admin" className="text-blue-500 hover:text-blue-400 text-[10px] sm:text-xs uppercase tracking-widest transition-colors font-bold">Painel Admin</Link>
            <a href="#" className="text-gray-500 hover:text-white text-[10px] sm:text-xs uppercase tracking-widest transition-colors">Termos</a>
            <a href="#" className="text-gray-500 hover:text-white text-[10px] sm:text-xs uppercase tracking-widest transition-colors">Privacidade</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { Zap, Instagram, Facebook, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { useSiteStore } from '../store/useSiteStore';

export default function Footer() {
  const { settings } = useSiteStore();

  return (
    <footer id="contact" className="bg-black border-t border-white/10 pt-32 pb-12 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-20">
          {/* Brand */}
          <div className="lg:col-span-1">
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
            <p className="text-gray-400 font-light text-sm leading-relaxed mb-8">
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

          {/* Links */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Navegação</h4>
            <ul className="flex flex-col gap-4">
              {['Início', 'Serviços', 'Portfólio', 'Catálogos'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase().replace(' ', '-').replace('á', 'a')}`} className="text-gray-400 hover:text-blue-400 transition-colors text-sm font-light">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Serviços</h4>
            <ul className="flex flex-col gap-4">
              {['Fachadas em ACM', 'Letreiros Luminosos', 'Impressão Digital', 'Projetos 3D'].map((item) => (
                <li key={item}>
                  <a href="#services" className="text-gray-400 hover:text-blue-400 transition-colors text-sm font-light">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Contato</h4>
            <ul className="flex flex-col gap-6">
              <li className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm font-light whitespace-pre-line">{settings.contact.address}</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-blue-400 shrink-0" />
                <span className="text-gray-400 text-sm font-light">{settings.contact.phone}</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-blue-400 shrink-0" />
                <span className="text-gray-400 text-sm font-light">{settings.contact.email}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <p className="text-gray-500 text-[10px] sm:text-xs uppercase tracking-widest">
            &copy; {new Date().getFullYear()} {settings.brandName} {settings.brandHighlight}. Todos os direitos reservados.
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <a href="/admin" className="text-blue-500 hover:text-blue-400 text-[10px] sm:text-xs uppercase tracking-widest transition-colors font-bold">Painel Admin</a>
            <a href="#" className="text-gray-500 hover:text-white text-[10px] sm:text-xs uppercase tracking-widest transition-colors">Termos</a>
            <a href="#" className="text-gray-500 hover:text-white text-[10px] sm:text-xs uppercase tracking-widest transition-colors">Privacidade</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

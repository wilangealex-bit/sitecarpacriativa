import { useState, useEffect } from 'react';
import { useSiteStore } from '../store/useSiteStore';
import { motion, AnimatePresence } from 'motion/react';
import { Instagram, X } from 'lucide-react';

export default function FloatingButtons() {
  const { settings } = useSiteStore();
  const { whatsapp } = settings.contact;
  const { instagram } = settings.social;
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const defaultMessage = "Olá! Gostaria de saber mais sobre os serviços da Carpa Criativa.";
  const whatsappUrl = whatsapp ? `https://wa.me/${whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(defaultMessage)}` : null;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (whatsappUrl) {
      const timer = setTimeout(() => {
        setIsChatOpen(true);
        
        try {
          const audio = new Audio('https://cdn.freesound.org/previews/541/541947_10985751-lq.mp3');
          audio.volume = 0.5;
          audio.play().catch(() => {});
        } catch (e) {}
        
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [whatsappUrl]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4 items-end">
      {instagram && (
        <motion.a
          href={instagram === '#' ? 'https://instagram.com' : instagram}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 text-white w-14 h-14 rounded-full shadow-lg shadow-pink-500/40 flex items-center justify-center mb-2"
          aria-label="Siga-nos no Instagram"
        >
          <Instagram className="w-6 h-6" />
        </motion.a>
      )}

      <div className="relative flex flex-col items-end">
        <AnimatePresence>
          {isChatOpen && whatsappUrl && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-2xl w-72 mb-4 relative"
              style={{ filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.1))' }}
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsChatOpen(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors z-10"
                aria-label="Fechar"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Content */}
              <div className="p-5 flex gap-4">
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100">
                    <img 
                      src={settings.whatsappProfileUrl || settings.logoUrl || "https://ui-avatars.com/api/?name=Carpa+Criativa&background=0000FF&color=fff"} 
                      alt="Carpa Criativa" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#25D366] border-2 border-white rounded-full"></div>
                </div>
                <div className="pt-1">
                  <h4 className="text-gray-900 font-bold text-sm leading-tight">{settings.brandName} {settings.brandHighlight}</h4>
                  <p className="text-gray-500 text-[11px] mb-1">atendimento</p>
                  <p className="text-gray-700 text-sm leading-snug">Bem vindo(a) à Carpa. Como te ajudo hoje?</p>
                </div>
              </div>

              {/* Tail pointing down */}
              <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white transform rotate-45"></div>
            </motion.div>
          )}
        </AnimatePresence>

        {whatsappUrl && (
          <motion.a
            layout
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsChatOpen(false)}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full shadow-lg shadow-green-500/30 flex items-center justify-center relative transition-all duration-300 overflow-hidden ${isScrolled ? 'w-14 h-14' : 'h-14 px-5'}`}
            aria-label="Falar Agora no WhatsApp"
          >
            <motion.div layout className="flex items-center justify-center gap-2">
              <svg className="flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
              </svg>
              <AnimatePresence>
                {!isScrolled && (
                  <motion.span 
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    className="font-bold text-sm tracking-wide whitespace-nowrap overflow-hidden"
                  >
                    Falar Agora no WhatsApp
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
            
            {/* Red Dot Notification */}
            <div className={`absolute bg-red-500 rounded-full border-2 border-black animate-pulse ${isScrolled ? 'top-0 right-0 w-3.5 h-3.5' : '-top-1 -right-1 w-3.5 h-3.5'}`}></div>
          </motion.a>
        )}
      </div>
    </div>
  );
}

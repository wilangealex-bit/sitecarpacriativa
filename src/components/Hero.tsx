import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useSiteStore } from '../store/useSiteStore';
import { useClientsStore } from '../store/useClientsStore';

export default function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const { settings } = useSiteStore();
  const { clients } = useClientsStore();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Background Parallax Image */}
      <motion.div
        style={{ y: y1, opacity }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black z-10" />
        <img
          src={settings.heroImage || 'https://picsum.photos/seed/neon-city/1920/1080?blur=2'}
          alt="Hero Background"
          className="w-full h-full object-cover opacity-50 scale-110"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 pt-32 pb-20 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium tracking-widest uppercase mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          {settings.brandName} {settings.brandHighlight}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
          className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase leading-[1.2] sm:leading-[1.1] mb-6 max-w-5xl mx-auto px-4"
        >
          {settings.heroTitle1}{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 block sm:inline mt-2 sm:mt-0">
            {settings.heroTitleHighlight}
          </span>
          {settings.heroTitle2 && (
            <>{' '}{settings.heroTitle2}</>
          )}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
          className="max-w-3xl mx-auto text-xs sm:text-base md:text-lg lg:text-xl text-gray-400 font-light mb-8 md:mb-12 whitespace-pre-line px-6 leading-relaxed"
        >
          {settings.heroSubtitle}
        </motion.p>

        {clients.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
            className="w-full max-w-3xl mx-auto mb-12 overflow-hidden"
          >
            <p className="text-xs uppercase tracking-widest text-gray-500 mb-6">Empresas que confiam em nós</p>
            <div className="flex space-x-8 animate-scroll">
              {/* Duplicate the list to create a seamless loop */}
              {[...clients, ...clients].map((client, index) => (
                <div key={`${client.id}-${index}`} className="flex-shrink-0 w-32 h-16 relative grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                  <img
                    src={client.logoUrl}
                    alt={client.name}
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
          className="flex flex-col w-full sm:w-auto sm:flex-row items-center gap-4 sm:gap-6"
        >
          <a
            href="#portfolio"
            className="group relative w-full sm:w-auto px-8 py-4 bg-white text-black font-bold uppercase tracking-widest overflow-hidden rounded-full flex justify-center"
          >
            <span className="relative z-10 flex items-center gap-2">
              Ver Projetos <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-blue-500 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out z-0" />
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-gray-500"
      >
        <span className="text-xs uppercase tracking-[0.3em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}

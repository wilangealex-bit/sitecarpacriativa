import { motion } from 'motion/react';
import { LayoutTemplate, CaseUpper, Sticker, Lightbulb, Truck, Signpost } from 'lucide-react';
import { cn } from '../lib/utils';
import { useServicesStore } from '../store/useServicesStore';

const iconMap: Record<string, any> = {
  LayoutTemplate,
  CaseUpper,
  Sticker,
  Lightbulb,
  Truck,
  Signpost,
};

export default function Services() {
  const { services } = useServicesStore();

  return (
    <section id="services" className="py-32 bg-black relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4">
            Nossas <span className="text-blue-400">Soluções</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light">
            Tecnologia de ponta e materiais premium para elevar a identidade visual da sua empresa ao próximo nível.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-8">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.iconName] || LayoutTemplate;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={cn(
                  'group relative rounded-2xl md:rounded-3xl overflow-hidden border bg-black/50 backdrop-blur-sm p-3 sm:p-4 md:p-8 flex flex-col justify-end min-h-[200px] sm:min-h-[250px] md:min-h-[400px]',
                  service.border
                )}
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <div
                    className={cn(
                      'w-8 h-8 sm:w-10 sm:h-10 md:w-16 md:h-16 rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 md:mb-6 backdrop-blur-md',
                      service.bg,
                      service.color
                    )}
                  >
                    <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 md:w-8 md:h-8" />
                  </div>
                  <h3 className="text-sm sm:text-base md:text-2xl font-bold text-white mb-2 md:mb-3 uppercase tracking-wide">
                    {service.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs md:text-base text-gray-400 font-light leading-relaxed line-clamp-6 md:line-clamp-none">
                    {service.description}
                  </p>
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className={cn('absolute -inset-px rounded-3xl border opacity-50', service.border)} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

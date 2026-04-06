import { motion } from 'motion/react';
import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { usePortfolioStore } from '../store/usePortfolioStore';

export default function Portfolio() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const { projects } = usePortfolioStore();

  return (
    <section id="portfolio" className="py-32 bg-zinc-950 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8"
        >
          <div>
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4">
              Nosso <span className="text-blue-400">Portfólio</span>
            </h2>
            <p className="text-gray-400 max-w-xl text-lg font-light">
              Projetos executados com precisão milimétrica e design inovador.
            </p>
          </div>
          <button className="px-8 py-3 rounded-full border border-white/20 text-white uppercase tracking-widest text-sm font-bold hover:bg-white hover:text-black transition-colors">
            Ver Todos
          </button>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:gap-6 auto-rows-[150px] sm:auto-rows-[200px] md:auto-rows-[300px]">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`relative rounded-2xl md:rounded-3xl overflow-hidden group cursor-pointer ${project.colSpan} ${project.rowSpan}`}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              
              {/* Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500 ${
                  hoveredId === project.id ? 'opacity-100' : 'opacity-60'
                }`}
              />

              {/* Content */}
              <div className="absolute inset-0 p-3 sm:p-4 md:p-8 flex flex-col justify-end">
                <div
                  className={`transform transition-all duration-500 ${
                    hoveredId === project.id ? 'translate-y-0 opacity-100' : 'translate-y-2 md:translate-y-4 opacity-80'
                  }`}
                >
                  <span className="text-blue-400 text-[10px] sm:text-xs md:text-sm font-bold tracking-widest uppercase mb-1 md:mb-2 block truncate">
                    {project.category}
                  </span>
                  <h3 className="text-sm sm:text-lg md:text-3xl font-black text-white uppercase tracking-tight flex items-center justify-between gap-2">
                    <span className="truncate">{project.title}</span>
                    <ExternalLink
                      className={`w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 shrink-0 transition-transform duration-500 ${
                        hoveredId === project.id ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                      }`}
                    />
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

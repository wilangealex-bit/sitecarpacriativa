import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCatalogStore } from '../store/useCatalogStore';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';

export default function Catalog() {
  const { items } = useCatalogStore();
  const [activeCategory, setActiveCategory] = useState<string>('Todos');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set(items.map((item) => item.category));
    return ['Todos', ...Array.from(cats)];
  }, [items]);

  // Filter items by category
  const filteredItems = useMemo(() => {
    if (activeCategory === 'Todos') return items;
    return items.filter((item) => item.category === activeCategory);
  }, [items, activeCategory]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentIndex(0); // Reset to first item when changing category
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(filteredItems.length - 1, prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  return (
    <section id="catalogos" className="py-24 bg-zinc-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white mb-4"
          >
            Nossos <span className="text-blue-500">Catálogos</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 font-light max-w-2xl mx-auto"
          >
            Explore nossa variedade de materiais, impressões e papéis de parede. Encontre a opção perfeita para o seu projeto.
          </motion.p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 relative z-20">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Stacked Cards Carousel */}
        <div className="relative w-full max-w-md mx-auto h-[450px] md:h-[500px]">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => {
              const offset = index - currentIndex;
              const isVisible = offset >= 0 && offset < 4;
              const isPrev = offset < 0;
              const isFront = offset === 0;

              return (
                <motion.div
                  key={item.id}
                  onClick={() => {
                    if (isFront && currentIndex < filteredItems.length - 1) {
                      handleNext();
                    }
                  }}
                  animate={{
                    scale: isPrev ? 0.9 : 1 - offset * 0.05,
                    y: isPrev ? -100 : offset * 20,
                    x: isPrev ? -200 : 0,
                    opacity: isPrev ? 0 : isVisible ? 1 - offset * 0.2 : 0,
                    zIndex: 50 - index,
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  className={`absolute top-0 left-0 w-full h-full bg-black border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col ${
                    isPrev || !isVisible ? 'pointer-events-none' : ''
                  } ${isFront && currentIndex < filteredItems.length - 1 ? 'cursor-pointer' : ''}`}
                >
                  <div className="h-[60%] relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-blue-500/90 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-widest rounded-full">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 h-[40%] flex flex-col justify-center bg-zinc-900/80 backdrop-blur-md">
                    <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-tight">{item.title}</h3>
                    <p className="text-gray-400 text-sm font-light line-clamp-3">{item.description}</p>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 bg-white/5 rounded-3xl border border-dashed border-white/10">
              <Search className="w-12 h-12 mb-4 opacity-50" />
              <p className="text-lg font-light">Nenhum item encontrado.</p>
            </div>
          )}
        </div>

        {/* Navigation Controls */}
        {filteredItems.length > 0 && (
          <div className="flex justify-center items-center gap-6 mt-12 relative z-20">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="w-14 h-14 rounded-full flex items-center justify-center bg-white/5 text-white hover:bg-blue-500 disabled:opacity-30 disabled:hover:bg-white/5 transition-colors shadow-lg"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <span className="text-gray-400 font-bold tracking-widest text-sm min-w-[3rem] text-center">
              {currentIndex + 1} / {filteredItems.length}
            </span>

            <button
              onClick={handleNext}
              disabled={currentIndex === filteredItems.length - 1}
              className="w-14 h-14 rounded-full flex items-center justify-center bg-white/5 text-white hover:bg-blue-500 disabled:opacity-30 disabled:hover:bg-white/5 transition-colors shadow-lg"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

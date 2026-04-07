import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useReviewsStore } from '../store/useReviewsStore';
import { Star, ChevronLeft, ChevronRight, MessageSquareQuote } from 'lucide-react';

export default function Reviews() {
  const { reviews } = useReviewsStore();
  const [currentIndex, setCurrentIndex] = useState(0);

  if (reviews.length === 0) return null;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  useEffect(() => {
    const timer = setInterval(handleNext, 6000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  return (
    <section className="py-24 bg-black relative overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_0%,transparent_70%)]" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white mb-4"
          >
            O que dizem <span className="text-blue-500">nossos clientes</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 font-light max-w-2xl mx-auto"
          >
            Avaliações reais de quem já transformou sua marca conosco.
          </motion.p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden relative min-h-[320px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.95, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95, x: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-zinc-900/50 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl w-full max-w-2xl mx-auto relative"
              >
                <MessageSquareQuote className="absolute top-8 right-8 w-12 h-12 text-blue-500/10" />
                
                <div className="flex items-center gap-4 mb-6">
                  <img 
                    src={reviews[currentIndex].authorPhoto || `https://ui-avatars.com/api/?name=${encodeURIComponent(reviews[currentIndex].authorName)}&background=random`} 
                    alt={reviews[currentIndex].authorName} 
                    className="w-16 h-16 rounded-full object-cover border-2 border-blue-500/30"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h3 className="text-white font-bold text-lg">{reviews[currentIndex].authorName}</h3>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < reviews[currentIndex].rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} 
                        />
                      ))}
                      <span className="text-gray-500 text-xs ml-2">{reviews[currentIndex].date}</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-300 text-lg md:text-xl font-light italic leading-relaxed">
                  "{reviews[currentIndex].text}"
                </p>
                
                <div className="mt-8 flex items-center gap-2">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" className="w-5 h-5" />
                  <span className="text-xs text-gray-400 font-medium uppercase tracking-widest">Avaliação do Google</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {reviews.length > 1 && (
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={handlePrev}
                className="w-12 h-12 rounded-full bg-white/5 hover:bg-blue-500 text-white flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-12 h-12 rounded-full bg-white/5 hover:bg-blue-500 text-white flex items-center justify-center transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

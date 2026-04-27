import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, ShoppingBag, Calendar, ArrowRight } from 'lucide-react';
import { Perspective, usePerspective } from '../lib/PerspectiveContext';

const options: { id: Perspective; label: string; sub: string; icon: any }[] = [
  { 
    id: 'brand', 
    label: 'Brand Partner', 
    sub: 'Sponsorship & Scale', 
    icon: Briefcase 
  },
  { 
    id: 'retail', 
    label: 'Retail Tenant', 
    sub: 'Luxury & Foot Traffic', 
    icon: ShoppingBag 
  },
  { 
    id: 'event', 
    label: 'Event Producer', 
    sub: 'Venues & Production', 
    icon: Calendar 
  },
];

export function PerspectiveModal() {
  const { perspective, setPerspective } = usePerspective();

  if (perspective !== null) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-6 md:p-12"
      >
        <div className="absolute inset-0 bg-black backdrop-blur-[60px]" />
        
        <motion.div
          initial={{ scale: 0.95, opacity: 0, filter: 'blur(20px)' }}
          animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-7xl w-full relative z-10"
        >
          <div className="text-center mb-20">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gold uppercase tracking-[0.8em] text-[10px] font-black mb-6 block"
            >
              The Next Chapter of Retail
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-5xl md:text-8xl font-display text-white leading-none mb-8"
            >
              Choose Your <span className="text-gold italic">Angle.</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-white/40 text-xl max-w-2xl mx-auto font-light leading-relaxed"
            >
              Experience a tailored commercial narrative designed for your 
              specific strategic goals.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {options.map((option, index) => (
              <motion.button
                key={option.id}
                initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ delay: 0.8 + index * 0.15, duration: 1 }}
                onClick={() => setPerspective(option.id)}
                className="group relative h-[450px] md:h-[600px] flex flex-col items-center justify-center p-12 rounded-[60px] border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-gold/30 transition-all duration-1000 overflow-hidden"
              >
                {/* Background Number or Watermark */}
                <span className="absolute top-10 left-10 text-white/5 font-display text-[10rem] pointer-events-none leading-none select-none">
                  0{index + 1}
                </span>

                <div className="relative z-10 flex flex-col items-center">
                   <div className="w-24 h-24 rounded-[32px] bg-white/5 border border-white/10 flex items-center justify-center mb-10 group-hover:scale-110 group-hover:bg-gold/10 transition-all duration-700">
                    <option.icon className="text-white/40 group-hover:text-gold transition-colors duration-700" size={40} strokeWidth={1} />
                  </div>

                  <h3 className="text-3xl font-display text-white mb-4 uppercase tracking-tighter transition-all duration-700 group-hover:text-gold">{option.label}</h3>
                  <p className="text-white/30 text-xs uppercase tracking-[0.4em] leading-relaxed font-black mb-10">
                    {option.sub}
                  </p>

                  <div className="bg-gold/10 px-8 py-4 rounded-full border border-gold/20 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0 flex items-center gap-3">
                    <span className="text-[10px] text-gold font-black uppercase tracking-widest">Select Perspective</span>
                    <ArrowRight size={14} className="text-gold" />
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

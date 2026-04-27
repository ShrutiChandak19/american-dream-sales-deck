import React from 'react';
import { motion } from 'motion/react';
import { UtensilsCrossed, Wine, Coffee, ChefHat } from 'lucide-react';

interface Props { scrollContainer?: React.RefObject<HTMLElement>; }

export function LifestyleSection({ scrollContainer }: Props) {
  const vp = { root: scrollContainer };
  return (
    <section id="lifestyle" className="snap-section bg-black flex items-center justify-center p-8 md:p-24">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div className="flex flex-col justify-center">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={vp}
            className="text-gold tracking-[0.4em] uppercase text-xs font-bold mb-4 block"
          >
            The Culinary Journey
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            className="text-4xl md:text-7xl font-display mb-10 leading-none"
          >
            Flavor as an <br />
            <span className="text-gold italic">Experience</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={vp}
            transition={{ delay: 0.2 }}
            className="text-white/50 text-xl font-light mb-12 max-w-lg leading-relaxed"
          >
            At American Dream, dining isn't just about fuel—it's about theater. 
            From Michelin-starred pop-ups to The Dining Terrace, we treat flavor 
            as an essential anchor that drives sustained dwell time.
          </motion.p>

          <div className="grid grid-cols-2 gap-6">
            <div className="p-8 bg-zinc-900 rounded-3xl border border-white/5 flex flex-col items-center text-center group hover:bg-gold/5 transition-colors">
               <UtensilsCrossed className="text-gold mb-4 group-hover:scale-110 transition-transform" size={32} />
               <div className="text-2xl font-display mb-1">20+</div>
               <div className="text-[10px] text-white/30 uppercase tracking-widest">Full Service Dining</div>
            </div>
            <div className="p-8 bg-zinc-900 rounded-3xl border border-white/5 flex flex-col items-center text-center group hover:bg-gold/5 transition-colors">
               <Wine className="text-gold mb-4 group-hover:scale-110 transition-transform" size={32} />
               <div className="text-2xl font-display mb-1">15+</div>
               <div className="text-[10px] text-white/30 uppercase tracking-widest">Upscale Bars & Lounges</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={vp}
            className="rounded-3xl overflow-hidden aspect-square relative"
          >
            <img src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="Dining"
               loading="lazy" />
            <div className="absolute inset-0 bg-black/20" />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={vp}
            transition={{ delay: 0.1 }}
            className="rounded-3xl overflow-hidden aspect-[4/5] relative -translate-y-8"
          >
            <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="Ambience"
               loading="lazy" />
            <div className="absolute inset-0 bg-black/20" />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={vp}
            transition={{ delay: 0.2 }}
            className="rounded-3xl overflow-hidden aspect-[4/5] relative"
          >
            <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="Food"
               loading="lazy" />
            <div className="absolute inset-0 bg-black/20" />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={vp}
            transition={{ delay: 0.3 }}
            className="rounded-3xl overflow-hidden aspect-square relative -translate-y-8"
          >
            <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="Service"
               loading="lazy" />
            <div className="absolute inset-0 bg-black/20" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

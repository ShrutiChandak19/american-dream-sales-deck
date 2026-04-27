import React from 'react';
import { motion } from 'motion/react';
import { Mic2, Projector, Users2, Zap } from 'lucide-react';

interface Props { scrollContainer?: React.RefObject<HTMLElement>; }

export function ConventionSection({ scrollContainer }: Props) {
  const vp = { root: scrollContainer };
  return (
    <section id="conventions" className="snap-section bg-black flex items-center justify-center p-8 md:p-24 overflow-hidden">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
           initial={{ opacity: 0, x: -50 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={vp}
           transition={{ duration: 0.8 }}
        >
          <span className="text-gold tracking-[0.4em] uppercase text-[10px] lg:text-xs font-bold mb-4 block">World-Class infrastructure</span>
          <h2 className="text-4xl md:text-6xl font-display mb-8">
            Expositions & <br />
            <span className="text-gold italic">Performing Arts</span>
          </h2>
          <p className="text-white/50 text-lg font-light mb-12 max-w-lg leading-relaxed">
            From the 30,000 sq. ft. Dream Live stage to custom-built exposition halls, 
            we provide a versatile global platform for product launches, conventions, 
            and cultural spectacles.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex gap-4 p-4 border border-white/5 bg-white/5 rounded-2xl">
              <Mic2 className="text-gold shrink-0" size={24} />
              <div>
                <div className="font-display text-white">A-List Ready</div>
                <p className="text-[10px] text-white/30 uppercase tracking-widest">In-House Talent Booking</p>
              </div>
            </div>
            <div className="flex gap-4 p-4 border border-white/5 bg-white/5 rounded-2xl">
              <Projector className="text-gold shrink-0" size={24} />
              <div>
                <div className="font-display text-white">4K Digital Canvas</div>
                <p className="text-[10px] text-white/30 uppercase tracking-widest">Premium AV Integration</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={vp}
            className="aspect-video lg:aspect-square bg-zinc-900 rounded-3xl overflow-hidden relative group"
          >
            <img 
              src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1200" 
              className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" 
              alt="Convention Space"
               loading="lazy" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <div className="flex justify-between items-end">
                <div>
                   <div className="text-2xl font-display text-white">DREAM LIVE</div>
                   <div className="text-[10px] text-gold tracking-widest uppercase">3,000+ Capacity Theater</div>
                </div>
                <div className="p-3 bg-gold/10 border border-gold/20 rounded-full text-gold">
                   <Users2 size={20} />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={vp}
             transition={{ delay: 0.3 }}
             className="absolute -top-6 -right-6 p-6 bg-gold text-black rounded-2xl shadow-xl shadow-gold/10 hidden md:block"
          >
            <div className="text-3xl font-display font-black leading-none">60k+</div>
            <div className="text-[8px] font-bold tracking-[0.2em] uppercase mt-2">TOTAL EVENT SQ FT</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

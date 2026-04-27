import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Zap, TrainFront } from 'lucide-react';
import { VideoBackground } from '../VideoBackground';

interface Props { scrollContainer?: React.RefObject<HTMLElement>; }

export function LocationSection({ scrollContainer }: Props) {
  const vp = { root: scrollContainer };
  return (
    <section id="location" className="snap-section min-h-screen flex items-center justify-center p-8 md:px-24 relative overflow-hidden">
      <VideoBackground src="/videos/the-avenue-luxury.mp4" overlayOpacity={0.8} scrollContainer={scrollContainer} />
      
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center relative z-10">
        <motion.div
           initial={{ opacity: 0, x: -30 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={vp}
        >
          <div className="mb-8 flex items-center gap-3 text-gold">
            <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center">
              <MapPin size={16} />
            </div>
            <span className="uppercase tracking-[0.4em] text-[10px] font-black">NYC Gateway Portfolio</span>
          </div>
          
          <h2 className="text-5xl md:text-8xl font-display text-white mb-10 leading-none">
            Center of the <br />
            <span className="text-gold italic">Tri-State</span>
          </h2>

          <p className="text-white/60 text-lg md:text-xl font-light mb-16 leading-relaxed max-w-xl">
            Strategically located just 5 miles from Manhattan. We sit at the intersection of 
            world-class sport, global tourism, and the densest consumer market in the United States.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group p-8 bg-white/[0.03] backdrop-blur-2xl border border-white/5 rounded-3xl hover:border-gold/30 transition-all">
              <Zap className="text-gold mb-4" size={24} />
              <h4 className="text-xl font-display text-white mb-2">20 Mins from NYC</h4>
              <p className="text-xs text-white/40 uppercase tracking-widest font-black">Mass Transit Direct</p>
            </div>
            <div className="group p-8 bg-white/[0.03] backdrop-blur-2xl border border-white/5 rounded-3xl hover:border-gold/30 transition-all">
              <TrainFront className="text-gold mb-4" size={24} />
              <h4 className="text-xl font-display text-white mb-2">Private Air Link</h4>
              <p className="text-xs text-white/40 uppercase tracking-widest font-black">Teterboro Corridor</p>
            </div>
          </div>
        </motion.div>

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={vp}
            className="aspect-square bg-white/[0.02] border border-white/10 rounded-[60px] p-2 relative overflow-hidden backdrop-blur-xl shadow-2xl"
          >
             <img 
               src="https://images.unsplash.com/photo-1467226632440-65f0b49574d9?auto=format&fit=crop&q=80&w=1200" 
               className="w-full h-full object-cover opacity-30 grayscale rounded-[50px] transition-transform duration-[30s] hover:scale-125"
               loading="lazy"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
             
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="w-6 h-6 bg-gold rounded-full flex items-center justify-center animate-pulse relative">
                  <div className="absolute inset-0 bg-gold rounded-full animate-ping opacity-75" />
                  <div className="w-2 h-2 bg-black rounded-full relative z-10" />
                </div>
                <p className="text-gold font-black text-[9px] uppercase tracking-[0.3em] mt-4 bg-black/60 px-4 py-1.5 rounded-full backdrop-blur-md border border-gold/20">The Epicenter</p>
             </div>
             
             <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center w-full px-12">
                <p className="text-white/40 text-[10px] uppercase tracking-[0.4em] font-black mb-2">Market Radius</p>
                <div className="flex justify-between items-center bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-md">
                   <div>
                      <p className="text-gold font-display text-xl leading-none">20M+</p>
                      <p className="text-[8px] text-white/30 uppercase tracking-widest mt-1">Catchment</p>
                   </div>
                   <div className="w-px h-8 bg-white/10" />
                   <div>
                      <p className="text-white font-display text-xl leading-none">$150k</p>
                      <p className="text-[8px] text-white/30 uppercase tracking-widest mt-1">Avg Income</p>
                   </div>
                </div>
             </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={vp}
            className="absolute -bottom-10 -right-10 bg-gold p-10 rounded-[32px] text-black shadow-2xl transform rotate-3"
          >
             <p className="text-[10px] font-black tracking-[0.3em] uppercase mb-2">Total Scale</p>
             <div className="text-6xl font-black font-display tracking-tighter leading-none">3M+</div>
             <p className="text-[10px] font-bold tracking-[0.2em] uppercase mt-2 opacity-60">SQ FT Activation Space</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

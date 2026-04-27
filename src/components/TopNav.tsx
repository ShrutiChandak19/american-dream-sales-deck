import React from 'react';
import { motion } from 'motion/react';
import { Play, Pause } from 'lucide-react';
import { usePerspective } from '../lib/PerspectiveContext';

const navLinks = [
  { label: 'Retail', id: 'retail' },
  { label: 'Events', id: 'events' },
  { label: 'Partners', id: 'partnerships' },
];

interface Props {
  isAutoPlay?: boolean;
  onToggleAutoPlay?: () => void;
}

export function TopNav({ isAutoPlay = false, onToggleAutoPlay }: Props) {
  const { perspective } = usePerspective();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex items-center justify-between pointer-events-none"
    >
      <div className="flex items-center gap-4 pointer-events-auto">
        <button
          onClick={() => scrollTo('intro')}
          className="w-10 h-10 bg-white flex items-center justify-center font-black text-black text-xl tracking-tighter hover:bg-gold transition-colors"
        >
          AD
        </button>
        <div className="hidden md:block">
          <p className="text-[10px] font-black tracking-[0.3em] text-white uppercase">American Dream</p>
          <p className="text-[8px] text-white/40 uppercase tracking-widest leading-none">New Jersey Portfolio</p>
        </div>
      </div>

      <div className="flex items-center gap-4 pointer-events-auto">
        <div className="hidden lg:flex items-center gap-12 text-[10px] uppercase tracking-[0.3em] font-black text-white/60">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="hover:text-gold transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Auto-Tour Toggle */}
        <button
          onClick={onToggleAutoPlay}
          title={isAutoPlay ? 'Pause guided tour' : 'Start guided tour'}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-[9px] uppercase tracking-[0.2em] font-black transition-all duration-300 ${
            isAutoPlay
              ? 'bg-gold border-gold text-black shadow-[0_0_20px_rgba(212,175,55,0.4)]'
              : 'bg-white/5 border-white/10 text-white/60 hover:border-gold/50 hover:text-gold backdrop-blur-xl'
          }`}
        >
          {isAutoPlay ? <Pause size={12} /> : <Play size={12} />}
          <span className="hidden md:inline">{isAutoPlay ? 'Pause Tour' : 'Auto Tour'}</span>
        </button>
        
        <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-2.5 rounded-full backdrop-blur-xl">
          <div className={`w-2 h-2 rounded-full bg-gold ${isAutoPlay ? 'animate-pulse' : ''}`} />
          <span className="text-[9px] uppercase tracking-[0.2em] font-black text-gold">
            {perspective === 'brand'
              ? 'Partnership Perspective'
              : perspective === 'retail'
              ? 'Retail Perspective'
              : perspective === 'event'
              ? 'Live Event Perspective'
              : 'Explore American Dream'}
          </span>
        </div>
      </div>
    </motion.nav>
  );
}

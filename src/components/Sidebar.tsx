import React, { useRef, useState } from 'react';
import { motion, useSpring, useTransform, useMotionValue } from 'motion/react';
import { Home, BarChart3, Rocket, Calendar, Menu, X, MapPin, UtensilsCrossed, Diamond, Mic2, Pause, Play as PlayIcon, User } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { usePerspective, Perspective } from '@/src/lib/PerspectiveContext';

const LUXURY_EASE = [0.16, 1, 0.3, 1];

const navItems = [
  { id: 'intro', label: 'Overview', icon: Home },
  { id: 'location', label: 'The Reach', icon: MapPin },
  { id: 'retail', label: 'Retail Data', icon: BarChart3 },
  { id: 'luxury', label: 'Luxury Wing', icon: Diamond },
  { id: 'lifestyle', label: 'Dining', icon: UtensilsCrossed },
  { id: 'entertainment', label: 'Attractions', icon: Rocket },
  { id: 'conventions', label: 'Conventions', icon: Mic2 },
  { id: 'capacity', label: 'Spatial Intel', icon: BarChart3 },
  { id: 'events', label: 'Events Hub', icon: Calendar },
  { id: 'partnerships', label: 'Partnerships', icon: User },
  { id: 'footer', label: 'Connect', icon: Menu },
];

interface MagneticIconProps {
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
  label: string;
  key?: React.Key;
}

function MagneticIcon({ children, isActive, onClick, label }: MagneticIconProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const dx = clientX - centerX;
    const dy = clientY - centerY;
    
    // Magnetic pull distance
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < 60) {
      x.set(dx * 0.4);
      y.set(dy * 0.4);
    } else {
      x.set(0);
      y.set(0);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <button
      onClick={onClick}
      className="group relative flex flex-col items-center gap-2 outline-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        ref={ref}
        style={{ x: springX, y: springY }}
        className={cn(
          "p-3 rounded-full transition-all duration-500 ease-[0.16,1,0.3,1] relative",
          isActive 
            ? "text-gold drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]" 
            : "text-gray-500 hover:text-gold hover:bg-gold/5"
        )}
      >
        {isActive && (
          <motion.div 
            layoutId="active-glow"
            className="absolute inset-0 bg-gold/5 rounded-full border border-gold/20"
            transition={{ duration: 0.6, ease: LUXURY_EASE }}
          />
        )}
        {React.cloneElement(children as React.ReactElement, { size: 18, strokeWidth: 1 })}
      </motion.div>
      <span className={cn(
        "text-[10px] uppercase tracking-widest font-medium transition-all duration-500 ease-[0.16,1,0.3,1]",
        isActive ? "text-gold opacity-100" : "text-gray-600 opacity-0 group-hover:opacity-100"
      )}>
        {label}
      </span>
      
      {isActive && (
        <motion.div 
          layoutId="active-indicator"
          transition={{ duration: 0.6, ease: LUXURY_EASE }}
          className="absolute -left-12 w-1 h-8 bg-gold rounded-full"
        />
      )}
    </button>
  );
}

export function Sidebar({ activeSection, isAutoPlay, onToggleAutoPlay }: { activeSection: string; isAutoPlay?: boolean; onToggleAutoPlay?: () => void }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const { perspective, setPerspective } = usePerspective();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsOpen(false);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 right-6 z-50 p-3 bg-black/50 backdrop-blur-md border border-gold/30 rounded-full md:hidden hover:border-gold transition-colors"
      >
        {isOpen ? <X className="text-gold w-6 h-6" /> : <Menu className="text-gold w-6 h-6" />}
      </button>

      <motion.nav
        initial={false}
        animate={{ x: isOpen || window.innerWidth >= 768 ? 0 : -300 }}
        transition={{ duration: 0.8, ease: LUXURY_EASE }}
        className={cn(
          "fixed top-0 left-0 h-full w-20 md:w-24 z-40 bg-black/40 backdrop-blur-xl border-r border-gold/10 flex flex-col items-center py-12 transition-all",
          isOpen ? "translate-x-0 w-64 shadow-2xl shadow-gold/20" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="mb-14 flex justify-center">
          <div className="relative group cursor-pointer">
            
            <div className="absolute -inset-2 bg-gold/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>

        {/* Perspective Toggle HUD */}
        <div className="mb-10 px-2">
          <div className="bg-white/5 border border-white/10 rounded-full p-1 flex flex-col gap-1 items-center">
            {(['brand', 'retail', 'event'] as Perspective[]).map((p) => (
              <button
                key={p}
                onClick={() => setPerspective(p)}
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 relative",
                  perspective === p ? "text-black" : "text-white/70 hover:text-white"
                )}
                title={p.charAt(0).toUpperCase() + p.slice(1)}
              >
                {perspective === p && (
                  <motion.div
                    layoutId="perspective-active"
                    className="absolute inset-0 bg-gold rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 text-[10px] font-black uppercase">
                  {p.charAt(0)}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-8 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <MagneticIcon 
                key={item.id} 
                isActive={isActive} 
                onClick={() => scrollTo(item.id)}
                label={item.label}
              >
                <Icon />
              </MagneticIcon>
            );
          })}
        </div>

        {/* Playback Controls HUD */}
        {onToggleAutoPlay && (
          <div className="mt-auto pt-10 border-t border-white/5 w-full flex flex-col items-center gap-4">
            <MagneticIcon 
                isActive={isAutoPlay || false} 
                onClick={onToggleAutoPlay}
                label={isAutoPlay ? "PAUSE TOUR" : "RESUME TOUR"}
            >
              {isAutoPlay ? <Pause /> : <PlayIcon />}
            </MagneticIcon>
          </div>
        )}
      </motion.nav>
    </>
  );
}

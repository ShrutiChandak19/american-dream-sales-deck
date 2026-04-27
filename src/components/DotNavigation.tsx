import React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

const sections = [
  { id: 'intro', label: 'Intro' },
  { id: 'explore', label: 'Explore' },
  { id: 'location', label: 'Location' },
  { id: 'retail', label: 'Retail' },
  { id: 'luxury', label: 'Luxury' },
  { id: 'lifestyle', label: 'Lifestyle' },
  { id: 'entertainment', label: 'Experiences' },
  { id: 'conventions', label: 'Conventions' },
  { id: 'events', label: 'Events' },
  { id: 'partnerships', label: 'Partners' },
];

export function DotNavigation({ activeSection }: { activeSection: string }) {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-[100] hidden lg:flex flex-col gap-6 items-center">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => scrollTo(section.id)}
          className="group relative flex items-center justify-center p-2"
        >
          {/* Label */}
          <div className={cn(
            "absolute right-12 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none transform translate-x-4 group-hover:translate-x-0 whitespace-nowrap",
            "bg-black/60 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-xl text-[10px] uppercase tracking-[0.3em] font-black text-gold shadow-2xl"
          )}>
            {section.label}
          </div>

          {/* Dot */}
          <div className={cn(
            "w-1.5 h-1.5 rounded-full transition-all duration-500 transform",
            activeSection === section.id 
              ? "bg-gold scale-150 shadow-[0_0_15px_rgba(212,175,55,0.8)]" 
              : "bg-white/20 group-hover:bg-white/50 group-hover:scale-125"
          )} />
          
          {/* Active Ring */}
          {activeSection === section.id && (
            <motion.div
              layoutId="active-dot"
              className="absolute inset-0 border border-gold rounded-full scale-[2.5] opacity-20"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>
  );
}

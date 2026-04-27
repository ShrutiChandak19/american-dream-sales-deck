import React from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Star, Music, Users } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { usePerspective, Perspective } from '@/src/lib/PerspectiveContext';

const LUXURY_EASE = [0.16, 1, 0.3, 1];

const interests = [
  { id: 'retail', label: 'Retail', icon: ShoppingBag, color: 'bg-blue-500/10 text-blue-400', perspective: 'retail' as Perspective },
  { id: 'luxury', label: 'Luxury', icon: Star, color: 'bg-gold/10 text-gold', perspective: 'retail' as Perspective },
  { id: 'events', label: 'Events', icon: Music, color: 'bg-purple-500/10 text-purple-400', perspective: 'event' as Perspective },
  { id: 'partnerships', label: 'Sponsorship', icon: Users, color: 'bg-green-500/10 text-green-400', perspective: 'brand' as Perspective },
];

export function ExploreInterest() {
  const { setPerspective } = usePerspective();

  const handleNavigate = (id: string, perspective: Perspective) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setPerspective(perspective);
  };

  return (
    <section className="py-24 px-8 md:px-24 bg-black relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-gold uppercase tracking-[0.4em] text-xs font-bold block mb-4">Journey</span>
          <h2 className="text-4xl md:text-6xl font-display text-white">Explore by Interest</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {interests.map((item, i) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, ease: LUXURY_EASE }}
              onClick={() => handleNavigate(item.id, item.perspective)}
              className="group relative h-80 overflow-hidden rounded-[32px] border border-white/5 bg-white/[0.03] backdrop-blur-sm transition-all duration-700 hover:scale-[1.02] hover:border-white/20"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 transition-transform duration-700 group-hover:scale-110">
                <div className={cn("p-6 rounded-full mb-6 transition-colors duration-500 group-hover:bg-opacity-20", item.color)}>
                  <item.icon size={48} strokeWidth={1} />
                </div>
                <h3 className="text-2xl font-display text-white mb-2">{item.label}</h3>
                <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Discover More</p>
              </div>

              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-gold rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0" />
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

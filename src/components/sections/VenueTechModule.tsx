import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, Maximize, ArrowUp, Users, Info } from 'lucide-react';
import { cn } from '@/src/lib/utils';

type VenueKey = 'avenue' | 'nickelodeon' | 'snow';

interface VenueData {
  id: VenueKey;
  name: string;
  sqft: string;
  ceiling: string;
  power: string;
  zones: { name: string; capacity: number }[];
  description: string;
}

const venues: Record<VenueKey, VenueData> = {
  avenue: {
    id: 'avenue',
    name: 'The Avenue',
    sqft: '45,000',
    ceiling: '28ft',
    power: '400A 3-Phase',
    description: 'An elegant, luxury-focused space perfect for high-fashion runways and gala dinners.',
    zones: [
      { name: 'Grand Atrium', capacity: 800 },
      { name: 'Champagne Court', capacity: 300 },
      { name: 'Crystal Hallway', capacity: 1200 },
    ]
  },
  nickelodeon: {
    id: 'nickelodeon',
    name: 'Nickelodeon Universe',
    sqft: '300,000',
    ceiling: '150ft',
    power: '1200A 3-Phase',
    description: 'Massive volume for global brand launches and large-scale cultural events.',
    zones: [
      { name: 'Stage 1', capacity: 2500 },
      { name: 'Midway Plaza', capacity: 5000 },
      { name: 'SpongeBob Central', capacity: 1500 },
    ]
  },
  snow: {
    id: 'snow',
    name: 'Big SNOW',
    sqft: '180,000',
    ceiling: '80ft',
    power: '800A 3-Phase',
    description: 'A unique alpine environment for high-impact sport and lifestyle activations.',
    zones: [
      { name: 'The Summit', capacity: 600 },
      { name: 'Base Camp', capacity: 2000 },
      { name: 'Avalanche Alley', capacity: 1000 },
    ]
  }
};

interface Props { scrollContainer?: React.RefObject<HTMLElement>; }

export function VenueTechModule({ scrollContainer }: Props) {
  const vp = { root: scrollContainer };
  const [activeVenue, setActiveVenue] = React.useState<VenueKey>('avenue');
  const [capacity, setCapacity] = React.useState(1500);

  const venue = venues[activeVenue];

  return (
    <section id="capacity" className="snap-section bg-zinc-950 flex items-center justify-center p-8 md:p-24 overflow-hidden">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        
        {/* Left Control Column */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            className="mb-8"
          >
            <span className="text-gold tracking-[0.4em] uppercase text-[10px] font-bold mb-4 block underline decoration-gold/20 underline-offset-8">Intelligence Module</span>
            <h2 className="text-4xl md:text-6xl font-display mb-6">Venue <br /><span className="text-gold italic">Intelligence</span></h2>
            <p className="text-white/40 font-light leading-relaxed mb-8">
              Explore our architectural capabilities. Each footprint is designed 
              with the power and volume required for global-scale production.
            </p>
          </motion.div>

          {/* Venue Toggles */}
          <div className="space-y-3 mb-12">
            {(Object.values(venues)).map((v) => (
              <button
                key={v.id}
                onClick={() => setActiveVenue(v.id)}
                className={cn(
                  "w-full p-6 text-left rounded-2xl border transition-all flex items-center justify-between group",
                  activeVenue === v.id 
                    ? "bg-gold text-black border-gold shadow-xl shadow-gold/20" 
                    : "bg-white/5 border-white/5 text-white hover:border-gold/30"
                )}
              >
                <span className="font-display text-xl">{v.name}</span>
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center transition-colors",
                  activeVenue === v.id ? "bg-black text-gold" : "bg-white/10 group-hover:bg-gold/20 group-hover:text-gold"
                )}>
                  <Info size={16} />
                </div>
              </button>
            ))}
          </div>

          {/* Capacity Slider */}
          <div className="p-8 bg-black/40 border border-white/5 rounded-3xl">
            <div className="flex justify-between items-end mb-6">
               <h4 className="text-[10px] uppercase tracking-widest text-gold font-bold">Capacity Planner</h4>
               <div className="text-3xl font-display font-black">{capacity.toLocaleString()} <span className="text-xs text-white/30 uppercase font-sans font-light tracking-tighter">GUESTS</span></div>
            </div>
            <input 
              type="range" 
              min="500" 
              max="5000" 
              step="100"
              value={capacity}
              onChange={(e) => setCapacity(parseInt(e.target.value))}
              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-gold mb-4"
            />
            <div className="flex justify-between text-[8px] text-white/20 tracking-widest uppercase">
               <span>500</span>
               <span>5,000+</span>
            </div>
          </div>
        </div>

        {/* Right Data Column */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeVenue}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {/* Tech Specs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-8 bg-zinc-900 border border-white/5 rounded-3xl group hover:border-gold/30 transition-colors">
                  <Maximize className="text-gold mb-4" size={24} />
                  <div className="text-[10px] text-white/30 uppercase tracking-[0.2em] mb-1">Square Footage</div>
                  <div className="text-2xl font-display">{venue.sqft}</div>
                </div>
                <div className="p-8 bg-zinc-900 border border-white/5 rounded-3xl group hover:border-gold/30 transition-colors">
                  <ArrowUp className="text-gold mb-4" size={24} />
                  <div className="text-[10px] text-white/30 uppercase tracking-[0.2em] mb-1">Max Ceiling</div>
                  <div className="text-2xl font-display">{venue.ceiling}</div>
                </div>
                <div className="p-8 bg-zinc-900 border border-white/5 rounded-3xl group hover:border-gold/30 transition-colors">
                  <Zap className="text-gold mb-4" size={24} />
                  <div className="text-[10px] text-white/30 uppercase tracking-[0.2em] mb-1">Power Spec</div>
                  <div className="text-2xl font-display">{venue.power}</div>
                </div>
              </div>

              {/* Zones Visualizer */}
              <div className="p-10 bg-black border border-white/10 rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-20">
                  <span className="text-[8px] tracking-[0.5em] font-display uppercase vertical-text">ARCHITECTURAL DATA</span>
                </div>
                
                <h3 className="text-xl font-display mb-8 flex items-center gap-3">
                   Optimal Activation Zones
                </h3>

                <div className="space-y-6">
                   {venue.zones.map((zone, i) => {
                     const isOptimal = capacity <= zone.capacity;
                     const percentage = Math.min((capacity / zone.capacity) * 100, 100);
                     
                     return (
                       <div key={i} className="space-y-2">
                         <div className="flex justify-between items-end">
                            <span className={cn(
                              "text-sm font-medium transition-colors",
                              isOptimal ? "text-white" : "text-white/20"
                            )}>
                              {zone.name}
                            </span>
                            <div className="flex items-center gap-2">
                               {isOptimal && (
                                 <span className="text-[8px] bg-gold/10 text-gold border border-gold/20 px-2 py-0.5 rounded tracking-widest uppercase font-bold animate-pulse">RECOMMENDED</span>
                               )}
                               <span className="text-[10px] text-white/30 font-mono">MAX: {zone.capacity}</span>
                            </div>
                         </div>
                         <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <motion.div 
                               initial={{ width: 0 }}
                               animate={{ width: `${percentage}%` }}
                               className={cn(
                                 "h-full transition-all duration-500",
                                 isOptimal ? "bg-gold shadow-[0_0_10px_rgba(212,175,55,0.5)]" : "bg-red-900/50"
                               )}
                            />
                         </div>
                       </div>
                     );
                   })}
                </div>

                <div className="mt-12 flex items-center gap-4 p-4 bg-gold/5 border border-gold/10 rounded-xl">
                   <Users className="text-gold" size={20} />
                   <p className="text-[10px] text-gold/60 leading-relaxed uppercase tracking-tighter">
                      Based on current input ({capacity}), our spatial AI recommends 
                      {venue.zones.filter(z => capacity <= z.capacity).length > 0 
                        ? ` ${venue.zones.filter(z => capacity <= z.capacity).map(z => z.name).join(' and ')}.`
                        : " customized oversized builds in our atrium spaces."}
                   </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Diamond, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';

// Real American Dream / The Avenue luxury wing press images
const LUXURY_IMAGES = [
  {
    src: 'https://media.cntraveler.com/photos/5f7c1c9e8b3f3c6e5b3b3b3b/master/w_1600,c_limit/American-Dream-Mall_The-Avenue_2020.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/American_Dream_mall_entrance.jpg/1280px-American_Dream_mall_entrance.jpg',
    label: 'The Avenue — Grand Promenade',
  },
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/American_Dream_mall_entrance.jpg/1280px-American_Dream_mall_entrance.jpg',
    fallback: 'https://images.squarespace-cdn.com/content/v1/5e3a0a9a8b3f3c6e5b3b3b3b/american-dream-the-avenue.jpg',
    label: 'Hermès & Dior — Flagship Studios',
  },
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/American_Dream_mall_interior_atrium.jpg/1280px-American_Dream_mall_interior_atrium.jpg',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/American_Dream_mall_entrance.jpg/1280px-American_Dream_mall_entrance.jpg',
    label: 'The Avenue — Interior Atrium',
  },
];

function LuxuryGallery() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + LUXURY_IMAGES.length) % LUXURY_IMAGES.length);
  const next = () => setCurrent((c) => (c + 1) % LUXURY_IMAGES.length);

  return (
    <div className="relative aspect-video lg:aspect-[4/5] overflow-hidden rounded-sm group">
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={LUXURY_IMAGES[current].src}
          alt={LUXURY_IMAGES[current].label}
          onError={(e) => {
            const img = e.currentTarget;
            if (img.src !== LUXURY_IMAGES[current].fallback) {
              img.src = LUXURY_IMAGES[current].fallback;
            }
          }}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full object-cover brightness-75 group-hover:brightness-90 transition-all duration-1000"
          loading="lazy"
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

      {/* Caption */}
      <div className="absolute bottom-12 left-12 right-16">
        <h3 className="text-gold font-display text-4xl mb-2">THE <span className="italic">AVENUE</span></h3>
        <p className="text-white/60 text-sm tracking-widest font-light">{LUXURY_IMAGES[current].label}</p>
      </div>

      {/* Carousel Controls */}
      <div className="absolute bottom-12 right-6 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <button
          onClick={prev}
          className="w-9 h-9 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white hover:border-gold hover:text-gold transition-all"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          onClick={next}
          className="w-9 h-9 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white hover:border-gold hover:text-gold transition-all"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Dots */}
      <div className="absolute top-4 right-4 flex gap-1.5">
        {LUXURY_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === current ? 'bg-gold w-4' : 'bg-white/30'}`}
          />
        ))}
      </div>
    </div>
  );
}

interface Props { scrollContainer?: React.RefObject<HTMLElement>; }

export function LuxurySection({ scrollContainer }: Props) {
  const vp = { root: scrollContainer };
  return (
    <section id="luxury" className="snap-section bg-zinc-950 flex flex-col justify-center px-8 md:px-24 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={vp}
            className="order-2 lg:order-1 hidden md:block"
          >
            <LuxuryGallery />
            <div className="mt-6 flex gap-4">
               <div className="flex-1 p-4 lg:p-6 border border-white/5 rounded-xl bg-white/5">
                  <Diamond className="text-gold mb-3" size={20} />
                  <div className="text-base lg:text-lg font-display">Saks Fifth Avenue</div>
                  <div className="text-[10px] text-white/40 uppercase tracking-tighter">Anchor Presence</div>
               </div>
               <div className="flex-1 p-4 lg:p-6 border border-white/5 rounded-xl bg-white/5">
                  <Sparkles className="text-gold mb-3" size={20} />
                  <div className="text-base lg:text-lg font-display">Hermès & Dior</div>
                  <div className="text-[10px] text-white/40 uppercase tracking-tighter">Flagship Studios</div>
               </div>
            </div>
          </motion.div>

          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={vp}
              className="mb-6 lg:mb-8"
            >
              <span className="text-gold tracking-[0.5em] text-[10px] lg:text-xs font-bold uppercase block mb-4">Elite Positioning</span>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-display leading-[0.9] tracking-tighter mb-6 lg:mb-8">
                Where <br />
                <span className="text-gold italic">Luxury</span> <br />
                Resides.
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={vp}
              transition={{ delay: 0.2 }}
              className="text-white/50 text-base lg:text-xl font-light leading-relaxed mb-8 lg:mb-12 max-w-lg"
            >
              The Avenue is a curated collection of the world's most desired flagship 
              experiences. A distinct architecture, white-glove service, and private 
              VIP lounges redefine the mall experience for high-net-worth clients.
            </motion.p>

            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-6">
              {[
                "Private Valet & Concierge Hub",
                "Champagne & Caviar Lounges",
                "Exclusive VIP Styling Suites",
                "24/7 Elite Security Coverage"
              ].map((item, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={vp}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 text-white/70"
                >
                  <ShieldCheck className="text-gold" size={18} />
                  <span className="text-sm font-medium tracking-wide">{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

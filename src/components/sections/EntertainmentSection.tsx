import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { VideoBackground } from '../VideoBackground';

const attractions = [
  {
    title: "Nickelodeon Universe",
    category: "Theme Park",
    image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&q=80&w=1200",
    desc: "The largest indoor theme park in the Western Hemisphere."
  },
  {
    title: "DreamWorks",
    category: "Water Park",
    image: "https://images.unsplash.com/photo-1543832923-44667a44c804?auto=format&fit=crop&q=80&w=1200",
    desc: "Open year-round with the world's largest indoor wave pool."
  },
  {
    title: "Big SNOW",
    category: "Skiing",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=1200",
    desc: "North America's first indoor real-snow ski and snowboard center."
  },
  {
    title: "Sea Life Aquarium",
    category: "Education",
    image: "https://images.unsplash.com/photo-1524704654690-b56c05c78a00?auto=format&fit=crop&q=80&w=1200",
    desc: "Discover amazing creatures from the deep in our underwater tunnel."
  }
];

interface Props { scrollContainer?: React.RefObject<HTMLElement>; }

export function EntertainmentSection({ scrollContainer }: Props) {
  const vp = { root: scrollContainer };
  return (
    <section id="entertainment" className="snap-section min-h-screen flex items-center justify-center p-8 md:px-24 relative overflow-hidden">
      <VideoBackground src="/videos/entertainment-attractions.mp4" overlayOpacity={0.8} />
      
      <div className="max-w-7xl mx-auto h-full flex flex-col justify-center relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-12">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              className="mb-6"
            >
              <span className="text-gold tracking-[0.4em] uppercase text-[10px] font-bold mb-2 block">The Anchor of Experience</span>
              <h2 className="text-4xl md:text-7xl font-display text-white leading-tight">
                Beyond <span className="text-gold italic">Traditional</span> Commerce
              </h2>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={vp}
              className="text-white/60 text-lg md:text-xl font-light leading-relaxed"
            >
              Our entertainment anchors ensure consistent traffic flow every single day, 
              regardless of season or economic climate.
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={vp}
            className="flex flex-col items-start gap-4 md:items-end"
          >
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-full backdrop-blur-md">
              <PlayCircle className="text-gold" size={20} />
              <span className="text-white/80 text-xs font-bold uppercase tracking-widest">Live Experience</span>
            </div>
            <p className="text-white/30 text-[10px] uppercase tracking-[0.3em] font-black">Scroll to Explore</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {attractions.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-[32px] aspect-[4/5] cursor-pointer border border-white/5 bg-white/[0.03] backdrop-blur-sm"
            >
              <img 
                src={item.image} 
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-90 grayscale-[50%] group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-700" />
              
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <span className="text-[10px] uppercase tracking-[0.3em] text-gold/80 mb-2 block font-bold">{item.category}</span>
                <h3 className="text-2xl lg:text-3xl font-display mb-4 text-white">{item.title}</h3>
                <p className="text-sm text-white/50 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 duration-500 font-light leading-relaxed">
                  {item.desc}
                </p>
                <div className="mt-2 flex items-center gap-3 text-gold font-black text-[10px] tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  EXPLORE VENUE <ArrowRight size={14} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

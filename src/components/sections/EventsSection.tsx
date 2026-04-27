import React from 'react';
import { motion } from 'motion/react';
import { Calendar as CalendarIcon, MapPin, Ticket, Share2, ArrowRight } from 'lucide-react';
import { VideoBackground } from '../VideoBackground';

const events = [
  {
    date: "MAY 15",
    time: "7:00 PM",
    title: "Summer Solstice Runway",
    location: "The Avenue",
    type: "Fashion"
  },
  {
    date: "JUN 02",
    time: "10:00 AM",
    title: "DreamWorks Character Brunch",
    location: "Water Park",
    type: "Family"
  },
  {
    date: "JUN 20",
    time: "8:00 PM",
    title: "Midnight Ski Open",
    location: "Big SNOW",
    type: "Sport"
  }
];

interface Props { scrollContainer?: React.RefObject<HTMLElement>; }

export function EventsSection({ scrollContainer }: Props) {
  const vp = { root: scrollContainer };
  return (
    <section id="events" className="snap-section min-h-screen flex items-center justify-center pt-12 md:pt-24 px-6 md:px-12 lg:px-24 overflow-hidden relative">
      <VideoBackground src="/videos/events-concerts.mp4" overlayOpacity={0.8} />
      
      <div className="flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-24">
          <div className="lg:col-span-6 mb-8 lg:mb-0">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={vp}
              className="mb-10"
            >
              <span className="text-gold tracking-[0.4em] uppercase text-[10px] lg:text-xs font-bold mb-4 block">The Heartbeat of the Mall</span>
              <h2 className="text-4xl md:text-5xl lg:text-8xl font-display text-white mb-8 mb-10 leading-none">
                Unforgettable <br />
                <span className="text-gold italic">Moments</span>
              </h2>
              
              <p className="text-white/60 text-lg md:text-xl font-light mb-12 leading-relaxed">
                Our events hub is a massive activation platform. From high-fashion 
                runways to global brand launches, we provide the stage.
              </p>
            </motion.div>
            
            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-gold text-black rounded-full transition-all flex items-center gap-4 tracking-[0.2em] font-black text-[11px]"
            >
              <Ticket size={20} /> BOOK THIS VENUE
            </motion.button>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-white/5 border border-white/10 rounded-[40px] p-8 md:p-12 backdrop-blur-2xl">
               <h3 className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-8 border-b border-white/10 pb-6 font-black">Upcoming Global Activations</h3>
              
               <div className="space-y-4">
                {events.map((event, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={vp}
                    transition={{ delay: i * 0.1 }}
                    className="group flex items-center p-3 bg-white/[0.02] border border-white/5 rounded-3xl hover:border-gold/30 hover:bg-white/[0.05] transition-all cursor-pointer overflow-hidden"
                  >
                    <div className="flex flex-col items-center justify-center min-w-[100px] border-r border-white/10 mr-8">
                      <span className="text-gold font-display text-3xl font-medium tracking-tighter">{event.date.split(' ')[1]}</span>
                      <span className="text-white/40 text-[10px] tracking-widest uppercase font-bold">{event.date.split(' ')[0]}</span>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[8px] lg:text-[10px] px-3 py-1 bg-gold/10 text-gold rounded-full border border-gold/20 font-black uppercase tracking-widest">{event.type}</span>
                        <span className="text-white/30 text-[10px] uppercase tracking-widest font-bold">{event.time}</span>
                      </div>
                      <h4 className="text-xl md:text-2xl font-display text-white group-hover:text-gold transition-colors">{event.title}</h4>
                      <div className="flex items-center gap-2 text-white/30 text-[10px] mt-2 uppercase tracking-widest font-black">
                        <MapPin size={12} className="text-gold/40" /> {event.location}
                      </div>
                    </div>
                    
                    <div className="transition-transform group-hover:translate-x-2">
                      <div className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center text-white/20 group-hover:border-gold group-hover:text-gold transition-all group-hover:bg-gold/10">
                        <ArrowRight size={18} />
                      </div>
                    </div>
                  </motion.div>
                ))}
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


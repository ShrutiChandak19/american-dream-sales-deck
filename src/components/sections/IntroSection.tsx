import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { ChevronDown, Play, X, Info, ArrowRight, Store, Megaphone, Mic2 } from 'lucide-react';

import { usePerspective, Perspective } from '@/src/lib/PerspectiveContext';

const LUXURY_EASE = [0.16, 1, 0.3, 1];

 const PERSPECTIVES_DATA = {
  brand: { // sponsor
    stats: [
      { label: 'ANNUAL VISITORS', value: '75M+' },
      { label: 'MEDIA IMPRESSIONS', value: '12B+' },
      { label: 'BRAND REACH', value: 'GLOBAL' }
    ],
    heroTitle: 'WHERE BRANDS BECOME ICONS',
    subtext: 'Activate your brand in front of millions through immersive, high-impact experiences.',
    cta: 'START PARTNERSHIP',
    tagline: 'Global Brand Platform'
  },

  retail: { // retailer
    stats: [
      { label: 'AVG HOUSEHOLD INCOME', value: '$150K+' },
      { label: 'PRIMARY CATCHMENT', value: '20M+' },
      { label: 'ANNUAL FOOTFALL', value: '75M+' }
    ],
    heroTitle: '75 MILLION VISITORS. ONE DESTINATION.',
    subtext: 'Position your brand at the center of a high-intent, high-spend audience.',
    cta: 'INQUIRE LEASING',
    tagline: 'Retail Opportunity'
  },

  event: { // producer
    stats: [
      { label: 'VENUE CAPACITY', value: '3,000+' },
      { label: 'EVENT SPACE', value: '30K SQ FT' },
      { label: 'PRODUCTION GRADE', value: 'WORLD-CLASS' }
    ],
    heroTitle: 'BUILD EXPERIENCES AT SCALE',
    subtext: 'Host unforgettable events in a destination designed for spectacle and reach.',
    cta: 'BOOK A VENUE',
    tagline: 'Event Destination'
  }
};

const hotspots = [
  {
    time: 5,
    top: '35%',
    left: '25%',
    content: {
      brand: { title: '15-Acre Luxury District', sub: 'Unmatched Scale' },
      retail: { title: 'Wealth Concentration', sub: 'Top 1% Catchment' },
      event: { title: 'Production Plaza', sub: 'Grand Architecture' }
    }
  },
  {
    time: 12,
    top: '60%',
    left: '60%',
    content: {
      brand: { title: 'Dwell Time: 3.5 Hours', sub: 'Engagement Leader' },
      retail: { title: 'Daily Foot Traffic', value: '110k+', sub: 'High Visibility' }, // value is for custom rendering if needed
      event: { title: 'Power Infrastructure', sub: '4000A Support' }
    }
  },
  {
    time: 20,
    top: '45%',
    left: '75%',
    content: {
      brand: { title: 'Global Retail Hub', sub: 'Hermès, Gucci, Saks' },
      retail: { title: 'Premier Co-tenancy', sub: 'Best-in-Class Brands' },
      event: { title: '60ft Clear Height', sub: 'Aerial Rigging Ready' }
    }
  }
];

interface HotspotProps {
  top: string;
  left: string;
  title: string;
  sub: string;
  isVisible: boolean;
  key?: React.Key;
}

function Hotspot({ 
  top, 
  left, 
  title, 
  sub, 
  isVisible 
}: HotspotProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          style={{ top, left }}
          className="absolute z-30"
        >
          <div className="relative group">
            {/* Pulsing Dot */}
            <div className="w-6 h-6 bg-gold rounded-full flex items-center justify-center relative cursor-pointer">
              <div className="absolute inset-0 bg-gold rounded-full animate-ping opacity-75" />
              <Info size={12} className="text-black relative z-10" />
            </div>

            {/* Hover Card */}
            <div className="absolute left-8 top-1/2 -translate-y-1/2 w-64 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-500 scale-95 group-hover:scale-100 origin-left">
              <div className="bg-black/60 backdrop-blur-xl border border-gold/30 p-4 rounded-2xl shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                <p className="text-gold font-display text-sm mb-1">{title}</p>
                <p className="text-white/60 text-[10px] uppercase tracking-widest leading-relaxed">{sub}</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function IntroSection({ 
  onOpenLeasing, 
  onStartTour,
  scrollContainer
}: { 
  onOpenLeasing: () => void; 
  onStartTour: () => void;
  scrollContainer?: React.RefObject<HTMLElement>;
}) {
  const { perspective } = usePerspective();
  const currentPerspective = perspective || 'brand';
  const content = PERSPECTIVES_DATA[currentPerspective];

  const [isVideoLoaded, setIsVideoLoaded] = React.useState(false);
  const [isFilmOpen, setIsFilmOpen] = React.useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Timeout to hide loader if video takes too long
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsVideoLoaded(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    container: scrollContainer,
    offset: ["start start", "end start"]
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [0.6, 0.4, 0]);
  const videoBlur = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(20px)"]);
  const videoBorderRadius = useTransform(scrollYProgress, [0, 1], ["0px", "60px"]);

  return (
    <section 
      id="intro" 
      ref={containerRef}
      className="snap-section flex flex-col items-center justify-center overflow-hidden bg-black relative"
    >
      {/* Loading State Overlay */}
      <AnimatePresence>
        {!isVideoLoaded && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 bg-black flex items-center justify-center"
          >
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-12 h-12 border-2 border-gold/20 border-t-gold rounded-full"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* High-Performance Video Background */}
      <motion.div 
        style={{ 
          scale: videoScale, 
          opacity: videoOpacity,
          filter: videoBlur,
          borderRadius: videoBorderRadius,
        }}
        className="absolute inset-0 z-0 overflow-hidden"
      >
        <motion.video 
          ref={videoRef}
          autoPlay 
          muted 
          loop 
          playsInline
          onCanPlayThrough={() => setIsVideoLoaded(true)}
          onLoadedData={() => setIsVideoLoaded(true)}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          onError={() => setIsVideoLoaded(true)}
          onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: isVideoLoaded ? 1 : 0, scale: 1 }}
          transition={{ duration: 2.5, ease: LUXURY_EASE }}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/american-dream-avenue.mp4" type="video/mp4" />
        </motion.video>

        {/* Hotspots Overlay */}
        {hotspots.map((h, i) => {
          const isVisible = currentTime >= h.time && currentTime <= h.time + 4;
          const p = perspective || 'brand';
          const data = h.content[p];
          if (!data) return null;
          
          return (
            <Hotspot 
              key={i}
              top={h.top}
              left={h.left}
              title={data.title}
              sub={data.sub}
              isVisible={isVisible}
            />
          );
        })}
        
        {/* Glassmorphism & Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 backdrop-blur-[2px]" />
      </motion.div>

      <div className="relative z-10 text-center px-6 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-screen py-20">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(20px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.5, ease: LUXURY_EASE }}
          className="flex flex-col items-center mb-16"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPerspective}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.05, y: -20 }}
              transition={{ duration: 1, ease: LUXURY_EASE }}
              className="flex flex-col items-center"
            >
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-gold uppercase tracking-[0.8em] text-xs md:text-sm font-black block mb-8 drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]"
              >
                {content.tagline}
              </motion.span>
              
              <h1 className="font-display font-medium uppercase text-white mb-10 transition-all duration-1000 text-center max-w-[900px] mx-auto leading-[0.95] tracking-[-0.02em] text-[clamp(3rem,7vw,6rem)]">                
               {content.heroTitle}
              </h1>

              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="text-white/60 text-lg md:text-2xl font-light max-w-3xl mx-auto leading-relaxed mb-16 px-4"
              >
                {content.subtext}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="flex flex-col items-center gap-4"
              >
                <button 
                  onClick={onOpenLeasing}
                  className="group relative px-12 md:px-16 py-6 md:py-8 bg-gold text-black font-black uppercase tracking-[0.3em] text-[11px] md:text-xs rounded-full overflow-hidden transition-all duration-700 transform hover:scale-110 shadow-2xl shadow-gold/30 flex items-center gap-4 min-w-[300px] md:min-w-[350px] justify-center"
                >
                  {/* Subtle Glow Effect */}
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                  
                  <span className="relative z-10 flex items-center gap-3">
                    {currentPerspective === 'retail' && <Store size={18} />}
                    {currentPerspective === 'brand' && <Megaphone size={18} />}
                    {currentPerspective === 'event' && <Mic2 size={18} />}
                    {content.cta}
                  </span>
                  <ArrowRight size={18} className="relative z-10 group-hover:translate-x-2 transition-transform duration-700" />
                </button>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold">No commitment. Get full details →</p>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 2 }}
          className="w-full max-w-5xl"
        >
          <div className="flex flex-wrap justify-center gap-x-12 md:gap-x-32 gap-y-10 border-y border-white/5 py-12 md:py-20 backdrop-blur-md relative overflow-hidden rounded-[40px] bg-white/[0.03]">
            {/* Ambient Background Light in Stats Row */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gold/5 blur-[100px] opacity-20 pointer-events-none" />
            
            {content.stats.map((stat, i) => (
              <motion.div 
                key={i + currentPerspective}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 + i * 0.15 }}
                className="text-center min-w-[140px] relative z-10"
              >
                <div className="text-4xl md:text-6xl font-display text-white mb-4 tracking-tighter leading-none">{stat.value}</div>
                <div className="text-[10px] uppercase tracking-[0.5em] text-gold/60 font-black">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Watch Film Button Overlay */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: isVideoLoaded ? 1 : 0, x: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        onClick={() => setIsFilmOpen(true)}
        className="absolute bottom-10 left-10 z-20 flex items-center gap-4 group"
      >
        <div className="relative">
          {/* Progress Ring */}
          <svg className="absolute -inset-2 w-[calc(100%+16px)] h-[calc(100%+16px)] -rotate-90 pointer-events-none">
            <circle
              cx="50%"
              cy="50%"
              r="28"
              fill="none"
              stroke="rgba(212,175,55,0.1)"
              strokeWidth="1.5"
            />
            <motion.circle
              cx="50%"
              cy="50%"
              r="28"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="2"
              strokeDasharray="176"
              initial={{ strokeDashoffset: 176 }}
              animate={{ strokeDashoffset: duration ? 176 - (currentTime / duration) * 176 : 176 }}
              transition={{ ease: "linear", duration: 0.1 }}
            />
          </svg>
          
          <div className="w-14 h-14 rounded-full border border-gold/40 flex items-center justify-center bg-black/40 backdrop-blur-md group-hover:scale-110 group-hover:border-gold group-hover:bg-gold/20 transition-all duration-500 relative z-10">
            <div className="absolute inset-0 rounded-full bg-gold/20 animate-ping group-hover:bg-gold/40" />
            <Play size={20} className="text-gold ml-1 fill-gold transition-all relative z-10" />
          </div>
        </div>

        <div className="text-left">
          <motion.div 
            className="overflow-hidden"
            initial={false}
          >
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-bold mb-0.5">Interaction</p>
            <div className="relative h-5">
              <p className="text-sm text-gold font-display tracking-widest uppercase transition-all duration-500 absolute inset-0 group-hover:-translate-y-full group-hover:opacity-0">Watch Film</p>
              <p className="text-xs text-white tracking-[0.2em] uppercase font-bold transition-all duration-500 absolute inset-0 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 whitespace-nowrap">Cinematic Preview</p>
            </div>
          </motion.div>
        </div>
      </motion.button>

      {/* Fullscreen Video Lightbox */}
      <AnimatePresence>
        {isFilmOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center p-4 md:p-10"
          >
            <motion.button
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              onClick={() => setIsFilmOpen(false)}
              className="absolute top-8 right-8 z-[110] w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-xl flex items-center justify-center text-white transition-all shadow-2xl"
            >
              <X size={24} />
            </motion.button>
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full h-full max-w-7xl relative rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(212,175,55,0.2)] bg-zinc-900"
            >
              <video 
                autoPlay 
                controls 
                className="w-full h-full object-contain"
              >
                <source src="/videos/american-dream-avenue.mp4" type="video/mp4" />
              </video>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gold/40 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[10px] uppercase tracking-widest font-bold">Discover</span>
        <ChevronDown size={24} />
      </motion.div>
    </section>
  );
}

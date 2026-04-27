import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface VideoBackgroundProps {
  src: string;
  overlayOpacity?: number;
  blurOnScroll?: boolean;
  /** Pass the snap-container ref so IntersectionObserver uses correct scroll root */
  scrollContainer?: React.RefObject<HTMLElement>;
}

export function VideoBackground({
  src,
  overlayOpacity = 0.6,
  blurOnScroll = true,
  scrollContainer,
}: VideoBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  // Only start loading when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          videoRef.current?.play().catch(() => {});
        } else {
          videoRef.current?.pause();
        }
      },
      {
        root: scrollContainer?.current ?? null,
        threshold: 0.1,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [scrollContainer]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.5, 0]);
  const blur = useTransform(scrollYProgress, [0, 1], ['blur(0px)', 'blur(20px)']);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden">
      <motion.div
        style={{
          opacity,
          filter: blurOnScroll ? blur : 'none',
          scale,
        }}
        className="w-full h-full"
      >
        {/* Poster placeholder shown before video loads */}
        {!hasLoaded && (
          <div className="absolute inset-0 bg-zinc-900" />
        )}

        {/* Video only renders when section has been seen (lazy) */}
        {isVisible && (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            onLoadedData={() => setHasLoaded(true)}
            className="w-full h-full object-cover"
          >
            <source src={src} type="video/mp4" />
          </video>
        )}

        <div className="absolute inset-0 bg-black" style={{ opacity: overlayOpacity }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-60" />
      </motion.div>
    </div>
  );
}

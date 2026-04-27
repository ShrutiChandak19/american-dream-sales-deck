import React from 'react';
import { Sidebar } from './components/Sidebar';
import { TopNav } from './components/TopNav';
import { IntroSection } from './components/sections/IntroSection';
import { LocationSection } from './components/sections/LocationSection';
import { RetailSection } from './components/sections/RetailSection';
import { LuxurySection } from './components/sections/LuxurySection';
import { LifestyleSection } from './components/sections/LifestyleSection';
import { EntertainmentSection } from './components/sections/EntertainmentSection';
import { ConventionSection } from './components/sections/ConventionSection';
import { VenueTechModule } from './components/sections/VenueTechModule';
import { EventsSection } from './components/sections/EventsSection';
import { SponsorshipSection } from './components/sections/SponsorshipSection';
import { ROIModule } from './components/sections/ROIModule';
import { FooterSection } from './components/sections/FooterSection';
import { LeasingPanel } from './components/LeasingPanel';
import { NarrativeHUD } from './components/NarrativeHUD';
import { ExploreInterest } from './components/ExploreInterest';
import { BigStatement } from './components/BigStatement';
import { FloatingCTA } from './components/FloatingCTA';
import { DotNavigation } from './components/DotNavigation';

import { PerspectiveProvider } from './lib/PerspectiveContext';
import { PerspectiveModal } from './components/PerspectiveModal';

export default function App() {
  return (
    <PerspectiveProvider>
      <AppContent />
      <PerspectiveModal />
      <FloatingCTA />
    </PerspectiveProvider>
  );
}

function AppContent() {
  const [activeSection, setActiveSection] = React.useState('intro');
  const [isLeasingOpen, setIsLeasingOpen] = React.useState(false);
  const [isAutoPlay, setIsAutoPlay] = React.useState(false);

  const sections = ['intro', 'explore', 'location', 'retail', 'luxury', 'lifestyle', 'entertainment', 'conventions', 'capacity', 'events', 'partnerships', 'footer'];

  React.useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setActiveSection((current) => {
        const currentIndex = sections.indexOf(current);
        const nextIndex = (currentIndex + 1) % sections.length;
        const nextId = sections[nextIndex];
        const element = document.getElementById(nextId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        return nextId;
      });
    }, 8000);
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const scrollContainerRef = React.useRef<HTMLElement>(null);

  // Listen for FloatingCTA events (avoids prop drilling through Provider)
  React.useEffect(() => {
    const handler = () => setIsLeasingOpen(true);
    window.addEventListener('open-leasing-panel', handler);
    return () => window.removeEventListener('open-leasing-panel', handler);
  }, []);

  React.useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const options = {
      root: container,
      rootMargin: '0px',
      threshold: 0.5,
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);
    document.querySelectorAll('.snap-section').forEach((section) => {
      observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  const handleStartTour = () => {
    setIsAutoPlay(true);
    const currentIndex = sections.indexOf(activeSection);
    const nextIndex = (currentIndex + 1) % sections.length;
    const nextId = sections[nextIndex];
    const element = document.getElementById(nextId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(nextId);
    }
  };

  return (
    <div className="bg-black text-white selection:bg-gold selection:text-black min-h-screen relative">
      <TopNav isAutoPlay={isAutoPlay} onToggleAutoPlay={() => setIsAutoPlay(!isAutoPlay)} />

      {/* Sidebar — desktop icon nav + mobile hamburger */}
      <Sidebar
        activeSection={activeSection}
        isAutoPlay={isAutoPlay}
        onToggleAutoPlay={() => setIsAutoPlay(!isAutoPlay)}
      />

      <DotNavigation activeSection={activeSection} />

      <main ref={scrollContainerRef} className="relative snap-container">
        <IntroSection
          onOpenLeasing={() => setIsLeasingOpen(true)}
          onStartTour={handleStartTour}
          scrollContainer={scrollContainerRef}
        />

        <div id="explore" className="snap-section">
          <ExploreInterest />
        </div>

        <BigStatement
          number="75M+"
          text="ANNUAL VISITORS. ONE DESTINATION."
          subtext="ESTIMATED 2026 PROJECTION"
          className="snap-section"
        />

        <LocationSection scrollContainer={scrollContainerRef} />
        <RetailSection scrollContainer={scrollContainerRef} />

        <BigStatement
          number="$2B+"
          text="ANNUAL RETAIL SPEND VOLUMES."
          subtext="PREMIER SHOPPING HUB IN THE US"
          className="snap-section"
        />

        <LuxurySection scrollContainer={scrollContainerRef} />
        <LifestyleSection scrollContainer={scrollContainerRef} />
        <EntertainmentSection scrollContainer={scrollContainerRef} />

        <BigStatement
          number="300+"
          text="GLOBAL BRANDS ALREADY ONBOARD."
          subtext="THE GOLD STANDARD OF RETAIL"
          className="snap-section"
        />

        <ConventionSection scrollContainer={scrollContainerRef} />
        <VenueTechModule scrollContainer={scrollContainerRef} />
        <EventsSection scrollContainer={scrollContainerRef} />
        <SponsorshipSection scrollContainer={scrollContainerRef} />
        <ROIModule onOpenLeasing={() => setIsLeasingOpen(true)} />
        <FooterSection onOpenLeasing={() => setIsLeasingOpen(true)} />
      </main>

      <NarrativeHUD
        activeSection={activeSection}
        isActive={isAutoPlay}
        onToggle={() => setIsAutoPlay(!isAutoPlay)}
      />
      <LeasingPanel isOpen={isLeasingOpen} onClose={() => setIsLeasingOpen(false)} />

      {/* Persistent ambient glows */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-gold/5 blur-[150px] -z-10 rounded-full pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-gold/5 blur-[120px] -z-10 rounded-full pointer-events-none" />
    </div>
  );
}

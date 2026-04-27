import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Perspective = 'brand' | 'retail' | 'event';

interface PerspectiveContextType {
  perspective: Perspective | null;
  setPerspective: (perspective: Perspective) => void;
}

const PerspectiveContext = createContext<PerspectiveContextType | undefined>(undefined);

export function PerspectiveProvider({ children }: { children: ReactNode }) {
  // Default to null so PerspectiveModal shows on first load
  const [perspective, setPerspective] = useState<Perspective | null>(null);

  return (
    <PerspectiveContext.Provider value={{ perspective, setPerspective }}>
      {children}
    </PerspectiveContext.Provider>
  );
}

export function usePerspective() {
  const context = useContext(PerspectiveContext);
  if (context === undefined) {
    throw new Error('usePerspective must be used within a PerspectiveProvider');
  }
  return context;
}

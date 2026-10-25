"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { SectionName } from "./activeSectionProvider";

type ZoomNavContextValue = {
  jumpToSection: (section: SectionName) => void;
};

const ZoomNavContext = createContext<ZoomNavContextValue | null>(null);

export function ZoomNavProvider({
  children,
  jumpToSection,
}: {
  children: ReactNode;
  jumpToSection: (section: SectionName) => void;
}) {
  return (
    <ZoomNavContext.Provider value={{ jumpToSection }}>
      {children}
    </ZoomNavContext.Provider>
  );
}

export function useZoomNav() {
  const context = useContext(ZoomNavContext);
  if (!context) {
    throw new Error("useZoomNav must be used within ZoomNavProvider");
  }
  return context;
}

export function useZoomNavOptional() {
  return useContext(ZoomNavContext);
}

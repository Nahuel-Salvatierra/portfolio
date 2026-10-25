"use client";

import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import {
  SectionName,
  useActiveSectionContext,
} from "./activeSectionProvider";

export { SectionName };

export function useSectionInView(sectionName: SectionName, amount = 0.35) {
  const ref = useRef<HTMLElement | null>(null);
  const { setActiveSection, timeOfLastClick } = useActiveSectionContext();
  const inView = useInView(ref, { amount });

  useEffect(() => {
    if (!inView) return;
    if (Date.now() - timeOfLastClick < 900) return;
    setActiveSection(sectionName);
  }, [inView, sectionName, setActiveSection, timeOfLastClick]);

  return { ref };
}

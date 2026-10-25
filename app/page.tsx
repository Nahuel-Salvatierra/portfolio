"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useMotionValue, useMotionValueEvent, useTransform } from "framer-motion";
import Intro from "./components/sections/Intro";
import AiFocus from "./components/sections/AiFocus";
import Cloud from "./components/sections/Cloud";
import Process from "./components/sections/Process";
import Contact from "./components/sections/Contact";
import { ZoomStack, type ZoomStackLayer } from "./components/motion/ZoomStack";
import { useZoomProgress } from "./components/motion/useZoomProgress";
import {
  activeZoomLayerIndex,
  heroSegmentProgress,
  HOLD_RATIO,
} from "./components/motion/zoomLayerMotion";
import { ProjectZoomLayer } from "./components/projects/ProjectZoomLayer";
import { projectsData } from "./lib/constants";
import {
  SectionName,
  useActiveSectionContext,
} from "./context/activeSectionProvider";
import { ZoomNavProvider } from "./context/zoomNavProvider";
import type { ScrollProgressRef } from "./components/hero3d/scrollProgress";
import { useMediaQuery } from "./hooks/useMediaQuery";

const HeroCanvas = dynamic(() => import("./components/hero3d/HeroCanvas"), {
  loading: () => <div className="absolute inset-0 bg-transparent" />,
  ssr: false,
});

const LAYER_SECTION: SectionName[] = [
  SectionName.Home,
  SectionName.Ai,
  ...projectsData.map(() => SectionName.Projects),
  SectionName.Cloud,
  SectionName.Process,
  SectionName.Contact,
];

const LAYER_COUNT = LAYER_SECTION.length;

function firstLayerIndexForSection(section: SectionName): number {
  const index = LAYER_SECTION.indexOf(section);
  return index < 0 ? 0 : index;
}

export default function HomePage() {
  const { progress, smooth } = useZoomProgress();
  const homeProgressRef: ScrollProgressRef = useRef(0);
  const homeLocalProgress = useMotionValue(0);
  const heroContainerRef = useRef<HTMLDivElement | null>(null);
  const { setActiveSection, timeOfLastClick, setTimeOfLastClick } =
    useActiveSectionContext();
  const timeOfLastClickRef = useRef(timeOfLastClick);
  const { isMobile } = useMediaQuery();
  const [reducedMotion, setReducedMotion] = useState(false);
  const [heroActive, setHeroActive] = useState(true);

  useEffect(() => {
    timeOfLastClickRef.current = timeOfLastClick;
  }, [timeOfLastClick]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const heroProgress = useTransform(smooth, (value) =>
    heroSegmentProgress(value, LAYER_COUNT),
  );

  useMotionValueEvent(heroProgress, "change", (value) => {
    homeLocalProgress.set(value);
    homeProgressRef.current = value;
  });

  useMotionValueEvent(smooth, "change", (value) => {
    const index = activeZoomLayerIndex(value, LAYER_COUNT);
    setHeroActive(index === 0);

    if (Date.now() - timeOfLastClickRef.current < 900) return;
    const section = LAYER_SECTION[index];
    if (section) setActiveSection(section);
  });

  const jumpToSection = useCallback(
    (section: SectionName) => {
      const index = firstLayerIndexForSection(section);
      const target = (index + HOLD_RATIO * 0.5) / LAYER_COUNT;
      progress.set(Math.min(Math.max(target, 0), 1));
      setActiveSection(section);
      setTimeOfLastClick(Date.now());
    },
    [progress, setActiveSection, setTimeOfLastClick],
  );

  const layers: ZoomStackLayer[] = useMemo(
    () => [
      {
        id: "home",
        label: "Inicio",
        className: "bg-transparent",
        children: <Intro homeProgress={homeLocalProgress} />,
      },
      {
        id: "ai",
        label: "IA",
        className: "bg-transparent",
        children: (
          <div id="ai" className="h-full">
            <AiFocus />
          </div>
        ),
      },
      ...projectsData.map((project, index) => ({
        id: project.id,
        label: project.title,
        className: "bg-transparent",
        children: (
          <div
            id={index === 0 ? "projects" : undefined}
            className="h-full min-h-full"
          >
            <ProjectZoomLayer {...project} index={index} />
          </div>
        ),
      })),
      {
        id: "cloud",
        label: "Cloud",
        className: "bg-transparent",
        children: (
          <div id="cloud" className="h-full min-h-full">
            <Cloud onConsult={() => jumpToSection(SectionName.Contact)} />
          </div>
        ),
      },
      {
        id: "process",
        label: "Proceso",
        className: "bg-transparent",
        children: (
          <div id="process" className="h-full min-h-full">
            <Process />
          </div>
        ),
      },
      {
        id: "contact",
        label: "Contacto",
        className: "bg-transparent",
        children: (
          <div id="contact" className="h-full min-h-full">
            <Contact />
          </div>
        ),
      },
    ],
    [homeLocalProgress, jumpToSection],
  );

  const simplified = isMobile || reducedMotion;

  return (
    <ZoomNavProvider jumpToSection={jumpToSection}>
      <main className="relative">
        <ZoomStack
          layers={layers}
          progress={smooth}
          jumpProgress={progress}
          backdrop={
            <div ref={heroContainerRef} className="absolute inset-0">
              <HeroCanvas
                progressRef={homeProgressRef}
                containerRef={heroContainerRef}
                simplified={simplified}
                enablePointer={!isMobile && heroActive}
                active={heroActive}
              />
            </div>
          }
        />
      </main>
    </ZoomNavProvider>
  );
}

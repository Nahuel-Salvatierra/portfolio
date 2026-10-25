"use client";

import { useState, type ReactNode } from "react";
import {
  motion,
  useMotionValueEvent,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { SiteBackground } from "../layout/SiteBackground";
import {
  activeZoomLayerIndex,
  HOLD_RATIO,
  zoomLayerMotion,
} from "./zoomLayerMotion";

export type ZoomStackLayer = {
  id: string;
  label: string;
  children: ReactNode;
  className?: string;
};

type ZoomStackProps = {
  layers: ZoomStackLayer[];
  /** Smoothed progress driving layer motion. */
  progress: MotionValue<number>;
  /** Raw progress target for scrubber jumps (spring follows). */
  jumpProgress: MotionValue<number>;
  /** Untransformed backdrop (e.g. WebGL hero) — stays under layers 0+. */
  backdrop?: ReactNode;
};

function ZoomLayer({
  layer,
  index,
  count,
  progress,
}: {
  layer: ZoomStackLayer;
  index: number;
  count: number;
  progress: MotionValue<number>;
}) {
  const scale = useTransform(progress, (p) => zoomLayerMotion(p, index, count).scale);
  const opacity = useTransform(
    progress,
    (p) => zoomLayerMotion(p, index, count).opacity,
  );
  const zIndex = useTransform(
    progress,
    (p) => zoomLayerMotion(p, index, count).zIndex,
  );
  const pointerEvents = useTransform(progress, (p) =>
    zoomLayerMotion(p, index, count).interactive ? "auto" : ("none" as const),
  );

  return (
    <motion.section
      aria-label={layer.label}
      data-zoom-layer={layer.id}
      className={`absolute inset-0 overflow-y-auto overflow-x-hidden will-change-transform origin-[50%_45%] ${layer.className ?? ""}`.trim()}
      style={{
        scale,
        opacity,
        zIndex,
        pointerEvents,
        transformStyle: "preserve-3d",
      }}
    >
      {layer.children}
    </motion.section>
  );
}

function ZoomScrubber({
  layers,
  progress,
  jumpProgress,
}: {
  layers: ZoomStackLayer[];
  progress: MotionValue<number>;
  jumpProgress: MotionValue<number>;
}) {
  const count = layers.length;
  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(progress, "change", (value) => {
    setActiveIndex(activeZoomLayerIndex(value, count));
  });

  const jumpTo = (index: number) => {
    if (count <= 0) return;
    const target = (index + HOLD_RATIO * 0.5) / count;
    jumpProgress.set(Math.min(Math.max(target, 0), 1));
  };

  return (
    <div
      className="absolute bottom-0 left-0 right-0 z-[200] flex h-3 items-end"
      role="navigation"
      aria-label="Secciones"
    >
      {layers.map((layer, index) => {
        const isActive = index === activeIndex;
        return (
          <button
            key={layer.id}
            type="button"
            aria-label={layer.label}
            aria-current={isActive ? "true" : undefined}
            onClick={() => jumpTo(index)}
            className={`relative h-3 flex-1 border-r border-[color:var(--border)] last:border-r-0 transition-colors ${
              isActive
                ? "bg-[color:var(--neon)]"
                : "bg-[color:var(--border)] hover:bg-[color:var(--neon)]/45"
            }`}
          />
        );
      })}
    </div>
  );
}

export function ZoomStack({
  layers,
  progress,
  jumpProgress,
  backdrop,
}: ZoomStackProps) {
  const count = layers.length;
  const backdropOpacity = useTransform(
    progress,
    (p) => zoomLayerMotion(p, 0, count).opacity,
  );
  return (
    <div
      className="fixed inset-0 z-[1000] overflow-hidden bg-[color:var(--bg)]"
      style={{ perspective: "1400px", perspectiveOrigin: "50% 45%" }}
    >
      <SiteBackground progress={progress} />

      {backdrop ? (
        <motion.div
          className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
          style={{ opacity: backdropOpacity }}
          aria-hidden
        >
          {backdrop}
        </motion.div>
      ) : null}

      {layers.map((layer, index) => (
        <ZoomLayer
          key={layer.id}
          layer={layer}
          index={index}
          count={count}
          progress={progress}
        />
      ))}

      <ZoomScrubber
        layers={layers}
        progress={progress}
        jumpProgress={jumpProgress}
      />
    </div>
  );
}

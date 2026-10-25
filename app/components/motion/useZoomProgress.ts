"use client";

import { useEffect, useRef } from "react";
import { useMotionValue, useSpring, type MotionValue } from "framer-motion";

function clamp01(value: number): number {
  if (value < 0) return 0;
  if (value > 1) return 1;
  return value;
}

export function useZoomProgress(): {
  progress: MotionValue<number>;
  smooth: MotionValue<number>;
} {
  const progress = useMotionValue(0);
  const smooth = useSpring(progress, {
    stiffness: 42,
    damping: 34,
    mass: 1,
  });
  const touchY = useRef<number | null>(null);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    return () => {
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
    };
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sensitivity = reduced ? 0.0007 : 0.00011;

    const nudge = (deltaY: number) => {
      progress.set(clamp01(progress.get() + deltaY * sensitivity));
    };

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      const delta =
        event.deltaMode === 1
          ? event.deltaY * 16
          : event.deltaMode === 2
            ? event.deltaY * window.innerHeight
            : event.deltaY;
      nudge(delta);
    };

    const onTouchStart = (event: TouchEvent) => {
      touchY.current = event.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (event: TouchEvent) => {
      const y = event.touches[0]?.clientY;
      if (y == null || touchY.current == null) return;
      const delta = touchY.current - y;
      touchY.current = y;
      event.preventDefault();
      nudge(delta);
    };

    const onTouchEnd = () => {
      touchY.current = null;
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown" || event.key === "PageDown") {
        event.preventDefault();
        nudge(48);
      } else if (event.key === "ArrowUp" || event.key === "PageUp") {
        event.preventDefault();
        nudge(-48);
      } else if (event.key === "Home") {
        event.preventDefault();
        progress.set(0);
      } else if (event.key === "End") {
        event.preventDefault();
        progress.set(1);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [progress]);

  return { progress, smooth };
}

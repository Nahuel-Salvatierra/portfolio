"use client";

import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, useState, type RefObject } from "react";
import { HeroScene } from "./HeroScene";
import type { PointerRef, ScrollProgressRef } from "./scrollProgress";

type HeroCanvasProps = {
  progressRef: ScrollProgressRef;
  containerRef: RefObject<HTMLElement | null>;
  simplified?: boolean;
  enablePointer?: boolean;
  active?: boolean;
};

export default function HeroCanvas({
  progressRef,
  containerRef,
  simplified = false,
  enablePointer = true,
  active = true,
}: HeroCanvasProps) {
  const [inView, setInView] = useState(true);
  const pointerRef: PointerRef = useRef({ x: 0, y: 0 });
  const frameloop = active && inView ? "always" : "never";

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(Boolean(entry?.isIntersecting));
      },
      { threshold: 0.05 },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [containerRef]);

  useEffect(() => {
    if (!enablePointer || !active) {
      pointerRef.current = { x: 0, y: 0 };
      return;
    }

    const onMove = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = (event.clientY / window.innerHeight) * 2 - 1;
      pointerRef.current = { x, y: -y };
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      pointerRef.current = { x: 0, y: 0 };
    };
  }, [active, enablePointer]);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden>
      <Canvas
        dpr={simplified ? [1, 1.25] : [1, 1.6]}
        frameloop={frameloop}
        gl={{
          antialias: !simplified,
          alpha: true,
          premultipliedAlpha: true,
          powerPreference: "high-performance",
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
        camera={{ position: [0.15, 0.15, 7.2], fov: 42, near: 0.1, far: 40 }}
        style={{ width: "100%", height: "100%", background: "transparent" }}
      >
        <HeroScene
          progressRef={progressRef}
          pointerRef={pointerRef}
          simplified={simplified}
        />
      </Canvas>
    </div>
  );
}

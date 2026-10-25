import type { RefObject } from "react";

export type ScrollProgressRef = RefObject<number>;
export type PointerRef = RefObject<{ x: number; y: number }>;

export function clamp01(value: number): number {
  if (value < 0) return 0;
  if (value > 1) return 1;
  return value;
}

export function cameraTargetsFromProgress(progress: number): {
  position: [number, number, number];
  lookAt: [number, number, number];
} {
  const t = clamp01(progress);

  return {
    position: [0 + t * 0.12, 0.02 + t * 0.04, 7.2 + t * 0.45],
    lookAt: [0, 0 - t * 0.2, -0.35 - t * 0.9],
  };
}

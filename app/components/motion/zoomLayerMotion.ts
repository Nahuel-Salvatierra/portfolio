export type ZoomLayerMotion = {
  scale: number;
  opacity: number;
  zIndex: number;
  interactive: boolean;
};

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function clamp01(value: number): number {
  if (value < 0) return 0;
  if (value > 1) return 1;
  return value;
}

function smoothstep(t: number): number {
  const x = clamp01(t);
  return x * x * (3 - 2 * x);
}

/** Soft zoom while the section is the clear focus. */
const SCALE_HOLD_START = 1;
const SCALE_HOLD_END = 1.16;

/** Big push past the lens during handoff. */
const SCALE_EXIT = 1.78;
const SCALE_ENTER = 0.55;
const OPACITY_ENTER = 0.08;

/** Share of each section slot before the handoff starts. */
export const HOLD_RATIO = 0.7;

const EXITED: ZoomLayerMotion = {
  scale: SCALE_EXIT,
  opacity: 0,
  zIndex: 1,
  interactive: false,
};

const WAITING: ZoomLayerMotion = {
  scale: SCALE_ENTER,
  opacity: 0,
  zIndex: 2,
  interactive: false,
};

function holdProgress(local: number, holdEnd: number): number {
  if (holdEnd <= 0) return 1;
  return clamp01(local / holdEnd);
}

/**
 * progress 0..1 is split into `count` equal slots.
 * Hold: continuous soft zoom (always reacts to the wheel).
 * Transition: continues that zoom into exit + next layer rises from behind.
 */
export function zoomLayerMotion(
  progress: number,
  index: number,
  count: number,
): ZoomLayerMotion {
  if (count <= 1) {
    return { scale: 1, opacity: 1, zIndex: 10, interactive: true };
  }

  const p = clamp01(progress);
  const raw = p * count;
  const segmentIndex = Math.min(Math.floor(raw), count - 1);
  const local = raw - segmentIndex;
  const isLast = segmentIndex === count - 1;
  const holdEnd = isLast ? 1 : HOLD_RATIO;

  if (local <= holdEnd) {
    const holdT = holdProgress(local, holdEnd);

    if (index === segmentIndex) {
      return {
        scale: lerp(SCALE_HOLD_START, SCALE_HOLD_END, holdT),
        opacity: 1,
        zIndex: 50,
        interactive: true,
      };
    }

    if (index < segmentIndex) return EXITED;
    return { ...WAITING, zIndex: Math.max(2, count - index) };
  }

  const rawU = (local - holdEnd) / Math.max(1 - holdEnd, 0.0001);
  const u = smoothstep(rawU);
  const exitOpacity = 1 - smoothstep(Math.min(rawU * 1.15, 1));

  if (index === segmentIndex) {
    return {
      scale: lerp(SCALE_HOLD_END, SCALE_EXIT, u),
      opacity: exitOpacity,
      zIndex: 80,
      interactive: false,
    };
  }

  if (index === segmentIndex + 1) {
    return {
      scale: lerp(SCALE_ENTER, SCALE_HOLD_START, u),
      opacity: lerp(OPACITY_ENTER, 1, u),
      zIndex: 40,
      interactive: u > 0.96,
    };
  }

  if (index < segmentIndex) return EXITED;
  return { ...WAITING, zIndex: Math.max(2, count - index) };
}

export function activeZoomLayerIndex(progress: number, count: number): number {
  if (count <= 1) return 0;
  const p = clamp01(progress);
  const raw = p * count;
  const segmentIndex = Math.min(Math.floor(raw), count - 1);
  const local = raw - segmentIndex;
  const isLast = segmentIndex === count - 1;
  const holdEnd = isLast ? 1 : HOLD_RATIO;

  if (local <= holdEnd || isLast) return segmentIndex;

  const u = (local - holdEnd) / Math.max(1 - holdEnd, 0.0001);
  return u < 0.5 ? segmentIndex : Math.min(segmentIndex + 1, count - 1);
}

/** Maps global zoom progress onto the Home layer as 0..1 for the hero. */
export function heroSegmentProgress(progress: number, count: number): number {
  if (count <= 0) return 0;
  return clamp01(progress * count);
}

"use client";

import { AnimatePresence, motion } from "framer-motion";

type ProjectMeltTransitionProps = {
  active: boolean;
  onComplete?: () => void;
};

export function ProjectMeltTransition({
  active,
  onComplete,
}: ProjectMeltTransitionProps) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="melt"
          className="fixed inset-0 z-[95] pointer-events-none melt-layer"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onAnimationEnd={onComplete}
          style={{
            background:
              "linear-gradient(180deg, rgba(22,8,31,0.96) 0%, rgba(0,0,0,0.94) 40%, rgba(0,0,0,0.2) 100%), radial-gradient(ellipse at 35% 0%, rgba(185,43,255,0.45), transparent 50%), radial-gradient(ellipse at 70% 15%, rgba(140,30,255,0.25), transparent 45%)",
          }}
        >
          <div
            className="absolute inset-x-0 bottom-0 h-1/2 opacity-60"
            style={{
              background:
                "repeating-linear-gradient(90deg, transparent 0 18px, rgba(185,43,255,0.14) 18px 22px)",
              maskImage:
                "linear-gradient(to bottom, transparent, black 30%, black)",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

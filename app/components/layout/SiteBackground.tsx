"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

const BG_SRC = "/portfolio/bg-tech-plexus.jpg";

type SiteBackgroundProps = {
  progress: MotionValue<number>;
};

export function SiteBackground({ progress }: SiteBackgroundProps) {
  const farY = useTransform(progress, [0, 1], ["0%", "-3.2%"]);
  const nearY = useTransform(progress, [0, 1], ["0%", "-1.4%"]);
  const farScale = useTransform(progress, [0, 1], [1.18, 1.24]);
  const nearScale = useTransform(progress, [0, 1], [1.1, 1.15]);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <motion.div
        className="absolute inset-[-18%] will-change-transform"
        style={{ y: farY, scale: farScale }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-75 blur-[16px] scale-110"
          style={{ backgroundImage: `url(${BG_SRC})` }}
        />
      </motion.div>

      <motion.div
        className="absolute inset-[-12%] will-change-transform"
        style={{ y: nearY, scale: nearScale }}
      >
        <div
          className="absolute inset-0 scale-105 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${BG_SRC})` }}
        />
      </motion.div>

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 75% 65% at 50% 40%, transparent 35%, rgba(15, 23, 42, 0.18) 100%), linear-gradient(180deg, rgba(232, 238, 245, 0.25) 0%, rgba(226, 232, 240, 0.45) 100%)",
        }}
      />
    </div>
  );
}

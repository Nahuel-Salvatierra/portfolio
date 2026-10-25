"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const PROMO_CARDS = [
  {
    title: "MCP",
    body: "Conectá tus herramientas y datos a la IA",
  },
  {
    title: "RAG agents",
    body: "Agentes que responden con tu propia información",
  },
  {
    title: "Automatizaciones",
    body: "Procesos rutinarios, sin fricción manual",
  },
] as const;

const CYCLE_MS = 3800;
const FADE_MS = 0.45;

export default function AiPromoCards() {
  const [index, setIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [cycleKey, setCycleKey] = useState(0);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % PROMO_CARDS.length);
      setCycleKey((key) => key + 1);
    }, CYCLE_MS);
    return () => window.clearInterval(id);
  }, []);

  const card = PROMO_CARDS[index];

  return (
    <div className="relative w-full max-w-sm md:w-[22rem]">
      <div className="relative min-h-[10.5rem] overflow-hidden rounded-md px-6 py-7 md:min-h-[11.5rem] md:px-7 md:py-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={card.title}
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reducedMotion ? undefined : { opacity: 0 }}
            transition={{
              duration: reducedMotion ? 0 : FADE_MS,
              ease: "easeInOut",
            }}
            className="absolute inset-x-6 top-7 z-10 md:inset-x-7 md:top-8"
          >
            <h3 className="font-display text-2xl font-bold leading-tight text-[color:var(--neon)] md:text-3xl lg:text-[2.1rem]">
              {card.title}
            </h3>
            <p className="mt-3 text-base font-medium leading-snug text-[#1e293b] md:text-lg">
              {card.body}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-[color:var(--border)]">
          <motion.div
            key={cycleKey}
            className="h-full origin-left bg-[color:var(--neon)]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration: reducedMotion ? 0 : CYCLE_MS / 1000,
              ease: "linear",
            }}
          />
        </div>
      </div>

      <div className="mt-4 flex gap-2" aria-hidden>
        {PROMO_CARDS.map((item, i) => (
          <span
            key={item.title}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === index
                ? "w-7 bg-[color:var(--neon)]"
                : "w-1.5 bg-[color:var(--border)]"
              }`}
          />
        ))}
      </div>
    </div>
  );
}

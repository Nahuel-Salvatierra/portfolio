"use client";

import { BsLinkedin } from "react-icons/bs";
import { FaGithubSquare } from "react-icons/fa";
import { motion, useTransform, type MotionValue } from "framer-motion";

export type IntroProps = {
  homeProgress: MotionValue<number>;
};

export default function Intro({ homeProgress }: IntroProps) {
  const titleOpacity = useTransform(homeProgress, [0, 0.45, 0.9], [1, 1, 0.25]);
  const titleY = useTransform(homeProgress, [0, 1], [0, -36]);
  const rowOpacity = useTransform(
    homeProgress,
    [0, 0.12, 0.55, 0.95],
    [0.9, 1, 0.95, 0.2],
  );
  const rowY = useTransform(homeProgress, [0, 1], [8, -24]);

  const onHover = "hover:scale-105 transition-transform duration-300";

  return (
    <section
      id="home"
      className="relative flex h-full min-h-full w-full items-center bg-transparent"
    >
      <div className="relative z-10 container mx-auto w-full px-12 py-28 pointer-events-none sm:px-10 sm:py-20 md:px-20 md:py-32 lg:px-28 xl:px-40 2xl:px-56">
        <div className="max-w-xl pointer-events-auto">
          <motion.h1
            className="home-edge-blur font-display text-4xl md:text-5xl lg:text-[3.4rem] font-bold text-[color:var(--text)] mb-6 leading-[1.08] pointer-events-none"
            style={{ opacity: titleOpacity, y: titleY }}
          >
            Ingeniero de software
            <br />
            <span className="text-[color:var(--neon)]">Full Stack</span>
          </motion.h1>
          <motion.div
            className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-4"
            style={{ opacity: rowOpacity, y: rowY }}
          >
            <div className="flex shrink-0 items-center gap-3.5">
              <a
                href="https://www.linkedin.com/in/nahu-dev/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <BsLinkedin
                  className={`home-icon-edge w-[2.4rem] h-[2.4rem] text-[color:var(--text-muted)] hover:text-[color:var(--magenta)] ${onHover}`}
                />
              </a>
              <a
                href="https://github.com/Nahuel-Salvatierra"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <FaGithubSquare
                  className={`home-icon-edge w-[2.7rem] h-[2.7rem] text-[color:var(--text-muted)] hover:text-[color:var(--magenta)] ${onHover}`}
                />
              </a>
            </div>
            <p className="max-w-[16.5rem] font-mono-tech text-[0.72rem] uppercase tracking-[0.14em] text-[color:var(--text)] leading-relaxed pointer-events-none sm:max-w-none sm:text-[0.84rem] sm:tracking-[0.22em]">
              <span className="box-decoration-clone rounded-sm bg-[color:var(--bg)] px-1.5 py-[0.2em] shadow-[0_0_0_1px_rgba(15,23,42,0.04)]">
                Soluciones de software modernas, escalables y a medida.
              </span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

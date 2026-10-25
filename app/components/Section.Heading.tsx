import type { ReactNode } from "react";

export default function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <div className="pb-10 text-center">
      <p className="font-mono-tech text-[0.7rem] uppercase tracking-[0.28em] text-[color:var(--neon)] mb-3">
        // section
      </p>
      <h2 className="font-display text-3xl md:text-4xl font-bold capitalize text-[color:var(--text)] tracking-tight">
        {children}
      </h2>
    </div>
  );
}

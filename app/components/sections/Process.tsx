"use client";

import { processSteps } from "@/app/lib/constants";

export default function Process() {
  return (
    <section className="relative flex h-full min-h-full w-full items-center bg-transparent">
      <div className="relative z-10 mx-auto w-full max-w-[1180px] px-12 py-16 sm:px-10 sm:py-16 md:px-12 md:py-20 lg:px-16">
        <p className="font-mono-tech text-[0.65rem] uppercase tracking-[0.22em] text-[color:var(--neon)] mb-2">
          Método
        </p>
        <h2 className="font-display max-w-xl text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-bold leading-tight text-[color:var(--text)]">
          Cómo trabajo
        </h2>
        <p className="mt-2 max-w-lg text-sm text-[color:var(--text-muted)] leading-snug sm:mt-3 sm:text-base sm:leading-relaxed">
          Un recorrido claro de punta a punta, con entregables visibles en cada
          etapa.
        </p>

        <ol className="mt-6 grid grid-cols-2 gap-x-5 gap-y-5 sm:mt-10 sm:gap-8 lg:mt-12 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <li key={step.id} className="relative min-w-0">
              <span className="font-mono-tech text-[0.65rem] uppercase tracking-[0.18em] text-[color:var(--neon)] sm:text-[0.7rem] sm:tracking-[0.2em]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-1.5 font-display text-base font-bold text-[color:var(--text)] sm:mt-3 sm:text-xl">
                {step.title}
              </h3>
              <p className="mt-1 text-xs text-[color:var(--text-muted)] leading-snug sm:mt-2 sm:text-sm sm:leading-relaxed">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

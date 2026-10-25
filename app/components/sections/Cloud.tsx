"use client";

import { cloudHighlights } from "@/app/lib/constants";

type CloudProps = {
  onConsult?: () => void;
};

export default function Cloud({ onConsult }: CloudProps) {
  return (
    <section className="relative flex h-full min-h-full w-full items-center justify-center bg-transparent">
      <div className="relative z-10 mx-auto w-full max-w-xl px-12 py-28 sm:px-8 sm:py-12">
        <p className="font-mono-tech text-[0.65rem] uppercase tracking-[0.22em] text-[color:var(--neon)] mb-2">
          Infraestructura
        </p>
        <h2 className="font-display text-2xl md:text-3xl font-bold leading-tight text-[color:var(--text)]">
          Nube, seguridad y performance
        </h2>
        <p className="mt-2 text-sm text-[color:var(--text-muted)] leading-relaxed">
          AWS y prácticas de nube para datos confiables, rápidos y eficientes en
          costo.
        </p>

        <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4">
          {cloudHighlights.map((item) => (
            <li key={item.id}>
              <h3 className="font-display text-sm font-bold text-[color:var(--text)]">
                {item.title}
              </h3>
              <p className="mt-1 text-xs text-[color:var(--text-muted)] leading-snug">
                {item.description}
              </p>
            </li>
          ))}
        </ul>

        {onConsult ? (
          <button
            type="button"
            onClick={onConsult}
            className="btn-primary-3d mt-7 inline-flex items-center justify-center text-sm"
          >
            Consultá tu caso
          </button>
        ) : (
          <a
            href="#contact"
            className="btn-primary-3d mt-7 inline-flex items-center justify-center text-sm"
          >
            Consultá tu caso
          </a>
        )}
      </div>
    </section>
  );
}

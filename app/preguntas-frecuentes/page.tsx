import type { Metadata } from "next";
import Link from "next/link";

import { AEO_FAQS, buildFaqJsonLd } from "@/app/lib/aeo";

export const metadata: Metadata = {
  title: "Preguntas frecuentes",
  description:
    "Quién es Nahuel Salvatierra, qué hace como Full Stack Engineer, cómo contactarlo y qué proyectos y stack muestra este portfolio.",
  alternates: { canonical: "/preguntas-frecuentes" },
  openGraph: {
    title: "Preguntas frecuentes",
    description:
      "Respuestas directas sobre Nahuel Salvatierra, su trabajo Full Stack y este portfolio.",
    locale: "es_AR",
  },
};

export default function PreguntasFrecuentesPage() {
  const jsonLd = buildFaqJsonLd();

  return (
    <main className="relative mx-auto w-full max-w-3xl px-6 py-16 sm:px-8 sm:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <p className="font-mono-tech text-[0.65rem] uppercase tracking-[0.22em] text-[color:var(--neon)]">
        Portfolio
      </p>
      <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-[color:var(--text)] md:text-4xl">
        Preguntas frecuentes
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-[color:var(--text-muted)]">
        Respuestas cortas sobre quién soy, qué construyo y cómo contactarme.
      </p>
      <p className="mt-3 text-sm">
        <Link
          href="/"
          className="text-[color:var(--magenta)] underline decoration-[color:var(--border)] underline-offset-4 hover:decoration-[color:var(--magenta)]"
        >
          Volver al inicio
        </Link>
      </p>
      <div className="mt-10 space-y-8">
        {AEO_FAQS.map((item) => (
          <article key={item.id} id={item.id} className="scroll-mt-20">
            <h2 className="font-display text-base font-semibold text-[color:var(--text)]">
              {item.question}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[color:var(--text-muted)]">
              {item.answer}
            </p>
          </article>
        ))}
      </div>
    </main>
  );
}

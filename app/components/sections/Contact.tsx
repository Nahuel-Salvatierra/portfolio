"use client";

import { useState } from "react";
import { BsLinkedin } from "react-icons/bs";
import { HiMail } from "react-icons/hi";
import ContactModal from "../generics/ContactModal";

export default function Contact() {
  const [open, setOpen] = useState(false);

  return (
    <section className="relative flex h-full min-h-full w-full items-center bg-transparent">
      <ContactModal open={open} toggleOpenClose={() => setOpen((value) => !value)} />
      <div className="relative z-10 mx-auto w-full max-w-[720px] px-12 py-28 text-center sm:px-10 sm:py-16">
        <p className="font-mono-tech text-[0.65rem] uppercase tracking-[0.22em] text-[color:var(--neon)] mb-3">
          Contacto
        </p>
        <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-tight text-[color:var(--text)]">
          Hablemos de tu próximo proyecto
        </h2>
        <p className="mx-auto mt-4 max-w-md text-[color:var(--text-muted)] leading-relaxed">
          Contame qué necesitás construir o mejorar. Respondo con una propuesta
          clara.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="btn-primary-3d inline-flex items-center justify-center text-sm md:text-base"
          >
            Escribime
          </button>
          <a
            href="mailto:salvatierra.nahuel@gmail.com?subject=Consulta%20portfolio"
            className="inline-flex items-center gap-2 text-sm text-[color:var(--text-muted)] hover:text-[color:var(--magenta)]"
          >
            <HiMail className="h-5 w-5" />
            Email
          </a>
          <a
            href="https://www.linkedin.com/in/nahu-dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-[color:var(--text-muted)] hover:text-[color:var(--magenta)]"
          >
            <BsLinkedin className="h-5 w-5" />
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import type { ProjectItem } from "@/app/lib/constants";

type ProjectZoomLayerProps = ProjectItem & {
  index: number;
};

export function ProjectZoomLayer({
  title,
  summary,
  imageUrl,
  link,
  github,
  index,
}: ProjectZoomLayerProps) {
  return (
    <div className="relative flex h-full min-h-full w-full items-center overflow-hidden bg-transparent">
      <div className="relative mx-auto flex h-full w-full max-w-[960px] flex-col justify-center gap-3 px-12 py-24 sm:px-8 sm:py-10 md:grid md:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] md:items-center md:gap-3 md:px-8 md:py-8 lg:gap-4 lg:px-10">
        <div className="relative z-10 max-w-[17rem] md:justify-self-end md:pr-1">
          <h2 className="font-display text-2xl md:text-3xl lg:text-[2.1rem] font-bold text-[color:var(--text)] leading-tight">
            {title}
          </h2>
          <p className="mt-3 max-w-[15rem] text-sm md:text-[0.95rem] text-[color:var(--text-muted)] leading-relaxed">
            {summary}
          </p>
          <div className="mt-5 flex flex-wrap gap-4">
            {github ? (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[color:var(--text-muted)] hover:text-[color:var(--magenta)]"
              >
                <FaGithub className="h-5 w-5" /> Code
              </a>
            ) : null}
            {link ? (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[color:var(--text-muted)] hover:text-[color:var(--magenta)]"
              >
                <FaExternalLinkAlt className="h-4 w-4" /> Ir al sitio
              </a>
            ) : null}
          </div>
        </div>

        <div className="relative mx-auto h-[36vh] w-full max-w-[640px] min-h-[200px] sm:h-[44vh] md:mx-0 md:h-[58vh] md:max-w-none md:min-h-[320px] md:justify-self-start">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-contain object-center drop-shadow-[0_24px_60px_rgba(15,23,42,0.18)] md:object-left"
            sizes="(max-width: 768px) 100vw, 60vw"
            priority={index === 0}
          />
        </div>
      </div>
    </div>
  );
}

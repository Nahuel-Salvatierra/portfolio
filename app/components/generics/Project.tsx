"use client";

import Image from "next/image";
import { FaExternalLinkAlt, FaGithub, FaPlay } from "react-icons/fa";
import type { ProjectItem } from "@/app/lib/constants";

export type ProjectCardProps = ProjectItem & {
  priority?: boolean;
  onOpen: () => void;
};

export default function Project({
  title,
  summary,
  tags,
  imageUrl,
  videoUrl,
  link,
  github,
  priority = false,
  onOpen,
}: ProjectCardProps) {
  return (
    <article
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen();
        }
      }}
      className="group relative mb-4 sm:mb-8 last:mb-0 w-full max-w-[52rem] mx-auto origin-center text-left cursor-pointer"
    >
      <div className="holo-card relative overflow-hidden rounded-sm transition-all duration-400">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[color:var(--neon)]/50 to-transparent opacity-40 group-hover:opacity-100 transition-opacity" />

        <div className="flex flex-col md:flex-row">
          <div className="p-6 md:w-[42%] flex flex-col justify-between z-10">
            <div>
              <p className="font-mono-tech text-[0.65rem] uppercase tracking-[0.2em] text-[color:var(--text-muted)] mb-2">
                Case study
              </p>
              <h3 className="font-display text-2xl font-bold text-[color:var(--text)] group-hover:text-[color:var(--magenta)] transition-colors">
                {title}
              </h3>
              <p className="mt-4 leading-relaxed text-[color:var(--text-muted)] text-sm">
                {summary}
              </p>
              <div
                className="flex gap-4 mt-6"
                onClick={(e) => e.stopPropagation()}
              >
                {github && (
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium text-[color:var(--text-muted)] hover:text-[color:var(--magenta)] transition-colors"
                  >
                    <FaGithub className="w-5 h-5" /> Code
                  </a>
                )}
                {link && (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium text-[color:var(--text-muted)] hover:text-[color:var(--magenta)] transition-colors"
                  >
                    <FaExternalLinkAlt className="w-4 h-4" /> Ir al sitio
                  </a>
                )}
              </div>
            </div>

            <ul className="flex flex-wrap gap-2 mt-6">
              {tags.map((tag) => (
                <li
                  className="px-2.5 py-1 text-[0.65rem] font-mono-tech uppercase tracking-wider text-[color:var(--neon)] border border-[color:var(--border)] rounded-sm"
                  key={tag}
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>

          <div className="md:w-[58%] relative bg-[color:var(--bg-elevated)] aspect-video md:aspect-auto overflow-hidden min-h-[13rem]">
            <Image
              src={imageUrl}
              alt={title}
              width={640}
              height={360}
              priority={priority}
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-500"
            />
            {videoUrl && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="p-3 bg-black/60 text-[color:var(--neon)] rounded-sm border border-[color:var(--neon)]/30">
                  <FaPlay size={18} />
                </div>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--bg)]/40 via-transparent to-transparent md:block hidden pointer-events-none" />
          </div>
        </div>
      </div>
    </article>
  );
}

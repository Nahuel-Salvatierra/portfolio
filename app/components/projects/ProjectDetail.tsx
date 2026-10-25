"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FaExternalLinkAlt, FaGithub, FaTimes } from "react-icons/fa";
import type { ProjectItem } from "@/app/lib/constants";
import { PerspectiveVideoFrame } from "./PerspectiveVideoFrame";

type ProjectDetailProps = {
  project: ProjectItem | null;
  open: boolean;
  onClose: () => void;
};

export function ProjectDetail({ project, open, onClose }: ProjectDetailProps) {
  return (
    <AnimatePresence>
      {open && project && (
        <motion.div
          key={project.id}
          className="fixed inset-0 z-[90] overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div
            className="absolute inset-0 bg-[color:var(--bg)]/94 backdrop-blur-md"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={`project-title-${project.id}`}
            className="relative z-10 min-h-full flex items-start justify-center px-4 py-20 md:py-24"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ duration: 0.45, delay: 0.12 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="holo-card w-full max-w-5xl rounded-sm p-5 md:p-10">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <p className="font-mono-tech text-[0.65rem] uppercase tracking-[0.22em] text-[color:var(--neon)] mb-2">
                    Selected work
                  </p>
                  <h3
                    id={`project-title-${project.id}`}
                    className="font-display text-3xl md:text-4xl font-bold text-[color:var(--text)]"
                  >
                    {project.title}
                  </h3>
                  <ul className="flex flex-wrap gap-2 mt-4">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="px-2.5 py-1 text-[0.65rem] font-mono-tech uppercase tracking-wider text-[color:var(--neon)] border border-[color:var(--border)] rounded-sm"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Cerrar proyecto"
                  className="p-2 rounded-sm text-[color:var(--text-muted)] hover:text-[color:var(--magenta)] border border-transparent hover:border-[color:var(--border)] transition-colors"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>

              <PerspectiveVideoFrame
                title={project.title}
                imageUrl={project.imageUrl}
                videoUrl={project.videoUrl}
                captionsUrl={project.captionsUrl}
                active={open}
              />

              <p className="mt-8 text-base md:text-lg leading-relaxed text-[color:var(--text-muted)]">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-4 mt-8">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium text-[color:var(--text)] hover:text-[color:var(--magenta)] transition-colors"
                  >
                    <FaGithub className="w-5 h-5" /> Code
                  </a>
                )}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium text-[color:var(--text)] hover:text-[color:var(--magenta)] transition-colors"
                  >
                    <FaExternalLinkAlt className="w-4 h-4" /> Ir al sitio
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

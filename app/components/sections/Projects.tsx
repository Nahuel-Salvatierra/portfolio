"use client";

import { useCallback, useEffect, useState } from "react";
import SectionHeading from "../Section.Heading";
import { projectsData, type ProjectItem } from "../../lib/constants";
import Project from "../generics/Project";
import { ProjectDetail } from "../projects/ProjectDetail";
import { ProjectMeltTransition } from "../projects/ProjectMeltTransition";
import { SectionReveal } from "../motion/SectionReveal";
import { SectionName, useSectionInView } from "../../context/useSectionInView";

export default function Projects() {
  const { ref } = useSectionInView(SectionName.Projects, 0.25);
  const [selected, setSelected] = useState<ProjectItem | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [melting, setMelting] = useState(false);

  const openProject = useCallback((project: ProjectItem) => {
    setSelected(project);
    setDetailOpen(true);
    setMelting(true);
  }, []);

  const closeProject = useCallback(() => {
    setDetailOpen(false);
    setMelting(false);
    setSelected(null);
  }, []);

  useEffect(() => {
    if (!detailOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeProject();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [detailOpen, closeProject]);

  useEffect(() => {
    if (!melting) return;
    const timeout = window.setTimeout(() => setMelting(false), 1100);
    return () => window.clearTimeout(timeout);
  }, [melting]);

  return (
    <>
      <div
        ref={ref as React.RefObject<HTMLDivElement | null>}
        className="pb-10 flex justify-center flex-col"
      >
        <SectionReveal>
          <SectionHeading>Mis Proyectos</SectionHeading>
        </SectionReveal>
        <div className="grid grid-cols-1 gap-4 overflow-visible px-4">
          {projectsData.map((project, index) => (
            <SectionReveal key={project.id}>
              <Project
                {...project}
                priority={index === 0}
                onOpen={() => openProject(project)}
              />
            </SectionReveal>
          ))}
        </div>
      </div>

      <ProjectDetail
        project={selected}
        open={detailOpen}
        onClose={closeProject}
      />
      <ProjectMeltTransition active={melting} />
    </>
  );
}

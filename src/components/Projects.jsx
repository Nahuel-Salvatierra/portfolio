
import React from "react";
import SectionHeading from "./Section.Heading";
import { projectsData } from "./../lib/data";
import Project from './Project'
import { useSectionInView } from "./../lib/hooks";

export default function Projects() {
  const { ref } = useSectionInView("Projects", 0.5);

  return (
    <section ref={ref} id="projects" className="scroll-mt-28 mb-28 py-4 flex justify-center flex-col">
      <SectionHeading>Mis Projectos</SectionHeading>
      <div className="flex flex-wrap justify-center flex-col items-center">
        {projectsData.map((project, index) => (
          <React.Fragment key={index}>
            <Project {...project} />
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}

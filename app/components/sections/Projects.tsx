"use client";

import React from "react";
import SectionHeading from "../Section.Heading";
import { projectsData } from "../../lib/constants";
import Project from "../generics/Project";
import { motion } from "framer-motion";

export default function Projects() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      id="projects"
      className="scroll-mt-28 pb-10 py-4 flex justify-center flex-col"
    >
      <SectionHeading>Mis Proyectos</SectionHeading>
      <div className="flex flex-wrap justify-center flex-col items-center overflow-visible">
        {projectsData.map((project, index) => (
          <React.Fragment key={index}>
            <Project {...project} />
          </React.Fragment>
        ))}
      </div>
    </motion.section>
  );
}

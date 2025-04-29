import React from "react";
import SectionHeading from "./Section.Heading";
import { projectsData } from "./../lib/data";
import Project from "./Project";
import { useSectionInView } from "./../lib/hooks";
import { motion } from "framer-motion";

export default function Projects() {
	const { ref } = useSectionInView("Projects", 0.5);

	return (
		<motion.section
			initial={{ opacity: 0, y: 50 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
			viewport={{ once: true }}
			ref={ref}
			id="projects"
			className="scroll-mt-28 mb-28 py-4 flex justify-center flex-col"
		>
			<SectionHeading>Mis Proyectos</SectionHeading>
			<div className="flex flex-wrap justify-center flex-col items-center">
				{projectsData.map((project, index) => (
					<React.Fragment key={index}>
						<Project {...project} />
					</React.Fragment>
				))}
			</div>
		</motion.section>
	);
}

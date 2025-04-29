import React from "react";
import SectionHeading from "./Section.Heading";
import { skillsData } from "./../lib/data";
import { useSectionInView } from "./../lib/hooks";
import { motion } from "framer-motion";
export default function Skills() {
	const { ref } = useSectionInView("Skills");

	return (
		<motion.section
			id="skills"
			ref={ref}
			className="mb-10 px-2 scroll-mt-28 text-center 2xl:px-[10rem] sm:px-10 sm:mb-24 md:px-20 flex w-full flex-col"
			initial={{ opacity: 0, y: 50 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
			viewport={{ once: true }}
		>
			<SectionHeading className="">Stack Tecnológico</SectionHeading>
			<ul className="flex flex-wrap justify-center gap-2 text-lg text-gray-800 lg:px-36 xl:px-56 2xl:px-96">
				{skillsData.map((skill, index) => (
					<li
						className="bg-white borderBlack rounded-xl px-5 py-3 dark:bg-white/10 dark:text-white/80"
						key={index}
						custom={index}
					>
						{skill}
					</li>
				))}
			</ul>
		</motion.section>
	);
}

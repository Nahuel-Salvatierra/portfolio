import SectionHeading from "./Section.Heading";
import { skillsData } from "./../lib/data";
import { useSectionInView } from "./../lib/hooks";
import { motion } from "framer-motion";
import { useMemo } from "react";

export default function Skills() {
	const { ref } = useSectionInView("Skills");

	const skillsPairsAndOdds = useMemo(
		() =>
			skillsData.reduce(
				(acc, skill, index) => {
					if (index % 2 === 0) {
						acc.pair.push(skill);
					} else {
						acc.odds.push(skill);
					}
					return acc;
				},
				{ pair: [], odds: [] }
			),
		[]
	);

	return (
		<motion.section
			id="skills"
			ref={ref}
			className="pb-10 px-2 scroll-mt-28 text-center 2xl:px-[10rem] sm:px-10 sm:pb-24 md:px-20 flex w-full flex-col"
			initial={{ opacity: 0, y: 50 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
			viewport={{ once: true }}
		>
			<SectionHeading className="">Stack Tecnológico</SectionHeading>
			<div className="skills-container space-y-4 w-full overflow-hidden">
				<div className="skills-wrapper flex w-max animate-scroll">
					{skillsPairsAndOdds.pair.map((skill, index) => (
						<div
							className="bg-white borderBlack rounded-xl px-5 py-3 dark:bg-white/10  text-lg text-gray-800 dark:text-white/80 mx-2 whitespace-nowrap"
							key={index}
						>
							{skill}
						</div>
					))}
					{skillsPairsAndOdds.odds.map((skill, index) => (
						<div
							className="bg-white borderBlack rounded-xl px-5 py-3 dark:bg-white/10 text-lg text-gray-800 dark:text-white/80 mx-2 whitespace-nowrap"
							key={`duplicate-${index}`}
						>
							{skill}
						</div>
					))}
				</div>
				<div className="skills-wrapper flex w-max animate-scroll-reverse">
					{skillsPairsAndOdds.odds.map((skill, index) => (
						<div
							className="bg-white borderBlack rounded-xl px-5 py-3 dark:bg-white/10 text-lg text-gray-800 dark:text-white/80 mx-2 whitespace-nowrap"
							key={`duplicate-${index}`}
						>
							{skill}
						</div>
					))}
					{skillsPairsAndOdds.pair.map((skill, index) => (
						<div
							className="bg-white borderBlack rounded-xl px-5 py-3 dark:bg-white/10 text-lg text-gray-800 dark:text-white/80 mx-2 whitespace-nowrap"
							key={`duplicate-${index}`}
						>
							{skill}
						</div>
					))}
				</div>
			</div>
		</motion.section>
	);
}

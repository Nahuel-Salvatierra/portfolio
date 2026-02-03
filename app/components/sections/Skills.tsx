"use client";

import SectionHeading from "../Section.Heading";
import { skillsData } from "../../lib/constants";
import { motion } from "framer-motion";
import { useMemo } from "react";
import { NeonText } from "../generics/Neon";

export default function Skills() {
  const skillsPairsAndOdds = useMemo(
    () =>
      skillsData.reduce(
        (acc, skill, index) => {
          if (index % 2 === 0) {
            acc.pair.push(skill as never);
          } else {
            acc.odds.push(skill as never);
          }
          return acc;
        },
        { pair: [], odds: [] },
      ),
    [],
  );


  const className = "bg-white borderBlack hover:scale-120 transition-transform duration-300 rounded-xl px-5 py-3 dark:bg-white/10 text-lg text-gray-800 dark:text-white/80 mx-2 whitespace-nowrap";

  return (
    <motion.section
      id="skills"
      className="pb-10 px-2 scroll-mt-28 text-center 2xl:px-[10rem] sm:px-10 sm:pb-24 md:px-20 flex w-full flex-col"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <SectionHeading>Stack Tecnológico</SectionHeading>
      <div className="skills-container space-y-4 w-full overflow-hidden">
        <div className="skills-wrapper flex w-max animate-scroll">
          {skillsPairsAndOdds.pair.map((skill, index) => (
            <div
              className={className}
              key={index}
            >
              <NeonText>{skill}</NeonText>
            </div>
          ))}
          {skillsPairsAndOdds.odds.map((skill, index) => (
            <div
              className={className}
              key={`duplicate-${index}`}
            >
              <NeonText>{skill}</NeonText>
            </div>
          ))}
        </div>
        <div className="skills-wrapper flex w-max animate-scroll-reverse">
          {skillsPairsAndOdds.odds.map((skill, index) => (
            <div
              className={className}
              key={`duplicate-${index}`}
            >
              <NeonText>{skill}</NeonText>
            </div>
          ))}
          {skillsPairsAndOdds.pair.map((skill, index) => (
            <div
              className={className}
              key={`duplicate-${index}`}
            >
              <NeonText>{skill}</NeonText>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

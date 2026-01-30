"use client";

import { inView, motion, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

export enum SectionName {
  Home = "home",
  Projects = "projects",
  Skills = "skills",
  About = "about",
}

export default function useSectionInView() {
  const ref = useRef(null);
  const isInView = useInView(ref, {});

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    ></motion.div>
  );

  return {
    ref,
  };
}

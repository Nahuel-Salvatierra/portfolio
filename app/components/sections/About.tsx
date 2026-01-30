"use client";

import SectionHeading from "../Section.Heading";
import { motion } from "framer-motion";

export default function About() {
  return (
    <motion.section
      className="px-4 pb-10 lg:px-32 xl:px-80 text-center 2xl:px-[30rem] sm:px-10  md:px-20 leading-8 sm:pb-20 scroll-mt-28 flex flex-wrap justify-center flex-col items-center"
      id="about"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <SectionHeading>Sobre Mí</SectionHeading>
      <div className="text-white text-left text-2xl">
        <p>
          Como desarrollador profesional, llevo 2 años trabajando en el mundo de
          la programación, aplicando mis conocimientos y habilidades para crear
          soluciones de software efectivas. Anteriormente, tuve 6 años de
          experiencia en producción y ventas, lo que me permitió desarrollar una
          perspectiva única y habilidades transferibles. Ahora, combino todos
          estos saberes en mi carrera como desarrollador.
        </p>
        <br />
        <p>
          Frecuentemente me veo en la necesidad de aprender nuevas técnicas; el
          aprendizaje constante para ser independiente es esencial, aunque no
          esté explícito.
        </p>
        <br />
        <p>
          Mientras no estoy trabajando, disfruto mi tiempo hablando con amigos,
          ver a mi familia, pasar tiempo con mi pareja, leer algo nuevo, o
          empezar algún proyecto. Aunque en este momento me encuentre dedicado a
          mi carrera, son cosas que nunca dejaré de hacer.
        </p>
      </div>
    </motion.section>
  );
}

import React from "react";
import SectionHeading from "./Section.Heading";
import { useSectionInView } from "./../lib/hooks";
import { motion } from "framer-motion";
export default function About() {
	const { ref } = useSectionInView("About");

	return (
		<motion.section
			ref={ref}
			className="mb-28 px-4 lg:px-32 xl:px-80 text-center 2xl:px-[30rem] sm:px-10  md:px-20 leading-8 sm:mb-40 scroll-mt-28 flex flex-wrap justify-center flex-col items-center"
			id="about"
			initial={{ opacity: 0, y: 50 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
			viewport={{ once: true }}
		>
			<SectionHeading>Sobre Mí</SectionHeading>
			<p className="text-2xl text-left">
				Como desarrollador profesional, llevo 2 años trabajando en el
				mundo de la programación, aplicando mis conocimientos y
				habilidades para crear soluciones de software efectivas.
				Anteriormente, tuve 6 años de experiencia en producción y
				ventas, lo que me permitió desarrollar una perspectiva única y
				habilidades transferibles. Ahora, combino todos estos saberes en
				mi carrera como desarrollador.
			</p>
			<br />
			<p className="text-2xl text-left">
				Frecuentemente me veo en la necesidad de aprender nuevas
				técnicas; el aprendizaje constante para ser independiente es
				esencial, aunque no esté explícito.
			</p>
			<br />
			<p className="text-2xl text-left">
				Mientras no estoy trabajando, disfruto mi tiempo hablando con
				amigos, ver a mi familia, pasar tiempo con mi pareja, leer algo
				nuevo, o empezar algún proyecto. Aunque en este momento me
				encuentre dedicado a mi carrera, son cosas que nunca dejaré de
				hacer.
			</p>
		</motion.section>
	);
}

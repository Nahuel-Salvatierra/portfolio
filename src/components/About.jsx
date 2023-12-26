import React from "react";
import SectionHeading from "./Section.Heading";
import { useSectionInView } from "./../lib/hooks";

export default function About() {
	const { ref } = useSectionInView("About");

	return (
		<section
			ref={ref}
			className="mb-28 px-4 lg:px-32 xl:px-80 text-center 2xl:px-[30rem] sm:px-10  md:px-20 leading-8 sm:mb-40 scroll-mt-28 flex flex-wrap justify-center flex-col items-center"
			id="about"
		>
			<SectionHeading>Sobre Mí</SectionHeading>
			<p className="text-2xl text-left">
				Como emprendedor en producción y ventas tengo 6 años de
				experiencia y ahora me sumerjo en el mundo de la programación,
				combinando todos mis saberes y habilidades en una sola carrera.
				Me encuentro buscando una posición de{" "}
				<span className="font-bold">desarrollador junior</span>, para
				dedicarme a tiempo completo al desarrollo de software.
			</p>
			<br />
			<p className="text-2xl text-left">
				Frecuentemente me veo en la necesidad de aprender nuevas
				técnicas; el aprendizaje constante para ser independiente es
				esencial, aunque no esté explícito. Mantengo una{" "}
				<span className="font-bold">actitud dinámica</span> y tengo un
				gran interés en el conocimiento en general.
			</p>
			<br />
			<p className="text-2xl text-left">
				Mientras no estoy trabajando, disfruto mi tiempo hablando con
				amigos, ver a mi familia, pasar tiempo con mi pareja, leer algo
				nuevo, o empezar algún proyecto. Aunque en este momento me
				encuentre dedicado a mi carrera, son cosas que nunca dejaré de
				hacer.
			</p>
		</section>
	);
}

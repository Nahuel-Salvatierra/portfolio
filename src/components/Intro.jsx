
import React from "react";
import { Link } from "react-router-dom";
import { BsArrowRight, BsLinkedin } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";
import { FaGithubSquare } from "react-icons/fa";

import photoProfile from "./../assets/photoProfile.png";
import { useSectionInView } from "../lib/hooks";
import { useActiveSectionContext } from "../context/activeSectionProvider";

export default function Intro() {
	const { ref } = useSectionInView("Home", 0.5);
	const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();

	return (
		<section
			ref={ref}
			id="home"
			className="mb-28 px-5 sm:px-10 md:px-20 lg:px-44 xl:px-96 2xl:px-[30rem] text-center sm:mb-20 scroll-mt-[100rem] justify-center w-full"
		>
			<div className="flex items-center justify-center">
				<div className="static">
					<div>
						<img
							src={photoProfile}
							alt="Ricardo portrait"
							className="h-40 w-40 md:w-44 md:h-44 rounded-full object-cover border-[0.35rem] border-white shadow-xl"
						/>
					</div>
				</div>
			</div>

			<h1 className="mb-10 mt-4 px-4 text-2xl font-medium !leading-[1.5] sm:text-2xl">
				<span className="font-normal">NAHUEL SALVATIERRA</span>
				<br /> <span className="font-bold">Desarrollador Web</span>
				<br />
				<span className="font-normal">
					Autodidacta y audaz. Soy emprendedor innato y quiero llevar
					mi carrera a nuevos retos como
				</span>
				<span className="font-bold"> Desarrollador </span>
			</h1>
			<div className="flex flex-col sm:flex-row items-center justify-center gap-2 px-4 text-lg font-medium">
				<Link
					to="#contact"
					className="group bg-gray-900 text-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 hover:bg-gray-950 active:scale-105 transition"
					onClick={() => {
						setActiveSection("Contact");
						setTimeOfLastClick(Date.now());
					}}
				>
					Contacto{" "}
					<BsArrowRight className="opacity-70 group-hover:translate-x-1 transition" />
				</Link>
				<a
					className="group bg-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10"
					href="./Cv-Nahuel-DesarrolladorWeb.pdf"
					download='Cv-Nahuel-DesarrolladorWeb.pdf'
				>
					Descargar CV{" "}
					<HiDownload className="opacity-60 group-hover:translate-y-1 transition" />
				</a>
				<div className="flex gap-2">
					<a
						className="bg-white p-4 text-gray-700 hover:text-gray-950 flex items-center gap-2 rounded-full focus:scale-[1.15] hover:scale-[1.15] active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10 dark:text-white/60"
						href="https://www.linkedin.com/in/nahu-dev/"
						target="_blank"
					>
						<BsLinkedin />
					</a>

					<a
						className="bg-white p-4 text-gray-700 flex items-center gap-2 text-[1.35rem] rounded-full focus:scale-[1.15] hover:scale-[1.15] hover:text-gray-950 active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10 dark:text-white/60"
						href="https://github.com/Nahuel-Salvatierra"
						target="_blank"
					>
						<FaGithubSquare />
					</a>
				</div>
			</div>
		</section>
	);
}

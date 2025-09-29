import { BsArrowRight, BsLinkedin } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";
import { FaGithubSquare } from "react-icons/fa";
import { motion } from "framer-motion";
import photoProfile from "./../assets/photoProfile.png";
import { useSectionInView } from "../lib/hooks";

export default function Intro() {
	const { ref } = useSectionInView("Home", 0.5);

	return (
		<motion.section
			ref={ref}
			id="home"
			className="pb-10 pt-20 px-5 sm:px-10 sm:pt-24 md:px-20 lg:px-44 xl:px-96 2xl:px-[30rem] text-center sm:pb-20 scroll-mt-[100rem] justify-center w-full"
			initial={{ opacity: 0, y: 0 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
			viewport={{ once: true }}
		>
			<div className="flex items-center justify-center">
				<div className="static">
					<div>
						<img
							src={photoProfile}
							alt="Nahuel Salvatierra"
							className="h-40 w-40 md:w-44 md:h-44 rounded-full object-cover border-[0.35rem] border-white shadow-xl"
						/>
					</div>
				</div>
			</div>

			<h1 className="pb-6 mt-4 px-4 text-2xl font-medium !leading-[1.5] sm:text-2xl">
				<span className="font-normal">NAHUEL S.</span>
				<br />{" "}
				<span className="font-bold py-20">
					Desarrollador web
					<br />
					Full Stack
				</span>
				<br />
				<p className="font-thin italic text-sm">
					&quot;No podemos ser eternos, pero podemos crear algo que si
					lo sea&quot;
					<br />
					<span className="">Andy Warhol</span>
				</p>
			</h1>
			<div className="flex flex-col sm:flex-row items-center justify-center gap-2 px-4 text-lg font-medium">
				<a
					className="group bg-gray-900 text-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 hover:bg-gray-950 active:scale-105 transition"
					href="mailto:salvatierra.nahuel@gmail.com"
					target="_blank"
					rel="noopener noreferrer"
					alt="Send email"
				>
					Contacto{" "}
					<BsArrowRight className="opacity-70 group-hover:translate-x-1 transition" />
				</a>
				<a
					className="group bg-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10"
					href="./Cv-Nahuel-DesarrolladorWeb.pdf"
					download="Cv-Nahuel-DesarrolladorWeb.pdf"
					target="_blank"
					rel="noopener noreferrer"
					alt="Download CV"
				>
					Descargar CV{" "}
					<HiDownload className="opacity-60 group-hover:translate-y-1 transition" />
				</a>
				<div className="flex gap-2">
					<a
						className="bg-white p-4 text-gray-700 hover:text-gray-950 flex items-center gap-2 rounded-full focus:scale-[1.15] hover:scale-[1.15] active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10 dark:text-white/60"
						href="https://www.linkedin.com/in/nahu-dev/"
						target="_blank"
						rel="noopener noreferrer"
						alt="Linkedin"
					>
						<BsLinkedin />
					</a>

					<a
						className="bg-white p-4 text-gray-700 flex items-center gap-2 text-[1.35rem] rounded-full focus:scale-[1.15] hover:scale-[1.15] hover:text-gray-950 active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10 dark:text-white/60"
						href="https://github.com/Nahuel-Salvatierra"
						target="_blank"
						rel="noopener noreferrer"
						alt="Github"
					>
						<FaGithubSquare />
					</a>
				</div>
			</div>
		</motion.section>
	);
}

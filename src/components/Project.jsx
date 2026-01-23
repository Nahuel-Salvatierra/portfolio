import { FaGithub } from "react-icons/fa";

export default function Project({ title, description, tags, imageUrl, link, github }) {
	return (
		<div className="group relative mb-3 sm:mb-8 last:mb-0 overflow-visible transition-transform duration-200 hover:scale-[1.02] origin-center">
			<a href={link} target="_blank" rel="noopener noreferrer" className="block">
				<section className="bg-gray-100 max-w-[42rem] border border-black/5 rounded-lg overflow-hidden sm:pr-8 relative sm:h-[20rem] hover:bg-gray-200 transition sm:group-even:pl-8 dark:text-white dark:bg-white/10 dark:hover:bg-white/20 group-odd:group-hover:rounded-tl-none group-odd:group-hover:rounded-bl-none group-even:group-hover:rounded-tr-none group-even:group-hover:rounded-br-none">
					<div className="pt-4 pb-7 px-5 sm:pl-10 sm:pr-2 sm:pt-10 sm:max-w-[50%] flex flex-col h-full sm:group-even:ml-[18rem]">
						<h3 className="text-2xl font-semibold">{title}</h3>
						<p className="mt-2 leading-relaxed text-gray-700 dark:text-white/70">
							{description}
						</p>
						<ul className="flex flex-wrap mt-4 gap-2 sm:mt-auto">
							{tags.map((tag, index) => (
								<li
									className="bg-black/[0.7] px-3 py-1 text-[.8rem] uppercase tracking-wider text-white rounded-full dark:text-white/70"
									key={index}
								>
									{tag}
								</li>
							))}
						</ul>
					</div>

					<img
						src={imageUrl}
						quality={95}
						className="absolute hidden sm:block top-8 -right-36 w-[28.25rem] rounded-t-lg shadow-2xl
        						transition bg-inherit
        						group-hover:scale-[1.04]
        						group-hover:-translate-x-3
       							group-hover:translate-y-3
        						group-hover:-rotate-2
								group-even:group-hover:translate-x-3
        						group-even:group-hover:translate-y-3
        						group-even:group-hover:rotate-2
        						group-even:right-[initial] group-even:-left-40"
					/>
				</section>
			</a>
			<div
				className={`absolute top-0 bottom-0 z-20 w-12 sm:w-14 flex items-center justify-center bg-gray-300 dark:bg-white/20 text-gray-700 dark:text-white opacity-0 group-hover:opacity-100 transition-[transform,opacity] duration-200 ease-out pointer-events-none group-hover:pointer-events-auto
					group-odd:left-0 group-odd:right-auto group-odd:rounded-l-lg group-odd:translate-x-0 group-odd:group-hover:-translate-x-full
					group-even:right-0 group-even:left-auto group-even:rounded-r-lg group-even:translate-x-0 group-even:group-hover:translate-x-full
					${github ? "hover:bg-gray-400 dark:hover:bg-white/30" : ""}`}
				aria-hidden={!github}
			>
				{github ? (
					<a
						href={github}
						target="_blank"
						rel="noopener noreferrer"
						className="absolute inset-0 flex items-center justify-center"
						aria-label="Ver en GitHub"
						title="Ver repositorio"
					>
						<FaGithub className="w-6 h-6" />
					</a>
				) : (
					<FaGithub className="w-6 h-6 opacity-60" />
				)}
			</div>
		</div>
	);
}

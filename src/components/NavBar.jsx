import { links } from "../lib/data";
import clsx from "clsx";
import { useActiveSectionContext } from "../context/activeSectionProvider";

export default function NavBar() {
	const { activeSection, setActiveSection, setTimeOfLastClick } =
		useActiveSectionContext();
	return (
		<header className="z-[999] relative w-full">
			<div className="fixed top-0 -translate-x-1/2 left-1/2 h-[3.5rem]  w-full rounded-none border border-white border-opacity-40 bg-white bg-opacity-80 shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem] md:top-6 md:w-[45rem] md:rounded-full dark:bg-gray-950 dark:border-black/40 dark:bg-opacity-75"></div>

			<nav className="flex fixed top-[0.15rem] -translate-x-1/2 left-1/2 h-12  py-2 md:top-[1.7rem] md:h-[initial] md:py-0">
				<ul className="flex w-[22rem] flex-wrap items-center justify-center gap-y-1 text-[0.9rem] font-medium text-gray-500 md:w-[initial] md:flex-nowrap md:gap-5">
					{links.map((link) => (
						<li
							className="h-3/4 flex items-center justify-center relative"
							key={link.hash}
						>
							<a
								className={clsx(
									"flex w-full items-center justify-center px-3 py-3 hover:text-gray-950 transition dark:text-gray-500 dark:hover:text-gray-300",
									{
										"text-gray-950 dark:text-gray-200":
											activeSection === link.name,
									}
								)}
								href={link.hash}
								onClick={() => {
									setActiveSection(link.name);
									setTimeOfLastClick(Date.now());
								}}
							>
								{link.name}

								{link.name === activeSection && (
									<span className="bg-gray-100 rounded-full absolute inset-0 -z-10 dark:bg-gray-800"></span>
								)}
							</a>
						</li>
					))}
				</ul>
			</nav>
		</header>
	);
}

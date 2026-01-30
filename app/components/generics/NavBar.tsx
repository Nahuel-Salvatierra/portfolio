"use client";

import { links } from "../../lib/constants";
import clsx from "clsx";
import { useActiveSectionContext } from "../../context/activeSectionProvider";
import Link from "next/link";

export default function NavBar() {
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();

  return (
    <header className="z-[999] relative w-full">
      <div className="fixed top-0 -translate-x-1/2 left-1/2 h-[3.5rem] w-full rounded-none border border-white border-opacity-40 bg-white bg-opacity-80 shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem] md:top-6 md:w-[45rem] md:rounded-full dark:bg-gray-950 dark:border-black/40 dark:bg-opacity-75"></div>

      <nav className="flex fixed top-[0.15rem] -translate-x-1/2 left-1/2 h-12 py-2 md:top-[1.7rem] md:h-[initial] md:py-0">
        <ul className="flex w-[22rem] flex-wrap items-center justify-center gap-y-1 text-[0.9rem] font-medium text-gray-500 md:w-[initial] md:flex-nowrap md:gap-5">
          {links.map((link) => (
            <li
              className="h-3/4 flex items-center justify-center relative"
              key={link.hash}
            >
              <Link
                className={clsx(
                  "flex w-full items-center justify-center px-3 py-3 transition-all duration-300 dark:text-gray-300",
                  {
                    "text-gray-950 dark:text-gray-200 nav-link-neon":
                      activeSection === link.name,
                    "hover:text-cyan-300 hover:scale-105 nav-link-hover-neon":
                      activeSection !== link.name,
                  },
                )}
                href={`#${link.hash}`}
                onClick={() => {
                  setActiveSection(link.hash);
                  setTimeOfLastClick(Date.now());
                }}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

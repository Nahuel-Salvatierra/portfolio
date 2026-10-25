"use client";

import { links } from "../../lib/constants";
import clsx from "clsx";
import {
  SectionName,
  useActiveSectionContext,
} from "../../context/activeSectionProvider";
import { useZoomNavOptional } from "../../context/zoomNavProvider";

const hrefToSection: Record<(typeof links)[number]["href"], SectionName> = {
  "#home": SectionName.Home,
  "#ai": SectionName.Ai,
  "#projects": SectionName.Projects,
  "#cloud": SectionName.Cloud,
  "#process": SectionName.Process,
  "#contact": SectionName.Contact,
};

export default function NavBar() {
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();
  const zoomNav = useZoomNavOptional();

  return (
    <header className="z-[999] relative w-full">
      <div
        className="fixed top-0 -translate-x-1/2 left-1/2 h-[3.25rem] w-full
           backdrop-blur-md border-b border-[color:var(--border)]
        md:top-5 md:w-[min(56rem,94vw)] md:rounded-sm md:border bg-[color:var(--card)]"
      />

      <nav className="flex fixed top-[0.2rem] -translate-x-1/2 left-1/2 h-12 py-2 md:top-[1.45rem] md:h-[initial] md:py-0 items-center">
        <ul className="flex w-[22rem] flex-wrap items-center justify-center gap-y-1 text-[0.68rem] font-mono-tech uppercase tracking-[0.1em] text-[color:var(--text-muted)] md:w-[initial] md:flex-nowrap md:gap-4">
          {links.map((link) => {
            const section = hrefToSection[link.href];
            const isActive = activeSection === section;

            return (
              <li
                className="h-3/4 flex items-center justify-center relative"
                key={link.href}
              >
                <a
                  className={clsx(
                    "flex w-full items-center justify-center px-1.5 py-3 transition-colors duration-250",
                    {
                      "text-[color:var(--text)] nav-link-neon": isActive,
                      "hover:text-[color:var(--magenta)] nav-link-hover-neon":
                        !isActive,
                    },
                  )}
                  href={link.href}
                  onClick={(event) => {
                    setActiveSection(section);
                    setTimeOfLastClick(Date.now());
                    if (zoomNav) {
                      event.preventDefault();
                      zoomNav.jumpToSection(section);
                    }
                  }}
                >
                  {link.name}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}

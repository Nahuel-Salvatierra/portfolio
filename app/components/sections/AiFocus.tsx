"use client";

import AiPromoCards from "./AiPromoCards";

export default function AiFocus() {
  return (
    <section className="relative flex h-full min-h-full w-full items-center overflow-hidden bg-transparent">
      <div className="relative z-10 container mx-auto w-full px-12 py-28 sm:px-10 sm:py-20 md:px-20 md:py-32 lg:px-28 xl:px-40 2xl:px-56">
        <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between md:gap-12">
          <h2 className="font-display max-w-md shrink-0 text-3xl font-bold leading-[1.08] text-[color:var(--text)] sm:text-4xl md:text-5xl lg:text-[3.25rem]">
            Implementaciones
            <br />
            <span className="text-[color:var(--neon)]">con Inteligencia Artificial</span>
          </h2>
          <div className="w-full shrink-0 md:ml-auto md:w-auto">
            <AiPromoCards />
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import SectionHeading from "../Section.Heading";
import { motion } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useState } from "react";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  loading: () => <div className="w-full h-full bg-black" />,
  ssr: false,
});

export default function About() {
  const [showProfile, setShowProfile] = useState(true);

  return (
    <motion.section
      className="px-4 pb-10 lg:px-32 xl:px-80 text-center 2xl:px-[30rem] sm:px-10 md:px-20 leading-8 sm:pb-20 scroll-mt-28 flex flex-wrap justify-center flex-col items-center"
      id="about"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <SectionHeading>Sobre Mí</SectionHeading>
      <div className="text-white text-left text-2xl w-full">
        {/* Desktop view: Float left with shape-outside for circular wrapping */}
        <div
          className="relative float-left mr-8 mb-2 hidden md:block w-48 h-48 rounded-full border-[6px] border-white overflow-hidden shadow-xl group"
          style={{ shapeOutside: "circle(50%)" }}
        >
          {/* Spline Background */}
          <div className="absolute inset-0 z-0 bg-black">
            <Spline scene="https://prod.spline.design/kOcTRXRLXnj-isID/scene.splinecode" />
          </div>

          {/* Profile Image Overlay */}
          <div style={{ opacity: showProfile ? 1 : 0 }} className="relative z-10 w-full h-full transition-opacity duration-500 ease-in-out">
            <Image
              src="/portfolio/profile.png"
              alt="Nahuel Salvatierra"
              fill
              onMouseEnter={() => setShowProfile(false)}
              onClick={() => setShowProfile(true)}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 300px"
              priority
            />
          </div>
        </div>
        {/* Mobile view image centered above text */}
        <div className="md:hidden flex justify-center mb-6">
          <div className="relative w-40 h-40 rounded-full border-[6px] border-white overflow-hidden shadow-xl">
            <Image
              src="/portfolio/profile.png"
              alt="Nahuel Salvatierra"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 300px"
              priority
            />
          </div>
        </div>

        <p className="inline relative z-10">
          Como desarrollador profesional, llevo 3 años trabajando en el mundo de
          la programación, aplicando mis conocimientos y habilidades para crear
          soluciones de software efectivas. Anteriormente, tuve 6 años de
          experiencia en producción y ventas, lo que me permitió desarrollar una
          perspectiva única y habilidades transferibles. Ahora, combino todos
          estos saberes en mi carrera como desarrollador.
        </p>
        <span className="block mt-4"></span>
        <p>
          Frecuentemente me veo en la necesidad de aprender nuevas técnicas; el
          aprendizaje constante para ser independiente es esencial, aunque no
          esté explícito.
        </p>
        <span className="block mt-4"></span>
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

"use client";

import { BsArrowRight, BsLinkedin } from "react-icons/bs";
import { HiMail } from "react-icons/hi";
import { FaGithubSquare } from "react-icons/fa";
import { motion } from "framer-motion";
import Spline from "@splinetool/react-spline";
import { useState } from "react";
import ContactModal from "../generics/ContactModal";

export default function Intro() {
  const [open, setOpen] = useState(false);
  const onHover = "hover:scale-110 transition-transform duration-300";

  const toggleOpenClose = () => {
    setOpen(!open);
  };

  return (
    <div className="relative">
      <ContactModal open={open} toggleOpenClose={toggleOpenClose} />
      <motion.section
        id="home"
        className="relative w-full min-h-screen bg-[#E8F4F8]  flex items-center overflow-hidden"
        initial={{ opacity: 0, y: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 w-full h-full z-0">
          <Spline scene="https://prod.spline.design/hpwYuH0i1o85hG3V/scene.splinecode" />
        </div>
        <div className="relative z-10 container mx-auto px-5 sm:px-10 md:px-20 lg:px-32 xl:px-44 2xl:px-64 py-20 md:py-32 w-full pointer-events-none">
          <div className="max-w-2xl pointer-events-auto">
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight pointer-events-none"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Ingeniero de software
              <br />
              <span className="text-[#1A73E8]">
                Full Stack
              </span>

            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed pointer-events-none"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Creo soluciones de software efectivas combinando experiencia
              técnica y perspectiva única. Ayudo a conectar, colaborar y
              completar proyectos más rápido con tecnologías modernas.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <button
                className="btn-primary-3d group relative flex items-center justify-center gap-2 text-base md:text-lg"
                onClick={() => setOpen(true)}
              >
                <span className="relative z-10">Contacto</span>
                <BsArrowRight className="relative z-10 group-hover:scale-110 transition-transform duration-300" />
              </button>
              <a
                className="btn-secondary-3d group relative flex items-center justify-center gap-2 text-base md:text-lg"
                href="mailto:salvatierra.nahuel@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="relative z-10">Enviar email</span>
                <HiMail className="relative z-10 group-hover:scale-110 transition-transform duration-300" />
              </a>
            </motion.div>
            <motion.div
              className="flex gap-4 items-center mt-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <a
                href="https://www.linkedin.com/in/nahu-dev/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <BsLinkedin className={`text-xl w-10 h-10 text-white ${onHover}`} />
              </a>
              <a
                className=""
                href="https://github.com/Nahuel-Salvatierra"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <FaGithubSquare className={`text-xl w-11 h-11 text-white ${onHover}`} />
              </a>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

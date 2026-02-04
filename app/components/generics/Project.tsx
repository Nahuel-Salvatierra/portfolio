"use client";

import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { FaGithub, FaPlay, FaExternalLinkAlt } from "react-icons/fa";
import { Dialog } from "./Dialog";

export interface ProjectProps {
  title: string;
  description: string;
  tags: string[];
  imageUrl: StaticImageData | string;
  videoUrl?: string;
  link: string;
  github: string;
  priority?: boolean;
}

export default function Project({
  title,
  description,
  tags,
  imageUrl,
  videoUrl,
  link,
  github,
  priority = false,
}: ProjectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (e: React.MouseEvent) => {
    if (videoUrl) {
      e.preventDefault();
      setIsOpen(true);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="group relative mb-3 sm:mb-8 last:mb-0 w-full max-w-[50rem] mx-auto origin-center">
        <div className="relative overflow-hidden rounded-2xl bg-black/40 border border-white/10 shadow-[0_0_15px_rgba(0,123,255,0.1)] hover:shadow-[0_0_30px_rgba(0,123,255,0.2)] hover:border-white/20 transition-all duration-300 backdrop-blur-sm">
          {/* Top Gradient Line */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />

          <div className="flex flex-col md:flex-row">
            {/* Content Section */}
            <div className="p-6 md:[40%] flex flex-col justify-between z-10">
              <div>
                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                  {title}
                </h3>
                <p className="mt-4 leading-relaxed text-gray-300 text-sm">
                  {description}
                </p>
                <div className="flex gap-4 mt-6">
                  {github && (
                    <a
                      href={github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-medium text-white/70 hover:text-cyan-400 transition-colors"
                    >
                      <FaGithub className="w-5 h-5" /> Code
                    </a>
                  )}
                  {link && (
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-medium text-white/70 hover:text-cyan-400 transition-colors"
                    >
                      <FaExternalLinkAlt className="w-4 h-4" /> Ir al sitio
                    </a>
                  )}
                </div>
              </div>

              <ul className="flex flex-wrap gap-2 mt-6">
                {tags.map((tag, index) => (
                  <li
                    className="px-3 py-1 text-[0.7rem] uppercase tracking-wider text-cyan-200 bg-cyan-900/20 border border-cyan-500/20 rounded-full"
                    key={index}
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>

            {/* Image/Media Section */}
            <div className="md:w-[%60] relative bg-black aspect-video md:aspect-auto overflow-hidden">
              {videoUrl ? (
                <div onClick={handleOpen} className="cursor-pointer block w-full h-full relative group-video">
                  <Image
                    src={imageUrl}
                    alt={title}
                    width={100}
                    height={100}
                    priority={priority}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  {/* Play Button Overlay */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="p-4 bg-black/50 text-white rounded-full backdrop-blur-md">
                      <FaPlay size={20} />
                    </div>
                  </div>
                </div>
              ) : (
                <a href={link} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                  <Image
                    src={imageUrl}
                    alt={title}
                    width={100}
                    height={100}
                    priority={priority}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                  />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {videoUrl && (
        <Dialog open={isOpen} toggleOpenClose={handleClose}>
          <div className="w-auto max-w-full max-h-full flex items-center justify-center p-4" onClick={(e) => e.stopPropagation()}>
            <video
              src={videoUrl}
              className="max-h-[85vh] w-auto max-w-full h-auto rounded-lg shadow-2xl"
              autoPlay
              controls
              playsInline
              crossOrigin="anonymous"
            >
              <track
                kind="subtitles"
                src="/sigapp.vtt"
                srcLang="es"
                label="Español"
                default
              />
            </video>
          </div>
        </Dialog>
      )}
    </>
  );
}

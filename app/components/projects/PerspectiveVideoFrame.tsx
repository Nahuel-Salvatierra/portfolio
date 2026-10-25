"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";

type PerspectiveVideoFrameProps = {
  title: string;
  imageUrl: string;
  videoUrl?: string;
  captionsUrl?: string;
  active: boolean;
};

export function PerspectiveVideoFrame({
  title,
  imageUrl,
  videoUrl,
  captionsUrl,
  active,
}: PerspectiveVideoFrameProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoUrl) return;

    if (active) {
      video.currentTime = 0;
      void video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  }, [active, videoUrl]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = muted;
    }
  }, [muted]);

  return (
    <div className="perspective-frame w-full max-w-3xl mx-auto">
      <div
        className="perspective-frame-inner relative rounded-sm overflow-hidden border border-[color:var(--border)]
          shadow-[0_30px_80px_rgba(0,0,0,0.55),0_0_1px_rgba(185,43,255,0.4)]
          bg-[color:var(--bg-elevated)]"
      >
        <div
          className="absolute inset-0 pointer-events-none z-10 rounded-sm"
          style={{
            boxShadow:
              "inset 0 0 0 1px rgba(179,173,194,0.12), inset 0 0 50px rgba(185,43,255,0.1)",
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-9 z-20 flex items-center gap-2 px-3 border-b border-white/5 bg-gradient-to-b from-[#1a1a22] to-[#141418]">
          <span className="w-2 h-2 rounded-full bg-[#ff5f57]/80" />
          <span className="w-2 h-2 rounded-full bg-[#febc2e]/80" />
          <span className="w-2 h-2 rounded-full bg-[#28c840]/80" />
          <span className="ml-2 font-mono-tech text-[0.6rem] uppercase tracking-[0.16em] text-[color:var(--text-muted)] truncate">
            holo://{title.toLowerCase().replace(/\s+/g, "-")}
          </span>
        </div>

        {videoUrl ? (
          <>
            <video
              ref={videoRef}
              src={videoUrl}
              className="w-full aspect-video object-cover bg-black mt-0"
              style={{ marginTop: 0 }}
              autoPlay
              muted={muted}
              loop
              playsInline
              poster={imageUrl}
            >
              {captionsUrl && (
                <track
                  kind="subtitles"
                  src={captionsUrl}
                  srcLang="es"
                  label="Español"
                  default
                />
              )}
            </video>
            <button
              type="button"
              onClick={() => setMuted((value) => !value)}
              className="absolute bottom-3 right-3 z-20 p-2 rounded-sm bg-black/60 text-[color:var(--text)] border border-white/10 hover:border-[color:var(--magenta)]/50 hover:text-[color:var(--magenta)] transition-colors"
              aria-label={muted ? "Activar sonido" : "Silenciar"}
            >
              {muted ? <FaVolumeMute /> : <FaVolumeUp />}
            </button>
          </>
        ) : (
          <div className="relative w-full aspect-video">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        )}
      </div>
    </div>
  );
}

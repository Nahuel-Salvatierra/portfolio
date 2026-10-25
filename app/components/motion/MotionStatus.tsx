"use client";

import { useEffect, useState } from "react";

export function MotionStatus() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dismissed = sessionStorage.getItem("motion-hint-dismissed") === "1";
    if (reduced && !dismissed) setShow(true);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-1/2 z-[300] w-[min(92vw,28rem)] -translate-x-1/2 rounded-sm border border-[color:var(--border)] bg-[color:var(--card)] px-4 py-3 text-left shadow-[0_12px_40px_rgba(0,0,0,0.45)]">
      <p className="font-mono-tech text-[0.65rem] uppercase tracking-[0.18em] text-[color:var(--neon)] mb-1">
        Motion notice
      </p>
      <p className="text-sm text-[color:var(--text-muted)] leading-relaxed">
        Tu sistema tiene &quot;reducir movimiento&quot; activo. El portfolio igual muestra
        las animaciones clave. En Windows: Ajustes → Accesibilidad → Efectos
        visuales → desactivar animaciones reducidas.
      </p>
      <button
        type="button"
        className="mt-2 text-xs text-[color:var(--neon)] hover:text-[color:var(--magenta)]"
        onClick={() => {
          sessionStorage.setItem("motion-hint-dismissed", "1");
          setShow(false);
        }}
      >
        Entendido
      </button>
    </div>
  );
}

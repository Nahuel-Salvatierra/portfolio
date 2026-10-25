"use client";

import React, { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { InputForm } from "./InputForm";
import { Dialog } from "./Dialog";
import { buildContactMailto } from "@/app/lib/contact";

interface ContactModalProps {
  open: boolean;
  toggleOpenClose: () => void;
}

export default function ContactModal({
  open,
  toggleOpenClose,
}: ContactModalProps) {
  const [status, setStatus] = useState("");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name || !email || !message) {
      setStatus("Completá nombre, email y mensaje.");
      return;
    }

    window.location.href = buildContactMailto({ name, email, message });
    setStatus("Se abre tu cliente de correo para enviar el mensaje.");
  };

  return (
    <Dialog open={open} toggleOpenClose={toggleOpenClose}>
      <motion.div
        key="contact-modal-content"
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 8 }}
        transition={{
          type: "spring",
          damping: 26,
          stiffness: 300,
        }}
        onClick={(e) => e.stopPropagation()}
        className="holo-card lg:w-1/2 w-full max-w-xl text-[color:var(--text)] flex flex-col items-center justify-center rounded-sm p-8 md:p-10"
      >
        <p className="font-mono-tech text-[0.65rem] uppercase tracking-[0.22em] text-[color:var(--neon)] mb-2">
          Contact channel
        </p>
        <h1 className="font-display text-2xl font-bold text-center text-[color:var(--text)]">
          Me comunicare contigo lo antes posible.
        </h1>
        <form onSubmit={onSubmit} className="grid grid-cols-2 gap-4 w-full pt-6">
          <InputForm
            name="name"
            type="text"
            required
            className="col-span-1"
            placeholder="Nombre"
            autoComplete="name"
          />
          <InputForm
            name="email"
            type="email"
            required
            className="col-span-1"
            placeholder="Email"
            autoComplete="email"
          />
          <div className="col-span-2">
            <textarea
              name="message"
              required
              defaultValue="Hola, me interesa tu trabajo. Me gustaría saber más sobre tus proyectos."
              className="w-full p-3 rounded-sm border border-[color:var(--border)] bg-[color:var(--bg-elevated)] text-[color:var(--text)] focus:outline-none focus:border-[color:var(--neon)]/50"
              placeholder="Mensaje"
              rows={4}
            />
          </div>
          {status ? (
            <p className="col-span-2 text-sm text-[color:var(--neon)]" role="status">
              {status}
            </p>
          ) : null}
          <button
            className="btn-primary-3d group relative flex items-center justify-center gap-2 text-sm md:text-base col-span-2 sm:col-span-1"
            type="submit"
          >
            Enviar
          </button>
        </form>
      </motion.div>
    </Dialog>
  );
}

"use client";

import React from "react";
import { InputForm } from "./InputForm";
import { Dialog } from "./Dialog";

interface ContactModalProps {
  open: boolean;
  toggleOpenClose: () => void;
}

export default function ContactModal({
  open,
  toggleOpenClose,
}: ContactModalProps) {
  return (
    <Dialog open={open} toggleOpenClose={toggleOpenClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="lg:w-1/2 w-full h-1/2 bg-black text-white flex flex-col items-center justify-center border border-gray-300 rounded-xl p-10"
      >
        <h1 className="text-2xl text-nowrap font-bold text-center">
          Me comunicare contigo lo antes posible.
        </h1>
        <form className="grid grid-cols-2 gap-4 w-full pt-4">
          <InputForm type="text" className="col-span-1" placeholder="Nombre" />
          <InputForm type="email" className="col-span-1" placeholder="Email" />
          <div className="col-span-2">
            <textarea
              className="w-full p-2 rounded-md border border-gray-300"
              placeholder="Mensaje"
            />
          </div>
          <button
            className="btn-primary-3d group relative flex items-center justify-center gap-2 text-base md:text-lg"
            type="submit"
          >
            Enviar
          </button>
        </form>
      </div>
    </Dialog>
  );
}

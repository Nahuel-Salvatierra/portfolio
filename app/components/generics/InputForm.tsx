"use client";

import React from "react";
import clsx from "clsx";

type InputFormProps = React.InputHTMLAttributes<HTMLInputElement>;

export function InputForm({ className, ...props }: InputFormProps) {
  return (
    <input
      {...props}
      className={clsx(
        "w-full p-3 rounded-sm border border-[color:var(--border)] bg-[color:var(--bg-elevated)] text-[color:var(--text)] placeholder:text-[color:var(--text-muted)] focus:outline-none focus:border-[color:var(--neon)]/50",
        className,
      )}
    />
  );
}

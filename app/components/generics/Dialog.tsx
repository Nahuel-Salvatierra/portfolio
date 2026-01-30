"use client";

import React from "react";

type DialogProps = {
  open: boolean;
  children: React.ReactNode;
  toggleOpenClose: () => void;
};

export function Dialog({ open, children, toggleOpenClose }: DialogProps) {
  return (
    <>
      {open && (
        <div
          onClick={() => toggleOpenClose()}
          style={{
            zIndex: 90,
          }}
          className="w-full h-full  bg-opacity-50 backdrop-blur-xs absolute top-0 left-0 flex items-center justify-center p-4"
        >
          {children}
        </div>
      )}
    </>
  );
}

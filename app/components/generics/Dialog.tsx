"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";

type DialogProps = {
  open: boolean;
  children: React.ReactNode;
  toggleOpenClose: () => void;
};

export function Dialog({ open, children, toggleOpenClose }: DialogProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="dialog-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => toggleOpenClose()}
          style={{
            zIndex: 90,
          }}
          className="w-full h-full bg-black/50 backdrop-blur-sm fixed top-0 left-0 flex items-center justify-center p-4"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

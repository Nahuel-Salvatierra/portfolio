"use client";

import type { ReactNode } from "react";
import { MotionStatus } from "../motion/MotionStatus";
import ActiveSectionContextProvider from "../../context/activeSectionProvider";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <ActiveSectionContextProvider>
      <div className="min-h-screen">{children}</div>
      <MotionStatus />
    </ActiveSectionContextProvider>
  );
}

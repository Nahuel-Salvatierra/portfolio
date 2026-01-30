import React from "react";

export default function SectionHeading({ children }) {
  return (
    <h2 className="text-3xl text-white font-medium capitalize pb-8 text-center">
      {children}
    </h2>
  );
}

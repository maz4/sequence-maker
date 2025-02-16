import React from "react";

interface SectionTitleProps {
  children: React.ReactNode;
}

export default function SectionTitle({ children }: SectionTitleProps) {
  return <h3 className="text-lg font-bold mb-2">{children}</h3>;
}

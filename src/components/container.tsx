import React from "react";
import clsx from "clsx";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children, className = "" }: ContainerProps) {
  return (
    <div
      className={clsx(
        "rounded-2xl p-4 shadow-md backdrop-blur-md bg-white/10 border border-white/20",
        className
      )}
    >
      {children}
    </div>
  );
}

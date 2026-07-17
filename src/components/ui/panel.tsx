"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useTilt } from "@/lib/use-tilt";

type PanelProps = {
  children: ReactNode;
  className?: string;
  hover?: boolean;
};

export function Panel({ children, className, hover = true }: PanelProps) {
  const tilt = useTilt(hover);

  return (
    <motion.div
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      style={tilt.style}
      className={cn(
        "panel",
        hover && "transition-shadow duration-150 hover:shadow-[9px_9px_0_var(--color-red)]",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}

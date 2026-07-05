"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PanelProps = {
  children: ReactNode;
  className?: string;
  hover?: boolean;
};

export function Panel({ children, className, hover = true }: PanelProps) {
  return (
    <motion.div
      whileHover={hover ? { x: -4, y: -4 } : undefined}
      transition={{ duration: 0.15, ease: "linear" }}
      className={cn(
        "panel",
        hover && "hover:shadow-[6px_6px_0_var(--color-ink)]",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}

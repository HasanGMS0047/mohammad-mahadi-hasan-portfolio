"use client";

import { motion } from "framer-motion";

export function BauhausField() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-ink) 1.5px, transparent 1.5px), linear-gradient(to bottom, var(--color-ink) 1.5px, transparent 1.5px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="absolute -right-24 -top-24 h-[26rem] w-[26rem] rounded-full border-2 border-red opacity-20" />

      <motion.div
        className="absolute -left-16 bottom-10 h-56 w-56 bg-yellow opacity-[0.14]"
        style={{ clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }}
        animate={{ rotate: [0, 6, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute right-[12%] top-1/3 h-24 w-24 border-[6px] border-blue opacity-25"
        animate={{ rotate: [0, 90, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.span
        className="absolute left-[8%] top-1/4 h-3 w-3 rounded-full bg-red neon-ring"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

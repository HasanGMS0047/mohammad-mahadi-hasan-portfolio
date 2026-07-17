"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = setTimeout(() => setLoading(false), reduced ? 0 : 1100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading ? (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-paper"
        >
          <div className="flex flex-col items-center gap-5">
            <div className="flex items-center gap-3">
              <motion.span
                className="h-4 w-4 bg-red"
                animate={{ rotate: [0, 180, 180, 360] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
              />
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-2xl font-extrabold uppercase tracking-tight text-ink"
              >
                Forest47
              </motion.span>
            </div>
            <div className="h-1.5 w-44 border-2 border-ink">
              <motion.div
                className="h-full bg-red"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, ease: "linear" }}
              />
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

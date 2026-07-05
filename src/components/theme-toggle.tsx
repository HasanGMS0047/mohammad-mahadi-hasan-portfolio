"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { useMounted } from "@/lib/use-mounted";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle color theme"
      className={`relative flex h-10 w-10 items-center justify-center border-2 border-ink text-ink transition-colors hover:bg-ink hover:text-paper focus-visible:outline-none focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-red ${className ?? ""}`}
    >
      <motion.span
        key={isDark ? "moon" : "sun"}
        initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="flex items-center justify-center"
      >
        {isDark ? <Moon size={18} /> : <Sun size={18} />}
      </motion.span>
    </button>
  );
}

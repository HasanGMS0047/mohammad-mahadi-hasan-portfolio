"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useFinePointer } from "@/lib/use-fine-pointer";

export function Cursor() {
  const enabled = useFinePointer();
  const [pointerActive, setPointerActive] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    if (!enabled) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX - 16);
      y.set(e.clientY - 16);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setPointerActive(!!target.closest("a, button, [role='button'], input, textarea"));
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", onOver);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] h-8 w-8 rounded-full border-2 border-red neon-ring mix-blend-difference"
      style={{ x: springX, y: springY }}
      animate={{ scale: pointerActive ? 1.6 : 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    />
  );
}

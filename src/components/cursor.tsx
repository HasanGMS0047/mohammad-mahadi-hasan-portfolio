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
      x.set(e.clientX - 7);
      y.set(e.clientY - 7);
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
      className="pointer-events-none fixed left-0 top-0 z-[100] h-3.5 w-3.5 border-2 border-red mix-blend-difference"
      style={{ x: springX, y: springY }}
      animate={{
        rotate: pointerActive ? 135 : 45,
        scale: pointerActive ? 2.2 : 1,
        backgroundColor: pointerActive ? "var(--color-red)" : "rgba(0,0,0,0)",
      }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    />
  );
}

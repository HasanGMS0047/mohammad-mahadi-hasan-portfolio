import { useMotionValue, useSpring } from "framer-motion";
import type { MouseEvent } from "react";

const TILT_RANGE = 4;

export function useTilt(enabled = true) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 350, damping: 25 });
  const springRotateY = useSpring(rotateY, { stiffness: 350, damping: 25 });

  function onMouseMove(event: MouseEvent<HTMLElement>) {
    if (!enabled) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * TILT_RANGE);
    rotateX.set(py * -TILT_RANGE);
  }

  function onMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return {
    style: enabled
      ? { rotateX: springRotateX, rotateY: springRotateY, transformPerspective: 1200 }
      : undefined,
    onMouseMove,
    onMouseLeave,
  };
}

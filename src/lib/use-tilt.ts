import { useMotionValue, useSpring } from "framer-motion";
import type { MouseEvent } from "react";

const TILT_RANGE = 4;
const MOVE_RANGE = 10;
const SPRING = { stiffness: 110, damping: 22, mass: 1 };

export function useTilt(enabled = true) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springRotateX = useSpring(rotateX, SPRING);
  const springRotateY = useSpring(rotateY, SPRING);
  const springX = useSpring(x, SPRING);
  const springY = useSpring(y, SPRING);

  function onMouseMove(event: MouseEvent<HTMLElement>) {
    if (!enabled) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * TILT_RANGE);
    rotateX.set(py * -TILT_RANGE);
    x.set(px * MOVE_RANGE);
    y.set(py * MOVE_RANGE);
  }

  function onMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
    x.set(0);
    y.set(0);
  }

  return {
    style: enabled
      ? {
          rotateX: springRotateX,
          rotateY: springRotateY,
          x: springX,
          y: springY,
          transformPerspective: 1200,
        }
      : undefined,
    onMouseMove,
    onMouseLeave,
  };
}

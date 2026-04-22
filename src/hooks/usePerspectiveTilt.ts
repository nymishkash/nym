"use client";

import { useEffect } from "react";
import { useMotionValue, useSpring, type MotionValue } from "framer-motion";
import { getMousePosition } from "./useMousePosition";

interface TiltValues {
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
}

interface TiltOptions {
  /** 0-1, scales the rotation range. 1 = ±4° by default. */
  intensity?: number;
  maxDeg?: number;
  stiffness?: number;
  damping?: number;
  enabled?: boolean;
}

export function usePerspectiveTilt({
  intensity = 1,
  maxDeg = 4,
  stiffness = 80,
  damping = 20,
  enabled = true,
}: TiltOptions = {}): TiltValues {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(rawX, { stiffness, damping });
  const rotateY = useSpring(rawY, { stiffness, damping });

  useEffect(() => {
    if (!enabled) {
      rawX.set(0);
      rawY.set(0);
      return;
    }
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mql.matches) {
      rawX.set(0);
      rawY.set(0);
      return;
    }

    const range = maxDeg * intensity;
    let raf = 0;
    const tick = () => {
      const m = getMousePosition();
      const nx = (m.x / window.innerWidth) * 2 - 1;
      const ny = (m.y / window.innerHeight) * 2 - 1;
      rawY.set(nx * range);
      rawX.set(-ny * (range * 0.75));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [intensity, maxDeg, enabled, rawX, rawY]);

  return { rotateX, rotateY };
}

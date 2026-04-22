"use client";

import { useEffect } from "react";
import { useMotionValue, useSpring, type MotionValue } from "framer-motion";
import { getMousePosition } from "./useMousePosition";

interface ParallaxOffset {
  x: MotionValue<number>;
  y: MotionValue<number>;
}

interface ParallaxOptions {
  rate?: number;
  stiffness?: number;
  damping?: number;
  enabled?: boolean;
}

export function useParallaxOffset({
  rate = 0.03,
  stiffness = 40,
  damping = 25,
  enabled = true,
}: ParallaxOptions = {}): ParallaxOffset {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness, damping });
  const y = useSpring(rawY, { stiffness, damping });

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

    let raf = 0;
    const tick = () => {
      const m = getMousePosition();
      const dx = m.x - window.innerWidth / 2;
      const dy = m.y - window.innerHeight / 2;
      rawX.set(dx * rate);
      rawY.set(dy * rate);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [rate, enabled, rawX, rawY]);

  return { x, y };
}

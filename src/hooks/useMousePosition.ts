"use client";

import { useEffect, useRef, useCallback } from "react";

interface MousePosition {
  x: number;
  y: number;
  normalizedX: number;
  normalizedY: number;
}

const mouseState: MousePosition = {
  x: 0,
  y: 0,
  normalizedX: 0.5,
  normalizedY: 0.5,
};

const listeners = new Set<() => void>();

if (typeof window !== "undefined") {
  window.addEventListener("mousemove", (e) => {
    mouseState.x = e.clientX;
    mouseState.y = e.clientY;
    mouseState.normalizedX = e.clientX / window.innerWidth;
    mouseState.normalizedY = e.clientY / window.innerHeight;
    listeners.forEach((fn) => fn());
  });
}

export function getMousePosition() {
  return mouseState;
}

export function useMousePosition() {
  const posRef = useRef<MousePosition>({ ...mouseState });

  const update = useCallback(() => {
    posRef.current = { ...mouseState };
  }, []);

  useEffect(() => {
    listeners.add(update);
    return () => {
      listeners.delete(update);
    };
  }, [update]);

  return posRef;
}

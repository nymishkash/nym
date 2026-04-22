"use client";

import { motion, useMotionTemplate, useSpring } from "framer-motion";
import { useEffect } from "react";
import { useParallaxOffset } from "@/hooks/useParallaxOffset";
import { useIsMobile } from "@/hooks/useIsMobile";

interface ParallaxBackgroundProps {
  accent?: string;
}

export default function ParallaxBackground({
  accent = "#3730a3",
}: ParallaxBackgroundProps) {
  const isMobile = useIsMobile();
  const rateScale = isMobile ? 0.4 : 1;

  const far = useParallaxOffset({ rate: 0.015 * rateScale });
  const mid = useParallaxOffset({ rate: 0.035 * rateScale });
  const near = useParallaxOffset({ rate: 0.06 * rateScale });

  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
    >
      <DriftingBlob
        size={720}
        color="#3730a3"
        top="-15%"
        left="-10%"
        offset={far}
        driftId={0}
      />
      <DriftingBlob
        size={560}
        color="#6b21a8"
        top="45%"
        left="60%"
        offset={mid}
        driftId={1}
      />
      <DriftingBlob
        size={460}
        color="#0e7490"
        top="65%"
        left="5%"
        offset={near}
        driftId={2}
      />
      <AccentBlob accent={accent} offset={mid} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.45)_100%)]" />
    </div>
  );
}

interface BlobProps {
  size: number;
  color: string;
  top: string;
  left: string;
  offset: { x: ReturnType<typeof useSpring>; y: ReturnType<typeof useSpring> };
  driftId: number;
}

function DriftingBlob({ size, color, top, left, offset, driftId }: BlobProps) {
  const driftX = useSpring(0, { stiffness: 12, damping: 20 });
  const driftY = useSpring(0, { stiffness: 12, damping: 20 });

  useEffect(() => {
    const period = 30000 + driftId * 4000;
    const amplitude = 60;
    const phase = (driftId * Math.PI * 2) / 3;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = ((now - start) / period) * Math.PI * 2 + phase;
      driftX.set(Math.sin(t) * amplitude);
      driftY.set(Math.cos(t * 0.7) * amplitude);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [driftId, driftX, driftY]);

  const x = useMotionTemplate`calc(${offset.x}px + ${driftX}px)`;
  const y = useMotionTemplate`calc(${offset.y}px + ${driftY}px)`;

  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        top,
        left,
        background: color,
        filter: "blur(120px)",
        opacity: 0.16,
        translateX: x,
        translateY: y,
      }}
    />
  );
}

function AccentBlob({
  accent,
  offset,
}: {
  accent: string;
  offset: { x: ReturnType<typeof useSpring>; y: ReturnType<typeof useSpring> };
}) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: 520,
        height: 520,
        top: "20%",
        left: "30%",
        background: accent,
        filter: "blur(140px)",
        opacity: 0.12,
        translateX: offset.x,
        translateY: offset.y,
        transition: "background 600ms ease",
      }}
    />
  );
}

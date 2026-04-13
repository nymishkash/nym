"use client";

import { useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { mapRange } from "@/lib/utils";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  tiltAmount?: number;
}

export default function TiltCard({
  children,
  className = "",
  tiltAmount = 15,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const rotateX = useSpring(0, { damping: 20, stiffness: 200 });
  const rotateY = useSpring(0, { damping: 20, stiffness: 200 });
  const lightX = useSpring(50, { damping: 20, stiffness: 200 });
  const lightY = useSpring(50, { damping: 20, stiffness: 200 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    rotateX.set(mapRange(y - centerY, -centerY, centerY, tiltAmount, -tiltAmount));
    rotateY.set(mapRange(x - centerX, -centerX, centerX, -tiltAmount, tiltAmount));
    lightX.set(mapRange(x, 0, rect.width, 0, 100));
    lightY.set(mapRange(y, 0, rect.height, 0, 100));
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    lightX.set(50);
    lightY.set(50);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
      }}
      data-cursor="pointer"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="w-full h-full"
      >
        {children}
        {/* Light reflection */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
          style={{
            opacity: isHovered ? 0.1 : 0,
            background: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.8), transparent 60%)`,
          }}
        />
      </motion.div>
    </motion.div>
  );
}

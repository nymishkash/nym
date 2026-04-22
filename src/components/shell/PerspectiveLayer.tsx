"use client";

import { motion } from "framer-motion";
import { usePerspectiveTilt } from "@/hooks/usePerspectiveTilt";

interface PerspectiveLayerProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  enabled?: boolean;
  perspective?: number;
}

export default function PerspectiveLayer({
  children,
  className = "",
  intensity = 1,
  enabled = true,
  perspective = 1400,
}: PerspectiveLayerProps) {
  const { rotateX, rotateY } = usePerspectiveTilt({ intensity, enabled });

  return (
    <div
      className={className}
      style={{ perspective, transformStyle: "preserve-3d" }}
    >
      <motion.div
        className="w-full h-full"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

interface ViewShellProps {
  children: React.ReactNode;
  className?: string;
}

export default function ViewShell({
  children,
  className = "",
}: ViewShellProps) {
  const isMobile = useIsMobile();

  // Mobile: skip blur filter in transitions (filter: blur is very expensive on mobile GPUs)
  const initial = isMobile
    ? { opacity: 0, y: 8 }
    : { opacity: 0, y: 12, filter: "blur(6px)" };
  const animate = isMobile
    ? { opacity: 1, y: 0 }
    : { opacity: 1, y: 0, filter: "blur(0px)" };
  const exit = isMobile
    ? { opacity: 0, y: -8 }
    : { opacity: 0, y: -12, filter: "blur(6px)" };

  return (
    <motion.div
      initial={initial}
      animate={animate}
      exit={exit}
      transition={{ duration: isMobile ? 0.28 : 0.42, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-0 flex items-center justify-center ${className}`}
    >
      {children}
    </motion.div>
  );
}

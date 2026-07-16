"use client";

import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function Template({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();

  const initial = isMobile
    ? { opacity: 0, y: 8 }
    : { opacity: 0, y: 12, filter: "blur(6px)" };
  const animate = isMobile
    ? { opacity: 1, y: 0 }
    : { opacity: 1, y: 0, filter: "blur(0px)" };

  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={{ duration: isMobile ? 0.28 : 0.42, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 flex items-center justify-center"
    >
      {children}
    </motion.div>
  );
}

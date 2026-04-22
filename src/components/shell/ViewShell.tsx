"use client";

import { motion } from "framer-motion";

interface ViewShellProps {
  children: React.ReactNode;
  className?: string;
}

export default function ViewShell({
  children,
  className = "",
}: ViewShellProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-0 flex items-center justify-center ${className}`}
    >
      {children}
    </motion.div>
  );
}

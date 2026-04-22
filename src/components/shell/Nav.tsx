"use client";

import { motion } from "framer-motion";
import { useCallback, useRef } from "react";
import { VIEWS, type ViewId } from "@/lib/views";

interface NavProps {
  active: ViewId;
  onChange: (id: ViewId) => void;
}

export default function Nav({ active, onChange }: NavProps) {
  const lastClickRef = useRef(0);

  const handleSelect = useCallback(
    (id: ViewId) => {
      const now = performance.now();
      if (now - lastClickRef.current < 120) return;
      lastClickRef.current = now;
      if (id !== active) onChange(id);
    },
    [active, onChange]
  );

  return (
    <motion.nav
      className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative flex items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.04] px-1.5 py-1.5 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
        {VIEWS.map((v) => {
          const isActive = v.id === active;
          return (
            <button
              key={v.id}
              onClick={() => handleSelect(v.id)}
              data-cursor="pointer"
              className="relative z-10 rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-widest transition-colors"
              style={{ color: isActive ? "#fafafa" : "#71717a" }}
            >
              {isActive && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 -z-10 rounded-full"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(99,102,241,0.18), rgba(168,85,247,0.18))",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              {v.label}
            </button>
          );
        })}
      </div>
    </motion.nav>
  );
}

"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*";
const NAME = "NYMISH";

export default function Hero() {
  const [decodedChars, setDecodedChars] = useState<string[]>(
    Array(NAME.length).fill("")
  );
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showLabel, setShowLabel] = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  const intervalRefs = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    // Staggered glitch decode effect
    NAME.split("").forEach((char, i) => {
      const startDelay = 400 + i * 150;
      const glitchDuration = 600;
      const glitchInterval = 50;

      setTimeout(() => {
        let count = 0;
        const maxCount = glitchDuration / glitchInterval;
        const interval = setInterval(() => {
          count++;
          setDecodedChars((prev) => {
            const next = [...prev];
            if (count >= maxCount) {
              next[i] = char;
            } else {
              next[i] = CHARS[Math.floor(Math.random() * CHARS.length)];
            }
            return next;
          });
          if (count >= maxCount) {
            clearInterval(interval);
          }
        }, glitchInterval);
        intervalRefs.current.push(interval);
      }, startDelay);
    });

    setTimeout(() => setShowLabel(true), 200);
    setTimeout(() => setShowSubtitle(true), 1800);
    setTimeout(() => setShowScroll(true), 2500);

    return () => {
      intervalRefs.current.forEach(clearInterval);
    };
  }, []);

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Label */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={showLabel ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-6"
      >
        <span className="px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] text-fg-muted text-sm font-mono tracking-widest uppercase backdrop-blur-sm">
          Full-Stack Engineer
        </span>
      </motion.div>

      {/* Name - massive glitch decode */}
      <div className="relative">
        <h1 className="text-[14vw] md:text-[12vw] font-display font-bold leading-none tracking-tighter select-none">
          {decodedChars.map((char, i) => (
            <motion.span
              key={i}
              className="inline-block gradient-text"
              initial={{ opacity: 0, y: 80, scale: 0.5 }}
              animate={{
                opacity: char ? 1 : 0.3,
                y: 0,
                scale: 1,
              }}
              transition={{
                duration: 0.5,
                delay: 0.3 + i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {char || "\u00A0"}
            </motion.span>
          ))}
        </h1>

        {/* Glitch layers */}
        <div
          className="absolute inset-0 text-[14vw] md:text-[12vw] font-display font-bold leading-none tracking-tighter select-none pointer-events-none"
          style={{
            color: "#6366f1",
            animation: "glitch-1 3s infinite",
            opacity: 0.08,
          }}
          aria-hidden="true"
        >
          {NAME}
        </div>
        <div
          className="absolute inset-0 text-[14vw] md:text-[12vw] font-display font-bold leading-none tracking-tighter select-none pointer-events-none"
          style={{
            color: "#06b6d4",
            animation: "glitch-2 3s infinite",
            opacity: 0.08,
          }}
          aria-hidden="true"
        >
          {NAME}
        </div>
      </div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={showSubtitle ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mt-6 text-lg md:text-2xl text-fg-muted font-light max-w-xl text-center px-4"
      >
        Building the future with{" "}
        <span className="gradient-text font-medium">AI</span> and{" "}
        <span className="gradient-text font-medium">distributed systems</span>
      </motion.p>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={showScroll ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="absolute bottom-12 flex flex-col items-center gap-3"
      >
        <span className="text-fg-muted text-xs font-mono tracking-[0.3em] uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border-2 border-fg-muted/30 flex justify-center pt-1.5"
        >
          <motion.div
            animate={{ opacity: [1, 0.3, 1], height: [6, 12, 6] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-0.5 bg-accent-1 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

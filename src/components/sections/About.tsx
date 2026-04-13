"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import GlowCard from "@/components/ui/GlowCard";
import TextReveal from "@/components/ui/TextReveal";
import { PERSONAL, EDUCATION, ACHIEVEMENTS } from "@/lib/constants";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const startTime = Date.now();

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.floor(eased * target);
      setCount(start);
      if (progress >= 1) clearInterval(timer);
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref} className="font-display font-bold text-5xl md:text-6xl gradient-text">
      {count}{suffix}
    </span>
  );
}

// Deterministic pseudo-random offsets per card index to avoid hydration mismatch
const CARD_OFFSETS = [
  { x: 28, y: 140, r: -3 },
  { x: -75, y: 160, r: 5 },
  { x: -50, y: 120, r: -7 },
  { x: 85, y: 180, r: 2 },
  { x: 60, y: 150, r: -4 },
];

const cardVariants = {
  hidden: (i: number) => ({
    opacity: 0,
    x: CARD_OFFSETS[i % CARD_OFFSETS.length].x,
    y: CARD_OFFSETS[i % CARD_OFFSETS.length].y,
    rotate: CARD_OFFSETS[i % CARD_OFFSETS.length].r,
    scale: 0.8,
  }),
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    y: 0,
    rotate: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      damping: 20,
      stiffness: 100,
      delay: i * 0.1,
    },
  }),
};

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-32 px-6 md:px-12 max-w-7xl mx-auto" ref={ref}>
      <TextReveal
        text="About Me"
        as="h2"
        className="text-5xl md:text-7xl font-display font-bold mb-16"
        splitBy="char"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {/* Bio - spans 2 cols */}
        <motion.div
          className="md:col-span-2"
          custom={0}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={cardVariants}
        >
          <GlowCard className="p-8 h-full">
            <p className="text-lg md:text-xl text-fg/80 leading-relaxed">
              Engineering hire{" "}
              <span className="text-accent-1 font-semibold">#3</span> at Wing Assistant,
              building an AI executive-assistant from the ground up. I specialize in{" "}
              <span className="text-accent-2 font-semibold">distributed systems</span>,{" "}
              <span className="text-accent-3 font-semibold">real-time architectures</span>,
              and{" "}
              <span className="text-accent-1 font-semibold">AI pipelines</span> that
              actually work in production. Previously led engineering at{" "}
              <span className="text-accent-2 font-semibold">bot9.ai</span>,
              shipping GenAI flows that resolved 85% of support queries autonomously.
            </p>
          </GlowCard>
        </motion.div>

        {/* Location */}
        <motion.div
          custom={1}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={cardVariants}
        >
          <GlowCard className="p-8 h-full flex flex-col justify-between" glowColor="rgba(6, 182, 212, 0.3)">
            <div className="text-fg-muted text-sm font-mono uppercase tracking-widest mb-4">Location</div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-3 h-3 rounded-full bg-accent-3" />
                <div className="absolute inset-0 w-3 h-3 rounded-full bg-accent-3 animate-ping" />
              </div>
              <span className="text-2xl font-display font-semibold">{PERSONAL.location}</span>
            </div>
            {/* Minimal grid pattern */}
            <div className="mt-4 opacity-10">
              <svg viewBox="0 0 200 80" className="w-full">
                {Array.from({ length: 10 }, (_, i) => (
                  <line key={`h${i}`} x1="0" y1={i * 8} x2="200" y2={i * 8} stroke="currentColor" strokeWidth="0.5" />
                ))}
                {Array.from({ length: 25 }, (_, i) => (
                  <line key={`v${i}`} x1={i * 8} y1="0" x2={i * 8} y2="80" stroke="currentColor" strokeWidth="0.5" />
                ))}
                <circle cx="120" cy="40" r="4" fill="#06b6d4" opacity="0.8" />
              </svg>
            </div>
          </GlowCard>
        </motion.div>

        {/* GitHub stats */}
        <motion.div
          custom={2}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={cardVariants}
        >
          <GlowCard className="p-8 h-full flex flex-col justify-center items-center text-center">
            <AnimatedCounter target={55} suffix="+" />
            <span className="text-fg-muted text-sm font-mono mt-2 tracking-widest uppercase">
              GitHub Repos
            </span>
          </GlowCard>
        </motion.div>

        {/* Education */}
        <motion.div
          custom={3}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={cardVariants}
        >
          <GlowCard className="p-8 h-full relative overflow-hidden" glowColor="rgba(168, 85, 247, 0.3)">
            {/* Circuit board pattern */}
            <div className="absolute inset-0 opacity-[0.04]">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                <path d="M20,20 L80,20 L80,60 L120,60 L120,20 L180,20" fill="none" stroke="currentColor" strokeWidth="1" />
                <path d="M20,80 L60,80 L60,120 L100,120 L100,80 L140,80 L140,140 L180,140" fill="none" stroke="currentColor" strokeWidth="1" />
                <path d="M20,160 L80,160 L80,180 L180,180" fill="none" stroke="currentColor" strokeWidth="1" />
                <circle cx="80" cy="20" r="3" fill="currentColor" />
                <circle cx="120" cy="60" r="3" fill="currentColor" />
                <circle cx="100" cy="120" r="3" fill="currentColor" />
                <circle cx="140" cy="140" r="3" fill="currentColor" />
                <circle cx="80" cy="160" r="3" fill="currentColor" />
              </svg>
            </div>
            <div className="text-fg-muted text-sm font-mono uppercase tracking-widest mb-4">Education</div>
            {EDUCATION.map((edu, i) => (
              <div key={i} className={i > 0 ? "mt-3 pt-3 border-t border-white/5" : ""}>
                <div className="font-display font-semibold text-lg">{edu.school}</div>
                <div className="text-fg-muted text-sm">{edu.degree}</div>
                <div className="text-accent-2 text-xs font-mono mt-1">{edu.period}</div>
              </div>
            ))}
          </GlowCard>
        </motion.div>

        {/* Achievements */}
        <motion.div
          custom={4}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={cardVariants}
        >
          <GlowCard className="p-8 h-full relative overflow-hidden" glowColor="rgba(245, 158, 11, 0.3)">
            {/* Golden shimmer */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(105deg, transparent 40%, rgba(245,158,11,0.1) 45%, rgba(245,158,11,0.2) 50%, rgba(245,158,11,0.1) 55%, transparent 60%)",
                animation: "shimmer 3s ease-in-out infinite",
              }}
            />
            <div className="text-fg-muted text-sm font-mono uppercase tracking-widest mb-4">Achievements</div>
            {ACHIEVEMENTS.map((achievement, i) => (
              <div key={i} className={`flex items-start gap-2 ${i > 0 ? "mt-3" : ""}`}>
                <span className="text-amber-400 mt-0.5">&#9670;</span>
                <span className="text-fg/80 text-sm">{achievement}</span>
              </div>
            ))}
          </GlowCard>
        </motion.div>
      </div>
    </section>
  );
}

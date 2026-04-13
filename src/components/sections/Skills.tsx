"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import TextReveal from "@/components/ui/TextReveal";
import { SKILLS } from "@/lib/constants";

const CATEGORY_COLORS: Record<string, string> = {
  Languages: "#6366f1",
  Backend: "#a855f7",
  Frontend: "#06b6d4",
  "AI / Data": "#f59e0b",
  Integrations: "#ec4899",
};

function SkillCategory({
  category,
  skills,
  index,
}: {
  category: string;
  skills: string[];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const color = CATEGORY_COLORS[category] || "#6366f1";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative"
    >
      {/* Category header */}
      <div className="flex items-center gap-3 mb-4">
        <motion.div
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: color }}
          animate={isInView ? { scale: [1, 1.5, 1] } : {}}
          transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.2 }}
        />
        <h3 className="text-lg font-display font-semibold text-fg/80">{category}</h3>
        <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, ${color}30, transparent)` }} />
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, j) => (
          <motion.span
            key={j}
            className="relative px-4 py-2 rounded-lg text-sm font-mono border overflow-hidden group"
            style={{
              borderColor: `${color}20`,
              backgroundColor: `${color}05`,
            }}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{
              type: "spring",
              damping: 15,
              delay: index * 0.15 + j * 0.04,
            }}
            whileHover={{
              scale: 1.05,
              borderColor: `${color}60`,
              boxShadow: `0 0 20px ${color}20`,
              y: -2,
            }}
            data-cursor="pointer"
          >
            {/* Hover glow */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle at center, ${color}15, transparent 70%)`,
              }}
            />
            <span className="relative z-10 text-fg/70 group-hover:text-fg transition-colors duration-300">
              {skill}
            </span>
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="skills" className="relative py-32 px-6 md:px-12 max-w-7xl mx-auto" ref={ref}>
      <TextReveal
        text="Tech Stack"
        as="h2"
        className="text-5xl md:text-7xl font-display font-bold mb-16"
        splitBy="char"
      />

      {/* Constellation-like SVG connecting lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03]">
        <svg className="w-full h-full" viewBox="0 0 1000 800">
          <motion.path
            d="M100,200 Q300,100 500,300 T900,200"
            fill="none"
            stroke="#6366f1"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
          <motion.path
            d="M50,400 Q250,300 450,500 T850,400"
            fill="none"
            stroke="#a855f7"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 3, delay: 0.5, ease: "easeInOut" }}
          />
          <motion.path
            d="M200,600 Q400,500 600,700 T1000,600"
            fill="none"
            stroke="#06b6d4"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 3, delay: 1, ease: "easeInOut" }}
          />
        </svg>
      </div>

      <div className="relative space-y-10">
        {Object.entries(SKILLS).map(([category, skills], i) => (
          <SkillCategory key={category} category={category} skills={skills} index={i} />
        ))}
      </div>
    </section>
  );
}

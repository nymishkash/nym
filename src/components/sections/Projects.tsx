"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import TextReveal from "@/components/ui/TextReveal";
import Marquee from "@/components/ui/Marquee";
import { PROJECTS } from "@/lib/constants";

function ProjectCard({ project, index }: { project: (typeof PROJECTS)[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <motion.div
      ref={ref}
      className={`${project.featured ? "md:col-span-2" : ""}`}
      initial={{ opacity: 0, y: 60, rotateX: -10 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{
        type: "spring",
        damping: 20,
        stiffness: 80,
        delay: index * 0.1,
      }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={cardRef}
        className="relative group rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden h-full"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{
          scale: 1.03,
          y: -8,
          boxShadow: `0 20px 60px ${project.accent}20`,
        }}
        transition={{ duration: 0.3 }}
        data-cursor="pointer"
      >
        {/* Holographic shimmer */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10"
          style={{
            opacity: isHovered ? 0.15 : 0,
            background: `linear-gradient(
              ${mousePos.x * 3.6}deg,
              transparent 20%,
              rgba(99, 102, 241, 0.3) 35%,
              rgba(168, 85, 247, 0.3) 42%,
              rgba(6, 182, 212, 0.3) 48%,
              rgba(245, 158, 11, 0.3) 55%,
              rgba(239, 68, 68, 0.3) 62%,
              transparent 80%
            )`,
          }}
        />

        {/* Border glow */}
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-500 z-0"
          style={{
            opacity: isHovered ? 1 : 0,
            boxShadow: `inset 0 0 30px ${project.accent}15, 0 0 30px ${project.accent}10`,
          }}
        />

        {/* Gradient background */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, ${project.accent}30, transparent 60%)`,
          }}
        />

        <div className="relative z-20 p-8 md:p-10">
          {/* Project name */}
          <motion.h3
            className="text-3xl md:text-4xl font-display font-bold mb-2"
            style={{
              background: `linear-gradient(135deg, ${project.accent}, #fafafa)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {project.name}
          </motion.h3>

          <p className="text-fg-muted text-lg mb-3">{project.description}</p>

          {/* Description slides up on hover */}
          <motion.p
            className="text-fg/60 text-sm leading-relaxed mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0.6, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {project.longDescription}
          </motion.p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((tech, j) => (
              <motion.span
                key={j}
                className="px-3 py-1 rounded-full text-xs font-mono border"
                style={{
                  borderColor: `${project.accent}30`,
                  backgroundColor: `${project.accent}10`,
                  color: project.accent,
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.3 + j * 0.05 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>

          {/* Links */}
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-mono transition-colors"
              style={{ color: project.accent }}
              whileHover={{ x: 4 }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              View Source &rarr;
            </motion.a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-32">
      {/* Marquee strips */}
      <div className="mb-16 space-y-2">
        <Marquee speed={40} direction="left" className="py-3 border-y border-white/5">
          <span className="text-6xl md:text-8xl font-display font-bold text-white/[0.03] uppercase tracking-wider mx-8">
            Selected Work &bull; Featured Projects &bull; Things I&apos;ve Built &bull;
          </span>
        </Marquee>
        <Marquee speed={25} direction="right" className="py-2 border-b border-white/5">
          <span className="text-3xl md:text-4xl font-display font-bold text-white/[0.02] uppercase tracking-wider mx-6">
            Code &bull; Ship &bull; Iterate &bull; Deploy &bull; Scale &bull;
          </span>
        </Marquee>
      </div>

      <div className="px-6 md:px-12 max-w-7xl mx-auto">
        <TextReveal
          text="Projects"
          as="h2"
          className="text-5xl md:text-7xl font-display font-bold mb-16"
          splitBy="char"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

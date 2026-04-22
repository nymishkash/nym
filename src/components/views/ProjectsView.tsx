"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { PROJECTS, type Project } from "@/lib/constants";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function ProjectsView() {
  const isMobile = useIsMobile();
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="relative h-[100dvh] w-screen overflow-hidden px-8 pt-14 pb-28 md:px-16 md:pt-20 md:pb-32">
      <div className="mx-auto flex h-full w-full max-w-7xl flex-col gap-8">
        <header className="flex items-baseline">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-fg-muted">
            <span className="h-px w-8 bg-fg-muted/60" />
            Projects
          </div>
        </header>

        <div
          className={`grid flex-1 min-h-0 gap-4 ${
            isMobile
              ? "grid-cols-1 overflow-y-auto pr-1"
              : "grid-cols-3 grid-rows-2"
          }`}
          onMouseLeave={() => setHovered(null)}
        >
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.name}
              project={project}
              isHovered={hovered === i}
              anyHovered={hovered !== null}
              onHover={() => setHovered(i)}
              enableTilt={!isMobile}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface ProjectCardProps {
  project: Project;
  isHovered: boolean;
  anyHovered: boolean;
  onHover: () => void;
  enableTilt: boolean;
}

function ProjectCard({
  project,
  isHovered,
  anyHovered,
  onHover,
  enableTilt,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const rawRx = useMotionValue(0);
  const rawRy = useMotionValue(0);
  const lightX = useMotionValue(50);
  const lightY = useMotionValue(50);
  const rotateX = useSpring(rawRx, { stiffness: 180, damping: 20 });
  const rotateY = useSpring(rawRy, { stiffness: 180, damping: 20 });
  const shadowX = useTransform(rawRy, (v) => -v * 2);
  const shadowY = useTransform(rawRx, (v) => v * 2);

  const boxShadow = useMotionTemplate`${shadowX}px ${shadowY}px 60px -20px ${project.accent}35, inset 0 0 0 1px rgba(255,255,255,0.02)`;
  const glowBg = useMotionTemplate`radial-gradient(circle 300px at ${lightX}% ${lightY}%, ${project.accent}22, transparent 70%)`;

  const handleMove = (e: React.MouseEvent) => {
    if (!enableTilt || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rawRy.set((px - 0.5) * 12);
    rawRx.set((0.5 - py) * 10);
    lightX.set(px * 100);
    lightY.set(py * 100);
  };

  const handleLeave = () => {
    rawRx.set(0);
    rawRy.set(0);
    lightX.set(50);
    lightY.set(50);
  };

  const dimmed = anyHovered && !isHovered;

  return (
    <motion.div
      className="relative h-full min-h-[220px]"
      style={{ perspective: 1200 }}
      animate={{ opacity: dimmed ? 0.45 : 1 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={onHover}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <motion.a
        ref={cardRef}
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="pointer"
        className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0a0a0a]/90 p-5 md:bg-white/[0.03] md:backdrop-blur-xl md:p-6"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          boxShadow,
        }}
      >
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{
            background: glowBg,
            opacity: isHovered ? 1 : 0,
            transition: "opacity 300ms ease",
          }}
        />

        {project.featured && (
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl"
            style={{
              border: `1px solid ${project.accent}55`,
              boxShadow: `inset 0 0 40px -10px ${project.accent}30`,
            }}
          />
        )}

        <div className="relative flex items-start justify-between gap-4">
          <div>
            <div
              className="mb-2 text-xs uppercase tracking-[0.2em]"
              style={{ color: project.accent }}
            >
              {project.featured ? "Featured" : "Project"}
            </div>
            <h3 className="font-[family-name:var(--font-display)] text-xl font-medium leading-tight md:text-2xl">
              {project.name}
            </h3>
            <p className="mt-1 text-xs text-fg-muted md:text-sm">{project.description}</p>
          </div>
          <motion.span
            aria-hidden
            className="text-fg-muted"
            animate={{
              x: isHovered ? 4 : 0,
              y: isHovered ? -4 : 0,
              opacity: isHovered ? 1 : 0.5,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            ↗
          </motion.span>
        </div>

        <div className="relative">
          {project.longDescription && (
            <p className="mb-3 line-clamp-3 text-xs leading-relaxed text-fg/75 md:text-[0.82rem]">
              {project.longDescription}
            </p>
          )}
          <div className="flex flex-wrap gap-1">
            {project.tech.slice(0, 3).map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/[0.08] bg-white/[0.02] px-2.5 py-1 text-[0.68rem] uppercase tracking-wider text-fg-muted"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.a>
    </motion.div>
  );
}

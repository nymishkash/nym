"use client";

import { motion } from "framer-motion";
import { EXPERIENCE, type Experience } from "@/lib/constants";

export default function WorkView() {
  return (
    <div className="relative h-[100dvh] w-screen overflow-hidden px-8 pt-14 pb-28 md:px-16 md:pt-20 md:pb-32">
      <div className="mx-auto flex h-full w-full max-w-4xl flex-col gap-8">
        <header className="flex items-baseline justify-between">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-fg-muted">
            <span className="h-px w-8 bg-fg-muted/60" />
            Work
          </div>
          <motion.a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="pointer"
            whileHover={{ x: 2 }}
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-fg-muted transition-colors hover:text-fg"
          >
            View resume
            <span className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
              ↗
            </span>
          </motion.a>
        </header>

        <div className="flex flex-1 min-h-0 flex-col gap-5 overflow-y-auto pr-1">
          {EXPERIENCE.map((exp, i) => (
            <ExperienceRow key={`${exp.company}-${i}`} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ExperienceRow({ exp, index }: { exp: Experience; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.55,
        delay: 0.1 + index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative border-t border-white/[0.08] pt-5"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
        style={{ background: exp.accent }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at 0% 0%, ${exp.accent}10, transparent 55%)`,
        }}
      />

      <div className="relative flex flex-col gap-2">
        <div className="flex items-baseline justify-between gap-3">
          <span
            className="text-xs uppercase tracking-[0.25em]"
            style={{ color: exp.accent }}
          >
            {exp.period}
          </span>
          <span className="hidden text-xs uppercase tracking-[0.25em] text-fg-muted md:inline">
            {exp.type}
          </span>
        </div>

        <h3 className="font-[family-name:var(--font-display)] text-xl font-medium leading-tight md:text-2xl">
          {exp.role}
        </h3>

        <p className="text-sm text-fg-muted">
          {exp.company}
          {exp.product && ` · ${exp.product}`} · {exp.location}
          <span className="md:hidden"> · {exp.type}</span>
        </p>

        <div className="mt-2 flex flex-wrap gap-1.5">
          {exp.tech.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/[0.08] bg-white/[0.02] px-2.5 py-1 text-[0.68rem] uppercase tracking-wider text-fg-muted"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

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

        <div className="flex flex-1 min-h-0 flex-col gap-7 overflow-y-auto pr-1">
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
      className="group relative border-l border-white/[0.08] pl-5 transition-colors duration-500 hover:border-white/20 md:pl-6"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -left-px top-1.5 h-0 w-px origin-top transition-all duration-500 group-hover:h-[calc(100%-0.75rem)]"
        style={{ background: exp.accent }}
      />
      <span
        aria-hidden
        className="absolute -left-[3px] top-1.5 h-1.5 w-1.5 rounded-full ring-4 ring-bg transition-transform duration-500 group-hover:scale-125"
        style={{ background: exp.accent }}
      />

      <div className="relative flex flex-col gap-2">
        <div className="flex items-baseline justify-between gap-3">
          <span
            className="text-[0.7rem] uppercase tracking-[0.25em]"
            style={{ color: exp.accent }}
          >
            {exp.period}
          </span>
          <span className="hidden text-[0.7rem] uppercase tracking-[0.25em] text-fg-muted md:inline">
            {exp.type}
          </span>
        </div>

        <h3 className="font-[family-name:var(--font-display)] text-xl font-medium leading-tight md:text-2xl">
          {exp.role}
        </h3>

        <p className="text-sm">
          <span className="text-fg/90">{exp.company}</span>
          {exp.product && <span className="text-fg-muted"> · {exp.product}</span>}
          <span className="text-fg-muted"> · {exp.location}</span>
          <span className="text-fg-muted md:hidden"> · {exp.type}</span>
        </p>

        {exp.bullets.length > 0 && (
          <ul className="mt-2.5 flex flex-col gap-2">
            {exp.bullets.map((bullet, b) => (
              <li
                key={b}
                className="flex gap-3 text-[0.82rem] leading-relaxed text-fg-muted"
              >
                <span
                  aria-hidden
                  className="mt-[0.5rem] h-1 w-1 flex-none rounded-full bg-fg-muted/50"
                />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
}

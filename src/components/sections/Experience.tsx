"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TiltCard from "@/components/ui/TiltCard";
import TextReveal from "@/components/ui/TextReveal";
import { EXPERIENCE } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

function TimelineNode({ color, index }: { color: string; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="relative flex items-center justify-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ type: "spring", delay: 0.2 }}
        className="w-4 h-4 rounded-full relative z-10"
        style={{ backgroundColor: color }}
      >
        {isInView && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ backgroundColor: color }}
            animate={{ scale: [1, 2.5, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
          />
        )}
      </motion.div>
    </div>
  );
}

function DataStream({ active, color }: { active: boolean; color: string }) {
  if (!active) return null;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 5 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{ backgroundColor: color, left: "50%" }}
          initial={{ top: "-10%", opacity: 0 }}
          animate={{ top: "110%", opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 1.5,
            delay: i * 0.3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    if (!lineRef.current || !sectionRef.current) return;

    const line = lineRef.current;
    const length = line.getTotalLength();
    line.style.strokeDasharray = `${length}`;
    line.style.strokeDashoffset = `${length}`;

    gsap.to(line, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%",
        end: "bottom 40%",
        scrub: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === sectionRef.current) st.kill();
      });
    };
  }, []);

  return (
    <section id="experience" className="relative py-32 px-6 md:px-12 max-w-7xl mx-auto" ref={sectionRef}>
      <TextReveal
        text="Experience"
        as="h2"
        className="text-5xl md:text-7xl font-display font-bold mb-20"
        splitBy="char"
      />

      <div className="relative">
        {/* Timeline line - centered */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 md:-translate-x-px">
          <svg className="w-1 h-full" preserveAspectRatio="none">
            {/* Background track */}
            <line x1="0.5" y1="0" x2="0.5" y2="100%" stroke="rgba(99,102,241,0.1)" strokeWidth="2" />
            {/* Animated glow line */}
            <line
              ref={lineRef}
              x1="0.5"
              y1="0"
              x2="0.5"
              y2="100%"
              stroke="url(#timeline-gradient)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="timeline-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </svg>
          <DataStream active color="#6366f1" />
        </div>

        {/* Experience cards */}
        <div className="space-y-16 md:space-y-24">
          {EXPERIENCE.map((exp, i) => {
            const isLeft = i % 2 === 0;
            return (
              <ExperienceCard key={i} exp={exp} index={i} isLeft={isLeft} />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({
  exp,
  index,
  isLeft,
}: {
  exp: (typeof EXPERIENCE)[0];
  index: number;
  isLeft: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div
      ref={ref}
      className={`relative flex items-start gap-8 ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      } flex-row`}
    >
      {/* Timeline node */}
      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 mt-8 z-10">
        <TimelineNode color={exp.accent} index={index} />
      </div>

      {/* Spacer */}
      <div className="hidden md:block w-1/2" />

      {/* Card */}
      <motion.div
        className="w-full md:w-1/2 pl-12 md:pl-0"
        style={{
          paddingLeft: isLeft ? undefined : undefined,
          paddingRight: isLeft ? undefined : undefined,
        }}
        initial={{
          opacity: 0,
          x: isLeft ? -80 : 80,
          y: 40,
        }}
        animate={
          isInView
            ? {
                opacity: 1,
                x: 0,
                y: 0,
              }
            : {}
        }
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 80,
          delay: 0.1,
        }}
      >
        <TiltCard tiltAmount={8}>
          <div
            className="p-6 md:p-8 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm"
            style={{
              boxShadow: `0 0 40px ${exp.accent}10`,
            }}
          >
            {/* Company */}
            <div className="flex items-center gap-3 mb-1">
              <h3
                className="text-2xl md:text-3xl font-display font-bold"
                style={{
                  background: `linear-gradient(135deg, ${exp.accent}, #fafafa)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {exp.company}
              </h3>
              {exp.product && (
                <span className="text-fg-muted text-sm font-mono">({exp.product})</span>
              )}
            </div>

            {/* Role + period */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-fg/80 font-medium">{exp.role}</span>
              <span
                className="px-3 py-0.5 rounded-full text-xs font-mono"
                style={{
                  backgroundColor: `${exp.accent}20`,
                  color: exp.accent,
                  border: `1px solid ${exp.accent}30`,
                }}
              >
                {exp.period}
              </span>
            </div>

            <div className="text-fg-muted text-sm mb-4">
              {exp.location} &middot; {exp.type}
            </div>

            {/* Bullets */}
            <ul className="space-y-2">
              {exp.bullets.map((bullet, j) => (
                <motion.li
                  key={j}
                  className="text-fg/70 text-sm leading-relaxed flex items-start gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + j * 0.08 }}
                >
                  <span style={{ color: exp.accent }} className="mt-1.5 text-[6px]">&#9679;</span>
                  <span>{bullet}</span>
                </motion.li>
              ))}
            </ul>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-2 mt-5">
              {exp.tech.map((tech, j) => (
                <motion.span
                  key={j}
                  className="px-2.5 py-1 rounded-md text-xs font-mono border"
                  style={{
                    borderColor: `${exp.accent}25`,
                    backgroundColor: `${exp.accent}08`,
                    color: `${exp.accent}`,
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + j * 0.05 }}
                  whileHover={{
                    y: -2,
                    boxShadow: `0 4px 20px ${exp.accent}30`,
                  }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </TiltCard>
      </motion.div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import type { ElementType } from "react";

interface TextRevealProps {
  text: string;
  as?: ElementType;
  className?: string;
  splitBy?: "word" | "char";
  staggerDelay?: number;
  delay?: number;
}

export default function TextReveal({
  text,
  as: Tag = "div",
  className = "",
  splitBy = "word",
  staggerDelay = 0.04,
  delay = 0,
}: TextRevealProps) {
  const items = splitBy === "word" ? text.split(" ") : text.split("");

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const child = {
    hidden: { y: "110%", rotateX: -80, opacity: 0 },
    visible: {
      y: "0%",
      rotateX: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  const MotionTag = motion.create(Tag as ElementType);

  return (
    <MotionTag
      className={className}
      style={{ perspective: "1000px" }}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {items.map((item, i) => (
        <span key={i} className="inline-block overflow-hidden align-baseline pb-[0.18em] -mb-[0.18em]">
          <motion.span
            className="inline-block"
            style={{ transformOrigin: "bottom" }}
            variants={child}
          >
            {item}
            {splitBy === "word" && i < items.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

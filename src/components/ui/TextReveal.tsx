"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  text: string;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  splitBy?: "word" | "char";
  staggerDelay?: number;
  delay?: number;
  trigger?: boolean;
}

export default function TextReveal({
  text,
  as: Tag = "div",
  className = "",
  splitBy = "word",
  staggerDelay = 0.03,
  delay = 0,
  trigger = true,
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const elements = containerRef.current.querySelectorAll(".reveal-item");

    if (trigger) {
      gsap.fromTo(
        elements,
        { y: "110%", rotateX: -80, opacity: 0 },
        {
          y: "0%",
          rotateX: 0,
          opacity: 1,
          duration: 0.8,
          stagger: staggerDelay,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none none",
          },
        }
      );
    } else {
      gsap.fromTo(
        elements,
        { y: "110%", rotateX: -80, opacity: 0 },
        {
          y: "0%",
          rotateX: 0,
          opacity: 1,
          duration: 0.8,
          stagger: staggerDelay,
          delay,
          ease: "power3.out",
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === containerRef.current) st.kill();
      });
    };
  }, [text, staggerDelay, delay, trigger]);

  const items = splitBy === "word" ? text.split(" ") : text.split("");

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={containerRef} className={`${className}`} style={{ perspective: "1000px" }}>
      {items.map((item, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <span className="reveal-item inline-block" style={{ transformOrigin: "bottom" }}>
            {item}
            {splitBy === "word" && i < items.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </Tag>
  );
}

"use client";

import { useRef, useEffect, useState } from "react";

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number;
  direction?: "left" | "right";
  className?: string;
  pauseOnHover?: boolean;
}

export default function Marquee({
  children,
  speed = 30,
  direction = "left",
  className = "",
  pauseOnHover = true,
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      const firstChild = containerRef.current.children[0] as HTMLElement;
      if (firstChild) {
        setContentWidth(firstChild.offsetWidth);
      }
    }
  }, [children]);

  const animationDirection = direction === "left" ? "-" : "";
  const duration = contentWidth / speed;

  return (
    <div
      className={`overflow-hidden whitespace-nowrap ${pauseOnHover ? "hover:[&>div]:pause" : ""} ${className}`}
    >
      <div
        ref={containerRef}
        className="inline-flex"
        style={{
          animationName: contentWidth ? "marquee-scroll" : undefined,
          animationDuration: contentWidth ? `${duration}s` : undefined,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          animationDirection: direction === "right" ? "reverse" : "normal",
        }}
      >
        <div className="inline-flex shrink-0">{children}</div>
        <div className="inline-flex shrink-0" aria-hidden="true">
          {children}
        </div>
        <div className="inline-flex shrink-0" aria-hidden="true">
          {children}
        </div>
        <div className="inline-flex shrink-0" aria-hidden="true">
          {children}
        </div>
      </div>
      <style jsx>{`
        @keyframes marquee-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(${animationDirection}25%);
          }
        }
        .pause {
          animation-play-state: paused !important;
        }
      `}</style>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { lerp } from "@/lib/utils";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const ringX = useRef(0);
  const ringY = useRef(0);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<HTMLDivElement[]>([]);
  const trailPositions = useRef(
    Array.from({ length: 5 }, () => ({ x: 0, y: 0 }))
  );
  const ripples = useRef<{ x: number; y: number; id: number }[]>([]);
  const [rippleList, setRippleList] = useState<{ x: number; y: number; id: number }[]>([]);
  const rippleId = useRef(0);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.dataset.cursor === "pointer"
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.dataset.cursor === "pointer"
      ) {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => {
      setIsClicking(true);
      const id = rippleId.current++;
      const newRipple = { x: cursorX.get(), y: cursorY.get(), id };
      ripples.current.push(newRipple);
      setRippleList([...ripples.current]);
      setTimeout(() => {
        ripples.current = ripples.current.filter((r) => r.id !== id);
        setRippleList([...ripples.current]);
      }, 600);
    };

    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    // Ring trailing animation
    let raf: number;
    const animate = () => {
      const cx = cursorX.get();
      const cy = cursorY.get();
      ringX.current = lerp(ringX.current, cx, 0.15);
      ringY.current = lerp(ringY.current, cy, 0.15);

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX.current - 20}px, ${ringY.current - 20}px)`;
      }

      // Update trail positions
      for (let i = trailPositions.current.length - 1; i > 0; i--) {
        trailPositions.current[i].x = lerp(
          trailPositions.current[i].x,
          trailPositions.current[i - 1].x,
          0.3
        );
        trailPositions.current[i].y = lerp(
          trailPositions.current[i].y,
          trailPositions.current[i - 1].y,
          0.3
        );
      }
      trailPositions.current[0].x = ringX.current;
      trailPositions.current[0].y = ringY.current;

      trailRefs.current.forEach((el, i) => {
        if (el) {
          const pos = trailPositions.current[i];
          const scale = 1 - i * 0.15;
          const opacity = 0.3 - i * 0.05;
          el.style.transform = `translate(${pos.x - 20}px, ${pos.y - 20}px) scale(${scale})`;
          el.style.opacity = `${opacity}`;
        }
      });

      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isMobile, cursorX, cursorY]);

  const springConfig = { damping: 25, stiffness: 300 };
  const dotX = useSpring(cursorX, springConfig);
  const dotY = useSpring(cursorY, springConfig);

  if (isMobile) return null;

  return (
    <>
      {/* Ghost trail */}
      {trailPositions.current.map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) trailRefs.current[i] = el;
          }}
          className="fixed top-0 left-0 w-10 h-10 rounded-full border pointer-events-none z-[9999]"
          style={{
            borderColor: `rgba(99, 102, 241, ${0.1 - i * 0.015})`,
          }}
        />
      ))}

      {/* Outer ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full border-2 pointer-events-none z-[9999] transition-[width,height,border-color] duration-200"
        style={{
          borderColor: isHovering ? "#a855f7" : "rgba(99, 102, 241, 0.6)",
          width: isHovering ? 60 : 40,
          height: isHovering ? 60 : 40,
          marginLeft: isHovering ? -10 : 0,
          marginTop: isHovering ? -10 : 0,
          mixBlendMode: "difference",
        }}
      />

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999]"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor: isHovering ? "#a855f7" : "#6366f1",
          scale: isClicking ? 0.5 : isHovering ? 0 : 1,
        }}
      />

      {/* Click ripples */}
      {rippleList.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="fixed pointer-events-none z-[9999] rounded-full border-2 border-accent-1"
          style={{
            left: ripple.x,
            top: ripple.y,
            translateX: "-50%",
            translateY: "-50%",
          }}
          initial={{ width: 0, height: 0, opacity: 0.8 }}
          animate={{ width: 120, height: 120, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}
    </>
  );
}

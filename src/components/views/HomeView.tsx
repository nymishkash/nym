"use client";

import { motion } from "framer-motion";
import { PERSONAL } from "@/lib/constants";
import PerspectiveLayer from "@/components/shell/PerspectiveLayer";
import TextReveal from "@/components/ui/TextReveal";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useParallaxOffset } from "@/hooks/useParallaxOffset";
import type { ViewId } from "@/lib/views";

interface HomeViewProps {
  onNavigate: (id: ViewId) => void;
}

export default function HomeView({ onNavigate }: HomeViewProps) {
  const isMobile = useIsMobile();
  const backLayer = useParallaxOffset({ rate: -0.008, enabled: !isMobile });
  const midLayer = useParallaxOffset({ rate: -0.02, enabled: !isMobile });
  const frontLayer = useParallaxOffset({ rate: -0.04, enabled: !isMobile });

  return (
    <div className="relative h-[100dvh] w-screen overflow-hidden">
      <PerspectiveLayer
        intensity={1}
        enabled={!isMobile}
        className="h-full w-full"
      >
        <div className="relative flex h-full w-full items-center justify-center px-8 md:px-20">
          <motion.div
            aria-hidden
            className="pointer-events-none absolute select-none font-[family-name:var(--font-display)] font-bold leading-none"
            style={{
              fontSize: "clamp(22rem, 32vw, 46rem)",
              color: "#fafafa",
              opacity: 0.035,
              left: "50%",
              top: "50%",
              x: "-50%",
              y: "-50%",
              translateX: backLayer.x,
              translateY: backLayer.y,
              letterSpacing: "-0.05em",
            }}
          >
            NK
          </motion.div>

          <div className="relative grid w-full max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-[1.2fr_0.8fr]">
            <motion.div
              style={{ translateX: midLayer.x, translateY: midLayer.y }}
            >
              <div className="mb-3 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-fg-muted">
                <span className="h-px w-8 bg-fg-muted/60" />
                {PERSONAL.tagline}
              </div>
              <TextReveal
                as="h1"
                text="Nymish"
                splitBy="char"
                staggerDelay={0.04}
                className="font-[family-name:var(--font-display)] font-semibold leading-[0.95] tracking-tight text-[clamp(3rem,9vw,8rem)]"
              />
              <TextReveal
                as="h1"
                text="Kashivishwanath."
                splitBy="char"
                staggerDelay={0.025}
                delay={0.25}
                className="font-[family-name:var(--font-display)] font-semibold leading-[0.95] tracking-tight text-[clamp(2.2rem,6.5vw,5.6rem)] text-fg-muted/70"
              />
            </motion.div>

            <motion.div
              className="flex flex-col gap-8 md:items-end md:text-right"
              style={{ translateX: frontLayer.x, translateY: frontLayer.y }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 1.0,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <p className="max-w-xs text-sm leading-relaxed text-fg-muted md:text-right">
                {PERSONAL.subtitle}
              </p>

              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-fg-muted">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                {PERSONAL.location}
              </div>

              <div className="flex flex-wrap gap-3 md:justify-end">
                <HomeCta
                  label="View work →"
                  onClick={() => onNavigate("work")}
                  primary
                />
                <HomeCta
                  label="Get in touch"
                  onClick={() => onNavigate("contact")}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </PerspectiveLayer>
    </div>
  );
}

function HomeCta({
  label,
  onClick,
  primary = false,
}: {
  label: string;
  onClick: () => void;
  primary?: boolean;
}) {
  return (
    <motion.button
      onClick={onClick}
      data-cursor="pointer"
      whileHover={{ y: -2 }}
      whileTap={{ y: 0, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 24 }}
      className={`rounded-full px-5 py-2.5 text-sm tracking-wide transition-colors ${
        primary
          ? "bg-fg text-bg hover:bg-fg/90"
          : "border border-white/10 bg-white/[0.03] text-fg hover:border-white/25"
      }`}
    >
      {label}
    </motion.button>
  );
}

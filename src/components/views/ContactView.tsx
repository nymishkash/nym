"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { PERSONAL } from "@/lib/constants";
import { useParallaxOffset } from "@/hooks/useParallaxOffset";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function ContactView() {
  const isMobile = useIsMobile();
  const emailParallax = useParallaxOffset({ rate: -0.02, enabled: !isMobile });
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // noop
    }
  };

  return (
    <div className="relative h-[100dvh] w-screen overflow-hidden">
      <div className="flex h-full w-full flex-col items-center justify-center gap-10 px-8 text-center">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-fg-muted">
          <span className="h-px w-8 bg-fg-muted/60" />
          Contact
          <span className="h-px w-8 bg-fg-muted/60" />
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-[family-name:var(--font-display)] text-[clamp(2.2rem,6vw,5rem)] font-semibold leading-[1.05] tracking-tight"
        >
          Let&apos;s cook
          <br />
          <span className="text-fg-muted">something cool.</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            translateX: emailParallax.x,
            translateY: emailParallax.y,
          }}
        >
          <motion.button
            type="button"
            onClick={copy}
            data-cursor="pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative inline-flex flex-col items-center gap-2"
          >
            <span className="font-[family-name:var(--font-display)] text-[clamp(1.3rem,3.2vw,2.6rem)] font-medium tracking-tight text-fg underline decoration-white/20 underline-offset-[0.3em] transition-colors group-hover:decoration-white/60">
              {PERSONAL.email}
            </span>
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.span
                  key="copied"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="text-xs uppercase tracking-[0.3em] text-emerald-400"
                >
                  Copied
                </motion.span>
              ) : (
                <motion.span
                  key="tap"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  exit={{ opacity: 0 }}
                  className="text-xs uppercase tracking-[0.3em] text-fg-muted"
                >
                  Click to copy
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 flex items-center gap-3"
        >
          <ContactLink href={PERSONAL.github} label="GitHub" />
          <span className="h-1 w-1 rounded-full bg-fg-muted/40" />
          <ContactLink href={PERSONAL.linkedin} label="LinkedIn" />
          <span className="h-1 w-1 rounded-full bg-fg-muted/40" />
          <ContactLink
            href={`mailto:${PERSONAL.email}`}
            label="Email"
            external={false}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-6 max-w-md text-sm text-fg-muted"
        >
          Open to roles, collaborations, and anything ambitious at the edge of
          AI and distributed systems.
        </motion.p>
      </div>
    </div>
  );
}

function ContactLink({
  href,
  label,
  external = true,
}: {
  href: string;
  label: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      data-cursor="pointer"
      className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-fg-muted transition-colors hover:border-white/30 hover:text-fg"
    >
      {label}
    </a>
  );
}

"use client";

import Nav from "@/components/shell/Nav";
import ParallaxBackground from "@/components/shell/ParallaxBackground";
import { usePathname } from "next/navigation";
import { getViewMeta, viewIdFromPathname } from "@/lib/views";

export default function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const accent = getViewMeta(viewIdFromPathname(pathname)).accent;

  return (
    <>
      <ParallaxBackground accent={accent} />
      {children}
      <Nav />
    </>
  );
}

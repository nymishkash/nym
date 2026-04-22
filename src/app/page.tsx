"use client";

import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import Nav from "@/components/shell/Nav";
import ParallaxBackground from "@/components/shell/ParallaxBackground";
import HomeView from "@/components/views/HomeView";
import WorkView from "@/components/views/WorkView";
import ProjectsView from "@/components/views/ProjectsView";
import ContactView from "@/components/views/ContactView";
import ViewShell from "@/components/shell/ViewShell";
import { getViewMeta, type ViewId } from "@/lib/views";

export default function Home() {
  const [view, setView] = useState<ViewId>("home");
  const accent = getViewMeta(view).accent;

  return (
    <>
      <ParallaxBackground accent={accent} />
      <AnimatePresence mode="wait">
        <ViewShell key={view}>
          {view === "home" && <HomeView onNavigate={setView} />}
          {view === "work" && <WorkView />}
          {view === "projects" && <ProjectsView />}
          {view === "contact" && <ContactView />}
        </ViewShell>
      </AnimatePresence>
      <Nav active={view} onChange={setView} />
    </>
  );
}

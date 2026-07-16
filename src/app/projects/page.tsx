import type { Metadata } from "next";
import ProjectsView from "@/components/views/ProjectsView";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected projects: RL regex environment, WageWizard AI payroll assistant, SmartCloud secrets manager, and more.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects · Nymish Kashivishwanath",
    description:
      "Selected projects: RL regex environment, WageWizard AI payroll assistant, SmartCloud secrets manager, and more.",
    url: "https://nymi.sh/projects",
  },
};

export default function ProjectsPage() {
  return <ProjectsView />;
}

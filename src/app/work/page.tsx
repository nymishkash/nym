import type { Metadata } from "next";
import WorkView from "@/components/views/WorkView";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Experience: Forward Deployed Engineer at AI Studio, Software Engineer at Wing Assistant (M32 Labs), and Full Stack Engineer at Dukaan (bot9.ai).",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Work · Nymish Kashivishwanath",
    description:
      "Experience: Forward Deployed Engineer at AI Studio, Software Engineer at Wing Assistant (M32 Labs), and Full Stack Engineer at Dukaan (bot9.ai).",
    url: "https://nymi.sh/work",
  },
};

export default function WorkPage() {
  return <WorkView />;
}

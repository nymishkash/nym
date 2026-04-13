import type { Metadata } from "next";
import { spaceGrotesk, inter } from "@/lib/fonts";
import SmoothScroll from "@/components/providers/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import GrainOverlay from "@/components/ui/GrainOverlay";
import AuroraBackground from "@/components/ui/AuroraBackground";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nymish Kashivishwanath | Full-Stack Engineer",
  description:
    "Full-stack engineer building AI-powered products and distributed systems. Currently at Wing Assistant (M32 Labs).",
  keywords: [
    "Nymish",
    "Kashivishwanath",
    "Full-Stack Engineer",
    "Software Engineer",
    "AI",
    "Distributed Systems",
    "React",
    "Next.js",
    "Node.js",
  ],
  openGraph: {
    title: "Nymish Kashivishwanath | Full-Stack Engineer",
    description: "Building the future with AI and distributed systems.",
    type: "website",
    url: "https://nymish.xyz",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nymish Kashivishwanath | Full-Stack Engineer",
    description: "Building the future with AI and distributed systems.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} antialiased bg-bg text-fg`}
      >
        <SmoothScroll>
          <AuroraBackground />
          {children}
          <GrainOverlay />
          <CustomCursor />
        </SmoothScroll>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { spaceGrotesk, inter } from "@/lib/fonts";
import GrainOverlay from "@/components/ui/GrainOverlay";
import "./globals.css";

export const metadata: Metadata = {
  title: "nymish kashivishwanath",
  description:
    "Building AI agents - and the workflows that run them at scale.",
  keywords: [
    "Nymish",
    "Kashivishwanath",
    "Full-Stack Engineer",
    "Software Engineer",
    "AI Agents",
    "Distributed Systems",
    "React",
    "Next.js",
    "Node.js",
  ],
  openGraph: {
    title: "nymish kashivishwanath",
    description: "Building AI agents - and the workflows that run them at scale.",
    type: "website",
    url: "https://nymi.sh",
  },
  twitter: {
    card: "summary_large_image",
    title: "nymish kashivishwanath",
    description: "Building AI agents - and the workflows that run them at scale.",
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
        {children}
        <GrainOverlay />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { spaceGrotesk, inter } from "@/lib/fonts";
import GrainOverlay from "@/components/ui/GrainOverlay";
import Shell from "@/components/shell/Shell";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nymi.sh"),
  title: {
    default: "Nymish Kashivishwanath",
    template: "%s · Nymish Kashivishwanath",
  },
  description: "Building AI agents - and the workflows that run them at scale.",
  keywords: [
    "Nymish",
    "Kashivishwanath",
    "Forward Deployed Engineer",
    "Software Engineer",
    "AI Agents",
    "Distributed Systems",
    "React",
    "Next.js",
    "Node.js",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Nymish Kashivishwanath",
    description: "Building AI agents - and the workflows that run them at scale.",
    type: "website",
    url: "https://nymi.sh",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nymish Kashivishwanath",
    description: "Building AI agents - and the workflows that run them at scale.",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Nymish Kashivishwanath",
  url: "https://nymi.sh",
  jobTitle: "Forward Deployed Engineer",
  worksFor: {
    "@type": "Organization",
    name: "AiStudio",
    url: "https://aistudio.ae",
  },
  sameAs: [
    "https://github.com/nymishkash",
    "https://linkedin.com/in/nymish",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bengaluru",
    addressCountry: "IN",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Shell>{children}</Shell>
        <GrainOverlay />
      </body>
    </html>
  );
}

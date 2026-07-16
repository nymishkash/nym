import type { Metadata } from "next";
import ContactView from "@/components/views/ContactView";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Nymish Kashivishwanath — open to roles and collaborations at the edge of AI and distributed systems.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact · Nymish Kashivishwanath",
    description:
      "Get in touch with Nymish Kashivishwanath — open to roles and collaborations at the edge of AI and distributed systems.",
    url: "https://nymi.sh/contact",
  },
};

export default function ContactPage() {
  return <ContactView />;
}

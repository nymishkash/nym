import type { MetadataRoute } from "next";
import { VIEWS } from "@/lib/views";

const BASE_URL = "https://nymi.sh";

export default function sitemap(): MetadataRoute.Sitemap {
  return VIEWS.map((v) => ({
    url: `${BASE_URL}${v.href === "/" ? "" : v.href}`,
    changeFrequency: "monthly",
    priority: v.href === "/" ? 1 : 0.8,
  }));
}

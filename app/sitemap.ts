import type { MetadataRoute } from "next";
import { SITE } from "@/lib/config";

// Plan du site : une seule page
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}

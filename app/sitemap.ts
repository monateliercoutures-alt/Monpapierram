import type { MetadataRoute } from "next";
import { CATEGORIES, MARQUES, PRODUITS, SITE, slugMarque } from "@/lib/config";

// Plan du site : une seule page
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE.url}/papier-rame-abidjan`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.95,
    },
    {
      url: `${SITE.url}/types-de-papier-rame-a4`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    ...CATEGORIES.map((c) => ({
      url: `${SITE.url}/categories/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...MARQUES.map((m) => ({
      url: `${SITE.url}/marques/${slugMarque(m)}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    {
      url: `${SITE.url}/livraison`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    },
    {
      url: `${SITE.url}/politique-de-retour`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    ...PRODUITS.map((p) => ({
      url: `${SITE.url}/produits/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}

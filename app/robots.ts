import type { MetadataRoute } from "next";
import { SITE } from "@/lib/config";

/**
 * Robots refusés : copie de contenu, analyse de concurrents et collecte agressive.
 * Les moteurs de recherche ET les assistants IA (ChatGPT, Claude, Perplexity, Gemini,
 * Apple, Meta…) restent autorisés pour pouvoir présenter et citer la boutique.
 * Attention : robots.txt est respecté par les robots « honnêtes » seulement.
 */
const ROBOTS_BLOQUES = [
  "Bytespider",
  "Diffbot",
  "ImagesiftBot",
  "Omgilibot",
  // Analyse de sites : trafic, SEO, technologies, archivage
  "SemrushBot",
  "AhrefsBot",
  "MJ12bot",
  "DotBot",
  "BLEXBot",
  "DataForSeoBot",
  "PetalBot",
  "BuiltWith",
  "Wappalyzer",
  "SimilarWeb",
  "rogerbot",
  "MozBot",
  "Screaming Frog SEO Spider",
  "Siteimprove",
  "Netcraft",
  "ia_archiver",
  "archive.org_bot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Tous les autres robots (Google, Bing…) : accès autorisé
      { userAgent: "*", allow: "/" },
      // Robots bloqués : accès interdit à tout le site
      { userAgent: ROBOTS_BLOQUES, disallow: "/" },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}

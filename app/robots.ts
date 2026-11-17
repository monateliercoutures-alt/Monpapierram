import type { MetadataRoute } from "next";
import { SITE } from "@/lib/config";

/**
 * Robots que l'on refuse : IA, copie de contenu et outils d'analyse de concurrents.
 * Google, Bing et les autres moteurs de recherche restent autorisés, sinon le site
 * disparaîtrait des résultats de recherche.
 * Attention : robots.txt est respecté par les robots « honnêtes » seulement ; un
 * robot malveillant peut l'ignorer.
 */
const ROBOTS_BLOQUES = [
  // IA et entraînement de modèles
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "Google-Extended",
  "PerplexityBot",
  "CCBot",
  "cohere-ai",
  "Applebot-Extended",
  "Meta-ExternalAgent",
  "Bytespider",
  "Amazonbot",
  "Diffbot",
  "ImagesiftBot",
  "Omgilibot",
  // Copie de contenu et analyse de concurrents
  "SemrushBot",
  "AhrefsBot",
  "MJ12bot",
  "DotBot",
  "BLEXBot",
  "DataForSeoBot",
  "PetalBot",
  // Analyse de sites : technologies, trafic, SEO, archivage
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

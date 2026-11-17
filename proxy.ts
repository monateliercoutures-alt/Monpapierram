import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Filtre anti-robots : refuse (403) les outils automatiques qui lisent la page pour en
 * extraire le titre, la description, etc. (scripts, extracteurs de balises meta, robots
 * de copie) et les sites qui donnent des informations sur un autre site à partir de son
 * lien (analyseurs SEO, de trafic, de technologies, tests de vitesse, archivage).
 *
 * Restent autorisés : les navigateurs, les moteurs de recherche (Google, Bing…), les
 * assistants IA (ChatGPT, Claude, Perplexity, Gemini…) et les aperçus de lien des messageries (WhatsApp, Facebook, Telegram…) pour que les liens
 * partagés s'affichent bien.
 *
 * Limite : ce filtre repose sur l'identifiant (User-Agent) envoyé par le robot. Un outil
 * qui se fait passer pour un navigateur n'est pas détecté.
 */

// Moteurs de recherche, assistants IA (ChatGPT, Claude, Perplexity, Gemini…) et aperçus
// de lien : toujours autorisés
const AUTORISES =
  /gptbot|chatgpt-user|oai-searchbot|claudebot|claude-web|claude-user|claude-searchbot|anthropic-ai|perplexitybot|perplexity-user|google-extended|googleother|meta-externalagent|meta-externalfetcher|amazonbot|cohere-ai|ccbot|mistralai-user|duckassistbot|youbot|googlebot|google-inspectiontool|adsbot-google|bingbot|bingpreview|duckduckbot|yandex|baiduspider|applebot|facebookexternalhit|facebot|whatsapp|telegrambot|twitterbot|linkedinbot|slackbot|discordbot|pinterest/i;

// Outils automatiques et robots de copie : refusés
const BLOQUES = new RegExp(
  [
    // Scripts, bibliothèques et navigateurs automatisés
    "bot|crawl|spider|scrap|fetch|python|curl|wget|httpclient|http-client|okhttp|java/|libwww|go-http|axios|node|deno|undici|php|ruby|perl|postman|insomnia|headless|phantom|puppeteer|playwright|selenium",
    // Extracteurs de balises meta et outils de vérification d'un site à partir de son lien
    "extract|meta|parser|checker|validator|analy|inspect|audit|monitor|uptime|status|w3c|check",
    // Analyseurs SEO, de trafic et de technologies : Semrush, Ahrefs, Moz, SimilarWeb, BuiltWith, Wappalyzer…
    "semrush|ahrefs|screaming|seo|serpstat|spyfu|ubersuggest|majestic|mj12|rogerbot|mozbot|moz\\.com|similarweb|similartech|builtwith|wappalyzer|whatcms|netcraft|urlscan|siteimprove|siteliner|woorank|dareboost|sucuri|zoominfo",
    // Tests de vitesse et de performance
    "lighthouse|pagespeed|gtmetrix|pingdom|webpagetest|speed-?insights|site24x7|statuscake",
    // Archivage de pages
    "ia_archiver|archive\\.org|wayback",
  ].join("|"),
  "i",
);

export function proxy(request: NextRequest) {
  const ua = request.headers.get("user-agent") ?? "";

  if (AUTORISES.test(ua)) return NextResponse.next();

  // Aucun identifiant, ou identifiant d'outil automatique : accès refusé
  if (ua.trim() === "" || BLOQUES.test(ua)) {
    return new NextResponse("Accès refusé", {
      status: 403,
      headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store" },
    });
  }

  return NextResponse.next();
}

export const config = {
  // Pages seulement : on exclut les fichiers statiques, robots.txt, sitemap et les icônes
  matcher: ["/((?!_next/|images/|robots.txt|sitemap.xml|llms.txt|icon.png|manifest.webmanifest|.*\\.(?:png|jpg|jpeg|svg|webp|ico|css|js|woff2?)$).*)"],
};

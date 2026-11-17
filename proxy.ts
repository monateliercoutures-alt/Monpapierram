import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Filtre anti-robots : refuse (403) les outils automatiques qui lisent la page pour en
 * extraire le titre, la description, etc. (scripts, extracteurs de balises meta, robots
 * de copie, analyseurs SEO).
 *
 * Restent autorisés : les navigateurs, les moteurs de recherche (Google, Bing…) et les
 * aperçus de lien des messageries (WhatsApp, Facebook, Telegram…) pour que les liens
 * partagés s'affichent bien.
 *
 * Limite : ce filtre repose sur l'identifiant (User-Agent) envoyé par le robot. Un outil
 * qui se fait passer pour un navigateur n'est pas détecté.
 */

// Moteurs de recherche et aperçus de lien : toujours autorisés
const AUTORISES =
  /googlebot|google-inspectiontool|adsbot-google|bingbot|bingpreview|duckduckbot|yandex|baiduspider|applebot|facebookexternalhit|facebot|whatsapp|telegrambot|twitterbot|linkedinbot|slackbot|discordbot|pinterest/i;

// Outils automatiques et robots de copie : refusés
const BLOQUES =
  /bot|crawl|spider|scrap|fetch|python|curl|wget|httpclient|http-client|okhttp|java\/|libwww|go-http|axios|node|deno|undici|php|ruby|perl|postman|insomnia|headless|phantom|puppeteer|playwright|selenium|lighthouse|gtmetrix|pingdom|semrush|ahrefs|screaming|seo|extract|meta|parser|checker|validator|analy/i;

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
  matcher: ["/((?!_next/|images/|robots.txt|sitemap.xml|icon.png|.*\\.(?:png|jpg|jpeg|svg|webp|ico|css|js|woff2?)$).*)"],
};

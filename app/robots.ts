import type { MetadataRoute } from "next";
import { SITE } from "@/lib/config";

/**
 * robots.txt : tous les robots sont autorisés et le sitemap est indiqué.
 * Le blocage des robots indésirables (copie, analyse de concurrents) se fait côté
 * serveur dans proxy.ts, et non ici : une liste « Disallow » dans robots.txt est
 * signalée comme avertissement par Lighthouse et ne protège pas des robots malhonnêtes.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}

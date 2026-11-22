import type { MetadataRoute } from "next";
import { SITE } from "@/lib/config";

// Manifeste : nom et couleurs quand le site est ajouté à l'écran d'accueil d'un téléphone
export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: `${SITE.nom} : papier rame A4 en Côte d'Ivoire`,
    short_name: SITE.nom,
    description: "Boutique de papier rame A4 : Double A, Paper One, Globulus et plus. Commandez, livraison partout en Côte d'Ivoire.",
    start_url: "/?source=app",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#ffffff",
    theme_color: "#0a2a8f",
    lang: "fr",
    categories: ["shopping", "business"],
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "Tous les produits", url: "/papier-rame-abidjan", icons: [{ src: "/icon-192.png", sizes: "192x192" }] },
      { name: "Papier rame A4", url: "/categories/papier-rame-a4", icons: [{ src: "/icon-192.png", sizes: "192x192" }] },
      { name: "Livraison", url: "/livraison", icons: [{ src: "/icon-192.png", sizes: "192x192" }] },
    ],
  };
}

import type { MetadataRoute } from "next";
import { SITE } from "@/lib/config";

// Manifeste : nom et couleurs quand le site est ajouté à l'écran d'accueil d'un téléphone
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.nom,
    short_name: SITE.nom,
    description: "Papier rame A4 Double A en Côte d'Ivoire, livraison partout dans le pays.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0a2a8f",
    lang: "fr",
    icons: [{ src: "/icon.png", sizes: "512x512", type: "image/png" }],
  };
}

import type { NextConfig } from "next";
import { ANCIENS_SLUGS } from "./lib/config";

// Configuration Next.js (compatible Vercel et Netlify)
const nextConfig: NextConfig = {
  // Anciennes adresses des pages produit : redirection permanente vers les nouvelles
  async redirects() {
    return Object.entries(ANCIENS_SLUGS).map(([ancien, nouveau]) => ({
      source: `/produits/${ancien}`,
      destination: `/produits/${nouveau}`,
      permanent: true,
    }));
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

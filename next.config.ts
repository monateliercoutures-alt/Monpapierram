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
  // En-têtes de sécurité envoyés sur toutes les pages
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        ],
      },
    ];
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

import type { NextConfig } from "next";
import { ANCIENS_SLUGS } from "./lib/config";

// Configuration Next.js (compatible Vercel et Netlify)
// Politique de sécurité du contenu : le site ne charge que ses propres ressources.
// 'unsafe-inline' est requis par Next.js pour ses scripts intégrés et les données structurées.
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "worker-src 'self'",
  "manifest-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  // Ne pas annoncer la technologie utilisée dans les en-têtes de réponse
  poweredByHeader: false,
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
          { key: "Content-Security-Policy", value: CSP },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        ],
      },
      {
        // Le service worker ne doit jamais rester en cache : les mises à jour de l'application arrivent tout de suite
        source: "/sw.js",
        headers: [
          { key: "Cache-Control", value: "no-cache, no-store, must-revalidate" },
          { key: "Content-Type", value: "application/javascript; charset=utf-8" },
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

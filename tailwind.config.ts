import type { Config } from "tailwindcss";

/**
 * Palette Monpapierram, inspirée du bleu Double A.
 * Chargé depuis globals.css avec la directive @config.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        profond: "#0a2a8f", // bleu profond
        nuit: "#0b1b4d", // bleu nuit
        cyan: "#1fa3e8", // cyan
        brume: "#f3f6fc", // gris bleuté très clair
        encre: "#16213e", // texte
      },
      fontFamily: {
        titre: ["var(--font-titre)", "system-ui", "sans-serif"],
        texte: ["var(--font-texte)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        carte: "12px",
        bouton: "8px",
      },
    },
  },
};

export default config;

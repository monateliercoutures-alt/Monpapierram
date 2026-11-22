"use client";

import { useEffect } from "react";

/**
 * Service worker invisible : pages déjà vues disponibles hors connexion et ouvertures plus rapides.
 * Aucune invite d'installation n'est affichée : le site s'utilise directement dans le navigateur.
 */
export default function EnregistrerApp() {
  useEffect(() => {
    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      navigator.serviceWorker.register("/sw.js", { scope: "/", updateViaCache: "none" }).catch(() => {});
    }
  }, []);
  return null;
}

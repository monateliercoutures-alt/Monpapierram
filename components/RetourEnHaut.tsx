"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Remonte en haut de la page à chaque changement de page (catégories, produits…),
// sauf quand l'adresse contient une ancre (#comparatif…).
export default function RetourEnHaut() {
  const pathname = usePathname();
  useEffect(() => {
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

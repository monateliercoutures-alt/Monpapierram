"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { SITE } from "@/lib/config";
import { usePanier } from "./PanierContext";

// Liens du menu principal
const LIENS = [
  { href: "#produits", label: "Produits" },
  { href: "#avantages", label: "Avantages" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

// En-tête collant : logo, menu, bouton panier avec compteur
export default function Header() {
  const [ouvert, setOuvert] = useState(false);
  const { nombre, ouvrir } = usePanier();

  // Fermer le menu mobile avec la touche Échap
  useEffect(() => {
    if (!ouvert) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOuvert(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [ouvert]);

  return (
    <header className="sticky top-0 z-50 border-b border-profond/15 bg-white">
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:rounded-bouton focus:bg-profond focus:px-4 focus:py-2 focus:text-white"
      >
        Aller au contenu
      </a>

      <div className="mx-auto flex h-20 sm:h-24 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#" aria-label={`${SITE.nom} - accueil`} className="shrink-0">
          <Image src="/images/logo.png" alt={SITE.nom} width={895} height={268} priority className="h-[3.6rem] w-auto sm:h-[4.2rem]" />
        </a>

        <nav aria-label="Navigation principale" className="hidden items-center gap-7 lg:flex">
          {LIENS.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-encre/80 hover:text-profond">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Bouton panier */}
          <button
            type="button"
            onClick={ouvrir}
            aria-label={`Ouvrir le panier, ${nombre} article${nombre > 1 ? "s" : ""}`}
            className="relative inline-flex h-11 items-center gap-2 rounded-bouton bg-profond px-4 text-sm font-semibold text-white hover:bg-nuit"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 4h2l2.2 11h10.6L20 7H6.2" />
              <circle cx="9" cy="19.5" r="1.3" />
              <circle cx="17" cy="19.5" r="1.3" />
            </svg>
            <span className="hidden sm:inline">Panier</span>
            <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-xs font-bold text-profond">{nombre}</span>
          </button>

          {/* Menu hamburger (mobile et tablette) */}
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-bouton border border-profond/20 text-profond lg:hidden"
            aria-expanded={ouvert}
            aria-controls="menu-mobile"
            aria-label={ouvert ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setOuvert((o) => !o)}
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {ouvert ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {ouvert && (
        <div id="menu-mobile" className="border-t border-profond/10 bg-white lg:hidden">
          <nav aria-label="Navigation mobile" className="mx-auto flex max-w-6xl flex-col px-4 py-2">
            {LIENS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOuvert(false)} className="flex min-h-12 items-center border-b border-profond/10 text-base font-medium text-encre last:border-0">
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

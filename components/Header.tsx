"use client";

import { useEffect, useState } from "react";
import { SITE, MESSAGE_GENERAL, lienWhatsApp } from "@/lib/config";
import { IconeWhatsApp } from "./Icones";

// Liens du menu principal
const LIENS = [
  { href: "#produits", label: "Produits" },
  { href: "#avantages", label: "Avantages" },
  { href: "#livraison", label: "Livraison" },
  { href: "#contact", label: "Contact" },
];

// En-tête fixe avec menu hamburger sur mobile
export default function Header() {
  const [ouvert, setOuvert] = useState(false);
  const [defile, setDefile] = useState(false);

  // Ombre légère et bordure renforcée dès que la page défile
  useEffect(() => {
    const onScroll = () => setDefile(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fermer le menu avec la touche Échap
  useEffect(() => {
    if (!ouvert) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOuvert(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [ouvert]);

  // En haut de page (sur le hero sombre) : en-tête transparent, texte blanc
  const sombre = !defile && !ouvert;
  const lienCommande = lienWhatsApp(MESSAGE_GENERAL);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md transition-all duration-300 motion-reduce:transition-none ${
        defile || ouvert ? "border-profond/15 bg-white/95 shadow-[0_1px_12px_rgba(11,27,77,0.06)]" : "border-white/10 bg-nuit/30"
      }`}>
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:rounded-bouton focus:bg-profond focus:px-4 focus:py-2 focus:text-white"
      >
        Aller au contenu
      </a>

      <div
        className={`mx-auto flex max-w-6xl items-center justify-between px-4 transition-all duration-300 motion-reduce:transition-none sm:px-6 ${
          defile ? "h-14" : "h-16"
        }`}
      >
        {/* Logo texte */}
        <a href="#" className={`font-titre text-xl font-bold tracking-tight transition-colors ${sombre ? "text-white" : "text-profond"}`} aria-label={`${SITE.nom} - accueil`}>
          Mon<span className="text-cyan">papier</span>ram
        </a>

        {/* Menu ordinateur */}
        <nav aria-label="Navigation principale" className="hidden items-center gap-8 md:flex">
          {LIENS.map((l) => (
            <a key={l.href} href={l.href} className={`text-sm font-medium transition-colors ${sombre ? "text-white/85 hover:text-white" : "text-encre/80 hover:text-profond"}`}>
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href={lienCommande}
          target="_blank"
          rel="noopener noreferrer"
          className={`hidden min-h-11 items-center gap-2 rounded-bouton px-4 text-sm font-semibold transition-colors md:inline-flex ${sombre ? "bg-white text-nuit hover:bg-brume" : "bg-profond text-white hover:bg-nuit"}`}
        >
          <IconeWhatsApp className="h-4 w-4" />
          Commander sur WhatsApp
        </a>

        {/* Bouton hamburger (mobile) */}
        <button
          type="button"
          className={`inline-flex h-11 w-11 items-center justify-center rounded-bouton border md:hidden ${sombre ? "border-white/30 text-white" : "border-profond/15 text-profond"}`}
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

      {/* Panneau mobile */}
      {ouvert && (
        <div id="menu-mobile" className="border-t border-profond/10 bg-white md:hidden">
          <nav aria-label="Navigation mobile" className="mx-auto flex max-w-6xl flex-col px-4 py-3">
            {LIENS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOuvert(false)}
                className="flex min-h-12 items-center border-b border-profond/10 text-base font-medium text-encre"
              >
                {l.label}
              </a>
            ))}
            <a
              href={lienCommande}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 mb-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-bouton bg-profond px-4 font-semibold text-white"
            >
              <IconeWhatsApp />
              Commander sur WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

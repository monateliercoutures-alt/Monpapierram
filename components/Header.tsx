"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MARQUES, SITE, slugMarque } from "@/lib/config";
import { usePanier } from "./PanierContext";
import BarreInfo from "./BarreInfo";
import RechercheProduits from "./RechercheProduits";


// En-tête collant : logo, menu, bouton panier avec compteur
export default function Header() {
  const [recherche, setRecherche] = useState(false);
  const { nombre, ouvrir } = usePanier();


  return (
    <header className="sticky top-0 z-50 border-b border-profond/15 bg-white">
      <BarreInfo />
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:rounded-bouton focus:bg-profond focus:px-4 focus:py-2 focus:text-white"
      >
        Aller au contenu
      </a>

      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-4 px-4 sm:h-24 sm:px-6 xl:max-w-none xl:px-[max(1.5rem,6vw)]">
        <Link href="/" aria-label={`${SITE.nom} - accueil`} className="shrink-0">
          <Image src="/images/logo.png" alt={SITE.nom} width={895} height={268} priority className="h-[3.6rem] w-auto sm:h-[4.2rem]" />
        </Link>

        {/* Recherche de produits (ordinateur) */}
        <div className="hidden max-w-xl flex-1 lg:block">
          <RechercheProduits />
        </div>

        <div className="flex items-center gap-2">
          {/* Recherche (mobile) */}
          <button
            type="button"
            onClick={() => setRecherche((r) => !r)}
            aria-expanded={recherche}
            aria-label="Rechercher un produit"
            className="inline-flex h-11 w-11 items-center justify-center rounded-bouton border border-profond/20 text-profond lg:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="6.5" />
              <path d="M16 16l4 4" />
            </svg>
          </button>

          {/* Bouton panier */}
          <button
            type="button"
            onClick={ouvrir}
            aria-label={`Ouvrir le panier, ${nombre} article${nombre > 1 ? "s" : ""}`}
            className="relative hidden h-11 items-center gap-2 rounded-bouton bg-profond px-4 md:inline-flex text-sm font-semibold text-white hover:bg-nuit"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 4h2l2.2 11h10.6L20 7H6.2" />
              <circle cx="9" cy="19.5" r="1.3" />
              <circle cx="17" cy="19.5" r="1.3" />
            </svg>
            <span className="hidden sm:inline">Panier</span>
            {nombre > 0 && (
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-xs font-bold text-profond">{nombre}</span>
            )}
          </button>

        </div>
      </div>

      {/* Rayons : accès direct aux marques (ordinateur) */}
      <nav aria-label="Marques de papier rame" className="hidden border-t border-profond/10 bg-brume lg:block">
        <ul className="mx-auto flex max-w-6xl items-center gap-1 overflow-x-auto whitespace-nowrap px-4 sm:px-6 xl:max-w-none xl:px-[max(1.5rem,6vw)]">
          <li>
            <Link href="/papier-rame-abidjan" className="inline-flex h-10 items-center px-3 text-sm font-bold text-profond hover:underline">
              Tous les produits
            </Link>
          </li>
          {MARQUES.map((m) => (
            <li key={m}>
              <Link href={`/marques/${slugMarque(m)}`} className="inline-flex h-10 items-center px-3 text-sm font-medium text-encre/80 hover:text-profond">
                {m}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {recherche && (
        <div className="border-t border-profond/10 bg-brume px-4 py-2 lg:hidden">
          <RechercheProduits autoFocus onChoisi={() => setRecherche(false)} />
        </div>
      )}

    </header>
  );
}

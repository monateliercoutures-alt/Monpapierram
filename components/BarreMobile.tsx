"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MARQUES, slugMarque } from "@/lib/config";
import { usePanier } from "./PanierContext";

const icone = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "h-6 w-6",
  "aria-hidden": true,
};

/** Barre de navigation fixe en bas sur mobile : Accueil, Catégories, Panier */
export default function BarreMobile() {
  const pathname = usePathname();
  const { nombre, ouvrir } = usePanier();
  const [cats, setCats] = useState(false);

  // Ferme la liste des catégories à chaque changement de page
  useEffect(() => setCats(false), [pathname]);

  const actif = "text-profond";
  const normal = "text-encre/70";
  const bouton = "flex min-h-14 flex-1 flex-col items-center justify-center gap-0.5 text-xs font-semibold";

  return (
    <>
      {cats && (
        <div className="fixed inset-0 z-40 md:hidden">
          <button type="button" aria-label="Fermer les catégories" onClick={() => setCats(false)} className="absolute inset-0 bg-black/40" />
          <div role="dialog" aria-label="Catégories" className="absolute inset-x-0 bottom-16 rounded-t-carte border-t border-profond/15 bg-white p-4 shadow-lg">
            <p className="text-base font-bold text-nuit">Catégories</p>
            <ul className="mt-2 divide-y divide-profond/10">
              <li>
                <Link href="/papier-rame-abidjan" className="flex min-h-12 items-center font-semibold text-profond">Tous les produits</Link>
              </li>
              {MARQUES.map((m) => (
                <li key={m}>
                  <Link href={`/marques/${slugMarque(m)}`} className="flex min-h-12 items-center justify-between text-encre">
                    Papier rame {m}
                    <span aria-hidden="true" className="text-encre/40">›</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <nav aria-label="Navigation mobile" className="fixed inset-x-0 bottom-0 z-50 flex border-t border-profond/15 bg-white pb-[env(safe-area-inset-bottom)] md:hidden">
        <Link href="/" className={`${bouton} ${pathname === "/" && !cats ? actif : normal}`}>
          <svg {...icone}>
            <path d="M4 11l8-7 8 7" />
            <path d="M6 10v10h12V10" />
          </svg>
          Accueil
        </Link>
        <button type="button" onClick={() => setCats((c) => !c)} aria-expanded={cats} className={`${bouton} ${cats || pathname.startsWith("/marques") ? actif : normal}`}>
          <svg {...icone}>
            <rect x="4" y="4" width="6.5" height="6.5" rx="1" />
            <rect x="13.5" y="4" width="6.5" height="6.5" rx="1" />
            <rect x="4" y="13.5" width="6.5" height="6.5" rx="1" />
            <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1" />
          </svg>
          Catégories
        </button>
        <button type="button" onClick={ouvrir} className={`${bouton} relative ${normal}`}>
          <span className="relative">
            <svg {...icone}>
              <path d="M3 4h2l2.2 11h10.6L20 7H6.2" />
              <circle cx="9" cy="19.5" r="1.3" />
              <circle cx="17" cy="19.5" r="1.3" />
            </svg>
            {nombre > 0 && (
              <span className="absolute -right-2.5 -top-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-profond px-1 text-[0.7rem] font-bold text-white">{nombre}</span>
            )}
          </span>
          Panier
        </button>
      </nav>
    </>
  );
}

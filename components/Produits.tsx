"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { MARQUES, PRODUITS, slugMarque, type Produit } from "@/lib/config";
import ProduitCarte from "./ProduitCarte";
import Titre from "./Titre";

type Tri = "defaut" | "prix-asc" | "prix-desc";

// Catalogue : filtres par marque, recherche, tri par prix ; tous les produits sont dans la page (lisibles par Google)
export default function Produits() {
  const [marque, setMarque] = useState<string>("Toutes");
  const [q, setQ] = useState("");
  const [tri, setTri] = useState<Tri>("defaut");

  const liste = useMemo(() => {
    const mot = q.trim().toLowerCase();
    let l: Produit[] = PRODUITS.filter((p) => (marque === "Toutes" || p.marque === marque) && (!mot || `${p.nom} ${p.marque} ${p.specs}`.toLowerCase().includes(mot)));
    if (tri !== "defaut") {
      l = [...l].sort((a, b) => ((a.prix ?? 0) - (b.prix ?? 0)) * (tri === "prix-asc" ? 1 : -1));
    }
    return l;
  }, [marque, q, tri]);

  const groupe = marque === "Toutes" && !q.trim() && tri === "defaut";

  return (
    <section id="produits" className="bg-white px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <Titre titre="Nos produits" texte="Papier rame A4 Double A, Paper One, Globulus, Paper Pro, Authentik et Smart Copy, livré partout en Côte d'Ivoire." />

        {/* Barre de filtres */}
        <div className="mt-8 rounded-carte border border-profond/15 bg-brume p-3 sm:p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <label className="relative flex-1">
              <span className="sr-only">Rechercher un produit</span>
              <svg viewBox="0 0 24 24" className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-encre/50" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <circle cx="11" cy="11" r="6.5" />
                <path d="M16 16l4 4" />
              </svg>
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Rechercher : carton, Globulus, 80g…"
                className="h-12 w-full rounded-bouton border border-profond/20 bg-white pl-10 pr-3 text-base text-encre placeholder:text-encre/50"
              />
            </label>
            <label className="flex items-center gap-2 text-sm text-encre/80">
              <span className="whitespace-nowrap font-semibold">Trier par</span>
              <select value={tri} onChange={(e) => setTri(e.target.value as Tri)} className="h-12 rounded-bouton border border-profond/20 bg-white px-3 text-base text-encre">
                <option value="defaut">Pertinence</option>
                <option value="prix-asc">Prix croissant</option>
                <option value="prix-desc">Prix décroissant</option>
              </select>
            </label>
          </div>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Filtrer par marque">
            {["Toutes", ...MARQUES].map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMarque(m)}
                aria-pressed={marque === m}
                className={`inline-flex min-h-11 shrink-0 items-center rounded-full border px-4 text-sm font-semibold transition ${
                  marque === m ? "border-profond bg-profond text-white" : "border-profond/25 bg-white text-profond hover:border-profond"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
        <p className="mt-4 text-sm text-encre/70" aria-live="polite">
          {liste.length} produit{liste.length > 1 ? "s" : ""}
        </p>

        {liste.length === 0 && (
          <p className="mt-6 rounded-carte border border-profond/15 p-6 text-center text-encre/80">
            Aucun produit ne correspond. Essayez un autre mot, ou écrivez-nous sur WhatsApp.
          </p>
        )}

        {groupe ? (
          MARQUES.map((m) => {
            const l = liste.filter((p) => p.marque === m);
            if (!l.length) return null;
            return (
              <div key={m} className="mt-10 first:mt-6">
                <h3 className="flex items-center justify-between gap-4 border-b border-profond/15 pb-2 text-lg font-bold text-nuit">
                  <Link href={`/marques/${slugMarque(m)}`} className="hover:underline">
                    Papier rame {m}
                  </Link>
                  <Link href={`/marques/${slugMarque(m)}`} className="inline-flex min-h-8 items-center whitespace-nowrap text-sm font-semibold text-profond underline" aria-label={`Voir tous les produits Papier rame ${m}`}>
                    Voir la marque →
                  </Link>
                </h3>
                <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {l.map((p) => (
                    <ProduitCarte key={p.id} p={p} />
                  ))}
                </ul>
              </div>
            );
          })
        ) : (
          <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {liste.map((p) => (
              <ProduitCarte key={p.id} p={p} />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

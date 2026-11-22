"use client";

import { useState } from "react";
import { PRODUITS, type Produit } from "@/lib/config";
import ProduitCarte from "./ProduitCarte";
import Titre from "./Titre";

// Catalogue : grille de produits (la recherche est dans l'en-tête) ; tous les produits sont dans la page (lisibles par Google)
export default function Produits() {
  // Par défaut, 6 produits sont visibles ; les autres se déplient (ils restent dans la page pour Google)
  const [toutVoir, setToutVoir] = useState(false);
  const liste: Produit[] = PRODUITS;
  const limite = toutVoir ? liste.length : 6;

  return (
    <section id="produits" className="bg-white px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <Titre titre="Nos produits" texte="Papier rame A4 Double A, Paper One, Globulus, Paper Pro, Authentik, Smart Copy, Ultima Copy, Roch, Aone, Aria, Royal Touch et Beifa, livré partout en Côte d'Ivoire." />

        <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {liste.map((p, i) => (
            <ProduitCarte key={p.id} p={p} className={i >= limite ? "hidden" : ""} />
          ))}
        </ul>

        {liste.length > 6 && (
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => setToutVoir((v) => !v)}
              aria-expanded={toutVoir}
              className="inline-flex min-h-12 items-center rounded-bouton border border-profond px-8 font-semibold text-profond hover:bg-profond hover:text-white"
            >
              {toutVoir ? "Voir moins de produits" : `Voir les ${liste.length - 6} autres produits`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

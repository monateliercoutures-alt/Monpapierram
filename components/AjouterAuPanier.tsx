"use client";

import { useState } from "react";
import { usePanier } from "./PanierContext";

/** Sélecteur de quantité + bouton « Ajouter au panier » d'une carte produit */
export default function AjouterAuPanier({ id, nom, minQty }: { id: string; nom: string; minQty: number }) {
  const { ajouter } = usePanier();
  const [qty, setQty] = useState(minQty);

  return (
    <div className="flex items-stretch gap-2">
      <div className="flex items-center rounded-bouton border border-profond/25" role="group" aria-label={`Quantité : ${nom}`}>
        <button
          type="button"
          onClick={() => setQty((q) => Math.max(minQty, q - 1))}
          disabled={qty <= minQty}
          aria-label="Diminuer la quantité"
          className="flex h-11 w-11 items-center justify-center text-lg text-profond disabled:text-encre/30"
        >
          −
        </button>
        <span className="min-w-8 text-center text-sm font-semibold tabular-nums" aria-live="polite">
          {qty}
        </span>
        <button
          type="button"
          onClick={() => setQty((q) => Math.min(999, q + 1))}
          aria-label="Augmenter la quantité"
          className="flex h-11 w-11 items-center justify-center text-lg text-profond"
        >
          +
        </button>
      </div>
      <button
        type="button"
        onClick={() => ajouter(id, qty)}
        className="inline-flex min-h-11 flex-1 items-center justify-center rounded-bouton bg-profond px-4 text-sm font-semibold text-white transition-colors hover:bg-nuit"
      >
        Ajouter au panier
        <span className="sr-only"> : {nom}</span>
      </button>
    </div>
  );
}

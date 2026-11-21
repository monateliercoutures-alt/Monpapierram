"use client";

import { useEffect, useState } from "react";
import { formatPrix } from "@/lib/config";
import { usePanier } from "./PanierContext";

/** Sélecteur de quantité + bouton « Ajouter au panier » d'une carte produit */
export default function AjouterAuPanier({ id, nom, minQty, prix }: { id: string; nom: string; minQty: number; prix?: number | null }) {
  const { ajouter } = usePanier();
  const [qty, setQty] = useState(minQty);
  const [ajoute, setAjoute] = useState(false);

  // Le message « Ajouté » disparaît après 2 secondes
  useEffect(() => {
    if (!ajoute) return;
    const t = setTimeout(() => setAjoute(false), 2000);
    return () => clearTimeout(t);
  }, [ajoute]);

  return (
    <div>
    {prix != null && (
      <p className="mb-2 text-sm text-encre/80" aria-live="polite">
        Total : <strong className="text-nuit">{formatPrix(prix * qty)}</strong>
      </p>
    )}
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
        onClick={() => {
          ajouter(id, qty);
          setAjoute(true);
        }}
        className={`inline-flex min-h-11 flex-1 items-center justify-center rounded-bouton px-4 text-sm font-semibold text-white transition-colors ${ajoute ? "bg-[#0b7a4b]" : "bg-profond hover:bg-nuit"}`}
      >
        {ajoute ? "Ajouté ✓" : "Ajouter au panier"}
        <span className="sr-only"> : {nom}</span>
      </button>
    </div>
    </div>
  );
}

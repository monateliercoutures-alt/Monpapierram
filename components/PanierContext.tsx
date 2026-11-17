"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { trouverProduit } from "@/lib/config";
import PanierTiroir from "./PanierTiroir";

/** Une ligne du panier : identifiant produit + quantité */
export type Ligne = { id: string; qty: number };

type Panier = {
  lignes: Ligne[];
  nombre: number; // nombre total d'articles
  sousTotal: number; // en FCFA
  ouvert: boolean;
  ouvrir: () => void;
  fermer: () => void;
  ajouter: (id: string, qty: number) => void;
  changerQty: (id: string, qty: number) => void;
  vider: () => void;
};

const Ctx = createContext<Panier | null>(null);
const CLE = "monpapierram-panier";

/** Accès au panier depuis n'importe quel composant client */
export function usePanier(): Panier {
  const c = useContext(Ctx);
  if (!c) throw new Error("usePanier doit être utilisé dans <PanierProvider>");
  return c;
}

/** Fournit le panier (enregistré dans le navigateur) et affiche le tiroir */
export default function PanierProvider({ children }: { children: React.ReactNode }) {
  const [lignes, setLignes] = useState<Ligne[]>([]);
  const [ouvert, setOuvert] = useState(false);
  const [pret, setPret] = useState(false);

  // Chargement du panier enregistré (le stockage peut être indisponible)
  useEffect(() => {
    try {
      const brut = localStorage.getItem(CLE);
      if (brut) {
        const lu: unknown = JSON.parse(brut);
        if (Array.isArray(lu)) {
          setLignes(
            lu
              .filter((l): l is Ligne => !!l && typeof l.id === "string" && Number.isInteger(l.qty) && l.qty > 0 && l.qty <= 999)
              .filter((l) => trouverProduit(l.id)),
          );
        }
      }
    } catch {
      /* stockage indisponible : on part d'un panier vide */
    }
    setPret(true);
  }, []);

  // Sauvegarde à chaque modification
  useEffect(() => {
    if (!pret) return;
    try {
      localStorage.setItem(CLE, JSON.stringify(lignes));
    } catch {
      /* ignoré */
    }
  }, [lignes, pret]);

  const ajouter = useCallback((id: string, qty: number) => {
    setLignes((prec) => {
      const existe = prec.find((l) => l.id === id);
      if (existe) return prec.map((l) => (l.id === id ? { ...l, qty: l.qty + qty } : l));
      return [...prec, { id, qty }];
    });
    setOuvert(true);
  }, []);

  // En dessous de la quantité minimale du produit, la ligne est retirée
  const changerQty = useCallback((id: string, qty: number) => {
    const min = trouverProduit(id)?.minQty ?? 1;
    setLignes((prec) =>
      qty < min ? prec.filter((l) => l.id !== id) : prec.map((l) => (l.id === id ? { ...l, qty: Math.min(qty, 999) } : l)),
    );
  }, []);

  const vider = useCallback(() => setLignes([]), []);

  const valeur = useMemo<Panier>(() => {
    const nombre = lignes.reduce((n, l) => n + l.qty, 0);
    const sousTotal = lignes.reduce((t, l) => t + l.qty * (trouverProduit(l.id)?.prix ?? 0), 0);
    return {
      lignes,
      nombre,
      sousTotal,
      ouvert,
      ouvrir: () => setOuvert(true),
      fermer: () => setOuvert(false),
      ajouter,
      changerQty,
      vider,
    };
  }, [lignes, ouvert, ajouter, changerQty, vider]);

  return (
    <Ctx.Provider value={valeur}>
      {children}
      <PanierTiroir />
    </Ctx.Provider>
  );
}

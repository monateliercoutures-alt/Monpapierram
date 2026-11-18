"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { COMMUNES, MODES_PAIEMENT, SITE, formatPrix, formatPrixTexte, lienWhatsApp, trouverProduit } from "@/lib/config";
import { usePanier } from "./PanierContext";

type Etape = "panier" | "infos" | "envoye";

const champ =
  "mt-1 block min-h-11 w-full rounded-bouton border border-profond/25 bg-white px-3 text-base text-encre placeholder:text-encre/40";

/** Tiroir latéral : panier, informations de livraison, confirmation */
export default function PanierTiroir() {
  const { lignes, nombre, sousTotal, ouvert, fermer, changerQty, vider } = usePanier();
  const [etape, setEtape] = useState<Etape>("panier");
  const [reference, setReference] = useState("");
  const [lienEnvoi, setLienEnvoi] = useState("");
  const [erreur, setErreur] = useState("");
  const boutonFermer = useRef<HTMLButtonElement>(null);

  // À l'ouverture : focus, blocage du défilement, fermeture avec Échap
  useEffect(() => {
    if (!ouvert) return;
    boutonFermer.current?.focus();
    const avant = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && fermer();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = avant;
      window.removeEventListener("keydown", onKey);
    };
  }, [ouvert, fermer]);

  // Retour à l'étape « panier » quand on rouvre avec des articles
  useEffect(() => {
    if (ouvert && etape === "envoye" && nombre > 0) setEtape("panier");
  }, [ouvert, etape, nombre]);

  if (!ouvert) return null;

  /** Valide le formulaire, construit le message et ouvre WhatsApp */
  function commander(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const nom = String(f.get("nom") ?? "").trim();
    const tel = String(f.get("tel") ?? "").trim();
    const commune = String(f.get("commune") ?? "");
    const adresse = String(f.get("adresse") ?? "").trim();
    const paiement = String(f.get("paiement") ?? "");
    const note = String(f.get("note") ?? "").trim();

    if (!/^[+\d][\d\s.-]{7,}$/.test(tel)) {
      setErreur("Indiquez un numéro de téléphone valide, par exemple 07 00 00 00 00.");
      return;
    }
    setErreur("");

    const ref = "MPR-" + Date.now().toString(36).toUpperCase().slice(-6);
    const detail = lignes
      .map((l) => {
        const p = trouverProduit(l.id)!;
        return `- ${l.qty} x ${p.nom} : ${formatPrixTexte(l.qty * (p.prix ?? 0))}`;
      })
      .join("\n");
    const message = [
      `Bonjour ${SITE.nom}, je passe commande (réf. ${ref}) :`,
      detail,
      `Sous-total : ${formatPrixTexte(sousTotal)} (hors livraison)`,
      "",
      `Nom : ${nom}`,
      `Téléphone : ${tel}`,
      `Ville : ${commune}`,
      `Adresse : ${adresse}`,
      `Paiement : ${paiement}`,
      ...(note ? [`Remarque : ${note}`] : []),
    ].join("\n");

    const lien = lienWhatsApp(message);
    setReference(ref);
    setLienEnvoi(lien);
    window.open(lien, "_blank", "noopener,noreferrer");
    vider();
    setEtape("envoye");
  }

  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-nuit/50" onClick={fermer} aria-hidden="true" />
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="titre-panier"
        className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-white shadow-xl"
      >
        <header className="flex items-center justify-between border-b border-profond/15 px-5 py-4">
          <h2 id="titre-panier" className="text-lg font-bold text-nuit">
            {etape === "panier" && `Mon panier${nombre ? ` (${nombre})` : ""}`}
            {etape === "infos" && "Livraison et paiement"}
            {etape === "envoye" && "Commande envoyée"}
          </h2>
          <button
            ref={boutonFermer}
            type="button"
            onClick={fermer}
            aria-label="Fermer le panier"
            className="flex h-11 w-11 items-center justify-center rounded-bouton text-nuit hover:bg-brume"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </header>

        {/* Étape 1 : contenu du panier */}
        {etape === "panier" && (
          <>
            <div className="flex-1 overflow-y-auto px-5">
              {lignes.length === 0 ? (
                <div className="py-16 text-center">
                  <p className="font-semibold text-nuit">Votre panier est vide</p>
                  <p className="mt-1 text-sm text-encre/70">Choisissez une ramette ou un carton pour commencer.</p>
                  <button
                    type="button"
                    onClick={() => {
                      fermer();
                      const cible = document.getElementById("produits");
                      if (cible) cible.scrollIntoView();
                      else window.location.assign("/#produits");
                    }}
                    className="mt-6 inline-flex min-h-11 items-center rounded-bouton bg-profond px-5 text-sm font-semibold text-white"
                  >
                    Voir les produits
                  </button>
                </div>
              ) : (
                <ul className="divide-y divide-profond/10">
                  {lignes.map((l) => {
                    const p = trouverProduit(l.id)!;
                    return (
                      <li key={l.id} className="flex gap-4 py-5">
                        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-bouton border border-profond/10 bg-white">
                          <Image src={p.image} alt={p.alt} fill sizes="80px" className="object-contain" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold leading-snug text-nuit">{p.nom}</p>
                          <p className="mt-0.5 text-xs text-encre/65">{formatPrix(p.prix ?? 0)} {p.unite}</p>
                          <div className="mt-2 flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                            <div className="flex items-center rounded-bouton border border-profond/25" role="group" aria-label={`Quantité : ${p.nom}`}>
                              <button type="button" onClick={() => changerQty(l.id, l.qty - 1)} aria-label={l.qty <= p.minQty ? "Retirer du panier" : "Diminuer la quantité"} className="flex h-9 w-9 items-center justify-center text-profond">
                                −
                              </button>
                              <span className="min-w-7 text-center text-sm font-semibold tabular-nums">{l.qty}</span>
                              <button type="button" onClick={() => changerQty(l.id, l.qty + 1)} aria-label="Augmenter la quantité" className="flex h-9 w-9 items-center justify-center text-profond">
                                +
                              </button>
                            </div>
                            <p className="whitespace-nowrap text-sm font-bold text-nuit">{formatPrix(l.qty * (p.prix ?? 0))}</p>
                          </div>
                          <button type="button" onClick={() => changerQty(l.id, 0)} className="mt-2 inline-flex min-h-8 items-center text-xs text-encre/60 underline">
                            Retirer
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
            {lignes.length > 0 && (
              <footer className="border-t border-profond/15 px-5 py-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-encre/75">Sous-total</span>
                  <span className="text-xl font-bold text-nuit">{formatPrix(sousTotal)}</span>
                </div>
                <p className="mt-1 text-xs text-encre/60">Frais et délai de livraison confirmés par WhatsApp selon votre ville.</p>
                <button
                  type="button"
                  onClick={() => setEtape("infos")}
                  className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-bouton bg-profond font-semibold text-white hover:bg-nuit"
                >
                  Passer la commande
                </button>
              </footer>
            )}
          </>
        )}

        {/* Étape 2 : informations de livraison */}
        {etape === "infos" && (
          <form onSubmit={commander} className="flex min-h-0 flex-1 flex-col">
            <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
              <button type="button" onClick={() => setEtape("panier")} className="inline-flex min-h-9 items-center text-sm text-profond underline">
                ← Retour au panier
              </button>

              <label className="block text-sm font-medium text-nuit">
                Nom et prénom
                <input name="nom" required maxLength={80} autoComplete="name" className={champ} />
              </label>
              <label className="block text-sm font-medium text-nuit">
                Téléphone (WhatsApp de préférence)
                <input name="tel" type="tel" required maxLength={20} inputMode="tel" autoComplete="tel" placeholder="07 00 00 00 00" className={champ} />
              </label>
              <label className="block text-sm font-medium text-nuit">
                Ville ou commune
                <select name="commune" required defaultValue="" className={champ}>
                  <option value="" disabled>
                    Choisir une ville
                  </option>
                  {COMMUNES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </label>
              <label className="block text-sm font-medium text-nuit">
                Adresse et point de repère
                <textarea name="adresse" required maxLength={250} rows={2} placeholder="Quartier, rue, immeuble, repère" className={`${champ} py-2`} />
              </label>

              <fieldset>
                <legend className="text-sm font-medium text-nuit">Mode de paiement</legend>
                <div className="mt-2 space-y-2">
                  {MODES_PAIEMENT.map((m, i) => (
                    <label key={m} className="flex min-h-11 cursor-pointer items-center gap-3 rounded-bouton border border-profond/20 px-3 text-sm has-[:checked]:border-profond has-[:checked]:bg-brume">
                      <input type="radio" name="paiement" value={m} defaultChecked={i === 0} className="h-4 w-4 accent-[#0a2a8f]" />
                      {m}
                    </label>
                  ))}
                </div>
              </fieldset>

              <label className="block text-sm font-medium text-nuit">
                Remarque (facultatif)
                <input name="note" maxLength={200} className={champ} />
              </label>

              {erreur && (
                <p role="alert" className="rounded-bouton border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-800">
                  {erreur}
                </p>
              )}
            </div>
            <footer className="border-t border-profond/15 px-5 py-4">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-encre/75">Sous-total</span>
                <span className="text-xl font-bold text-nuit">{formatPrix(sousTotal)}</span>
              </div>
              <button type="submit" className="mt-3 inline-flex min-h-12 w-full items-center justify-center rounded-bouton bg-profond font-semibold text-white hover:bg-nuit">
                Envoyer sur WhatsApp
              </button>
              <p className="mt-2 text-xs text-encre/60">Votre commande s'ouvre dans WhatsApp. Nous la confirmons avec le prix de livraison avant de partir.</p>
            </footer>
          </form>
        )}

        {/* Étape 3 : confirmation */}
        {etape === "envoye" && (
          <div className="flex-1 overflow-y-auto px-5 py-10">
            <p className="text-sm text-encre/70">Référence de commande</p>
            <p className="mt-1 text-2xl font-bold text-nuit">{reference}</p>
            <p className="mt-6 text-sm leading-relaxed text-encre/80">
              Votre commande a été préparée dans WhatsApp. Appuyez sur « Envoyer » dans la conversation pour la transmettre.
              Nous vous répondons pour confirmer le prix de livraison et l'heure de passage.
            </p>
            <a
              href={lienEnvoi}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-bouton bg-profond font-semibold text-white hover:bg-nuit"
            >
              Rouvrir WhatsApp
            </a>
            <button type="button" onClick={fermer} className="mt-3 inline-flex min-h-12 w-full items-center justify-center rounded-bouton border border-profond/25 font-semibold text-profond">
              Continuer mes achats
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}

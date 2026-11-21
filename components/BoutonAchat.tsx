import type { Produit } from "@/lib/config";
import { lienDevis } from "@/lib/config";
import AjouterAuPanier from "./AjouterAuPanier";
import { IconeWhatsApp } from "./Icones";

/**
 * Bouton d'achat d'un produit : « Ajouter au panier » s'il a un prix,
 * sinon « Demander le prix » qui ouvre WhatsApp avec un message prérempli.
 */
export default function BoutonAchat({ p }: { p: Produit }) {
  if (p.prix === null) {
    return (
      <a
        href={lienDevis(p)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-bouton bg-profond px-4 text-sm font-semibold text-white transition-colors hover:bg-nuit"
      >
        <IconeWhatsApp className="h-4 w-4" />
        Demander le prix
        <span className="sr-only"> : {p.nom}</span>
      </a>
    );
  }
  return <AjouterAuPanier id={p.id} nom={p.nom} minQty={p.minQty} prix={p.prix} />;
}

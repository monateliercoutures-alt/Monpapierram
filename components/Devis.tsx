import { SEUIL_GROS, SITE, lienWhatsApp } from "@/lib/config";
import { IconeWhatsApp } from "./Icones";

// Encadré pour les achats en gros
export default function Devis() {
  const message = "Bonjour Monpapierram, je souhaite un devis pour du papier Double A Premium A4 80 g (quantité : ... cartons, commune de livraison : ...).";
  return (
    <section aria-labelledby="titre-devis" className="bg-white px-4 pb-14 sm:px-6 sm:pb-20">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 rounded-carte bg-nuit p-6 text-white sm:p-10 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <h2 id="titre-devis" className="text-xl font-bold sm:text-2xl">
            Besoin de {SEUIL_GROS} cartons ou plus ?
          </h2>
          <p className="mt-2 text-white/80">Tarif dégressif, facture sur demande et livraison planifiée pour les écoles, entreprises et revendeurs.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row md:shrink-0">
          <a
            href={lienWhatsApp(message)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-bouton bg-white px-6 font-semibold text-nuit hover:bg-brume"
          >
            <IconeWhatsApp />
            Demander un devis
          </a>
          <a href={`mailto:${SITE.email}`} className="inline-flex min-h-12 items-center justify-center rounded-bouton border border-white/40 px-6 font-semibold hover:border-white">
            Par e-mail
          </a>
        </div>
      </div>
    </section>
  );
}

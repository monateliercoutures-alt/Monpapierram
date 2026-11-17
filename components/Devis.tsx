import { SEUIL_GROS, SITE, lienWhatsApp } from "@/lib/config";
import { IconeWhatsApp } from "./Icones";

// Bandeau de conversion en bleu nuit : devis pour achats en gros
export default function Devis() {
  const message = `Bonjour Monpapierram, je souhaite un devis pour du papier Double A Premium A4 80 g (quantité : ... cartons, adresse de livraison : ...).`;
  return (
    <section aria-labelledby="titre-devis" className="bg-white px-4 py-20 sm:px-6 sm:py-28">
      <div className="reveal motif-points-clair relative mx-auto max-w-6xl overflow-hidden rounded-[14px] bg-nuit px-6 py-16 text-center sm:px-12 sm:py-20">
        <div aria-hidden="true" className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-cyan/20 blur-3xl" />
        <p className="relative text-xs font-semibold uppercase tracking-[0.2em] text-cyan">Professionnels</p>
        <h2 id="titre-devis" className="relative mx-auto mt-4 max-w-2xl text-3xl font-bold text-white sm:text-4xl">
          Besoin de {SEUIL_GROS} cartons ou plus ? Obtenez votre devis en quelques minutes.
        </h2>
        <p className="relative mx-auto mt-4 max-w-xl text-white/75">
          Écoles, entreprises, imprimeries, revendeurs : tarif dégressif, facture sur demande et livraison planifiée.
        </p>
        <div className="relative mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={lienWhatsApp(message)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-bouton bg-white px-8 font-semibold text-nuit transition-colors hover:bg-brume"
          >
            <IconeWhatsApp />
            Demander un devis
          </a>
          <a
            href={`mailto:${SITE.email}`}
            className="inline-flex min-h-12 items-center justify-center rounded-bouton border border-white/30 px-8 font-semibold text-white transition-colors hover:border-white"
          >
            Écrire par e-mail
          </a>
        </div>
      </div>
    </section>
  );
}

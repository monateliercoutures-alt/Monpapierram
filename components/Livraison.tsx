import { MODES_PAIEMENT, SITE } from "@/lib/config";
import Titre from "./Titre";

const ETAPES = [
  { n: "1", t: "Vous commandez", d: "Envoyez votre besoin sur WhatsApp : produit, quantité, adresse." },
  { n: "2", t: "Nous confirmons", d: "Prix final et créneau de livraison confirmés en quelques minutes." },
  { n: "3", t: "Vous êtes livré", d: "Livraison à votre porte à Abidjan, généralement sous 24 à 48 h." },
];

// Livraison à Abidjan + modes de paiement
export default function Livraison() {
  return (
    <section id="livraison" className="bg-brume px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Titre etiquette="Livraison et paiement" titre="Simple, rapide, sans mauvaise surprise" />

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {/* Livraison */}
          <div className="reveal rounded-carte border border-profond/10 bg-white p-8">
            <h3 className="text-xl font-bold text-nuit">Livraison à Abidjan</h3>
            <p className="mt-2 text-sm text-encre/75">{SITE.zone}</p>
            <ol className="mt-6 space-y-5">
              {ETAPES.map((e) => (
                <li key={e.n} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-profond/20 font-titre text-sm font-bold text-profond">
                    {e.n}
                  </span>
                  <div>
                    <p className="font-semibold text-nuit">{e.t}</p>
                    <p className="text-sm text-encre/75">{e.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Paiement */}
          <div className="reveal rounded-carte border border-profond/10 bg-white p-8">
            <h3 className="text-xl font-bold text-nuit">Paiement à votre convenance</h3>
            <p className="mt-2 text-sm text-encre/75">
              Payez en espèces à la réception de votre commande, ou par Mobile Money.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {MODES_PAIEMENT.map((m) => (
                <li key={m} className="flex min-h-12 items-center gap-3 rounded-bouton border border-profond/15 px-4 text-sm font-semibold text-nuit">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-cyan" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12.5l4.5 4.5L19 7.5" />
                  </svg>
                  {m}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-encre/60">Aucun paiement en ligne par carte : vous réglez à la livraison ou par Mobile Money.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

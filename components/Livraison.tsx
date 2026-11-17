import { MODES_PAIEMENT, SITE } from "@/lib/config";
import Titre from "./Titre";

// Informations pratiques sous forme de listes simples
const INFOS = [
  ["Zone", SITE.zone],
  ["Délai", "Généralement 24 à 48 h après confirmation de la commande"],
  ["Frais", "Selon votre commune, confirmés avant le départ du livreur"],
  ["Horaires", SITE.horaires],
];

// Livraison à Abidjan et modes de paiement
export default function Livraison() {
  return (
    <section id="livraison" className="bg-white px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <Titre titre="Livraison et paiement" />

        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h3 className="text-lg font-bold text-nuit">Livraison à Abidjan</h3>
            <dl className="mt-3 divide-y divide-profond/10 border-y border-profond/10">
              {INFOS.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[6rem_1fr] gap-4 py-3 text-sm">
                  <dt className="font-semibold text-nuit">{k}</dt>
                  <dd className="text-encre/80">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h3 className="text-lg font-bold text-nuit">Moyens de paiement</h3>
            <ul className="mt-3 divide-y divide-profond/10 border-y border-profond/10">
              {MODES_PAIEMENT.map((m) => (
                <li key={m} className="py-3 text-sm font-medium text-nuit">
                  {m}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-encre/65">Pas de paiement par carte en ligne : vous réglez à la réception ou par Mobile Money.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

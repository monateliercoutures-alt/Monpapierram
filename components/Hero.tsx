import { MESSAGE_GENERAL, lienWhatsApp } from "@/lib/config";
import { IconeWhatsApp } from "./Icones";

// Informations clés à droite du titre (liste simple, sans image)
const POINTS = [
  { titre: "Papier Double A Premium", texte: "A4, 80 g/m², 500 feuilles par ramette" },
  { titre: "Livraison à Abidjan", texte: "Généralement sous 24 à 48 h" },
  { titre: "Paiement à la livraison", texte: "Ou Orange Money, MTN MoMo, Wave" },
];

// Section d'accueil : titre, deux boutons et informations pratiques
export default function Hero() {
  return (
    <section className="bg-profond text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:gap-16 lg:py-20">
        <div>
          <h1 className="text-[2.1rem] font-bold sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
            Le papier qui imprime net, livré chez vous à Abidjan
          </h1>
          <p className="mt-5 max-w-xl text-base text-white/80 sm:text-lg">
            Ramettes et cartons de papier A4 Double A Premium pour la maison, l&apos;école et le bureau.
            Commandez en ligne, nous confirmons et livrons.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#produits" className="inline-flex min-h-12 items-center justify-center rounded-bouton bg-white px-7 font-semibold text-nuit hover:bg-brume">
              Voir les tarifs
            </a>
            <a
              href={lienWhatsApp(MESSAGE_GENERAL)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-bouton border border-white/40 px-7 font-semibold text-white hover:border-white"
            >
              <IconeWhatsApp />
              Commander sur WhatsApp
            </a>
          </div>
        </div>

        <ul className="divide-y divide-white/20 border-y border-white/20">
          {POINTS.map((p) => (
            <li key={p.titre} className="py-4">
              <p className="font-semibold">{p.titre}</p>
              <p className="text-sm text-white/75">{p.texte}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

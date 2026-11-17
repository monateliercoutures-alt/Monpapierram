import type { ReactNode } from "react";

// Icônes SVG sobres (trait fin, couleur bleu profond)
const trait = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "h-7 w-7",
  "aria-hidden": true,
};

const AVANTAGES: { titre: string; texte: string; icone: ReactNode }[] = [
  {
    titre: "Papier lisse",
    texte: "Une surface régulière et une blancheur uniforme pour un rendu agréable au toucher comme à l'œil.",
    icone: (
      <svg {...trait}>
        <path d="M6 3h8l4 4v14H6z" />
        <path d="M14 3v4h4" />
        <path d="M9 13h6M9 17h6" />
      </svg>
    ),
  },
  {
    titre: "Impressions nettes",
    texte: "Textes précis, graphiques propres : le papier absorbe l'encre sans baver ni se détremper.",
    icone: (
      <svg {...trait}>
        <path d="M7 9V3h10v6" />
        <rect x="3" y="9" width="18" height="8" rx="2" />
        <path d="M7 14h10v7H7z" />
      </svg>
    ),
  },
  {
    titre: "Recto verso sans bourrage",
    texte: "Épaisseur et opacité pensées pour l'impression double face, sur imprimantes laser et jet d'encre.",
    icone: (
      <svg {...trait}>
        <path d="M4 8a8 8 0 0 1 14-3l2 2" />
        <path d="M20 3v4h-4" />
        <path d="M20 16a8 8 0 0 1-14 3l-2-2" />
        <path d="M4 21v-4h4" />
      </svg>
    ),
  },
  {
    titre: "Livraison rapide à Abidjan",
    texte: "Commande confirmée sur WhatsApp, livraison à votre adresse en 24 à 48 heures.",
    icone: (
      <svg {...trait}>
        <path d="M3 6h11v10H3z" />
        <path d="M14 10h4l3 3v3h-7z" />
        <circle cx="7" cy="18" r="2" />
        <circle cx="17" cy="18" r="2" />
      </svg>
    ),
  },
];

// Quatre blocs sobres présentant les atouts du produit et du service
export default function Avantages() {
  return (
    <section id="avantages" className="bg-brume px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-profond">Pourquoi Double A</p>
          <h2 className="mt-3 text-3xl font-bold text-nuit sm:text-4xl">Un papier fiable, du premier au dernier feuillet</h2>
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {AVANTAGES.map((a) => (
            <li key={a.titre} className="rounded-carte border border-profond/10 bg-white p-6">
              <span className="flex h-12 w-12 items-center justify-center rounded-bouton bg-brume text-profond">
                {a.icone}
              </span>
              <h3 className="mt-5 text-lg font-semibold text-nuit">{a.titre}</h3>
              <p className="mt-2 text-sm text-encre/75">{a.texte}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

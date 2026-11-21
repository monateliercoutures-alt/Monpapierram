// Bande de réassurance sous le hero : 4 engagements concrets (Server Component)
const trait = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "h-8 w-8 shrink-0 text-profond",
  "aria-hidden": true,
};

const POINTS = [
  {
    titre: "8 marques de papier rame",
    texte: "Double A, Smart Copy, Globulus…",
    icone: (
      <svg {...trait}>
        <path d="M6 3h8l4 4v14H6z" />
        <path d="M14 3v4h4M9 13h6M9 17h6" />
      </svg>
    ),
  },
  {
    titre: "Livraison en Côte d'Ivoire",
    texte: "Livraison en 24 à 72 h",
    icone: (
      <svg {...trait}>
        <path d="M3 6h11v10H3z" />
        <path d="M14 10h4l3 3v3h-7z" />
        <circle cx="7" cy="18" r="2" />
        <circle cx="17" cy="18" r="2" />
      </svg>
    ),
  },
  {
    titre: "Paiement à la livraison",
    texte: "Ou Orange Money, MTN MoMo, Wave",
    icone: (
      <svg {...trait}>
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <circle cx="12" cy="12" r="2.5" />
        <path d="M6 9v.01M18 15v.01" />
      </svg>
    ),
  },
  {
    titre: "Commande sur WhatsApp",
    texte: "Confirmation rapide par message",
    icone: (
      <svg {...trait}>
        <path d="M4 5h16v11H9l-5 4z" />
        <path d="M8 9h8M8 12h5" />
      </svg>
    ),
  },
];

export default function Reassurance() {
  return (
    <section aria-label="Nos engagements" className="border-b border-profond/15 bg-white px-4 sm:px-6">
      <ul className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-profond/10 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
        {POINTS.map((p) => (
          <li key={p.titre} className="flex items-center gap-4 py-5 lg:px-6 lg:first:pl-0">
            {p.icone}
            <div>
              <p className="text-sm font-bold text-nuit">{p.titre}</p>
              <p className="text-xs text-encre/70">{p.texte}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

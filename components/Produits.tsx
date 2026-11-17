import { PRODUITS, formatPrix, lienWhatsApp } from "@/lib/config";
import { IconeWhatsApp } from "./Icones";

// Cartes produits générées depuis le tableau PRODUITS de lib/config.ts
export default function Produits() {
  return (
    <section id="produits" className="bg-white px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-profond">Produits et tarifs</p>
          <h2 className="mt-3 text-3xl font-bold text-nuit sm:text-4xl">Choisissez votre format</h2>
          <p className="mt-4 text-encre/75">
            Papier A4 Double A Premium 80 g/m². Prix indicatifs en FCFA, confirmés à la commande.
          </p>
        </div>

        <ul className="mt-14 grid gap-6 lg:grid-cols-3">
          {PRODUITS.map((p) => (
            <li
              key={p.id}
              className={`relative flex flex-col rounded-carte border bg-white p-7 ${
                p.populaire ? "border-profond" : "border-profond/15"
              }`}
            >
              {p.populaire && (
                <span className="absolute -top-3 left-7 rounded-full bg-profond px-3 py-1 text-xs font-semibold text-white">
                  Le plus choisi
                </span>
              )}
              <h3 className="text-xl font-bold text-nuit">{p.nom}</h3>
              <p className="mt-1 text-sm font-medium text-profond">{p.description}</p>
              <p className="mt-3 text-sm text-encre/75">{p.detail}</p>

              <p className="mt-6 font-titre text-3xl font-bold text-nuit">
                {formatPrix(p.prix)}
                <span className="ml-2 text-sm font-semibold text-encre/60">{p.unite}</span>
              </p>

              <ul className="mt-6 flex-1 space-y-2.5 border-t border-profond/10 pt-6 text-sm">
                {p.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-2.5">
                    <svg viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 shrink-0 text-cyan" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12.5l4.5 4.5L19 7.5" />
                    </svg>
                    {pt}
                  </li>
                ))}
              </ul>

              <a
                href={lienWhatsApp(p.message)}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-bouton px-5 font-semibold transition-colors ${
                  p.populaire
                    ? "bg-profond text-white hover:bg-nuit"
                    : "border border-profond/25 text-profond hover:border-profond"
                }`}
              >
                <IconeWhatsApp />
                Commander
                <span className="sr-only"> : {p.nom}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

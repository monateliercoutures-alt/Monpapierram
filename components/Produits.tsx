import Image from "next/image";
import { PRODUITS, formatPrix, lienWhatsApp } from "@/lib/config";
import { IconeWhatsApp } from "./Icones";
import Titre from "./Titre";

// Cartes produits générées depuis le tableau PRODUITS de lib/config.ts
export default function Produits() {
  return (
    <section id="produits" className="bg-white px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Titre
          etiquette="Produits et tarifs"
          titre="Choisissez votre format"
          texte="Papier A4 Double A Premium 80 g/m². Prix indicatifs en FCFA, confirmés à la commande."
        />

        <ul className="mt-16 grid gap-6 lg:grid-cols-3">
          {PRODUITS.map((p) => (
            <li
              key={p.id}
              className={`reveal relative flex flex-col overflow-hidden rounded-carte border bg-white transition-all duration-300 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${
                p.populaire ? "border-profond ring-1 ring-profond" : "border-profond/15 hover:border-profond/40"
              }`}
            >
              {/* Photo produit (affichée entière, sans recadrage) */}
              <div className="relative aspect-[4/3] w-full border-b border-profond/10 bg-white">
                <Image
                  src={p.image}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                  className="object-contain p-2"
                  loading="lazy"
                />
                {p.populaire && (
                  <span className="absolute left-4 top-4 rounded-full bg-profond px-3 py-1 text-xs font-semibold text-white">
                    Le plus choisi
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col p-7">
                <h3 className="text-xl font-bold text-nuit">{p.nom}</h3>
                <p className="mt-1 text-sm font-medium text-profond">{p.description}</p>
                <p className="mt-3 text-sm text-encre/70">{p.detail}</p>

                <p className="mt-6 font-titre text-[2rem] font-bold leading-none text-nuit">
                  {formatPrix(p.prix)}
                </p>
                <p className="mt-1 text-sm text-encre/60">{p.unite}</p>

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
                      : "border border-profond/25 text-profond hover:border-profond hover:bg-brume"
                  }`}
                >
                  <IconeWhatsApp />
                  Commander
                  <span className="sr-only"> : {p.nom}</span>
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

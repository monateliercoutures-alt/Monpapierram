import Link from "next/link";
import { PRODUITS, libellePrix } from "@/lib/config";
import CarteImages from "./CarteImages";
import BoutonAchat from "./BoutonAchat";
import Titre from "./Titre";

// Marques dans l'ordre d'affichage (le catalogue est généré depuis PRODUITS dans lib/config.ts)
const MARQUES = ["Double A", "Paper One", "Globulus", "Paper Pro", "Authentik"];

// Catalogue : une rangée de cartes par marque
export default function Produits() {
  return (
    <section id="produits" className="bg-white px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <Titre titre="Nos produits" texte="Papier rame A4 Double A, Paper One, Globulus, Paper Pro et Authentik, livré partout en Côte d'Ivoire." />

        {MARQUES.map((marque) => (
          <div key={marque} className="mt-12 first:mt-8">
            <h3 className="border-b border-profond/15 pb-2 text-lg font-bold text-nuit">Papier rame {marque}</h3>
            <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {PRODUITS.filter((p) => p.marque === marque).map((p) => (
                <li key={p.id} className="flex flex-col overflow-hidden rounded-carte border border-profond/15 bg-white">
                  <CarteImages href={`/produits/${p.slug}`} nom={p.nom} images={p.galerie} badge={p.badge} />

                  <div className="flex flex-1 flex-col border-t border-profond/10 p-5">
                    <h4 className="text-base font-bold text-nuit">
                      <Link href={`/produits/${p.slug}`} className="hover:underline">
                        {p.nom}
                      </Link>
                    </h4>
                    <p className="mt-1 text-sm text-encre/70">{p.specs}</p>

                    <p className="mt-4 flex items-baseline gap-2">
                      <span className={`font-titre font-bold text-nuit ${p.prix === null ? "text-xl" : "text-2xl"}`}>{libellePrix(p)}</span>
                      {p.prix !== null && <span className="text-sm text-encre/65">{p.unite}</span>}
                    </p>
                    {p.note && <p className="mt-0.5 text-xs text-profond">{p.note}</p>}

                    <ul className="mt-4 flex-1 space-y-1 text-sm text-encre/80">
                      {p.points.map((pt) => (
                        <li key={pt} className="flex gap-2">
                          <span className="text-cyan" aria-hidden="true">✓</span>
                          {pt}
                        </li>
                      ))}
                    </ul>

                    <p className="mt-4 flex items-center justify-between text-xs">
                      {p.prix !== null ? <span className="font-semibold text-[#0b7a4b]">En stock</span> : <span className="text-encre/60">Sur demande</span>}
                      <Link href={`/produits/${p.slug}`} className="inline-flex min-h-8 items-center font-semibold text-profond underline">
                        Voir le détail
                      </Link>
                    </p>
                    <div className="mt-2">
                      <BoutonAchat p={p} />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

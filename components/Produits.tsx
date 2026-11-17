import Image from "next/image";
import Link from "next/link";
import { PRODUITS, formatPrix } from "@/lib/config";
import AjouterAuPanier from "./AjouterAuPanier";
import Titre from "./Titre";

// Catalogue : cartes générées depuis le tableau PRODUITS de lib/config.ts
export default function Produits() {
  return (
    <section id="produits" className="bg-white px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <Titre titre="Nos produits" texte="Papier A4 Double A Premium 80 g/m². Prix en FCFA, livraison partout en Côte d'Ivoire." />

        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUITS.map((p) => (
            <li key={p.id} className="flex flex-col overflow-hidden rounded-carte border border-profond/15 bg-white">
              <Link href={`/produits/${p.slug}`} className="relative block aspect-[4/3] w-full bg-white" aria-label={`Voir le produit : ${p.nom}`}>
                <Image
                  src={p.image}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 1024px) 370px, (min-width: 640px) 50vw, 100vw"
                  className="object-contain p-2"
                  loading="lazy"
                />
                {p.badge && (
                  <span className="absolute left-3 top-3 rounded bg-profond px-2 py-1 text-xs font-semibold text-white">{p.badge}</span>
                )}
              </Link>

              <div className="flex flex-1 flex-col border-t border-profond/10 p-5">
                <h3 className="text-base font-bold text-nuit">
                  <Link href={`/produits/${p.slug}`} className="hover:underline">
                    {p.nom}
                  </Link>
                </h3>
                <p className="mt-1 text-sm text-encre/70">{p.specs}</p>

                <p className="mt-4 flex items-baseline gap-2">
                  <span className="font-titre text-2xl font-bold text-nuit">{formatPrix(p.prix)}</span>
                  <span className="text-sm text-encre/65">{p.unite}</span>
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
                  <span className="font-semibold text-[#0b7a4b]">En stock</span>
                  <Link href={`/produits/${p.slug}`} className="inline-flex min-h-8 items-center font-semibold text-profond underline">
                    Voir le détail
                  </Link>
                </p>
                <div className="mt-2">
                  <AjouterAuPanier id={p.id} nom={p.nom} minQty={p.minQty} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

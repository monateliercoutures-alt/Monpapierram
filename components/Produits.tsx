import Link from "next/link";
import { MARQUES, produitsMarque, slugMarque } from "@/lib/config";
import ProduitCarte from "./ProduitCarte";
import Titre from "./Titre";

// Catalogue : une rangée de cartes par marque ; le titre de chaque rangée mène à la page de la marque
export default function Produits() {
  return (
    <section id="produits" className="bg-white px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <Titre titre="Nos produits" texte="Papier rame A4 Double A, Paper One, Globulus, Paper Pro, Authentik et Smart Copy, livré partout en Côte d'Ivoire." />

        {MARQUES.map((marque) => (
          <div key={marque} className="mt-12 first:mt-8">
            <h3 className="flex items-center justify-between gap-4 border-b border-profond/15 pb-2 text-lg font-bold text-nuit">
              <Link href={`/marques/${slugMarque(marque)}`} className="hover:underline">
                Papier rame {marque}
              </Link>
              <Link href={`/marques/${slugMarque(marque)}`} className="inline-flex min-h-8 items-center whitespace-nowrap text-sm font-semibold text-profond underline" aria-label={`Voir tous les produits Papier rame ${marque}`}>
                Voir la marque →
              </Link>
            </h3>
            <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {produitsMarque(marque).map((p) => (
                <ProduitCarte key={p.id} p={p} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

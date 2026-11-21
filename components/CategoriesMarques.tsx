import Image from "next/image";
import Link from "next/link";
import { MARQUES, formatPrixTexte, grammage, produitsMarque, slugMarque } from "@/lib/config";
import Titre from "./Titre";

// Rayons de la boutique : une vignette par marque, avec photo, grammage et prix de départ
export default function CategoriesMarques() {
  return (
    <section id="marques" aria-labelledby="titre-rayons" className="bg-brume px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <Titre titre="Acheter par marque" texte="Choisissez votre papier rame A4 : chaque marque a sa page avec les prix, la ramette, le carton et le gros." />
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3">
          {MARQUES.map((m) => {
            const liste = produitsMarque(m);
            const prix = liste.map((p) => p.prix).filter((x): x is number => x !== null);
            const premier = liste[0];
            if (!premier) return null;
            return (
              <li key={m}>
                <Link
                  href={`/marques/${slugMarque(m)}`}
                  className="group flex h-full flex-col overflow-hidden rounded-carte border border-profond/15 bg-white transition hover:border-profond/40 hover:shadow-md"
                >
                  <div className="relative aspect-[4/3] bg-white">
                    <Image src={premier.image} alt={`Papier rame A4 ${m}`} fill sizes="(min-width: 768px) 33vw, 50vw" className="object-contain p-3 transition group-hover:scale-[1.03]" />
                  </div>
                  <div className="border-t border-profond/10 p-3 sm:p-4">
                    <h3 className="text-base font-bold text-nuit">Papier rame {m}</h3>
                    <p className="text-xs text-encre/65">A4 · {grammage(premier)}</p>
                    {prix.length > 0 && (
                      <p className="mt-1 text-sm text-encre/80">
                        Dès <strong className="text-profond">{formatPrixTexte(Math.min(...prix))}</strong>
                      </p>
                    )}
                    <span className="mt-2 inline-flex text-sm font-semibold text-profond underline">Voir les prix</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

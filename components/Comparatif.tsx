import Link from "next/link";
import { MARQUES, PRODUITS, formatPrix, grammage } from "@/lib/config";
import Titre from "./Titre";

// Comparatif des marques : tableau généré depuis PRODUITS (prix, grammage, liens vers les fiches)
export default function Comparatif() {
  const lignes = MARQUES.map((marque) => {
    const carton = PRODUITS.find((p) => p.marque === marque && p.minQty === 1 && p.id.endsWith("carton")) ?? PRODUITS.find((p) => p.marque === marque && p.id === "carton");
    const gros = PRODUITS.find((p) => p.marque === marque && p.minQty > 1);
    return { marque, carton, gros };
  });

  return (
    <section id="comparatif" className="border-t border-profond/10 bg-white px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <Titre
          titre="Comparatif des marques de papier rame A4"
          texte="Tous nos cartons contiennent 5 ramettes de 500 feuilles, soit 2 500 feuilles A4. Prix en FCFA, livraison partout en Côte d'Ivoire."
        />
        <div className="mt-8 overflow-x-auto rounded-carte border border-profond/15">
          <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
            <caption className="sr-only">Prix des cartons de papier rame A4 par marque</caption>
            <thead className="bg-brume text-nuit">
              <tr>
                <th scope="col" className="px-4 py-3 font-bold">Marque</th>
                <th scope="col" className="px-4 py-3 font-bold">Grammage</th>
                <th scope="col" className="px-4 py-3 font-bold">1 carton</th>
                <th scope="col" className="px-4 py-3 font-bold">Dès 10 cartons (le carton)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-profond/10">
              {lignes.map(({ marque, carton, gros }) => (
                <tr key={marque}>
                  <th scope="row" className="whitespace-nowrap px-4 py-3 font-semibold text-nuit">{marque}</th>
                  <td className="whitespace-nowrap px-4 py-3 text-encre/85">{carton ? grammage(carton) : "-"}</td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {carton && carton.prix !== null ? (
                      <Link href={`/produits/${carton.slug}`} className="font-semibold text-profond underline">{formatPrix(carton.prix)}</Link>
                    ) : "-"}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {gros && gros.prix !== null ? (
                      <Link href={`/produits/${gros.slug}`} className="font-semibold text-profond underline">{formatPrix(gros.prix)}</Link>
                    ) : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-encre/70">
          Le papier Double A est aussi vendu à la ramette (500 feuilles). Le papier Paper One est du 70 g/m² et Ultima Copy du 75 g/m² ; les autres marques sont du 80 g/m², conseillé pour l&apos;impression recto verso.
        </p>
      </div>
    </section>
  );
}

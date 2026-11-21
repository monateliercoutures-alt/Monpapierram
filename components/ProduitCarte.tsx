import Link from "next/link";
import { libellePrix, type Produit } from "@/lib/config";
import CarteImages from "./CarteImages";
import BoutonAchat from "./BoutonAchat";

/** Carte produit : photos, nom, prix, points forts et bouton d'achat */
export default function ProduitCarte({ p, className = "" }: { p: Produit; className?: string }) {
  return (
    <li className={`flex flex-col overflow-hidden rounded-carte border border-profond/15 bg-white ${className}`}>
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
  );
}

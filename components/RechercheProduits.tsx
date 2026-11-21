"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { PRODUITS, libellePrix } from "@/lib/config";

// Retire les accents et met en minuscules pour une recherche tolérante
const norm = (t: string) => t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

/** Champ de recherche de produits avec suggestions (en-tête du site) */
export default function RechercheProduits({ className = "", autoFocus = false, onChoisi }: { className?: string; autoFocus?: boolean; onChoisi?: () => void }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [ouvert, setOuvert] = useState(false);
  const zone = useRef<HTMLDivElement>(null);

  const resultats = useMemo(() => {
    const mots = norm(q).split(/\s+/).filter(Boolean);
    if (!mots.length) return [];
    return PRODUITS.filter((p) => {
      const texte = norm(`${p.nom} ${p.marque} ${p.specs}`);
      return mots.every((m) => texte.includes(m));
    }).slice(0, 6);
  }, [q]);

  // Ferme la liste quand on clique ailleurs
  useEffect(() => {
    const clic = (e: MouseEvent) => zone.current && !zone.current.contains(e.target as Node) && setOuvert(false);
    document.addEventListener("mousedown", clic);
    return () => document.removeEventListener("mousedown", clic);
  }, []);

  function aller(slug: string) {
    setOuvert(false);
    setQ("");
    onChoisi?.();
    router.push(`/produits/${slug}`);
  }

  return (
    <div ref={zone} className={`relative ${className}`}>
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          if (resultats[0]) aller(resultats[0].slug);
        }}
      >
        <label className="relative block">
          <span className="sr-only">Rechercher un produit</span>
          <svg viewBox="0 0 24 24" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-encre/50" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="6.5" />
            <path d="M16 16l4 4" />
          </svg>
          <input
            type="search"
            value={q}
            autoFocus={autoFocus}
            onChange={(e) => {
              setQ(e.target.value);
              setOuvert(true);
            }}
            onFocus={() => setOuvert(true)}
            onKeyDown={(e) => e.key === "Escape" && setOuvert(false)}
            placeholder="Rechercher un produit…"
            autoComplete="off"
            className="h-10 w-full rounded-bouton border border-profond/20 bg-white pl-9 pr-3 text-sm text-encre placeholder:text-encre/50"
          />
        </label>
      </form>

      {ouvert && q.trim() !== "" && (
        <div className="absolute right-0 z-50 mt-1 w-full lg:min-w-[26rem] overflow-hidden rounded-carte border border-profond/20 bg-white shadow-lg">
          {resultats.length === 0 ? (
            <p className="p-4 text-sm text-encre/75">Aucun produit trouvé. Essayez « carton », « Globulus » ou « 80g ».</p>
          ) : (
            <ul>
              {resultats.map((p) => (
                <li key={p.id} className="border-b border-profond/10 last:border-0">
                  <button type="button" onClick={() => aller(p.slug)} className="flex w-full items-center gap-3 p-3 text-left hover:bg-brume">
                    <Image src={p.image} alt="" width={44} height={44} className="h-11 w-11 shrink-0 rounded object-contain" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold text-nuit">{p.nom}</span>
                      <span className="block text-xs text-encre/70">{libellePrix(p)}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

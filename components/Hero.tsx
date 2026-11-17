import Image from "next/image";
import { ETAPES, MESSAGE_GENERAL, lienWhatsApp } from "@/lib/config";
import { IconeWhatsApp } from "./Icones";

// Chiffres clés affichés sous le hero
const CHIFFRES = [
  { valeur: "500", label: "feuilles par ramette" },
  { valeur: "80 g/m²", label: "grammage premium" },
  { valeur: "2 500", label: "feuilles par carton" },
  { valeur: "24–48 h", label: "livraison à Abidjan" },
];

// Section d'accueil immersive : fond bleu nuit, texte en cascade, diaporama produit
export default function Hero() {
  return (
    <>
      <section className="relative isolate flex min-h-[94svh] items-center overflow-hidden bg-nuit px-4 pb-20 pt-28 sm:px-6 lg:pt-32">
        {/* Décor : grille discrète et halos lumineux */}
        <div aria-hidden="true" className="grille-sombre absolute inset-0 -z-10" />
        <div aria-hidden="true" className="absolute -right-32 top-10 -z-10 h-[32rem] w-[32rem] rounded-full bg-cyan/25 blur-[110px]" />
        <div aria-hidden="true" className="absolute -left-40 bottom-0 -z-10 h-[26rem] w-[26rem] rounded-full bg-profond/60 blur-[110px]" />

        <div className="mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12">
          <div className="text-center lg:text-left">
            <p
              className="entree inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white"
              style={{ "--d": "0.05s" } as React.CSSProperties}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-cyan" aria-hidden="true" />
              Double A Premium · A4 80 g/m²
            </p>

            <h1
              className="entree mt-6 text-[2.35rem] font-bold leading-[1.1] text-white sm:text-5xl lg:text-[3.75rem]"
              style={{ "--d": "0.15s" } as React.CSSProperties}
            >
              Le papier qui imprime net, livré chez vous à <span className="text-cyan">Abidjan</span>
            </h1>

            <p
              className="entree mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg lg:mx-0"
              style={{ "--d": "0.3s" } as React.CSSProperties}
            >
              Ramettes de 500 feuilles et cartons de 5 ramettes. Une blancheur uniforme, un grain
              lisse, un passage sans bourrage : commandez en 30 secondes sur WhatsApp.
            </p>

            <div
              className="entree mt-9 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start"
              style={{ "--d": "0.45s" } as React.CSSProperties}
            >
              <a
                href="#produits"
                className="inline-flex min-h-12 items-center justify-center rounded-bouton bg-white px-8 font-semibold text-nuit transition-all hover:-translate-y-0.5 hover:bg-brume motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                Voir les tarifs
              </a>
              <a
                href={lienWhatsApp(MESSAGE_GENERAL)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-bouton border border-white/30 px-8 font-semibold text-white transition-all hover:-translate-y-0.5 hover:border-white hover:bg-white/10 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                <IconeWhatsApp />
                Commander sur WhatsApp
              </a>
            </div>

            <ul
              className="entree mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/70 lg:justify-start"
              style={{ "--d": "0.6s" } as React.CSSProperties}
            >
              {["Paiement à la livraison", "Orange Money · MTN MoMo · Wave", "Réponse rapide"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 text-cyan" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12.5l4.5 4.5L19 7.5" />
                  </svg>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Visuel : diaporama des 4 photos produit */}
          <div className="entree relative mx-auto w-full max-w-xl" style={{ "--d": "0.35s" } as React.CSSProperties}>
            <div aria-hidden="true" className="absolute -inset-3 rounded-[22px] bg-gradient-to-br from-cyan/40 to-profond/30 blur-2xl" />
            <div className="relative aspect-[4/3] overflow-hidden rounded-[14px] border border-white/20 bg-white">
              {ETAPES.map((e, i) => (
                <div
                  key={e.image}
                  className="diapo absolute inset-0"
                  style={{ animationDelay: `${i * 5 - 1.2}s` }}
                >
                  <Image
                    src={e.image}
                    alt={e.alt}
                    fill
                    sizes="(min-width: 1024px) 560px, 100vw"
                    className="object-contain"
                    priority={i === 0}
                    loading={i === 0 ? undefined : "lazy"}
                  />
                </div>
              ))}
            </div>

            <div className="flotte absolute -bottom-5 left-3 rounded-carte border border-profond/10 bg-white px-4 py-3 sm:-left-4">
              <p className="font-titre text-sm font-bold text-nuit">500 feuilles</p>
              <p className="text-xs text-encre/65">blanches et lisses</p>
            </div>
            <div
              className="flotte absolute -top-4 right-3 rounded-carte border border-profond/10 bg-white px-4 py-3 sm:-right-4"
              style={{ animationDelay: "-2.5s" }}
            >
              <p className="font-titre text-sm font-bold text-nuit">Recto verso</p>
              <p className="text-xs text-encre/65">sans bourrage</p>
            </div>
          </div>
        </div>

        {/* Indicateur « Faites défiler » */}
        <a
          href="#montage"
          className="absolute bottom-3 left-1/2 flex min-h-11 -translate-x-1/2 items-center gap-2 text-[11px] font-medium uppercase tracking-widest text-white/60"
        >
          Faites défiler
          <span className="relative block h-5 w-px overflow-hidden bg-white/25" aria-hidden="true">
            <span className="absolute inset-x-0 top-0 h-2 bg-cyan motion-safe:animate-[defile_1.6s_ease-in-out_infinite]" />
          </span>
        </a>
      </section>

      {/* Bandeau de chiffres clés */}
      <section aria-label="Chiffres clés" className="border-b border-profond/10 bg-white px-4 sm:px-6">
        <dl className="mx-auto grid max-w-6xl grid-cols-2 divide-profond/10 lg:grid-cols-4 lg:divide-x">
          {CHIFFRES.map((c) => (
            <div key={c.label} className="flex flex-col px-4 py-7 text-center">
              <dt className="order-2 mt-1 text-xs uppercase tracking-wider text-encre/60">{c.label}</dt>
              <dd className="font-titre text-2xl font-bold text-profond sm:text-3xl">{c.valeur}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}

import Image from "next/image";
import { MESSAGE_GENERAL, lienWhatsApp } from "@/lib/config";
import { IconeWhatsApp } from "./Icones";

// Chiffres clés affichés sous le hero
const CHIFFRES = [
  { valeur: "500", label: "feuilles par ramette" },
  { valeur: "80 g/m²", label: "grammage premium" },
  { valeur: "2 500", label: "feuilles par carton" },
  { valeur: "24–48 h", label: "livraison à Abidjan" },
];

// Section d'accueil : image panoramique Double A en fond, titre et boutons à gauche
export default function Hero() {
  return (
    <>
      <section className="relative bg-white pt-16">
        {/* Cadre : image pleine largeur ; texte à gauche sur grand écran, sous l'image en dessous */}
        <div className="hero-cadre relative flex flex-col xl:block">
          {/* Image : on rogne seulement la zone vide à gauche (object-right), jamais les produits */}
          <div className="relative order-2 aspect-[16/9] w-full xl:absolute xl:inset-0 xl:aspect-auto">
            <Image
              src="/images/hero.jpg"
              alt="Ramette Double A Premium debout devant des feuilles A4 blanches, avec d'autres cartons et ramettes de papier A4 80 g sur une surface blanche brillante"
              fill
              priority
              sizes="100vw"
              className="object-cover xl:object-right"
            />
          </div>

          {/* Texte */}
          <div className="relative z-10 order-1 px-4 pb-10 pt-12 sm:px-6 xl:absolute xl:inset-y-0 xl:left-0 xl:flex xl:items-center xl:p-0 xl:pl-[max(4rem,6vw)]">
          <div className="mx-auto text-center xl:mx-0 xl:w-[29vw] xl:max-w-[34rem] xl:text-left">
            <p
              className="entree inline-flex items-center gap-2 rounded-full border border-profond/15 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-profond"
              style={{ "--d": "0.05s" } as React.CSSProperties}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-cyan" aria-hidden="true" />
              Double A Premium · A4 80 g/m²
            </p>

            <h1
              className="entree mt-6 text-[2.25rem] font-bold leading-[1.12] text-nuit sm:text-5xl xl:text-[clamp(2rem,2.9vw,3.4rem)]"
              style={{ "--d": "0.15s" } as React.CSSProperties}
            >
              Le papier qui imprime net, livré chez vous à <span className="text-profond">Abidjan</span>
            </h1>

            <p
              className="entree mx-auto mt-5 max-w-xl text-base leading-relaxed text-encre/75 sm:text-lg xl:mx-0 xl:text-[clamp(0.95rem,1.05vw,1.1rem)]"
              style={{ "--d": "0.3s" } as React.CSSProperties}
            >
              Ramettes de 500 feuilles et cartons de 5 ramettes. Une blancheur uniforme, un grain
              lisse, un passage sans bourrage : commandez en 30 secondes sur WhatsApp.
            </p>

            <div
              className="entree mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center xl:flex-col xl:items-start min-[1700px]:flex-row"
              style={{ "--d": "0.45s" } as React.CSSProperties}
            >
              <a
                href="#produits"
                className="inline-flex min-h-12 items-center justify-center whitespace-nowrap rounded-bouton bg-profond px-7 font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-nuit motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                Voir les tarifs
              </a>
              <a
                href={lienWhatsApp(MESSAGE_GENERAL)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-bouton border border-profond/30 bg-white/80 px-7 font-semibold text-profond transition-all hover:-translate-y-0.5 hover:border-profond motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                <IconeWhatsApp />
                Commander sur WhatsApp
              </a>
            </div>

            <ul
              className="entree mt-7 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-encre/75 xl:justify-start"
              style={{ "--d": "0.6s" } as React.CSSProperties}
            >
              {["Paiement à la livraison", "Orange Money · MTN MoMo · Wave"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 text-cyan" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12.5l4.5 4.5L19 7.5" />
                  </svg>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          </div>
        </div>
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

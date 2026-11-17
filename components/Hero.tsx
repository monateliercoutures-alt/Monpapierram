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
      <section className="relative isolate flex flex-col overflow-hidden bg-white pt-28 lg:min-h-[92svh] lg:justify-center lg:pt-24">
        {/* Image : en dessous du texte sur mobile, en fond à droite sur ordinateur */}
        <div
          className="fondu-gauche relative order-2 mt-10 aspect-[16/9] w-full lg:absolute lg:inset-y-0 lg:right-0 lg:order-none lg:mt-0 lg:flex lg:w-[76%] lg:items-center lg:aspect-auto"
        >
          <div className="fondu-bords relative aspect-[16/9] w-full">
            <Image
              src="/images/hero.jpg"
              alt="Ramette Double A Premium debout devant des feuilles A4 blanches, avec d'autres cartons et ramettes de papier A4 80 g sur une surface blanche brillante"
              fill
              priority
              sizes="(min-width: 1024px) 76vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Texte : au-dessus de l'image sur mobile (ordre inversé), à gauche sur ordinateur */}
        <div className="relative z-10 order-1 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:order-none">
          <div className="text-center lg:max-w-[40%] lg:text-left xl:max-w-[42%]">
            <p
              className="entree inline-flex items-center gap-2 rounded-full border border-profond/15 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-profond"
              style={{ "--d": "0.05s" } as React.CSSProperties}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-cyan" aria-hidden="true" />
              Double A Premium · A4 80 g/m²
            </p>

            <h1
              className="entree mt-6 text-[2.25rem] font-bold leading-[1.12] text-nuit sm:text-5xl lg:text-[2.6rem] xl:text-[3.25rem]"
              style={{ "--d": "0.15s" } as React.CSSProperties}
            >
              Le papier qui imprime net, livré chez vous à <span className="text-profond">Abidjan</span>
            </h1>

            <p
              className="entree mx-auto mt-5 max-w-xl text-base leading-relaxed text-encre/75 sm:text-lg lg:mx-0"
              style={{ "--d": "0.3s" } as React.CSSProperties}
            >
              Ramettes de 500 feuilles et cartons de 5 ramettes. Une blancheur uniforme, un grain
              lisse, un passage sans bourrage : commandez en 30 secondes sur WhatsApp.
            </p>

            <div
              className="entree mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:flex-col lg:items-start xl:flex-row"
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
              className="entree mt-7 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-encre/75 lg:justify-start"
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

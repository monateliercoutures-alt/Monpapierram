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

// Section d'accueil : texte, visuel produit, boutons, chiffres clés
export default function Hero() {
  return (
    <>
      <section className="motif-points relative overflow-hidden bg-brume px-4 pb-24 pt-28 sm:px-6 lg:pb-28 lg:pt-36">
        {/* Halo cyan très léger en arrière-plan */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-cyan/10 blur-3xl"
        />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="text-center lg:text-left">
            <p className="inline-flex items-center gap-2 rounded-full border border-profond/15 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-profond">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan" aria-hidden="true" />
              Double A Premium · A4 80 g/m²
            </p>

            <h1 className="mt-6 text-[2.25rem] font-bold leading-[1.12] text-nuit sm:text-5xl lg:text-[3.5rem]">
              Le papier qui imprime net, livré chez vous à{" "}
              <span className="text-profond">Abidjan</span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-encre/75 sm:text-lg lg:mx-0">
              Ramettes de 500 feuilles et cartons de 5 ramettes. Une blancheur uniforme, un grain
              lisse et un passage sans bourrage, pour la maison, l&apos;école et le bureau.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <a
                href="#produits"
                className="inline-flex min-h-12 items-center justify-center rounded-bouton bg-profond px-8 font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-nuit motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                Voir les tarifs
              </a>
              <a
                href={lienWhatsApp(MESSAGE_GENERAL)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-bouton border border-profond/25 bg-white px-8 font-semibold text-profond transition-all hover:-translate-y-0.5 hover:border-profond motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                <IconeWhatsApp />
                Commander sur WhatsApp
              </a>
            </div>

            <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-encre/70 lg:justify-start">
              {["Paiement à la livraison", "Orange Money · MTN MoMo · Wave", "Réponse rapide sur WhatsApp"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 text-cyan" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12.5l4.5 4.5L19 7.5" />
                  </svg>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Visuel produit */}
          <div className="relative mx-auto w-full max-w-xl">
            <div className="relative aspect-[3/2] overflow-hidden rounded-[14px] border border-profond/10 bg-white">
              <Image
                src="/images/etape-3.jpg"
                alt="Ramette de papier Double A Premium ouverte, avec des feuilles A4 blanches posées à côté et un carton en arrière-plan"
                fill
                priority
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-contain"
              />
            </div>
            <div className="absolute -bottom-5 left-4 rounded-carte border border-profond/10 bg-white px-4 py-3 sm:left-8">
              <p className="font-titre text-sm font-bold text-nuit">Papier Double A Premium</p>
              <p className="text-xs text-encre/65">Double qualité · Recto verso</p>
            </div>
          </div>
        </div>

        {/* Indicateur « Faites défiler » */}
        <a
          href="#montage"
          className="absolute bottom-3 left-1/2 flex min-h-11 -translate-x-1/2 items-center gap-2 text-[11px] font-medium uppercase tracking-widest text-encre/55"
        >
          Faites défiler
          <span className="relative block h-5 w-px overflow-hidden bg-profond/20" aria-hidden="true">
            <span className="absolute inset-x-0 top-0 h-2 bg-profond motion-safe:animate-[defile_1.6s_ease-in-out_infinite]" />
          </span>
        </a>
      </section>

      {/* Bandeau de chiffres clés */}
      <section aria-label="Chiffres clés" className="border-y border-profond/10 bg-white px-4 sm:px-6">
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

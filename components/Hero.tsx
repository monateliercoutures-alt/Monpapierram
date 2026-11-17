import { MESSAGE_GENERAL, lienWhatsApp } from "@/lib/config";
import { IconeWhatsApp } from "./Icones";

// Section d'accueil : titre, sous-titre, deux boutons, indicateur de défilement
export default function Hero() {
  return (
    <section className="relative flex min-h-[88vh] flex-col items-center justify-center bg-brume px-4 pb-24 pt-32 text-center sm:px-6">
      <p className="mb-5 inline-flex items-center rounded-full border border-profond/15 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-profond">
        Double A Premium · A4 80 g/m²
      </p>

      <h1 className="mx-auto max-w-4xl text-[2.25rem] font-bold leading-[1.15] text-nuit sm:text-5xl lg:text-[3.5rem] lg:leading-[1.12]">
        Le papier qui imprime net, livré chez vous à <span className="text-profond">Abidjan</span>
      </h1>

      <p className="mx-auto mt-6 max-w-2xl text-base text-encre/75 sm:text-lg">
        Ramettes de 500 feuilles et cartons de 5 ramettes Double A Premium. Une blancheur
        uniforme, un papier lisse et fiable, pour la maison, l&apos;école et le bureau.
      </p>

      <div className="mt-9 flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
        <a
          href="#produits"
          className="inline-flex min-h-12 items-center justify-center rounded-bouton bg-profond px-7 font-semibold text-white transition-colors hover:bg-nuit"
        >
          Voir les tarifs
        </a>
        <a
          href={lienWhatsApp(MESSAGE_GENERAL)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-bouton border border-profond/25 bg-white px-7 font-semibold text-profond transition-colors hover:border-profond"
        >
          <IconeWhatsApp />
          Commander sur WhatsApp
        </a>
      </div>

      {/* Indicateur « Faites défiler » */}
      <a
        href="#montage"
        className="absolute bottom-6 flex min-h-11 flex-col items-center gap-2 text-xs font-medium uppercase tracking-widest text-encre/60"
      >
        Faites défiler
        <span className="relative block h-8 w-px overflow-hidden bg-profond/20" aria-hidden="true">
          <span className="absolute inset-x-0 top-0 h-3 bg-profond motion-safe:animate-[defile_1.6s_ease-in-out_infinite]" />
        </span>
      </a>
    </section>
  );
}

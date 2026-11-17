import Image from "next/image";
import { MESSAGE_GENERAL, lienWhatsApp } from "@/lib/config";
import { IconeWhatsApp } from "./Icones";

// Section d'accueil : image panoramique pleine largeur, titre et boutons dans la zone vide à gauche
export default function Hero() {
  return (
    <section className="bg-white">
      {/* Cadre : sur grand écran l'image est en fond et le texte à gauche ; en dessous, texte puis image */}
      <div className="hero-cadre relative flex flex-col xl:block">
        {/* Image : seule la zone vide à gauche peut être rognée (object-right), jamais les produits */}
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
        <div className="relative z-10 order-1 px-4 pb-10 pt-10 sm:px-6 xl:absolute xl:inset-y-0 xl:left-0 xl:flex xl:items-center xl:p-0 xl:pl-[max(4rem,6vw)]">
          <div className="mx-auto text-center xl:mx-0 xl:w-[29vw] xl:max-w-[34rem] xl:text-left">
            <h1 className="text-[2.1rem] font-bold leading-[1.12] text-nuit sm:text-5xl xl:text-[clamp(2rem,2.9vw,3.4rem)]">
              Le papier qui imprime net, livré chez vous à <span className="text-profond">Abidjan</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-encre/80 sm:text-lg xl:mx-0 xl:text-[clamp(0.95rem,1.05vw,1.1rem)]">
              Ramettes et cartons de papier A4 Double A Premium 80 g/m². Commandez en ligne, nous confirmons et livrons.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center xl:flex-col xl:items-start min-[1700px]:flex-row">
              <a
                href="#produits"
                className="inline-flex min-h-12 items-center justify-center whitespace-nowrap rounded-bouton bg-profond px-7 font-semibold text-white hover:bg-nuit"
              >
                Voir les tarifs
              </a>
              <a
                href={lienWhatsApp(MESSAGE_GENERAL)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-bouton border border-profond/30 bg-white px-7 font-semibold text-profond hover:border-profond"
              >
                <IconeWhatsApp />
                Commander sur WhatsApp
              </a>
            </div>

            <p className="mt-5 text-sm text-encre/75">Livraison à Abidjan sous 24 à 48 h · Paiement à la livraison ou Mobile Money</p>
          </div>
        </div>
      </div>
    </section>
  );
}

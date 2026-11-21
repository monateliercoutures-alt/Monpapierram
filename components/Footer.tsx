import Image from "next/image";
import { MARQUES, MOYENS_MOBILE, slugMarque, SITE, MESSAGE_GENERAL, lienWhatsApp } from "@/lib/config";
import { IconeWhatsApp } from "./Icones";

// Pied de page simple : logo, liens utiles, contact, paiements, copyright
export default function Footer() {
  return (
    <footer id="contact" className="border-t border-profond/15 bg-white px-4 pb-24 pt-8 text-sm text-encre sm:px-6 sm:pb-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <Image src="/images/logo.png" alt={SITE.nom} width={895} height={268} className="h-10 w-auto self-start" />

          <div className="flex flex-col gap-1 md:items-end">
            <a href={lienWhatsApp(MESSAGE_GENERAL)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-9 items-center gap-2 font-semibold hover:text-profond hover:underline">
              <IconeWhatsApp className="h-5 w-5" />
              WhatsApp : {SITE.whatsappAffiche}
            </a>
            <a href={`mailto:${SITE.email}`} className="inline-flex min-h-9 items-center break-all hover:text-profond hover:underline">
              {SITE.email}
            </a>
          </div>
        </div>

        {/* Liens utiles et marques (une seule ligne qui passe à la suivante si besoin) */}
        <nav aria-label="Liens utiles" className="mt-5">
          <ul className="flex flex-wrap gap-x-5 gap-y-1 text-encre/80">
            {[
              ["/papier-rame-abidjan", "Papier rame Abidjan"],
              ["/livraison", "Livraison"],
              ["/politique-de-retour", "Retours"],
              ["/#faq", "FAQ"],
            ].map(([href, label]) => (
              <li key={href}>
                <a href={href} className="inline-flex min-h-9 items-center font-medium hover:text-profond hover:underline">{label}</a>
              </li>
            ))}
            {MARQUES.map((m) => (
              <li key={m}>
                <a href={`/marques/${slugMarque(m)}`} className="inline-flex min-h-9 items-center hover:text-profond hover:underline">{m}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-5 flex flex-col gap-4 border-t border-profond/15 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex flex-wrap items-center gap-2" aria-label="Moyens de paiement">
            <li className="flex h-9 items-center rounded-bouton border border-profond/20 px-3 text-xs font-semibold">À la livraison</li>
            {MOYENS_MOBILE.map((m) => (
              <li key={m.nom} className="flex h-9 items-center rounded-bouton border border-profond/20 px-2" style={{ background: m.fond }}>
                <Image src={m.logo} alt={m.nom} width={m.l} height={m.h} className="h-5 w-auto" />
              </li>
            ))}
          </ul>
          <p className="text-xs text-encre/65">© 2025 Monpapierrame. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}

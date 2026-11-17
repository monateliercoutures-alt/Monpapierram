import Image from "next/image";
import { MOYENS_MOBILE, SITE, MESSAGE_GENERAL, lienWhatsApp } from "@/lib/config";
import { IconeWhatsApp } from "./Icones";

// Pied de page : liens, contacts, zone de livraison
export default function Footer() {
  return (
    <footer id="contact" className="bg-nuit px-4 pb-24 pt-14 sm:pb-10 sm:pt-16 text-white sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.1fr_1.1fr_1.3fr_1.1fr]">
          <div>
            <Image src="/images/logo-blanc.png" alt={SITE.nom} width={895} height={268} className="h-14 w-auto" />
            <p className="mt-3 max-w-xs text-sm text-white/75">
              Fournisseur de papier A4 Double A en Côte d'Ivoire, livré partout dans le pays.
            </p>
          </div>

          <div>
            <h2 className="font-sans text-sm font-semibold text-cyan">La boutique</h2>
            <ul className="mt-4 space-y-1 text-sm">
              {[
                ["/#produits", "Nos produits"],
                ["/#avantages", "Pourquoi Double A"],
                ["/#a-propos", "À propos et livraison"],
                ["/#guide", "Guide d'achat"],
                ["/#faq", "Questions fréquentes"],
              ].map(([href, label]) => (
                <li key={href}>
                  <a href={href} className="inline-flex min-h-11 items-center text-white/85 hover:underline">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-sans text-sm font-semibold text-cyan">Contact</h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={lienWhatsApp(MESSAGE_GENERAL)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 whitespace-nowrap font-semibold hover:underline"
                >
                  <IconeWhatsApp className="h-5 w-5" />
                  WhatsApp : {SITE.whatsappAffiche}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="inline-flex min-h-11 items-center hover:underline">
                  {SITE.email}
                </a>
              </li>
              <li className="text-white/75">{SITE.horaires}</li>
            </ul>
          </div>

          <div>
            <h2 className="font-sans text-sm font-semibold text-cyan">Zone de livraison</h2>
            <p className="mt-4 text-sm text-white/75">{SITE.zone}</p>
          </div>
        </div>

        {/* Moyens de paiement */}
        <div className="mt-12 border-t border-white/15 pt-6">
          <h2 className="font-sans text-sm font-semibold text-cyan">Moyens de paiement</h2>
          <ul className="mt-3 grid grid-cols-4 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
            <li className="col-span-4 flex h-12 items-center justify-center rounded-bouton border border-white/30 px-4 text-sm font-semibold sm:justify-start">
              Paiement à la livraison
            </li>
            {MOYENS_MOBILE.map((m) => (
              <li
                key={m.nom}
                className="flex h-12 items-center justify-center rounded-bouton border border-white/30 px-2 sm:px-3"
                style={{ background: m.fond }}
              >
                <Image src={m.logo} alt={m.nom} width={m.l} height={m.h} className="h-7 w-auto max-w-full sm:h-8" />
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-white/15 pt-6 text-xs text-white/65">
          <p>© 2025 Monpapierrame. Tous droits réservés.</p>
          <a href="#" className="inline-flex min-h-11 items-center gap-1 font-semibold text-white/85 hover:underline">
            Retour en haut <span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

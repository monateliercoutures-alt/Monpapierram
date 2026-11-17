import { SITE, MESSAGE_GENERAL, lienWhatsApp } from "@/lib/config";
import { IconeWhatsApp } from "./Icones";

// Pied de page : contacts, zone de livraison, mentions légales
export default function Footer() {
  return (
    <footer id="contact" className="bg-nuit px-4 pb-10 pt-16 text-white sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-titre text-2xl font-bold">
              Mon<span className="text-cyan">papier</span>ram
            </p>
            <p className="mt-3 max-w-xs text-sm text-white/75">
              Ramettes de papier A4 Double A Premium, livrées à Abidjan.
            </p>
          </div>

          <div>
            <h2 className="font-sans text-sm font-semibold uppercase tracking-widest text-cyan">Contact</h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={lienWhatsApp(MESSAGE_GENERAL)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 font-semibold hover:underline"
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
            <h2 className="font-sans text-sm font-semibold uppercase tracking-widest text-cyan">Zone de livraison</h2>
            <p className="mt-4 text-sm text-white/75">{SITE.zone}</p>
          </div>
        </div>

        <div className="mt-12 border-t border-white/15 pt-6 text-xs leading-relaxed text-white/65">
          <p className="font-semibold text-white/85">Mentions légales</p>
          <p className="mt-2">
            {SITE.nom} — boutique de vente de papier, Abidjan, Côte d&apos;Ivoire. Éditeur du site :{" "}
            {SITE.nom} (RCCM et numéro de compte contribuable : à renseigner). Hébergeur : Vercel Inc. /
            Netlify Inc. Les prix sont indicatifs, exprimés en FCFA, et confirmés à la commande.
            « Double A » est une marque de son propriétaire ; Monpapierram est un revendeur indépendant.
          </p>
          <p className="mt-3">© {new Date().getFullYear()} {SITE.nom}. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}

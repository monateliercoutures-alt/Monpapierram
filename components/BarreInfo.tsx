import { SITE } from "@/lib/config";

// Bandeau d'informations pratiques tout en haut de la page
export default function BarreInfo() {
  return (
    <div className="bg-nuit text-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-1 px-4 py-2 text-xs sm:justify-between sm:px-6">
        <p>Livraison à Abidjan sous 24 à 48 h · Paiement à la livraison ou Mobile Money</p>
        <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-8 items-center font-semibold hover:underline">
          WhatsApp : {SITE.whatsappAffiche}
        </a>
      </div>
    </div>
  );
}

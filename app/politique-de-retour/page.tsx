import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { MESSAGE_RETOUR, SITE, lienWhatsApp } from "@/lib/config";
import { IconeWhatsApp } from "@/components/Icones";

export const metadata: Metadata = {
  title: "Retour et Échange Papier Rame A4 | Monpapierrame",
  description: "Retour possible 24 à 72 h après la livraison de votre papier rame A4. Contactez-nous sur WhatsApp avec une photo du produit.",
  alternates: { canonical: "/politique-de-retour" },
};

// Page de politique de retour (lien demandé par Google Merchant Center)
export default function PolitiqueRetour() {
  return (
    <>
      <Header />
      <main id="contenu" className="bg-white px-4 py-12 sm:px-6 sm:py-16">
        <article className="mx-auto max-w-3xl">
          <h1 className="text-2xl font-bold text-nuit sm:text-4xl">Politique de retour</h1>
          <p className="mt-3 text-encre/75">
            {SITE.nom} · papier rame A4 Double A, Paper One, Globulus, Paper Pro, Authentik, Smart Copy, Ultima Copy, Roch, Aone et Aria, livré partout en Côte d&apos;Ivoire.
          </p>

          <section className="mt-8">
            <h2 className="text-xl font-bold text-nuit">Délai de retour : {SITE.delaiRetour}</h2>
            <p className="justifie mt-2 text-encre/85">
              Vous pouvez demander un retour dans un délai de <strong>24 à 72 heures après la livraison</strong> de
              votre commande. Passé ce délai, nous ne pouvons plus accepter la demande.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-xl font-bold text-nuit">Comment demander un retour ?</h2>
            <ol className="mt-3 space-y-3 text-encre/85">
              <li>
                <strong className="text-nuit">1. Contactez-nous sur WhatsApp</strong> au {SITE.whatsappAffiche} (ou par e-mail à{" "}
                <a href={`mailto:${SITE.email}`} className="font-semibold text-profond underline">{SITE.email}</a>), dans le
                délai de 24 à 72 h après la livraison.
              </li>
              <li>
                <strong className="text-nuit">2. Envoyez une photo</strong> du produit et de son emballage, avec votre
                nom et votre référence de commande.
              </li>
              <li>
                <strong className="text-nuit">3. Nous vous répondons</strong> et convenons avec vous de la suite à
                donner.
              </li>
            </ol>
          </section>

          <section className="mt-8">
            <h2 className="text-xl font-bold text-nuit">Livraison</h2>
            <p className="justifie mt-2 text-encre/85">
              Les commandes confirmées sont livrées en {SITE.delaiLivraison}, à Abidjan et dans toute la Côte
              d&apos;Ivoire. Les frais de livraison sont confirmés à la commande sur WhatsApp, selon votre ville.
            </p>
          </section>

          <a
            href={lienWhatsApp(MESSAGE_RETOUR)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex min-h-12 items-center gap-2 rounded-bouton bg-profond px-7 font-semibold text-white hover:bg-nuit"
          >
            <IconeWhatsApp />
            Demander un retour sur WhatsApp
          </a>
        </article>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

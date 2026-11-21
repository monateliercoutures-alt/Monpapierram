import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { IconeWhatsApp } from "@/components/Icones";
import { COMMUNES, MESSAGE_GENERAL, MODES_PAIEMENT, SITE, lienWhatsApp } from "@/lib/config";

export const metadata: Metadata = {
  title: "Livraison de papier rame A4 en Côte d'Ivoire | Monpapierrame",
  description: "Livraison de papier rame A4 à Abidjan (Cocody, Yopougon, Abobo) et partout en Côte d'Ivoire en 24 à 72 h. Paiement à la livraison ou Mobile Money.",
  alternates: { canonical: "/livraison" },
};

const ABIDJAN = COMMUNES.slice(0, 11);
const VILLES = COMMUNES.slice(11, -1);

// Page « Livraison » : zones, délais, paiement et retours (contenu indexable)
export default function PageLivraison() {
  return (
    <>
      <Header />
      <main id="contenu" className="bg-white px-4 py-12 sm:px-6 sm:py-16">
        <article className="mx-auto max-w-3xl">
          <h1 className="text-2xl font-bold text-nuit sm:text-4xl">Livraison de papier rame A4 en Côte d&apos;Ivoire</h1>
          <p className="justifie mt-4 text-encre/85">
            {SITE.nom} livre le papier rame A4 (ramettes et cartons Double A, Paper One, Globulus, Paper Pro, Authentik, Smart Copy, Ultima Copy et Roch) à
            Abidjan et dans toute la Côte d&apos;Ivoire. Les commandes confirmées sont livrées en <strong>{SITE.delaiLivraison}</strong>.
          </p>

          <section className="mt-10">
            <h2 className="text-xl font-bold text-nuit">Livraison à Abidjan</h2>
            <p className="justifie mt-2 text-encre/85">Nous livrons dans toutes les communes d&apos;Abidjan :</p>
            <ul className="mt-3 grid gap-x-8 gap-y-1 text-encre/85 sm:grid-cols-2">
              {ABIDJAN.map((v) => (
                <li key={v} className="flex gap-2"><span className="text-cyan" aria-hidden="true">✓</span>{v}</li>
              ))}
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-bold text-nuit">Livraison dans le reste du pays</h2>
            <p className="justifie mt-2 text-encre/85">
              Nous livrons aussi dans les autres villes de Côte d&apos;Ivoire, par exemple :
            </p>
            <ul className="mt-3 grid gap-x-8 gap-y-1 text-encre/85 sm:grid-cols-2">
              {VILLES.map((v) => (
                <li key={v} className="flex gap-2"><span className="text-cyan" aria-hidden="true">✓</span>{v}</li>
              ))}
            </ul>
            <p className="justifie mt-3 text-encre/85">Votre ville n&apos;est pas dans la liste ? Écrivez-nous sur WhatsApp : nous confirmons la livraison.</p>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-bold text-nuit">Délais et frais</h2>
            <dl className="mt-3 divide-y divide-profond/10 border-y border-profond/10">
              <div className="grid grid-cols-[8rem_1fr] gap-4 py-3"><dt className="font-semibold text-nuit">Délai</dt><dd className="text-encre/85">{SITE.delaiLivraison} après confirmation de la commande</dd></div>
              <div className="grid grid-cols-[8rem_1fr] gap-4 py-3"><dt className="font-semibold text-nuit">Frais</dt><dd className="text-encre/85">Confirmés à la commande sur WhatsApp, selon votre ville</dd></div>
              <div className="grid grid-cols-[8rem_1fr] gap-4 py-3"><dt className="font-semibold text-nuit">Horaires</dt><dd className="text-encre/85">{SITE.horaires}</dd></div>
            </dl>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-bold text-nuit">Paiement</h2>
            <p className="mt-2 text-encre/85">Moyens de paiement acceptés :</p>
            <ul className="mt-3 grid gap-x-8 gap-y-1 text-encre/85 sm:grid-cols-2">
              {MODES_PAIEMENT.map((m) => (
                <li key={m} className="flex gap-2"><span className="text-cyan" aria-hidden="true">✓</span>{m}</li>
              ))}
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-bold text-nuit">Retours</h2>
            <p className="justifie mt-2 text-encre/85">
              Un retour est possible {SITE.delaiRetour}. Toutes les conditions sont sur la page{" "}
              <Link href="/politique-de-retour" className="font-semibold text-profond underline">politique de retour</Link>.
            </p>
          </section>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/#produits" className="inline-flex min-h-12 items-center justify-center rounded-bouton bg-profond px-7 font-semibold text-white hover:bg-nuit">Voir les produits</Link>
            <a href={lienWhatsApp(MESSAGE_GENERAL)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-bouton border border-profond/30 px-7 font-semibold text-profond hover:border-profond">
              <IconeWhatsApp />
              Poser une question sur WhatsApp
            </a>
          </div>
        </article>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

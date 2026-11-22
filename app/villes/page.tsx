import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { LIEUX, MARQUES, SITE } from "@/lib/config";

const TITRE = "Papier Rame et Ramette : Villes Livrées | Monpapierrame";
const DESCRIPTION = "Papier rame A4 livré à Abidjan (Cocody, Yopougon, Abobo…), Bouaké, Yamoussoukro, San-Pédro, Daloa, Korhogo et dans toutes les villes de Côte d'Ivoire.";

export const metadata: Metadata = {
  title: TITRE,
  description: DESCRIPTION,
  alternates: { canonical: "/villes" },
  openGraph: { title: TITRE, description: DESCRIPTION, url: "/villes" },
};

// Page d'index : toutes les villes et communes desservies
export default function PageVilles() {
  const communes = LIEUX.filter((l) => l.type === "commune");
  const villes = LIEUX.filter((l) => l.type === "ville");
  const liste = (l: typeof LIEUX) => (
    <ul className="mt-3 grid gap-x-6 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">
      {l.map((x) => (
        <li key={x.slug}>
          <Link href={`/villes/${x.slug}`} className="inline-flex min-h-11 items-center font-semibold text-profond underline">
            Papier rame {x.nom}
          </Link>
        </li>
      ))}
    </ul>
  );
  return (
    <>
      <Header />
      <main id="contenu" className="bg-white px-4 py-8 sm:px-6 sm:py-12">
        <div className="mx-auto max-w-5xl">
          <nav aria-label="Fil d'Ariane" className="text-sm text-encre/70">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="inline-flex min-h-8 items-center hover:underline">Accueil</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-semibold text-nuit">Villes desservies</li>
            </ol>
          </nav>
          <h1 className="mt-4 text-2xl font-bold text-nuit sm:text-4xl">Papier rame livré dans toute la Côte d&apos;Ivoire</h1>
          <p className="justifie mt-4 max-w-3xl text-encre/85">
            {SITE.nom}, grossiste papier rame à Abidjan, livre le papier rame A4 de {MARQUES.length} marques dans toutes les communes d&apos;Abidjan et dans les grandes villes du pays, en {SITE.delaiLivraison} après confirmation de la commande.
            Choisissez votre ville pour voir les prix, les marques et les conditions de livraison.
          </p>
          <h2 className="mt-10 text-xl font-bold text-nuit">Papier rame dans les communes d&apos;Abidjan</h2>
          {liste(communes)}
          <h2 className="mt-10 text-xl font-bold text-nuit">Papier rame dans les villes de l&apos;intérieur</h2>
          {liste(villes)}
          <p className="justifie mt-10 max-w-3xl text-encre/85">
            Votre ville n&apos;est pas dans la liste ? Écrivez-nous sur WhatsApp : nous livrons partout en Côte d&apos;Ivoire. Consultez aussi la page{" "}
            <Link href="/livraison" className="font-semibold text-profond underline">livraison</Link> et la page{" "}
            <Link href="/papier-rame-abidjan" className="font-semibold text-profond underline">papier rame Abidjan</Link>.
          </p>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

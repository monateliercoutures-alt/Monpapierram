import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProduitCarte from "@/components/ProduitCarte";
import { IconeWhatsApp } from "@/components/Icones";
import {
  COMMUNES,
  MARQUES,
  MESSAGE_GENERAL,
  MODES_PAIEMENT,
  PRODUITS,
  SEUIL_GROS,
  SITE,
  formatPrixTexte,
  lienWhatsApp,
  slugMarque,
} from "@/lib/config";

// Prix d'appel : le prix le plus bas affiché sur la page (se met à jour avec les produits)
const PRIX = PRODUITS.map((p) => p.prix).filter((x): x is number => x !== null);
const PRIX_MIN = PRIX.length ? formatPrixTexte(Math.min(...PRIX)) : "prix sur demande";

const TITRE = "Papier Rame Abidjan : Prix, Carton et Gros | Monpapierrame";
const DESCRIPTION = `Achetez du papier rame A4 à Abidjan : Double A, Paper One, Globulus, Smart Copy… Dès ${PRIX_MIN}. Carton, gros, livraison Cocody, Yopougon, Abobo.`;

export const metadata: Metadata = {
  title: TITRE,
  description: DESCRIPTION,
  alternates: { canonical: "/papier-rame-abidjan" },
  openGraph: { title: TITRE, description: DESCRIPTION, url: "/papier-rame-abidjan", images: [{ url: PRODUITS[0].image }] },
};

const ABIDJAN = COMMUNES.slice(0, 11);

const FAQ_ABIDJAN = [
  {
    q: "Où acheter du papier rame à Abidjan ?",
    r: `Chez ${SITE.nom}, grossiste et fournisseur de papier rame A4 à Abidjan. Vous commandez en ligne ou sur WhatsApp et nous livrons à votre adresse dans toutes les communes d'Abidjan.`,
  },
  {
    q: "Quel est le prix d'une rame de papier A4 à Abidjan ?",
    r: `Les prix démarrent à ${PRIX_MIN}. Le détail de chaque marque (ramette, carton, gros) est indiqué sur cette page et sur chaque fiche produit.`,
  },
  {
    q: "Livrez-vous le papier rame à Cocody, Yopougon, Abobo et Marcory ?",
    r: `Oui, nous livrons dans toutes les communes d'Abidjan : ${ABIDJAN.join(", ")}. Délai : ${SITE.delaiLivraison}. Les frais sont confirmés à la commande sur WhatsApp.`,
  },
  {
    q: "Quelles marques de papier rame trouve-t-on à Abidjan chez vous ?",
    r: `${MARQUES.join(", ")}. Toutes en format A4 de 500 feuilles par ramette, 5 ramettes par carton.`,
  },
  {
    q: "Vendez-vous du papier rame en gros à Abidjan ?",
    r: `Oui, à partir de ${SEUIL_GROS} cartons, le tarif gros s'applique, avec facture sur demande. C'est l'offre des écoles, entreprises, cybercafés, imprimeries et revendeurs.`,
  },
  {
    q: "Comment payer ma commande de papier rame ?",
    r: `${MODES_PAIEMENT.join(", ")}.`,
  },
];

// Page « Papier rame Abidjan » : regroupe tous les produits (les nouveaux apparaissent automatiquement)
export default function PagePapierRameAbidjan() {
  // Marques dans l'ordre d'affichage, puis celles ajoutées plus tard dans PRODUITS
  const marques = [...MARQUES, ...PRODUITS.map((p) => p.marque).filter((m) => !MARQUES.includes(m))].filter((m, i, a) => a.indexOf(m) === i);

  const donnees = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "Papier rame à Abidjan",
        url: `${SITE.url}/papier-rame-abidjan`,
        description: DESCRIPTION,
        inLanguage: "fr",
        about: { "@type": "Place", name: "Abidjan, Côte d'Ivoire" },
      },
      {
        "@type": "ItemList",
        itemListElement: PRODUITS.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.nom, url: `${SITE.url}/produits/${p.slug}` })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: SITE.url },
          { "@type": "ListItem", position: 2, name: "Papier rame Abidjan", item: `${SITE.url}/papier-rame-abidjan` },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQ_ABIDJAN.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.r } })),
      },
    ],
  };

  return (
    <>
      <Header />
      <main id="contenu" className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
          <nav aria-label="Fil d'Ariane" className="text-sm text-encre/70">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="inline-flex min-h-8 items-center hover:underline">Accueil</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-semibold text-nuit">Papier rame Abidjan</li>
            </ol>
          </nav>

          <h1 className="mt-4 text-2xl font-bold text-nuit sm:text-4xl">Papier rame à Abidjan : prix, carton et gros</h1>
          <p className="justifie mt-4 max-w-3xl text-encre/85">
            Vous cherchez du <strong>papier rame A4 à Abidjan</strong> ? {SITE.nom} est grossiste et fournisseur de rames de papier pour les
            entreprises, écoles, administrations, cybercafés, imprimeries et particuliers. Choisissez votre marque ci-dessous : ramette de 500 feuilles,
            carton de 5 ramettes (2&nbsp;500 feuilles) ou carton en gros dès {SEUIL_GROS} cartons, avec des prix à partir de <strong>{PRIX_MIN}</strong>.
          </p>
          <p className="justifie mt-3 max-w-3xl text-encre/85">
            Nous livrons à <strong>Cocody, Yopougon, Abobo, Marcory, Koumassi, Plateau, Treichville</strong> et dans toutes les communes d&apos;Abidjan en {SITE.delaiLivraison},
            avec paiement à la livraison ou par Mobile Money.
          </p>

          <nav aria-label="Marques de papier rame" className="mt-6">
            <ul className="flex flex-wrap gap-3">
              {marques.map((m) => (
                <li key={m}>
                  <Link href={`/marques/${slugMarque(m)}`} className="inline-flex min-h-11 items-center rounded-bouton border border-profond/25 px-5 font-semibold text-profond hover:border-profond">
                    Papier rame {m}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {marques.map((m) => {
            const liste = PRODUITS.filter((p) => p.marque === m);
            if (!liste.length) return null;
            return (
              <section key={m} aria-labelledby={`marque-${slugMarque(m)}`} className="mt-12">
                <h2 id={`marque-${slugMarque(m)}`} className="text-xl font-bold text-nuit sm:text-2xl">
                  <Link href={`/marques/${slugMarque(m)}`} className="hover:underline">Papier rame {m} à Abidjan</Link>
                </h2>
                <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {liste.map((p) => (
                    <ProduitCarte key={p.id} p={p} />
                  ))}
                </ul>
              </section>
            );
          })}

          <section aria-labelledby="titre-zones" className="mt-14 border-t border-profond/10 pt-10">
            <h2 id="titre-zones" className="text-xl font-bold text-nuit">Livraison de papier rame dans toutes les communes d&apos;Abidjan</h2>
            <p className="justifie mt-3 max-w-3xl text-encre/85">
              Où que vous soyez à Abidjan, nous livrons votre commande de papier rame A4 en {SITE.delaiLivraison}. Les frais de livraison sont confirmés avec vous sur WhatsApp.
            </p>
            <ul className="mt-4 grid gap-x-8 gap-y-1 text-encre/85 sm:grid-cols-2 lg:grid-cols-3">
              {ABIDJAN.map((v) => (
                <li key={v} className="flex gap-2"><span className="text-cyan" aria-hidden="true">✓</span>Papier rame {v}</li>
              ))}
            </ul>
            <p className="justifie mt-4 max-w-3xl text-encre/85">
              Nous livrons aussi dans les autres villes : voir la page <Link href="/livraison" className="font-semibold text-profond underline">livraison en Côte d&apos;Ivoire</Link>.
            </p>
          </section>

          <section aria-labelledby="titre-faq-abj" className="mt-14 border-t border-profond/10 pt-10">
            <h2 id="titre-faq-abj" className="text-xl font-bold text-nuit">Questions fréquentes : papier rame à Abidjan</h2>
            <dl className="mt-4 divide-y divide-profond/10 border-y border-profond/10">
              {FAQ_ABIDJAN.map((f) => (
                <div key={f.q} className="py-4">
                  <dt className="font-semibold text-nuit">{f.q}</dt>
                  <dd className="justifie mt-1 text-encre/85">{f.r}</dd>
                </div>
              ))}
            </dl>
            <a
              href={lienWhatsApp(MESSAGE_GENERAL)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-bouton bg-profond px-7 font-semibold text-white hover:bg-nuit"
            >
              <IconeWhatsApp />
              Commander sur WhatsApp
            </a>
          </section>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(donnees) }} />
    </>
  );
}

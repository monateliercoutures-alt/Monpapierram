import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProduitCarte from "@/components/ProduitCarte";
import { IconeWhatsApp } from "@/components/Icones";
import {
  CONTENU_MARQUES,
  MARQUES,
  SEUIL_GROS,
  SITE,
  formatPrixTexte,
  grammage,
  lienWhatsApp,
  metaMarque,
  produitsMarque,
  slugMarque,
  trouverMarque,
} from "@/lib/config";

// Une page est générée pour chaque marque : /marques/papier-rame-authentik, etc.
export function generateStaticParams() {
  return MARQUES.map((m) => ({ slug: slugMarque(m) }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const marque = trouverMarque(slug);
  if (!marque) return {};
  const titre = metaMarque(marque, "titre");
  const description = metaMarque(marque, "description");
  const image = produitsMarque(marque)[0]?.image;
  return {
    title: titre,
    description,
    alternates: { canonical: `/marques/${slug}` },
    openGraph: { title: titre, description, url: `/marques/${slug}`, images: image ? [{ url: image }] : undefined },
  };
}

export default async function PageMarque({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const marque = trouverMarque(slug);
  if (!marque) notFound();

  const produits = produitsMarque(marque);
  const carton = produits.find((p) => p.minQty === 1 && p.id.endsWith("carton")) ?? produits[0];
  const gros = produits.find((p) => p.minQty > 1);
  const g = carton ? grammage(carton) : "";
  const autres = MARQUES.filter((m) => m !== marque);
  const prixTxt = (x?: { prix: number | null }) => (x && x.prix !== null ? formatPrixTexte(x.prix) : "prix sur demande");
  const contenu = CONTENU_MARQUES[marque]?.({
    carton: prixTxt(carton),
    gros: prixTxt(gros),
    ramette: prixTxt(produits.find((p) => p.id === "ramette")),
    g,
  });
  const message = `Bonjour ${SITE.nom}, je souhaite un devis pour du papier rame A4 ${marque} (quantité : ... cartons, ville de livraison : ...).`;

  // Questions-réponses propres à la marque
  const faq = [
    {
      q: `Quel est le prix du papier rame ${marque} en Côte d'Ivoire ?`,
      r: `Le carton de 5 ramettes de papier A4 ${marque} (${g}) est à ${carton?.prix ? formatPrixTexte(carton.prix) : "prix sur demande"}${
        gros?.prix ? `, et à ${formatPrixTexte(gros.prix)} le carton à partir de ${SEUIL_GROS} cartons` : ""
      }. Livraison confirmée sur WhatsApp selon votre ville.`,
    },
    {
      q: `Où acheter du papier rame ${marque} à Abidjan ?`,
      r: `Chez ${SITE.nom}, grossiste et fournisseur de papier rame A4 à Abidjan. Vous commandez en ligne ou sur WhatsApp, et nous livrons en ${SITE.delaiLivraison} à Abidjan et dans toute la Côte d'Ivoire.`,
    },
    {
      q: `Pouvez-vous fournir mon entreprise ou mon école en papier ${marque} ?`,
      r: `Oui. Nous fournissons les entreprises, administrations, écoles, universités, cybercafés, imprimeries et revendeurs, avec facture sur demande et tarif dégressif à partir de ${SEUIL_GROS} cartons. Demandez un devis sur WhatsApp.`,
    },
    {
      q: "Quels sont les moyens de paiement ?",
      r: "Paiement à la livraison, Orange Money, MTN MoMo, Moov Money ou Wave.",
    },
    ...(contenu?.faq ?? []),
  ];

  const donnees = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: `Papier rame ${marque}`,
        url: `${SITE.url}/marques/${slug}`,
        description: metaMarque(marque, "description"),
        inLanguage: "fr",
      },
      {
        "@type": "ItemList",
        itemListElement: produits.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.nom, url: `${SITE.url}/produits/${p.slug}` })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: SITE.url },
          { "@type": "ListItem", position: 2, name: "Produits", item: `${SITE.url}/#produits` },
          { "@type": "ListItem", position: 3, name: `Papier rame ${marque}`, item: `${SITE.url}/marques/${slug}` },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.r } })),
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
              <li><Link href="/#produits" className="inline-flex min-h-8 items-center hover:underline">Produits</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-semibold text-nuit">Papier rame {marque}</li>
            </ol>
          </nav>

          <h1 className="mt-4 text-2xl font-bold text-nuit sm:text-4xl">{contenu?.h1 ?? `Papier rame ${marque} en Côte d'Ivoire`}</h1>
          <p className="justifie mt-4 max-w-3xl text-encre/85">
            {SITE.nom} est grossiste et fournisseur de <strong>papier rame A4 {marque}</strong> ({g}, 500 feuilles par ramette) à Abidjan et partout en Côte
            d&apos;Ivoire. Le carton contient 5 ramettes, soit 2&nbsp;500 feuilles. Commandez en ligne ou sur WhatsApp : livraison en {SITE.delaiLivraison}, paiement à la livraison ou par Mobile Money.
          </p>

          {contenu?.intro.map((t) => (
            <p key={t} className="justifie mt-3 max-w-3xl text-encre/85">{t}</p>
          ))}

          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {produits.map((p) => (
              <ProduitCarte key={p.id} p={p} />
            ))}
          </ul>

          {contenu && (
            <section aria-labelledby="titre-atouts" className="mt-14 border-t border-profond/10 pt-10">
              <h2 id="titre-atouts" className="text-xl font-bold text-nuit">Pourquoi acheter le papier rame {marque} chez {SITE.nom}</h2>
              <ul className="mt-4 grid gap-4 sm:grid-cols-2">
                {contenu.atouts.map(([t, d]) => (
                  <li key={t} className="rounded-carte border border-profond/15 p-5">
                    <h3 className="font-bold text-nuit">{t}</h3>
                    <p className="justifie mt-1 text-sm text-encre/85">{d}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section aria-labelledby="titre-pro" className="mt-14 grid gap-8 border-t border-profond/10 pt-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <h2 id="titre-pro" className="text-xl font-bold text-nuit">Pour les entreprises, écoles et administrations</h2>
              <p className="justifie mt-3 text-encre/85">
                Vous achetez du papier rame en quantité pour votre entreprise, votre école, votre administration, votre cybercafé ou votre imprimerie ?
                À partir de {SEUIL_GROS} cartons, le tarif gros s&apos;applique{gros?.prix ? ` : ${formatPrixTexte(gros.prix)} le carton de papier ${marque}` : ""}.
                Une facture peut être établie sur demande et la livraison est planifiée avec vous.
              </p>
              <a
                href={lienWhatsApp(message)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex min-h-12 items-center gap-2 rounded-bouton bg-profond px-7 font-semibold text-white hover:bg-nuit"
              >
                <IconeWhatsApp />
                Demander un devis sur WhatsApp
              </a>
            </div>
            <div>
              <h2 className="text-xl font-bold text-nuit">Livraison et retours</h2>
              <p className="justifie mt-3 text-encre/85">
                Livraison en {SITE.delaiLivraison} à Abidjan et dans toute la Côte d&apos;Ivoire. Retour possible {SITE.delaiRetour}. Consultez la page{" "}
                <Link href="/livraison" className="font-semibold text-profond underline">livraison</Link> et la{" "}
                <Link href="/politique-de-retour" className="font-semibold text-profond underline">politique de retour</Link>.
              </p>
            </div>
          </section>

          <section aria-labelledby="titre-faq-marque" className="mt-14 border-t border-profond/10 pt-10">
            <h2 id="titre-faq-marque" className="text-xl font-bold text-nuit">Questions fréquentes sur le papier rame {marque}</h2>
            <dl className="mt-4 divide-y divide-profond/10 border-y border-profond/10">
              {faq.map((f) => (
                <div key={f.q} className="py-4">
                  <dt className="font-semibold text-nuit">{f.q}</dt>
                  <dd className="justifie mt-1 text-encre/85">{f.r}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby="titre-autres-marques" className="mt-14 border-t border-profond/10 pt-10">
            <h2 id="titre-autres-marques" className="text-xl font-bold text-nuit">Autres marques de papier rame</h2>
            <ul className="mt-4 flex flex-wrap gap-3">
              {autres.map((m) => (
                <li key={m}>
                  <Link href={`/marques/${slugMarque(m)}`} className="inline-flex min-h-11 items-center rounded-bouton border border-profond/25 px-5 font-semibold text-profond hover:border-profond">
                    Papier rame {m}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(donnees) }} />
    </>
  );
}

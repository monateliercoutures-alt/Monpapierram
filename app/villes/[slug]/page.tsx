import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProduitCarte from "@/components/ProduitCarte";
import { IconeWhatsApp } from "@/components/Icones";
import { LIEUX, MARQUES, META_LIEUX, MODES_PAIEMENT, PRODUITS, SEUIL_GROS, SITE, formatPrixTexte, lienWhatsApp, slugMarque, trouverLieu } from "@/lib/config";

const PRIX = PRODUITS.map((p) => p.prix).filter((x): x is number => x !== null);
const PRIX_MIN = PRIX.length ? formatPrixTexte(Math.min(...PRIX)) : "prix sur demande";

export function generateStaticParams() {
  return LIEUX.map((l) => ({ slug: l.slug }));
}

// Titre et description propres à chaque lieu (voir META_LIEUX dans lib/config.ts), avec repli automatique
function metas(slug: string, nom: string): { t: string; d: string } {
  const m = META_LIEUX[slug];
  const t = m ? `${m.t} | Monpapierrame` : `Papier Rame ${nom} : Prix et Livraison | Monpapierrame`;
  const d = m ? m.d.replace("{prix}", PRIX_MIN) : `Papier rame A4 livré à ${nom} : carton, gros dès ${SEUIL_GROS} cartons, ramette dès ${PRIX_MIN}. Livraison en ${SITE.delaiLivraison}.`;
  return { t, d };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const l = trouverLieu(slug);
  if (!l) return {};
  const { t, d } = metas(slug, l.nom);
  return { title: t, description: d, alternates: { canonical: `/villes/${slug}` }, openGraph: { title: t, description: d, url: `/villes/${slug}`, images: [{ url: PRODUITS[0].image }] } };
}

// Page locale : papier rame livré dans une ville ou une commune
export default async function PageLieu({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const l = trouverLieu(slug);
  if (!l) notFound();

  const enAbidjan = l.type === "commune";
  const lieu = enAbidjan ? `${l.nom} (Abidjan)` : l.nom;
  const message = `Bonjour ${SITE.nom}, je souhaite commander du papier rame A4 à ${l.nom} (marque : ..., quantité : ...).`;
  const voisins = LIEUX.filter((x) => x.slug !== l.slug && (enAbidjan ? x.type === "commune" : x.type === "ville")).slice(0, 8);

  const faq = [
    { q: `Où acheter du papier rame à ${l.nom} ?`, r: `Chez ${SITE.nom}, grossiste de papier rame A4. Vous commandez en ligne ou sur WhatsApp et nous livrons à ${l.nom}${enAbidjan ? ", à Abidjan," : ""} en ${SITE.delaiLivraison} après confirmation.` },
    { q: `Quel est le prix du papier rame à ${l.nom} ?`, r: `Les prix démarrent à ${PRIX_MIN} la ramette. Le carton de 5 ramettes (2 500 feuilles) est à partir de 12 500 FCFA, et le tarif gros s'applique dès ${SEUIL_GROS} cartons. Les frais de livraison vers ${l.nom} sont confirmés sur WhatsApp.` },
    { q: `Livrez-vous le papier rame en gros à ${l.nom} ?`, r: `Oui. Dès ${SEUIL_GROS} cartons (25 000 feuilles), le prix du carton baisse, avec facture sur demande. C'est l'offre des écoles, entreprises, cybercafés et revendeurs de ${l.nom}.` },
    { q: "Comment payer ma commande ?", r: `${MODES_PAIEMENT.join(", ")}.` },
  ];

  const donnees = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: `Papier rame ${l.nom}`,
        url: `${SITE.url}/villes/${slug}`,
        inLanguage: "fr",
        about: { "@type": "Product", name: "Papier rame A4" },
        provider: { "@type": ["Store", "WholesaleStore"], name: SITE.nom, url: SITE.url, areaServed: { "@type": "City", name: l.nom, containedInPlace: { "@type": "Country", name: "Côte d'Ivoire" } } },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: SITE.url },
          { "@type": "ListItem", position: 2, name: "Villes desservies", item: `${SITE.url}/villes` },
          { "@type": "ListItem", position: 3, name: `Papier rame ${l.nom}`, item: `${SITE.url}/villes/${slug}` },
        ],
      },
      { "@type": "FAQPage", mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.r } })) },
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
              <li><Link href="/villes" className="inline-flex min-h-8 items-center hover:underline">Villes desservies</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-semibold text-nuit">{l.nom}</li>
            </ol>
          </nav>

          <h1 className="mt-4 text-2xl font-bold text-nuit sm:text-4xl">Papier rame à {lieu} : prix, carton et livraison</h1>
          <p className="justifie mt-4 max-w-3xl text-encre/85">
            {l.contexte} {SITE.nom} est grossiste et fournisseur de <strong>papier rame A4</strong> et livre à {l.nom} la ramette, le carton de 5 ramettes et le carton en gros
            (dès {SEUIL_GROS} cartons), à partir de <strong>{PRIX_MIN}</strong>, en {SITE.delaiLivraison} après confirmation de la commande.
          </p>
          <a href={lienWhatsApp(message)} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-12 items-center gap-2 rounded-bouton bg-profond px-7 font-semibold text-white hover:bg-nuit">
            <IconeWhatsApp />
            Commander à {l.nom} sur WhatsApp
          </a>

          <section className="mt-12" aria-labelledby="v-produits">
            <h2 id="v-produits" className="text-xl font-bold text-nuit sm:text-2xl">Tous nos papiers rame livrés à {l.nom}</h2>
            <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {PRODUITS.map((p) => (
                <ProduitCarte key={p.id} p={p} />
              ))}
            </ul>
          </section>

          <section className="mt-12 border-t border-profond/10 pt-10" aria-labelledby="v-marques">
            <h2 id="v-marques" className="text-xl font-bold text-nuit">Les marques de papier rame disponibles à {l.nom}</h2>
            <ul className="mt-4 flex flex-wrap gap-3">
              {MARQUES.map((m) => (
                <li key={m}>
                  <Link href={`/marques/${slugMarque(m)}`} className="inline-flex min-h-11 items-center rounded-bouton border border-profond/25 px-5 font-semibold text-profond hover:border-profond">
                    {m}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-12 border-t border-profond/10 pt-10 lg:grid lg:grid-cols-2 lg:gap-14" aria-labelledby="v-clients">
            <div>
              <h2 id="v-clients" className="text-xl font-bold text-nuit">Pour qui à {l.nom} ?</h2>
              <ul className="mt-3 space-y-1 text-encre/85">
                {l.clients.map((c) => (
                  <li key={c} className="flex gap-2"><span className="text-cyan" aria-hidden="true">✓</span>{c}</li>
                ))}
              </ul>
            </div>
            <div className="mt-8 lg:mt-0">
              <h2 className="text-xl font-bold text-nuit">Livraison à {l.nom}</h2>
              <p className="justifie mt-3 text-encre/85">
                Zone : {l.zone}. Délai : {SITE.delaiLivraison} après confirmation. Les frais de livraison vers {l.nom} sont confirmés avec vous sur WhatsApp.
                Retour possible {SITE.delaiRetour}. Voir la page <Link href="/livraison" className="font-semibold text-profond underline">livraison</Link> et la{" "}
                <Link href="/politique-de-retour" className="font-semibold text-profond underline">politique de retour</Link>.
              </p>
            </div>
          </section>

          <section className="mt-12 border-t border-profond/10 pt-10" aria-labelledby="v-faq">
            <h2 id="v-faq" className="text-xl font-bold text-nuit">Questions fréquentes : papier rame à {l.nom}</h2>
            <dl className="mt-3 divide-y divide-profond/10 border-y border-profond/10">
              {faq.map((f) => (
                <div key={f.q} className="py-4">
                  <dt className="font-semibold text-nuit">{f.q}</dt>
                  <dd className="justifie mt-1 text-encre/85">{f.r}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="mt-12 border-t border-profond/10 pt-10" aria-labelledby="v-voisins">
            <h2 id="v-voisins" className="text-xl font-bold text-nuit">{enAbidjan ? "Papier rame dans les autres communes d'Abidjan" : "Papier rame dans les autres villes"}</h2>
            <ul className="mt-4 flex flex-wrap gap-3">
              {voisins.map((v) => (
                <li key={v.slug}>
                  <Link href={`/villes/${v.slug}`} className="inline-flex min-h-11 items-center rounded-bouton border border-profond/25 px-5 text-sm font-semibold text-profond hover:border-profond">
                    {v.nom}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/villes" className="inline-flex min-h-11 items-center px-3 text-sm font-semibold text-profond underline">Toutes les villes →</Link>
              </li>
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

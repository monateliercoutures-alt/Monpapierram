import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProduitCarte from "@/components/ProduitCarte";
import { IconeWhatsApp } from "@/components/Icones";
import { CATEGORIES, MARQUES, PRODUITS, SITE, lienWhatsApp, slugMarque, trouverCategorie } from "@/lib/config";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = trouverCategorie(slug);
  if (!c) return {};
  return {
    title: c.titre,
    description: c.description,
    alternates: { canonical: `/categories/${slug}` },
    openGraph: { title: c.titre, description: c.description, url: `/categories/${slug}`, images: [{ url: PRODUITS[0].image }] },
  };
}

// Page catégorie : un format de papier rame (A4, A3, A5…)
export default async function PageCategorie({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = trouverCategorie(slug);
  if (!c) notFound();

  const message = `Bonjour ${SITE.nom}, je souhaite le prix et la disponibilité du papier rame ${c.format} (quantité : ... , ville de livraison : ...).`;
  const autres = CATEGORIES.filter((x) => x.slug !== c.slug);

  const donnees = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "CollectionPage", name: c.nom, url: `${SITE.url}/categories/${slug}`, description: c.description, inLanguage: "fr" },
      ...(c.surDemande ? [] : [{ "@type": "ItemList", itemListElement: PRODUITS.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.nom, url: `${SITE.url}/produits/${p.slug}` })) }]),
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: SITE.url },
          { "@type": "ListItem", position: 2, name: c.nom, item: `${SITE.url}/categories/${slug}` },
        ],
      },
      { "@type": "FAQPage", mainEntity: c.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.r } })) },
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
              <li aria-current="page" className="font-semibold text-nuit">{c.nom}</li>
            </ol>
          </nav>

          <h1 className="mt-4 text-2xl font-bold text-nuit sm:text-4xl">{c.nom} à Abidjan et en Côte d&apos;Ivoire</h1>
          <p className="mt-2 text-sm font-semibold text-profond">Format {c.format} : {c.dimensions}</p>
          <p className="justifie mt-3 max-w-3xl text-encre/85">{c.intro}</p>

          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Autres formats">
            {CATEGORIES.map((x) => (
              <li key={x.slug}>
                <Link
                  href={`/categories/${x.slug}`}
                  aria-current={x.slug === c.slug ? "page" : undefined}
                  className={`inline-flex min-h-11 items-center rounded-full border px-5 text-sm font-semibold ${x.slug === c.slug ? "border-profond bg-profond text-white" : "border-profond/25 text-profond hover:border-profond"}`}
                >
                  {x.format}
                </Link>
              </li>
            ))}
          </ul>

          {c.surDemande ? (
            <section className="mt-8 rounded-carte border border-profond/15 bg-brume p-6" aria-labelledby="titre-devis">
              <h2 id="titre-devis" className="text-xl font-bold text-nuit">Prix et disponibilité du papier rame {c.format}</h2>
              <p className="justifie mt-2 max-w-3xl text-encre/85">
                Dites-nous la quantité (rames ou cartons) et votre commune : nous confirmons le prix, la marque disponible et le délai de livraison, généralement en {SITE.delaiLivraison}.
              </p>
              <a href={lienWhatsApp(message)} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-12 items-center gap-2 rounded-bouton bg-profond px-7 font-semibold text-white hover:bg-nuit">
                <IconeWhatsApp />
                Demander le prix du {c.format} sur WhatsApp
              </a>
            </section>
          ) : (
            <>
              <ul className="mt-6 flex flex-wrap gap-3" aria-label="Marques">
                {MARQUES.map((m) => (
                  <li key={m}>
                    <Link href={`/marques/${slugMarque(m)}`} className="inline-flex min-h-11 items-center rounded-bouton border border-profond/25 px-5 font-semibold text-profond hover:border-profond">
                      {m}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {PRODUITS.map((p) => (
                  <ProduitCarte key={p.id} p={p} />
                ))}
              </ul>
            </>
          )}

          <section className="mt-12 border-t border-profond/10 pt-10" aria-labelledby="titre-usages">
            <h2 id="titre-usages" className="text-xl font-bold text-nuit">À quoi sert le papier rame {c.format} ?</h2>
            <ul className="mt-3 grid gap-x-8 gap-y-1 text-encre/85 sm:grid-cols-2">
              {c.usages.map((u) => (
                <li key={u} className="flex gap-2"><span className="text-cyan" aria-hidden="true">✓</span>{u}</li>
              ))}
            </ul>
          </section>

          <section className="mt-10 border-t border-profond/10 pt-10" aria-labelledby="titre-faq-cat">
            <h2 id="titre-faq-cat" className="text-xl font-bold text-nuit">Questions fréquentes : papier rame {c.format}</h2>
            <dl className="mt-3 divide-y divide-profond/10 border-y border-profond/10">
              {c.faq.map((f) => (
                <div key={f.q} className="py-4">
                  <dt className="font-semibold text-nuit">{f.q}</dt>
                  <dd className="justifie mt-1 text-encre/85">{f.r}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-sm text-encre/80">
              Autres formats :{" "}
              {autres.map((x, i) => (
                <span key={x.slug}>
                  {i > 0 && " · "}
                  <Link href={`/categories/${x.slug}`} className="font-semibold text-profond underline">{x.nom}</Link>
                </span>
              ))}
              {" · "}
              <Link href="/types-de-papier-rame-a4" className="font-semibold text-profond underline">Types de papier rame A4</Link>
            </p>
          </section>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(donnees) }} />
    </>
  );
}

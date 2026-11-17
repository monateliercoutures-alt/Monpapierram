import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import BarreInfo from "@/components/BarreInfo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProduitGalerie from "@/components/ProduitGalerie";
import AjouterAuPanier from "@/components/AjouterAuPanier";
import { IconeWhatsApp } from "@/components/Icones";
import { PRODUITS, SITE, formatPrix, lienWhatsApp, trouverParSlug } from "@/lib/config";

// Une page est générée à la compilation pour chaque produit de lib/config.ts
export function generateStaticParams() {
  return PRODUITS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = trouverParSlug(slug);
  if (!p) return {};
  const titre = `${p.nom} à Abidjan, ${formatPrix(p.prix)} | ${SITE.nom}`;
  const description = `${p.nom} : ${p.specs}. ${formatPrix(p.prix)} ${p.unite}. Achat en ligne et livraison à Abidjan (Côte d'Ivoire), paiement à la livraison ou Mobile Money.`;
  return {
    title: titre,
    description,
    alternates: { canonical: `/produits/${p.slug}` },
    openGraph: { title: titre, description, url: `/produits/${p.slug}`, images: [{ url: p.image, alt: p.alt }] },
  };
}

export default async function PageProduit({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = trouverParSlug(slug);
  if (!p) notFound();

  const autres = PRODUITS.filter((x) => x.id !== p.id);
  const message = `Bonjour ${SITE.nom}, j'ai une question sur : ${p.nom}.`;

  // Données structurées (SEO) : fiche produit avec prix
  const donnees = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.nom,
    description: p.description.join(" "),
    brand: { "@type": "Brand", name: "Double A" },
    image: p.galerie.map((g) => `${SITE.url}${g.src}`),
    offers: {
      "@type": "Offer",
      url: `${SITE.url}/produits/${p.slug}`,
      priceCurrency: "XOF",
      price: p.prix,
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <BarreInfo />
      <Header />
      <main id="contenu" className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
          {/* Fil d'Ariane */}
          <nav aria-label="Fil d'Ariane" className="text-sm text-encre/70">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="inline-flex min-h-8 items-center hover:underline">Accueil</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/#produits" className="inline-flex min-h-8 items-center hover:underline">Produits</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-semibold text-nuit">{p.nom}</li>
            </ol>
          </nav>

          {/* Photos + achat */}
          <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-14">
            <ProduitGalerie images={p.galerie} />

            <div>
              {p.badge && <span className="inline-block rounded bg-profond px-2 py-1 text-xs font-semibold text-white">{p.badge}</span>}
              <h1 className="mt-2 text-2xl font-bold text-nuit sm:text-3xl">{p.nom}</h1>
              <p className="mt-1 text-encre/70">{p.specs}</p>

              <p className="mt-6 flex items-baseline gap-3">
                <span className="font-titre text-3xl font-bold text-nuit">{formatPrix(p.prix)}</span>
                <span className="text-encre/65">{p.unite}</span>
              </p>
              {p.note && <p className="mt-1 text-sm text-profond">{p.note}</p>}
              <p className="mt-3 text-sm font-semibold text-[#0b7a4b]">En stock</p>

              <div className="mt-5 max-w-md">
                <AjouterAuPanier id={p.id} nom={p.nom} minQty={p.minQty} />
              </div>
              <a
                href={lienWhatsApp(message)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-profond hover:underline"
              >
                <IconeWhatsApp />
                Une question ? Écrivez-nous sur WhatsApp
              </a>

              <ul className="mt-6 space-y-2 border-t border-profond/10 pt-6 text-sm text-encre/85">
                {p.points.map((pt) => (
                  <li key={pt} className="flex gap-2">
                    <span className="text-cyan" aria-hidden="true">✓</span>
                    {pt}
                  </li>
                ))}
              </ul>

              <dl className="mt-6 divide-y divide-profond/10 rounded-carte border border-profond/15 text-sm">
                <div className="grid grid-cols-[7rem_1fr] gap-3 px-4 py-3">
                  <dt className="font-semibold text-nuit">Livraison</dt>
                  <dd className="text-encre/80">Abidjan, généralement sous 24 à 48 h. Frais confirmés selon votre commune.</dd>
                </div>
                <div className="grid grid-cols-[7rem_1fr] gap-3 px-4 py-3">
                  <dt className="font-semibold text-nuit">Paiement</dt>
                  <dd className="text-encre/80">À la livraison, Orange Money, MTN MoMo ou Wave.</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Description + fiche technique */}
          <div className="mt-14 grid gap-10 border-t border-profond/10 pt-10 lg:grid-cols-2 lg:gap-14">
            <section aria-labelledby="titre-description">
              <h2 id="titre-description" className="text-xl font-bold text-nuit">Description</h2>
              <div className="mt-3 space-y-3 text-encre/85">
                {p.description.map((t) => (
                  <p key={t}>{t}</p>
                ))}
              </div>
            </section>
            <section aria-labelledby="titre-fiche">
              <h2 id="titre-fiche" className="text-xl font-bold text-nuit">Fiche technique</h2>
              <dl className="mt-3 divide-y divide-profond/10 border-y border-profond/10 text-sm">
                {p.fiche.map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[9rem_1fr] gap-4 py-3">
                    <dt className="font-semibold text-nuit">{k}</dt>
                    <dd className="text-encre/85">{v}</dd>
                  </div>
                ))}
              </dl>
            </section>
          </div>

          {/* Autres produits */}
          <section aria-labelledby="titre-autres" className="mt-14 border-t border-profond/10 pt-10">
            <h2 id="titre-autres" className="text-xl font-bold text-nuit">Autres produits</h2>
            <ul className="mt-5 grid gap-5 sm:grid-cols-2">
              {autres.map((a) => (
                <li key={a.id}>
                  <Link href={`/produits/${a.slug}`} className="flex items-center gap-4 rounded-carte border border-profond/15 p-4 hover:border-profond">
                    <span className="relative h-24 w-28 shrink-0 overflow-hidden rounded-bouton bg-white">
                      <Image src={a.image} alt={a.alt} fill sizes="112px" className="object-contain" />
                    </span>
                    <span>
                      <span className="block font-bold text-nuit">{a.nom}</span>
                      <span className="mt-1 block text-sm text-encre/70">
                        {formatPrix(a.prix)} {a.unite}
                      </span>
                    </span>
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

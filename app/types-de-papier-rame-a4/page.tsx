import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { IconeWhatsApp } from "@/components/Icones";
import { MARQUES, MESSAGE_GENERAL, PRODUITS, SEUIL_GROS, SITE, formatPrixTexte, grammage, lienWhatsApp, slugMarque } from "@/lib/config";

const TITRE = "Types de Papier Rame A4 : 70g, 75g, 80g | Monpapierrame";
const DESCRIPTION = "Quel papier rame A4 choisir ? 70g, 75g ou 80g, copie, laser, recto verso : guide des types de rames et des marques vendues à Abidjan, avec les prix.";

export const metadata: Metadata = {
  title: TITRE,
  description: DESCRIPTION,
  alternates: { canonical: "/types-de-papier-rame-a4" },
  openGraph: { title: TITRE, description: DESCRIPTION, url: "/types-de-papier-rame-a4", images: [{ url: PRODUITS[0].image }] },
};

// Regroupe les marques par grammage (se met à jour avec les produits)
function parGrammage() {
  const groupes = new Map<string, { marque: string; carton?: number | null; gros?: number | null }[]>();
  for (const m of MARQUES) {
    const ps = PRODUITS.filter((p) => p.marque === m);
    const carton = ps.find((p) => p.minQty === 1 && p.id.endsWith("carton"));
    const gros = ps.find((p) => p.minQty > 1);
    const g = carton ? grammage(carton) : "";
    if (!g) continue;
    if (!groupes.has(g)) groupes.set(g, []);
    groupes.get(g)!.push({ marque: m, carton: carton?.prix, gros: gros?.prix });
  }
  return [...groupes.entries()].sort((a, b) => parseInt(a[0]) - parseInt(b[0]));
}

const USAGES = [
  ["Impression de bureau (laser et jet d'encre)", "Un papier A4 de 75 à 80 g/m² passe bien dans toutes les imprimantes de bureau."],
  ["Photocopie à fort volume", "Un papier régulier, sans poussière excessive, limite les bourrages : privilégiez le 75 ou le 80 g/m²."],
  ["Impression recto verso", "Le 80 g/m² est plus opaque : il limite la transparence d'une face à l'autre."],
  ["Brouillons, polycopiés, circulaires", "Le 70 g/m² suffit pour les documents internes et l'économie de volume."],
  ["Documents officiels, contrats, devis", "Choisissez un 80 g/m² : meilleure tenue et rendu plus soigné."],
  ["Écoles, universités, cybercafés", "Le carton de 5 rames, ou le lot de 10 cartons, réduit le prix de la feuille."],
];

const FAQ_TYPES = [
  { q: "Quels sont les types de papier rame A4 ?", r: "On distingue les rames A4 par leur grammage (70, 75, 80 g/m² et plus), leur usage (copie, impression laser ou jet d'encre, recto verso) et leur conditionnement (rame de 500 feuilles, carton de 5 rames, lot de 10 cartons). Notre gamme couvre le 70, le 75 et le 80 g/m²." },
  { q: "Quelle est la différence entre un papier 70 g, 75 g et 80 g ?", r: "Plus le grammage est élevé, plus la feuille est épaisse, opaque et rigide. Le 70 g est économique pour les brouillons, le 75 g convient à la copie courante, le 80 g est le standard pour le bureau et le recto verso." },
  { q: "Quel papier rame pour une imprimante laser ?", r: "Un papier A4 de 75 à 80 g/m² convient aux imprimantes laser. Toutes nos marques conviennent à la fois au laser, au jet d'encre et aux photocopieurs." },
  { q: "Quelle est la taille d'une feuille A4 ?", r: "Une feuille A4 mesure 210 × 297 mm. Une rame (ramette) contient 500 feuilles, un carton 5 rames, soit 2 500 feuilles." },
  { q: "Quel est le prix d'une rame de papier A4 en Côte d'Ivoire ?", r: "La rame Double A 80 g est à 4 000 FCFA à l'unité. Au carton de 5 rames, comptez de 12 500 à 19 900 FCFA selon la marque, et un prix dégressif dès 10 cartons." },
  { q: "Où acheter toutes les marques de papier rame à Abidjan ?", r: `Chez ${SITE.nom}, grossiste papier rame à Abidjan : ${MARQUES.join(", ")}. Livraison à Abidjan et partout en Côte d'Ivoire.` },
];

// Guide « Types de papier rame A4 » : page de référence pour Google et les assistants IA
export default function PageTypes() {
  const groupes = parGrammage();

  const donnees = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "Types de papier rame A4 : grammage, usages et prix",
        description: DESCRIPTION,
        inLanguage: "fr",
        mainEntityOfPage: `${SITE.url}/types-de-papier-rame-a4`,
        author: { "@type": "Organization", name: SITE.nom, url: SITE.url },
        publisher: { "@type": "Organization", name: SITE.nom, url: SITE.url },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: SITE.url },
          { "@type": "ListItem", position: 2, name: "Types de papier rame A4", item: `${SITE.url}/types-de-papier-rame-a4` },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQ_TYPES.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.r } })),
      },
    ],
  };

  return (
    <>
      <Header />
      <main id="contenu" className="bg-white px-4 py-8 sm:px-6 sm:py-12">
        <article className="mx-auto max-w-4xl">
          <nav aria-label="Fil d'Ariane" className="text-sm text-encre/70">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="inline-flex min-h-8 items-center hover:underline">Accueil</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-semibold text-nuit">Types de papier rame A4</li>
            </ol>
          </nav>

          <h1 className="mt-4 text-2xl font-bold text-nuit sm:text-4xl">Les types de papier rame A4 : grammage, usages et prix</h1>
          <p className="justifie mt-4 text-encre/85">
            Une <strong>rame de papier A4</strong> contient 500 feuilles de 210 × 297 mm. Mais toutes les rames ne se valent pas : le grammage, la blancheur et le conditionnement changent l&apos;usage
            et le prix. {SITE.nom}, grossiste papier rame à Abidjan, vous aide à choisir parmi <strong>{MARQUES.length} marques</strong>, du papier de copie économique au papier 80&nbsp;g/m² pour le recto verso.
          </p>

          <section className="mt-10" aria-labelledby="t-grammage">
            <h2 id="t-grammage" className="text-xl font-bold text-nuit">Papier rame A4 par grammage : 70 g, 75 g, 80 g</h2>
            <p className="justifie mt-2 text-encre/85">
              Le grammage est le poids d&apos;un mètre carré de papier. Plus il est élevé, plus la feuille est épaisse et opaque. Voici nos rames A4 classées par grammage, avec les prix du carton de 5 rames (2&nbsp;500 feuilles).
            </p>
            {groupes.map(([g, marques]) => (
              <div key={g} className="mt-6">
                <h3 className="text-lg font-bold text-nuit">Papier rame A4 {g}</h3>
                <ul className="mt-2 divide-y divide-profond/10 border-y border-profond/10">
                  {marques.map((m) => (
                    <li key={m.marque} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-3">
                      <Link href={`/marques/${slugMarque(m.marque)}`} className="font-semibold text-profond underline">
                        Papier rame {m.marque}
                      </Link>
                      <span className="text-sm text-encre/80">
                        Carton : <strong className="text-nuit">{m.carton ? formatPrixTexte(m.carton) : "sur demande"}</strong>
                        {m.gros ? <> · dès {SEUIL_GROS} cartons : <strong className="text-nuit">{formatPrixTexte(m.gros)}</strong></> : null}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <section className="mt-10" aria-labelledby="t-usage">
            <h2 id="t-usage" className="text-xl font-bold text-nuit">Quel papier rame A4 selon l&apos;usage ?</h2>
            <dl className="mt-3 divide-y divide-profond/10 border-y border-profond/10">
              {USAGES.map(([t, d]) => (
                <div key={t} className="py-3">
                  <dt className="font-semibold text-nuit">{t}</dt>
                  <dd className="justifie text-encre/85">{d}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="mt-10" aria-labelledby="t-conditionnement">
            <h2 id="t-conditionnement" className="text-xl font-bold text-nuit">Rame, carton ou gros : les conditionnements</h2>
            <ul className="mt-3 space-y-2 text-encre/85">
              <li className="justifie"><strong className="text-nuit">La rame (ramette)</strong> : 500 feuilles A4 sous emballage individuel. Disponible à l&apos;unité en Double A.</li>
              <li className="justifie"><strong className="text-nuit">Le carton</strong> : 5 rames, soit 2&nbsp;500 feuilles. Le prix de la feuille baisse.</li>
              <li className="justifie"><strong className="text-nuit">Le gros</strong> : à partir de {SEUIL_GROS} cartons (25&nbsp;000 feuilles), au tarif dégressif, avec facture sur demande.</li>
            </ul>
          </section>

          <section className="mt-10" aria-labelledby="t-faq">
            <h2 id="t-faq" className="text-xl font-bold text-nuit">Questions fréquentes sur les types de papier rame A4</h2>
            <dl className="mt-3 divide-y divide-profond/10 border-y border-profond/10">
              {FAQ_TYPES.map((f) => (
                <div key={f.q} className="py-4">
                  <dt className="font-semibold text-nuit">{f.q}</dt>
                  <dd className="justifie mt-1 text-encre/85">{f.r}</dd>
                </div>
              ))}
            </dl>
          </section>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/papier-rame-abidjan" className="inline-flex min-h-12 items-center rounded-bouton border border-profond px-7 font-semibold text-profond hover:bg-profond hover:text-white">
              Voir toutes les rames et les prix
            </Link>
            <a href={lienWhatsApp(MESSAGE_GENERAL)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-bouton bg-profond px-7 font-semibold text-white hover:bg-nuit">
              <IconeWhatsApp />
              Poser une question sur WhatsApp
            </a>
          </div>
        </article>
      </main>
      <Footer />
      <WhatsAppButton />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(donnees) }} />
    </>
  );
}

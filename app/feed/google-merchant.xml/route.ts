import { PRODUITS, SITE } from "@/lib/config";

/**
 * Flux produits pour Google Merchant Center : https://<site>/feed/google-merchant.xml
 *
 * Format « RSS 2.0 avec espace de noms Google (g:) ». Seuls les produits avec un prix
 * sont exportés (Merchant Center refuse les articles sans prix). Le flux se met à jour
 * tout seul quand on modifie lib/config.ts : il suffit de planifier la récupération
 * dans Merchant Center (« Produits » > « Flux » > « Récupération planifiée »).
 */

// Échappe les caractères spéciaux XML
function xml(t: string): string {
  return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

// Nombre de ramettes par article vendu (pour l'attribut multipack), selon l'identifiant produit
const MULTIPACK: Record<string, number> = { carton: 5, gros: 5, "paperone-carton": 5, "paperone-gros": 5, "globulus-carton": 5, "globulus-gros": 5, "paperpro-carton": 5, "paperpro-gros": 5, "authentik-carton": 5, "authentik-gros": 5 };

export function GET() {
  const articles = PRODUITS.filter((p) => p.prix !== null).map((p) => {
    const lien = `${SITE.url}/produits/${p.slug}`;
    const images = p.galerie.map((g) => `${SITE.url}${g.src}`);
    const multipack = MULTIPACK[p.id];
    return `    <item>
      <g:id>${xml(p.id)}</g:id>
      <g:title>${xml(p.nom.slice(0, 150))}</g:title>
      <g:description>${xml(p.description.join(" ").slice(0, 5000))}</g:description>
      <g:link>${xml(lien)}</g:link>
      <g:image_link>${xml(images[0])}</g:image_link>
${images
  .slice(1, 10)
  .map((i) => `      <g:additional_image_link>${xml(i)}</g:additional_image_link>`)
  .join("\n")}
      <g:availability>in_stock</g:availability>
      <g:price>${p.prix} XOF</g:price>
      <g:condition>new</g:condition>
      <g:brand>${xml(p.marque)}</g:brand>
      <g:identifier_exists>no</g:identifier_exists>
      <g:google_product_category>Office Supplies &gt; General Supplies &gt; Paper Products &gt; Printer &amp; Copier Paper</g:google_product_category>
      <g:product_type>Papier &gt; Papier rame A4 &gt; ${xml(p.marque)}</g:product_type>${multipack ? `\n      <g:multipack>${multipack}</g:multipack>` : ""}
    </item>`;
  });

  const corps = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>${xml(SITE.nom)}</title>
    <link>${xml(SITE.url)}</link>
    <description>Papier rame A4 en Côte d'Ivoire</description>
${articles.join("\n")}
  </channel>
</rss>
`;

  return new Response(corps, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

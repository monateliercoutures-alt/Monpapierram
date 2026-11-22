import { PRODUITS, SEUIL_GROS, SITE, grammage, type Produit } from "@/lib/config";

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

// Un carton contient toujours 5 ramettes ; la ramette seule n'a pas d'attribut multipack (valable aussi pour les futurs produits)
const RAMETTES_PAR_CARTON = 5;

// Titre au format recommandé par Google : marque d'abord, puis type de produit et attributs clés
function titre(p: Produit): string {
  const g = grammage(p).replace("g/m²", "g");
  if (p.id === "ramette") return `${p.marque} Papier Rame A4 ${g} - Ramette de 500 feuilles`;
  if (p.minQty > 1) return `${p.marque} Papier Rame A4 ${g} - Carton de 5 ramettes, prix par carton dès ${SEUIL_GROS} cartons`;
  return `${p.marque} Papier Rame A4 ${g} - Carton de 5 ramettes (2 500 feuilles)`;
}

// Type de vente, pour classer les produits dans Merchant Center
function typeVente(p: Produit): string {
  if (p.id === "ramette") return "Ramette";
  return p.minQty > 1 ? "Gros" : "Carton";
}

const balise = (nom: string, valeur: string) => `      <g:${nom}>${xml(valeur)}</g:${nom}>`;

function detail(section: string, nom: string, valeur: string): string {
  return `      <g:product_detail>
        <g:section_name>${xml(section)}</g:section_name>
        <g:attribute_name>${xml(nom)}</g:attribute_name>
        <g:attribute_value>${xml(valeur)}</g:attribute_value>
      </g:product_detail>`;
}

export function GET() {
  const articles = PRODUITS.filter((p) => p.prix !== null).map((p) => {
    const lien = `${SITE.url}/produits/${p.slug}`;
    const images = p.galerie.map((g) => `${SITE.url}${g.src}`);
    const multipack = p.id === "ramette" ? 0 : RAMETTES_PAR_CARTON;
    const g = grammage(p);
    const feuilles = p.id === "ramette" ? "500" : "2 500";
    const description = (p.minQty > 1 ? [...p.description, `Prix par carton à partir de ${SEUIL_GROS} cartons.`] : p.description).join(" ");
    const lignes = [
      balise("id", p.id),
      balise("title", titre(p).slice(0, 150)),
      balise("description", description.slice(0, 5000)),
      balise("link", lien),
      balise("image_link", images[0]),
      ...images.slice(1, 10).map((i) => balise("additional_image_link", i)),
      balise("availability", "in_stock"),
      balise("price", `${p.prix} XOF`),
      balise("condition", "new"),
      balise("brand", p.marque),
      balise("identifier_exists", "no"),
      balise("google_product_category", "Office Supplies > General Supplies > Paper Products > Printer & Copier Paper"),
      balise("product_type", `Papier > Papier rame A4 > ${p.marque} > ${typeVente(p)}`),
      balise("size", "A4"),
      balise("color", "Blanc"),
      balise("material", "Papier"),
      ...(multipack ? [balise("multipack", String(multipack))] : []),
      balise("ships_from_country", "CI"),
      ...p.points.slice(0, 5).map((pt) => balise("product_highlight", pt)),
      detail("Caractéristiques", "Format", "A4 (210 × 297 mm)"),
      detail("Caractéristiques", "Grammage", g),
      detail("Caractéristiques", "Feuilles par ramette", "500"),
      detail("Conditionnement", "Quantité vendue", p.id === "ramette" ? "1 ramette" : p.minQty > 1 ? `Carton de 5 ramettes (minimum ${SEUIL_GROS} cartons)` : "Carton de 5 ramettes"),
      detail("Conditionnement", "Total de feuilles par article", feuilles),
      balise("custom_label_0", p.marque),
      balise("custom_label_1", typeVente(p)),
      balise("custom_label_2", g),
    ];
    return `    <item>\n${lignes.join("\n")}\n    </item>`;
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

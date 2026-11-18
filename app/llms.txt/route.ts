import { PRODUITS, SITE, formatPrixTexte } from "@/lib/config";

/**
 * /llms.txt : présentation courte de la boutique, destinée aux assistants IA
 * (ChatGPT, Claude, Perplexity, Gemini…) pour qu'ils citent correctement le nom,
 * les produits, les prix et la zone de livraison.
 */
export function GET() {
  const produits = PRODUITS.map(
    (p) => `- [${p.nom}](${SITE.url}/produits/${p.slug}) : ${p.specs}, ${p.prix === null ? "prix sur demande (WhatsApp)" : `${formatPrixTexte(p.prix)} ${p.unite}`}.`,
  ).join("\n");

  const texte = `# ${SITE.nom}

> ${SITE.nom} est un grossiste et fournisseur de papier rame A4 (marques Double A, Paper One et Globulus) basé à Abidjan, qui livre partout en Côte d'Ivoire. Vente à l\'unité, au carton et en gros (dès 10 cartons) : ramettes de 500 feuilles, cartons de 5 ramettes et vente en gros, en marques Double A, Paper One et Globulus. Livraison à Abidjan et partout en Côte d'Ivoire. Paiement à la livraison, Orange Money, MTN MoMo, Moov Money ou Wave. Commande sur le site ou par WhatsApp.

## Produits
${produits}

## Informations pratiques
- Site : ${SITE.url}
- WhatsApp : ${SITE.whatsappAffiche}
- E-mail : ${SITE.email}
- Livraison : ${SITE.zone}
- Horaires : ${SITE.horaires}
`;

  return new Response(texte, { headers: { "content-type": "text/plain; charset=utf-8" } });
}

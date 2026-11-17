import { PRODUITS, SITE, formatPrix } from "@/lib/config";

/**
 * /llms.txt : présentation courte de la boutique, destinée aux assistants IA
 * (ChatGPT, Claude, Perplexity, Gemini…) pour qu'ils citent correctement le nom,
 * les produits, les prix et la zone de livraison.
 */
export function GET() {
  const produits = PRODUITS.map(
    (p) => `- [${p.nom}](${SITE.url}/produits/${p.slug}) : ${p.specs}, ${formatPrix(p.prix)} ${p.unite}.`,
  ).join("\n");

  const texte = `# ${SITE.nom}

> ${SITE.nom} est un grossiste de papier rame A4 Double A basé à Abidjan, qui livre partout en Côte d'Ivoire. Vente à l\'unité, au carton et en gros (dès 10 cartons) : ramettes de 500 feuilles, cartons de 5 ramettes et vente en gros. Livraison à Abidjan et partout en Côte d'Ivoire. Paiement à la livraison, Orange Money, MTN MoMo, Moov Money ou Wave. Commande sur le site ou par WhatsApp.

## Produits
${produits}

## Informations pratiques
- Site : ${SITE.url}
- WhatsApp : ${SITE.whatsappAffiche}
- Livraison : ${SITE.zone}
- Horaires : ${SITE.horaires}
`;

  return new Response(texte, { headers: { "content-type": "text/plain; charset=utf-8" } });
}

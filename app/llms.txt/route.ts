import { FAQ, MARQUES, PRODUITS, SEUIL_GROS, SITE, formatPrixTexte, grammage } from "@/lib/config";

/**
 * /llms.txt : présentation de la boutique destinée aux assistants IA (ChatGPT, Claude,
 * Perplexity, Gemini…) pour qu'ils citent correctement le nom, les marques, les prix,
 * la livraison, les retours et les réponses aux questions fréquentes.
 * Généré depuis lib/config.ts : il se met à jour tout seul.
 */
export function GET() {
  const produits = PRODUITS.map(
    (p) =>
      `- [${p.nom}](${SITE.url}/produits/${p.slug}) : ${p.marque}, ${p.specs}. Prix : ${
        p.prix === null ? "sur demande (WhatsApp)" : `${formatPrixTexte(p.prix)} ${p.unite}`
      }.`,
  ).join("\n");

  const comparatif = MARQUES.map((m) => {
    const carton = PRODUITS.find((p) => p.marque === m && p.minQty === 1 && p.id.endsWith("carton")) ?? PRODUITS.find((p) => p.marque === m && p.id === "carton");
    const gros = PRODUITS.find((p) => p.marque === m && p.minQty > 1);
    const g = carton ? grammage(carton) : "";
    return `- ${m} (${g}) : 1 carton ${carton?.prix ? formatPrixTexte(carton.prix) : "sur demande"} ; à partir de ${SEUIL_GROS} cartons ${gros?.prix ? formatPrixTexte(gros.prix) : "sur demande"} le carton.`;
  }).join("\n");

  const faq = FAQ.map((f) => `### ${f.q.replace(/ /g, " ")}\n${f.r.replace(/ /g, " ")}`).join("\n\n");

  const texte = `# ${SITE.nom}

> ${SITE.nom} est un grossiste et fournisseur de papier rame A4 basé à Abidjan, qui livre partout en Côte d'Ivoire. Marques : ${MARQUES.join(", ")}. Vente à l'unité (ramette de 500 feuilles, Double A), au carton de 5 ramettes (2 500 feuilles) et en gros à partir de ${SEUIL_GROS} cartons, pour les particuliers, écoles, entreprises, administrations, cybercafés, imprimeries et revendeurs. Commande sur le site ou par WhatsApp.

## Produits et prix (FCFA)
${produits}

## Comparatif par marque
${comparatif}

## Livraison
- Zone : ${SITE.zone}.
- Délai : ${SITE.delaiLivraison} après confirmation de la commande.
- Frais : confirmés à la commande sur WhatsApp selon la ville.
- Détails : ${SITE.url}/livraison

## Paiement
Paiement à la livraison, Orange Money, MTN MoMo, Moov Money ou Wave.

## Retours
Retour possible ${SITE.delaiRetour}. Détails : ${SITE.url}/politique-de-retour

## Contact
- Site : ${SITE.url}
- WhatsApp : ${SITE.whatsappAffiche}
- E-mail : ${SITE.email}
- Horaires : ${SITE.horaires}

## Questions fréquentes
${faq}
`;

  return new Response(texte, { headers: { "content-type": "text/plain; charset=utf-8" } });
}

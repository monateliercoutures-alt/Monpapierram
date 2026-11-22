/**
 * Configuration centrale de Monpapierrame.
 * Tout ce qu'on modifie régulièrement (prix, contact, textes) est ici.
 */

export const SITE = {
  nom: "Monpapierrame",
  url: "https://www.monpapierrame.store", // domaine principal (monpapierrame.store redirige vers www)
  // Numéro WhatsApp au format international, sans « + » ni espaces
  whatsapp: "2250151993956",
  whatsappAffiche: "+225 01 51 99 39 56",
  email: "contact@monpapierrame.store",
  zone: "Partout en Côte d'Ivoire : Abidjan, Yamoussoukro, Bouaké, San-Pédro, Daloa, Korhogo et toutes les autres villes",
  horaires: "Lundi – Samedi, 8h – 19h",
  delaiLivraison: "24 à 72 h",
  delaiRetour: "24 à 72 h après la livraison",
};

/** Construit un lien WhatsApp avec un message pré-rempli */
export function lienWhatsApp(message: string): string {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const MESSAGE_RETOUR = `Bonjour ${SITE.nom}, je souhaite demander un retour pour ma commande (référence : ...). Photo du produit en pièce jointe.`;

export const MESSAGE_GENERAL = `Bonjour ${SITE.nom}, je souhaite commander du papier Double A Premium A4 80 g.`;

export type Produit = {
  id: string; // identifiant interne (panier)
  slug: string; // adresse de la page : /produits/<slug>
  nom: string;
  specs: string; // ligne courte sous le nom
  detail: string;
  marque: string; // regroupement dans le catalogue
  prix: number | null; // en FCFA ; null = prix sur demande (bouton WhatsApp au lieu du panier)
  unite: string; // « la ramette », « le carton »…
  note?: string; // précision sous le prix
  messageDevis?: string; // message WhatsApp pour les produits sur demande
  minQty: number; // quantité minimale de commande
  badge?: string;
  image: string;
  alt: string;
  points: string[];
  /** Page produit : photos, texte et fiche technique */
  galerie: { src: string; alt: string }[];
  description: string[];
  usages: string[];
  fiche: [string, string][];
  /** SEO : titre (max 60 caractères) et description (max 155). {prix} est remplacé par le prix formaté. */
  metaTitre: string;
  metaDescription: string;
};

/** Nombre de cartons à partir duquel le tarif gros s'applique */
export const SEUIL_GROS = 10;

export const PRODUITS: Produit[] = [
  {
    id: "ramette",
    marque: "Double A",
    metaTitre: "Papier Rame A4 80g Double A, {prix} | Monpapierrame",
    metaDescription:
      "Papier rame A4 80g Double A, 500 feuilles, {prix}. Recto verso, laser et jet d'encre. Livraison à Abidjan et en Côte d'Ivoire, paiement à la livraison.",
    slug: "ramette-papier-a4-80g-double-a",
    nom: "Ramette papier A4 80g Double A Premium",
    specs: "80 g/m² · 500 feuilles",
    detail: "Pour la maison, l'école ou un petit bureau.",
    prix: 4000,
    unite: "la ramette",
    minQty: 1,
    image: "/images/etape-3.jpg",
    alt: "Ramette Double A Premium ouverte avec des feuilles A4 blanches",
    points: ["Format A4", "Recto verso sans bourrage", "Laser et jet d'encre"],
    galerie: [
      { src: "/images/etape-3.jpg", alt: "Ramette Double A Premium ouverte avec des feuilles A4 blanches posées à côté" },
      { src: "/images/etape-2.jpg", alt: "Ramette Double A Premium sortant d'un carton ouvert" },
      { src: "/images/etape-4.jpg", alt: "Ramette Double A Premium couchée et ouverte devant un carton" },
    ],
    description: [
      "La ramette de papier A4 80g Double A Premium est le papier d'impression et de photocopie le plus pratique pour le quotidien : documents, devoirs, factures, courriers. Une rame contient 500 feuilles.",
      "Son grammage de 80 g/m² convient à l'impression recto verso et passe sans difficulté dans les imprimantes laser, jet d'encre et photocopieurs.",
    ],
    usages: [
      "Impression de documents, factures et courriers au bureau",
      "Devoirs, dossiers et polycopiés pour les élèves et étudiants",
      "Photocopies et impressions recto verso du quotidien",
      "Démarches administratives et formulaires",
    ],
    fiche: [
      ["Marque", "Double A Premium"],
      ["Format", "A4 (210 × 297 mm)"],
      ["Grammage", "80 g/m²"],
      ["Contenu", "500 feuilles par ramette"],
      ["Impression", "Laser, jet d'encre, photocopieur, recto verso"],
    ],
  },
  {
    id: "carton",
    marque: "Double A",
    metaTitre: "Carton Papier Rame A4 Double A 80g | Monpapierrame",
    metaDescription:
      "Carton de 5 ramettes papier rame A4 80g Double A, 2 500 feuilles, {prix}. Livré scellé à Abidjan et en Côte d'Ivoire, payez à la livraison.",
    slug: "carton-papier-a4-5-ramettes-double-a",
    nom: "Carton papier A4 80g Double A (5 ramettes)",
    specs: "80 g/m² · 5 × 500 feuilles",
    detail: "Le format le plus pratique pour un bureau ou un commerce.",
    prix: 19900,
    unite: "le carton",
    note: "Soit 3\u00a0980\u00a0FCFA la ramette",
    minQty: 1,
    badge: "Le plus vendu",
    image: "/images/etape-1.jpg",
    alt: "Carton fermé de 5 ramettes Double A",
    points: ["2 500 feuilles A4", "Carton scellé", "Livraison partout en Côte d'Ivoire"],
    galerie: [
      { src: "/images/etape-1.jpg", alt: "Carton fermé de 5 ramettes Double A, cerclé d'une sangle blanche" },
      { src: "/images/etape-2.jpg", alt: "Carton Double A ouvert avec une ramette qui en sort" },
      { src: "/images/etape-3.jpg", alt: "Ramette Double A Premium ouverte avec des feuilles A4 blanches" },
    ],
    description: [
      "Le carton de papier A4 80g Double A regroupe 5 ramettes, soit 2 500 feuilles. C'est le format idéal pour un bureau, un commerce, une école ou un cybercafé \u00a0: moins de réapprovisionnements et un prix à la ramette légèrement plus bas.",
      "Chaque ramette est emballée individuellement. Le carton est livré scellé jusqu'à votre adresse, à Abidjan comme dans le reste de la Côte d'Ivoire.",
    ],
    usages: [
      "Bureaux, commerces et cabinets qui impriment chaque semaine",
      "Écoles et centres de formation : sujets, supports de cours",
      "Cybercafés et centres de photocopie",
      "Réserve de papier pour plusieurs mois à un meilleur prix à la ramette",
    ],
    fiche: [
      ["Marque", "Double A Premium"],
      ["Format", "A4 (210 × 297 mm)"],
      ["Grammage", "80 g/m²"],
      ["Contenu", "5 ramettes de 500 feuilles, soit 2 500 feuilles"],
      ["Impression", "Laser, jet d'encre, photocopieur, recto verso"],
    ],
  },
  {
    id: "gros",
    marque: "Double A",
    metaTitre: "Papier Rame A4 Double A en Gros, 10 Cartons | Monpapierrame",
    metaDescription:
      "Grossiste papier rame A4 à Abidjan : carton Double A 80g à {prix} dès 10 cartons. Facture, livraison en Côte d'Ivoire, Mobile Money. Devis WhatsApp.",
    slug: "papier-a4-en-gros-carton-double-a",
    nom: "Papier A4 en gros, carton Double A 80g",
    specs: `Dès ${SEUIL_GROS} cartons · 80 g/m²`,
    detail: "Pour les écoles, entreprises, imprimeries et revendeurs.",
    prix: 19000,
    unite: "le carton",
    note: `Soit 3\u00a0800\u00a0FCFA la ramette, dès ${SEUIL_GROS} cartons`,
    minQty: SEUIL_GROS,
    image: "/images/etape-4.jpg",
    alt: "Ramette Double A Premium couchée devant un carton ouvert",
    points: [`Minimum ${SEUIL_GROS} cartons`, "Facture sur demande", "Livraison planifiée"],
    galerie: [
      { src: "/images/etape-4.jpg", alt: "Ramette Double A Premium couchée et ouverte devant un carton ouvert" },
      { src: "/images/etape-1.jpg", alt: "Carton fermé de 5 ramettes Double A" },
      { src: "/images/etape-2.jpg", alt: "Carton Double A ouvert avec une ramette qui en sort" },
    ],
    description: [
      `Achetez votre papier A4 en gros : le tarif gros s'applique à partir de ${SEUIL_GROS} cartons de 5 ramettes de papier A4 80g Double A, soit au minimum ${SEUIL_GROS * 2500} feuilles.`,
      "Il s'adresse aux écoles, administrations, entreprises, imprimeries et revendeurs. Une facture peut être établie sur demande et la livraison est planifiée avec vous.",
    ],
    usages: [
      "Imprimeries et revendeurs de papier",
      "Écoles, universités et administrations",
      "Entreprises à gros volume d'impression",
      "Approvisionnement régulier avec livraison planifiée",
    ],
    fiche: [
      ["Marque", "Double A Premium"],
      ["Format", "A4 (210 × 297 mm)"],
      ["Grammage", "80 g/m²"],
      ["Conditionnement", "Carton de 5 ramettes de 500 feuilles"],
      ["Quantité minimale", `${SEUIL_GROS} cartons`],
    ],
  },
  {
    id: "paperone-carton",
    marque: "Paper One",
    slug: "carton-papier-rame-a4-paper-one",
    nom: "Carton papier rame A4 70g Paper One (5 ramettes)",
    specs: "70 g/m² · 5 × 500 feuilles",
    detail: "Papier rame A4 Paper One, au carton.",
    prix: 13500,
    unite: "le carton",
    note: "Soit 2\u00a0700\u00a0FCFA la ramette",
    minQty: 1,
    image: "/images/paper-one-3.jpg",
    alt: "Carton de papier rame A4 Paper One 70 g",
    points: ["5 ramettes de 500 feuilles", "Format A4 (210 × 297 mm), 70 g/m²", "Livraison partout en Côte d'Ivoire"],
    galerie: [
      { src: "/images/paper-one-3.jpg", alt: "Papier rame A4 Paper One 70 g/m², 500 feuilles par ramette" },
      { src: "/images/paper-one-1.jpg", alt: "Papier rame A4 Paper One 70 g/m², 500 feuilles par ramette" },
      { src: "/images/paper-one-2.jpg", alt: "Papier rame A4 Paper One 70 g/m², 500 feuilles par ramette" },
    ],
    description: ["Le carton de papier rame A4 Paper One regroupe 5 ramettes de 500 feuilles, soit 2 500 feuilles de 70 g/m².", "Livraison partout en Côte d'Ivoire et paiement à la livraison ou par Mobile Money. Commandez en ligne, nous confirmons sur WhatsApp."],
    usages: ["Bureaux et entreprises", "Écoles et centres de formation", "Cybercafés et centres de photocopie", "Impression et photocopie du quotidien"],
    fiche: [
      ["Marque", "Paper One"],
      ["Format", "A4 (210 × 297 mm)"],
      ["Grammage", "70 g/m²"],
      ["Conditionnement", "Carton de 5 ramettes de 500 feuilles"],
      ["Quantité", "1 carton"],
    ],
    metaTitre: "Carton Papier Rame A4 Paper One 70g | Monpapierrame",
    metaDescription:
      "Carton de 5 ramettes papier rame A4 70g Paper One, 2 500 feuilles, {prix}. Livraison à Abidjan et partout en Côte d'Ivoire. Commandez en ligne.",
  },
  {
    id: "paperone-gros",
    marque: "Paper One",
    slug: "papier-rame-a4-paper-one-10-cartons",
    nom: "Papier rame A4 Paper One en gros (10 cartons)",
    specs: "Lot de 10 cartons · 70 g/m²",
    detail: "Pour les professionnels : lot de 10 cartons de papier rame A4 Paper One.",
    prix: 13000,
    unite: "le carton, dès 10 cartons",
    note: `Soit 2\u00a0600\u00a0FCFA la ramette, dès ${SEUIL_GROS} cartons`,
    minQty: 10,
    image: "/images/paper-one-2.jpg",
    alt: "Carton de papier rame A4 Paper One 70 g",
    points: ["Lot de 10 cartons (50 ramettes)", "25 000 feuilles A4 70 g/m²", "Facture sur demande"],
    galerie: [
      { src: "/images/paper-one-2.jpg", alt: "Papier rame A4 Paper One 70 g/m², 500 feuilles par ramette" },
      { src: "/images/paper-one-1.jpg", alt: "Papier rame A4 Paper One 70 g/m², 500 feuilles par ramette" },
      { src: "/images/paper-one-3.jpg", alt: "Papier rame A4 Paper One 70 g/m², 500 feuilles par ramette" },
    ],
    description: ["Achetez en gros du papier rame A4 Paper One : un lot de 10 cartons de 5 ramettes, soit 50 ramettes et 25 000 feuilles de 70 g/m².", "Le tarif gros s'applique dès 10 cartons, avec facture sur demande et livraison planifiée partout en Côte d'Ivoire."],
    usages: ["Imprimeries et revendeurs", "Écoles, universités et administrations", "Entreprises à gros volume d'impression", "Approvisionnement régulier avec livraison planifiée"],
    fiche: [
      ["Marque", "Paper One"],
      ["Format", "A4 (210 × 297 mm)"],
      ["Grammage", "70 g/m²"],
      ["Conditionnement", "Carton de 5 ramettes de 500 feuilles"],
      ["Quantité", "Lot de 10 cartons (50 ramettes)"],
    ],
    metaTitre: "Papier Rame A4 Paper One, 10 Cartons | Monpapierrame",
    metaDescription:
      "Papier rame A4 Paper One 70g en gros à Abidjan : {prix} le carton dès 10 cartons. Facture, livraison dans toute la Côte d'Ivoire. Devis sur WhatsApp.",
  },
  {
    id: "globulus-carton",
    marque: "Globulus",
    slug: "carton-papier-rame-a4-globulus",
    nom: "Carton papier rame A4 80g Globulus (5 ramettes)",
    specs: "80 g/m² · 5 × 500 feuilles",
    detail: "Papier rame A4 Globulus Premium, au carton.",
    prix: 13500,
    unite: "le carton",
    note: "Soit 2\u00a0700\u00a0FCFA la ramette",
    minQty: 1,
    image: "/images/globulus-3.jpg",
    alt: "Carton de papier rame A4 Globulus 80 g/m², 5 ramettes de 500 feuilles",
    points: ["5 ramettes de 500 feuilles", "Format A4 (210 × 297 mm), 80 g/m²", "Livraison partout en Côte d'Ivoire"],
    galerie: [
      { src: "/images/globulus-3.jpg", alt: "Papier rame A4 Globulus Premium 80 g/m², 500 feuilles par ramette" },
      { src: "/images/globulus-1.jpg", alt: "Papier rame A4 Globulus Premium 80 g/m², 500 feuilles par ramette" },
      { src: "/images/globulus-2.jpg", alt: "Papier rame A4 Globulus Premium 80 g/m², 500 feuilles par ramette" },
    ],
    description: ["Le carton de papier rame A4 Globulus regroupe 5 ramettes de 500 feuilles, soit 2 500 feuilles de 80 g/m².", "Livraison partout en Côte d'Ivoire et paiement à la livraison ou par Mobile Money. Commandez en ligne, nous confirmons sur WhatsApp."],
    usages: ["Bureaux et entreprises", "Écoles et centres de formation", "Cybercafés et centres de photocopie", "Impression et photocopie du quotidien"],
    fiche: [
      ["Marque", "Globulus"],
      ["Format", "A4 (210 × 297 mm)"],
      ["Grammage", "80 g/m²"],
      ["Conditionnement", "Carton de 5 ramettes de 500 feuilles"],
      ["Quantité", "1 carton"],
    ],
    metaTitre: "Carton Papier Rame A4 Globulus 80g | Monpapierrame",
    metaDescription:
      "Carton de 5 ramettes papier rame A4 80g Globulus, 2 500 feuilles, {prix}. Livraison à Abidjan et partout en Côte d'Ivoire. Commandez en ligne.",
  },
  {
    id: "globulus-gros",
    marque: "Globulus",
    slug: "papier-rame-a4-globulus-10-cartons",
    nom: "Papier rame A4 Globulus en gros (10 cartons)",
    specs: "Lot de 10 cartons · 80 g/m²",
    detail: "Pour les professionnels : lot de 10 cartons de papier rame A4 Globulus.",
    prix: 13000,
    unite: "le carton, dès 10 cartons",
    note: `Soit 2\u00a0600\u00a0FCFA la ramette, dès ${SEUIL_GROS} cartons`,
    minQty: 10,
    image: "/images/globulus-2.jpg",
    alt: "Carton de papier rame A4 Globulus 80 g/m², 5 ramettes de 500 feuilles",
    points: ["Lot de 10 cartons (50 ramettes)", "25 000 feuilles A4 80 g/m²", "Facture sur demande"],
    galerie: [
      { src: "/images/globulus-2.jpg", alt: "Papier rame A4 Globulus Premium 80 g/m², 500 feuilles par ramette" },
      { src: "/images/globulus-1.jpg", alt: "Papier rame A4 Globulus Premium 80 g/m², 500 feuilles par ramette" },
      { src: "/images/globulus-3.jpg", alt: "Papier rame A4 Globulus Premium 80 g/m², 500 feuilles par ramette" },
    ],
    description: ["Achetez en gros du papier rame A4 Globulus : un lot de 10 cartons de 5 ramettes, soit 50 ramettes et 25 000 feuilles de 80 g/m².", "Le tarif gros s'applique dès 10 cartons, avec facture sur demande et livraison planifiée partout en Côte d'Ivoire."],
    usages: ["Imprimeries et revendeurs", "Écoles, universités et administrations", "Entreprises à gros volume d'impression", "Approvisionnement régulier avec livraison planifiée"],
    fiche: [
      ["Marque", "Globulus"],
      ["Format", "A4 (210 × 297 mm)"],
      ["Grammage", "80 g/m²"],
      ["Conditionnement", "Carton de 5 ramettes de 500 feuilles"],
      ["Quantité", "Lot de 10 cartons (50 ramettes)"],
    ],
    metaTitre: "Papier Rame A4 Globulus, 10 Cartons | Monpapierrame",
    metaDescription:
      "Papier rame A4 Globulus 80g en gros à Abidjan : {prix} le carton dès 10 cartons. Facture, livraison dans toute la Côte d'Ivoire. Devis sur WhatsApp.",
  },
  {
    id: "paperpro-carton",
    marque: "Paper Pro",
    slug: "carton-papier-rame-a4-paper-pro",
    nom: "Carton papier rame A4 80g Paper Pro (5 ramettes)",
    specs: "80 g/m² · 5 × 500 feuilles",
    detail: "Papier rame A4 Paper Pro, au carton.",
    prix: 12500,
    unite: "le carton",
    note: "Soit 2\u00a0500\u00a0FCFA la ramette",
    minQty: 1,
    image: "/images/paper-pro-1.jpg",
    alt: "Carton de papier rame A4 Paper Pro 80 g",
    points: ["5 ramettes de 500 feuilles", "Format A4 (210 × 297 mm), 80 g/m²", "Livraison partout en Côte d'Ivoire"],
    galerie: [
      { src: "/images/paper-pro-1.jpg", alt: "Papier rame A4 Paper Pro 80 g/m², 500 feuilles par ramette" },
      { src: "/images/paper-pro-2.jpg", alt: "Papier rame A4 Paper Pro 80 g/m², 500 feuilles par ramette" },
      { src: "/images/paper-pro-3.jpg", alt: "Papier rame A4 Paper Pro 80 g/m², 500 feuilles par ramette" },
    ],
    description: ["Le carton de papier rame A4 Paper Pro regroupe 5 ramettes de 500 feuilles, soit 2 500 feuilles de 80 g/m².", "Livraison partout en Côte d'Ivoire et paiement à la livraison ou par Mobile Money. Commandez en ligne, nous confirmons sur WhatsApp."],
    usages: ["Bureaux et entreprises", "Écoles et centres de formation", "Cybercafés et centres de photocopie", "Impression et photocopie du quotidien"],
    fiche: [
      ["Marque", "Paper Pro"],
      ["Format", "A4 (210 × 297 mm)"],
      ["Grammage", "80 g/m²"],
      ["Conditionnement", "Carton de 5 ramettes de 500 feuilles"],
      ["Quantité", "1 carton"],
    ],
    metaTitre: "Carton Papier Rame A4 Paper Pro 80g | Monpapierrame",
    metaDescription:
      "Carton de 5 ramettes papier rame A4 80g Paper Pro, 2 500 feuilles, {prix}. Livraison à Abidjan et partout en Côte d'Ivoire. Commandez en ligne.",
  },
  {
    id: "paperpro-gros",
    marque: "Paper Pro",
    slug: "papier-rame-a4-paper-pro-10-cartons",
    nom: "Papier rame A4 Paper Pro en gros (10 cartons)",
    specs: "Lot de 10 cartons · 80 g/m²",
    detail: "Pour les professionnels : lot de 10 cartons de papier rame A4 Paper Pro.",
    prix: 12000,
    unite: "le carton, dès 10 cartons",
    note: `Soit 2\u00a0400\u00a0FCFA la ramette, dès ${SEUIL_GROS} cartons`,
    minQty: 10,
    image: "/images/paper-pro-2.jpg",
    alt: "Carton de papier rame A4 Paper Pro 80 g",
    points: ["Lot de 10 cartons (50 ramettes)", "25 000 feuilles A4 80 g/m²", "Facture sur demande"],
    galerie: [
      { src: "/images/paper-pro-2.jpg", alt: "Papier rame A4 Paper Pro 80 g/m², 500 feuilles par ramette" },
      { src: "/images/paper-pro-3.jpg", alt: "Papier rame A4 Paper Pro 80 g/m², 500 feuilles par ramette" },
      { src: "/images/paper-pro-1.jpg", alt: "Papier rame A4 Paper Pro 80 g/m², 500 feuilles par ramette" },
    ],
    description: ["Achetez en gros du papier rame A4 Paper Pro : un lot de 10 cartons de 5 ramettes, soit 50 ramettes et 25 000 feuilles de 80 g/m².", "Le tarif gros s'applique dès 10 cartons, avec facture sur demande et livraison planifiée partout en Côte d'Ivoire."],
    usages: ["Imprimeries et revendeurs", "Écoles, universités et administrations", "Entreprises à gros volume d'impression", "Approvisionnement régulier avec livraison planifiée"],
    fiche: [
      ["Marque", "Paper Pro"],
      ["Format", "A4 (210 × 297 mm)"],
      ["Grammage", "80 g/m²"],
      ["Conditionnement", "Carton de 5 ramettes de 500 feuilles"],
      ["Quantité", "Lot de 10 cartons (50 ramettes)"],
    ],
    metaTitre: "Papier Rame A4 Paper Pro, 10 Cartons | Monpapierrame",
    metaDescription:
      "Papier rame A4 Paper Pro 80g en gros à Abidjan : {prix} le carton dès 10 cartons. Facture, livraison dans toute la Côte d'Ivoire. Devis sur WhatsApp.",
  },
  {
    id: "authentik-carton",
    marque: "Authentik",
    slug: "carton-papier-rame-a4-authentik",
    nom: "Carton papier rame A4 80g Authentik (5 ramettes)",
    specs: "80 g/m² · 5 × 500 feuilles",
    detail: "Papier rame A4 Authentik, au carton.",
    prix: 13500,
    unite: "le carton",
    note: "Soit 2\u00a0700\u00a0FCFA la ramette",
    minQty: 1,
    image: "/images/authentik-1.jpg",
    alt: "Carton de papier rame A4 Authentik 80 g",
    points: ["5 ramettes de 500 feuilles", "Format A4 (210 × 297 mm), 80 g/m²", "Livraison partout en Côte d'Ivoire"],
    galerie: [
      { src: "/images/authentik-1.jpg", alt: "Papier rame A4 Authentik 80 g/m², 500 feuilles par ramette" },
    ],
    description: ["Le carton de papier rame A4 Authentik regroupe 5 ramettes de 500 feuilles, soit 2 500 feuilles de 80 g/m².", "Livraison partout en Côte d'Ivoire et paiement à la livraison ou par Mobile Money. Commandez en ligne, nous confirmons sur WhatsApp."],
    usages: ["Bureaux et entreprises", "Écoles et centres de formation", "Cybercafés et centres de photocopie", "Impression et photocopie du quotidien"],
    fiche: [
      ["Marque", "Authentik"],
      ["Format", "A4 (210 × 297 mm)"],
      ["Grammage", "80 g/m²"],
      ["Conditionnement", "Carton de 5 ramettes de 500 feuilles"],
      ["Quantité", "1 carton"],
    ],
    metaTitre: "Carton Papier Rame A4 Authentik 80g | Monpapierrame",
    metaDescription:
      "Carton de 5 ramettes papier rame A4 80g Authentik, 2 500 feuilles, {prix}. Livraison à Abidjan et partout en Côte d'Ivoire. Commandez en ligne.",
  },
  {
    id: "authentik-gros",
    marque: "Authentik",
    slug: "papier-rame-a4-authentik-10-cartons",
    nom: "Papier rame A4 Authentik en gros (10 cartons)",
    specs: "Lot de 10 cartons · 80 g/m²",
    detail: "Pour les professionnels : lot de 10 cartons de papier rame A4 Authentik.",
    prix: 13000,
    unite: "le carton, dès 10 cartons",
    note: `Soit 2\u00a0600\u00a0FCFA la ramette, dès ${SEUIL_GROS} cartons`,
    minQty: 10,
    image: "/images/authentik-1.jpg",
    alt: "Carton de papier rame A4 Authentik 80 g",
    points: ["Lot de 10 cartons (50 ramettes)", "25 000 feuilles A4 80 g/m²", "Facture sur demande"],
    galerie: [
      { src: "/images/authentik-1.jpg", alt: "Papier rame A4 Authentik 80 g/m², 500 feuilles par ramette" },
    ],
    description: ["Achetez en gros du papier rame A4 Authentik : un lot de 10 cartons de 5 ramettes, soit 50 ramettes et 25 000 feuilles de 80 g/m².", "Le tarif gros s'applique dès 10 cartons, avec facture sur demande et livraison planifiée partout en Côte d'Ivoire."],
    usages: ["Imprimeries et revendeurs", "Écoles, universités et administrations", "Entreprises à gros volume d'impression", "Approvisionnement régulier avec livraison planifiée"],
    fiche: [
      ["Marque", "Authentik"],
      ["Format", "A4 (210 × 297 mm)"],
      ["Grammage", "80 g/m²"],
      ["Conditionnement", "Carton de 5 ramettes de 500 feuilles"],
      ["Quantité", "Lot de 10 cartons (50 ramettes)"],
    ],
    metaTitre: "Papier Rame A4 Authentik, 10 Cartons | Monpapierrame",
    metaDescription:
      "Papier rame A4 Authentik 80g en gros à Abidjan : {prix} le carton dès 10 cartons. Facture, livraison dans toute la Côte d'Ivoire. Devis sur WhatsApp.",
  },
  {
    id: "smart-copy-carton",
    marque: "Smart Copy",
    slug: "carton-papier-rame-a4-smart-copy",
    nom: "Carton papier rame A4 80g Smart Copy (5 ramettes)",
    specs: "80 g/m² · 5 × 500 feuilles",
    detail: "Papier rame A4 Smart Copy, au carton.",
    prix: 13500,
    unite: "le carton",
    note: "Soit 2\u00a0700\u00a0FCFA la ramette",
    minQty: 1,
    image: "/images/smart-copy-3.jpg",
    alt: "Carton de papier rame A4 Smart Copy 80 g/m², 5 ramettes de 500 feuilles",
    points: ["5 ramettes de 500 feuilles", "Format A4 (210 × 297 mm), 80 g/m²", "Livraison partout en Côte d'Ivoire"],
    galerie: [
      { src: "/images/smart-copy-3.jpg", alt: "Papier rame A4 Smart Copy 80 g/m², carton et ramettes de 500 feuilles" },
      { src: "/images/smart-copy-1.jpg", alt: "Papier rame A4 Smart Copy 80 g/m², carton et ramettes de 500 feuilles" },
      { src: "/images/smart-copy-2.jpg", alt: "Papier rame A4 Smart Copy 80 g/m², carton et ramettes de 500 feuilles" },
    ],
    description: ["Le carton de papier rame A4 Smart Copy regroupe 5 ramettes de 500 feuilles, soit 2 500 feuilles de 80 g/m².", "Livraison partout en Côte d'Ivoire et paiement à la livraison ou par Mobile Money. Commandez en ligne, nous confirmons sur WhatsApp."],
    usages: ["Bureaux et entreprises", "Écoles et centres de formation", "Cybercafés et centres de photocopie", "Impression et photocopie du quotidien"],
    fiche: [
      ["Marque", "Smart Copy"],
      ["Format", "A4 (210 × 297 mm)"],
      ["Grammage", "80 g/m²"],
      ["Conditionnement", "Carton de 5 ramettes de 500 feuilles"],
      ["Quantité", "1 carton"],
    ],
    metaTitre: "Carton Papier Rame A4 Smart Copy 80g | Monpapierrame",
    metaDescription:
      "Carton de 5 ramettes papier rame A4 80g Smart Copy, 2 500 feuilles, {prix}. Livraison à Abidjan et partout en Côte d'Ivoire. Commandez en ligne.",
  },
  {
    id: "smart-copy-gros",
    marque: "Smart Copy",
    slug: "papier-rame-a4-smart-copy-10-cartons",
    nom: "Papier rame A4 Smart Copy en gros (10 cartons)",
    specs: "Lot de 10 cartons · 80 g/m²",
    detail: "Pour les professionnels : lot de 10 cartons de papier rame A4 Smart Copy.",
    prix: 13000,
    unite: "le carton, dès 10 cartons",
    note: `Soit 2\u00a0600\u00a0FCFA la ramette, dès ${SEUIL_GROS} cartons`,
    minQty: 10,
    image: "/images/smart-copy-2.jpg",
    alt: "Carton de papier rame A4 Smart Copy 80 g/m², 5 ramettes de 500 feuilles",
    points: ["Lot de 10 cartons (50 ramettes)", "25 000 feuilles A4 80 g/m²", "Facture sur demande"],
    galerie: [
      { src: "/images/smart-copy-2.jpg", alt: "Papier rame A4 Smart Copy 80 g/m², carton et ramettes de 500 feuilles" },
      { src: "/images/smart-copy-1.jpg", alt: "Papier rame A4 Smart Copy 80 g/m², carton et ramettes de 500 feuilles" },
      { src: "/images/smart-copy-3.jpg", alt: "Papier rame A4 Smart Copy 80 g/m², carton et ramettes de 500 feuilles" },
    ],
    description: ["Achetez en gros du papier rame A4 Smart Copy : un lot de 10 cartons de 5 ramettes, soit 50 ramettes et 25 000 feuilles de 80 g/m².", "Le tarif gros s'applique dès 10 cartons, avec facture sur demande et livraison planifiée partout en Côte d'Ivoire."],
    usages: ["Imprimeries et revendeurs", "Écoles, universités et administrations", "Entreprises à gros volume d'impression", "Approvisionnement régulier avec livraison planifiée"],
    fiche: [
      ["Marque", "Smart Copy"],
      ["Format", "A4 (210 × 297 mm)"],
      ["Grammage", "80 g/m²"],
      ["Conditionnement", "Carton de 5 ramettes de 500 feuilles"],
      ["Quantité", "Lot de 10 cartons (50 ramettes)"],
    ],
    metaTitre: "Papier Rame A4 Smart Copy, 10 Cartons | Monpapierrame",
    metaDescription:
      "Papier rame A4 Smart Copy 80g en gros à Abidjan : {prix} le carton dès 10 cartons. Facture, livraison dans toute la Côte d'Ivoire. Devis sur WhatsApp.",
  },
  {
    id: "ultima-copy-carton",
    marque: "Ultima Copy",
    slug: "carton-papier-rame-a4-ultima-copy",
    nom: "Carton papier rame A4 75g Ultima Copy (5 ramettes)",
    specs: "75 g/m² · 5 × 500 feuilles",
    detail: "Papier rame A4 Ultima Copy, au carton.",
    prix: 12500,
    unite: "le carton",
    note: "Soit 2\u00a0500\u00a0FCFA la ramette",
    minQty: 1,
    image: "/images/ultima-copy-1.jpg",
    alt: "Carton de papier rame A4 Ultima Copy 75 g/m², 5 ramettes de 500 feuilles",
    points: ["5 ramettes de 500 feuilles", "Format A4 (210 × 297 mm), 75 g/m²", "Livraison partout en Côte d'Ivoire"],
    galerie: [
      { src: "/images/ultima-copy-1.jpg", alt: "Papier rame A4 Ultima Copy 75 g/m², carton et ramettes de 500 feuilles" },
      { src: "/images/ultima-copy-2.jpg", alt: "Papier rame A4 Ultima Copy 75 g/m², carton et ramettes de 500 feuilles" },
    ],
    description: ["Le carton de papier rame A4 Ultima Copy regroupe 5 ramettes de 500 feuilles, soit 2 500 feuilles de 75 g/m².", "Livraison partout en Côte d'Ivoire et paiement à la livraison ou par Mobile Money. Commandez en ligne, nous confirmons sur WhatsApp."],
    usages: ["Bureaux et entreprises", "Écoles et centres de formation", "Cybercafés et centres de photocopie", "Impression et photocopie du quotidien"],
    fiche: [
      ["Marque", "Ultima Copy"],
      ["Format", "A4 (210 × 297 mm)"],
      ["Grammage", "75 g/m²"],
      ["Conditionnement", "Carton de 5 ramettes de 500 feuilles"],
      ["Quantité", "1 carton"],
    ],
    metaTitre: "Carton Papier Rame A4 Ultima Copy 75g | Monpapierrame",
    metaDescription:
      "Carton de 5 ramettes papier rame A4 75g Ultima Copy, 2 500 feuilles, {prix}. Livraison à Abidjan et partout en Côte d'Ivoire. Commandez en ligne.",
  },
  {
    id: "ultima-copy-gros",
    marque: "Ultima Copy",
    slug: "papier-rame-a4-ultima-copy-10-cartons",
    nom: "Papier rame A4 Ultima Copy en gros (10 cartons)",
    specs: "Lot de 10 cartons · 75 g/m²",
    detail: "Pour les professionnels : lot de 10 cartons de papier rame A4 Ultima Copy.",
    prix: 12000,
    unite: "le carton, dès 10 cartons",
    note: `Soit 2\u00a0400\u00a0FCFA la ramette, dès ${SEUIL_GROS} cartons`,
    minQty: 10,
    image: "/images/ultima-copy-2.jpg",
    alt: "Carton de papier rame A4 Ultima Copy 75 g/m², 5 ramettes de 500 feuilles",
    points: ["Lot de 10 cartons (50 ramettes)", "25 000 feuilles A4 75 g/m²", "Facture sur demande"],
    galerie: [
      { src: "/images/ultima-copy-2.jpg", alt: "Papier rame A4 Ultima Copy 75 g/m², carton et ramettes de 500 feuilles" },
      { src: "/images/ultima-copy-1.jpg", alt: "Papier rame A4 Ultima Copy 75 g/m², carton et ramettes de 500 feuilles" },
    ],
    description: ["Achetez en gros du papier rame A4 Ultima Copy : un lot de 10 cartons de 5 ramettes, soit 50 ramettes et 25 000 feuilles de 75 g/m².", "Le tarif gros s'applique dès 10 cartons, avec facture sur demande et livraison planifiée partout en Côte d'Ivoire."],
    usages: ["Imprimeries et revendeurs", "Écoles, universités et administrations", "Entreprises à gros volume d'impression", "Approvisionnement régulier avec livraison planifiée"],
    fiche: [
      ["Marque", "Ultima Copy"],
      ["Format", "A4 (210 × 297 mm)"],
      ["Grammage", "75 g/m²"],
      ["Conditionnement", "Carton de 5 ramettes de 500 feuilles"],
      ["Quantité", "Lot de 10 cartons (50 ramettes)"],
    ],
    metaTitre: "Papier Rame A4 Ultima Copy, 10 Cartons | Monpapierrame",
    metaDescription:
      "Papier rame A4 Ultima Copy 75g en gros à Abidjan : {prix} le carton dès 10 cartons. Facture, livraison en Côte d'Ivoire. Devis sur WhatsApp.",
  },
  {
    id: "roch-carton",
    marque: "Roch",
    slug: "carton-papier-rame-a4-roch",
    nom: "Carton papier rame A4 80g Roch (5 ramettes)",
    specs: "80 g/m² · 5 × 500 feuilles",
    detail: "Papier rame A4 Roch, au carton.",
    prix: 12500,
    unite: "le carton",
    note: "Soit 2\u00a0500\u00a0FCFA la ramette",
    minQty: 1,
    image: "/images/roch-3.jpg",
    alt: "Carton de papier rame A4 Roch 80 g/m², 5 ramettes de 500 feuilles",
    points: ["5 ramettes de 500 feuilles", "Format A4 (210 × 297 mm), 80 g/m²", "Livraison partout en Côte d'Ivoire"],
    galerie: [
      { src: "/images/roch-3.jpg", alt: "Papier rame A4 Roch 80 g/m², carton et ramettes de 500 feuilles" },
      { src: "/images/roch-1.jpg", alt: "Papier rame A4 Roch 80 g/m², carton et ramettes de 500 feuilles" },
      { src: "/images/roch-2.jpg", alt: "Papier rame A4 Roch 80 g/m², carton et ramettes de 500 feuilles" },
    ],
    description: ["Le carton de papier rame A4 Roch regroupe 5 ramettes de 500 feuilles, soit 2 500 feuilles de 80 g/m².", "Livraison partout en Côte d'Ivoire et paiement à la livraison ou par Mobile Money. Commandez en ligne, nous confirmons sur WhatsApp."],
    usages: ["Bureaux et entreprises", "Écoles et centres de formation", "Cybercafés et centres de photocopie", "Impression et photocopie du quotidien"],
    fiche: [
      ["Marque", "Roch"],
      ["Format", "A4 (210 × 297 mm)"],
      ["Grammage", "80 g/m²"],
      ["Conditionnement", "Carton de 5 ramettes de 500 feuilles"],
      ["Quantité", "1 carton"],
    ],
    metaTitre: "Carton Papier Rame A4 Roch 80g | Monpapierrame",
    metaDescription:
      "Carton de 5 ramettes papier rame A4 80g Roch, 2 500 feuilles, {prix}. Livraison à Abidjan et partout en Côte d'Ivoire. Commandez en ligne.",
  },
  {
    id: "roch-gros",
    marque: "Roch",
    slug: "papier-rame-a4-roch-10-cartons",
    nom: "Papier rame A4 Roch en gros (10 cartons)",
    specs: "Lot de 10 cartons · 80 g/m²",
    detail: "Pour les professionnels : lot de 10 cartons de papier rame A4 Roch.",
    prix: 12000,
    unite: "le carton, dès 10 cartons",
    note: `Soit 2\u00a0400\u00a0FCFA la ramette, dès ${SEUIL_GROS} cartons`,
    minQty: 10,
    image: "/images/roch-2.jpg",
    alt: "Carton de papier rame A4 Roch 80 g/m², 5 ramettes de 500 feuilles",
    points: ["Lot de 10 cartons (50 ramettes)", "25 000 feuilles A4 80 g/m²", "Facture sur demande"],
    galerie: [
      { src: "/images/roch-2.jpg", alt: "Papier rame A4 Roch 80 g/m², carton et ramettes de 500 feuilles" },
      { src: "/images/roch-1.jpg", alt: "Papier rame A4 Roch 80 g/m², carton et ramettes de 500 feuilles" },
      { src: "/images/roch-3.jpg", alt: "Papier rame A4 Roch 80 g/m², carton et ramettes de 500 feuilles" },
    ],
    description: ["Achetez en gros du papier rame A4 Roch : un lot de 10 cartons de 5 ramettes, soit 50 ramettes et 25 000 feuilles de 80 g/m².", "Le tarif gros s'applique dès 10 cartons, avec facture sur demande et livraison planifiée partout en Côte d'Ivoire."],
    usages: ["Imprimeries et revendeurs", "Écoles, universités et administrations", "Entreprises à gros volume d'impression", "Approvisionnement régulier avec livraison planifiée"],
    fiche: [
      ["Marque", "Roch"],
      ["Format", "A4 (210 × 297 mm)"],
      ["Grammage", "80 g/m²"],
      ["Conditionnement", "Carton de 5 ramettes de 500 feuilles"],
      ["Quantité", "Lot de 10 cartons (50 ramettes)"],
    ],
    metaTitre: "Papier Rame A4 Roch, 10 Cartons | Monpapierrame",
    metaDescription:
      "Papier rame A4 Roch 80g en gros à Abidjan : {prix} le carton dès 10 cartons. Facture, livraison dans toute la Côte d'Ivoire. Devis sur WhatsApp.",
  },
  {
    id: "aone-carton",
    marque: "Aone",
    slug: "carton-papier-rame-a4-aone",
    nom: "Carton papier rame A4 80g Aone (5 ramettes)",
    specs: "80 g/m² · 5 × 500 feuilles",
    detail: "Papier rame A4 Aone, au carton.",
    prix: 12500,
    unite: "le carton",
    note: "Soit 2\u00a0500\u00a0FCFA la ramette",
    minQty: 1,
    image: "/images/aone-3.jpg",
    alt: "Carton de papier rame A4 Aone 80 g/m², 5 ramettes de 500 feuilles",
    points: ["5 ramettes de 500 feuilles", "Format A4 (210 × 297 mm), 80 g/m²", "Livraison partout en Côte d'Ivoire"],
    galerie: [
      { src: "/images/aone-3.jpg", alt: "Papier rame A4 Aone 80 g/m², carton et ramettes de 500 feuilles" },
      { src: "/images/aone-1.jpg", alt: "Papier rame A4 Aone 80 g/m², carton et ramettes de 500 feuilles" },
      { src: "/images/aone-2.jpg", alt: "Papier rame A4 Aone 80 g/m², carton et ramettes de 500 feuilles" },
    ],
    description: ["Le carton de papier rame A4 Aone regroupe 5 ramettes de 500 feuilles, soit 2 500 feuilles de 80 g/m².", "Livraison partout en Côte d'Ivoire et paiement à la livraison ou par Mobile Money. Commandez en ligne, nous confirmons sur WhatsApp."],
    usages: ["Bureaux et entreprises", "Écoles et centres de formation", "Cybercafés et centres de photocopie", "Impression et photocopie du quotidien"],
    fiche: [
      ["Marque", "Aone"],
      ["Format", "A4 (210 × 297 mm)"],
      ["Grammage", "80 g/m²"],
      ["Conditionnement", "Carton de 5 ramettes de 500 feuilles"],
      ["Quantité", "1 carton"],
    ],
    metaTitre: "Carton Papier Rame A4 Aone 80g | Monpapierrame",
    metaDescription:
      "Carton de 5 ramettes papier rame A4 80g Aone, 2 500 feuilles, {prix}. Livraison à Abidjan et partout en Côte d'Ivoire. Commandez en ligne.",
  },
  {
    id: "aone-gros",
    marque: "Aone",
    slug: "papier-rame-a4-aone-10-cartons",
    nom: "Papier rame A4 Aone en gros (10 cartons)",
    specs: "Lot de 10 cartons · 80 g/m²",
    detail: "Pour les professionnels : lot de 10 cartons de papier rame A4 Aone.",
    prix: 12000,
    unite: "le carton, dès 10 cartons",
    note: `Soit 2\u00a0400\u00a0FCFA la ramette, dès ${SEUIL_GROS} cartons`,
    minQty: 10,
    image: "/images/aone-2.jpg",
    alt: "Carton de papier rame A4 Aone 80 g/m², 5 ramettes de 500 feuilles",
    points: ["Lot de 10 cartons (50 ramettes)", "25 000 feuilles A4 80 g/m²", "Facture sur demande"],
    galerie: [
      { src: "/images/aone-2.jpg", alt: "Papier rame A4 Aone 80 g/m², carton et ramettes de 500 feuilles" },
      { src: "/images/aone-1.jpg", alt: "Papier rame A4 Aone 80 g/m², carton et ramettes de 500 feuilles" },
      { src: "/images/aone-3.jpg", alt: "Papier rame A4 Aone 80 g/m², carton et ramettes de 500 feuilles" },
    ],
    description: ["Achetez en gros du papier rame A4 Aone : un lot de 10 cartons de 5 ramettes, soit 50 ramettes et 25 000 feuilles de 80 g/m².", "Le tarif gros s'applique dès 10 cartons, avec facture sur demande et livraison planifiée partout en Côte d'Ivoire."],
    usages: ["Imprimeries et revendeurs", "Écoles, universités et administrations", "Entreprises à gros volume d'impression", "Approvisionnement régulier avec livraison planifiée"],
    fiche: [
      ["Marque", "Aone"],
      ["Format", "A4 (210 × 297 mm)"],
      ["Grammage", "80 g/m²"],
      ["Conditionnement", "Carton de 5 ramettes de 500 feuilles"],
      ["Quantité", "Lot de 10 cartons (50 ramettes)"],
    ],
    metaTitre: "Papier Rame A4 Aone, 10 Cartons | Monpapierrame",
    metaDescription:
      "Papier rame A4 Aone 80g en gros à Abidjan : {prix} le carton dès 10 cartons. Facture, livraison dans toute la Côte d'Ivoire. Devis sur WhatsApp.",
  },
  {
    id: "aria-carton",
    marque: "Aria",
    slug: "carton-papier-rame-a4-aria",
    nom: "Carton papier rame A4 80g Aria (5 ramettes)",
    specs: "80 g/m² · 5 × 500 feuilles",
    detail: "Papier rame A4 Aria, au carton.",
    prix: 12500,
    unite: "le carton",
    note: "Soit 2\u00a0500\u00a0FCFA la ramette",
    minQty: 1,
    image: "/images/aria-2.jpg",
    alt: "Carton de papier rame A4 Aria 80 g/m², 5 ramettes de 500 feuilles",
    points: ["5 ramettes de 500 feuilles", "Format A4 (210 × 297 mm), 80 g/m²", "Livraison partout en Côte d'Ivoire"],
    galerie: [
      { src: "/images/aria-2.jpg", alt: "Papier rame A4 Aria 80 g/m², carton et ramettes de 500 feuilles" },
      { src: "/images/aria-1.jpg", alt: "Papier rame A4 Aria 80 g/m², carton et ramettes de 500 feuilles" },
    ],
    description: ["Le carton de papier rame A4 Aria regroupe 5 ramettes de 500 feuilles, soit 2 500 feuilles de 80 g/m².", "Livraison partout en Côte d'Ivoire et paiement à la livraison ou par Mobile Money. Commandez en ligne, nous confirmons sur WhatsApp."],
    usages: ["Bureaux et entreprises", "Écoles et centres de formation", "Cybercafés et centres de photocopie", "Impression et photocopie du quotidien"],
    fiche: [
      ["Marque", "Aria"],
      ["Format", "A4 (210 × 297 mm)"],
      ["Grammage", "80 g/m²"],
      ["Conditionnement", "Carton de 5 ramettes de 500 feuilles"],
      ["Quantité", "1 carton"],
    ],
    metaTitre: "Carton Papier Rame A4 Aria 80g | Monpapierrame",
    metaDescription:
      "Carton de 5 ramettes papier rame A4 80g Aria, 2 500 feuilles, {prix}. Livraison à Abidjan et partout en Côte d'Ivoire. Commandez en ligne.",
  },
  {
    id: "aria-gros",
    marque: "Aria",
    slug: "papier-rame-a4-aria-10-cartons",
    nom: "Papier rame A4 Aria en gros (10 cartons)",
    specs: "Lot de 10 cartons · 80 g/m²",
    detail: "Pour les professionnels : lot de 10 cartons de papier rame A4 Aria.",
    prix: 12000,
    unite: "le carton, dès 10 cartons",
    note: `Soit 2\u00a0400\u00a0FCFA la ramette, dès ${SEUIL_GROS} cartons`,
    minQty: 10,
    image: "/images/aria-1.jpg",
    alt: "Carton de papier rame A4 Aria 80 g/m², 5 ramettes de 500 feuilles",
    points: ["Lot de 10 cartons (50 ramettes)", "25 000 feuilles A4 80 g/m²", "Facture sur demande"],
    galerie: [
      { src: "/images/aria-1.jpg", alt: "Papier rame A4 Aria 80 g/m², carton et ramettes de 500 feuilles" },
      { src: "/images/aria-2.jpg", alt: "Papier rame A4 Aria 80 g/m², carton et ramettes de 500 feuilles" },
    ],
    description: ["Achetez en gros du papier rame A4 Aria : un lot de 10 cartons de 5 ramettes, soit 50 ramettes et 25 000 feuilles de 80 g/m².", "Le tarif gros s'applique dès 10 cartons, avec facture sur demande et livraison planifiée partout en Côte d'Ivoire."],
    usages: ["Imprimeries et revendeurs", "Écoles, universités et administrations", "Entreprises à gros volume d'impression", "Approvisionnement régulier avec livraison planifiée"],
    fiche: [
      ["Marque", "Aria"],
      ["Format", "A4 (210 × 297 mm)"],
      ["Grammage", "80 g/m²"],
      ["Conditionnement", "Carton de 5 ramettes de 500 feuilles"],
      ["Quantité", "Lot de 10 cartons (50 ramettes)"],
    ],
    metaTitre: "Papier Rame A4 Aria, 10 Cartons | Monpapierrame",
    metaDescription:
      "Papier rame A4 Aria 80g en gros à Abidjan : {prix} le carton dès 10 cartons. Facture, livraison dans toute la Côte d'Ivoire. Devis sur WhatsApp.",
  },
  {
    id: "royal-touch-carton",
    marque: "Royal Touch",
    slug: "carton-papier-rame-a4-royal-touch",
    nom: "Carton papier rame A4 80g Royal Touch (5 ramettes)",
    specs: "80 g/m² · 5 × 500 feuilles",
    detail: "Papier rame A4 Royal Touch, au carton.",
    prix: 12500,
    unite: "le carton",
    note: "Soit 2\u00a0500\u00a0FCFA la ramette",
    minQty: 1,
    image: "/images/royal-touch-1.jpg",
    alt: "Carton de papier rame A4 Royal Touch 80 g/m², 5 ramettes de 500 feuilles",
    points: ["5 ramettes de 500 feuilles", "Format A4 (210 × 297 mm), 80 g/m²", "Livraison partout en Côte d'Ivoire"],
    galerie: [
      { src: "/images/royal-touch-1.jpg", alt: "Papier rame A4 Royal Touch 80 g/m², carton et ramettes de 500 feuilles" },
    ],
    description: ["Le carton de papier rame A4 Royal Touch regroupe 5 ramettes de 500 feuilles, soit 2 500 feuilles de 80 g/m².", "Livraison partout en Côte d'Ivoire et paiement à la livraison ou par Mobile Money. Commandez en ligne, nous confirmons sur WhatsApp."],
    usages: ["Bureaux et entreprises", "Écoles et centres de formation", "Cybercafés et centres de photocopie", "Impression et photocopie du quotidien"],
    fiche: [
      ["Marque", "Royal Touch"],
      ["Format", "A4 (210 × 297 mm)"],
      ["Grammage", "80 g/m²"],
      ["Conditionnement", "Carton de 5 ramettes de 500 feuilles"],
      ["Quantité", "1 carton"],
    ],
    metaTitre: "Carton Papier Rame A4 Royal Touch 80g | Monpapierrame",
    metaDescription:
      "Carton de 5 ramettes papier rame A4 80g Royal Touch, 2 500 feuilles, {prix}. Livraison à Abidjan et partout en Côte d'Ivoire. Commandez en ligne.",
  },
  {
    id: "royal-touch-gros",
    marque: "Royal Touch",
    slug: "papier-rame-a4-royal-touch-10-cartons",
    nom: "Papier rame A4 Royal Touch en gros (10 cartons)",
    specs: "Lot de 10 cartons · 80 g/m²",
    detail: "Pour les professionnels : lot de 10 cartons de papier rame A4 Royal Touch.",
    prix: 12000,
    unite: "le carton, dès 10 cartons",
    note: `Soit 2\u00a0400\u00a0FCFA la ramette, dès ${SEUIL_GROS} cartons`,
    minQty: 10,
    image: "/images/royal-touch-1.jpg",
    alt: "Carton de papier rame A4 Royal Touch 80 g/m², 5 ramettes de 500 feuilles",
    points: ["Lot de 10 cartons (50 ramettes)", "25 000 feuilles A4 80 g/m²", "Facture sur demande"],
    galerie: [
      { src: "/images/royal-touch-1.jpg", alt: "Papier rame A4 Royal Touch 80 g/m², carton et ramettes de 500 feuilles" },
    ],
    description: ["Achetez en gros du papier rame A4 Royal Touch : un lot de 10 cartons de 5 ramettes, soit 50 ramettes et 25 000 feuilles de 80 g/m².", "Le tarif gros s'applique dès 10 cartons, avec facture sur demande et livraison planifiée partout en Côte d'Ivoire."],
    usages: ["Imprimeries et revendeurs", "Écoles, universités et administrations", "Entreprises à gros volume d'impression", "Approvisionnement régulier avec livraison planifiée"],
    fiche: [
      ["Marque", "Royal Touch"],
      ["Format", "A4 (210 × 297 mm)"],
      ["Grammage", "80 g/m²"],
      ["Conditionnement", "Carton de 5 ramettes de 500 feuilles"],
      ["Quantité", "Lot de 10 cartons (50 ramettes)"],
    ],
    metaTitre: "Papier Rame A4 Royal Touch, 10 Cartons | Monpapierrame",
    metaDescription:
      "Papier rame A4 Royal Touch 80g en gros à Abidjan : {prix} le carton dès 10 cartons. Facture, livraison en Côte d'Ivoire. Devis sur WhatsApp.",
  },
  {
    id: "beifa-carton",
    marque: "Beifa",
    slug: "carton-papier-rame-a4-beifa",
    nom: "Carton papier rame A4 80g Beifa (5 ramettes)",
    specs: "80 g/m² · 5 × 500 feuilles",
    detail: "Papier rame A4 Beifa, au carton.",
    prix: 12500,
    unite: "le carton",
    note: "Soit 2\u00a0500\u00a0FCFA la ramette",
    minQty: 1,
    image: "/images/beifa-2.jpg",
    alt: "Carton de papier rame A4 Beifa 80 g/m², 5 ramettes de 500 feuilles",
    points: ["5 ramettes de 500 feuilles", "Format A4 (210 × 297 mm), 80 g/m²", "Livraison partout en Côte d'Ivoire"],
    galerie: [
      { src: "/images/beifa-2.jpg", alt: "Papier rame A4 Beifa 80 g/m², carton et ramettes de 500 feuilles" },
      { src: "/images/beifa-1.jpg", alt: "Papier rame A4 Beifa 80 g/m², carton et ramettes de 500 feuilles" },
      { src: "/images/beifa-3.jpg", alt: "Papier rame A4 Beifa 80 g/m², carton et ramettes de 500 feuilles" },
    ],
    description: ["Le carton de papier rame A4 Beifa regroupe 5 ramettes de 500 feuilles, soit 2 500 feuilles de 80 g/m².", "Livraison partout en Côte d'Ivoire et paiement à la livraison ou par Mobile Money. Commandez en ligne, nous confirmons sur WhatsApp."],
    usages: ["Bureaux et entreprises", "Écoles et centres de formation", "Cybercafés et centres de photocopie", "Impression et photocopie du quotidien"],
    fiche: [
      ["Marque", "Beifa"],
      ["Format", "A4 (210 × 297 mm)"],
      ["Grammage", "80 g/m²"],
      ["Conditionnement", "Carton de 5 ramettes de 500 feuilles"],
      ["Quantité", "1 carton"],
    ],
    metaTitre: "Carton Papier Rame A4 Beifa 80g | Monpapierrame",
    metaDescription:
      "Carton de 5 ramettes papier rame A4 80g Beifa, 2 500 feuilles, {prix}. Livraison à Abidjan et partout en Côte d'Ivoire. Commandez en ligne.",
  },
  {
    id: "beifa-gros",
    marque: "Beifa",
    slug: "papier-rame-a4-beifa-10-cartons",
    nom: "Papier rame A4 Beifa en gros (10 cartons)",
    specs: "Lot de 10 cartons · 80 g/m²",
    detail: "Pour les professionnels : lot de 10 cartons de papier rame A4 Beifa.",
    prix: 12000,
    unite: "le carton, dès 10 cartons",
    note: `Soit 2\u00a0400\u00a0FCFA la ramette, dès ${SEUIL_GROS} cartons`,
    minQty: 10,
    image: "/images/beifa-1.jpg",
    alt: "Carton de papier rame A4 Beifa 80 g/m², 5 ramettes de 500 feuilles",
    points: ["Lot de 10 cartons (50 ramettes)", "25 000 feuilles A4 80 g/m²", "Facture sur demande"],
    galerie: [
      { src: "/images/beifa-1.jpg", alt: "Papier rame A4 Beifa 80 g/m², carton et ramettes de 500 feuilles" },
      { src: "/images/beifa-3.jpg", alt: "Papier rame A4 Beifa 80 g/m², carton et ramettes de 500 feuilles" },
      { src: "/images/beifa-2.jpg", alt: "Papier rame A4 Beifa 80 g/m², carton et ramettes de 500 feuilles" },
    ],
    description: ["Achetez en gros du papier rame A4 Beifa : un lot de 10 cartons de 5 ramettes, soit 50 ramettes et 25 000 feuilles de 80 g/m².", "Le tarif gros s'applique dès 10 cartons, avec facture sur demande et livraison planifiée partout en Côte d'Ivoire."],
    usages: ["Imprimeries et revendeurs", "Écoles, universités et administrations", "Entreprises à gros volume d'impression", "Approvisionnement régulier avec livraison planifiée"],
    fiche: [
      ["Marque", "Beifa"],
      ["Format", "A4 (210 × 297 mm)"],
      ["Grammage", "80 g/m²"],
      ["Conditionnement", "Carton de 5 ramettes de 500 feuilles"],
      ["Quantité", "Lot de 10 cartons (50 ramettes)"],
    ],
    metaTitre: "Papier Rame A4 Beifa, 10 Cartons | Monpapierrame",
    metaDescription:
      "Papier rame A4 Beifa 80g en gros à Abidjan : {prix} le carton dès 10 cartons. Facture, livraison en Côte d'Ivoire. Devis sur WhatsApp.",
  },
];

/** Remplace {prix} par le prix formaté du produit */
export function meta(texte: string, prix: number | null): string {
  return texte.replace("{prix}", prix === null ? "prix sur demande" : formatPrixTexte(prix));
}

/** Libellé du prix à afficher : « 19 900 FCFA » ou « Prix sur demande » */
export function libellePrix(p: Produit): string {
  return p.prix === null ? "Prix sur demande" : formatPrix(p.prix);
}

/** Lien WhatsApp pour demander le prix d'un produit sur demande */
export function lienDevis(p: Produit): string {
  return lienWhatsApp(p.messageDevis ?? `Bonjour ${SITE.nom}, je souhaite le prix de : ${p.nom}.`);
}

export function trouverProduit(id: string): Produit | undefined {
  return PRODUITS.find((p) => p.id === id);
}

export function trouverParSlug(slug: string): Produit | undefined {
  return PRODUITS.find((p) => p.slug === slug);
}

/** Anciennes adresses de pages produit, redirigées vers les nouvelles (voir next.config.ts) */
export const ANCIENS_SLUGS: Record<string, string> = {
  ramette: "ramette-papier-a4-80g-double-a",
  carton: "carton-papier-a4-5-ramettes-double-a",
  gros: "papier-a4-en-gros-carton-double-a",
};

/**
 * Prix pour l'affichage : « 19 900 FCFA », avec des espaces insécables pour que
 * le montant ne se coupe jamais en fin de ligne.
 */
export function formatPrix(n: number): string {
  return new Intl.NumberFormat("fr-FR").format(n).replace(/[\u202f\u00a0 ]/g, "\u00a0") + "\u00a0FCFA";
}

/** Prix en texte simple (espaces normaux) : titres Google, messages WhatsApp, llms.txt */
export function formatPrixTexte(n: number): string {
  return formatPrix(n).replace(/\u00a0/g, " ");
}

export const MODES_PAIEMENT = ["Paiement à la livraison", "Orange Money", "MTN MoMo", "Moov Money", "Wave"];

/**
 * Moyens de paiement mobile affichés dans le pied de page (logos des opérateurs,
 * dans public/images/paiement/). `fond` = couleur de la pastille derrière le logo.
 */
export const MOYENS_MOBILE: { nom: string; logo: string; fond: string; l: number; h: number }[] = [
  { nom: "Orange Money", logo: "/images/paiement/orange.svg", fond: "#ffffff", l: 100, h: 100 },
  { nom: "MTN MoMo", logo: "/images/paiement/mtn.svg", fond: "#ffffff", l: 160, h: 80 },
  { nom: "Moov Money", logo: "/images/paiement/moov.png", fond: "#0b1b4d", l: 163, h: 100 },
  { nom: "Wave", logo: "/images/paiement/wave.png", fond: "#ffffff", l: 230, h: 101 },
];

/** Communes proposées dans le formulaire de commande */
export const COMMUNES = [
  /* Abidjan */
  "Cocody",
  "Plateau",
  "Marcory",
  "Treichville",
  "Koumassi",
  "Port-Bouët",
  "Yopougon",
  "Abobo",
  "Adjamé",
  "Attécoubé",
  "Bingerville",
  /* Autres villes de Côte d'Ivoire */
  "Yamoussoukro",
  "Bouaké",
  "San-Pédro",
  "Daloa",
  "Korhogo",
  "Man",
  "Abengourou",
  "Gagnoa",
  "Autre ville (à préciser dans l'adresse)",
];

export type EtapeMontage = { titre: string; phrase: string; image: string; alt: string };

/** Les 6 étapes du montage au défilement (2 par marque) */
export const ETAPES: EtapeMontage[] = [
  {
    titre: "Le carton de 5 ramettes",
    phrase: "Un carton robuste et scellé, aux couleurs Double A, livré intact jusqu'à votre porte.",
    image: "/images/etape-1.jpg",
    alt: "Carton fermé de 5 ramettes de papier Double A, cerclé d'une sangle blanche",
  },
  {
    titre: "Une ramette en sort, prête à l'emploi",
    phrase: "Ouvrez le carton : chaque ramette est emballée individuellement et protégée de l'humidité.",
    image: "/images/etape-2.jpg",
    alt: "Carton Double A ouvert avec une ramette Double A Premium qui en sort",
  },
  {
    titre: "Le carton Paper One",
    phrase: "Papier rame A4 Paper One 70 g/m², 500 feuilles par ramette, au carton ou par lot de 10 cartons.",
    image: "/images/paper-one-3.jpg",
    alt: "Carton de papier rame A4 Paper One 70 g/m²",
  },
  {
    titre: "Paper One, prêt pour l'impression",
    phrase: "Ramettes A4 de 210 × 297 mm pour imprimantes laser, jet d'encre et photocopieurs.",
    image: "/images/paper-one-2.jpg",
    alt: "Carton et ramettes de papier A4 Paper One, dont une ramette ouverte avec ses feuilles",
  },
  {
    titre: "Le carton Globulus Premium",
    phrase: "Papier rame A4 Globulus Premium 80 g/m², 500 feuilles par ramette, au carton ou par lot de 10 cartons.",
    image: "/images/globulus-3.jpg",
    alt: "Carton de papier rame A4 Globulus Premium 80 g/m²",
  },
  {
    titre: "Globulus : haute blancheur, grande polyvalence",
    phrase: "Une ramette A4 de 500 feuilles pour copie, laser, jet d'encre et impression du quotidien.",
    image: "/images/globulus-2.jpg",
    alt: "Carton et ramettes de papier A4 Globulus Premium, dont une ramette ouverte",
  },
];

/** Questions fréquentes (affichées dans la FAQ et dans les données structurées SEO) */
export const FAQ: { q: string; r: string }[] = [
  {
    q: "Que signifie le grammage 80 g/m²\u00a0?",
    r: "Le grammage indique le poids d'une feuille d'un mètre carré. 80 g/m² est le standard de bureau\u00a0: assez épais pour limiter la transparence en recto verso, assez souple pour bien passer dans les imprimantes laser et jet d'encre.",
  },
  {
    q: "Combien de feuilles contient une ramette\u00a0?",
    r: "Une ramette Double A Premium contient 500 feuilles A4. Un carton regroupe 5 ramettes, soit 2 500 feuilles.",
  },
  {
    q: "Ce papier est-il compatible avec mon imprimante\u00a0?",
    r: "Oui. Le Double A Premium A4 80 g convient aux imprimantes laser, jet d'encre et aux photocopieurs, y compris pour l'impression recto verso automatique.",
  },
  {
    q: "Livrez-vous en dehors d'Abidjan, et sous quel délai\u00a0?",
    r: "Oui, nous livrons partout en Côte d'Ivoire. Les commandes confirmées sont livrées en 24 à 72 heures. Les frais de livraison sont confirmés à la commande sur WhatsApp selon votre ville.",
  },
  {
    q: "Proposez-vous des tarifs pour l'achat en gros\u00a0?",
    r: `Oui, à partir de ${SEUIL_GROS} cartons, nous appliquons un tarif dégressif pour les écoles, entreprises, imprimeries et revendeurs. Demandez un devis sur WhatsApp.`,
  },
  {
    q: "Quelle est la différence entre une ramette et un carton de papier A4\u00a0?",
    r: "Une ramette (ou rame) contient 500 feuilles A4 sous emballage individuel. Un carton regroupe 5 ramettes, soit 2 500 feuilles. Le carton évite de se réapprovisionner souvent\u00a0: c'est le choix des bureaux, écoles, commerces et cybercafés.",
  },
  {
    q: "Le papier Double A 80g convient-il à l'impression recto verso\u00a0?",
    r: "Oui. Avec 80 g/m², le papier Double A Premium est assez épais pour limiter la transparence quand on imprime sur les deux faces, et il passe sans bourrage dans la plupart des imprimantes laser, jet d'encre et photocopieurs.",
  },
  {
    q: "Quel grammage de papier A4 choisir\u00a0: 70, 80 ou 90 g\u00a0?",
    r: "Le 80 g/m² est le standard de bureau\u00a0: bon rendu, bonne tenue et prix raisonnable pour l'impression courante. Le 70 g/m² est plus léger et plus économique pour les brouillons. Au-delà de 90 g/m², le papier est plus rigide, utile pour des documents de présentation. Nous proposons le papier A4 80 g Double A Premium.",
  },
  {
    q: "Comment commander mon papier rame en ligne\u00a0?",
    r: "Ajoutez la ramette ou le carton à votre panier, renseignez votre nom, votre téléphone, votre ville et votre adresse, puis envoyez la commande\u00a0: elle s'ouvre dans WhatsApp. Nous confirmons le prix de livraison et le créneau, puis nous livrons.",
  },
  {
    q: "Quels moyens de paiement acceptez-vous\u00a0?",
    r: "Vous pouvez payer à la livraison, ou par Mobile Money\u00a0: Orange Money, MTN MoMo, Moov Money ou Wave. Le mode de paiement est choisi au moment de la commande.",
  },
  {
    q: "Quelles marques de papier rame fournissez-vous\u00a0?",
    r: "Nous fournissons les marques Double A, Paper One, Globulus, Paper Pro, Authentik, Smart Copy, Ultima Copy, Roch, Aone, Aria, Royal Touch et Beifa, en ramette (Double A), au carton de 5 ramettes et par lot de 10 cartons. Les prix sont indiqués sur chaque fiche produit.",
  },
  {
    q: "Quelle est votre politique de retour\u00a0?",
    r: "Vous pouvez signaler un problème (produit abîmé ou non conforme à votre commande) et demander un retour dans un délai de 24 à 72 heures après la livraison. Contactez-nous sur WhatsApp avec une photo du produit : nous trouvons ensemble la solution.",
  },
  {
    q: "Quel est le délai de livraison\u00a0?",
    r: "La livraison se fait en 24 à 72 heures après confirmation de votre commande, à Abidjan comme dans le reste de la Côte d'Ivoire.",
  },
  {
    q: "Quelle marque de papier rame choisir : Double A, Paper One, Globulus, Paper Pro, Authentik, Smart Copy, Ultima Copy, Roch, Aone, Aria, Royal Touch ou Beifa\u00a0?",
    r: "Les marques proposées sont toutes en format A4 de 500 feuilles par ramette, avec 5 ramettes par carton. Double A, Globulus, Paper Pro, Authentik, Smart Copy, Roch, Aone, Aria, Royal Touch et Beifa font 80 g/m², Paper One 70 g/m² et Ultima Copy 75 g/m². Le comparatif des prix par carton est sur la page d'accueil. Pour l'impression recto verso, le 80 g/m² est conseillé.",
  },
  {
    q: "Quel est le prix d'un carton de papier A4 à Abidjan\u00a0?",
    r: "Le carton de 5 ramettes Double A est à 19\u00a0900 FCFA. Les cartons Paper One, Globulus, Authentik et Smart Copy sont à 13\u00a0500 FCFA, et ceux de Paper Pro, Ultima Copy, Roch, Aone, Aria, Royal Touch et Beifa à 12\u00a0500 FCFA. À partir de 10 cartons, le prix passe à 19\u00a0000 FCFA le carton en Double A, 13\u00a0000 FCFA pour Paper One, Globulus, Authentik et Smart Copy, et 12\u00a0000 FCFA pour Paper Pro, Ultima Copy, Roch, Aone, Aria, Royal Touch et Beifa.",
  },
  {
    q: "Livrez-vous à Bouaké, Yamoussoukro, San-Pédro ou Korhogo\u00a0?",
    r: "Oui, nous livrons dans toutes les villes de Côte d'Ivoire, notamment Bouaké, Yamoussoukro, San-Pédro, Daloa, Korhogo, Man, Abengourou et Gagnoa, en 24 à 72 heures après confirmation. Les frais sont confirmés à la commande sur WhatsApp.",
  },
  {
    q: "Vendez-vous du papier A4 pour les écoles et les entreprises\u00a0?",
    r: "Oui. Nous fournissons les écoles, universités, administrations, entreprises, cybercafés, imprimeries et revendeurs, avec facture sur demande et tarif dégressif à partir de 10 cartons.",
  },
  {
    q: "Combien de feuilles contient un carton de papier rame\u00a0?",
    r: "Un carton contient 5 ramettes de 500 feuilles A4, soit 2\u00a0500 feuilles. Un lot de 10 cartons représente 50 ramettes, soit 25\u00a0000 feuilles.",
  },
  {
    q: "Êtes-vous grossiste de papier rame à Abidjan\u00a0?",
    r: "Oui. Monpapierrame est grossiste de papier rame A4 Double A à Abidjan et livre partout en Côte d'Ivoire. Nous sommes fournisseur des grandes marques de papier rame : Double A, Paper One, Globulus, Paper Pro, Authentik, Smart Copy, Ultima Copy, Roch, Aone, Aria, Royal Touch et Beifa. Nous vendons à l'unité (ramette), au carton et en gros à partir de 10 cartons, aux écoles, entreprises, administrations, imprimeries et revendeurs.",
  },
  {
    q: "Pouvez-vous établir une facture\u00a0?",
    r: "Oui, une facture peut être établie sur demande, notamment pour les entreprises, les écoles, les administrations et les achats en gros. Précisez-le dans votre message WhatsApp.",
  },
  {
    q: "Quelles marques de papier rame A4 vendez-vous\u00a0?",
    r: "Nous vendons douze marques de papier rame A4\u00a0: Double A, Paper One, Globulus, Paper Pro, Authentik, Smart Copy, Ultima Copy, Roch, Aone, Aria, Royal Touch et Beifa. Chaque marque a sa page avec les prix, les photos et les conditions de livraison.",
  },
  {
    q: "Quel est le prix d'un carton de papier A4 Smart Copy\u00a0?",
    r: "Le carton de 5 ramettes Smart Copy (80 g/m², 2\u00a0500 feuilles) est à 13\u00a0500 FCFA, et à 13\u00a0000 FCFA le carton à partir de 10 cartons. Livraison Cocody, Yopougon, Bouaké et toute la CI.",
  },
  {
    q: "Quel papier A4 choisir pour un cybercafé ou un centre de photocopie\u00a0?",
    r: "Pour un fort volume, privilégiez un papier 80 g/m² en carton ou en lot de 10 cartons : il passe bien dans les photocopieurs et les imprimantes laser et limite les bourrages. Le tarif gros s'applique dès 10 cartons.",
  },
  {
    q: "Pouvez-vous livrer du papier A4 en urgence à Abidjan\u00a0?",
    r: "Les commandes confirmées sont livrées en 24 à 72 heures. Pour une urgence, écrivez-nous sur WhatsApp en indiquant votre commune et la quantité\u00a0: nous confirmons le créneau le plus rapide possible.",
  },
  {
    q: "Faites-vous des factures pour les entreprises et les administrations\u00a0?",
    r: "Oui, une facture peut être établie sur demande pour les entreprises, administrations, écoles et associations. Indiquez la raison sociale à la commande sur WhatsApp.",
  },
  {
    q: "Comment commander du papier rame A4 chez Monpapierrame\u00a0?",
    r: "Ajoutez vos produits au panier puis envoyez la commande sur WhatsApp, ou écrivez-nous directement. Nous confirmons le prix de livraison et le créneau, puis vous payez à la livraison ou par Orange Money, MTN MoMo, Moov Money ou Wave.",
  },
  {
    q: "Quel est le prix d'un paquet de rame de papier A4\u00a0?",
    r: "Un paquet de rame (ramette) de 500 feuilles A4 Double A 80 g est à 4\u00a0000 FCFA. Au carton de 5 ramettes, la ramette revient à environ 3\u00a0980 FCFA en Double A, 2\u00a0700 FCFA en Paper One, Globulus, Authentik et Smart Copy, et 2\u00a0500 FCFA en Paper Pro, Ultima Copy, Roch, Aone, Aria, Royal Touch et Beifa. Les prix de chaque produit sont sur sa fiche.",
  },
  {
    q: "Quel est le prix de la rame Double A à Abidjan\u00a0?",
    r: "La rame Double A Premium 80 g (500 feuilles A4) est à 4\u00a0000 FCFA à l'unité, 19\u00a0900 FCFA le carton de 5 rames, et 19\u00a0000 FCFA le carton à partir de 10 cartons. Livraison à Abidjan et partout en Côte d'Ivoire.",
  },
  {
    q: "Combien coûte une feuille A4 et combien de feuilles dans une rame\u00a0?",
    r: "Une rame contient 500 feuilles A4 (210 × 297 mm). Au prix de 4\u00a0000 FCFA la rame Double A, la feuille A4 revient à 8 FCFA. Au carton de 12\u00a0500 à 13\u00a0500 FCFA (2\u00a0500 feuilles), elle revient à 5 à 5,4 FCFA la feuille.",
  },
  {
    q: "Êtes-vous grossiste papier rame à Abidjan\u00a0?",
    r: "Oui. Monpapierrame est grossiste papier rame à Abidjan et livre partout en Côte d'Ivoire. Nous vendons à l'unité (Double A), au carton de 5 rames et en gros à partir de 10 cartons, avec facture sur demande, aux écoles, entreprises, administrations, cybercafés, imprimeries et revendeurs.",
  },
];

/**
 * SEO de la page d'accueil (limites recommandées par Google :
 * titre 60 caractères maximum, description 155 maximum).
 */
export const SEO_ACCUEIL = {
  titre: "Papier Rame A4 à Abidjan & en Côte d’Ivoire | Monpapierrame",
  description:
    "Grossiste papier rame à Abidjan : paquet de rame, rame Double A, feuille A4. Ramette dès {prix}, carton, gros. Livraison en Côte d'Ivoire.",
};

/** Grammage lu dans la fiche technique du produit (ex. « 80 g/m² ») */
export function grammage(p: Produit): string {
  return p.fiche.find(([k]) => k === "Grammage")?.[1] ?? "";
}

/** Marques proposées, dans l'ordre d'affichage */
export const MARQUES = ["Double A", "Paper One", "Globulus", "Paper Pro", "Authentik", "Smart Copy", "Ultima Copy", "Roch", "Aone", "Aria", "Royal Touch", "Beifa"];

/** Adresse de la page d'une marque : /marques/<slug> */
export function slugMarque(marque: string): string {
  return "papier-rame-" + marque.toLowerCase().replace(/\s+/g, "-");
}

export function trouverMarque(slug: string): string | undefined {
  return MARQUES.find((m) => slugMarque(m) === slug);
}

/** Titre et description Google de chaque page marque ({carton}, {gros}, {ramette} = prix formatés) */
export const SEO_MARQUES: Record<string, { titre: string; description: string }> = {
  "Double A": {
    titre: "Papier Rame Double A en Côte d'Ivoire, Prix | Monpapierrame",
    description: "Prix de la rame Double A 80g à Abidjan : ramette {ramette}, carton {carton}, gros dès 10 cartons. Livraison à Cocody, Yopougon et en Côte d'Ivoire.",
  },
  "Paper One": {
    titre: "Papier Rame Paper One 70g, Prix Carton | Monpapierrame",
    description: "Prix du papier rame Paper One 70g à Abidjan : carton {carton}, {gros} dès 10 cartons. Livraison à Cocody, Yopougon et partout en Côte d'Ivoire.",
  },
  Globulus: {
    titre: "Papier Rame Globulus 80g, Prix Carton | Monpapierrame",
    description: "Prix du papier rame Globulus 80g à Abidjan : carton {carton}, {gros} dès 10 cartons. Livraison à Cocody, Yopougon et partout en Côte d'Ivoire.",
  },
  "Paper Pro": {
    titre: "Papier Rame Paper Pro 80g, Prix Carton | Monpapierrame",
    description: "Prix du papier rame Paper Pro 80g à Abidjan : carton {carton}, {gros} dès 10 cartons. Livraison à Cocody, Yopougon et partout en Côte d'Ivoire.",
  },
  "Ultima Copy": {
    titre: "Papier Rame Ultima Copy 75g, Prix Carton | Monpapierrame",
    description: "Prix du papier rame Ultima Copy 75g à Abidjan : carton {carton}, {gros} dès 10 cartons. Livraison à Cocody, Yopougon et partout en Côte d'Ivoire.",
  },
  Beifa: {
    titre: "Papier Rame Beifa 80g, Prix Carton | Monpapierrame",
    description: "Prix du papier rame Beifa 80g à Abidjan : carton {carton}, {gros} dès 10 cartons. Livraison à Cocody, Yopougon et partout en Côte d'Ivoire.",
  },
  "Royal Touch": {
    titre: "Papier Rame Royal Touch 80g, Prix Carton | Monpapierrame",
    description: "Prix du papier rame Royal Touch 80g à Abidjan : carton {carton}, {gros} dès 10 cartons. Livraison à Cocody, Yopougon et partout en Côte d'Ivoire.",
  },
  Aone: {
    titre: "Papier Rame Aone 80g, Prix Carton | Monpapierrame",
    description: "Prix du papier rame Aone 80g à Abidjan : carton {carton}, {gros} dès 10 cartons. Livraison à Cocody, Yopougon et partout en Côte d'Ivoire.",
  },
  Aria: {
    titre: "Papier Rame Aria 80g, Prix Carton | Monpapierrame",
    description: "Prix du papier rame Aria 80g à Abidjan : carton {carton}, {gros} dès 10 cartons. Livraison à Cocody, Yopougon et partout en Côte d'Ivoire.",
  },
  Roch: {
    titre: "Papier Rame Roch 80g, Prix Carton | Monpapierrame",
    description: "Prix du papier rame Roch 80g à Abidjan : carton {carton}, {gros} dès 10 cartons. Livraison à Cocody, Yopougon et partout en Côte d'Ivoire.",
  },
  "Smart Copy": {
    titre: "Papier Rame Smart Copy 80g, Prix Carton | Monpapierrame",
    description: "Prix du papier rame Smart Copy 80g à Abidjan : carton {carton}, {gros} dès 10 cartons. Livraison à Cocody, Yopougon et partout en Côte d'Ivoire.",
  },
  Authentik: {
    titre: "Papier Rame Authentik 80g, Prix Carton | Monpapierrame",
    description: "Prix du papier rame Authentik 80g à Abidjan : carton {carton}, {gros} dès 10 cartons. Livraison à Cocody, Yopougon et partout en Côte d'Ivoire.",
  },
};

/** Contenu éditorial supplémentaire des pages marques (texte unique pour Google), avec les prix réels */
export type PrixMarque = { carton: string; gros: string; ramette: string; g: string };
export type ContenuMarque = { h1: string; intro: string[]; atouts: [string, string][]; faq: { q: string; r: string }[] };

const V0 = "Cocody, Yopougon, Marcory, Abobo, Koumassi, Plateau, Bouaké, San-Pédro et toute la Côte d'Ivoire";

export const CONTENU_MARQUES: Record<string, (x: PrixMarque) => ContenuMarque> = {
  "Double A": (x) => ({
    h1: "Papier rame Double A en Côte d'Ivoire : prix ramette, carton et gros",
    intro: [
      `Double A est l'une des marques de papier rame A4 les plus demandées pour le bureau, l'école et la photocopie. Chez ${SITE.nom}, vous trouvez le papier Double A ${x.g} à Abidjan en trois formats : la ramette de 500 feuilles à ${x.ramette}, le carton de 5 ramettes (2 500 feuilles) à ${x.carton}, et le carton en gros à ${x.gros} dès ${SEUIL_GROS} cartons.`,
      "La rame Double A (le paquet de 500 feuilles A4) est notre produit le plus demandé : feuille A4 80 g/m² à l'unité, au carton de 5 rames ou en gros dès 10 cartons, livrée à Abidjan et partout en Côte d'Ivoire.",
      "Le papier Double A se distingue par sa blancheur régulière et sa bonne tenue dans les imprimantes laser, jet d'encre et les photocopieurs, y compris en impression recto verso. Chaque ramette est emballée individuellement pour rester sèche et lisse.",
    ],
    atouts: [
      ["Ramette, carton ou gros", "Seule marque proposée à l'unité : achetez une ramette pour tester ou un carton pour vos besoins courants."],
      ["Idéal recto verso", "Le 80 g/m² limite la transparence et se manipule bien dans les imprimantes à impression automatique."],
      ["Fiable pour la photocopie", "Un papier régulier, qui passe sans bourrage dans les photocopieurs des cybercafés et des bureaux."],
      ["Livré partout", "Cocody, Plateau, Marcory, Yopougon, Abobo, Koumassi, Bouaké, San-Pédro et toute la Côte d'Ivoire."],
    ],
    faq: [
      { q: "Quel est le prix d'une ramette de papier Double A à Abidjan ?", r: `La ramette de 500 feuilles A4 Double A ${x.g} est à ${x.ramette}. Le carton de 5 ramettes est à ${x.carton}, et le carton revient à ${x.gros} à partir de ${SEUIL_GROS} cartons.` },
      { q: "Quel est le prix de la rame Double A ?", r: `La rame Double A (paquet de 500 feuilles A4) est à ${x.ramette}. Au carton de 5 rames : ${x.carton}. Dès ${SEUIL_GROS} cartons : ${x.gros} le carton.` },
      { q: "Où acheter du papier Double A en Côte d'Ivoire ?", r: `Chez ${SITE.nom}, grossiste de papier rame A4 à Abidjan. Nous livrons le papier Double A à Cocody, Yopougon, Marcory, Abobo, Koumassi, Bouaké, Yamoussoukro, San-Pédro et dans toutes les villes de Côte d'Ivoire.` },
      { q: "Le papier Double A convient-il à toutes les imprimantes ?", r: "Oui. Il est adapté aux imprimantes laser et jet d'encre ainsi qu'aux photocopieurs, avec un bon rendu en recto verso." },
      { q: "Quelle différence entre Double A et les autres marques ?", r: "Double A est le seul papier vendu à la ramette chez nous, en plus du carton et du gros. Les autres marques sont proposées au carton et par lot de 10 cartons, à un prix plus bas." },
    ],
  }),
  "Ultima Copy": (x) => ({
    h1: "Papier rame Ultima Copy 75g en Côte d'Ivoire : prix carton et gros",
    intro: [
      `Le papier rame A4 Ultima Copy ${x.g} est un papier blanc multi-usage pour imprimer et photocopier au quotidien. ${SITE.nom} le livre à Abidjan et dans toute la Côte d'Ivoire : le carton de 5 ramettes (2 500 feuilles) à ${x.carton}, et ${x.gros} le carton à partir de ${SEUIL_GROS} cartons.`,
      "Reconnaissable à son emballage jaune et bleu, le carton Ultima Copy contient 5 ramettes de 500 feuilles A4 (210 × 297 mm), pour imprimantes laser, jet d'encre et photocopieurs, avec un prix de gros parmi les plus bas de notre gamme.",
    ],
    atouts: [
      ["Prix de gros très bas", `${x.carton} le carton, puis ${x.gros} le carton dès ${SEUIL_GROS} cartons.`],
      ["75 g/m² économique", "Un grammage léger, adapté aux copies, impressions courantes et documents internes."],
      ["Multi-usage", "Pour l'impression rapide et la photocopie à fort volume : bureaux, écoles, cybercafés."],
      ["Livraison partout", `${V0}.`],
    ],
    faq: [
      { q: "Quel est le prix du carton de papier Ultima Copy ?", r: `Le carton de 5 ramettes de papier A4 Ultima Copy ${x.g} est à ${x.carton}. À partir de ${SEUIL_GROS} cartons, le prix est de ${x.gros} le carton.` },
      { q: "Où acheter du papier Ultima Copy à Abidjan ?", r: `Chez ${SITE.nom}. Commande en ligne ou sur WhatsApp, livraison à Cocody, Yopougon, Marcory, Abobo, Bouaké et dans toute la Côte d'Ivoire.` },
      { q: "Le papier Ultima Copy 75g convient-il à l'impression recto verso ?", r: "Il convient aux documents courants. Pour le recto verso sur des documents importants, un papier 80 g/m² est un peu plus opaque." },
      { q: "Combien de feuilles dans un carton Ultima Copy ?", r: "Un carton contient 5 ramettes de 500 feuilles, soit 2 500 feuilles A4. Le lot de 10 cartons représente 25 000 feuilles." },
    ],
  }),
  Beifa: (x) => ({
    h1: "Papier rame Beifa 80g en Côte d'Ivoire : prix carton et gros",
    intro: [
      `Le papier rame A4 Beifa ${x.g} est un papier multi-usage (Multi-Purpose Paper) pour la copie et l'impression de bureau. ${SITE.nom} le livre à Abidjan et dans toute la Côte d'Ivoire : le carton de 5 ramettes (2 500 feuilles) à ${x.carton}, et ${x.gros} le carton dès ${SEUIL_GROS} cartons.`,
      "Reconnaissable à son emballage rouge et blanc, le carton Beifa contient 5 ramettes de 500 feuilles A4 (210 × 297 mm), pour imprimantes laser, jet d'encre et photocopieurs.",
    ],
    atouts: [
      ["Multi-usage 80 g/m²", "Un papier de copie polyvalent pour le bureau, l'école et les cybercafés."],
      ["Prix de gros", `${x.carton} le carton de 5 ramettes, soit 2 500 feuilles.`],
      ["Tarif dès 10 cartons", `${x.gros} le carton à partir de ${SEUIL_GROS} cartons, avec facture sur demande.`],
      ["Livraison partout", `${V0}.`],
    ],
    faq: [
      { q: "Quel est le prix du carton de papier Beifa ?", r: `Le carton de 5 ramettes de papier A4 Beifa ${x.g} est à ${x.carton}. À partir de ${SEUIL_GROS} cartons, le prix est de ${x.gros} le carton.` },
      { q: "Où acheter du papier Beifa à Abidjan ?", r: `Chez ${SITE.nom}. Commande en ligne ou sur WhatsApp, livraison à Cocody, Yopougon, Marcory, Abobo et partout en Côte d'Ivoire.` },
      { q: "Le papier Beifa convient-il à l'impression recto verso ?", r: "Oui, le 80 g/m² limite la transparence en recto verso et convient aux imprimantes laser et jet d'encre." },
      { q: "Combien de feuilles dans un carton Beifa ?", r: "Un carton regroupe 5 ramettes de 500 feuilles, soit 2 500 feuilles A4. Un lot de 10 cartons fait 25 000 feuilles." },
    ],
  }),
  "Royal Touch": (x) => ({
    h1: "Papier rame Royal Touch 80g en Côte d'Ivoire : prix carton et gros",
    intro: [
      `Le papier rame A4 Royal Touch ${x.g} est un papier de copie à la surface lisse, pensé pour une impression nette. ${SITE.nom} le livre à Abidjan et dans toute la Côte d'Ivoire : le carton de 5 ramettes (2 500 feuilles) à ${x.carton}, et ${x.gros} le carton dès ${SEUIL_GROS} cartons.`,
      "Reconnaissable à son emballage blanc, violet et orange, le carton Royal Touch contient 5 ramettes de 500 feuilles A4 (210 × 297 mm), pour imprimantes laser, jet d'encre et photocopieurs.",
    ],
    atouts: [
      ["Surface lisse, impression nette", "Un papier 80 g/m² qui donne des textes et des images bien contrastés."],
      ["Prix de gros", `${x.carton} le carton de 5 ramettes, soit 2 500 feuilles.`],
      ["Tarif dès 10 cartons", `${x.gros} le carton à partir de ${SEUIL_GROS} cartons, avec facture sur demande.`],
      ["Livraison partout", `${V0}.`],
    ],
    faq: [
      { q: "Quel est le prix du carton de papier Royal Touch ?", r: `Le carton de 5 ramettes de papier A4 Royal Touch ${x.g} est à ${x.carton}. À partir de ${SEUIL_GROS} cartons, le prix est de ${x.gros} le carton.` },
      { q: "Où acheter du papier Royal Touch à Abidjan ?", r: `Chez ${SITE.nom}. Commande en ligne ou sur WhatsApp, livraison à Cocody, Yopougon, Marcory, Abobo et partout en Côte d'Ivoire.` },
      { q: "Le papier Royal Touch convient-il à l'impression recto verso ?", r: "Oui, le 80 g/m² limite la transparence en recto verso et convient aux imprimantes laser et jet d'encre." },
      { q: "Combien de feuilles dans un carton Royal Touch ?", r: "Un carton regroupe 5 ramettes de 500 feuilles, soit 2 500 feuilles A4. Un lot de 10 cartons fait 25 000 feuilles." },
    ],
  }),
  Aone: (x) => ({
    h1: "Papier rame Aone 80g en Côte d'Ivoire : prix carton et gros",
    intro: [
      `Le papier rame A4 Aone ${x.g} est un papier multi-usage pour la copie, l'impression laser et jet d'encre. ${SITE.nom} le livre à Abidjan et dans toute la Côte d'Ivoire : le carton de 5 ramettes (2 500 feuilles) à ${x.carton}, et ${x.gros} le carton à partir de ${SEUIL_GROS} cartons.`,
      "Le carton Aone, à l'emballage rouge et orange, contient 5 ramettes de 500 feuilles A4 (210 × 297 mm), pour les bureaux, écoles, administrations, cybercafés et imprimeries.",
    ],
    atouts: [
      ["80 g/m² à prix de gros", `${x.carton} le carton de 5 ramettes, soit 2 500 feuilles.`],
      ["Copie, impression, laser", "Un papier multi-usage pour photocopieurs et imprimantes du quotidien."],
      ["Tarif dès 10 cartons", `${x.gros} le carton à partir de ${SEUIL_GROS} cartons, avec facture sur demande.`],
      ["Livraison partout", `${V0}.`],
    ],
    faq: [
      { q: "Quel est le prix du papier rame Aone ?", r: `Le carton de 5 ramettes de papier A4 Aone ${x.g} est à ${x.carton}. À partir de ${SEUIL_GROS} cartons, le prix est de ${x.gros} le carton.` },
      { q: "Où acheter du papier Aone à Abidjan ?", r: `Chez ${SITE.nom}. Commande en ligne ou sur WhatsApp, livraison à Cocody, Yopougon, Marcory, Abobo et partout en Côte d'Ivoire.` },
      { q: "Le papier Aone convient-il à l'impression recto verso ?", r: "Oui, le 80 g/m² limite la transparence en recto verso et convient aux imprimantes laser et jet d'encre." },
      { q: "Combien de feuilles dans un carton Aone ?", r: "Un carton regroupe 5 ramettes de 500 feuilles, soit 2 500 feuilles A4. Un lot de 10 cartons fait 25 000 feuilles." },
    ],
  }),
  Aria: (x) => ({
    h1: "Papier rame Aria 80g en Côte d'Ivoire : prix carton et gros",
    intro: [
      `Le papier rame A4 Aria ${x.g} est un papier de copie blanc, apprécié pour le bureau et l'école. ${SITE.nom} le propose à Abidjan et dans toute la Côte d'Ivoire : le carton de 5 ramettes (2 500 feuilles) à ${x.carton}, et ${x.gros} le carton dès ${SEUIL_GROS} cartons.`,
      "Reconnaissable à son emballage bleu et jaune, le carton Aria contient 5 ramettes de 500 feuilles A4 (210 × 297 mm), compatibles avec les imprimantes laser, jet d'encre et les photocopieurs.",
    ],
    atouts: [
      ["Papier blanc 80 g/m²", `${x.carton} le carton de 5 ramettes, soit 2 500 feuilles de 80 g/m².`],
      ["Pour tous les usages", "Impression, copie et documents du quotidien, au bureau comme à l'école."],
      ["Gros dès 10 cartons", `${x.gros} le carton à partir de ${SEUIL_GROS} cartons, facture sur demande.`],
      ["Livraison partout", `${V0}.`],
    ],
    faq: [
      { q: "Quel est le prix du carton de papier Aria ?", r: `Le carton de 5 ramettes de papier A4 Aria ${x.g} est à ${x.carton}. À partir de ${SEUIL_GROS} cartons, le prix est de ${x.gros} le carton.` },
      { q: "Où acheter du papier rame Aria à Abidjan ?", r: `Chez ${SITE.nom}. Commande en ligne ou sur WhatsApp, livraison à Cocody, Yopougon, Marcory, Abobo, Bouaké et dans toute la Côte d'Ivoire.` },
      { q: "Le papier Aria est-il adapté aux photocopieurs ?", r: "Oui, c'est un papier A4 de 80 g/m² pour photocopieurs, imprimantes laser et jet d'encre." },
      { q: "Combien de feuilles dans un carton Aria ?", r: "Un carton contient 5 ramettes de 500 feuilles, soit 2 500 feuilles A4. Le lot de 10 cartons représente 25 000 feuilles." },
    ],
  }),
  Roch: (x) => ({
    h1: "Papier rame Roch 80g en Côte d'Ivoire : prix carton et gros",
    intro: [
      `Le papier rame A4 Roch ${x.g} est un papier de copie multi-usage pour le bureau, l'école et l'impression à fort volume. ${SITE.nom} le propose à Abidjan et dans toute la Côte d'Ivoire : le carton de 5 ramettes (2 500 feuilles) à ${x.carton}, et ${x.gros} le carton à partir de ${SEUIL_GROS} cartons.`,
      "Le carton Roch, à l'emballage bleu, contient 5 ramettes de 500 feuilles A4 (210 × 297 mm), compatibles avec les imprimantes laser, jet d'encre et les photocopieurs.",
    ],
    atouts: [
      ["80 g/m² à petit prix", `${x.carton} le carton de 5 ramettes, soit 2 500 feuilles de 80 g/m².`],
      ["Copie et impression", "Pour imprimantes laser, jet d'encre et photocopieurs, au bureau comme à l'école."],
      ["Tarif gros dès 10 cartons", `${x.gros} le carton à partir de ${SEUIL_GROS} cartons, avec facture sur demande.`],
      ["Livraison partout", `${V0}.`],
    ],
    faq: [
      { q: "Quel est le prix du papier rame Roch ?", r: `Le carton de 5 ramettes de papier A4 Roch ${x.g} est à ${x.carton}. À partir de ${SEUIL_GROS} cartons, le prix est de ${x.gros} le carton.` },
      { q: "Où acheter du papier Roch à Abidjan ?", r: `Chez ${SITE.nom}. Commande en ligne ou sur WhatsApp, livraison à Cocody, Yopougon, Marcory, Abobo et partout en Côte d'Ivoire.` },
      { q: "Le papier Roch est-il bon pour l'impression recto verso ?", r: "Oui, le 80 g/m² est assez épais pour limiter la transparence en recto verso et convient aux imprimantes laser et jet d'encre." },
      { q: "Combien de feuilles dans un carton Roch ?", r: "Un carton regroupe 5 ramettes de 500 feuilles, soit 2 500 feuilles A4. Un lot de 10 cartons fait 25 000 feuilles." },
    ],
  }),
  Authentik: (x) => ({
    h1: "Papier rame Authentik en Côte d'Ivoire : prix carton et gros",
    intro: [
      `Le papier rame A4 Authentik ${x.g} est une solution économique pour imprimer et photocopier au quotidien. ${SITE.nom} le propose à Abidjan et dans toute la Côte d'Ivoire : le carton de 5 ramettes (2 500 feuilles) à ${x.carton}, et ${x.gros} le carton à partir de ${SEUIL_GROS} cartons.`,
      "Avec 500 feuilles par ramette au format A4 (210 × 297 mm), le papier Authentik convient aux bureaux, écoles, administrations, cybercafés et centres de photocopie qui cherchent un papier de qualité à un prix de gros intéressant.",
    ],
    atouts: [
      ["Prix de gros intéressant", `Carton à ${x.carton}, puis ${x.gros} le carton dès ${SEUIL_GROS} cartons, facture sur demande.`],
      ["80 g/m² polyvalent", "Un grammage standard pour les documents courants, les polycopiés et le recto verso."],
      ["Pour gros volumes", "Pensé pour les cybercafés, écoles et entreprises qui consomment beaucoup de papier."],
      ["Livraison en 24 à 72 h", "À Abidjan et dans toute la Côte d'Ivoire, avec paiement à la livraison ou Mobile Money."],
    ],
    faq: [
      { q: "Quel est le prix du carton de papier Authentik ?", r: `Le carton de 5 ramettes de papier A4 Authentik ${x.g} est à ${x.carton}. À partir de ${SEUIL_GROS} cartons, le prix est de ${x.gros} le carton.` },
      { q: "Où acheter du papier rame Authentik à Abidjan ?", r: `Chez ${SITE.nom}. Commandez en ligne ou sur WhatsApp : nous livrons à Cocody, Yopougon, Marcory, Abobo, Koumassi, Plateau et dans toute la Côte d'Ivoire.` },
      { q: "Le papier Authentik est-il adapté à la photocopie et à l'impression ?", r: "Oui. Le papier A4 Authentik de 80 g/m² s'utilise sur les imprimantes laser, jet d'encre et les photocopieurs pour les documents du quotidien." },
      { q: "Combien de feuilles dans un carton Authentik ?", r: "Un carton contient 5 ramettes de 500 feuilles, soit 2 500 feuilles A4. Un lot de 10 cartons représente 25 000 feuilles." },
    ],
  }),
  "Paper One": (x) => ({
    h1: "Papier rame Paper One 70g en Côte d'Ivoire : prix carton et gros",
    intro: [
      `Le papier rame A4 Paper One ${x.g} est le choix économique pour les impressions courantes. ${SITE.nom} le livre à Abidjan et partout en Côte d'Ivoire : carton de 5 ramettes (2 500 feuilles) à ${x.carton}, et ${x.gros} le carton à partir de ${SEUIL_GROS} cartons.`,
      "Plus léger que le 80 g/m², le papier Paper One 70 g convient aux brouillons, copies internes, circulaires, exercices et documents de travail. Chaque ramette contient 500 feuilles A4 (210 × 297 mm).",
    ],
    atouts: [
      ["Le plus économique pour le volume", `Un grammage de 70 g/m² adapté aux impressions du quotidien, au prix de ${x.carton} le carton.`],
      ["Parfait pour les copies", `Idéal pour les polycopiés, brouillons, photocopies et documents internes.`],
      ["Tarif gros dès 10 cartons", `${x.gros} le carton à partir de ${SEUIL_GROS} cartons, facture sur demande.`],
      ["Livraison rapide", `Livré à Cocody, Yopougon, Marcory, Abobo, Koumassi, Plateau, Bouaké, San-Pédro et toute la Côte d'Ivoire.`],
    ],
    faq: [
      { q: "Quel est le prix du carton de papier Paper One ?", r: `Le carton de 5 ramettes de papier A4 Paper One ${x.g} est à ${x.carton}. À partir de ${SEUIL_GROS} cartons, il passe à ${x.gros} le carton.` },
      { q: "Le papier Paper One 70g est-il adapté à l'impression recto verso ?", r: `Il convient aux documents courants. Pour le recto verso sur des documents importants ou des textes denses, un papier 80 g/m² (Double A, Globulus, Paper Pro, Authentik, Smart Copy, Ultima Copy, Roch, Aone, Aria, Royal Touch, Beifa) est plus opaque.` },
      { q: "Où acheter du papier rame Paper One à Abidjan ?", r: `Chez ${SITE.nom}, grossiste de papier rame A4. Commande en ligne ou sur WhatsApp, livraison à Cocody, Yopougon, Marcory, Abobo et dans toute la Côte d'Ivoire.` },
      { q: "Quelle différence entre Paper One 70g et un papier 80g ?", r: `Le 70 g/m² est plus léger et plus économique, idéal pour les brouillons et copies. Le 80 g/m² est plus rigide et plus opaque, préféré pour les documents officiels et le recto verso.` },
    ],
  }),
  Globulus: (x) => ({
    h1: "Papier rame Globulus 80g en Côte d'Ivoire : prix carton et gros",
    intro: [
      `Le papier rame A4 Globulus ${x.g} est un papier polyvalent pour l'impression, la copie et le travail de bureau. ${SITE.nom} le propose à Abidjan et dans toute la Côte d'Ivoire : le carton de 5 ramettes (2 500 feuilles) à ${x.carton}, et ${x.gros} le carton dès ${SEUIL_GROS} cartons.`,
      "Chaque ramette Globulus contient 500 feuilles A4 de 210 × 297 mm. Il s'utilise sur les imprimantes laser, jet d'encre et les photocopieurs, pour les entreprises, écoles, administrations, cybercafés et particuliers.",
    ],
    atouts: [
      ["Polyvalent et blanc", `Un papier 80 g/m² pour l'impression et la copie du quotidien.`],
      ["Prix carton avantageux", `${x.carton} le carton de 5 ramettes, soit 2 500 feuilles.`],
      ["Gros dès 10 cartons", `${x.gros} le carton à partir de ${SEUIL_GROS} cartons, avec facture.`],
      ["Livraison partout", `Cocody, Yopougon, Marcory, Abobo, Koumassi, Plateau, Bouaké, San-Pédro et toute la Côte d'Ivoire.`],
    ],
    faq: [
      { q: "Quel est le prix du carton de papier Globulus à Abidjan ?", r: `Le carton de 5 ramettes de papier A4 Globulus ${x.g} est à ${x.carton}. Dès ${SEUIL_GROS} cartons, le prix est de ${x.gros} le carton.` },
      { q: "Le papier Globulus est-il bon pour l'impression recto verso ?", r: `Oui, le 80 g/m² est assez épais pour limiter la transparence en recto verso et passe dans les imprimantes laser et jet d'encre.` },
      { q: "Où acheter du papier rame Globulus en Côte d'Ivoire ?", r: `Chez ${SITE.nom}. Commandez en ligne ou sur WhatsApp, livraison à Cocody, Yopougon, Marcory, Abobo, Bouaké et partout en Côte d'Ivoire.` },
      { q: "Combien de feuilles dans un carton Globulus ?", r: `Un carton regroupe 5 ramettes de 500 feuilles, soit 2 500 feuilles A4. Un lot de 10 cartons fait 25 000 feuilles.` },
    ],
  }),
  "Paper Pro": (x) => ({
    h1: "Papier rame Paper Pro 80g en Côte d'Ivoire : prix carton et gros",
    intro: [
      `Le papier rame A4 Paper Pro ${x.g} s'adresse aux professionnels qui impriment beaucoup : bureaux, cabinets, administrations, écoles et imprimeries. ${SITE.nom} le livre à Abidjan et en Côte d'Ivoire : carton de 5 ramettes (2 500 feuilles) à ${x.carton}, ${x.gros} le carton dès ${SEUIL_GROS} cartons.`,
      "Format A4 (210 × 297 mm), 500 feuilles par ramette, compatible avec les imprimantes laser, jet d'encre et les photocopieurs. Une facture est établie sur demande pour les entreprises et les administrations.",
    ],
    atouts: [
      ["Pensé pour les pros", `Un papier 80 g/m² pour les documents d'entreprise : devis, factures, rapports, contrats.`],
      ["Facture sur demande", `Idéal pour les achats d'entreprises, administrations et associations.`],
      ["Tarif dégressif", `${x.carton} le carton, puis ${x.gros} le carton à partir de ${SEUIL_GROS} cartons.`],
      ["Livraison planifiée", `Cocody, Yopougon, Marcory, Abobo, Koumassi, Plateau, Bouaké, San-Pédro et toute la Côte d'Ivoire, avec livraison planifiée pour les achats réguliers.`],
    ],
    faq: [
      { q: "Quel est le prix du papier rame Paper Pro ?", r: `Le carton de 5 ramettes de papier A4 Paper Pro ${x.g} est à ${x.carton}. À partir de ${SEUIL_GROS} cartons, le prix est de ${x.gros} le carton.` },
      { q: "Peut-on obtenir une facture pour du papier Paper Pro ?", r: `Oui, une facture peut être établie sur demande pour les entreprises, administrations, écoles et associations. Indiquez la raison sociale à la commande.` },
      { q: "Où acheter du papier rame Paper Pro à Abidjan ?", r: `Chez ${SITE.nom}, grossiste de papier rame A4. Commande en ligne ou sur WhatsApp, livraison à Cocody, Yopougon, Marcory, Abobo et partout en Côte d'Ivoire.` },
      { q: "Le Paper Pro convient-il aux gros volumes d'impression ?", r: `Oui. Le carton de 2 500 feuilles et le lot de 10 cartons (25 000 feuilles) sont adaptés aux bureaux, écoles et imprimeries à fort volume.` },
    ],
  }),
  "Smart Copy": (x) => ({
    h1: "Papier rame Smart Copy 80g en Côte d'Ivoire : prix carton et gros",
    intro: [
      `Smart Copy est un papier rame A4 laser et copieur de ${x.g}, livré par ${SITE.nom} à Abidjan et dans toute la Côte d'Ivoire. Le carton de 5 ramettes (2 500 feuilles) est à ${x.carton}, et à ${x.gros} le carton dès ${SEUIL_GROS} cartons.`,
      "Le carton Smart Copy est reconnaissable à son emballage rouge. Il contient 5 ramettes de 500 feuilles A4 (210 × 297 mm), pour imprimantes laser, jet d'encre et photocopieurs.",
    ],
    atouts: [
      ["Laser et copieur", `Un papier A4 80 g/m² conçu pour l'impression laser et la photocopie.`],
      ["Emballage rouge reconnaissable", `Cartons Smart Copy livrés scellés, ramettes emballées individuellement.`],
      ["Prix de gros", `${x.carton} le carton, puis ${x.gros} le carton à partir de ${SEUIL_GROS} cartons.`],
      ["Livraison partout", `Cocody, Yopougon, Marcory, Abobo, Koumassi, Plateau, Bouaké, San-Pédro et toute la Côte d'Ivoire.`],
    ],
    faq: [
      { q: "Quel est le prix du carton de papier Smart Copy ?", r: `Le carton de 5 ramettes de papier A4 Smart Copy ${x.g} est à ${x.carton}. À partir de ${SEUIL_GROS} cartons, le prix est de ${x.gros} le carton.` },
      { q: "Où acheter du papier Smart Copy à Abidjan ?", r: `Chez ${SITE.nom}. Commande en ligne ou sur WhatsApp, livraison à Cocody, Yopougon, Marcory, Abobo, Bouaké et dans toute la Côte d'Ivoire.` },
      { q: "Le papier Smart Copy convient-il aux photocopieurs ?", r: `Oui, c'est un papier laser et copieur A4 de 80 g/m², adapté aussi aux imprimantes jet d'encre.` },
      { q: "Combien de feuilles dans un carton Smart Copy ?", r: `Un carton contient 5 ramettes de 500 feuilles, soit 2 500 feuilles A4. Le lot de 10 cartons représente 25 000 feuilles.` },
    ],
  }),
};

/** Produits d'une marque */
export function produitsMarque(marque: string): Produit[] {
  return PRODUITS.filter((p) => p.marque === marque);
}

/** Remplace {carton}, {gros} et {ramette} par les prix réels de la marque */
export function metaMarque(marque: string, champ: "titre" | "description"): string {
  const ps = produitsMarque(marque);
  const prix = (id: (p: Produit) => boolean) => {
    const p = ps.find(id);
    return p && p.prix !== null ? formatPrixTexte(p.prix) : "sur demande";
  };
  return SEO_MARQUES[marque][champ]
    .replace("{ramette}", prix((p) => p.id === "ramette"))
    .replace("{carton}", prix((p) => p.minQty === 1 && p.id.endsWith("carton")))
    .replace("{gros}", prix((p) => p.minQty > 1));
}

/** Questions-réponses d'une page produit (visibles sur la page et déclarées pour Google) */
export function faqProduit(p: Produit): { q: string; r: string }[] {
  const g = grammage(p);
  const lot = p.minQty > 1;
  const prix = p.prix === null ? "sur demande" : formatPrixTexte(p.prix);
  return [
    {
      q: `Quel est le prix du ${lot ? "lot de 10 cartons" : "carton"} de papier A4 ${p.marque} ?`,
      r: `Le prix est de ${prix} ${p.unite}${lot ? `, à partir de ${SEUIL_GROS} cartons` : ""}. Les frais de livraison sont confirmés à la commande sur WhatsApp selon votre ville.`,
    },
    {
      q: `Quel est le grammage du papier ${p.marque} ?`,
      r: `Le papier A4 ${p.marque} proposé ici fait ${g}, au format A4 (210 × 297 mm), avec 500 feuilles par ramette.`,
    },
    {
      q: "Livrez-vous partout en Côte d'Ivoire ?",
      r: `Oui, nous livrons à Abidjan et dans toute la Côte d'Ivoire, en ${SITE.delaiLivraison} après confirmation de la commande.`,
    },
    {
      q: "Puis-je retourner ma commande ?",
      r: `Oui, un retour est possible ${SITE.delaiRetour}. Contactez-nous sur WhatsApp avec une photo du produit.`,
    },
    {
      q: "Comment payer ?",
      r: "À la livraison, ou par Orange Money, MTN MoMo, Moov Money ou Wave.",
    },
  ];
}


/** Catégories de papier rame par format. Les formats « sur demande » n'ont pas de produit en ligne : prix et disponibilité sont confirmés sur WhatsApp. */
export type Categorie = {
  slug: string;
  format: string;
  nom: string;
  dimensions: string;
  surDemande: boolean;
  titre: string;
  description: string;
  intro: string;
  usages: string[];
  faq: { q: string; r: string }[];
};

export const CATEGORIES: Categorie[] = [
  {
    slug: "papier-rame-a4",
    format: "A4",
    nom: "Papier rame A4",
    dimensions: "210 × 297 mm",
    surDemande: false,
    titre: "Papier Rame A4 Abidjan : Toutes les Marques | Monpapierrame",
    description: "Papier rame A4 à Abidjan : ramette 500 feuilles, carton, gros. Double A, Paper One, Globulus, Roch, Aone… Prix et livraison en Côte d'Ivoire.",
    intro: "Le format A4 (210 × 297 mm) est le format standard du bureau, de l'école et de la photocopie. Retrouvez toutes nos marques de papier rame A4, de 70 à 80 g/m², à l'unité, au carton de 5 rames et en gros dès 10 cartons.",
    usages: ["Bureaux et entreprises", "Écoles et universités", "Cybercafés et photocopie", "Administrations et imprimeries"],
    faq: [
      { q: "Quelle est la taille d'une feuille A4 ?", r: "Une feuille A4 mesure 210 × 297 mm. Une rame contient 500 feuilles." },
      { q: "Où acheter du papier rame A4 à Abidjan ?", r: "Chez Monpapierrame, grossiste papier rame à Abidjan, avec livraison partout en Côte d'Ivoire." },
    ],
  },
  {
    slug: "papier-rame-a3",
    format: "A3",
    nom: "Papier rame A3",
    dimensions: "297 × 420 mm",
    surDemande: true,
    titre: "Papier Rame A3 à Abidjan : Prix sur Demande | Monpapierrame",
    description: "Papier rame A3 (297 × 420 mm) à Abidjan : demandez le prix et la disponibilité sur WhatsApp. Livraison partout en Côte d'Ivoire.",
    intro: "Le format A3 (297 × 420 mm) mesure le double d'une feuille A4. Il sert aux plans, affiches, tableaux, présentations et documents techniques. Demandez le prix et la disponibilité du papier rame A3 sur WhatsApp : nous vous répondons avec les marques et les quantités possibles.",
    usages: ["Plans et dessins techniques", "Affiches et présentations", "Tableaux et graphiques", "Cabinets d'architecture et bureaux d'études"],
    faq: [
      { q: "Quelle est la taille d'une feuille A3 ?", r: "Une feuille A3 mesure 297 × 420 mm, soit deux feuilles A4 côte à côte." },
      { q: "Comment obtenir le prix du papier rame A3 ?", r: "Écrivez-nous sur WhatsApp avec la quantité souhaitée et votre commune : nous confirmons le prix, la disponibilité et la livraison." },
    ],
  },
  {
    slug: "papier-rame-a5",
    format: "A5",
    nom: "Papier rame A5",
    dimensions: "148 × 210 mm",
    surDemande: true,
    titre: "Papier Rame A5 à Abidjan : Prix sur Demande | Monpapierrame",
    description: "Papier rame A5 (148 × 210 mm) à Abidjan : demandez le prix et la disponibilité sur WhatsApp. Livraison partout en Côte d'Ivoire.",
    intro: "Le format A5 (148 × 210 mm) est la moitié d'une feuille A4. Il convient aux carnets, flyers, bons de commande, ordonnances et petits documents. Demandez le prix et la disponibilité du papier rame A5 sur WhatsApp.",
    usages: ["Flyers et prospectus", "Bons de commande et factures", "Carnets et cahiers", "Ordonnances et petits formulaires"],
    faq: [
      { q: "Quelle est la taille d'une feuille A5 ?", r: "Une feuille A5 mesure 148 × 210 mm, soit la moitié d'une feuille A4." },
      { q: "Comment obtenir le prix du papier rame A5 ?", r: "Écrivez-nous sur WhatsApp avec la quantité souhaitée et votre commune : nous confirmons le prix, la disponibilité et la livraison." },
    ],
  },
];

export function trouverCategorie(slug: string): Categorie | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

/**
 * Pages locales : une page par grande ville et par commune d'Abidjan, pour les recherches du type
 * « papier rame Bouaké » ou « papier rame Yopougon ». Chaque entrée a son propre texte (contexte local).
 */
export type Lieu = {
  slug: string; // ex. « papier-rame-bouake »
  nom: string;
  type: "ville" | "commune";
  zone: string; // région ou district
  contexte: string; // phrase propre au lieu (activité, usages)
  clients: string[]; // clients typiques du lieu
};

const sl = (nom: string) => "papier-rame-" + nom.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const LIEUX_BRUTS: Omit<Lieu, "slug">[] = [
  // Communes d'Abidjan
  { nom: "Cocody", type: "commune", zone: "Abidjan", contexte: "Cocody réunit des quartiers résidentiels, des écoles, des universités et de nombreux bureaux (Riviera, Angré, Deux-Plateaux).", clients: ["Universités et écoles supérieures", "Cabinets et bureaux", "Cybercafés et centres de photocopie", "Particuliers"] },
  { nom: "Yopougon", type: "commune", zone: "Abidjan", contexte: "Yopougon est la commune la plus peuplée d'Abidjan, avec de très nombreux commerces, écoles, cybercafés et petites entreprises.", clients: ["Écoles et lycées", "Cybercafés et photocopie", "Commerces et PME", "Imprimeries de quartier"] },
  { nom: "Abobo", type: "commune", zone: "Abidjan", contexte: "Abobo est une grande commune populaire du nord d'Abidjan, avec beaucoup d'écoles, de commerces et de centres de photocopie.", clients: ["Écoles et collèges", "Centres de photocopie", "Boutiques et revendeurs", "Associations"] },
  { nom: "Marcory", type: "commune", zone: "Abidjan", contexte: "Marcory (Zone 4, Biétry) accueille des entreprises, des commerces et de nombreux services.", clients: ["Entreprises de la Zone 4", "Commerces et boutiques", "Écoles privées", "Cybercafés"] },
  { nom: "Koumassi", type: "commune", zone: "Abidjan", contexte: "Koumassi est une commune dense du sud d'Abidjan, avec des commerces, des ateliers et de nombreuses écoles.", clients: ["Écoles", "Commerces et ateliers", "Centres de photocopie", "Particuliers"] },
  { nom: "Plateau", type: "commune", zone: "Abidjan", contexte: "Le Plateau est le centre des affaires et des administrations d'Abidjan : banques, ministères, cabinets et grandes entreprises.", clients: ["Administrations et ministères", "Banques et assurances", "Cabinets et grandes entreprises", "Imprimeries"] },
  { nom: "Port-Bouët", type: "commune", zone: "Abidjan", contexte: "Port-Bouët, près de l'aéroport, abrite une zone industrielle et des entreprises de transport et de logistique.", clients: ["Entreprises et zones industrielles", "Transport et logistique", "Écoles", "Commerces"] },
  { nom: "Treichville", type: "commune", zone: "Abidjan", contexte: "Treichville est une commune commerçante et portuaire, avec des entreprises, des commerces et des écoles.", clients: ["Commerces et négoce", "Entreprises du port", "Écoles", "Cybercafés"] },
  { nom: "Adjamé", type: "commune", zone: "Abidjan", contexte: "Adjamé, avec son grand marché, est un centre majeur du commerce de gros à Abidjan.", clients: ["Grossistes et revendeurs", "Commerçants du marché", "Imprimeries", "Écoles"] },
  { nom: "Attécoubé", type: "commune", zone: "Abidjan", contexte: "Attécoubé est une commune du centre-ouest d'Abidjan, avec des écoles, des commerces et des services.", clients: ["Écoles", "Commerces", "Centres de photocopie", "Particuliers"] },
  { nom: "Bingerville", type: "commune", zone: "Abidjan", contexte: "Bingerville, ancienne capitale, en pleine croissance, compte des écoles, des administrations et de nouveaux quartiers.", clients: ["Écoles et établissements", "Administrations", "Entreprises locales", "Particuliers"] },
  // Villes de l'intérieur
  { nom: "Bouaké", type: "ville", zone: "région du Gbêkê", contexte: "Bouaké, deuxième ville du pays, est un grand carrefour commercial entre le nord et le sud, avec de nombreuses écoles, administrations et commerces.", clients: ["Écoles et université", "Administrations", "Commerces et grossistes", "Cybercafés"] },
  { nom: "Yamoussoukro", type: "ville", zone: "District autonome de Yamoussoukro", contexte: "Yamoussoukro, capitale politique et administrative, concentre des administrations, des grandes écoles et de nombreux services publics.", clients: ["Administrations", "Grandes écoles et instituts", "Entreprises", "Imprimeries"] },
  { nom: "San-Pédro", type: "ville", zone: "région du Bas-Sassandra", contexte: "San-Pédro, ville portuaire, compte beaucoup d'entreprises de transport, de négoce et d'exportation qui impriment de nombreux documents.", clients: ["Entreprises du port et du négoce", "Écoles et université", "Administrations", "Commerces"] },
  { nom: "Daloa", type: "ville", zone: "région du Haut-Sassandra", contexte: "Daloa, au cœur de la boucle du cacao, regroupe négociants, coopératives, écoles et administrations.", clients: ["Coopératives et négociants", "Écoles et université", "Administrations", "Cybercafés"] },
  { nom: "Korhogo", type: "ville", zone: "région du Poro", contexte: "Korhogo, grande ville du nord, regroupe des coopératives agricoles, des écoles, des administrations et des commerces.", clients: ["Coopératives agricoles", "Écoles et université", "Administrations", "Commerces"] },
  { nom: "Man", type: "ville", zone: "région du Tonkpi", contexte: "Man, ville de l'ouest du pays, compte des écoles, des commerces et des services publics.", clients: ["Écoles et lycées", "Administrations", "Commerces", "Centres de photocopie"] },
  { nom: "Abengourou", type: "ville", zone: "région de l'Indénié-Djuablin", contexte: "Abengourou, ville de l'est, vit du commerce et de l'agriculture, avec des écoles et des administrations.", clients: ["Écoles", "Administrations", "Commerces et négoce", "Cybercafés"] },
  { nom: "Gagnoa", type: "ville", zone: "région du Gôh", contexte: "Gagnoa, ville du centre-ouest, regroupe des coopératives de cacao et de café, des écoles et des administrations.", clients: ["Coopératives", "Écoles", "Administrations", "Commerces"] },
  { nom: "Divo", type: "ville", zone: "région du Lôh-Djiboua", contexte: "Divo, ville de la zone cacaoyère, compte des négociants, des écoles et des administrations.", clients: ["Négociants et coopératives", "Écoles", "Administrations", "Commerces"] },
  { nom: "Soubré", type: "ville", zone: "région de la Nawa", contexte: "Soubré, en zone de production de cacao, compte des négociants, des écoles et de nombreux commerces.", clients: ["Négociants et coopératives", "Écoles", "Commerces", "Administrations"] },
  { nom: "Odienné", type: "ville", zone: "région du Kabadougou", contexte: "Odienné, grande ville du nord-ouest, compte des écoles, des administrations et des commerces.", clients: ["Écoles", "Administrations", "Commerces", "Associations"] },
  { nom: "Séguéla", type: "ville", zone: "région du Worodougou", contexte: "Séguéla, ville du nord-ouest, regroupe des écoles, des commerces et des services publics.", clients: ["Écoles", "Commerces", "Administrations", "Centres de photocopie"] },
  { nom: "Bondoukou", type: "ville", zone: "région du Gontougo", contexte: "Bondoukou, ville du nord-est, compte des écoles, des administrations et un commerce actif avec les pays voisins.", clients: ["Écoles", "Administrations", "Commerces", "Cybercafés"] },
  { nom: "Ferkessédougou", type: "ville", zone: "région du Tchologo", contexte: "Ferkessédougou, ville du nord, est un point de passage commercial avec des écoles et des administrations.", clients: ["Écoles", "Commerces", "Administrations", "Entreprises"] },
  { nom: "Grand-Bassam", type: "ville", zone: "région du Sud-Comoé", contexte: "Grand-Bassam, ville balnéaire proche d'Abidjan, compte des hôtels, des administrations, des écoles et des commerces.", clients: ["Hôtels et tourisme", "Administrations", "Écoles", "Commerces"] },
  { nom: "Agboville", type: "ville", zone: "région de l'Agnéby-Tiassa", contexte: "Agboville, au nord d'Abidjan, compte des écoles, des administrations et des commerces.", clients: ["Écoles", "Administrations", "Commerces", "Cybercafés"] },
  { nom: "Dimbokro", type: "ville", zone: "région du N'Zi", contexte: "Dimbokro, ville du centre, compte des écoles, des administrations et des commerces.", clients: ["Écoles", "Administrations", "Commerces", "Associations"] },
  { nom: "Katiola", type: "ville", zone: "région du Hambol", contexte: "Katiola, ville du centre-nord, compte des écoles, des services publics et des commerces.", clients: ["Écoles", "Administrations", "Commerces", "Centres de photocopie"] },
  { nom: "Adzopé", type: "ville", zone: "région de La Mé", contexte: "Adzopé, ville du sud-est, compte des écoles, des administrations et des commerces.", clients: ["Écoles", "Administrations", "Commerces", "Cybercafés"] },
];

export const LIEUX: Lieu[] = LIEUX_BRUTS.map((l) => ({ ...l, slug: sl(l.nom) }));

export function trouverLieu(slug: string): Lieu | undefined {
  return LIEUX.find((l) => l.slug === slug);
}

/** Titre (sans « | Monpapierrame ») et description propres à chaque page locale ; {prix} = prix d'appel */
export const META_LIEUX: Record<string, { t: string; d: string }> = {
  "papier-rame-cocody": { t: "Papier Rame Cocody : Riviera, Angré, Prix", d: "Papier rame A4 livré à Cocody, Riviera, Angré et Deux-Plateaux : ramette dès {prix}, cartons, gros. Écoles, bureaux, cybercafés. Livraison 24 à 72 h." },
  "papier-rame-yopougon": { t: "Papier Rame Yopougon : Ramette et Carton", d: "Acheter du papier rame à Yopougon, la plus grande commune d'Abidjan : ramette dès {prix}, carton, gros pour écoles et cybercafés. Livraison rapide." },
  "papier-rame-abobo": { t: "Papier Rame Abobo : Prix Carton et Gros", d: "Papier rame A4 à Abobo : carton de 5 ramettes, gros dès 10 cartons, ramette dès {prix}. Pour écoles, photocopie et boutiques. Livraison à Abobo." },
  "papier-rame-marcory": { t: "Papier Rame Marcory, Zone 4 : Prix", d: "Papier rame A4 livré à Marcory, Zone 4 et Biétry : ramette dès {prix}, carton, gros. Pour entreprises, commerces et écoles. Livraison en 24 à 72 h." },
  "papier-rame-koumassi": { t: "Papier Rame Koumassi : Carton et Gros", d: "Besoin de papier rame à Koumassi ? Ramette dès {prix}, carton de 5 ramettes et tarif gros dès 10 cartons. Livraison à domicile à Koumassi, Abidjan." },
  "papier-rame-plateau": { t: "Papier Rame Plateau Abidjan : Entreprises", d: "Papier rame A4 pour les bureaux, banques et administrations du Plateau : facture sur demande, carton et gros, livraison en 24 à 72 h à Abidjan Plateau." },
  "papier-rame-port-bouet": { t: "Papier Rame Port-Bouët : Prix et Gros", d: "Papier rame A4 livré à Port-Bouët, près de l'aéroport : carton, gros dès 10 cartons pour entreprises et logistique. Ramette dès {prix}." },
  "papier-rame-treichville": { t: "Papier Rame Treichville : Carton et Gros", d: "Papier rame à Treichville : ramette dès {prix}, cartons et gros pour commerces, entreprises du port et écoles. Livraison en 24 à 72 h à Treichville." },
  "papier-rame-adjame": { t: "Papier Rame Adjamé : Prix de Gros", d: "Grossiste papier rame pour Adjamé : prix de gros dès 10 cartons, carton de 5 ramettes, ramette dès {prix}. Revendeurs et commerçants du marché." },
  "papier-rame-attecoube": { t: "Papier Rame Attécoubé : Prix et Livraison", d: "Papier rame A4 à Attécoubé : ramette dès {prix}, carton de 5 ramettes, gros dès 10 cartons. Écoles, commerces et photocopie, livraison à Attécoubé." },
  "papier-rame-bingerville": { t: "Papier Rame Bingerville : Livraison", d: "Papier rame A4 livré à Bingerville : ramette dès {prix}, carton, gros. Écoles, administrations et nouveaux quartiers, livraison en 24 à 72 h." },
  "papier-rame-bouake": { t: "Papier Rame Bouaké : Prix et Livraison", d: "Grossiste papier rame livrant à Bouaké : carton de 5 ramettes, gros dès 10 cartons, ramette dès {prix}. Écoles, bureaux, commerces. Livraison 72 h." },
  "papier-rame-yamoussoukro": { t: "Papier Rame Yamoussoukro : Prix, Livraison", d: "Papier rame A4 pour les administrations, écoles et entreprises de Yamoussoukro : facture sur demande, carton, gros dès 10 cartons. Livraison 24 à 72 h." },
  "papier-rame-san-pedro": { t: "Papier Rame San-Pédro : Prix et Livraison", d: "Papier rame A4 à San-Pédro pour entreprises du port, négoce et écoles : carton, gros dès 10 cartons, ramette dès {prix}. Livraison à San-Pédro." },
  "papier-rame-daloa": { t: "Papier Rame Daloa : Carton et Gros", d: "Papier rame A4 à Daloa pour coopératives, négociants et écoles : carton de 5 ramettes, gros dès 10 cartons, ramette dès {prix}. Livraison à Daloa." },
  "papier-rame-korhogo": { t: "Papier Rame Korhogo : Prix et Livraison", d: "Commandez du papier rame A4 à Korhogo : carton, gros dès 10 cartons, ramette dès {prix}. Coopératives, écoles et administrations du nord." },
  "papier-rame-man": { t: "Papier Rame Man : Prix et Livraison", d: "Papier rame A4 livré à Man et dans la région du Tonkpi : ramette dès {prix}, carton, gros. Écoles, commerces et administrations. Livraison 24 à 72 h." },
  "papier-rame-abengourou": { t: "Papier Rame Abengourou : Carton et Gros", d: "Papier rame A4 à Abengourou : ramette dès {prix}, cartons et gros dès 10 cartons pour écoles, commerces et administrations de l'est. Livraison rapide." },
  "papier-rame-gagnoa": { t: "Papier Rame Gagnoa : Prix et Livraison", d: "Papier rame A4 à Gagnoa pour coopératives de cacao, écoles et administrations : carton, gros dès 10 cartons, ramette dès {prix}. Livraison à Gagnoa." },
  "papier-rame-divo": { t: "Papier Rame Divo : Prix et Livraison", d: "Papier rame A4 livré à Divo, zone cacaoyère : ramette dès {prix}, carton, gros dès 10 cartons pour négociants, écoles et commerces." },
  "papier-rame-soubre": { t: "Papier Rame Soubré : Carton et Gros", d: "Papier rame A4 à Soubré : carton de 5 ramettes, gros dès 10 cartons, ramette dès {prix}. Négociants, écoles et commerces de la Nawa." },
  "papier-rame-odienne": { t: "Papier Rame Odienné : Prix et Livraison", d: "Papier rame A4 livré à Odienné et au Kabadougou : ramette dès {prix}, carton, gros. Écoles, administrations et commerces. Livraison en 24 à 72 h." },
  "papier-rame-seguela": { t: "Papier Rame Séguéla : Carton et Gros", d: "Papier rame A4 à Séguéla : ramette dès {prix}, carton de 5 ramettes, gros dès 10 cartons. Écoles, commerces et services publics. Livraison à Séguéla." },
  "papier-rame-bondoukou": { t: "Papier Rame Bondoukou : Prix et Livraison", d: "Papier rame A4 à Bondoukou et dans le Gontougo : ramette dès {prix}, carton, gros dès 10 cartons. Écoles, commerces, administrations. Livraison rapide." },
  "papier-rame-ferkessedougou": { t: "Papier Rame Ferkessédougou : Livraison", d: "Papier rame A4 livré à Ferkessédougou, point de passage du nord : ramette dès {prix}, carton, gros dès 10 cartons. Livraison en 24 à 72 h." },
  "papier-rame-grand-bassam": { t: "Papier Rame Grand-Bassam : Prix et Livraison", d: "Papier rame A4 à Grand-Bassam : hôtels, administrations et écoles. Ramette dès {prix}, carton et gros dès 10 cartons. Livraison en 24 à 72 h." },
  "papier-rame-agboville": { t: "Papier Rame Agboville : Carton et Gros", d: "Papier rame A4 livré à Agboville, au nord d'Abidjan : ramette dès {prix}, carton de 5 ramettes, gros dès 10 cartons. Écoles et commerces." },
  "papier-rame-dimbokro": { t: "Papier Rame Dimbokro : Prix et Livraison", d: "Papier rame A4 à Dimbokro : ramette dès {prix}, carton, gros dès 10 cartons. Écoles, administrations et commerces du N'Zi. Livraison en 24 à 72 h." },
  "papier-rame-katiola": { t: "Papier Rame Katiola : Carton et Gros", d: "Papier rame A4 livré à Katiola et dans le Hambol : ramette dès {prix}, carton de 5 ramettes, gros dès 10 cartons. Écoles et commerces." },
  "papier-rame-adzope": { t: "Papier Rame Adzopé : Prix et Livraison", d: "Papier rame A4 à Adzopé, dans la région de La Mé : ramette dès {prix}, carton, gros dès 10 cartons. Écoles, administrations, commerces." },
};

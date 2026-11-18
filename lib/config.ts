/**
 * Configuration centrale de Monpapierrame.
 * Tout ce qu'on modifie régulièrement (prix, contact, textes) est ici.
 */

export const SITE = {
  nom: "Monpapierrame",
  url: "https://www.monpapierrame.store", // domaine principal (monpapierrame.store redirige vers www)
  // Numéro WhatsApp au format international, sans « + » ni espaces
  whatsapp: "2250767537998",
  whatsappAffiche: "+225 07 67 53 79 98",
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
      "Carton de 5 ramettes papier rame A4 70g Paper One, 2 500 feuilles, {prix}. Livraison à Abidjan et partout en Côte d'Ivoire.",
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
    metaTitre: "Papier Rame A4 Paper One, Lot de 10 Cartons | Monpapierrame",
    metaDescription:
      "Papier rame A4 Paper One en gros à Abidjan : lot de 10 cartons, 70g. {prix} le carton. Facture, livraison en Côte d'Ivoire.",
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
      "Carton de 5 ramettes papier rame A4 80g Globulus, 2 500 feuilles, {prix}. Livraison à Abidjan et partout en Côte d'Ivoire.",
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
    metaTitre: "Papier Rame A4 Globulus, Lot de 10 Cartons | Monpapierrame",
    metaDescription:
      "Papier rame A4 Globulus en gros à Abidjan : lot de 10 cartons, 80g. {prix} le carton. Facture, livraison en Côte d'Ivoire.",
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
    r: "Nous fournissons les marques Double A, Paper One et Globulus, en ramette (Double A), au carton de 5 ramettes et par lot de 10 cartons. Les prix sont indiqués sur chaque fiche produit.",
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
    q: "Êtes-vous grossiste de papier rame à Abidjan\u00a0?",
    r: "Oui. Monpapierrame est grossiste de papier rame A4 Double A à Abidjan et livre partout en Côte d'Ivoire. Nous sommes fournisseur des grandes marques de papier rame : Double A, Paper One et Globulus. Nous vendons à l'unité (ramette), au carton et en gros à partir de 10 cartons, aux écoles, entreprises, administrations, imprimeries et revendeurs.",
  },
  {
    q: "Pouvez-vous établir une facture\u00a0?",
    r: "Oui, une facture peut être établie sur demande, notamment pour les entreprises, les écoles, les administrations et les achats en gros. Précisez-le dans votre message WhatsApp.",
  },
];

/**
 * SEO de la page d'accueil (limites recommandées par Google :
 * titre 60 caractères maximum, description 155 maximum).
 */
export const SEO_ACCUEIL = {
  titre: "Papier Rame A4 à Abidjan & en Côte d’Ivoire | Monpapierrame",
  description:
    "Grossiste et fournisseur papier rame A4 Double A, Paper One, Globulus à Abidjan et en Côte d'Ivoire. Ramette dès {prix}, carton, gros dès 10 cartons.",
};

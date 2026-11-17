/**
 * Configuration centrale de Monpapierrame.
 * Tout ce qu'on modifie régulièrement (prix, contact, textes) est ici.
 */

export const SITE = {
  nom: "Monpapierrame",
  url: "https://monpapierram.vercel.app", // à remplacer par votre domaine
  // Numéro WhatsApp au format international, sans « + » ni espaces
  whatsapp: "2250700000000",
  whatsappAffiche: "+225 07 00 00 00 00",
  email: "contact@monpapierrame.ci",
  zone: "Partout en Côte d'Ivoire : Abidjan, Yamoussoukro, Bouaké, San-Pédro, Daloa, Korhogo et toutes les autres villes",
  horaires: "Lundi – Samedi, 8h – 19h",
};

/** Construit un lien WhatsApp avec un message pré-rempli */
export function lienWhatsApp(message: string): string {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const MESSAGE_GENERAL = `Bonjour ${SITE.nom}, je souhaite commander du papier Double A Premium A4 80 g.`;

export type Produit = {
  id: string; // identifiant interne (panier)
  slug: string; // adresse de la page : /produits/<slug>
  nom: string;
  specs: string; // ligne courte sous le nom
  detail: string;
  prix: number; // en FCFA (valeurs d'exemple)
  unite: string; // « la ramette », « le carton »…
  note?: string; // précision sous le prix
  minQty: number; // quantité minimale de commande
  badge?: string;
  image: string;
  alt: string;
  points: string[];
  /** Page produit : photos, texte et fiche technique */
  galerie: { src: string; alt: string }[];
  description: string[];
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
    metaTitre: "Papier Rame A4 80g, Ramette {prix} | Monpapierrame",
    metaDescription:
      "Papier rame A4 80g Double A, ramette de 500 feuilles, {prix}. Idéal impression et photocopie. Livraison à Abidjan et partout en Côte d'Ivoire.",
    slug: "ramette-papier-a4-80g-double-a",
    nom: "Ramette papier A4 80g Double A Premium",
    specs: "80 g/m² · 500 feuilles",
    detail: "Pour la maison, l'école ou un petit bureau.",
    prix: 3500,
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
    metaTitre: "Carton Papier Rame A4 80g, 5 Ramettes | Monpapierrame",
    metaDescription:
      "Carton de 5 ramettes papier rame A4 80g Double A, 2 500 feuilles, {prix}. Moins cher à la ramette. Livraison à Abidjan et partout en Côte d'Ivoire.",
    slug: "carton-papier-a4-5-ramettes-double-a",
    nom: "Carton papier A4 80g Double A (5 ramettes)",
    specs: "80 g/m² · 5 × 500 feuilles",
    detail: "Le format le plus pratique pour un bureau ou un commerce.",
    prix: 16500,
    unite: "le carton",
    note: "Soit 3 300 FCFA la ramette",
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
      "Le carton de papier A4 80g Double A regroupe 5 ramettes, soit 2 500 feuilles. C'est le format idéal pour un bureau, un commerce, une école ou un cybercafé : moins de réapprovisionnements et un prix plus avantageux à la ramette.",
      "Chaque ramette est emballée individuellement. Le carton est livré scellé jusqu'à votre adresse, à Abidjan comme dans le reste de la Côte d'Ivoire.",
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
    metaTitre: "Papier Rame A4 en Gros, Carton Double A | Monpapierrame",
    metaDescription:
      "Papier rame A4 en gros à Abidjan : carton Double A 80g à {prix} dès 10 cartons. Facture sur demande. Livré partout en Côte d'Ivoire. Devis WhatsApp.",
    slug: "papier-a4-en-gros-carton-double-a",
    nom: "Papier A4 en gros, carton Double A 80g",
    specs: `Dès ${SEUIL_GROS} cartons · 80 g/m²`,
    detail: "Pour les écoles, entreprises, imprimeries et revendeurs.",
    prix: 15500,
    unite: "le carton",
    note: `Soit 3 100 FCFA la ramette, dès ${SEUIL_GROS} cartons`,
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
    fiche: [
      ["Marque", "Double A Premium"],
      ["Format", "A4 (210 × 297 mm)"],
      ["Grammage", "80 g/m²"],
      ["Conditionnement", "Carton de 5 ramettes de 500 feuilles"],
      ["Quantité minimale", `${SEUIL_GROS} cartons`],
    ],
  },
];

/** Remplace {prix} par le prix formaté du produit */
export function meta(texte: string, prix: number): string {
  return texte.replace("{prix}", formatPrix(prix));
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

/** Format d'affichage des prix : « 16 500 FCFA » */
export function formatPrix(n: number): string {
  return new Intl.NumberFormat("fr-FR").format(n).replace(/ | /g, " ") + " FCFA";
}

export const MODES_PAIEMENT = ["Paiement à la livraison", "Orange Money", "MTN MoMo", "Wave"];

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

/** Les 4 étapes du montage au défilement */
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
    titre: "500 feuilles blanches et lisses",
    phrase: "Un papier A4 80 g/m² à la blancheur uniforme, pour des impressions nettes.",
    image: "/images/etape-3.jpg",
    alt: "Ramette Double A Premium ouverte avec des feuilles blanches posées à côté, carton flou derrière",
  },
  {
    titre: "Prête pour l'impression recto verso",
    phrase: "Une épaisseur et une opacité pensées pour le recto verso, sans bourrage.",
    image: "/images/etape-4.jpg",
    alt: "Ramette Double A Premium couchée et ouverte devant un carton ouvert",
  },
];

/** Questions fréquentes (affichées dans la FAQ et dans les données structurées SEO) */
export const FAQ: { q: string; r: string }[] = [
  {
    q: "Que signifie le grammage 80 g/m² ?",
    r: "Le grammage indique le poids d'une feuille d'un mètre carré. 80 g/m² est le standard de bureau : assez épais pour limiter la transparence en recto verso, assez souple pour bien passer dans les imprimantes laser et jet d'encre.",
  },
  {
    q: "Combien de feuilles contient une ramette ?",
    r: "Une ramette Double A Premium contient 500 feuilles A4. Un carton regroupe 5 ramettes, soit 2 500 feuilles.",
  },
  {
    q: "Ce papier est-il compatible avec mon imprimante ?",
    r: "Oui. Le Double A Premium A4 80 g convient aux imprimantes laser, jet d'encre et aux photocopieurs, y compris pour l'impression recto verso automatique.",
  },
  {
    q: "Livrez-vous en dehors d'Abidjan, et sous quel délai ?",
    r: "Oui, nous livrons partout en Côte d'Ivoire. À Abidjan, les commandes confirmées sont généralement livrées sous 24 à 48 heures. Pour les autres villes, nous confirmons le délai et les frais de livraison à la commande sur WhatsApp.",
  },
  {
    q: "Proposez-vous des tarifs pour l'achat en gros ?",
    r: `Oui, à partir de ${SEUIL_GROS} cartons, nous appliquons un tarif dégressif pour les écoles, entreprises, imprimeries et revendeurs. Demandez un devis par WhatsApp ou par e-mail.`,
  },
];

/**
 * SEO de la page d'accueil (limites recommandées par Google :
 * titre 60 caractères maximum, description 155 maximum).
 */
export const SEO_ACCUEIL = {
  titre: "Papier Rame A4 en Côte d'Ivoire | Monpapierrame",
  description:
    "Fournisseur de papier rame A4 Double A : ramette dès {prix}, carton de 5 ramettes, vente en gros. Livraison à Abidjan et partout en Côte d'Ivoire.",
};

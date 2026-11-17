/**
 * Configuration centrale de Monpapierram.
 * Tout ce qu'on modifie régulièrement (prix, contact, textes) est ici.
 */

export const SITE = {
  nom: "Monpapierram",
  url: "https://monpapierram.vercel.app", // à remplacer par votre domaine
  // Numéro WhatsApp au format international, sans « + » ni espaces
  whatsapp: "2250700000000",
  whatsappAffiche: "+225 07 00 00 00 00",
  email: "contact@monpapierram.ci",
  zone: "Abidjan et environs (Cocody, Marcory, Plateau, Yopougon, Abobo, Koumassi, Riviera…)",
  horaires: "Lundi – Samedi, 8h – 19h",
};

/** Construit un lien WhatsApp avec un message pré-rempli */
export function lienWhatsApp(message: string): string {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const MESSAGE_GENERAL =
  "Bonjour Monpapierram, je souhaite commander du papier Double A Premium A4 80 g.";

export type Produit = {
  id: string;
  nom: string;
  description: string;
  detail: string;
  prix: number; // en FCFA (valeurs d'exemple)
  unite: string;
  populaire?: boolean;
  points: string[];
  message: string; // message WhatsApp pré-rempli
};

/** Nombre de cartons à partir duquel le tarif gros s'applique */
export const SEUIL_GROS = 10;

export const PRODUITS: Produit[] = [
  {
    id: "ramette",
    nom: "Ramette A4 80 g",
    description: "Double A Premium, 500 feuilles",
    detail: "Idéale pour la maison, l'école ou un petit bureau.",
    prix: 3500,
    unite: "la ramette",
    points: ["500 feuilles A4", "80 g/m²", "Recto verso sans bourrage"],
    message:
      "Bonjour Monpapierram, je souhaite commander une ramette de papier Double A Premium A4 80 g (500 feuilles). Quel est le délai de livraison ?",
  },
  {
    id: "carton",
    nom: "Carton de 5 ramettes",
    description: "Double A Premium, 2 500 feuilles",
    detail: "Le meilleur rapport qualité-prix pour les bureaux et commerces.",
    prix: 16500,
    unite: "le carton",
    populaire: true,
    points: ["5 ramettes de 500 feuilles", "Économie par rapport à l'unité", "Livraison à Abidjan"],
    message:
      "Bonjour Monpapierram, je souhaite commander un carton de 5 ramettes de papier Double A Premium A4 80 g. Quel est le délai de livraison ?",
  },
  {
    id: "gros",
    nom: `Achat en gros dès ${SEUIL_GROS} cartons`,
    description: "Tarif dégressif pour professionnels",
    detail: "Écoles, administrations, imprimeries, revendeurs.",
    prix: 15500,
    unite: "le carton, dès " + SEUIL_GROS + " cartons",
    points: ["Prix dégressif", "Facture sur demande", "Livraison planifiée"],
    message: `Bonjour Monpapierram, je souhaite un devis pour un achat en gros de papier Double A Premium A4 80 g (à partir de ${SEUIL_GROS} cartons).`,
  },
];

/** Format d'affichage des prix : « 16 500 FCFA » */
export function formatPrix(n: number): string {
  return new Intl.NumberFormat("fr-FR").format(n).replace(/ | /g, " ") + " FCFA";
}

export const MODES_PAIEMENT = ["Paiement à la livraison", "Orange Money", "MTN MoMo", "Wave"];

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
    q: "Quel est le délai de livraison à Abidjan ?",
    r: "Les commandes confirmées sont généralement livrées sous 24 à 48 heures à Abidjan. Contactez-nous sur WhatsApp pour connaître le créneau exact selon votre commune.",
  },
  {
    q: "Proposez-vous des tarifs pour l'achat en gros ?",
    r: `Oui, à partir de ${SEUIL_GROS} cartons, nous appliquons un tarif dégressif pour les écoles, entreprises, imprimeries et revendeurs. Demandez un devis par WhatsApp ou par e-mail.`,
  },
];

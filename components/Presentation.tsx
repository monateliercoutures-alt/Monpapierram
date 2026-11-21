import { SEUIL_GROS, SITE } from "@/lib/config";
import Titre from "./Titre";

// Pour qui ? (texte indexable par Google, en liste)
const USAGES = [
  ["Bureaux et entreprises", "impression de factures, devis, contrats et courriers du quotidien."],
  ["Écoles et universités", "polycopiés, sujets d'examen, devoirs et dossiers."],
  ["Administrations et mairies", "formulaires, registres et documents officiels en grande quantité."],
  ["Cybercafés et centres de photocopie", "impression et photocopie à fort volume, avec un papier qui passe sans bourrage."],
  ["Imprimeries et revendeurs", `achat en gros dès ${SEUIL_GROS} cartons, au prix du carton dégressif.`],
  ["Particuliers", "papier pour la maison, les études et les démarches personnelles."],
];

// Étapes de commande
const ETAPES = [
  ["Choisissez votre papier", "ramette de 500 feuilles, carton de 5 ramettes ou carton en gros."],
  ["Envoyez votre commande", "votre panier s'ouvre dans WhatsApp avec vos coordonnées de livraison."],
  ["Nous confirmons et livrons", "prix de livraison et créneau confirmés, puis livraison à votre adresse."],
];

const ABIDJAN = "Cocody, Plateau, Marcory, Treichville, Koumassi, Port-Bouët, Yopougon, Abobo, Adjamé, Attécoubé et Bingerville";
const VILLES = "Yamoussoukro, Bouaké, San-Pédro, Daloa, Korhogo, Man, Abengourou, Gagnoa";

// Présentation de la boutique : texte riche pour les visiteurs et pour Google
export default function Presentation() {
  return (
    <section id="a-propos" className="bg-white px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <Titre titre={`${SITE.nom}, grossiste de papier rame A4 Double A, Paper One et Globulus`} />

        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="justifie space-y-4 text-encre/85">
            <p>
              {SITE.nom} est <strong>grossiste et fournisseur de papier rame A4</strong> à Abidjan et partout en Côte d&apos;Ivoire, pour les marques <strong>Double A, Paper One et Globulus</strong>. Nous proposons des
              ramettes de 500 feuilles, des cartons de 5 ramettes (2 500 feuilles) et des cartons en gros pour les
              professionnels. Le papier Double A est reconnu pour sa blancheur régulière et son passage sans bourrage
              dans les imprimantes laser, jet d&apos;encre et les photocopieurs. Les papiers Paper One (70 g/m²), Globulus, Paper Pro, Authentik, Smart Copy (80 g/m²), Ultima Copy (75 g/m²), Roch, Aone et Aria (80 g/m²) sont proposés au carton de 5 ramettes et par lot de 10 cartons : 13 500 FCFA le carton pour la plupart (12 500 FCFA pour Ultima Copy, Roch, Aone et Aria), et dès 10 cartons 13 000 FCFA (12 000 FCFA pour Ultima Copy, Roch, Aone et Aria).
            </p>
            <p>
              Vous commandez en ligne, nous confirmons votre commande sur WhatsApp, puis nous vous livrons à Abidjan et
              dans toute la Côte d&apos;Ivoire. Le paiement se fait à la livraison, ou par Orange Money, MTN MoMo, Moov
              Money et Wave. Une facture peut être établie sur demande.
            </p>
            <h3 className="pt-2 text-lg font-bold text-nuit">Où livrons-nous ?</h3>
            <p>
              <strong>À Abidjan</strong> : {ABIDJAN}. Les commandes confirmées sont livrées en 24 à 72
              heures.
            </p>
            <p>
              <strong>Dans le reste du pays</strong> : {VILLES} et toutes les autres villes. Livraison en 24 à 72 heures, et frais de
              livraison sont confirmés avec vous à la commande.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-nuit">Pour qui est ce papier ?</h3>
            <ul className="mt-3 divide-y divide-profond/10 border-y border-profond/10">
              {USAGES.map(([t, d]) => (
                <li key={t} className="py-3 text-sm text-encre/85">
                  <strong className="text-nuit">{t}</strong> : {d}
                </li>
              ))}
            </ul>

            <h3 className="mt-8 text-lg font-bold text-nuit">Comment commander votre papier A4 ?</h3>
            <ol className="mt-3 space-y-3">
              {ETAPES.map(([t, d], i) => (
                <li key={t} className="flex gap-3 text-sm text-encre/85">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-profond/30 text-xs font-bold text-profond">
                    {i + 1}
                  </span>
                  <span>
                    <strong className="text-nuit">{t}</strong> : {d}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

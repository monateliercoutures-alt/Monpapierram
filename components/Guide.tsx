import Titre from "./Titre";

// Guide d'achat\u00a0: questions que les gens posent avant d'acheter du papier A4
const SUJETS = [
  {
    t: "Quel grammage de papier A4 choisir\u00a0?",
    d: "Le papier de 80 g/m² est le standard pour le bureau et l'école\u00a0: bonne tenue, bon rendu d'impression et prix raisonnable. Un papier plus léger (70 g/m²) convient aux brouillons, un papier plus épais (90 g/m² et plus) aux documents de présentation.",
  },
  {
    t: "Ramette ou carton\u00a0: que choisir\u00a0?",
    d: "Une ramette de 500 feuilles suffit pour un usage personnel ou un petit bureau. Dès que vous imprimez régulièrement, le carton de 5 ramettes (2 500 feuilles) évite de recommander souvent. Pour les écoles, imprimeries et revendeurs, le tarif gros s'applique à partir de 10 cartons.",
  },
  {
    t: "Papier pour imprimante laser ou jet d'encre\u00a0?",
    d: "Le papier A4 Double A 80 g convient aux deux types d'imprimantes, ainsi qu'aux photocopieurs. Son épaisseur limite la transparence en impression recto verso.",
  },
  {
    t: "Comment éviter les bourrages papier\u00a0?",
    d: "Utilisez un papier de qualité régulière, aérez la ramette avant de la mettre dans le bac et ne dépassez pas la capacité de l'imprimante. Gardez les ramettes dans leur emballage, à plat, loin de l'humidité.",
  },
  {
    t: "Comment bien conserver ses ramettes\u00a0?",
    d: "Rangez-les à plat, au sec et à l'abri de la chaleur. Chaque ramette Double A est emballée individuellement\u00a0: ne la déballez qu'au moment de l'utiliser pour garder le papier lisse et sec.",
  },
  {
    t: "Papier 70 g ou 80 g : quelle différence de prix et d'usage\u00a0?",
    d: "Le Paper One (70 g/m²) est plus léger : il suffit pour les brouillons, les copies internes et les impressions recto simple. Les marques en 80 g/m² (Double A, Globulus, Paper Pro, Authentik, Smart Copy, Roch, Aone, Aria) sont plus opaques et plus rigides, donc préférables pour les documents officiels, les contrats et le recto verso.",
  },
  {
    t: "Que veut dire la blancheur d'un papier A4\u00a0?",
    d: "La blancheur mesure l'éclat du papier. Un papier très blanc rend les textes plus contrastés et les images plus nettes. Les papiers de bureau de qualité standard (type CIE) donnent un rendu régulier sur les imprimantes laser comme jet d'encre.",
  },
  {
    t: "Quelle quantité de papier commander pour mon entreprise ou mon école\u00a0?",
    d: "Comptez environ 500 feuilles par mois et par poste de travail pour un bureau, davantage pour une école ou un cybercafé. Un carton de 5 ramettes couvre 2 500 feuilles. Dès 10 cartons (25 000 feuilles), le tarif gros s'applique : demandez un devis sur WhatsApp pour un approvisionnement régulier.",
  },
  {
    t: "Comment vérifier un papier rame de qualité avant de l'acheter\u00a0?",
    d: "Vérifiez le format (A4, 210 × 297 mm), le grammage imprimé sur l'emballage, le nombre de feuilles (500 par ramette) et l'état de l'emballage, qui doit être intact et sec. Achetez auprès d'un fournisseur identifié qui livre des cartons d'origine fermés, comme Monpapierrame.",
  },
];

// Guide d'achat du papier A4
export default function Guide() {
  return (
    <section id="guide" className="border-y border-profond/10 bg-brume px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <Titre titre="Guide d'achat du papier rame A4" texte="Les réponses aux questions qu'on se pose avant d'acheter du papier d'impression." />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {SUJETS.map((s) => (
            <article key={s.t} className="rounded-carte border border-profond/15 bg-white p-6">
              <h3 className="text-base font-bold text-nuit">{s.t}</h3>
              <p className="justifie mt-2 text-sm text-encre/85">{s.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

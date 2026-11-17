import Titre from "./Titre";

// Guide d'achat\u00a0: questions que les gens posent avant d'acheter du papier A4
const SUJETS = [
  {
    t: "Quel grammage de papier A4 choisir\u00a0?",
    d: "Le papier de 80 g/m² est le standard pour le bureau et l'école\u00a0: bonne tenue, bon rendu d'impression et prix raisonnable. Un papier plus léger (70 g/m²) convient aux brouillons, un papier plus épais (90 g/m² et plus) aux documents de présentation.",
  },
  {
    t: "Ramette ou carton\u00a0: que choisir\u00a0?",
    d: "Une ramette de 500 feuilles suffit pour un usage personnel ou un petit bureau. Dès que vous imprimez régulièrement, le carton de 5 ramettes (2 500 feuilles) revient moins cher à la ramette. Pour les écoles, imprimeries et revendeurs, le tarif gros s'applique à partir de 10 cartons.",
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

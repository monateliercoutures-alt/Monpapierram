// Titre de section réutilisable : petit libellé + titre + sous-texte (Server Component)
export default function Titre({
  etiquette,
  titre,
  texte,
  clair = false,
}: {
  etiquette: string;
  titre: string;
  texte?: string;
  clair?: boolean;
}) {
  return (
    <div className="reveal mx-auto max-w-2xl text-center">
      <p
        className={`inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] ${
          clair ? "text-cyan" : "text-profond"
        }`}
      >
        <span className="h-px w-8 bg-current opacity-50" aria-hidden="true" />
        {etiquette}
        <span className="h-px w-8 bg-current opacity-50" aria-hidden="true" />
      </p>
      <h2 className={`mt-4 text-3xl font-bold sm:text-[2.5rem] ${clair ? "text-white" : "text-nuit"}`}>{titre}</h2>
      {texte && <p className={`mt-4 text-base sm:text-lg ${clair ? "text-white/75" : "text-encre/70"}`}>{texte}</p>}
    </div>
  );
}

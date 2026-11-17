// Titre de section sobre, aligné à gauche (Server Component)
export default function Titre({ titre, texte }: { titre: string; texte?: string }) {
  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold text-nuit sm:text-3xl">{titre}</h2>
      {texte && <p className="mt-2 text-encre/70">{texte}</p>}
    </div>
  );
}

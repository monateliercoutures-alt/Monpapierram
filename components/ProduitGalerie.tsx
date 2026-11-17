"use client";

import { useState } from "react";
import Image from "next/image";

/** Galerie de la page produit : grande photo + vignettes cliquables */
export default function ProduitGalerie({ images }: { images: { src: string; alt: string }[] }) {
  const [i, setI] = useState(0);
  const actuelle = images[i];

  return (
    <div>
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-carte border border-profond/15 bg-white">
        <Image src={actuelle.src} alt={actuelle.alt} fill priority={i === 0} sizes="(min-width: 1024px) 560px, 100vw" className="object-contain p-2" />
      </div>
      <ul className="mt-3 grid grid-cols-4 gap-3" aria-label="Autres photos du produit">
        {images.map((im, k) => (
          <li key={im.src}>
            <button
              type="button"
              onClick={() => setI(k)}
              aria-label={`Voir la photo ${k + 1}`}
              aria-current={k === i}
              className={`relative block aspect-[4/3] w-full overflow-hidden rounded-bouton border bg-white ${k === i ? "border-profond ring-1 ring-profond" : "border-profond/20 hover:border-profond/60"}`}
            >
              <Image src={im.src} alt="" fill sizes="140px" className="object-contain p-1" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

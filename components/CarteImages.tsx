"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

/**
 * Image d'une carte produit avec deux photos : on passe de l'une à l'autre avec
 * les boutons ronds (clic ou toucher), ou au survol sur ordinateur.
 */
export default function CarteImages({
  href,
  nom,
  images,
  badge,
}: {
  href: string;
  nom: string;
  images: { src: string; alt: string }[];
  badge?: string;
}) {
  const [i, setI] = useState(0);
  const deux = images.slice(0, 2);

  return (
    <div className="group relative aspect-[4/3] w-full bg-white">
      <Link href={href} className="absolute inset-0 block" aria-label={`Voir le produit : ${nom}`}>
        {deux.map((im, k) => (
          <Image
            key={im.src}
            src={im.src}
            alt={k === 0 ? im.alt : ""}
            fill
            sizes="(min-width: 1024px) 370px, (min-width: 640px) 50vw, 100vw"
            loading="lazy"
            aria-hidden={k !== 0 ? true : undefined}
            className={`object-contain p-2 transition-opacity duration-300 motion-reduce:transition-none ${
              k === i ? "opacity-100" : "opacity-0"
            } ${k === 1 ? "group-hover:opacity-100 sm:[&]:group-hover:opacity-100" : ""} ${k === 0 && i === 0 ? "sm:group-hover:opacity-0" : ""}`}
          />
        ))}
      </Link>
      {badge && <span className="absolute left-3 top-3 rounded bg-profond px-2 py-1 text-xs font-semibold text-white">{badge}</span>}
      {deux.length > 1 && (
        <div className="absolute inset-x-0 bottom-1 flex justify-center">
          {deux.map((_, k) => (
            <button
              key={k}
              type="button"
              onClick={() => setI(k)}
              aria-label={`Photo ${k + 1} sur ${deux.length} : ${nom}`}
              aria-current={i === k}
              className="flex h-9 w-9 items-center justify-center"
            >
              <span className={`block rounded-full ${i === k ? "h-2.5 w-2.5 bg-profond" : "h-2 w-2 bg-profond/30"}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import { ETAPES } from "@/lib/config";

const N = ETAPES.length;
// Demi-largeur (en fraction de progression) du fondu enchaîné, centré sur la frontière
// entre deux étapes : l'image reste nette et pleine 70 % du temps, le fondu est bref.
const FONDU = 0.15 / N;

/**
 * Points de passage (progression 0 → 1) d'une étape et valeurs associées.
 * Les offsets restent dans [0, 1] et croissants : la première étape est
 * pleine dès le départ, la dernière reste pleine jusqu'à la fin.
 */
function courbe(i: number, plein: number, absent: number): { entree: number[]; sortie: number[] } {
  const debut = i / N;
  const fin = (i + 1) / N;
  const entree: number[] = [];
  const sortie: number[] = [];
  if (i > 0) {
    entree.push(debut - FONDU, debut + FONDU);
    sortie.push(absent, plein);
  }
  if (i < N - 1) {
    entree.push(fin - FONDU, fin + FONDU);
    sortie.push(plein, absent);
  }
  if (i === 0) {
    entree.unshift(0);
    sortie.unshift(plein);
  }
  if (i === N - 1) {
    entree.push(1);
    sortie.push(plein);
  }
  return { entree, sortie };
}

/**
 * Courbe des légendes : le texte sortant disparaît complètement avant que le
 * suivant n'apparaisse (aucune superposition de textes).
 */
function courbeTexte(i: number, plein: number, absent: number): { entree: number[]; sortie: number[] } {
  const debut = i / N;
  const fin = (i + 1) / N;
  const T = Math.min(0.035, 0.28 / N); // la transition se raccourcit quand il y a beaucoup d'étapes
  const entree: number[] = [];
  const sortie: number[] = [];
  if (i === 0) {
    entree.push(0);
    sortie.push(plein);
  } else {
    entree.push(debut + T * 0.5, debut + T * 1.5);
    sortie.push(absent, plein);
  }
  if (i < N - 1) {
    entree.push(fin - T * 1.5, fin - T * 0.5);
    sortie.push(plein, absent);
  } else {
    entree.push(1);
    sortie.push(plein);
  }
  return { entree, sortie };
}

/** Plage de progression pendant laquelle l'image bouge (zoom et glissement) */
function plage(i: number): number[] {
  return [Math.max(0, i / N - FONDU), Math.min(1, (i + 1) / N + FONDU)];
}

/** Une image du montage : opacité, zoom et glissement pilotés par le scroll */
function Calque({
  index,
  progression,
}: {
  index: number;
  progression: MotionValue<number>;
}) {
  const etape = ETAPES[index];
  const c = courbe(index, 1, 0);
  const p = plage(index);

  // Fondu enchaîné entre les images
  const opacity = useTransform(progression, c.entree, c.sortie);
  // Léger zoom au fil de l'étape
  const scale = useTransform(progression, p, [1, 1.03]);
  // Léger glissement horizontal, alterné selon l'étape
  const sens = index % 2 === 0 ? 1 : -1;
  const x = useTransform(progression, p, [`${1 * sens}%`, `${-1 * sens}%`]);

  return (
    <motion.div className="absolute inset-0 will-change-transform" style={{ opacity, scale, x }}>
      <Image
        src={etape.image}
        alt={etape.alt}
        fill
        sizes="100vw"
        className="object-contain p-4 sm:p-6"
        loading="lazy"
      />
    </motion.div>
  );
}

/** Texte d'une étape (titre + phrase) : apparaît et disparaît avec le scroll */
function Legende({
  index,
  progression,
}: {
  index: number;
  progression: MotionValue<number>;
}) {
  const etape = ETAPES[index];
  const c = courbeTexte(index, 1, 0);
  const opacity = useTransform(progression, c.entree, c.sortie);
  // Le texte monte légèrement en entrant et en sortant
  const cy = courbeTexte(index, 0, 14);
  const y = useTransform(progression, cy.entree, cy.sortie);

  return (
    <motion.div className="col-start-1 row-start-1" style={{ opacity, y }}>
      <p className="mb-2 text-xs font-semibold text-profond">
        Étape {index + 1} / {N}
      </p>
      <h3 className="text-2xl font-bold text-nuit sm:text-4xl">{etape.titre}</h3>
      <p className="mt-2 max-w-xl text-sm text-encre/75 sm:text-base">{etape.phrase}</p>
    </motion.div>
  );
}

/**
 * Montage « vidéo » piloté par le défilement :
 * section de hauteur proportionnelle au nombre d'étapes (75vh par étape) avec un conteneur sticky de 100vh.
 * Avec prefers-reduced-motion, les 4 images s'empilent sans animation.
 */
export default function ScrollMontage() {
  const section = useRef<HTMLElement>(null);
  const [actif, setActif] = useState(0);

  // Progression 0 → 1 du scroll à travers la section
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end end"],
  });

  // Barre de progression en haut
  const barre = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Étape active (pour les points)
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setActif(Math.min(N - 1, Math.max(0, Math.floor(p * N))));
  });

  /** Clic sur un point : défile jusqu'au milieu de l'étape */
  function allerA(i: number) {
    const el = section.current;
    if (!el) return;
    const haut = el.getBoundingClientRect().top + window.scrollY;
    const course = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: haut + course * ((i + 0.5) / N), behavior: "smooth" });
  }

  return (
    <section
      id="montage"
      ref={section}
      aria-label="Présentation du produit en 4 étapes"
      style={{ height: `${Math.max(300, N * 80)}vh` }}
      className="relative bg-white motion-reduce:h-auto!"
    >
      {/* Version animée (masquée si mouvement réduit) */}
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden bg-white motion-reduce:hidden">
        {/* Barre de progression fine */}
        <div className="absolute inset-x-0 top-0 z-20 h-1 bg-profond/10" aria-hidden="true">
          <motion.div className="h-full origin-left bg-profond" style={{ scaleX: barre }} />
        </div>

        {/* Zone des images */}
        <div className="relative mt-[7.6rem] flex-1 sm:mt-[9.1rem]">
          {ETAPES.map((_, i) => (
            <Calque key={i} index={i} progression={scrollYProgress} />
          ))}
        </div>

        {/* Légende et points d'étape en bas de l'écran */}
        <div className="relative z-10 border-t border-profond/10 bg-white/95 px-4 pb-5 pt-2 sm:px-6">
          <div className="mx-auto max-w-6xl">
            {/* Points d'étape */}
            <div className="-ml-2.5 flex sm:-ml-3.5" role="group" aria-label="Étapes">
              {ETAPES.map((e, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => allerA(i)}
                  aria-label={`Aller à l'étape ${i + 1} : ${e.titre}`}
                  aria-current={actif === i ? "step" : undefined}
                  className="group flex h-11 w-8 items-center justify-center sm:w-11"
                >
                  <span
                    className={`block rounded-full transition-all motion-reduce:transition-none ${
                      actif === i ? "h-3 w-3 bg-profond" : "h-2 w-2 bg-profond/25 group-hover:bg-profond/60"
                    }`}
                  />
                </button>
              ))}
            </div>
            {/* Textes superposés, un seul visible à la fois */}
            <div className="grid min-h-[8.5rem] pr-16 sm:min-h-[7.5rem] sm:pr-0">
              {ETAPES.map((_, i) => (
                <Legende key={i} index={i} progression={scrollYProgress} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Version sans animation : les 4 images les unes sous les autres */}
      <div className="hidden bg-white px-4 py-16 motion-reduce:block sm:px-6">
        <div className="mx-auto flex max-w-3xl flex-col gap-14">
          {ETAPES.map((e, i) => (
            <figure key={i}>
              <div className="relative aspect-[4/3] w-full">
                <Image src={e.image} alt={e.alt} fill sizes="(min-width: 768px) 768px, 100vw" className="object-contain" loading="lazy" />
              </div>
              <figcaption className="mt-4">
                <p className="text-xs font-semibold text-profond">
                  Étape {i + 1} / {N}
                </p>
                <h3 className="mt-1 text-2xl font-bold text-nuit">{e.titre}</h3>
                <p className="mt-1 text-encre/75">{e.phrase}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

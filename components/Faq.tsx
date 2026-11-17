"use client";

import { useState } from "react";
import { FAQ } from "@/lib/config";

// Accordéon accessible : boutons avec aria-expanded / aria-controls
export default function Faq() {
  const [ouvert, setOuvert] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-white px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-profond">FAQ</p>
          <h2 className="mt-3 text-3xl font-bold text-nuit sm:text-4xl">Questions fréquentes</h2>
        </div>

        <div className="mt-12 divide-y divide-profond/10 rounded-carte border border-profond/15">
          {FAQ.map((item, i) => {
            const estOuvert = ouvert === i;
            return (
              <div key={item.q}>
                <h3>
                  <button
                    type="button"
                    id={`faq-btn-${i}`}
                    aria-expanded={estOuvert}
                    aria-controls={`faq-panneau-${i}`}
                    onClick={() => setOuvert(estOuvert ? null : i)}
                    className="flex min-h-14 w-full items-center justify-between gap-4 px-5 py-4 text-left font-sans text-base font-semibold text-nuit"
                  >
                    {item.q}
                    <svg
                      viewBox="0 0 24 24"
                      className={`h-5 w-5 shrink-0 text-profond transition-transform motion-reduce:transition-none ${estOuvert ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                </h3>
                <div
                  id={`faq-panneau-${i}`}
                  role="region"
                  aria-labelledby={`faq-btn-${i}`}
                  hidden={!estOuvert}
                  className="px-5 pb-5 text-sm text-encre/80 sm:text-base"
                >
                  {item.r}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

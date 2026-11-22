"use client";

import { useEffect, useState } from "react";

type EvenementInstall = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };

/**
 * Transforme le site en application : enregistre le service worker (ouverture rapide, mode hors ligne)
 * et propose d'installer l'application sur l'écran d'accueil (téléphone).
 */
export default function EnregistrerApp() {
  const [install, setInstall] = useState<EvenementInstall | null>(null);
  const [ios, setIos] = useState(false);
  const [ferme, setFerme] = useState(true);

  useEffect(() => {
    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      navigator.serviceWorker.register("/sw.js", { scope: "/", updateViaCache: "none" }).catch(() => {});
    }

    let dejaInstalle = false;
    let refuse = false;
    try {
      refuse = localStorage.getItem("mpr-install-ferme") === "1";
    } catch {}
    dejaInstalle = window.matchMedia("(display-mode: standalone)").matches || (navigator as unknown as { standalone?: boolean }).standalone === true;
    if (refuse || dejaInstalle) return;

    const surIos = /iphone|ipad|ipod/i.test(navigator.userAgent) && !/crios|fxios/i.test(navigator.userAgent);
    if (surIos) {
      setIos(true);
      setFerme(false);
    }

    const avantInstall = (e: Event) => {
      e.preventDefault();
      setInstall(e as EvenementInstall);
      setFerme(false);
    };
    window.addEventListener("beforeinstallprompt", avantInstall);
    return () => window.removeEventListener("beforeinstallprompt", avantInstall);
  }, []);

  function fermer() {
    setFerme(true);
    try {
      localStorage.setItem("mpr-install-ferme", "1");
    } catch {}
  }

  async function installer() {
    if (!install) return;
    await install.prompt();
    await install.userChoice.catch(() => null);
    setInstall(null);
    fermer();
  }

  if (ferme || (!install && !ios)) return null;

  return (
    <div role="region" aria-label="Installer l'application" className="fixed inset-x-3 bottom-[4.75rem] z-[45] flex items-center gap-3 rounded-carte border border-profond/20 bg-white p-3 shadow-lg md:hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/icon-192.png" alt="" width={44} height={44} className="h-11 w-11 shrink-0 rounded-lg" />
      <p className="min-w-0 flex-1 text-xs leading-snug text-encre/85">
        <strong className="block text-sm text-nuit">Installer l&apos;application Monpapierrame</strong>
        {install ? "Commandez plus vite depuis votre écran d'accueil." : "Touchez Partager puis « Sur l'écran d'accueil »."}
      </p>
      {install && (
        <button type="button" onClick={installer} className="inline-flex min-h-11 shrink-0 items-center rounded-bouton bg-profond px-4 text-sm font-semibold text-white">
          Installer
        </button>
      )}
      <button type="button" onClick={fermer} aria-label="Fermer" className="inline-flex h-11 w-9 shrink-0 items-center justify-center text-lg text-encre/60">
        ×
      </button>
    </div>
  );
}

import Link from "next/link";
import BarreInfo from "@/components/BarreInfo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { PRODUITS, formatPrix } from "@/lib/config";

// Page 404 aux couleurs du site : on propose les produits plutôt qu'une impasse
export default function NotFound() {
  return (
    <>
      <BarreInfo />
      <Header />
      <main id="contenu" className="bg-white px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-titre text-5xl font-bold text-profond">404</p>
          <h1 className="mt-4 text-2xl font-bold text-nuit sm:text-3xl">Cette page n&apos;existe pas</h1>
          <p className="mx-auto mt-3 max-w-xl text-encre/75">
            L&apos;adresse est peut-être incorrecte ou la page a été déplacée. Retrouvez nos produits ci-dessous.
          </p>
          <ul className="mt-8 grid gap-3 text-left sm:grid-cols-3">
            {PRODUITS.map((p) => (
              <li key={p.id}>
                <Link href={`/produits/${p.slug}`} className="block h-full rounded-carte border border-profond/15 p-4 hover:border-profond">
                  <span className="block text-sm font-bold text-nuit">{p.nom}</span>
                  <span className="mt-1 block text-sm text-encre/70">
                    {formatPrix(p.prix)} {p.unite}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/" className="mt-8 inline-flex min-h-12 items-center rounded-bouton bg-profond px-7 font-semibold text-white hover:bg-nuit">
            Retour à l&apos;accueil
          </Link>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

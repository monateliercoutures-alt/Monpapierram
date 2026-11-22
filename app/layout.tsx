import type { Metadata, Viewport } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import { PRODUITS, SEO_ACCUEIL, SITE, meta } from "@/lib/config";
import PanierProvider from "@/components/PanierContext";
import RetourEnHaut from "@/components/RetourEnHaut";
import BarreMobile from "@/components/BarreMobile";
import EnregistrerApp from "@/components/EnregistrerApp";

// Police des titres : Montserrat (600, 700 et 800), proche de la typographie du logo
const titre = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
  variable: "--font-titre",
});

// Police du texte : Inter (400, 500 et 600)
const texte = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-texte",
});

const TITRE = SEO_ACCUEIL.titre;
const DESCRIPTION = meta(SEO_ACCUEIL.description, PRODUITS[0].prix);

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: TITRE,
  description: DESCRIPTION,
  keywords: [
    "fournisseur papier rame Double A Paper One Globulus",
    "papier rame Paper Pro",
    "papier rame Authentik",
    "papier rame Paper One",
    "papier rame Globulus",
    "grossiste papier rame",
    "grossiste papier A4 Abidjan",
    "grossiste papier rame Côte d'Ivoire",
    "papier rame",
    "papier rame A4",
    "ramette papier A4",
    "papier A4 80g",
    "papier A4 Abidjan",
    "papier A4 Côte d'Ivoire",
    "fournisseur papier A4 Côte d'Ivoire",
    "papier A4 Bouaké",
    "papier A4 Yamoussoukro",
    "rame de papier A4",
    "carton papier A4",
    "papier A4 en gros",
    "papier d'impression A4",
    "papier photocopie A4",
    "Double A Côte d'Ivoire",
    "fournitures de bureau Abidjan",
    "papier rame Smart Copy",
    "papier rame Ultima Copy",
    "papier rame Roch",
    "papier rame Aone",
    "papier rame Aria",
    "papier rame Royal Touch",
    "paquet de rame prix",
    "prix paquet de rame papier A4",
    "rame Double A",
    "rame Double A prix",
    "prix rame Double A Abidjan",
    "feuille A4",
    "feuille A4 prix Abidjan",
    "grossiste papier rame Abidjan",
    "prix rame de papier A4 Côte d'Ivoire",
    "prix carton papier A4 Abidjan",
    "vente de papier rame Abidjan",
    "où acheter papier rame Abidjan",
    "rame papier A4 Cocody",
    "papier A4 Yopougon",
    "papier A4 Marcory",
    "papier A4 San-Pédro",
    "papier A4 Daloa",
    "papier A4 Korhogo",
    "papier A4 pas cher Abidjan",
    "papier rame pour école Côte d'Ivoire",
    "papier rame pour entreprise Abidjan",
    "livraison papier rame Abidjan",
  ],
  alternates: { canonical: "/" },
  applicationName: SITE.nom,
  formatDetection: { telephone: false },
  openGraph: {
    type: "website",
    locale: "fr_CI",
    url: "/",
    siteName: SITE.nom,
    title: TITRE,
    description: DESCRIPTION,
    images: [
      {
        url: "/images/etape-1.jpg",
        width: 1148,
        height: 1049,
        alt: "Carton de 5 ramettes de papier Double A Premium",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITRE,
    description: DESCRIPTION,
    images: ["/images/etape-1.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a2a8f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${titre.variable} ${texte.variable}`}>
      <body className="min-h-screen antialiased">
        <PanierProvider>
          <RetourEnHaut />
          {children}
          <BarreMobile />
          <EnregistrerApp />
        </PanierProvider>
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/config";
import PanierProvider from "@/components/PanierContext";

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

const TITRE = "Monpapierram | Vente de ramettes de papier Double A à Abidjan";
const DESCRIPTION =
  "Ramette papier A4 80g Double A Premium (500 feuilles), carton de 5 ramettes et papier A4 en gros, livrés à Abidjan. Paiement à la livraison, Orange Money, MTN MoMo et Wave. Commande sur WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: TITRE,
  description: DESCRIPTION,
  keywords: [
    "ramette papier A4",
    "papier A4 80g",
    "papier A4 Abidjan",
    "rame de papier A4",
    "carton papier A4",
    "papier A4 en gros",
    "papier d'impression A4",
    "papier photocopie A4",
    "Double A Côte d'Ivoire",
    "fournitures de bureau Abidjan",
  ],
  alternates: { canonical: "/" },
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
        <PanierProvider>{children}</PanierProvider>
      </body>
    </html>
  );
}

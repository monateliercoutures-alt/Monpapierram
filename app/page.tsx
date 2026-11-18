import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Reassurance from "@/components/Reassurance";
import ScrollMontage from "@/components/ScrollMontage";
import Avantages from "@/components/Avantages";
import Produits from "@/components/Produits";
import Comparatif from "@/components/Comparatif";
import Presentation from "@/components/Presentation";
import Guide from "@/components/Guide";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { FAQ, PRODUITS, SITE } from "@/lib/config";

// Données structurées (SEO) : boutique locale + FAQ
const donneesStructurees = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Store", "WholesaleStore"],
      name: SITE.nom,
      alternateName: ["Monpapierram", "Mon papier rame", "Monpapierrame grossiste papier rame"],
      description: "Grossiste et fournisseur de papier rame A4 (Double A, Paper One, Globulus, Paper Pro, Authentik) à Abidjan, livraison partout en Côte d'Ivoire. Vente à l'unité, au carton et en gros dès 10 cartons.",
      brand: [{ "@type": "Brand", name: "Double A" }, { "@type": "Brand", name: "Paper One" }, { "@type": "Brand", name: "Globulus" }, { "@type": "Brand", name: "Paper Pro" }, { "@type": "Brand", name: "Authentik" }],
      url: SITE.url,
      telephone: SITE.whatsappAffiche,
      email: SITE.email,
      areaServed: { "@type": "Country", name: "Côte d'Ivoire" },
      paymentAccepted: "Paiement à la livraison, Orange Money, MTN MoMo, Moov Money, Wave",
      currenciesAccepted: "XOF",
      openingHours: "Mo-Sa 08:00-19:00",
      image: `${SITE.url}/images/etape-1.jpg`,
      priceRange: "FCFA",
    },
    {
      "@type": "ItemList",
      name: "Papier rame A4 : cartons et ramettes",
      itemListElement: PRODUITS.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: p.nom,
        url: `${SITE.url}/produits/${p.slug}`,
      })),
    },
    {
      "@type": "WebSite",
      name: SITE.nom,
      url: SITE.url,
      inLanguage: "fr",
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.r },
      })),
    },
  ],
};

// Assemble toutes les sections de la page
export default function Page() {
  return (
    <>
      <Header />
      <main id="contenu">
        <Hero />
        <Reassurance />
        <Produits />
        <Comparatif />
        <ScrollMontage />
        <Avantages />
        <Presentation />
        <Guide />
        <Faq />
      </main>
      <Footer />
      <WhatsAppButton />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(donneesStructurees) }}
      />
    </>
  );
}

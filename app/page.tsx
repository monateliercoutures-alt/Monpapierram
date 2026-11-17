import BarreInfo from "@/components/BarreInfo";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Reassurance from "@/components/Reassurance";
import ScrollMontage from "@/components/ScrollMontage";
import Avantages from "@/components/Avantages";
import Produits from "@/components/Produits";
import Devis from "@/components/Devis";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { FAQ, PRODUITS, SITE } from "@/lib/config";

// Données structurées (SEO) : boutique locale + FAQ
const donneesStructurees = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Store",
      name: SITE.nom,
      url: SITE.url,
      email: SITE.email,
      telephone: SITE.whatsappAffiche,
      areaServed: "Abidjan, Côte d'Ivoire",
      image: `${SITE.url}/images/etape-1.jpg`,
      priceRange: "FCFA",
      makesOffer: PRODUITS.map((p) => ({
        "@type": "Offer",
        priceCurrency: "XOF",
        price: p.prix,
        itemOffered: { "@type": "Product", name: p.nom, brand: "Double A" },
      })),
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
      <BarreInfo />
      <Header />
      <main id="contenu">
        <Hero />
        <Reassurance />
        <Produits />
        <ScrollMontage />
        <Avantages />
        <Devis />
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

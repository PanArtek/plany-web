import { Nav } from "./(landing)/_sections/nav";
import { Hero } from "./(landing)/_sections/hero";
import { Specjalizacje } from "./(landing)/_sections/specjalizacje";
import { Realizacje } from "./(landing)/_sections/realizacje";
import { Process } from "./(landing)/_sections/process";
import { Stats } from "./(landing)/_sections/stats";
import { Kontakt } from "./(landing)/_sections/kontakt";
import { Footer } from "./(landing)/_sections/footer";
import { HeroCategoryProvider } from "./(landing)/_components/hero-category-provider";
import { StickyCallCTA } from "@/components/sticky-call-cta";
import { CONTACT } from "@/content/landing";

export default function Home() {
  const ldJson = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: CONTACT.companyName,
    legalName: CONTACT.companyFullName,
    description:
      "Generalny wykonawca fit-out: biura, kliniki, edukacja, gastronomia, retail.",
    url: "https://plany.com.pl",
    telephone: CONTACT.phoneE164,
    email: CONTACT.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: CONTACT.street,
      postalCode: CONTACT.postalCode,
      addressLocality: CONTACT.city,
      addressCountry: "PL",
    },
    taxID: CONTACT.nip,
    vatID: `PL${CONTACT.nip}`,
    identifier: [
      { "@type": "PropertyValue", propertyID: "KRS", value: CONTACT.krs },
      { "@type": "PropertyValue", propertyID: "REGON", value: CONTACT.regon },
    ],
    areaServed: "Warszawa",
    priceRange: "100k–10M PLN",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }}
      />
      <Nav />
      <main className="pb-20 md:pb-0">
        <HeroCategoryProvider>
          <Hero />
          <Process />
          <Specjalizacje />
        </HeroCategoryProvider>
        <Realizacje />
        <Stats />
        <Kontakt />
      </main>
      <Footer />
      <StickyCallCTA />
    </>
  );
}

import { Nav } from "./(landing)/_sections/nav";
import { Hero } from "./(landing)/_sections/hero";
import { Specjalizacje } from "./(landing)/_sections/specjalizacje";
import { Realizacje } from "./(landing)/_sections/realizacje";
import { Proces } from "./(landing)/_sections/proces";
import { Stats } from "./(landing)/_sections/stats";
import { Kontakt } from "./(landing)/_sections/kontakt";
import { Footer } from "./(landing)/_sections/footer";
import { StickyCallCTA } from "@/components/sticky-call-cta";

export default function Home() {
  const ldJson = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "PLANY Sp. z o.o.",
    description:
      "Generalny wykonawca fit-out: biura, kliniki, edukacja, gastronomia, retail.",
    url: "https://plany.com.pl",
    telephone: "+48 XXX XXX XXX",
    email: "biuro@plany.com.pl",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Warszawa",
      addressRegion: "Wawer",
      addressCountry: "PL",
    },
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
        <Hero />
        <Specjalizacje />
        <Realizacje />
        <Proces />
        <Stats />
        <Kontakt />
      </main>
      <Footer />
      <StickyCallCTA />
    </>
  );
}

import type { Metadata, Viewport } from "next";
import { Newsreader, Plus_Jakarta_Sans } from "next/font/google";
import { LenisProvider } from "@/components/LenisProvider";
import { CookieBanner } from "@/components/cookie-banner/CookieBanner";
import { AnalyticsGate } from "@/components/cookie-banner/AnalyticsGate";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin", "latin-ext"],
  weight: ["700", "800"],
  variable: "--font-newsreader",
  display: "swap",
  preload: true,
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-jakarta",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://plany.com.pl"),
  title: {
    default: "PLANY — Budowa wnętrz komercyjnych",
    template: "%s · PLANY",
  },
  description:
    "Generalny wykonawca fit-out: biura, kliniki, edukacja, gastronomia, retail. 10 lat, 30 osób, własna ekipa elektryków. Warszawa.",
  keywords: [
    "fit-out Warszawa",
    "wykończenia biur Warszawa",
    "kliniki dentystyczne wykończenia",
    "wykończenia komercyjne",
    "generalny wykonawca Warszawa",
  ],
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: "https://plany.com.pl",
    siteName: "PLANY",
    title: "PLANY — Realizujemy plany. Fit-out Warszawa.",
    description:
      "Budowa wnętrz komercyjnych — jeden zespół, jeden termin, pełna kontrola kosztów.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#0D0B09",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pl"
      className={`${newsreader.variable} ${jakarta.variable} antialiased`}
    >
      <body className="min-h-dvh bg-bg text-text font-sans overflow-x-hidden">
        <a href="#hero" className="skip-link">
          Przejdź do treści
        </a>
        <LenisProvider>{children}</LenisProvider>
        <CookieBanner />
        <AnalyticsGate />
      </body>
    </html>
  );
}

/**
 * Single source of truth for landing page copy.
 * All Polish text lives here. Ready for i18n in Faza 2.
 */

export const NAV_ITEMS = [
  { label: "Specjalizacje", id: "spec" },
  { label: "Realizacje", id: "real" },
  { label: "Proces", id: "proc" },
  { label: "Kontakt", id: "kontakt" },
] as const;

export const HERO = {
  eyebrow: ["Projekt", "PLANY", "Przestrzeń"] as const,
  titleLine1: "Realizujemy",
  titleAccent: "PLANY",
  lead: "Budowa wnętrz komercyjnych — jeden zespół, jeden termin, pełna kontrola kosztów.",
  subLead: "Biura · Medycyna · Edukacja · Gastronomia · Retail · i inne",
  ctaPrimary: "Porozmawiajmy",
  ctaSecondary: "Realizacje ↓",
  stats: [
    { v: "10+", l: "lat doświadczenia" },
    { v: "30", l: "osób w zespole" },
    { v: "200+", l: "zrealizowanych projektów" },
  ],
} as const;

export const SPECS = [
  {
    icon: "Building2",
    tag: "01",
    title: "Biura i przestrzenie komercyjne",
    pts: [
      "Fit-out biur od 100 m² do 5000 m²",
      "Generalny wykonawca i podwykonawca",
      "Współpraca z deweloperami i korporacjami",
      "Realizacje pod klucz — od projektu po odbiór",
    ],
  },
  {
    icon: "HeartPulse",
    tag: "02",
    title: "Kliniki medyczne",
    pts: [
      "Gabinety dentystyczne, kliniki weterynaryjne",
      "Zgodność z normami PN-HD 60364-7-710",
      "Instalacje specjalistyczne — RTG, CT, HVAC",
      "Ochrona radiologiczna i wentylacja sterylna",
    ],
  },
  {
    icon: "UtensilsCrossed",
    tag: "03",
    title: "Lokale gastronomiczne",
    pts: [
      "Restauracje, bary, food halle, kioski",
      "Instalacje wod-kan, wentylacja kuchenna",
      "Posadzki przemysłowe i okładziny",
      "Odbiory sanepid i PPOŻ",
    ],
  },
  {
    icon: "GraduationCap",
    tag: "04",
    title: "Obiekty edukacyjne",
    pts: [
      "Szkoły prywatne i przedszkola",
      "Bezpieczeństwo pożarowe, normy WT",
      "Ergonomia przestrzeni dla dzieci",
      "Trwałe materiały odporne na eksploatację",
    ],
  },
] as const;

export type SpecIcon = (typeof SPECS)[number]["icon"];

export const PROJECTS = [
  {
    name: "Star Dental",
    loc: "Marynarska Point 2",
    area: "310 m²",
    cat: "Kliniki",
    grad: "linear-gradient(135deg,#1a1612,#2a1f18,#1c1410)",
  },
  {
    name: "PGE",
    loc: "ul. Ogrodowa 59A",
    area: "450 m²",
    cat: "Biura",
    grad: "linear-gradient(135deg,#12141a,#181c24,#101318)",
  },
  {
    name: "LUXVET",
    loc: "ul. Ostródzka",
    area: "280 m²",
    cat: "Kliniki",
    grad: "linear-gradient(135deg,#141a16,#1a2420,#101812)",
  },
  {
    name: "Hala Koszyki",
    loc: "Crazy Butcher",
    area: "290 m²",
    cat: "Komercyjne",
    grad: "linear-gradient(135deg,#1a1616,#241a1a,#181010)",
  },
  {
    name: "R34 Notariusz",
    loc: "ul. Rzymowskiego 34",
    area: "150 m²",
    cat: "Biura",
    grad: "linear-gradient(135deg,#16161a,#1c1c24,#121218)",
  },
  {
    name: "Szkoła Montessori",
    loc: "Wawer",
    area: "400 m²",
    cat: "Edukacja",
    grad: "linear-gradient(135deg,#181a14,#20241a,#141810)",
  },
] as const;

export const STEPS = [
  {
    n: "01",
    icon: "MessageSquare",
    t: "Konsultacja",
    d: "Bezpłatna wizja lokalna, analiza potrzeb, wstępna wycena w 48h.",
  },
  {
    n: "02",
    icon: "Ruler",
    t: "Projekt",
    d: "Harmonogram, kosztorys szczegółowy, dobór materiałów i podwykonawców.",
  },
  {
    n: "03",
    icon: "HardHat",
    t: "Realizacja",
    d: "Własna ekipa 30 osób + sprawdzeni podwykonawcy. Nadzór dzienny.",
  },
  {
    n: "04",
    icon: "ClipboardCheck",
    t: "Odbiór",
    d: "Dokumentacja powykonawcza, protokoły, gwarancja i serwis.",
  },
] as const;

export type StepIcon = (typeof STEPS)[number]["icon"];

export const STATS = [
  { end: 10, sfx: "+", unit: "lat", lbl: "doświadczenia" },
  { end: 30, sfx: "", unit: "", lbl: "specjalistów w zespole" },
  { end: 200, sfx: "+", unit: "", lbl: "ukończonych projektów" },
  { end: 10, sfx: "M", unit: "PLN", lbl: "wartość projektu" },
] as const;

export const PTYPES = [
  "Biuro",
  "Klinika dentystyczna",
  "Klinika weterynaryjna",
  "Szkoła / przedszkole",
  "Gastronomia",
  "Inne",
] as const;

export const AREAS = [
  "< 100 m²",
  "100–300 m²",
  "300–1000 m²",
  "1000–5000 m²",
  "> 5000 m²",
] as const;

export const CONTACT = {
  address: "Warszawa, dzielnica Wawer",
  phone: "+48 XXX XXX XXX",
  phoneTel: "+48000000000",
  email: "biuro@plany.com.pl",
  description:
    "Fit-out komercyjny — biura, kliniki, szkoły. Od konsultacji po klucz.",
} as const;

export const FOOTER = {
  copyright: "© 2026 PLANY Sp. z o.o.",
  nip: "NIP: XXX-XXX-XX-XX",
  krs: "KRS: XXXXXXXXXX",
} as const;

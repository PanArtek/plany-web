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

/** Eyebrow used inside Nav (logo button) */
export const NAV_EYEBROW = ["Pomysł", "PLANY", "Przestrzeń"] as const;

export const HERO = {
  titleLine1: "Realizujemy",
  titleAccent: "PLANY",
  lead: "Budowa wnętrz komercyjnych — jeden zespół, jeden termin, pełna kontrola kosztów.",
  specRotator: [
    "Medycyna",
    "Edukacja",
    "Gastronomia",
    "Retail",
    "Biura",
    "Inne +",
  ] as const,
  ctaPrimary: "Szybka wycena",
  ctaSecondary: "Realizacje ↓",
  stats: [
    { v: "10+", l: "lat doświadczenia" },
    { v: "30", l: "osób w zespole" },
    { v: "200+", l: "zrealizowanych projektów" },
  ],
} as const;

export const SPEC_TITLE_LINES = ["Każda branża", "ma swoje PLANY."] as const;

export const SPECS = [
  {
    icon: "GraduationCap",
    tag: "01",
    title: "Placówki oświatowe",
    pts: [
      "Realizacje dla operatorów szkół i przedszkoli prywatnych",
      "Materiały atestowane, zgodne z wymaganiami dla obiektów dziecięcych",
      "Prace prowadzone w przerwach semestralnych i wakacjach",
      "Pełna dokumentacja techniczna i atestowa do odbioru",
    ],
  },
  {
    icon: "Stethoscope",
    tag: "02",
    title: "Kliniki stomatologiczne i medyczne",
    pts: [
      "Portfel zrealizowanych obiektów medycznych",
      "Instalacje pod sprzęt diagnostyczny i zabiegowy",
      "Pełna zgodność z wymogami sanitarno-epidemiologicznymi",
      "Koordynacja z projektantami branżowymi i inwestorem",
    ],
  },
  {
    icon: "PawPrint",
    tag: "03",
    title: "Kliniki weterynaryjne",
    pts: [
      "Realizacje gabinetów, lecznic i klinik z hospitalizacją",
      "Instalacje pod tomografy i sprzęt diagnostyczny",
      "Strefy hospitalizacji, zabiegowe i pomieszczenia czyste",
      "Doświadczenie z sieciami weterynaryjnymi w Polsce",
    ],
  },
  {
    icon: "Pill",
    tag: "04",
    title: "Apteki",
    pts: [
      "Realizacje aptek otwartych i punktów aptecznych",
      "Pomieszczenia recepturowe i magazynowe zgodne z prawem farmaceutycznym",
      "Procedury odbiorowe Wojewódzkiego Inspektoratu Farmaceutycznego",
      "Doświadczenie z sieciami i aptekami niezależnymi",
    ],
  },
  {
    icon: "Building2",
    tag: "05",
    title: "Biura i przestrzenie korporacyjne",
    pts: [
      "Realizacje od stu do pięciu tysięcy metrów kwadratowych",
      "Generalne wykonawstwo lub wybrane branże",
      "Stała obsługa funduszy i deweloperów komercyjnych",
      "Harmonogram i budżet potwierdzone umową",
    ],
  },
  {
    icon: "Users",
    tag: "06",
    title: "Coworking i przestrzenie elastyczne",
    pts: [
      "Realizacje dla operatorów biur serwisowanych",
      "Strefy ciche, pokoje rozmów i open space w jednym obiekcie",
      "Instalacje pod elastyczne aranżacje i częste zmiany",
      "Tempo dopasowane do harmonogramu komercjalizacji",
    ],
  },
  {
    icon: "UtensilsCrossed",
    tag: "07",
    title: "Lokale gastronomiczne",
    pts: [
      "Realizacje dla restauracji, kawiarni i food courtów",
      "Zaplecze techniczne i część gościnna w jednym kontrakcie",
      "Procedury odbiorowe sanepidu i straży pożarnej po naszej stronie",
      "Tempo realizacji dopasowane do daty otwarcia",
    ],
  },
  {
    icon: "ShoppingBag",
    tag: "08",
    title: "Retail i sieci handlowe",
    pts: [
      "Realizacje dla sieci handlowych i marek własnych",
      "Wdrożenia zgodne ze standardami książek marki",
      "Prace nocne, bez wpływu na funkcjonowanie centrum",
      "Koordynacja z administracją galerii i najemcami",
    ],
  },
  {
    icon: "Sparkles",
    tag: "09",
    title: "Salony beauty i SPA",
    pts: [
      "Realizacje salonów kosmetycznych, fryzjerskich i obiektów SPA",
      "Instalacje wod-kan, wentylacja i odpływy techniczne",
      "Materiały odporne na wilgoć i środki dezynfekujące",
      "Doświadczenie z sieciami i markami premium",
    ],
  },
  {
    icon: "Dumbbell",
    tag: "10",
    title: "Obiekty sportowe i fitness",
    pts: [
      "Realizacje siłowni, klubów fitness i studiów treningowych",
      "Posadzki sportowe, wzmocnienia konstrukcyjne, akustyka",
      "Instalacje wentylacyjne i klimatyzacyjne dużej wydajności",
      "Doświadczenie z sieciami fitness i obiektami autorskimi",
    ],
  },
  {
    icon: "Scale",
    tag: "11",
    title: "Kancelarie i biura prawne",
    pts: [
      "Realizacje kancelarii prawnych, notarialnych i doradczych",
      "Pokoje rozmów z izolacją akustyczną",
      "Strefy reprezentacyjne i archiwa zgodne z wymaganiami",
      "Wykończenia premium dopasowane do charakteru zawodu",
    ],
  },
  {
    icon: "BedDouble",
    tag: "12",
    title: "Hotele i apartamenty",
    pts: [
      "Realizacje hoteli, apart-hoteli i obiektów krótkiego najmu",
      "Pokoje, lobby, restauracje i zaplecze w jednym kontrakcie",
      "Koordynacja z operatorem i marką hotelową",
      "Prace etapowe bez zamykania całego obiektu",
    ],
  },
] as const;

export type SpecIcon = (typeof SPECS)[number]["icon"];

export const REAL_TITLE = "Zrealizowane PLANY" as const;

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

export const PROCES_KICKER_LINES = [
  "Wielkie PLANY",
  "zaczynają się tu.",
] as const;

export const PROCES_TITLE_LINES = [
  "Twoje ryzyko maleje",
  "z każdym krokiem.",
] as const;

export const PROCES_INTRO =
  "Pięć kroków, jeden zespół, jedna odpowiedzialność — od wyceny po serwis pogwarancyjny.";

export const STEPS = [
  {
    n: "01",
    icon: "Search",
    t: "Weryfikacja zakresu i kosztu",
    sub: "2–5 dni",
    d: "Wizja lokalna, pomiary, kalkulacja. W 48h gotowa wycena rozbita pozycyjnie.",
  },
  {
    n: "02",
    icon: "FileText",
    t: "Zamknięty kosztorys i harmonogram",
    sub: "5–10 dni",
    d: "Wszystko ustalone, zanim ekipa wejdzie na budowę. Kosztorys pozycja po pozycji, harmonogram z datami, jasny zakres prac.",
  },
  {
    n: "03",
    icon: "HardHat",
    t: "Realizacja własnymi ekipami",
    sub: "8–16 tyg.",
    d: "30 osób na stałe, 10 elektryków, zintegrowani podwykonawcy z którymi pracujemy od lat. Na budowie zawsze kierownik z naszej strony — jeden człowiek, jedna odpowiedzialność.",
  },
  {
    n: "04",
    icon: "ClipboardCheck",
    t: "Odbiór z dokumentacją",
    sub: "1–3 dni",
    d: "Dokumentacja powykonawcza, protokoły odbiorów, gwarancja. Komplet papierów do każdego urzędu, który będzie sprawdzał — Sanepid, straż pożarna, nadzór budowlany.",
  },
  {
    n: "05",
    icon: "LifeBuoy",
    t: "Serwis gwarancyjny",
    sub: "ciągłość",
    d: "Serwis gwarancyjny i pogwarancyjny realizowany przez własny zespół techniczny. Czas reakcji 48h. Stałe warunki współpracy dla klientów wielolokalowych.",
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

export const KONTAKT_TITLE_LINES = [
  "Opowiedz nam",
  "swoje PLANY.",
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

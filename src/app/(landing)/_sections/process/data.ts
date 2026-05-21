import type { ProcessStep } from "./types";

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: "konsultacja",
    num: "01",
    label: "Konsultacja",
    duration: "2–5 dni",
    title: "Weryfikacja zakresu",
    titleEm: "i kosztu",
    deliverable:
      "Wizja lokalna, pomiary, kalkulacja. W 48h gotowa wycena rozbita pozycyjnie.",
    body: "Spotykamy się u Ciebie lub w lokalu. Mierzymy, fotografujemy, dopytujemy. Bez prezentacji w PowerPoincie — wychodzimy z notatnikiem pełnym konkretów i wracamy z liczbami.",
    proof: [
      "Wizja lokalna w 48h od zgłoszenia",
      "Pierwsza wycena bezpłatna",
    ],
    caseLabel: "LUXVET",
    caseLink: "#real",
    image: "/process/etap-01.webp",
  },
  {
    id: "dokumentacja",
    num: "02",
    label: "Dokumentacja",
    duration: "5–10 dni",
    title: "Zamknięty kosztorys",
    titleEm: "i harmonogram",
    deliverable: "Wszystko ustalone, zanim ekipa wejdzie na budowę.",
    body: "Kosztorys pozycja po pozycji — widzisz każdą stawkę robocizny i każdą cenę materiału. Harmonogram z datami, jasny zakres prac, marża wpisana jawnie. Negocjujesz pozycję po pozycji albo akceptujesz w całości.",
    proof: [
      "Kosztorys otwarty — pozycja po pozycji",
      "Stałe ceny, bez ryzyka kursowego",
    ],
    caseLabel: "Star Dental",
    caseLink: "#real",
  },
  {
    id: "budowa",
    num: "03",
    label: "Budowa",
    duration: "8–16 tyg.",
    title: "Realizacja",
    titleEm: "własnymi ekipami",
    deliverable:
      "30 osób na stałe, 10 elektryków, zintegrowani podwykonawcy z którymi pracujemy od lat.",
    body: "Na budowie zawsze kierownik z naszej strony — jeden człowiek, jedna odpowiedzialność. Bez ekip z ulicy, bez tłumaczeń \u201Cktoś nie przyjechał\u201D. Tygodniowe raporty fotograficzne i harmonogram online.",
    proof: [
      "10 elektryków in-house",
      "Stali podwykonawcy od 10+ lat",
      "Tygodniowy raport ze zdjęciami",
    ],
    caseLabel: "Hala Koszyki",
    caseLink: "#real",
  },
  {
    id: "odbior",
    num: "04",
    label: "Odbiór",
    duration: "1–3 dni",
    title: "Odbiór",
    titleEm: "z dokumentacją",
    deliverable:
      "Dokumentacja powykonawcza, protokoły odbiorów, gwarancja.",
    body: "Komplet papierów do każdego urzędu, który będzie sprawdzał — Sanepid, straż pożarna, nadzór budowlany. Sprzątamy. Listę usterek robimy z Tobą, nie przed Tobą. Wszystko działa zanim podpiszesz.",
    proof: [
      'Brak listy "wykonamy po odbiorze"',
      "Pełna dokumentacja powykonawcza",
    ],
    caseLabel: "PGE Ogrodowa",
    caseLink: "#real",
  },
  {
    id: "serwis",
    num: "05",
    label: "Serwis",
    duration: "ciągłość",
    title: "Serwis",
    titleEm: "gwarancyjny",
    deliverable:
      "Serwis gwarancyjny i pogwarancyjny realizowany przez własny zespół techniczny.",
    body: "Czas reakcji 48h. Stałe warunki współpracy dla klientów wielolokalowych. Ten sam kierownik odbiera telefon rok po odbiorze — bez przerzucania na podwykonawców.",
    proof: [
      "Reakcja w 48h",
      "Stałe warunki dla sieci",
      "Jeden kontakt na lata",
    ],
    caseLink: "#kontakt",
  },
] satisfies ProcessStep[];

export const TOTAL_STEPS = PROCESS_STEPS.length;

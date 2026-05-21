export type HeroCategoryName =
  | "Medycyna"
  | "Edukacja"
  | "Gastronomia"
  | "Biura";

export type HeroCategory = {
  name: HeroCategoryName;
  slug: string;
  image: string | null;
  grad: string;
};

export const HERO_CATEGORIES: readonly HeroCategory[] = [
  {
    name: "Medycyna",
    slug: "medycyna",
    image: "/hero/medycyna.jpg",
    grad: "linear-gradient(135deg,#0D0B09 0%,#1C1814 45%,#0F0D0B 100%)",
  },
  {
    name: "Edukacja",
    slug: "edukacja",
    image: "/hero/realization-edukacja.png",
    grad: "linear-gradient(135deg,#181A14,#20241A,#141810)",
  },
  {
    name: "Gastronomia",
    slug: "gastronomia",
    image: "/hero/gastronomia.jpg",
    grad: "linear-gradient(135deg,#1A1614 0%,#241A14 45%,#16100C 100%)",
  },
  {
    name: "Biura",
    slug: "biura",
    image: "/hero/biura.jpg",
    grad: "linear-gradient(135deg,#12141A 0%,#181C24 45%,#101318 100%)",
  },
] as const;

export const HERO_CATEGORY_NAMES: readonly HeroCategoryName[] =
  HERO_CATEGORIES.map((c) => c.name);

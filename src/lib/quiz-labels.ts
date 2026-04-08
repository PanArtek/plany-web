import type {
  QuizAreaId,
  QuizIndustryId,
  QuizConditionId,
  QuizStandardId,
  QuizLocationId,
} from "@/content/landing";

export const AREA_LABELS: Record<QuizAreaId, string> = {
  do100: "do 100 m²",
  "100-300": "100 – 300 m²",
  "300-1000": "300 – 1000 m²",
  "1000plus": "powyżej 1000 m²",
};

export const INDUSTRY_LABELS: Record<QuizIndustryId, string> = {
  medyczna: "Medyczna (dent / wet / med)",
  edukacja: "Edukacja",
  gastro: "Gastronomia",
  retail: "Retail",
  biuro: "Biuro",
  inne: "Inne",
};

export const CONDITION_LABELS: Record<QuizConditionId, string> = {
  surowy: "Surowy / shell & core",
  "po-najemcy": "Po poprzednim najemcy",
  remont: "Do remontu generalnego",
};

export const STANDARD_LABELS: Record<QuizStandardId, string> = {
  funkcjonalny: "Funkcjonalny",
  standardowy: "Standardowy",
  premium: "Premium",
};

export const LOCATION_LABELS: Record<QuizLocationId, string> = {
  warszawa: "Warszawa",
  mazowsze: "Mazowsze (do 50 km od Warszawy)",
  polska: "Reszta Polski",
};

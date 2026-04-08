import type {
  QuizIndustryId,
  QuizAreaId,
  QuizTimelineId,
} from "@/content/landing";

export const INDUSTRY_LABELS: Record<QuizIndustryId, string> = {
  biuro: "Biuro",
  klinika: "Klinika (dent / wet / med)",
  szkola: "Szkoła / przedszkole",
  gastro: "Gastronomia",
  inne: "Inne",
};

export const AREA_LABELS: Record<QuizAreaId, string> = {
  do100: "do 100 m²",
  "100-300": "100 – 300 m²",
  "300-1000": "300 – 1000 m²",
  "1000plus": "powyżej 1000 m²",
};

export const TIMELINE_LABELS: Record<QuizTimelineId, string> = {
  asap: "ASAP — do miesiąca",
  "3mc": "W ciągu 3 miesięcy",
  later: "Później",
  unknown: "Jeszcze nie wiem",
};

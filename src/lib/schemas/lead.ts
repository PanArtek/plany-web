import { z } from "zod";

export const QuizLeadSchema = z.object({
  area: z.enum(["do100", "100-300", "300-1000", "1000plus"]),
  industry: z.enum(["medyczna", "edukacja", "gastro", "retail", "biuro", "inne"]),
  condition: z.enum(["surowy", "po-najemcy", "remont"]),
  standard: z.enum(["funkcjonalny", "standardowy", "premium"]),
  location: z.enum(["warszawa", "mazowsze", "polska"]),
  email: z.string().trim().email("Nieprawidłowy email").max(160),
  // honeypot — must be empty
  website: z.string().max(0).optional().or(z.literal("")),
  turnstileToken: z.string().optional().or(z.literal("")),
});

export type QuizLeadInput = z.infer<typeof QuizLeadSchema>;

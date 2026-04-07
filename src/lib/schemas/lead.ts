import { z } from "zod";

export const LeadSchema = z.object({
  name: z.string().trim().min(2, "Pole wymagane").max(120),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  email: z.string().trim().email("Nieprawidłowy email").max(160),
  phone: z
    .string()
    .trim()
    .regex(/^[\d\s+\-()]{7,}$/, "Nieprawidłowy numer")
    .max(40),
  type: z.string().trim().min(1, "Wybierz typ").max(60),
  area: z.string().trim().max(60).optional().or(z.literal("")),
  msg: z.string().trim().max(4000).optional().or(z.literal("")),
  turnstileToken: z.string().min(1, "Brak tokenu weryfikacji"),
  // honeypot — must be empty
  website: z.string().max(0).optional().or(z.literal("")),
});

export type LeadInput = z.infer<typeof LeadSchema>;

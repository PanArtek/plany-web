import { z } from "zod";

export const QuizLeadSchema = z.object({
  industry: z.enum(["biuro", "klinika", "szkola", "gastro", "inne"]),
  area: z.enum(["do100", "100-300", "300-1000", "1000plus"]),
  timeline: z.enum(["asap", "3mc", "later", "unknown"]),
  email: z.string().trim().email("Nieprawidłowy email").max(160),
  // honeypot — must be empty
  website: z.string().max(0).optional().or(z.literal("")),
  turnstileToken: z.string().optional().or(z.literal("")),
});

export type QuizLeadInput = z.infer<typeof QuizLeadSchema>;

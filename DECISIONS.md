# Podjęte decyzje — PLANY.com.pl

| # | Temat | Decyzja |
|---|---|---|
| 1 | Email | Resend (3000/mc free) |
| 2 | Antyspam | Cloudflare Turnstile + honeypot |
| 3 | Zdjęcia | Supabase Storage |
| 4 | RODO | Minimalistyczny banner własny (Akceptuj / Tylko niezbędne) |
| 5 | Analytics | Vercel Analytics (bez cookies, bez bannera) |
| 6 | CMS faza 2 | Supabase + /admin w Next.js (auth) |
| 7 | Zdjęcia MVP | 6 realnych lub Unsplash placeholder |
| 8 | Język | Tylko PL, struktura gotowa pod i18n |
| 9 | Powiadomienia | Mail na biuro@plany.com.pl + cc |
| 10 | Sticky mobile CTA | "Zadzwoń" |
| 11 | Sentry | Nie na MVP |
| 12 | Blog | Nie |
| 13 | Newsletter | Nie |
| 14 | Logo | SVG paths (nie font) |
| 15 | Filtry portfolio | Włącz dopiero przy ≥12 projektach |

## Otwarte pytania (do potwierdzenia w brainstorm)
- Realne zdjęcia portfolio: kiedy dostarczę? (odłożone do Fazy 2)

## Decyzje brainstorm (2026-04-07)
| # | Temat | Decyzja |
|---|---|---|
| B1 | DB layer | supabase-js only — drizzle/postgres usunięte z deps |
| B2 | Styling | Tailwind 4 + design tokens (CSS vars) w globals.css, paleta Warm Sand |
| B3 | Lead pipeline | Next Route Handler `/api/leads` zamiast Supabase Edge Function (override pkt 6 oryginalnej tabeli). Pipeline: zod parse → honeypot → in-memory rate limit (5/min/IP) → Turnstile verify → Resend |
| B4 | Fonty | next/font: Newsreader 700/800 (preload) + Plus Jakarta Sans 300-600 (no preload), subset latin+latin-ext. Logo = SVG, font Rubik One nie ładowany |
| B5 | MVP scope | Wąskie MVP — landing + form wysyła tylko mail. Supabase schema (`leads`, `projects`, storage, /admin) → Faza 2 |

`.env.example` wygenerowane (Resend + Turnstile + puste Supabase placeholders).

# PLANY.com.pl — kontekst projektu

## Firma
PLANY Sp. z o.o. — warszawska firma fit-out (wykończenia komercyjne).
30 osób, 10 lat, projekty 100k–10M PLN. Generalny wykonawca i podwykonawca
(m.in. Strabag). Specjalizacje: biura, kliniki medyczne (dent/wet),
edukacja, gastronomia, retail. Własna ekipa: 10 elektryków in-house.
Lokalizacja: Warszawa, Wawer.

## Cel strony
Lead generation (formularz → Supabase + mail) + wiarygodność (portfolio)
+ SEO ("fit-out Warszawa", "wykończenia biur Warszawa", "kliniki dentystyczne").

## Stack
- Next.js (App Router, TypeScript) — sprawdź wersję w package.json
- Supabase (DB + Storage + Edge Functions)
- Resend (email)
- Cloudflare Turnstile (antyspam)
- Vercel Analytics (bez cookies)
- Hosting: Vercel
- Domena: plany.com.pl

## Design system — Warm Sand

Paleta:
- bg: #0D0B09 / bg-alt: #141210 / bg-deep: #080706
- text: #E2D9CE / muted: #9A8E7E / dim: #5E564A
- accent: #C4A97D / accent-hover: #D4BA8E
- line: #2A2622 / error: #C44040

Typografia:
- Headlines: Newsreader (serif, 700-800)
- Body/UI: Plus Jakarta Sans (300-600)
- Logo: Rubik One — SKONWERTOWANE DO PATHS, nie ładuj jako font

Charakter: ciemny, ciepły, premium nie luksusowy. Minimal, whitespace,
ostre krawędzie, subtelne fade-in scroll, hover: górna linia accent.

## Mobile-first (nienegocjowalne)
- Każdy komponent piszesz dla 320-560px, potem breakpointy w górę
- Touch targets ≥44x44px
- Lighthouse Mobile ≥95 we wszystkich kategoriach
- Sticky CTA "Zadzwoń" poniżej 768px
- Bundle JS <100kb gzipped

## Konwencje
- Wszystkie teksty po polsku
- Dane kontaktowe jako placeholdery (XXX-XXX-XX-XX) do podmiany
- Design tokens w jednym miejscu (CSS vars w globals.css)
- Bez hardcoded stringów w komponentach (przygotowanie pod i18n PL/EN)
- Komponenty SSR domyślnie, "use client" tylko gdy konieczne

## Komendy
- `npm run dev` — dev server
- `npm run build` — production build
- `npm run lint` — eslint
- `npx supabase migration new <name>` — nowa migracja
- `npx supabase db push` — apply migracji

## Struktura Supabase
- `leads` — formularz (RLS: insert anon only)
- `projects` — portfolio (RLS: select public)
- `categories` — kategorie (RLS: select public)
- Storage bucket: `portfolio-images` (public read)
- Edge function: `notify-lead` → Resend → biuro@plany.com.pl

## Pliki referencyjne
- `mockups/plany-landing.jsx` — wireframe wizualny + treść (źródło prawdy)
- `mockups/plany-*.jsx` — wcześniejsze wersje sekcji (referencja)

## Workflow
Brainstorm → AGENTS.md → writing-plans → prd.json (taski <10 min)
→ ./ralph.sh --tool claude N → weryfikacja (Lighthouse Mobile + Supabase + Vercel preview)

## MCP Servers
- **gsap-master**: użyj dla animation creation, debugging, performance refactoring.
  Tools: `understand_and_create_animation` (generowanie animacji z opisu),
  `debug_animation_issue` (debug laggy/broken animacji),
  `optimize_for_performance` (refactor pod 60fps + GPU).
  WSZYSTKIE animacje importują gsap z `@/lib/gsapConfig` (nigdy bezpośrednio z `'gsap'`).

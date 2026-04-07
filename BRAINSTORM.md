# Brainstorm phase — PLANY.com.pl landing

Przeczytaj `AGENTS.md` i `DECISIONS.md` — tam jest cały kontekst stały.
Ten plik mówi co masz zrobić TERAZ.

## Twoja rola w tej fazie
Senior fullstack engineer planujący architekturę. **Nie piszesz kodu.**
Robisz rozpoznanie, identyfikujesz ryzyka, proponujesz podejście.

## Krok 1 — rozpoznanie środowiska

```bash
ls -la && cat package.json 2>/dev/null
cat next.config.* tsconfig.json tailwind.config.* 2>/dev/null
ls -la src/ app/ pages/ supabase/ 2>/dev/null
cat .env.local .env 2>/dev/null | grep -v "KEY\|SECRET"
git log --oneline -10 2>/dev/null
```

Raport: wersja Next, App vs Pages Router, TS yes/no, Tailwind yes/no,
co już jest zainstalowane z DECISIONS (supabase-js, resend itp.),
stan gita, istniejące komponenty.

## Krok 2 — analiza mockupu

Otwórz `mockups/plany-landing.jsx`. Zidentyfikuj:
- Ile sekcji, które wymagają client component (animacje, formularz)
- Które fonty są używane gdzie
- Jakie ikony lucide-react (lista do importu)
- Co w mockupie jest inline-style i wymaga ekstrakcji do design tokens

## Krok 3 — propozycja architektury

Bazując na tym co znalazłeś + DECISIONS:

1. **Style** — Tailwind czy CSS Modules czy vanilla? Uzasadnij z perspektywy
   mobile-first + Lighthouse 95 + design tokens + 3 fonty.
2. **Co dodać do package.json** (lista bibliotek z wersjami)
3. **Schemat Supabase** — pełny SQL dla `leads`, `projects`, `categories`
   + RLS policies + storage bucket + trigger → edge function
4. **Edge function `notify-lead`** — pseudokod (nie kod), input/output, error handling
5. **Strategia fontów** — które subsetować, preload czy nie, fallback stack
6. **SSR vs client** — które sekcje będą "use client" i dlaczego

## Krok 4 — ryzyka

Lista konkretnych ryzyk z mitygacją. Minimum:
- RLS leads + Turnstile (czy wystarczy?)
- 3 fonty + Lighthouse 95 (jak osiągnąć)
- Intersection Observer + SSR hydration
- Rate limiting na endpoint formularza
- Vercel limity (image optimization, edge function execution)

## Krok 5 — workpackages MVP

Podziel pracę na fazy:
- **Faza 1 — MVP** (1-2 dni Ralph Loop): co MUSI być żeby zdeployować
- **Faza 2** — co odłożone (admin panel, więcej projektów, optymalizacje)

Dla każdego workpackage: szacunkowy czas + zależności.

## Krok 6 — pytania do mnie

Tylko **rzeczy nie pokryte w DECISIONS.md**. Maks 5 pytań.
Dla każdego podaj swój default.

## Definition of done dla tej fazy
- [ ] Raport środowiska wykonany
- [ ] Mockup przeanalizowany
- [ ] Wybrane podejście do styli z uzasadnieniem
- [ ] Pełny schemat Supabase (SQL)
- [ ] Lista bibliotek do package.json
- [ ] Lista ryzyk z mitygacją
- [ ] Workpackages podzielone na fazy
- [ ] Maks 5 pytań do mnie z defaultami

**Nie pisz kodu. Nie twórz plików. Tylko analiza i propozycje w czacie.**

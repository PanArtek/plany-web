# Ralph task: GSAP animacje Tier 1+2+3

## Reguly globalne
- WSZYSTKIE animacje importuja gsap z `@/lib/gsapConfig` (nigdy bezposrednio z `gsap`).
- Uzywaj `useGSAP()` z `@gsap/react` (auto cleanup).
- Respektuj `prefers-reduced-motion` przez `gsap.matchMedia()`.
- Heavy animacje (parallax, magnetic hover, SplitText) tylko desktop: media query `(min-width: 768px)`.
- GPU-only properties: `transform`, `opacity`. Nigdy `top/left/width/height` w scrollowanych animacjach.
- Po kazdym tasku: `pnpm build`. Jesli build sie wywali — fix przed dalszymi krokami.
- Po kazdym Tier — zrob jeden commit z opisem zmian.
- NIE deployuj na koniec. Zatrzymaj sie po Tier 3 i czekaj na manualna weryfikacje.

## TIER 1

### Task 1.1 — useScrollReveal hook
Utworz `src/lib/animations/useScrollReveal.ts`:
- Reusable hook fade+rise.
- Parametry: `selector` (string lub ref), opcjonalnie `stagger` (default 0.1), `start` (default `top 80%`).
- Animacja: `opacity 0 -> 1`, `y 30 -> 0`, `duration 0.8`, `ease power3.out`.
- ScrollTrigger: `start: "top 80%"`, `once: true`.
- Cleanup przez useGSAP context.

Zastosuj w sekcjach (na glowny container i stagger dla bezposrednich dzieci):
- `src/app/(landing)/_sections/proces.tsx`
- `src/app/(landing)/_sections/specjalizacje.tsx`
- `src/app/(landing)/_sections/realizacje.tsx`
- `src/app/(landing)/_sections/kontakt.tsx`

### Task 1.2 — Hero stats counter
Plik: `src/app/(landing)/_sections/hero.tsx`, linie 122-127.
- Animuj liczby od 0 do target po `loaded === true`.
- `gsap.to({val: 0}, {val: target, snap: {val: 1}, duration: 1.2, ease: "power2.out", onUpdate})`.
- `HERO.stats` wartosci to stringi typu `10+`, `30`, `100+` — parsuj liczbe regexem `/\d+/`, zachowaj suffix (`+`) na koncu.
- Delay zsynchronizowany z istniejacymi fade-in (zacznij ~1s po loaded).

### Task 1.3 — Hero SplitText nagłówek
Plik: `src/app/(landing)/_sections/hero.tsx`, linie 41-54.
- Animuj `<h1>` per word: stagger 0.05, duration 0.7, ease power3.out, delay 0.6s.
- Najpierw sprobuj `SplitText` z `gsap/SplitText` (juz w gsapConfig).
- Jesli SplitText runtime error / wymaga konta — fallback: w komponencie podziel tekst recznie na `<span style={{display:'inline-block'}}>` per slowo i animuj te spany.
- Akcent (`HERO.titleAccent`) pozostaje w `<span class="text-accent">` i jest tez animowany.

**COMMIT po Tier 1:** `feat(anim): tier 1 — scroll reveal, stats counter, hero title split`

## TIER 2

### Task 2.1 — Realizacje parallax
Plik: `src/app/(landing)/_sections/realizacje.tsx`.
- Kazde zdjecie projektu: `yPercent: -10 -> 10` z ScrollTrigger `scrub: true`.
- Tylko desktop: owin w `gsap.matchMedia()` z `(min-width: 768px)`.
- `transform-gpu` na elemencie zdjecia, `will-change: transform`.

### Task 2.2 — Proces sequential timeline
Plik: `src/app/(landing)/_sections/proces.tsx`.
- Kroki odslaniaja sie sekwencyjnie: stagger 0.2, fade+rise jak w useScrollReveal, ale dluzszy (duration 0.6).
- Linia laczaca rosnie miedzy nimi:
  - Jesli SVG line — animuj `strokeDashoffset` od `length` do 0.
  - Jesli div — animuj `scaleY` od 0 do 1 (transform-origin top).
- ScrollTrigger na sekcji proces: start `top 70%`.

### Task 2.3 — Specjalizacje magnetic hover
Plik: `src/app/(landing)/_sections/specjalizacje.tsx`.
- Karty (biuro/klinika/edukacja/gastro/retail) podazaja za kursorem: max +/-8px na osi X i Y.
- Ease `power2.out`, duration 0.5.
- Tylko desktop, w `gsap.matchMedia()` z `(min-width: 768px)` i `(hover: hover)`.
- onMouseLeave — wraca do 0,0.

**COMMIT po Tier 2:** `feat(anim): tier 2 — parallax realizacje, proces timeline, magnetic specjalizacje`

## TIER 3

### Task 3.1 — Lenis smooth scroll
- Utworz `src/components/LenisProvider.tsx`:
  - `'use client'`.
  - `useEffect`: init Lenis z `{ lerp: 0.1, smoothWheel: true }`.
  - RAF loop wywoluje `lenis.raf(time)`.
  - Sync z ScrollTrigger: `lenis.on('scroll', ScrollTrigger.update)` i `gsap.ticker.add((time) => lenis.raf(time*1000))`.
  - Cleanup w return (lenis.destroy()).
  - Tylko desktop: sprawdzic `window.matchMedia('(min-width: 768px)').matches` przed initem.
- W `src/app/layout.tsx` — owin `{children}` w `<LenisProvider>`.

### Task 3.2 — Nav hide/show on scroll
Plik: `src/app/(landing)/_sections/nav.tsx`.
- Dodaj 'use client' jesli nie ma.
- ScrollTrigger `onUpdate` z `self.direction`:
  - direction === 1 (scroll down) i scrollY > 100 → `gsap.to(nav, {yPercent: -100, duration: 0.3})`.
  - direction === -1 (scroll up) → `gsap.to(nav, {yPercent: 0, duration: 0.3})`.
- Wszystkie urzadzenia (nie tylko desktop).

### Task 3.3 — Hero CTA pulse (idle)
Plik: `src/app/(landing)/_sections/hero.tsx`.
- Primary button `Szybka wycena`.
- Po 5s bez interakcji uzytkownika (mousemove/touchstart/scroll/keydown): start tween `scale 1 -> 1.02, repeat: -1, yoyo: true, duration: 2, ease: "sine.inOut"`.
- Przy jakiejkolwiek interakcji — kill tween, scale 1.
- Resetuj timer 5s po kazdej interakcji (ale nie restartuj jesli juz pulse trwa).

**COMMIT po Tier 3:** `feat(anim): tier 3 — lenis smooth scroll, nav hide on scroll, cta idle pulse`

## Final
Zatrzymaj sie. NIE deployuj. Wypisz krotkie podsumowanie co zostalo zrobione i jakie pliki zmienione.

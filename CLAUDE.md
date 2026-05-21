## Core Principles (Karpathy)

### 1. Think Before Coding
- State assumptions explicitly. If uncertain, ask rather than guess.
- Present multiple interpretations when ambiguity exists.
- Push back if a simpler approach exists.
- Stop when confused. Name what's unclear and ask.

### 2. Simplicity First
- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" not requested.
- No error handling for impossible scenarios.
- If 200 lines could be 50, rewrite it.
- Test: Would a senior engineer say this is overcomplicated? If yes, simplify.

### 3. Surgical Changes
- Touch only what you must.
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it — don't delete it.
- Test: Every changed line must trace directly to the user's request.

### 4. Goal-Driven Execution
Transform imperative tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a plan:
1. [Step] → verify: [check]
2. [Step] → verify: [check]

---

@AGENTS.md

---

## Zasady dla projektu PLANY web

### 1. Think Before — branża interior fit-out, nie tech
- Zanim dodasz sekcję/feature, sprawdź czy pasuje do positioning:
  in-house teams, integrated subcontractors, one project lead, full cost control.
- Copy: język klienta (CEO, head of office, dyrektor kliniki), nie deweloperski.
- NIGDY "fit-out" — zawsze "budowa wnętrz komercyjnych".
- "glazura" = płytka ścienna ceramiczna (konsekwentnie).

### 2. Simplicity First — strona ma konwertować, nie imponować
- Bez animacji "na zapas", bez efektów które nie służą konwersji.
- Quiz funnel zamiast formularza — bez dodatkowych pól bez powodu biznesowego.
- Każdy nowy komponent: czy to skraca ścieżkę do leada? Jeśli nie — wyrzuć.

### 3. Surgical Changes — strona produkcyjna
- Edytujesz hero — nie ruszaj process section.
- Edytujesz portfolio — nie zmieniaj brand colors w globals.css.
- Tailwind classes: trzymaj istniejący wzorzec utility-first, nie wprowadzaj @apply.
- Jeśli widzisz nieużywany komponent — zgłoś, nie usuwaj.

### 4. Goal-Driven Execution
Każde zadanie ma weryfikację:
- "Dodaj sekcję" → "Build passes, Lighthouse score nie spada, mobile OK"
- "Popraw copy" → "Headline ≤ 60 znaków, CTA jasne, język klienta nie deweloperski"
- "Dodaj specjalizację" → "Karta wygląda jak pozostałe, ikona z istniejącego setu, mobile responsive"

Plan multi-step:
1. Implement → verify: pnpm build green
2. Visual check → verify: porównanie z istniejącymi sekcjami
3. Copy review → verify: brak "fit-out", język klienta
4. Mobile check → verify: 375px width, no overflow

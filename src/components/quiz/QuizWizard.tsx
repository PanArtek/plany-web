"use client";
import { useEffect, useRef, useState } from "react";
import {
  Building2,
  Stethoscope,
  GraduationCap,
  UtensilsCrossed,
  ShoppingBag,
  MoreHorizontal,
  ArrowLeft,
  Send,
  type LucideIcon,
} from "lucide-react";
import { Turnstile } from "@marsidev/react-turnstile";
import { gsap, useGSAP } from "@/lib/gsapConfig";
import {
  QUIZ,
  type QuizAreaId,
  type QuizIndustryId,
  type QuizConditionId,
  type QuizStandardId,
  type QuizLocationId,
} from "@/content/landing";
import { QuizProgress } from "./QuizProgress";
import { QuizOption } from "./QuizOption";
import { QuizSuccess } from "./QuizSuccess";

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

const INDUSTRY_ICONS: Record<string, LucideIcon> = {
  Building2,
  Stethoscope,
  GraduationCap,
  UtensilsCrossed,
  ShoppingBag,
  MoreHorizontal,
};

type Phase =
  | "step-1"
  | "step-2"
  | "step-3"
  | "step-4"
  | "step-5"
  | "step-6"
  | "submitting"
  | "success"
  | "error";

type Answers = {
  area?: QuizAreaId;
  industry?: QuizIndustryId;
  condition?: QuizConditionId;
  standard?: QuizStandardId;
  location?: QuizLocationId;
  email?: string;
};

const TOTAL_STEPS = 6;

function phaseToStep(phase: Phase): number {
  switch (phase) {
    case "step-1":
      return 1;
    case "step-2":
      return 2;
    case "step-3":
      return 3;
    case "step-4":
      return 4;
    case "step-5":
      return 5;
    case "step-6":
    case "submitting":
    case "error":
    case "success":
      return 6;
  }
}

export function QuizWizard() {
  const [phase, setPhase] = useState<Phase>("step-1");
  const [answers, setAnswers] = useState<Answers>({});
  const [emailDraft, setEmailDraft] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [tsToken, setTsToken] = useState("");

  const stepRef = useRef<HTMLDivElement>(null);
  const liveRef = useRef<HTMLDivElement>(null);
  const directionRef = useRef<1 | -1>(1);
  const previousPhaseRef = useRef<Phase>(phase);

  // Animate step transition.
  useGSAP(
    () => {
      if (!stepRef.current) return;
      const mm = gsap.matchMedia();
      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const { reduced } = ctx.conditions as {
            motion: boolean;
            reduced: boolean;
          };
          if (reduced) {
            gsap.set(stepRef.current, { opacity: 1, x: 0 });
            return;
          }
          const dir = directionRef.current;
          gsap.fromTo(
            stepRef.current,
            { opacity: 0, x: 30 * dir },
            { opacity: 1, x: 0, duration: 0.45, ease: "power3.out" },
          );
        },
      );
      return () => mm.revert();
    },
    { dependencies: [phase], scope: stepRef },
  );

  // Live region announcement.
  useEffect(() => {
    if (!liveRef.current) return;
    const labels: Record<Phase, string> = {
      "step-1": `${QUIZ.steps.area.eyebrow}: ${QUIZ.steps.area.title}`,
      "step-2": `${QUIZ.steps.industry.eyebrow}: ${QUIZ.steps.industry.title}`,
      "step-3": `${QUIZ.steps.condition.eyebrow}: ${QUIZ.steps.condition.title}`,
      "step-4": `${QUIZ.steps.standard.eyebrow}: ${QUIZ.steps.standard.title}`,
      "step-5": `${QUIZ.steps.location.eyebrow}: ${QUIZ.steps.location.title}`,
      "step-6": `${QUIZ.steps.email.eyebrow}: ${QUIZ.steps.email.title}`,
      submitting: "Wysyłanie...",
      error: QUIZ.error.generic,
      success: QUIZ.success.title,
    };
    liveRef.current.textContent = labels[phase];
  }, [phase]);

  // Focus management.
  useEffect(() => {
    if (!stepRef.current) return;
    if (previousPhaseRef.current === phase) return;
    previousPhaseRef.current = phase;
    const target = stepRef.current.querySelector<HTMLElement>(
      "[data-quiz-focus]",
    );
    target?.focus({ preventScroll: true });
  }, [phase]);

  function advance(next: Phase) {
    directionRef.current = 1;
    setPhase(next);
  }
  function back(prev: Phase) {
    directionRef.current = -1;
    setPhase(prev);
  }

  const selectArea = (id: QuizAreaId) => {
    setAnswers((a) => ({ ...a, area: id }));
    advance("step-2");
  };
  const selectIndustry = (id: QuizIndustryId) => {
    setAnswers((a) => ({ ...a, industry: id }));
    advance("step-3");
  };
  const selectCondition = (id: QuizConditionId) => {
    setAnswers((a) => ({ ...a, condition: id }));
    advance("step-4");
  };
  const selectStandard = (id: QuizStandardId) => {
    setAnswers((a) => ({ ...a, standard: id }));
    advance("step-5");
  };
  const selectLocation = (id: QuizLocationId) => {
    setAnswers((a) => ({ ...a, location: id }));
    advance("step-6");
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setEmailError(null);
    setSubmitError(null);
    const email = emailDraft.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Nieprawidłowy email");
      return;
    }
    if (
      !answers.area ||
      !answers.industry ||
      !answers.condition ||
      !answers.standard ||
      !answers.location
    ) {
      setSubmitError(QUIZ.error.generic);
      return;
    }
    setPhase("submitting");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          area: answers.area,
          industry: answers.industry,
          condition: answers.condition,
          standard: answers.standard,
          location: answers.location,
          email,
          turnstileToken: tsToken,
          website: "",
        }),
      });
      const json = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !json.ok) {
        setSubmitError(json.error || QUIZ.error.generic);
        setPhase("error");
        return;
      }
      setAnswers((a) => ({ ...a, email }));
      setPhase("success");
    } catch {
      setSubmitError("Brak połączenia. Spróbuj ponownie albo zadzwoń.");
      setPhase("error");
    }
  }

  function reset() {
    directionRef.current = -1;
    setAnswers({});
    setEmailDraft("");
    setEmailError(null);
    setSubmitError(null);
    setTsToken("");
    setPhase("step-1");
  }

  const showProgress = phase !== "success";
  const currentStep = phaseToStep(phase);

  return (
    <div className="bg-bg-alt border border-line p-6 sm:p-8 lg:p-10">
      <div ref={liveRef} className="sr-only" aria-live="polite" />

      {showProgress && (
        <div className="mb-6">
          <QuizProgress
            current={currentStep}
            total={TOTAL_STEPS}
            label={QUIZ.progressLabel}
          />
        </div>
      )}

      <div ref={stepRef} className="min-h-[340px]">
        {phase === "step-1" && (
          <OptionStep
            eyebrow={QUIZ.steps.area.eyebrow}
            title={QUIZ.steps.area.title}
            options={QUIZ.areas}
            selected={answers.area}
            onSelect={selectArea}
            cols={2}
          />
        )}
        {phase === "step-2" && (
          <OptionStep
            eyebrow={QUIZ.steps.industry.eyebrow}
            title={QUIZ.steps.industry.title}
            options={QUIZ.industries}
            selected={answers.industry}
            onSelect={selectIndustry}
            onBack={() => back("step-1")}
            iconMap={INDUSTRY_ICONS}
            cols={2}
          />
        )}
        {phase === "step-3" && (
          <OptionStep
            eyebrow={QUIZ.steps.condition.eyebrow}
            title={QUIZ.steps.condition.title}
            options={QUIZ.conditions}
            selected={answers.condition}
            onSelect={selectCondition}
            onBack={() => back("step-2")}
            cols={1}
          />
        )}
        {phase === "step-4" && (
          <OptionStep
            eyebrow={QUIZ.steps.standard.eyebrow}
            title={QUIZ.steps.standard.title}
            options={QUIZ.standards}
            selected={answers.standard}
            onSelect={selectStandard}
            onBack={() => back("step-3")}
            cols={3}
          />
        )}
        {phase === "step-5" && (
          <OptionStep
            eyebrow={QUIZ.steps.location.eyebrow}
            title={QUIZ.steps.location.title}
            options={QUIZ.locations}
            selected={answers.location}
            onSelect={selectLocation}
            onBack={() => back("step-4")}
            cols={1}
          />
        )}
        {(phase === "step-6" ||
          phase === "submitting" ||
          phase === "error") && (
          <Step6Email
            email={emailDraft}
            setEmail={setEmailDraft}
            emailError={emailError}
            submitError={submitError}
            submitting={phase === "submitting"}
            onSubmit={submit}
            onBack={() => back("step-5")}
            onTsToken={setTsToken}
          />
        )}
        {phase === "success" && (
          <QuizSuccess email={answers.email || emailDraft} onReset={reset} />
        )}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────── */
/* Generic option-picker step                                     */
/* ────────────────────────────────────────────────────────────── */

type OptionLike = {
  readonly id: string;
  readonly label: string;
  readonly sub?: string;
  readonly icon?: string;
};

function OptionStep<T extends string>({
  eyebrow,
  title,
  options,
  selected,
  onSelect,
  onBack,
  iconMap,
  cols = 2,
}: {
  eyebrow: string;
  title: string;
  options: ReadonlyArray<OptionLike>;
  selected?: T;
  onSelect: (id: T) => void;
  onBack?: () => void;
  iconMap?: Record<string, LucideIcon>;
  cols?: 1 | 2 | 3;
}) {
  const gridClass =
    cols === 1
      ? "grid grid-cols-1 gap-3"
      : cols === 3
        ? "grid grid-cols-1 sm:grid-cols-3 gap-3"
        : "grid grid-cols-1 sm:grid-cols-2 gap-3";

  return (
    <div>
      <StepHeader eyebrow={eyebrow} title={title} onBack={onBack} />
      <div className={gridClass}>
        {options.map((opt, i) => {
          const Icon = iconMap && opt.icon ? iconMap[opt.icon] : undefined;
          return (
            <QuizOption
              key={opt.id}
              label={opt.label}
              sub={opt.sub}
              selected={selected === (opt.id as T)}
              icon={Icon ? <Icon size={18} strokeWidth={1.5} /> : null}
              onSelect={() => onSelect(opt.id as T)}
              {...(i === 0 ? { ref: focusFirst } : {})}
            />
          );
        })}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────── */
/* Step 6 — Email + submit                                        */
/* ────────────────────────────────────────────────────────────── */

function Step6Email({
  email,
  setEmail,
  emailError,
  submitError,
  submitting,
  onSubmit,
  onBack,
  onTsToken,
}: {
  email: string;
  setEmail: (v: string) => void;
  emailError: string | null;
  submitError: string | null;
  submitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
  onTsToken: (t: string) => void;
}) {
  return (
    <div>
      <StepHeader
        eyebrow={QUIZ.steps.email.eyebrow}
        title={QUIZ.steps.email.title}
        onBack={onBack}
      />
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="quiz-email"
            className={`font-sans text-[10px] uppercase tracking-wider transition-colors ${
              emailError ? "text-error" : "text-dim"
            }`}
          >
            Email
            <span className="text-accent ml-0.5">*</span>
          </label>
          <input
            id="quiz-email"
            data-quiz-focus
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder={QUIZ.steps.email.placeholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={!!emailError}
            aria-describedby={emailError ? "quiz-email-error" : undefined}
            className="font-sans text-[14px] text-text bg-input-bg border border-line px-4 py-3.5 w-full outline-none focus:border-accent transition-colors placeholder:text-dim min-h-12"
          />
          {emailError && (
            <span
              id="quiz-email-error"
              className="font-sans text-[11px] text-error font-light"
            >
              {emailError}
            </span>
          )}
        </div>

        {SITE_KEY ? (
          <Turnstile
            siteKey={SITE_KEY}
            onSuccess={onTsToken}
            options={{ theme: "dark" }}
          />
        ) : (
          <p className="font-sans text-[11px] text-dim">
            (Turnstile wyłączony — brak <code>NEXT_PUBLIC_TURNSTILE_SITE_KEY</code>)
          </p>
        )}

        {submitError && (
          <p className="font-sans text-[12px] text-error" role="alert">
            {submitError}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2.5 font-sans text-[13px] font-medium uppercase tracking-wider px-7 py-4 bg-accent text-white border border-accent hover:bg-accent-hover hover:border-accent-hover disabled:bg-dim disabled:border-dim disabled:cursor-wait transition-colors min-h-12 w-full"
        >
          {submitting ? QUIZ.steps.email.submitting : QUIZ.steps.email.submit}
          {!submitting && <Send size={15} strokeWidth={2.25} />}
        </button>

        <p className="font-sans text-[11px] text-dim font-light text-center">
          {QUIZ.steps.email.note}
        </p>
      </form>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────── */

function StepHeader({
  eyebrow,
  title,
  onBack,
}: {
  eyebrow: string;
  title: string;
  onBack?: () => void;
}) {
  return (
    <div className="mb-6">
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 font-sans text-[11px] text-dim hover:text-muted uppercase tracking-wider bg-transparent border-none cursor-pointer transition-colors mb-3"
        >
          <ArrowLeft size={12} strokeWidth={2} />
          {QUIZ.back}
        </button>
      )}
      <div className="font-sans text-[11px] text-dim uppercase tracking-[.1em] mb-2">
        {eyebrow}
      </div>
      <h3
        className="font-display font-extrabold text-text leading-tight"
        style={{ fontSize: "clamp(22px, 2.8vw, 32px)", letterSpacing: "-0.02em" }}
      >
        {title}
      </h3>
    </div>
  );
}

function focusFirst(el: HTMLButtonElement | null) {
  if (el && document.activeElement === document.body) {
    el.focus({ preventScroll: true });
  }
}

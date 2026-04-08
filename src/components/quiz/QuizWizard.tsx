"use client";
import { useEffect, useRef, useState } from "react";
import {
  Building2,
  Stethoscope,
  GraduationCap,
  UtensilsCrossed,
  MoreHorizontal,
  ArrowLeft,
  Send,
  type LucideIcon,
} from "lucide-react";
import { Turnstile } from "@marsidev/react-turnstile";
import { gsap, useGSAP } from "@/lib/gsapConfig";
import {
  QUIZ,
  type QuizIndustryId,
  type QuizAreaId,
  type QuizTimelineId,
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
  MoreHorizontal,
};

type Phase =
  | "step-1"
  | "step-2"
  | "step-3"
  | "step-4"
  | "submitting"
  | "success"
  | "error";

type Answers = {
  industry?: QuizIndustryId;
  area?: QuizAreaId;
  timeline?: QuizTimelineId;
  email?: string;
};

const TOTAL_STEPS = 4;

function phaseToStep(phase: Phase): number {
  switch (phase) {
    case "step-1":
      return 1;
    case "step-2":
      return 2;
    case "step-3":
      return 3;
    case "step-4":
    case "submitting":
    case "error":
      return 4;
    case "success":
      return 4;
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
  const directionRef = useRef<1 | -1>(1); // 1 = forward, -1 = back
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
      "step-1": `${QUIZ.steps.industry.eyebrow}: ${QUIZ.steps.industry.title}`,
      "step-2": `${QUIZ.steps.area.eyebrow}: ${QUIZ.steps.area.title}`,
      "step-3": `${QUIZ.steps.timeline.eyebrow}: ${QUIZ.steps.timeline.title}`,
      "step-4": `${QUIZ.steps.email.eyebrow}: ${QUIZ.steps.email.title}`,
      submitting: "Wysyłanie...",
      error: QUIZ.error.generic,
      success: QUIZ.success.title,
    };
    liveRef.current.textContent = labels[phase];
  }, [phase]);

  // Focus management — focus first interactive element on each step change.
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

  function selectIndustry(id: QuizIndustryId) {
    setAnswers((a) => ({ ...a, industry: id }));
    advance("step-2");
  }
  function selectArea(id: QuizAreaId) {
    setAnswers((a) => ({ ...a, area: id }));
    advance("step-3");
  }
  function selectTimeline(id: QuizTimelineId) {
    setAnswers((a) => ({ ...a, timeline: id }));
    advance("step-4");
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setEmailError(null);
    setSubmitError(null);
    const email = emailDraft.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Nieprawidłowy email");
      return;
    }
    if (!answers.industry || !answers.area || !answers.timeline) {
      setSubmitError(QUIZ.error.generic);
      return;
    }
    setPhase("submitting");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          industry: answers.industry,
          area: answers.area,
          timeline: answers.timeline,
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
      {/* aria-live announcer */}
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

      <div ref={stepRef} className="min-h-[320px]">
        {phase === "step-1" && (
          <Step1
            selected={answers.industry}
            onSelect={selectIndustry}
          />
        )}
        {phase === "step-2" && (
          <Step2
            selected={answers.area}
            onSelect={selectArea}
            onBack={() => back("step-1")}
          />
        )}
        {phase === "step-3" && (
          <Step3
            selected={answers.timeline}
            onSelect={selectTimeline}
            onBack={() => back("step-2")}
          />
        )}
        {(phase === "step-4" || phase === "submitting" || phase === "error") && (
          <Step4Email
            email={emailDraft}
            setEmail={setEmailDraft}
            emailError={emailError}
            submitError={submitError}
            submitting={phase === "submitting"}
            onSubmit={submit}
            onBack={() => back("step-3")}
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
/* Step 1 — Industry                                              */
/* ────────────────────────────────────────────────────────────── */

function Step1({
  selected,
  onSelect,
}: {
  selected?: QuizIndustryId;
  onSelect: (id: QuizIndustryId) => void;
}) {
  return (
    <div>
      <StepHeader
        eyebrow={QUIZ.steps.industry.eyebrow}
        title={QUIZ.steps.industry.title}
      />
      <div className="grid gap-3 sm:grid-cols-2">
        {QUIZ.industries.map((opt, i) => {
          const Icon = INDUSTRY_ICONS[opt.icon];
          return (
            <QuizOption
              key={opt.id}
              label={opt.label}
              sub={"sub" in opt ? opt.sub : undefined}
              selected={selected === opt.id}
              icon={Icon ? <Icon size={18} strokeWidth={1.5} /> : null}
              onSelect={() => onSelect(opt.id)}
              {...(i === 0 ? { ref: focusFirst } : {})}
            />
          );
        })}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────── */
/* Step 2 — Area                                                  */
/* ────────────────────────────────────────────────────────────── */

function Step2({
  selected,
  onSelect,
  onBack,
}: {
  selected?: QuizAreaId;
  onSelect: (id: QuizAreaId) => void;
  onBack: () => void;
}) {
  return (
    <div>
      <StepHeader
        eyebrow={QUIZ.steps.area.eyebrow}
        title={QUIZ.steps.area.title}
        onBack={onBack}
      />
      <div className="grid gap-3 sm:grid-cols-2">
        {QUIZ.areas.map((opt) => (
          <QuizOption
            key={opt.id}
            label={opt.label}
            sub={opt.sub}
            selected={selected === opt.id}
            onSelect={() => onSelect(opt.id)}
          />
        ))}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────── */
/* Step 3 — Timeline                                              */
/* ────────────────────────────────────────────────────────────── */

function Step3({
  selected,
  onSelect,
  onBack,
}: {
  selected?: QuizTimelineId;
  onSelect: (id: QuizTimelineId) => void;
  onBack: () => void;
}) {
  return (
    <div>
      <StepHeader
        eyebrow={QUIZ.steps.timeline.eyebrow}
        title={QUIZ.steps.timeline.title}
        onBack={onBack}
      />
      <div className="grid gap-3 sm:grid-cols-2">
        {QUIZ.timelines.map((opt) => (
          <QuizOption
            key={opt.id}
            label={opt.label}
            sub={"sub" in opt ? opt.sub : undefined}
            selected={selected === opt.id}
            onSelect={() => onSelect(opt.id)}
          />
        ))}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────── */
/* Step 4 — Email + submit                                        */
/* ────────────────────────────────────────────────────────────── */

function Step4Email({
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
/* Shared header                                                  */
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

/* Helper — auto-focus first option on mount of step 1.
   Sentinel ref callback that triggers focus once. */
function focusFirst(el: HTMLButtonElement | null) {
  if (el && document.activeElement === document.body) {
    el.focus({ preventScroll: true });
  }
}

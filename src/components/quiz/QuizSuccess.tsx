"use client";
import { useRef } from "react";
import { Check, Phone } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsapConfig";
import { CONTACT, QUIZ } from "@/content/landing";

type Props = {
  email: string;
  onReset: () => void;
};

export function QuizSuccess({ email, onReset }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!rootRef.current) return;
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
          if (reduced) return;
          gsap.from(rootRef.current, {
            opacity: 0,
            scale: 0.97,
            duration: 0.6,
            ease: "power3.out",
          });
          gsap.from(rootRef.current!.querySelectorAll("[data-success-stagger]"), {
            opacity: 0,
            y: 10,
            duration: 0.5,
            ease: "power3.out",
            stagger: 0.12,
            delay: 0.15,
          });
        },
      );
      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <div
      ref={rootRef}
      role="status"
      aria-live="polite"
      className="flex flex-col items-center text-center py-10 px-4"
    >
      <div
        data-success-stagger
        className="inline-flex h-14 w-14 items-center justify-center bg-accent/15 mb-5"
        aria-hidden
      >
        <Check size={26} strokeWidth={2} className="text-accent" />
      </div>
      <h3
        data-success-stagger
        className="font-display font-extrabold text-text leading-tight mb-3"
        style={{ fontSize: "clamp(24px, 3vw, 32px)", letterSpacing: "-0.02em" }}
      >
        {QUIZ.success.title}
      </h3>
      <p
        data-success-stagger
        className="font-sans font-light text-muted leading-relaxed mb-8 max-w-[420px]"
        style={{ fontSize: "clamp(13px, 1.4vw, 15px)" }}
      >
        {QUIZ.success.body}{" "}
        <span className="text-text font-medium">{email}</span>.
      </p>

      <a
        data-success-stagger
        href={`tel:${CONTACT.phoneE164}`}
        aria-label={`Zadzwoń do ${CONTACT.phoneOwner}, telefon ${CONTACT.phone}`}
        className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 font-sans text-[13px] font-medium uppercase tracking-wider px-7 py-4 bg-accent text-white border border-accent hover:bg-accent-hover hover:border-accent-hover transition-colors min-h-12"
      >
        <Phone size={15} strokeWidth={2.25} />
        {QUIZ.success.phoneCta} {CONTACT.phoneOwner} — {CONTACT.phone}
      </a>

      <button
        data-success-stagger
        type="button"
        onClick={onReset}
        className="mt-6 font-sans text-[11px] text-dim hover:text-muted uppercase tracking-wider bg-transparent border-none cursor-pointer transition-colors"
      >
        {QUIZ.success.reset}
      </button>
    </div>
  );
}

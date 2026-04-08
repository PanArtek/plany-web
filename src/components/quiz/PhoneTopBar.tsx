"use client";
import { useRef } from "react";
import { Phone, ArrowRight } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsapConfig";
import { CONTACT, QUIZ } from "@/content/landing";

export function PhoneTopBar() {
  const arrowRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLAnchorElement>(null);

  // Subtle arrow nudge while user is reading.
  useGSAP(
    () => {
      if (!arrowRef.current) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tween = gsap.to(arrowRef.current, {
          x: 4,
          duration: 0.9,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
        return () => tween.kill();
      });
      return () => mm.revert();
    },
    { scope: containerRef },
  );

  return (
    <a
      ref={containerRef}
      href={`tel:${CONTACT.phoneE164}`}
      aria-label={`Zadzwoń do ${CONTACT.phoneOwner}, telefon ${CONTACT.phone}`}
      className="group flex w-full items-center justify-center gap-3 sm:gap-4 bg-accent text-bg-deep px-5 py-4 min-h-14 hover:bg-accent-hover transition-colors"
    >
      <Phone size={18} strokeWidth={2.25} aria-hidden />
      <span className="font-sans text-[13px] sm:text-[14px] font-medium uppercase tracking-wider text-bg-deep flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5">
        <span>{QUIZ.topBar.prefix}</span>
        <span>{QUIZ.topBar.cta} {CONTACT.phoneOwner}</span>
        <span aria-hidden className="opacity-50">·</span>
        <span
          className="font-sans text-[16px] sm:text-[18px] font-semibold tabular-nums tracking-normal"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          {CONTACT.phone.replace(/^\+48\s?/, "")}
        </span>
      </span>
      <ArrowRight ref={arrowRef} size={16} strokeWidth={2.5} aria-hidden />
    </a>
  );
}

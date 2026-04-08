"use client";
import { useRef } from "react";
import { Phone } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsapConfig";
import { CONTACT, QUIZ } from "@/content/landing";

export function PhoneCard() {
  const cardRef = useRef<HTMLAnchorElement>(null);

  useGSAP(
    () => {
      if (!cardRef.current) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (hover: hover) and (prefers-reduced-motion: no-preference)", () => {
        const card = cardRef.current!;
        const onEnter = () => {
          gsap.to(card, {
            backgroundColor: "#C4A97D",
            borderColor: "#C4A97D",
            color: "#080706",
            duration: 0.4,
            ease: "power2.out",
          });
        };
        const onLeave = () => {
          gsap.to(card, {
            backgroundColor: "#141210",
            borderColor: "#C4A97D",
            color: "#E2D9CE",
            duration: 0.4,
            ease: "power2.out",
          });
        };
        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mouseleave", onLeave);
        return () => {
          card.removeEventListener("mouseenter", onEnter);
          card.removeEventListener("mouseleave", onLeave);
        };
      });
      return () => mm.revert();
    },
    { scope: cardRef },
  );

  return (
    <div className="mt-12">
      {/* Separator */}
      <div className="flex items-center gap-4 mb-6" aria-hidden>
        <div className="flex-1 h-px bg-line" />
        <span className="font-sans text-[10px] text-dim uppercase tracking-[.15em]">
          {QUIZ.card.separator}
        </span>
        <div className="flex-1 h-px bg-line" />
      </div>

      <a
        ref={cardRef}
        href={`tel:${CONTACT.phoneE164}`}
        aria-label={`Zadzwoń do ${CONTACT.phoneOwner}, telefon ${CONTACT.phone}`}
        className="group block border-2 border-accent bg-bg-alt text-text px-8 py-10 sm:px-10 sm:py-12 text-center transition-colors"
        style={{ borderRadius: 0 }}
      >
        <div className="flex flex-col items-center gap-5">
          <span
            aria-hidden
            className="inline-flex h-14 w-14 items-center justify-center bg-accent/15 group-hover:bg-bg-deep/10 transition-colors"
          >
            <Phone size={24} strokeWidth={1.75} className="text-accent group-hover:text-bg-deep transition-colors" />
          </span>
          <h3
            className="font-display font-bold leading-tight"
            style={{ fontSize: "clamp(22px, 2.6vw, 30px)", letterSpacing: "-0.02em" }}
          >
            {QUIZ.card.title} {CONTACT.phoneOwner}
          </h3>
          <div
            className="font-sans font-medium text-accent group-hover:text-bg-deep transition-colors"
            style={{
              fontSize: "clamp(28px, 3.6vw, 36px)",
              fontVariantNumeric: "tabular-nums",
              letterSpacing: "0.02em",
            }}
          >
            {CONTACT.phone}
          </div>
        </div>
      </a>
      <p className="mt-3 text-center font-sans text-[12px] text-dim">
        {QUIZ.card.note}
      </p>
    </div>
  );
}

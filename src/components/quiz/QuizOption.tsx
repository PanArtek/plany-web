"use client";
import { forwardRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsapConfig";

type Props = {
  label: string;
  sub?: string;
  icon?: ReactNode;
  selected?: boolean;
  onSelect: () => void;
};

export const QuizOption = forwardRef<HTMLButtonElement, Props>(
  function QuizOption({ label, sub, icon, selected, onSelect }, ref) {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const el = e.currentTarget;
      // Brief press animation, then advance.
      gsap
        .timeline()
        .to(el, { scale: 0.97, duration: 0.1, ease: "power2.in" })
        .to(el, {
          scale: 1,
          duration: 0.2,
          ease: "back.out(1.7)",
          onComplete: onSelect,
        });
    };

    return (
      <button
        ref={ref}
        type="button"
        onClick={handleClick}
        aria-pressed={selected}
        className={`group inline-flex w-full items-center gap-4 border px-4 py-4 text-left transition-colors min-h-14 will-change-transform cursor-pointer ${
          selected
            ? "border-accent bg-accent/10"
            : "border-line bg-bg-alt hover:border-dim hover:bg-[#1C1A16]"
        }`}
      >
        {icon && (
          <span
            aria-hidden
            className={`inline-flex h-9 w-9 flex-shrink-0 items-center justify-center border ${
              selected ? "border-accent text-accent" : "border-line text-dim group-hover:text-muted"
            }`}
          >
            {icon}
          </span>
        )}
        <span className="flex flex-col min-w-0">
          <span
            className={`font-sans font-medium text-[14px] leading-tight ${
              selected ? "text-text" : "text-text"
            }`}
          >
            {label}
          </span>
          {sub && (
            <span className="font-sans text-[11px] text-dim uppercase tracking-wide mt-1">
              {sub}
            </span>
          )}
        </span>
      </button>
    );
  },
);

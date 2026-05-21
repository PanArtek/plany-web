"use client";
import { Fragment, useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsapConfig";

type Props = {
  items: readonly string[];
  activeIndex: number;
  onSelect?: (i: number) => void;
  className?: string;
};

const ACTIVE_COLOR = "#E2D9CE";
const INACTIVE_COLOR = "#9A8E7E";
const TWEEN_SEC = 0.4;

export function SpecializationsRotator({
  items,
  activeIndex,
  onSelect,
  className = "",
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<Array<HTMLElement | null>>([]);

  useGSAP(
    () => {
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
          const words = wordRefs.current.filter(Boolean) as HTMLElement[];
          if (words.length === 0) return;

          words.forEach((el, i) => {
            const color = i === activeIndex ? ACTIVE_COLOR : INACTIVE_COLOR;
            if (reduced) {
              gsap.set(el, { color });
            } else {
              gsap.to(el, {
                color,
                duration: TWEEN_SEC,
                ease: "power2.inOut",
                overwrite: "auto",
              });
            }
          });
        },
      );
      return () => mm.revert();
    },
    { scope: containerRef, dependencies: [activeIndex, items] },
  );

  const interactive = typeof onSelect === "function";

  return (
    <div
      ref={containerRef}
      role={interactive ? undefined : "list"}
      aria-label={interactive ? undefined : "Nasze specjalizacje"}
      className={`flex flex-wrap items-center gap-x-2 gap-y-1 ${className}`}
      style={{
        fontSize: "clamp(13px, 1.4vw, 16px)",
        fontWeight: 500,
        letterSpacing: "-0.005em",
        lineHeight: 1.4,
      }}
    >
      {items.map((word, i) => (
        <Fragment key={word}>
          {i > 0 && (
            <span className="text-dim select-none" aria-hidden>
              /
            </span>
          )}
          {interactive ? (
            <button
              ref={(el) => {
                wordRefs.current[i] = el;
              }}
              type="button"
              onClick={() => onSelect!(i)}
              aria-pressed={i === activeIndex}
              aria-label={`Pokaż kategorię ${word}`}
              className="text-muted will-change-[color] cursor-pointer bg-transparent border-0 p-0 font-inherit tracking-inherit hover:text-text transition-colors"
              style={{
                font: "inherit",
                letterSpacing: "inherit",
                lineHeight: "inherit",
              }}
            >
              {word}
            </button>
          ) : (
            <span
              ref={(el) => {
                wordRefs.current[i] = el;
              }}
              role="listitem"
              className="text-muted will-change-[color]"
            >
              {word}
            </span>
          )}
        </Fragment>
      ))}
    </div>
  );
}

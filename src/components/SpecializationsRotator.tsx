"use client";
import { Fragment, useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsapConfig";

type Props = {
  items: readonly string[];
  /** ms between switches; default 1000 */
  intervalMs?: number;
  className?: string;
};

const TWEEN_MS = 400;

export function SpecializationsRotator({
  items,
  intervalMs = 1000,
  className = "",
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<Array<HTMLSpanElement | null>>([]);

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

          if (reduced) {
            gsap.set(words, { color: "#E2D9CE" });
            return;
          }

          gsap.set(words, { color: "#9A8E7E" });
          gsap.set(words[0], { color: "#E2D9CE" });

          const dwellSec = Math.max(0, (intervalMs - TWEEN_MS) / 1000);
          const tweenSec = TWEEN_MS / 1000;

          const tl = gsap.timeline({ repeat: -1 });
          words.forEach((_, i) => {
            const next = (i + 1) % words.length;
            tl.to(
              words[i],
              {
                color: "#9A8E7E",
                duration: tweenSec,
                ease: "power2.inOut",
              },
              `+=${dwellSec}`,
            ).to(
              words[next],
              {
                color: "#E2D9CE",
                duration: tweenSec,
                ease: "power2.inOut",
              },
              "<",
            );
          });
        },
      );
      return () => mm.revert();
    },
    { scope: containerRef, dependencies: [items, intervalMs] },
  );

  return (
    <div
      ref={containerRef}
      role="list"
      aria-label="Nasze specjalizacje"
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
          <span
            ref={(el) => {
              wordRefs.current[i] = el;
            }}
            role="listitem"
            className="text-muted will-change-[color]"
          >
            {word}
          </span>
        </Fragment>
      ))}
    </div>
  );
}

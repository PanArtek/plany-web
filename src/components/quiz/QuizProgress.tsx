"use client";
import { useEffect, useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsapConfig";

type Props = {
  current: number; // 1..total
  total: number;
  label: string;
};

export function QuizProgress({ current, total, label }: Props) {
  const fillRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const target = Math.max(0, Math.min(1, current / total));

  useGSAP(
    () => {
      if (!fillRef.current) return;
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
            gsap.set(fillRef.current, { scaleX: target });
            return;
          }
          gsap.to(fillRef.current, {
            scaleX: target,
            duration: 0.5,
            ease: "power2.out",
          });
        },
      );
      return () => mm.revert();
    },
    { dependencies: [target], scope: containerRef },
  );

  // Set initial scale on mount before tween
  useEffect(() => {
    if (fillRef.current) {
      fillRef.current.style.transformOrigin = "left center";
    }
  }, []);

  return (
    <div ref={containerRef} className="w-full">
      <div
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuetext={`${label}: krok ${current} z ${total}`}
        aria-label={label}
        className="relative h-px bg-line w-full"
      >
        <div
          ref={fillRef}
          className="absolute inset-0 bg-accent origin-left"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
      <div className="mt-2 font-sans text-[10px] text-dim uppercase tracking-wider">
        Krok {current} z {total}
      </div>
    </div>
  );
}

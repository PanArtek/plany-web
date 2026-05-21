import Image from "next/image";
import type { ProcessStep } from "./types";
import { TOTAL_STEPS } from "./data";

interface ProcessMediaProps {
  step: ProcessStep;
  isActive: boolean;
  priority?: boolean;
}

export function ProcessMedia({ step, isActive, priority }: ProcessMediaProps) {
  return (
    <div
      data-media
      className="relative aspect-[4/5] overflow-hidden border border-line bg-bg-alt"
    >
      {/* Counter overlay */}
      <div
        data-counter
        className="absolute top-6 left-6 z-10 flex items-baseline gap-2"
      >
        <span className="font-display italic text-accent leading-none text-[64px] min-[900px]:text-[96px]">
          {step.num}
        </span>
        <span className="font-sans text-xs tracking-wider text-muted">
          / {String(TOTAL_STEPS).padStart(2, "0")}
        </span>
      </div>

      {/* Corner brackets */}
      <span
        data-bracket="tr"
        aria-hidden
        className="absolute top-4 right-4 w-6 h-6 border-t border-r border-accent"
      />
      <span
        data-bracket="bl"
        aria-hidden
        className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-accent"
      />

      {/* Image or placeholder */}
      {step.image ? (
        <Image
          src={step.image}
          alt={`${step.label} — etap ${step.num}`}
          fill
          sizes="(max-width: 900px) 100vw, 60vw"
          className="object-cover"
          {...(priority ? { priority: true } : { loading: "lazy" })}
        />
      ) : (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center p-10"
          style={{
            background:
              "repeating-linear-gradient(45deg, transparent, transparent 12px, rgba(196,169,125,0.03) 12px, rgba(196,169,125,0.03) 13px)",
          }}
        >
          <div className="font-sans text-[10px] tracking-[0.25em] uppercase text-dim mb-4">
            Etap {step.num} · {step.label}
          </div>
          <div className="font-display text-4xl italic text-muted text-center mb-4">
            {step.title}
          </div>
          <div className="font-sans text-[13px] text-dim text-center max-w-[280px] leading-normal">
            Zdjęcie w przygotowaniu
          </div>
          <div className="mt-8 pt-6 border-t border-line font-sans text-[9px] tracking-[0.2em] uppercase text-dim">
            4:5 · 1600px · WebP
          </div>
        </div>
      )}
    </div>
  );
}

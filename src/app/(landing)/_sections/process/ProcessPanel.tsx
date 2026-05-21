import Image from "next/image";
import type { ProcessStep } from "./types";
import { TOTAL_STEPS } from "./data";
import { cn } from "@/lib/utils";

interface ProcessPanelProps {
  step: ProcessStep;
  index: number;
  isActive: boolean;
}

export function ProcessPanel({ step, index, isActive }: ProcessPanelProps) {
  const tabId = `proc-tab-${index}`;
  const panelId = `proc-panel-${index}`;

  return (
    <div
      id={panelId}
      role="tabpanel"
      aria-labelledby={tabId}
      tabIndex={0}
      aria-hidden={!isActive}
      className={cn(
        "relative overflow-hidden",
        step.embed
          ? "aspect-[4/5] min-[900px]:aspect-[4/5] min-[900px]:max-w-[720px] min-[900px]:mx-auto"
          : "aspect-[3/4] min-[900px]:aspect-[16/9] min-[900px]:min-h-[560px]",
        isActive
          ? "relative"
          : "absolute inset-0 opacity-0 pointer-events-none",
      )}
    >
      {step.embed ? (
        /* Embedded HTML — fills entire panel */
        <iframe
          data-media
          src={step.embed}
          title={`${step.label} — etap ${step.num}`}
          className="absolute inset-0 w-full h-full border-0"
          loading="lazy"
        />
      ) : (
        <>
          {/* Background image or placeholder */}
          <div data-media className="absolute inset-0">
            {step.image ? (
              <Image
                src={step.image}
                alt={`${step.label} — etap ${step.num}`}
                fill
                sizes="(max-width: 900px) 100vw, 100vw"
                className="object-cover"
                {...(index === 0 ? { priority: true } : { loading: "lazy" as const })}
              />
            ) : (
              <div
                className="absolute inset-0 bg-bg-alt"
                style={{
                  background:
                    "repeating-linear-gradient(45deg, transparent, transparent 12px, rgba(196,169,125,0.03) 12px, rgba(196,169,125,0.03) 13px)",
                }}
              />
            )}
            {/* Dark gradient — heavier at bottom for text */}
            <div className="absolute inset-0 bg-gradient-to-t from-bg from-15% via-bg/70 via-50% to-transparent" />
          </div>

          {/* Counter — top left */}
          <div
            data-counter
            className="absolute top-4 left-5 min-[900px]:top-6 min-[900px]:left-8 z-10 flex items-baseline gap-1.5"
          >
            <span className="font-display italic text-accent/80 leading-none text-[40px] min-[900px]:text-[56px]">
              {step.num}
            </span>
            <span className="font-sans text-[10px] tracking-wider text-text/40">
              / {String(TOTAL_STEPS).padStart(2, "0")}
            </span>
          </div>

          {/* Corner brackets */}
          <span
            data-bracket="tr"
            aria-hidden
            className="absolute top-3 right-3 w-4 h-4 min-[900px]:top-4 min-[900px]:right-4 min-[900px]:w-5 min-[900px]:h-5 border-t border-r border-accent/50 z-10"
          />
          <span
            data-bracket="bl"
            aria-hidden
            className="absolute bottom-3 left-3 w-4 h-4 min-[900px]:bottom-4 min-[900px]:left-4 min-[900px]:w-5 min-[900px]:h-5 border-b border-l border-accent/50 z-10"
          />

          {/* Content — pinned to bottom */}
          <div className="absolute bottom-0 left-0 right-0 z-10 p-5 min-[900px]:p-10">
            <div data-panel-content className="flex items-center gap-3 mb-3">
              <span className="font-sans text-[10px] min-[900px]:text-[11px] tracking-[0.2em] uppercase text-text/60">
                {step.label}
              </span>
              <span className="font-sans text-[9px] min-[900px]:text-[10px] text-text/40 py-0.5 px-2 border border-text/15">
                {step.duration}
              </span>
            </div>

            <h3
              data-panel-content
              className="font-display font-normal leading-[1.08] tracking-[-0.015em] text-text mb-3 text-[24px] min-[900px]:text-[44px] max-w-[600px]"
            >
              {step.title} <em className="italic text-accent">{step.titleEm}</em>
            </h3>

            <p
              data-panel-content
              className="font-sans text-[13px] min-[900px]:text-[15px] leading-[1.5] text-text/60 font-light max-w-[500px]"
            >
              {step.deliverable}
            </p>
          </div>
        </>
      )}
    </div>
  );
}

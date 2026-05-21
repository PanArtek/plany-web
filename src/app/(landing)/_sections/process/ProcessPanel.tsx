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
        "relative overflow-hidden min-h-[480px] min-[900px]:min-h-[600px]",
        isActive
          ? "relative"
          : "absolute inset-0 opacity-0 pointer-events-none",
      )}
    >
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
            className="absolute inset-0"
            style={{
              background:
                "repeating-linear-gradient(45deg, transparent, transparent 12px, rgba(196,169,125,0.03) 12px, rgba(196,169,125,0.03) 13px)",
            }}
          />
        )}
        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/80 to-bg/30" />
      </div>

      {/* Counter overlay — top left */}
      <div
        data-counter
        className="absolute top-5 left-5 min-[900px]:top-8 min-[900px]:left-8 z-10 flex items-baseline gap-2"
      >
        <span className="font-display italic text-accent leading-none text-[48px] min-[900px]:text-[72px]">
          {step.num}
        </span>
        <span className="font-sans text-xs tracking-wider text-text/60">
          / {String(TOTAL_STEPS).padStart(2, "0")}
        </span>
      </div>

      {/* Corner brackets */}
      <span
        data-bracket="tr"
        aria-hidden
        className="absolute top-4 right-4 w-5 h-5 min-[900px]:w-6 min-[900px]:h-6 border-t border-r border-accent z-10"
      />
      <span
        data-bracket="bl"
        aria-hidden
        className="absolute bottom-4 left-4 w-5 h-5 min-[900px]:w-6 min-[900px]:h-6 border-b border-l border-accent z-10"
      />

      {/* Content overlay — bottom */}
      <div className="relative z-10 flex flex-col justify-end h-full p-5 min-[900px]:p-10">
        {/* Eyebrow */}
        <div
          data-panel-content
          className="flex items-center gap-3 mb-4"
        >
          <span className="font-sans text-[10px] min-[900px]:text-[11px] tracking-[0.25em] uppercase text-text/70">
            {step.label}
          </span>
          <span className="font-sans text-[10px] min-[900px]:text-[11px] text-text/50 py-0.5 px-2 border border-text/20">
            {step.duration}
          </span>
        </div>

        {/* Title */}
        <h3
          data-panel-content
          className="font-display font-normal leading-[1.05] tracking-[-0.015em] text-text mb-4 min-[900px]:mb-5 text-[26px] min-[900px]:text-[clamp(36px,3.5vw,56px)] max-w-[700px]"
        >
          {step.title} <em className="italic text-accent">{step.titleEm}</em>
        </h3>

        {/* Deliverable */}
        <p
          data-panel-content
          className="font-display text-[15px] min-[900px]:text-[20px] leading-[1.4] text-text/80 italic pl-4 border-l border-accent mb-4 max-w-[600px]"
        >
          {step.deliverable}
        </p>

        {/* Body */}
        <p
          data-panel-content
          className="font-sans text-[13px] min-[900px]:text-sm leading-[1.6] text-text/60 font-light max-w-[550px]"
        >
          {step.body}
        </p>
      </div>
    </div>
  );
}

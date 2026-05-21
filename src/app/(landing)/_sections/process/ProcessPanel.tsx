import type { ProcessStep } from "./types";
import { ProcessMedia } from "./ProcessMedia";
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
        "min-[900px]:grid min-[900px]:grid-cols-[1.2fr_1fr] min-[900px]:gap-20 min-[900px]:min-h-[600px] min-[900px]:items-stretch",
        isActive
          ? "relative"
          : "absolute inset-0 opacity-0 pointer-events-none",
      )}
    >
      {/* Media side */}
      <ProcessMedia step={step} isActive={isActive} priority={index === 0} />

      {/* Content side */}
      <div className="pt-8 min-[900px]:py-10 overflow-hidden">
        {/* 1. Eyebrow */}
        <div
          data-panel-content
          className="flex items-center gap-4 mb-8"
        >
          <span className="font-display italic text-[56px] leading-none text-accent">
            {step.num}
          </span>
          <span className="font-sans text-[11px] tracking-[0.25em] uppercase text-muted">
            {step.label}
          </span>
          <span className="ml-auto font-sans text-[11px] text-dim py-1 px-2.5 border border-line">
            {step.duration}
          </span>
        </div>

        {/* 2. Title */}
        <h3
          data-panel-content
          className="font-display font-normal leading-[1.05] tracking-[-0.015em] text-text mb-8"
          style={{ fontSize: "clamp(40px, 4vw, 64px)" }}
        >
          {step.title} <em className="italic text-accent">{step.titleEm}</em>
        </h3>

        {/* 3. Deliverable */}
        <p
          data-panel-content
          className="font-display text-[22px] leading-[1.4] text-text/85 italic pl-5 border-l border-accent mb-8"
        >
          {step.deliverable}
        </p>

        {/* 4. Body */}
        <p
          data-panel-content
          className="font-sans text-base leading-[1.7] text-muted font-light mb-10"
        >
          {step.body}
        </p>

        {/* 5. Proof points */}
        <ul data-panel-content className="list-none mb-12">
          {step.proof.map((point) => (
            <li
              key={point}
              className="flex items-start gap-3 py-3 border-t border-line/50 font-sans text-xs tracking-[0.05em] text-text/85 last:border-b last:border-line/50"
            >
              <span className="text-accent font-display italic shrink-0">
                →
              </span>
              {point}
            </li>
          ))}
        </ul>

        {/* 6. Case link */}
        <a
          data-panel-content
          href={step.caseLink}
          className="inline-flex items-center gap-2 font-sans text-[11px] tracking-[0.2em] uppercase text-muted pb-1 border-b border-line transition-colors hover:text-accent hover:border-accent"
        >
          <span>
            {step.caseLabel
              ? `Zobacz ten etap — ${step.caseLabel}`
              : "Porozmawiajmy o serwisie"}
          </span>
          <span>↗</span>
        </a>
      </div>
    </div>
  );
}

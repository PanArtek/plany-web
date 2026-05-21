import { forwardRef } from "react";
import type { ProcessStep } from "./types";
import { tabVariants } from "./tab.variants";
import { cn } from "@/lib/utils";

interface ProcessTabProps {
  step: ProcessStep;
  index: number;
  isActive: boolean;
  onClick: () => void;
}

export const ProcessTab = forwardRef<HTMLButtonElement, ProcessTabProps>(
  function ProcessTab({ step, index, isActive, onClick }, ref) {
    const tabId = `proc-tab-${index}`;
    const panelId = `proc-panel-${index}`;

    return (
      <button
        ref={ref}
        id={tabId}
        role="tab"
        aria-selected={isActive}
        aria-controls={panelId}
        tabIndex={isActive ? 0 : -1}
        onClick={onClick}
        className={cn(
          tabVariants({ state: isActive ? "active" : "idle" }),
          "snap-start",
        )}
      >
        <span className="block font-display italic text-[24px] min-[900px]:text-[32px] leading-none mb-2 min-[900px]:mb-3 text-accent">
          {step.num}
        </span>
        <span className="block font-sans text-[9px] min-[900px]:text-[10px] tracking-[0.2em] uppercase mb-1">
          {step.label} · {step.duration}
        </span>
        <span
          className={cn(
            "block font-display text-sm min-[900px]:text-base text-text transition-opacity",
            isActive ? "opacity-100" : "opacity-70",
          )}
        >
          {step.title}
        </span>
        {/* Indicator line — GSAP animates scaleX */}
        <span
          data-indicator
          aria-hidden
          className="absolute left-0 right-0 bottom-0 h-0.5 bg-accent origin-left"
          style={{ transform: isActive ? "scaleX(1)" : "scaleX(0)" }}
        />
      </button>
    );
  },
);

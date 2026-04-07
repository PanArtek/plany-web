"use client";
import {
  Search,
  FileText,
  HardHat,
  ClipboardCheck,
  LifeBuoy,
  type LucideIcon,
} from "lucide-react";
import { useInView } from "@/lib/hooks/use-in-view";
import {
  STEPS,
  PROCES_TITLE_LINES,
  PROCES_INTRO,
  type StepIcon,
} from "@/content/landing";

const ICONS: Record<StepIcon, LucideIcon> = {
  Search,
  FileText,
  HardHat,
  ClipboardCheck,
  LifeBuoy,
};

export function Proces() {
  const [ref, vis] = useInView<HTMLDivElement>();
  const [ref2, vis2] = useInView<HTMLDivElement>();

  return (
    <section
      id="proc"
      className="bg-bg border-t border-line section-pad-x"
      style={{ paddingBlock: "clamp(64px,10vw,120px)" }}
    >
      <div className="mx-auto" style={{ maxWidth: "var(--container-max)" }}>
        <div
          ref={ref}
          className="flex flex-wrap justify-between items-end gap-8"
          style={{ marginBottom: "clamp(40px,5vw,60px)" }}
        >
          <div className="max-w-[640px]">
            <div className="flex items-center gap-4 mb-4">
              <div
                className="h-[2px] bg-accent transition-all duration-700"
                style={{ width: vis ? 36 : 0, transitionDelay: "200ms" }}
                aria-hidden
              />
              <span className="font-sans text-[11px] text-dim uppercase tracking-[.1em]">
                Proces
              </span>
            </div>
            <h2
              className="font-display font-extrabold text-text leading-[1.05] transition-all duration-700"
              style={{
                fontSize: "clamp(26px,4vw,42px)",
                letterSpacing: "-.03em",
                opacity: vis ? 1 : 0,
                transform: vis ? "translateY(0)" : "translateY(14px)",
                transitionDelay: "200ms",
              }}
            >
              {PROCES_TITLE_LINES[0]}
              <br />
              {PROCES_TITLE_LINES[1]}
            </h2>
          </div>
          <p
            className="font-sans font-light text-muted leading-relaxed max-w-[360px] transition-opacity duration-700"
            style={{
              fontSize: "clamp(13px,1.3vw,15px)",
              opacity: vis ? 1 : 0,
              transitionDelay: "400ms",
            }}
          >
            {PROCES_INTRO}
          </p>
        </div>

        <div
          ref={ref2}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 relative"
          style={{ gap: "clamp(18px,2.5vw,32px)" }}
        >
          {STEPS.map((s, i) => {
            const Icon = ICONS[s.icon];
            return (
              <div
                key={s.n}
                className="group relative min-w-0 transition-all duration-700"
                style={{
                  opacity: vis2 ? 1 : 0,
                  transform: vis2 ? "translateY(0)" : "translateY(18px)",
                  transitionDelay: `${120 + i * 90}ms`,
                }}
              >
                <div className="flex items-center justify-between mb-3.5">
                  <span
                    className="font-display font-extrabold text-line group-hover:text-accent leading-none tracking-tight transition-colors"
                    style={{ fontSize: 30, letterSpacing: "-.03em" }}
                  >
                    {s.n}
                  </span>
                  <Icon
                    size={15}
                    strokeWidth={1.5}
                    className="text-dim group-hover:text-accent transition-colors"
                  />
                </div>
                <div className="w-4 group-hover:w-7 h-[2px] bg-accent mb-3 transition-all duration-500" />
                <h3
                  className="font-display font-bold text-text leading-snug mb-1"
                  style={{
                    fontSize: "clamp(15px,1.4vw,18px)",
                    letterSpacing: "-.01em",
                  }}
                >
                  {s.t}
                </h3>
                <div className="font-sans text-[10px] text-dim uppercase tracking-wider mb-2.5">
                  {s.sub}
                </div>
                <p
                  className="font-sans font-light text-muted leading-snug max-w-[240px]"
                  style={{ fontSize: 12.5 }}
                >
                  {s.d}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

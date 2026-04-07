"use client";
import {
  MessageSquare,
  Ruler,
  HardHat,
  ClipboardCheck,
  type LucideIcon,
} from "lucide-react";
import { useInView } from "@/lib/hooks/use-in-view";
import { STEPS, type StepIcon } from "@/content/landing";

const ICONS: Record<StepIcon, LucideIcon> = {
  MessageSquare,
  Ruler,
  HardHat,
  ClipboardCheck,
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
        <div ref={ref} style={{ marginBottom: "clamp(40px,5vw,60px)" }}>
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
            Wielkie PLANY
            <br />
            zaczynają się tu.
          </h2>
        </div>

        <div
          ref={ref2}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
          style={{ gap: "clamp(20px,3vw,40px)" }}
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
                  transitionDelay: `${120 + i * 100}ms`,
                }}
              >
                <div className="flex items-center gap-2.5 mb-3.5">
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
                  className="font-display font-bold text-text mb-2"
                  style={{ fontSize: "clamp(16px,1.5vw,19px)" }}
                >
                  {s.t}
                </h3>
                <p
                  className="font-sans text-[13px] font-light text-muted leading-relaxed max-w-[260px]"
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

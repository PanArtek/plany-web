"use client";
import { useRef } from "react";
import {
  Search,
  FileText,
  HardHat,
  ClipboardCheck,
  LifeBuoy,
  type LucideIcon,
} from "lucide-react";
import { useScrollReveal } from "@/lib/animations/useScrollReveal";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsapConfig";
import {
  STEPS,
  PROCES_KICKER_LINES,
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
  const headerRef = useScrollReveal<HTMLDivElement>({ stagger: 0.08 });
  const stepsRef = useRef<HTMLDivElement>(null);

  // Sequential timeline reveal for steps + connecting line.
  useGSAP(
    () => {
      if (!stepsRef.current) return;
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
          const cards = stepsRef.current!.querySelectorAll<HTMLElement>(
            "[data-step]",
          );
          const line = stepsRef.current!.querySelector<HTMLElement>(
            "[data-step-line]",
          );

          if (reduced) {
            gsap.set(cards, { opacity: 1, y: 0 });
            if (line) gsap.set(line, { scaleX: 1 });
            return;
          }

          gsap.set(cards, { opacity: 0, y: 24 });
          if (line) gsap.set(line, { scaleX: 0, transformOrigin: "left center" });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: stepsRef.current!,
              start: "top 70%",
              once: true,
            },
          });

          if (line) {
            tl.to(line, { scaleX: 1, duration: 1.1, ease: "power2.out" }, 0);
          }
          tl.to(
            cards,
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power3.out",
              stagger: 0.2,
            },
            0.1,
          );
        },
      );
      return () => mm.revert();
    },
    { scope: stepsRef },
  );

  void ScrollTrigger;

  return (
    <section
      id="proc"
      className="bg-bg border-t border-line section-pad-x"
      style={{ paddingBlock: "clamp(64px,10vw,120px)" }}
    >
      <div className="mx-auto" style={{ maxWidth: "var(--container-max)" }}>
        <div
          ref={headerRef}
          className="flex flex-wrap justify-between items-end gap-8"
          style={{ marginBottom: "clamp(40px,5vw,60px)" }}
        >
          <div className="max-w-[640px]">
            <div className="flex items-center gap-4 mb-4" data-reveal>
              <div className="h-[2px] bg-accent w-9" aria-hidden />
              <span className="font-sans text-[11px] text-dim uppercase tracking-[.1em]">
                Proces
              </span>
            </div>
            <p
              className="font-display font-bold text-muted leading-[1.15] mb-3"
              style={{
                fontSize: "clamp(18px,2.4vw,26px)",
                letterSpacing: "-.02em",
              }}
              data-reveal
            >
              {PROCES_KICKER_LINES[0]}
              <br />
              {PROCES_KICKER_LINES[1]}
            </p>
            <h2
              className="font-display font-extrabold text-text leading-[1.05]"
              style={{
                fontSize: "clamp(26px,4vw,42px)",
                letterSpacing: "-.03em",
              }}
              data-reveal
            >
              {PROCES_TITLE_LINES[0]}
              <br />
              {PROCES_TITLE_LINES[1]}
            </h2>
          </div>
          <p
            className="font-sans font-light text-muted leading-relaxed max-w-[360px]"
            style={{ fontSize: "clamp(13px,1.3vw,15px)" }}
            data-reveal
          >
            {PROCES_INTRO}
          </p>
        </div>

        <div
          ref={stepsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 relative"
          style={{ gap: "clamp(18px,2.5vw,32px)" }}
        >
          {/* Connecting line behind cards on lg+ */}
          <div
            data-step-line
            aria-hidden
            className="hidden lg:block absolute left-0 right-0 top-[15px] h-px bg-line pointer-events-none"
          />
          {STEPS.map((s, i) => {
            const Icon = ICONS[s.icon];
            return (
              <div
                key={s.n}
                data-step
                className="group relative min-w-0 bg-bg"
                style={{ zIndex: 1 }}
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
                {/* Suppress unused index warning */}
                <span hidden>{i}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

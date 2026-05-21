"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsapConfig";
import { useScrollReveal } from "@/lib/animations/useScrollReveal";
import {
  PROCES_KICKER_LINES,
  PROCES_TITLE_LINES,
  PROCES_INTRO,
} from "@/content/landing";
import { PROCESS_STEPS } from "./data";
import { ProcessTab } from "./ProcessTab";
import { ProcessPanel } from "./ProcessPanel";

export function ProcessTabs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const prevIndexRef = useRef(0);
  const hasRevealedRef = useRef(false);

  const headerRef = useScrollReveal<HTMLDivElement>({ stagger: 0.08 });
  const sectionRef = useRef<HTMLDivElement>(null);
  const tabNavRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Scroll active tab into view on mobile
  useEffect(() => {
    const tab = tabRefs.current[activeIndex];
    if (tab && tabNavRef.current) {
      tab.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [activeIndex]);

  // Keyboard navigation (WAI-ARIA Tabs pattern)
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const count = PROCESS_STEPS.length;
      let next = activeIndex;

      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
          next = (activeIndex + 1) % count;
          break;
        case "ArrowLeft":
        case "ArrowUp":
          next = (activeIndex - 1 + count) % count;
          break;
        case "Home":
          next = 0;
          break;
        case "End":
          next = count - 1;
          break;
        default:
          return;
      }

      e.preventDefault();
      setActiveIndex(next);
      tabRefs.current[next]?.focus();
    },
    [activeIndex],
  );

  // GSAP animations
  useGSAP(
    () => {
      if (!sectionRef.current || !panelsRef.current) return;

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
            // Make everything visible immediately
            const allMedia =
              panelsRef.current!.querySelectorAll("[data-media]");
            const allCounters =
              panelsRef.current!.querySelectorAll("[data-counter]");
            const allBrackets =
              panelsRef.current!.querySelectorAll("[data-bracket]");
            const allContent =
              panelsRef.current!.querySelectorAll("[data-panel-content]");

            gsap.set(allMedia, { clipPath: "inset(0 0% 0 0)" });
            gsap.set(allCounters, { scale: 1, opacity: 1 });
            gsap.set(allBrackets, { scale: 1, opacity: 1 });
            gsap.set(allContent, { y: 0, opacity: 1 });
            hasRevealedRef.current = true;
            return;
          }

          // Initial scroll reveal for the tabs area
          ScrollTrigger.create({
            trigger: tabNavRef.current!,
            start: "top 80%",
            once: true,
            onEnter: () => {
              hasRevealedRef.current = true;
              animatePanel(activeIndex);
            },
          });
        },
      );

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  // Animate panel on tab change
  useEffect(() => {
    if (!hasRevealedRef.current) return;
    if (activeIndex === prevIndexRef.current) return;

    prevIndexRef.current = activeIndex;
    animatePanel(activeIndex);
  }, [activeIndex]);

  function animatePanel(index: number) {
    if (!panelsRef.current) return;

    // Check reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const panel = panelsRef.current.querySelector(
      `[data-panel-index="${index}"]`,
    );
    if (!panel) return;

    // Kill running tweens in this panel
    gsap.killTweensOf(panel.querySelectorAll("*"));

    const media = panel.querySelector("[data-media]");
    const counter = panel.querySelector("[data-counter]");
    const brackets = panel.querySelectorAll("[data-bracket]");
    const content = panel.querySelectorAll("[data-panel-content]");

    // Media clip-path reveal — 1s
    if (media) {
      gsap.fromTo(
        media,
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", duration: 1, ease: "power3.out" },
      );
    }

    // Counter pop — 0.6s, delay 0.4s
    if (counter) {
      gsap.fromTo(
        counter,
        { scale: 0.5, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          delay: 0.4,
          ease: "power3.out",
        },
      );
    }

    // Brackets in — 0.6s, delay 0.6s
    if (brackets.length) {
      gsap.fromTo(
        brackets,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          delay: 0.6,
          ease: "power3.out",
        },
      );
    }

    // Content stagger — 0.8s, stagger 0.1s
    if (content.length) {
      gsap.fromTo(
        content,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        },
      );
    }
  }

  void ScrollTrigger;

  return (
    <div ref={sectionRef}>
      {/* Header — matches existing section header scale */}
      <div
        ref={headerRef}
        className="flex flex-wrap justify-between items-end gap-8 mb-10 min-[900px]:mb-14"
        style={{ paddingTop: "clamp(64px,10vw,120px)" }}
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
            id="proc-heading"
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

      {/* Tab navigation */}
      <nav
        ref={tabNavRef}
        role="tablist"
        aria-label="Etapy procesu"
        onKeyDown={handleKeyDown}
        data-lenis-prevent
        className="flex overflow-x-auto min-[900px]:overflow-visible min-[900px]:grid min-[900px]:grid-cols-5 border-t border-b border-line mb-10 min-[900px]:mb-20 -mx-[var(--section-pad)] px-[var(--section-pad)] min-[900px]:mx-0 min-[900px]:px-0"
        style={{
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
        }}
      >
        {PROCESS_STEPS.map((step, i) => (
          <ProcessTab
            key={step.id}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            step={step}
            index={i}
            isActive={activeIndex === i}
            onClick={() => setActiveIndex(i)}
          />
        ))}
      </nav>

      {/* Tab panels */}
      <div ref={panelsRef} className="relative">
        {PROCESS_STEPS.map((step, i) => (
          <div key={step.id} data-panel-index={i}>
            <ProcessPanel
              step={step}
              index={i}
              isActive={activeIndex === i}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

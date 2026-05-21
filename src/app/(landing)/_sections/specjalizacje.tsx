"use client";
import {
  Building2,
  GraduationCap,
  UtensilsCrossed,
  Stethoscope,
  PawPrint,
  Pill,
  Users,
  ShoppingBag,
  Sparkles,
  Dumbbell,
  Scale,
  BedDouble,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { useScrollReveal } from "@/lib/animations/useScrollReveal";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsapConfig";
import { SPECS, SPEC_TITLE_LINES, type SpecIcon } from "@/content/landing";
import { HERO_CATEGORIES } from "@/content/hero-categories";
import { useHeroCategory } from "../_components/hero-category-provider";

const ICONS: Record<SpecIcon, LucideIcon> = {
  Building2,
  GraduationCap,
  UtensilsCrossed,
  Stethoscope,
  PawPrint,
  Pill,
  Users,
  ShoppingBag,
  Sparkles,
  Dumbbell,
  Scale,
  BedDouble,
};

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-4 mb-4" data-reveal>
      <div className="h-[2px] bg-accent w-9" aria-hidden />
      <span className="font-sans text-[11px] text-dim uppercase tracking-[.1em]">
        {text}
      </span>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="font-display font-extrabold text-text leading-[1.05] tracking-tight"
      style={{
        fontSize: "clamp(26px,4vw,42px)",
        letterSpacing: "-.03em",
      }}
      data-reveal
    >
      {children}
    </h2>
  );
}

function CategoryTabs() {
  const { activeIndex, setActive } = useHeroCategory();

  const handleClick = (i: number) => {
    setActive(i);
    if (typeof document !== "undefined") {
      document
        .getElementById("hero")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div
      role="tablist"
      aria-label="Kategorie hero"
      className="flex flex-wrap items-center gap-x-5 gap-y-3 mb-8 md:mb-12"
      data-reveal
    >
      {HERO_CATEGORIES.map((cat, i) => {
        const isActive = i === activeIndex;
        return (
          <button
            key={cat.slug}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => handleClick(i)}
            className={`group relative cursor-pointer bg-transparent border-0 p-0 pb-1 font-sans font-medium text-[13px] md:text-sm uppercase tracking-wider transition-colors min-h-11 ${
              isActive
                ? "text-accent"
                : "text-muted hover:text-text"
            }`}
          >
            {cat.name}
            <span
              aria-hidden
              className={`absolute left-0 bottom-0 h-[2px] bg-accent transition-transform duration-300 ease-out origin-left ${
                isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-50"
              }`}
              style={{ width: "100%" }}
            />
          </button>
        );
      })}
    </div>
  );
}

export function Specjalizacje() {
  const headerRef = useScrollReveal<HTMLDivElement>();
  const gridRef = useScrollReveal<HTMLDivElement>({ stagger: 0.08 });

  // Magnetic hover (desktop + hover-capable only).
  useGSAP(
    () => {
      if (!gridRef.current) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (hover: hover)", () => {
        const cards = gridRef.current!.querySelectorAll<HTMLElement>(
          "[data-spec-card]",
        );
        const cleanups: Array<() => void> = [];

        cards.forEach((card) => {
          const onMove = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const relX = (e.clientX - rect.left) / rect.width - 0.5;
            const relY = (e.clientY - rect.top) / rect.height - 0.5;
            gsap.to(card, {
              x: relX * 16,
              y: relY * 16,
              duration: 0.5,
              ease: "power2.out",
            });
          };
          const onLeave = () => {
            gsap.to(card, {
              x: 0,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
            });
          };
          card.addEventListener("mousemove", onMove);
          card.addEventListener("mouseleave", onLeave);
          cleanups.push(() => {
            card.removeEventListener("mousemove", onMove);
            card.removeEventListener("mouseleave", onLeave);
          });
        });

        return () => cleanups.forEach((fn) => fn());
      });
      return () => mm.revert();
    },
    { scope: gridRef },
  );

  void ScrollTrigger;

  return (
    <section
      id="spec"
      className="bg-bg border-t border-line section-pad-x"
      style={{ paddingBlock: "clamp(64px,10vw,120px)" }}
    >
      <div className="mx-auto" style={{ maxWidth: "var(--container-max)" }}>
        <div ref={headerRef} style={{ marginBottom: "clamp(40px,5vw,60px)" }}>
          <SectionLabel text="Specjalizacje" />
          <SectionTitle>
            {SPEC_TITLE_LINES[0]}
            <br />
            {SPEC_TITLE_LINES[1]}
          </SectionTitle>
        </div>

        <CategoryTabs />

        <div
          ref={gridRef}
          className="grid gap-3 md:gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        >
          {SPECS.map((s) => {
            const Icon = ICONS[s.icon];
            return (
              <article
                key={s.tag}
                data-reveal
                data-spec-card
                className="group relative bg-bg-alt border border-line hover:border-dim hover:bg-[#1C1A16] flex flex-col transition-[background,border-color] duration-300 will-change-transform"
                style={{ padding: "clamp(28px,3vw,40px)" }}
              >
                <span
                  className="absolute top-0 left-0 h-[2px] bg-accent w-0 group-hover:w-full transition-all duration-500"
                  aria-hidden
                />
                <div className="flex justify-between items-start mb-6">
                  <span className="font-sans text-[11px] text-dim tracking-wider">
                    {s.tag}
                  </span>
                  <Icon
                    size={18}
                    strokeWidth={1.5}
                    className="text-dim group-hover:text-accent transition-colors"
                  />
                </div>
                <h3
                  className="font-display font-bold text-text leading-tight tracking-tight mb-5"
                  style={{
                    fontSize: "clamp(17px,1.8vw,21px)",
                    letterSpacing: "-.015em",
                  }}
                >
                  {s.title}
                </h3>
                <div className="w-full h-px bg-line mb-5" aria-hidden />
                <ul className="list-none flex flex-col gap-2.5 mb-7 flex-1">
                  {s.pts.map((p) => (
                    <li
                      key={p}
                      className="font-sans text-[13px] font-light text-muted leading-snug pl-3.5 relative"
                    >
                      <span
                        className="absolute left-0 top-2 w-1.5 h-px bg-dim"
                        aria-hidden
                      />
                      {p}
                    </li>
                  ))}
                </ul>
                <a
                  href="#real"
                  className="mt-auto inline-flex items-center gap-2 font-sans text-[11px] font-medium uppercase tracking-wider text-dim group-hover:text-accent no-underline transition-colors"
                >
                  Zobacz realizacje
                  <ArrowRight
                    size={12}
                    strokeWidth={2}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

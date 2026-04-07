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
import { useInView } from "@/lib/hooks/use-in-view";
import { SPECS, SPEC_TITLE_LINES, type SpecIcon } from "@/content/landing";

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

function SectionLabel({ text, vis }: { text: string; vis: boolean }) {
  return (
    <div className="flex items-center gap-4 mb-4">
      <div
        className="h-[2px] bg-accent transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)]"
        style={{ width: vis ? 36 : 0, transitionDelay: "200ms" }}
        aria-hidden
      />
      <span className="font-sans text-[11px] text-dim uppercase tracking-[.1em]">
        {text}
      </span>
    </div>
  );
}

function SectionTitle({
  children,
  vis,
}: {
  children: React.ReactNode;
  vis: boolean;
}) {
  return (
    <h2
      className="font-display font-extrabold text-text leading-[1.05] tracking-tight transition-all duration-700"
      style={{
        fontSize: "clamp(26px,4vw,42px)",
        letterSpacing: "-.03em",
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(14px)",
        transitionDelay: "200ms",
      }}
    >
      {children}
    </h2>
  );
}

export function Specjalizacje() {
  const [ref, vis] = useInView<HTMLDivElement>();
  const [ref2, vis2] = useInView<HTMLDivElement>();

  return (
    <section
      id="spec"
      className="bg-bg border-t border-line section-pad-x"
      style={{ paddingBlock: "clamp(64px,10vw,120px)" }}
    >
      <div className="mx-auto" style={{ maxWidth: "var(--container-max)" }}>
        <div ref={ref} style={{ marginBottom: "clamp(40px,5vw,60px)" }}>
          <SectionLabel text="Specjalizacje" vis={vis} />
          <SectionTitle vis={vis}>
            {SPEC_TITLE_LINES[0]}
            <br />
            {SPEC_TITLE_LINES[1]}
          </SectionTitle>
        </div>

        <div
          ref={ref2}
          className="grid gap-3 md:gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        >
          {SPECS.map((s, i) => {
            const Icon = ICONS[s.icon];
            return (
              <article
                key={s.tag}
                className="group relative bg-bg-alt border border-line hover:border-dim hover:bg-[#1C1A16] flex flex-col transition-all duration-300"
                style={{
                  padding: "clamp(28px,3vw,40px)",
                  opacity: vis2 ? 1 : 0,
                  transform: vis2 ? "translateY(0)" : "translateY(22px)",
                  transitionDelay: `${150 + i * 120}ms`,
                  transitionProperty: "opacity,transform,background,border-color",
                  transitionDuration: "600ms",
                }}
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

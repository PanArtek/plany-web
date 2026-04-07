"use client";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useInView } from "@/lib/hooks/use-in-view";
import { PROJECTS } from "@/content/landing";

const FILTERS = ["Wszystkie", "Biura", "Kliniki", "Edukacja", "Komercyjne"] as const;
type Filter = (typeof FILTERS)[number];

function ProjCard({
  p,
  index,
}: {
  p: (typeof PROJECTS)[number];
  index: number;
}) {
  const [ref, vis] = useInView<HTMLDivElement>();
  return (
    <article
      ref={ref}
      className="group cursor-pointer transition-all duration-500"
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(18px)",
        transitionDelay: `${index * 80}ms`,
      }}
    >
      <div
        className="relative aspect-[4/3] overflow-hidden mb-3.5"
        style={{ background: p.grad }}
      >
        <div
          className="absolute inset-0 opacity-[.04]"
          aria-hidden
          style={{
            backgroundImage:
              "linear-gradient(90deg,#9A8E7E 1px,transparent 1px),linear-gradient(0deg,#9A8E7E 1px,transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-[.12] group-hover:opacity-0 transition-opacity">
          <span
            className="font-display font-extrabold text-text"
            style={{ fontSize: 26 }}
          >
            {p.area}
          </span>
        </div>
        <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-accent/85">
          <span className="font-sans text-[12px] font-medium text-white uppercase tracking-wider">
            Zobacz więcej
          </span>
          <ArrowUpRight size={14} strokeWidth={2} color="#fff" />
        </div>
        <div className="absolute top-2.5 left-2.5 font-sans text-[10px] text-muted bg-bg-deep/70 backdrop-blur px-2 py-1 uppercase tracking-wide group-hover:opacity-0 transition-opacity">
          {p.cat}
        </div>
      </div>
      <div className="flex justify-between items-baseline">
        <div>
          <h3
            className="font-display font-bold text-text group-hover:text-accent transition-colors mb-0.5"
            style={{ fontSize: "clamp(15px,1.5vw,18px)", letterSpacing: "-.01em" }}
          >
            {p.name}
          </h3>
          <p className="font-sans text-[12px] font-light text-dim">{p.loc}</p>
        </div>
        <span className="font-sans text-[12px] text-dim whitespace-nowrap">
          {p.area}
        </span>
      </div>
    </article>
  );
}

export function Realizacje() {
  const [active, setActive] = useState<Filter>("Wszystkie");
  const [ref, vis] = useInView<HTMLDivElement>();
  const filtered =
    active === "Wszystkie"
      ? PROJECTS
      : PROJECTS.filter((p) => p.cat === active);

  return (
    <section
      id="real"
      className="bg-bg border-t border-line section-pad-x"
      style={{ paddingBlock: "clamp(64px,10vw,120px)" }}
    >
      <div className="mx-auto" style={{ maxWidth: "var(--container-max)" }}>
        <div
          ref={ref}
          className="flex flex-wrap justify-between items-end gap-6"
          style={{ marginBottom: "clamp(36px,5vw,56px)" }}
        >
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div
                className="h-[2px] bg-accent transition-all duration-700"
                style={{
                  width: vis ? 36 : 0,
                  transitionDelay: "200ms",
                }}
                aria-hidden
              />
              <span className="font-sans text-[11px] text-dim uppercase tracking-[.1em]">
                Portfolio
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
              Nasze realizacje
            </h2>
          </div>
          <div
            className="flex gap-2 flex-wrap transition-opacity duration-700"
            style={{ opacity: vis ? 1 : 0, transitionDelay: "350ms" }}
          >
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`font-sans text-[11px] uppercase tracking-wide px-3.5 py-2 border cursor-pointer transition-all min-h-11 ${
                  active === f
                    ? "bg-accent text-white border-accent font-medium"
                    : "bg-transparent text-dim border-line font-normal hover:border-dim"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-3.5 sm:gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <ProjCard key={p.name + active} p={p} index={i} />
          ))}
        </div>

        <div
          className="flex justify-between items-center pt-5 border-t border-line"
          style={{ marginTop: "clamp(28px,4vw,44px)" }}
        >
          <span className="font-sans text-[12px] text-dim">
            {filtered.length}{" "}
            {filtered.length === 1
              ? "projekt"
              : filtered.length < 5
                ? "projekty"
                : "projektów"}
          </span>
        </div>
      </div>
    </section>
  );
}

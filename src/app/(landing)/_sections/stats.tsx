"use client";
import { useInView } from "@/lib/hooks/use-in-view";
import { useCountUp } from "@/lib/hooks/use-count-up";
import { STATS } from "@/content/landing";

function StatItem({
  s,
  i,
  vis,
}: {
  s: (typeof STATS)[number];
  i: number;
  vis: boolean;
}) {
  const v = useCountUp(s.end, 1100 + i * 180, vis);
  return (
    <div
      className="text-center transition-all duration-700"
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(14px)",
        transitionDelay: `${80 + i * 100}ms`,
      }}
    >
      <div
        className="font-display font-extrabold text-text leading-none mb-1"
        style={{
          fontSize: "clamp(34px,5vw,52px)",
          letterSpacing: "-.04em",
        }}
      >
        {s.unit === "PLN" ? "do " : ""}
        {v}
        <span className="text-accent">{s.sfx}</span>
        {s.unit ? (
          <span
            className="font-sans font-semibold text-dim ml-1.5"
            style={{ fontSize: "clamp(13px,1.6vw,18px)" }}
          >
            {s.unit}
          </span>
        ) : null}
      </div>
      <div className="font-sans text-[11px] text-dim uppercase tracking-wide mt-1">
        {s.lbl}
      </div>
    </div>
  );
}

export function Stats() {
  const [ref, vis] = useInView<HTMLDivElement>();
  return (
    <section
      className="bg-bg-alt border-y border-line section-pad-x relative overflow-hidden"
      style={{ paddingBlock: "clamp(56px,8vw,96px)" }}
    >
      <div
        className="absolute w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle,rgba(196,169,125,.06) 0%,transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
        aria-hidden
      />
      <div
        className="mx-auto relative"
        style={{ maxWidth: "var(--container-max)" }}
      >
        <div
          className="text-center"
          style={{ marginBottom: "clamp(28px,4vw,44px)" }}
        >
          <span className="font-sans text-[11px] text-dim uppercase tracking-[.1em]">
            PLANY w liczbach
          </span>
        </div>
        <div
          ref={ref}
          className="grid grid-cols-2 lg:grid-cols-4"
          style={{ gap: "clamp(16px,3vw,32px)" }}
        >
          {STATS.map((s, i) => (
            <StatItem key={s.lbl} s={s} i={i} vis={vis} />
          ))}
        </div>
      </div>
    </section>
  );
}

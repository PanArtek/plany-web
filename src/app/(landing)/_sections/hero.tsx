"use client";
import { useEffect, useState } from "react";
import { HERO } from "@/content/landing";

export function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="relative min-h-dvh bg-bg flex flex-col justify-center overflow-hidden"
      style={{ paddingTop: "max(120px, 14vh)", paddingBottom: "180px" }}
    >
      <div className="grain" aria-hidden />
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 70% 40%,rgba(13,11,9,.9) 0%,transparent 70%),radial-gradient(ellipse 50% 50% at 20% 80%,rgba(196,169,125,.04) 0%,transparent 60%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[.025]"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(90deg,#9A8E7E 1px,transparent 1px),linear-gradient(0deg,#9A8E7E 1px,transparent 1px)",
          backgroundSize: "clamp(60px,8vw,100px) clamp(60px,8vw,100px)",
        }}
      />

      <div className="relative z-2 section-pad-x max-w-[900px]">
        <h1
          className="font-display font-extrabold text-text leading-[.9] tracking-tight mb-3 transition-all duration-700"
          style={{
            fontSize: "clamp(34px,7vw,76px)",
            letterSpacing: "-.03em",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(18px)",
            transitionDelay: loaded ? "600ms" : "0ms",
          }}
        >
          {HERO.titleLine1}
          <br />
          <span className="text-accent">{HERO.titleAccent}</span>
        </h1>

        <p
          className="font-sans font-light text-muted leading-relaxed max-w-[520px] mb-3 transition-all duration-700"
          style={{
            fontSize: "clamp(14px,1.6vw,17px)",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(18px)",
            transitionDelay: loaded ? "750ms" : "0ms",
          }}
        >
          {HERO.lead}
        </p>

        <p
          className="font-sans text-dim mb-10 transition-all duration-700"
          style={{
            fontSize: "clamp(11px,1.1vw,13px)",
            letterSpacing: ".04em",
            opacity: loaded ? 1 : 0,
            transitionDelay: loaded ? "800ms" : "0ms",
          }}
        >
          {HERO.subLead}
        </p>

        <div
          className="flex items-center gap-6 transition-all duration-700"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(18px)",
            transitionDelay: loaded ? "900ms" : "0ms",
          }}
        >
          <button
            onClick={() => go("kontakt")}
            className="font-sans text-[12px] font-medium uppercase tracking-wider px-8 py-4 bg-accent text-white border-none cursor-pointer hover:bg-accent-hover transition-colors min-h-11"
          >
            {HERO.ctaPrimary}
          </button>
          <button
            onClick={() => go("real")}
            className="bg-transparent border-none cursor-pointer font-sans text-[12px] text-dim hover:text-muted transition-colors"
          >
            {HERO.ctaSecondary}
          </button>
        </div>
      </div>

      {/* Stats bar */}
      <div className="absolute bottom-0 inset-x-0 border-t border-line section-pad-x py-8 z-2">
        <div
          className="grid gap-x-12 max-w-[560px]"
          style={{
            gridTemplateColumns: "repeat(3,auto)",
            columnGap: "clamp(28px,6vw,80px)",
          }}
        >
          {HERO.stats.map((s, i) => (
            <div
              key={s.l}
              className="transition-all duration-700"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(14px)",
                transitionDelay: loaded ? `${1000 + i * 150}ms` : "0ms",
              }}
            >
              <div
                className="font-display font-bold text-text leading-none mb-1"
                style={{ fontSize: "clamp(26px,3.5vw,38px)" }}
              >
                {s.v}
              </div>
              <div
                className="font-sans text-dim uppercase tracking-wide"
                style={{ fontSize: 11 }}
              >
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

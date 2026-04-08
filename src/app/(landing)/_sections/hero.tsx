"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsapConfig";
import { HERO } from "@/content/landing";

function parseStat(v: string): { num: number; suffix: string } {
  const match = v.match(/(\d+)(\D*)/);
  if (!match) return { num: 0, suffix: v };
  return { num: parseInt(match[1], 10), suffix: match[2] || "" };
}

export function Hero() {
  const [loaded, setLoaded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const titleLine1Ref = useRef<HTMLSpanElement>(null);
  const titleAccentRef = useRef<HTMLSpanElement>(null);
  const statValueRefs = useRef<Array<HTMLDivElement | null>>([]);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  // Hero title per-word reveal (manual split — works without SplitText Club plugin).
  useGSAP(
    () => {
      if (!loaded) return;
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
          const words: HTMLElement[] = [];
          if (titleLine1Ref.current)
            words.push(
              ...titleLine1Ref.current.querySelectorAll<HTMLElement>(
                "[data-word]",
              ),
            );
          if (titleAccentRef.current) words.push(titleAccentRef.current);

          if (words.length === 0) return;

          if (reduced) {
            gsap.set(words, { opacity: 1, y: 0 });
            return;
          }

          gsap.set(words, { opacity: 0, y: 24 });
          gsap.to(words, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.05,
            delay: 0.6,
          });
        },
      );
      return () => mm.revert();
    },
    { dependencies: [loaded], scope: sectionRef },
  );

  // Hero image — fade + zoom-out reveal after loaded.
  useGSAP(
    () => {
      if (!loaded || !heroImageRef.current) return;
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
          if (!heroImageRef.current) return;
          if (reduced) {
            gsap.set(heroImageRef.current, { opacity: 1, scale: 1 });
            return;
          }
          gsap.fromTo(
            heroImageRef.current,
            { opacity: 0, scale: 1.04 },
            {
              opacity: 1,
              scale: 1,
              duration: 1.2,
              ease: "power3.out",
              delay: 0.85,
            },
          );
        },
      );
      return () => mm.revert();
    },
    { dependencies: [loaded], scope: sectionRef },
  );

  // Stats counter — animate from 0 to target after loaded.
  useGSAP(
    () => {
      if (!loaded) return;
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

          HERO.stats.forEach((s, i) => {
            const el = statValueRefs.current[i];
            if (!el) return;
            const { num, suffix } = parseStat(s.v);
            if (reduced) {
              el.textContent = `${num}${suffix}`;
              return;
            }
            const obj = { val: 0 };
            gsap.to(obj, {
              val: num,
              snap: { val: 1 },
              duration: 1.2,
              ease: "power2.out",
              delay: 1 + i * 0.1,
              onUpdate: () => {
                el.textContent = `${Math.round(obj.val)}${suffix}`;
              },
            });
          });
        },
      );
      return () => mm.revert();
    },
    { dependencies: [loaded], scope: sectionRef },
  );

  // CTA idle pulse — start after 5s without interaction.
  useGSAP(
    () => {
      if (!loaded || !ctaRef.current) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        let tween: gsap.core.Tween | null = null;
        let timer: number | null = null;

        const start = () => {
          if (tween || !ctaRef.current) return;
          tween = gsap.to(ctaRef.current, {
            scale: 1.02,
            duration: 2,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            transformOrigin: "center center",
          });
        };

        const stop = () => {
          if (tween) {
            tween.kill();
            tween = null;
            if (ctaRef.current) gsap.set(ctaRef.current, { scale: 1 });
          }
        };

        const reset = () => {
          stop();
          if (timer) window.clearTimeout(timer);
          timer = window.setTimeout(start, 5000);
        };

        const events: Array<keyof WindowEventMap> = [
          "mousemove",
          "touchstart",
          "scroll",
          "keydown",
        ];
        events.forEach((e) =>
          window.addEventListener(e, reset, { passive: true }),
        );
        reset();

        return () => {
          stop();
          if (timer) window.clearTimeout(timer);
          events.forEach((e) => window.removeEventListener(e, reset));
        };
      });
      return () => mm.revert();
    },
    { dependencies: [loaded], scope: sectionRef },
  );

  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const titleLine1Words = HERO.titleLine1.split(" ");

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-dvh bg-bg flex flex-col justify-center overflow-hidden"
      style={{ paddingTop: "max(120px, 14vh)", paddingBottom: "clamp(160px, 22vh, 220px)" }}
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

      <div
        className="relative z-2 section-pad-x w-full mx-auto"
        style={{ maxWidth: "var(--container-max)" }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:gap-10 lg:gap-16">
          <div className="md:flex-1 max-w-[640px]">
        <h1
          className="font-display font-extrabold text-text leading-[.9] tracking-tight mb-3"
          style={{
            fontSize: "clamp(34px,7vw,76px)",
            letterSpacing: "-.03em",
          }}
        >
          <span ref={titleLine1Ref} style={{ display: "inline" }}>
            {titleLine1Words.map((w, i) => (
              <span
                key={i}
                data-word
                style={{ display: "inline-block", willChange: "transform" }}
              >
                {w}
                {i < titleLine1Words.length - 1 ? "\u00A0" : ""}
              </span>
            ))}
          </span>
          <br />
          <span
            ref={titleAccentRef}
            className="text-accent"
            style={{ display: "inline-block", willChange: "transform" }}
          >
            {HERO.titleAccent}
          </span>
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
          className="flex flex-wrap items-center gap-4 sm:gap-6 transition-all duration-700"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(18px)",
            transitionDelay: loaded ? "900ms" : "0ms",
          }}
        >
          <button
            ref={ctaRef}
            onClick={() => go("kontakt")}
            className="font-sans text-[12px] font-medium uppercase tracking-wider px-6 sm:px-8 py-4 bg-accent text-white border-none cursor-pointer hover:bg-accent-hover transition-colors min-h-11 will-change-transform"
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

          {/* Hero image — desktop/tablet only */}
          <div
            ref={heroImageRef}
            className="hidden md:block md:w-[42%] lg:w-[46%] relative aspect-[4/3] overflow-hidden border border-line bg-bg-alt mt-8 md:mt-0 will-change-transform"
            style={{ opacity: 0 }}
          >
            <Image
              src="/hero/realization-edukacja.png"
              alt="Realizacja PLANY — placówka edukacyjna z autorskim muralem"
              fill
              sizes="(min-width: 1024px) 46vw, (min-width: 768px) 42vw, 0px"
              priority
              className="object-cover"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              aria-hidden
              style={{
                background:
                  "linear-gradient(135deg, rgba(13,11,9,0.35) 0%, rgba(13,11,9,0.05) 50%, rgba(196,169,125,0.08) 100%)",
              }}
            />
            <div
              className="absolute top-0 left-0 right-0 h-[2px] bg-accent/60"
              aria-hidden
            />
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="absolute bottom-0 inset-x-0 border-t border-line section-pad-x py-8 z-2">
        <div
          className="grid max-w-[560px]"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            columnGap: "clamp(20px,5vw,80px)",
            rowGap: "20px",
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
                ref={(el) => {
                  statValueRefs.current[i] = el;
                }}
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

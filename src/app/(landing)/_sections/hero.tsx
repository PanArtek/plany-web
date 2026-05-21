"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, ArrowDown } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsapConfig";
import { SpecializationsRotator } from "@/components/SpecializationsRotator";
import { HERO } from "@/content/landing";
import {
  HERO_CATEGORIES,
  HERO_CATEGORY_NAMES,
} from "@/content/hero-categories";
import { useHeroCategory } from "../_components/hero-category-provider";

export function Hero() {
  const { activeIndex, setActive, pause, resume } = useHeroCategory();
  const [loaded, setLoaded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const titleLine1Ref = useRef<HTMLSpanElement>(null);
  const titleAccentRef = useRef<HTMLSpanElement>(null);
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
            { opacity: 0, scale: 1.06 },
            {
              opacity: 1,
              scale: 1,
              duration: 1.6,
              ease: "power2.out",
              delay: 0.2,
            },
          );
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
      onMouseEnter={pause}
      onMouseLeave={resume}
      className="relative min-h-dvh bg-bg flex flex-col justify-center overflow-hidden pb-16 md:pb-40"
      style={{ paddingTop: "max(110px, 13vh)" }}
    >
      {/* Background — 5-layer crossfade stack, full bleed, all viewports */}
      <div
        ref={heroImageRef}
        className="absolute inset-0 z-0 will-change-transform"
        aria-hidden
      >
        {HERO_CATEGORIES.map((cat, i) => (
          <div
            key={cat.slug}
            className="absolute inset-0 motion-safe:transition-opacity motion-safe:duration-1000 ease-in-out"
            style={{ opacity: i === activeIndex ? 1 : 0 }}
          >
            {cat.image ? (
              cat.imageMobile ? (
                <>
                  <div className="absolute inset-0 md:hidden">
                    <Image
                      src={cat.imageMobile}
                      alt=""
                      fill
                      sizes="100vw"
                      priority={i === 0}
                      className="object-cover object-center"
                    />
                  </div>
                  <div className="absolute inset-0 hidden md:block">
                    <Image
                      src={cat.image}
                      alt=""
                      fill
                      sizes="100vw"
                      priority={i === 0}
                      className="object-cover object-center"
                    />
                  </div>
                </>
              ) : (
                <Image
                  src={cat.image}
                  alt=""
                  fill
                  sizes="100vw"
                  priority={i === 0}
                  className="object-cover object-center"
                />
              )
            ) : (
              <div
                className="absolute inset-0"
                style={{ background: cat.grad }}
              />
            )}
          </div>
        ))}
      </div>
      {/* Strong dark overlay for text legibility (Warm Sand tint) */}
      <div
        className="absolute inset-0 z-1 pointer-events-none"
        aria-hidden
        style={{
          background:
            "linear-gradient(180deg, rgba(13,11,9,0.78) 0%, rgba(13,11,9,0.62) 40%, rgba(13,11,9,0.85) 100%), radial-gradient(ellipse 70% 60% at 25% 50%, rgba(13,11,9,0.55) 0%, transparent 70%), radial-gradient(ellipse 60% 50% at 80% 70%, rgba(196,169,125,0.06) 0%, transparent 60%)",
        }}
      />
      <div className="grain" aria-hidden />
      <div
        className="absolute inset-0 z-1 pointer-events-none opacity-[.025]"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(90deg,#9A8E7E 1px,transparent 1px),linear-gradient(0deg,#9A8E7E 1px,transparent 1px)",
          backgroundSize: "clamp(60px,8vw,100px) clamp(60px,8vw,100px)",
        }}
      />

      <div className="relative z-2 section-pad-x max-w-[900px]">
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

        <div
          className="max-w-[520px] mb-6 transition-all duration-700"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(18px)",
            transitionDelay: loaded ? "750ms" : "0ms",
          }}
        >
          <p
            className="font-display font-bold text-text leading-tight mb-3"
            style={{
              fontSize: "clamp(18px,2.2vw,24px)",
              letterSpacing: "-.015em",
            }}
          >
            {HERO.subtitle}
          </p>
          <p
            className="font-sans font-light text-muted leading-relaxed mb-5"
            style={{ fontSize: "clamp(14px,1.6vw,17px)" }}
          >
            {HERO.description}
          </p>
          <ul className="list-none flex flex-col gap-2.5">
            {HERO.points.map((p) => (
              <li
                key={p}
                className="font-sans font-light text-text leading-relaxed pl-5 relative"
                style={{ fontSize: "clamp(14px,1.55vw,16px)" }}
              >
                <span
                  className="absolute left-0 top-[0.7em] w-2.5 h-px bg-accent"
                  aria-hidden
                />
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div
          className="mb-10 transition-all duration-700"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(18px)",
            transitionDelay: loaded ? "800ms" : "0ms",
          }}
        >
          <SpecializationsRotator
            items={HERO_CATEGORY_NAMES}
            activeIndex={activeIndex}
            onSelect={setActive}
          />
        </div>

        <div
          className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 transition-all duration-700"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(18px)",
            transitionDelay: loaded ? "900ms" : "0ms",
          }}
        >
          <button
            ref={ctaRef}
            onClick={() => go("kontakt")}
            className="inline-flex items-center justify-center gap-2.5 font-sans text-[13px] font-medium uppercase tracking-wider px-7 py-4 bg-accent text-white border border-accent cursor-pointer hover:bg-accent-hover hover:border-accent-hover transition-colors min-h-12 w-full sm:w-auto will-change-transform"
          >
            {HERO.ctaPrimary}
            <ArrowRight size={15} strokeWidth={2.25} />
          </button>
          <button
            onClick={() => go("real")}
            className="inline-flex items-center justify-center gap-2.5 font-sans text-[13px] font-medium uppercase tracking-wider px-7 py-4 bg-transparent text-text border border-accent cursor-pointer hover:bg-accent/10 hover:border-accent-hover transition-colors min-h-12 w-full sm:w-auto"
          >
            {HERO.ctaSecondary}
            <ArrowDown size={15} strokeWidth={2.25} />
          </button>
        </div>
      </div>

      {/* Progress dots — flow on mobile, absolute bottom-right on md+ */}
      <div
        role="tablist"
        aria-label="Aktywna kategoria"
        className="relative z-2 mt-8 flex justify-center gap-2 transition-all duration-700 md:absolute md:right-0 md:bottom-32 md:mt-0 md:justify-end md:pr-[clamp(20px,4vw,60px)] lg:pr-14"
        style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(18px)",
          transitionDelay: loaded ? "950ms" : "0ms",
        }}
      >
        {HERO_CATEGORIES.map((cat, i) => {
          const isActive = i === activeIndex;
          return (
            <button
              key={cat.slug}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`Pokaż kategorię ${cat.name}`}
              onClick={() => setActive(i)}
              className={`h-1.5 cursor-pointer rounded-full border-0 transition-all duration-300 ${
                isActive
                  ? "w-6 bg-accent"
                  : "w-1.5 bg-dim hover:bg-muted"
              }`}
            />
          );
        })}
      </div>

    </section>
  );
}

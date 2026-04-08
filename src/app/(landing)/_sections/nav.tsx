"use client";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsapConfig";
import { Logo } from "@/components/logo";
import { NAV_ITEMS, NAV_EYEBROW } from "@/content/landing";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Eyebrow brand-narrative reveal on mount: Pomysł → line → PLANY → line → Przestrzeń.
  useGSAP(
    () => {
      if (!eyebrowRef.current) return;
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
          const root = eyebrowRef.current!;
          const word1 = root.querySelector<HTMLElement>("[data-eb='word-1']");
          const line1 = root.querySelector<HTMLElement>("[data-eb='line-1']");
          const logo = root.querySelector<HTMLElement>("[data-eb='logo']");
          const line2 = root.querySelector<HTMLElement>("[data-eb='line-2']");
          const word2 = root.querySelector<HTMLElement>("[data-eb='word-2']");

          const all = [word1, line1, logo, line2, word2].filter(
            Boolean,
          ) as HTMLElement[];
          if (all.length === 0) return;

          if (reduced) {
            gsap.set(all, { opacity: 1, x: 0, scale: 1, scaleX: 1 });
            return;
          }

          // Initial state
          if (word1) gsap.set(word1, { opacity: 0, x: -8 });
          if (line1)
            gsap.set(line1, { scaleX: 0, transformOrigin: "left center" });
          if (logo) gsap.set(logo, { opacity: 0, scale: 0.92 });
          if (line2)
            gsap.set(line2, { scaleX: 0, transformOrigin: "left center" });
          if (word2) gsap.set(word2, { opacity: 0, x: 8 });

          const tl = gsap.timeline({ delay: 0.4 });
          if (word1)
            tl.to(word1, {
              opacity: 1,
              x: 0,
              duration: 0.9,
              ease: "power3.out",
            });
          if (line1)
            tl.to(
              line1,
              { scaleX: 1, duration: 0.7, ease: "power2.out" },
              "+=0.1",
            );
          if (logo)
            tl.to(
              logo,
              {
                opacity: 1,
                scale: 1,
                duration: 0.95,
                ease: "power3.out",
              },
              "+=0.1",
            );
          if (line2)
            tl.to(
              line2,
              { scaleX: 1, duration: 0.7, ease: "power2.out" },
              "+=0.1",
            );
          if (word2)
            tl.to(
              word2,
              {
                opacity: 1,
                x: 0,
                duration: 0.9,
                ease: "power3.out",
              },
              "+=0.1",
            );
        },
      );
      return () => mm.revert();
    },
    { scope: navRef },
  );

  // Hide on scroll down, show on scroll up.
  useGSAP(
    () => {
      if (!navRef.current) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const st = ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate: (self) => {
            if (!navRef.current) return;
            if (self.direction === 1 && window.scrollY > 100) {
              gsap.to(navRef.current, {
                yPercent: -100,
                duration: 0.3,
                ease: "power2.out",
              });
            } else if (self.direction === -1) {
              gsap.to(navRef.current, {
                yPercent: 0,
                duration: 0.3,
                ease: "power2.out",
              });
            }
          },
        });
        return () => st.kill();
      });
      return () => mm.revert();
    },
    { scope: navRef },
  );

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 inset-x-0 z-100 h-15 section-pad-x flex items-center justify-between transition-[background-color,backdrop-filter,border-color] duration-300 will-change-transform ${
        scrolled
          ? "bg-bg-deep/90 backdrop-blur-md border-b border-line"
          : "bg-transparent border-b border-transparent"
      }`}
      style={{ height: 60 }}
    >
      <button
        ref={eyebrowRef}
        onClick={() => go("hero")}
        className="bg-transparent border-none cursor-pointer p-0 flex items-center gap-0 flex-nowrap text-text"
        aria-label="PLANY — strona główna"
      >
        {NAV_EYEBROW.map((w, i) => {
          const isLogo = w === "PLANY";
          const wordIndex = isLogo ? 0 : i === 0 ? 1 : 2;
          const lineIndex = i; // 1 or 2 (skipped for i===0)
          return (
            <span key={w} className="flex items-center">
              {i > 0 && (
                <span
                  data-eb={`line-${lineIndex}`}
                  className="h-px bg-accent opacity-50 will-change-transform"
                  style={{
                    width: "clamp(10px,1.5vw,18px)",
                    margin: "0 clamp(5px,.8vw,9px)",
                  }}
                  aria-hidden
                />
              )}
              {isLogo ? (
                <span
                  data-eb="logo"
                  className="inline-flex will-change-transform"
                >
                  <Logo size={20} color="#C4A97D" />
                </span>
              ) : (
                <span
                  data-eb={`word-${wordIndex}`}
                  className="font-sans font-normal text-dim uppercase tracking-wider will-change-transform"
                  style={{ fontSize: "clamp(9px,1vw,11px)" }}
                >
                  {w}
                </span>
              )}
            </span>
          );
        })}
      </button>

      {/* Desktop */}
      <div className="hidden md:flex items-center gap-7">
        {NAV_ITEMS.map((n) => (
          <button
            key={n.id}
            onClick={() => go(n.id)}
            className="bg-transparent border-none cursor-pointer text-[11px] font-normal text-muted hover:text-text uppercase tracking-wider py-1 transition-colors"
          >
            {n.label}
          </button>
        ))}
        <button
          onClick={() => go("kontakt")}
          className="text-[11px] font-medium uppercase tracking-wider px-5 py-2 bg-accent text-white border-none cursor-pointer hover:bg-accent-hover transition-colors"
        >
          Wycena
        </button>
      </div>

      {/* Burger */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden bg-transparent border-none cursor-pointer p-2 text-text"
        aria-label={open ? "Zamknij menu" : "Otwórz menu"}
        aria-expanded={open}
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {open && (
        <div className="md:hidden absolute top-15 inset-x-0 bg-bg-deep/95 backdrop-blur-md border-b border-line section-pad-x py-4 flex flex-col gap-3">
          {NAV_ITEMS.map((n) => (
            <button
              key={n.id}
              onClick={() => go(n.id)}
              className="bg-transparent border-none text-left cursor-pointer text-[13px] text-muted uppercase tracking-wide py-2"
            >
              {n.label}
            </button>
          ))}
          <button
            onClick={() => go("kontakt")}
            className="mt-2 text-[12px] font-medium uppercase tracking-wider px-5 py-3 bg-accent text-white border-none cursor-pointer text-center"
          >
            Wycena
          </button>
        </div>
      )}
    </nav>
  );
}

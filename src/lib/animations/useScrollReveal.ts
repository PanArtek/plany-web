"use client";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsapConfig";

type Options = {
  /** Selector for child elements to reveal. Default: '[data-reveal]'. */
  selector?: string;
  /** Stagger between children in seconds. */
  stagger?: number;
  /** ScrollTrigger start. */
  start?: string;
  /** Animation duration in seconds. */
  duration?: number;
  /** Initial Y offset in px. */
  y?: number;
};

/**
 * Reusable scroll reveal hook. Scopes a GSAP context to a container ref and
 * animates `[data-reveal]` children (or a custom selector) from
 * `opacity:0, y:30` to `opacity:1, y:0` once they enter the viewport.
 *
 * Respects `prefers-reduced-motion` via gsap.matchMedia — reduced motion users
 * see content immediately with no animation.
 */
export function useScrollReveal<T extends HTMLElement = HTMLElement>(
  options: Options = {},
) {
  const ref = useRef<T>(null);
  const {
    selector = "[data-reveal]",
    stagger = 0.1,
    start = "top 80%",
    duration = 0.8,
    y = 30,
  } = options;

  useGSAP(
    () => {
      if (!ref.current) return;

      const targets = ref.current.querySelectorAll<HTMLElement>(selector);
      if (targets.length === 0) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { reduced } = context.conditions as {
            motion: boolean;
            reduced: boolean;
          };

          if (reduced) {
            gsap.set(targets, { opacity: 1, y: 0, clearProps: "transform" });
            return;
          }

          gsap.set(targets, { opacity: 0, y });
          gsap.to(targets, {
            opacity: 1,
            y: 0,
            duration,
            ease: "power3.out",
            stagger,
            scrollTrigger: {
              trigger: ref.current!,
              start,
              once: true,
            },
          });
        },
      );

      return () => mm.revert();
    },
    { scope: ref },
  );

  // Touch ScrollTrigger so the import is preserved when tree-shaking.
  void ScrollTrigger;

  return ref;
}

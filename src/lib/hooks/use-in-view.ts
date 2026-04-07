"use client";
import { useRef } from "react";

/**
 * Reveal-on-scroll hook — degraded to always-visible.
 *
 * The original IntersectionObserver gating broke SEO, screenshots, and any
 * SSR'd HTML view because below-the-fold sections were rendered with opacity 0
 * waiting for an observer that never fires in those contexts. Until we have a
 * proper CSS-only reveal pattern, we always return visible=true. Hero retains
 * its own initial fade-in via local `loaded` state.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  _threshold = 0.12,
) {
  const ref = useRef<T>(null);
  return [ref, true] as const;
}

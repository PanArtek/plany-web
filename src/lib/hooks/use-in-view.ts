"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Reveal-on-scroll hook with safe defaults.
 *
 * - SSR / pre-hydration: returns visible=true so content is in the HTML and
 *   visible to crawlers, screenshots, and JS-disabled users.
 * - On mount: if the element is already in the initial viewport, stays visible
 *   (no flash). Otherwise resets to false and the IntersectionObserver fades
 *   it in on scroll.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.12,
) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If element is currently below the fold, reset and let observer fade it in.
    const rect = el.getBoundingClientRect();
    const inViewport = rect.top < window.innerHeight && rect.bottom > 0;
    if (inViewport) {
      setVisible(true);
      return;
    }
    setVisible(false);

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, visible] as const;
}

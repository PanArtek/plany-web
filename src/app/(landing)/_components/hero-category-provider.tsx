"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { HERO_CATEGORIES } from "@/content/hero-categories";

const AUTO_ADVANCE_MS = 2500;
const CATEGORY_COUNT = HERO_CATEGORIES.length;

type HeroCategoryContextValue = {
  activeIndex: number;
  setActive: (i: number) => void;
  pause: () => void;
  resume: () => void;
};

const HeroCategoryContext = createContext<HeroCategoryContextValue | null>(
  null,
);

export function HeroCategoryProvider({ children }: { children: ReactNode }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const pausedRef = useRef(false);
  const timerRef = useRef<number | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const scheduleNext = useCallback(() => {
    clearTimer();
    if (pausedRef.current) return;
    timerRef.current = window.setTimeout(() => {
      setActiveIndex((i) => (i + 1) % CATEGORY_COUNT);
    }, AUTO_ADVANCE_MS);
  }, [clearTimer]);

  useEffect(() => {
    scheduleNext();
    return clearTimer;
  }, [activeIndex, scheduleNext, clearTimer]);

  const setActive = useCallback((i: number) => {
    setActiveIndex(((i % CATEGORY_COUNT) + CATEGORY_COUNT) % CATEGORY_COUNT);
  }, []);

  const pause = useCallback(() => {
    pausedRef.current = true;
    clearTimer();
  }, [clearTimer]);

  const resume = useCallback(() => {
    pausedRef.current = false;
    scheduleNext();
  }, [scheduleNext]);

  return (
    <HeroCategoryContext.Provider
      value={{ activeIndex, setActive, pause, resume }}
    >
      {children}
    </HeroCategoryContext.Provider>
  );
}

export function useHeroCategory(): HeroCategoryContextValue {
  const ctx = useContext(HeroCategoryContext);
  if (!ctx) {
    throw new Error(
      "useHeroCategory must be used within HeroCategoryProvider",
    );
  }
  return ctx;
}

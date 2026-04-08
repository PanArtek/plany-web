"use client";
import { useEffect, useState } from "react";
import {
  CONSENT_EVENT,
  clearConsent,
  readConsent,
  writeConsent,
  type ConsentState,
} from "./cookie-storage";

export type UseCookieConsent = {
  consent: ConsentState;
  mounted: boolean;
  decided: boolean;
  accept: () => void;
  essentialOnly: () => void;
  reset: () => void;
};

export function useCookieConsent(): UseCookieConsent {
  const [consent, setConsent] = useState<ConsentState>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setConsent(readConsent());
    setMounted(true);

    const onChange = () => setConsent(readConsent());
    window.addEventListener(CONSENT_EVENT, onChange);
    // Cross-tab sync via storage event.
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener(CONSENT_EVENT, onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  return {
    consent,
    mounted,
    decided: consent !== null,
    accept: () => writeConsent("accepted"),
    essentialOnly: () => writeConsent("essential"),
    reset: () => clearConsent(),
  };
}

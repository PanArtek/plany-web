import { COOKIE_CONSENT } from "@/content/landing";

export type ConsentValue = "accepted" | "essential";
export type ConsentState = ConsentValue | null;

const KEY = COOKIE_CONSENT.storageKey;
export const CONSENT_EVENT = "plany:cookie-consent-change";

/** Read consent from localStorage. Returns null on miss or any error. */
export function readConsent(): ConsentState {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw === "accepted" || raw === "essential") return raw;
    return null;
  } catch {
    return null;
  }
}

/** Persist consent. No-op on failure. Dispatches change event. */
export function writeConsent(value: ConsentValue): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, value);
  } catch {
    /* incognito strict / quota exceeded — proceed in-memory via event */
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT));
}

/** Clear consent. Used by "Ustawienia cookies" footer link. */
export function clearConsent(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    /* no-op */
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT));
}

"use client";
import { FOOTER } from "@/content/landing";
import { useCookieConsent } from "./useCookieConsent";

export function CookieSettingsLink() {
  const { reset } = useCookieConsent();
  return (
    <button
      type="button"
      onClick={reset}
      className="font-sans text-[10px] text-dim hover:text-accent uppercase tracking-wider bg-transparent border-none cursor-pointer transition-colors"
    >
      {FOOTER.cookieSettings}
    </button>
  );
}

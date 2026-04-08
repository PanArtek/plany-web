"use client";
import { Analytics } from "@vercel/analytics/next";
import { useCookieConsent } from "./useCookieConsent";

/**
 * Mounts Vercel Analytics only after the user accepts cookies.
 * Vercel Analytics is technically cookieless, but per RODO defaults
 * we gate it explicitly to honour the user's choice.
 */
export function AnalyticsGate() {
  const { mounted, consent } = useCookieConsent();
  if (!mounted) return null;
  if (consent !== "accepted") return null;
  return <Analytics />;
}

"use client";
import { Phone } from "lucide-react";
import { CONTACT } from "@/content/landing";
import { useCookieConsent } from "@/components/cookie-banner/useCookieConsent";

/**
 * Sticky mobile-only "Zadzwoń" CTA. Hidden ≥ md breakpoint.
 * While the cookie banner is visible (no consent decision yet), the CTA
 * is dimmed and non-interactive — compliance choice comes first.
 */
export function StickyCallCTA() {
  const { mounted, decided } = useCookieConsent();
  // Before mount we render the CTA in its "decided" appearance to avoid layout
  // shift; once we know consent state we may dim it.
  const dim = mounted && !decided;

  return (
    <a
      href={`tel:${CONTACT.phoneE164}`}
      className={`md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center gap-2 bg-accent text-bg font-medium uppercase tracking-wider text-sm py-4 border-t border-accent-hover transition-opacity ${
        dim ? "opacity-60 pointer-events-none" : "opacity-100"
      }`}
      style={{
        paddingBottom: "calc(env(safe-area-inset-bottom) + 16px)",
        minHeight: 56,
      }}
      aria-label="Zadzwoń do PLANY"
      aria-hidden={dim}
      tabIndex={dim ? -1 : 0}
    >
      <Phone size={18} strokeWidth={2} />
      Zadzwoń teraz
    </a>
  );
}

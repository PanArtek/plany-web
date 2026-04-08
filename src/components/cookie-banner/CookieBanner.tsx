"use client";
import Link from "next/link";
import { COOKIE_CONSENT } from "@/content/landing";
import { useCookieConsent } from "./useCookieConsent";

export function CookieBanner() {
  const { mounted, decided, accept, essentialOnly } = useCookieConsent();

  if (!mounted) return null;
  if (decided) return null;

  return (
    <div
      role="region"
      aria-label={COOKIE_CONSENT.ariaLabel}
      className="fixed inset-x-0 bottom-0 md:bottom-4 z-[60] section-pad-x pointer-events-none animate-cookie-slide-up"
      style={{
        paddingBottom: "calc(env(safe-area-inset-bottom) + 16px)",
      }}
    >
      <div className="mx-auto max-w-[720px] pointer-events-auto bg-bg-alt border border-line p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-5">
          <p
            id="cookie-banner-text"
            className="font-sans text-[13px] text-muted leading-relaxed flex-1"
          >
            {COOKIE_CONSENT.body}{" "}
            <Link
              href={COOKIE_CONSENT.policyHref}
              className="text-accent hover:text-accent-hover underline underline-offset-2"
            >
              {COOKIE_CONSENT.learnMore}
            </Link>
          </p>
          <div className="flex flex-col-reverse sm:flex-row gap-2.5 w-full sm:w-auto sm:flex-shrink-0">
            <button
              type="button"
              onClick={essentialOnly}
              className="inline-flex items-center justify-center font-sans text-[12px] font-medium uppercase tracking-wider px-5 py-3 min-h-11 bg-transparent text-text border border-accent hover:bg-accent/10 cursor-pointer transition-colors w-full sm:w-auto"
            >
              {COOKIE_CONSENT.essentialOnly}
            </button>
            <button
              type="button"
              onClick={accept}
              className="inline-flex items-center justify-center font-sans text-[12px] font-medium uppercase tracking-wider px-5 py-3 min-h-11 bg-accent text-white border border-accent hover:bg-accent-hover hover:border-accent-hover cursor-pointer transition-colors w-full sm:w-auto"
            >
              {COOKIE_CONSENT.acceptAll}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

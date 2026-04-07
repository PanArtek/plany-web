import { Phone } from "lucide-react";
import { CONTACT } from "@/content/landing";

/**
 * Sticky mobile-only "Zadzwoń" CTA. Server component, CSS only.
 * Hidden ≥ md breakpoint.
 */
export function StickyCallCTA() {
  return (
    <a
      href={`tel:${CONTACT.phoneTel}`}
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center gap-2 bg-accent text-bg font-medium uppercase tracking-wider text-sm py-4 border-t border-accent-hover"
      style={{
        paddingBottom: "calc(env(safe-area-inset-bottom) + 16px)",
        minHeight: 56,
      }}
      aria-label="Zadzwoń do PLANY"
    >
      <Phone size={18} strokeWidth={2} />
      Zadzwoń teraz
    </a>
  );
}

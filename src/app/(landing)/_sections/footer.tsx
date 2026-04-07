import { ArrowUpRight } from "lucide-react";
import { FOOTER } from "@/content/landing";

export function Footer() {
  return (
    <footer
      className="bg-bg-deep border-t border-line section-pad-x py-6"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 80px)" }}
    >
      <div
        className="mx-auto grid items-center gap-6 grid-cols-1 md:grid-cols-[auto_1fr_auto] text-center md:text-left"
        style={{ maxWidth: "var(--container-max)" }}
      >
        <span className="font-sans text-[11px] text-dim font-light">
          {FOOTER.copyright}
        </span>
        <div className="flex gap-5 justify-center flex-wrap">
          <span className="font-sans text-[10px] text-dim">{FOOTER.nip}</span>
          <span className="font-sans text-[10px] text-dim">{FOOTER.krs}</span>
        </div>
        <a
          href="#hero"
          className="font-sans text-[10px] text-dim hover:text-accent uppercase tracking-wider no-underline inline-flex items-center gap-1 md:justify-self-end justify-self-center transition-colors"
        >
          Na górę <ArrowUpRight size={11} strokeWidth={2} />
        </a>
      </div>
    </footer>
  );
}

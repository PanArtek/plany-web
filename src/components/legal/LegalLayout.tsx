import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function LegalLayout({
  title,
  effectiveDate,
  children,
}: {
  title: string;
  effectiveDate: string;
  children: ReactNode;
}) {
  return (
    <main
      className="bg-bg text-text section-pad-x min-h-dvh"
      style={{ paddingBlock: "clamp(80px, 10vh, 140px)" }}
    >
      <div
        className="mx-auto"
        style={{ maxWidth: "min(720px, var(--container-max))" }}
      >
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 font-sans text-[11px] text-dim hover:text-accent uppercase tracking-wider no-underline transition-colors mb-8"
        >
          <ArrowLeft size={12} strokeWidth={2} />
          Wróć na stronę główną
        </Link>

        <h1
          className="font-display font-extrabold text-text leading-tight mb-3"
          style={{
            fontSize: "clamp(30px, 4vw, 44px)",
            letterSpacing: "-0.03em",
          }}
        >
          {title}
        </h1>
        <p className="font-sans text-[12px] text-dim uppercase tracking-wider mb-10">
          Data obowiązywania: {effectiveDate}
        </p>

        <article className="legal-prose font-sans text-[14px] text-muted leading-relaxed">
          {children}
        </article>
      </div>
    </main>
  );
}

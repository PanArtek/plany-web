"use client";
import { MapPin, Phone, Mail } from "lucide-react";
import { useScrollReveal } from "@/lib/animations/useScrollReveal";
import { CONTACT, KONTAKT_TITLE_LINES } from "@/content/landing";
import { Logo } from "@/components/logo";
import { QuizWizard } from "@/components/quiz/QuizWizard";
import { PhoneTopBar } from "@/components/quiz/PhoneTopBar";
import { PhoneCard } from "@/components/quiz/PhoneCard";

export function Kontakt() {
  const ref = useScrollReveal<HTMLDivElement>({ stagger: 0.12 });

  return (
    <section
      id="kontakt"
      className="bg-bg-deep border-t border-line section-pad-x"
      style={{ paddingBlock: "clamp(64px,10vw,120px)" }}
    >
      <div
        ref={ref}
        className="mx-auto"
        style={{ maxWidth: "var(--container-max)" }}
      >
        <div style={{ marginBottom: "clamp(36px,5vw,52px)" }}>
          <div className="flex items-center gap-4 mb-4" data-reveal>
            <div className="h-[2px] bg-accent w-9" aria-hidden />
            <span className="font-sans text-[11px] text-dim uppercase tracking-[.1em]">
              Kontakt
            </span>
          </div>
          <h2
            className="font-display font-extrabold text-text leading-[1.05]"
            style={{
              fontSize: "clamp(26px,4vw,42px)",
              letterSpacing: "-.03em",
            }}
            data-reveal
          >
            {KONTAKT_TITLE_LINES[0]}
            <br />
            {KONTAKT_TITLE_LINES[1]}
          </h2>
        </div>

        <div
          className="grid gap-8 md:gap-12 lg:gap-16 grid-cols-1 lg:[grid-template-columns:1.15fr_.85fr]"
          data-reveal
        >
          <div>
            <PhoneTopBar />
            <div className="mt-6">
              <QuizWizard />
            </div>
            <PhoneCard />
          </div>
          <ContactInfo />
        </div>
      </div>
    </section>
  );
}

function ContactInfo() {
  const items = [
    { Icon: MapPin, l: "Adres", v: CONTACT.address },
    { Icon: Phone, l: "Telefon", v: CONTACT.phone },
    { Icon: Mail, l: "Email", v: CONTACT.email },
  ];
  return (
    <aside className="flex flex-col gap-6">
      <div>
        <Logo size={28} />
        <p className="font-sans text-[13px] font-light text-muted leading-relaxed mt-2.5 max-w-[280px]">
          {CONTACT.description}
        </p>
      </div>
      <div className="w-full h-px bg-line" aria-hidden />
      {items.map(({ Icon, l, v }) => (
        <div key={l} className="flex gap-3 items-start">
          <Icon
            size={14}
            strokeWidth={1.5}
            className="text-dim mt-0.5 flex-shrink-0"
          />
          <div>
            <div className="font-sans text-[10px] text-dim uppercase tracking-wider mb-0.5">
              {l}
            </div>
            <div className="font-sans text-[14px] text-text">{v}</div>
          </div>
        </div>
      ))}
      <div className="w-full h-px bg-line" aria-hidden />
      <div className="w-full aspect-video bg-input-bg border border-line relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[.04]"
          aria-hidden
          style={{
            backgroundImage:
              "linear-gradient(90deg,#9A8E7E 1px,transparent 1px),linear-gradient(0deg,#9A8E7E 1px,transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5">
          <MapPin size={18} strokeWidth={1.2} className="text-accent" />
          <span className="font-sans text-[11px] text-dim">{CONTACT.address}</span>
        </div>
      </div>
    </aside>
  );
}

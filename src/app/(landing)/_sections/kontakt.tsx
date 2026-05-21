"use client";
import { MapPin, Clock, Phone, Mail, ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/lib/animations/useScrollReveal";
import {
  CONTACT,
  FOUNDER,
  KONTAKT_INTRO,
  KONTAKT_TITLE_LINES,
  OFFICE_HOURS,
  RESPONSE_SLA,
} from "@/content/landing";

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
            <span className="italic text-muted font-medium">
              {KONTAKT_TITLE_LINES[1]}
            </span>
          </h2>
        </div>

        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16"
          data-reveal
        >
          {/* LEFT — intro */}
          <div className="lg:col-span-5">
            <p className="font-sans text-muted leading-relaxed mb-5 max-w-md text-[15px] md:text-[16px]">
              {KONTAKT_INTRO.p1}
            </p>
            <p className="font-sans text-text leading-relaxed max-w-md text-[15px] md:text-[16px]">
              {KONTAKT_INTRO.p2}
            </p>
          </div>

          {/* RIGHT — founder card */}
          <div className="lg:col-span-7">
            <FounderCard />
          </div>
        </div>

        {/* Office info — full width at section bottom */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-12 pt-10 mt-12 lg:mt-16 border-t border-line"
          data-reveal
        >
          <div className="flex items-start gap-4">
            <MapPin
              size={18}
              strokeWidth={1.5}
              className="text-dim mt-0.5 flex-shrink-0"
            />
            <div>
              <span className="font-sans text-[10px] tracking-wider uppercase text-dim block mb-1">
                Biuro
              </span>
              <p className="font-sans text-[14px] text-text leading-relaxed">
                {CONTACT.street}
                <br />
                {CONTACT.postalCode} {CONTACT.city}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Clock
              size={18}
              strokeWidth={1.5}
              className="text-dim mt-0.5 flex-shrink-0"
            />
            <div>
              <span className="font-sans text-[10px] tracking-wider uppercase text-dim block mb-1">
                Godziny
              </span>
              <p className="font-sans text-[14px] text-text">{OFFICE_HOURS}</p>
              <p className="font-sans text-[12px] text-dim mt-1">
                {RESPONSE_SLA}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FounderCard() {
  return (
    <div
      className="bg-bg-alt border border-line"
      style={{ padding: "clamp(28px,3vw,48px)" }}
    >
      <div className="mb-8">
        <span className="font-sans text-[11px] tracking-[.2em] text-dim uppercase block mb-2">
          {FOUNDER.role}
        </span>
        <h3
          className="font-display font-bold text-text tracking-tight mb-1"
          style={{
            fontSize: "clamp(22px,2.5vw,30px)",
            letterSpacing: "-.02em",
          }}
        >
          {FOUNDER.name}
        </h3>
        <p className="font-sans text-[13px] text-muted">{FOUNDER.company}</p>
      </div>

      <div className="border-l-2 border-line pl-5 py-1 mb-10">
        <p className="font-sans text-text italic leading-relaxed text-[15px] md:text-[16px]">
          „{FOUNDER.quote}”
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <a
          href={`tel:${CONTACT.phoneE164}`}
          className="group flex items-center justify-between gap-4 bg-accent text-white px-6 py-5 hover:bg-accent-hover transition-colors min-h-14"
          aria-label={`Zadzwoń: ${CONTACT.phone}`}
        >
          <div className="flex items-center gap-4">
            <Phone size={20} strokeWidth={1.75} />
            <div>
              <div className="font-sans text-[11px] tracking-wider uppercase opacity-70 mb-0.5">
                Zadzwoń
              </div>
              <div className="font-sans font-medium text-[17px]">
                {CONTACT.phone}
              </div>
            </div>
          </div>
          <ArrowRight
            size={16}
            strokeWidth={2}
            className="opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
          />
        </a>

        <a
          href={`mailto:${CONTACT.email}`}
          className="group flex items-center justify-between gap-4 border border-line bg-transparent px-6 py-5 hover:border-dim hover:bg-bg-deep transition-colors min-h-14"
          aria-label={`Napisz: ${CONTACT.email}`}
        >
          <div className="flex items-center gap-4">
            <Mail size={20} strokeWidth={1.75} className="text-muted" />
            <div className="min-w-0">
              <div className="font-sans text-[11px] tracking-wider uppercase text-dim mb-0.5">
                Napisz
              </div>
              <div className="font-sans font-medium text-[14px] sm:text-[16px] text-text break-all">
                {CONTACT.email}
              </div>
            </div>
          </div>
          <ArrowRight
            size={16}
            strokeWidth={2}
            className="text-dim group-hover:text-text group-hover:translate-x-1 transition-all flex-shrink-0"
          />
        </a>
      </div>
    </div>
  );
}

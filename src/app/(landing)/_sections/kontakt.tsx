"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { Turnstile } from "@marsidev/react-turnstile";
import { Send, MapPin, Phone, Mail } from "lucide-react";
import { useScrollReveal } from "@/lib/animations/useScrollReveal";
import { LeadSchema, type LeadInput } from "@/lib/schemas/lead";
import { PTYPES, AREAS, CONTACT, KONTAKT_TITLE_LINES } from "@/content/landing";
import { Logo } from "@/components/logo";

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

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
          <ContactForm />
          <ContactInfo />
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        className={`font-sans text-[10px] uppercase tracking-wider transition-colors ${
          error ? "text-error" : "text-dim"
        }`}
      >
        {label}
        {required && <span className="text-accent ml-0.5">*</span>}
      </label>
      {children}
      {error && (
        <span className="font-sans text-[11px] text-error font-light">
          {error}
        </span>
      )}
    </div>
  );
}

function ContactForm() {
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [tsToken, setTsToken] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LeadInput>({
    resolver: standardSchemaResolver(LeadSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      type: "",
      area: "",
      msg: "",
      website: "",
      turnstileToken: "",
    },
  });

  const onSubmit = async (data: LeadInput) => {
    setSubmitError(null);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...data, turnstileToken: tsToken }),
      });
      const json = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !json.ok) {
        setSubmitError(json.error || "Wystąpił błąd. Spróbuj ponownie.");
        return;
      }
      setSent(true);
    } catch {
      setSubmitError("Brak połączenia. Spróbuj ponownie.");
    }
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center gap-3.5 py-14 px-5 text-center">
        <div className="w-11 h-11 rounded-full bg-accent/10 flex items-center justify-center">
          <Send size={17} strokeWidth={1.5} className="text-accent" />
        </div>
        <h3 className="font-display font-bold text-[20px] text-text">
          Zapytanie wysłane
        </h3>
        <p className="font-sans text-[13px] text-muted font-light">
          Odpowiemy w ciągu 24h w dni robocze.
        </p>
      </div>
    );
  }

  const inputCls =
    "font-sans text-[13px] text-text bg-input-bg border border-line px-3.5 py-3 w-full outline-none focus:border-accent transition-colors placeholder:text-dim min-h-11";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4.5">
      {/* Honeypot (hidden) */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: "-10000px",
          width: 1,
          height: 1,
          overflow: "hidden",
        }}
      >
        <label>
          Website
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("website")}
          />
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <Field label="Imię i nazwisko" required error={errors.name?.message}>
          <input
            type="text"
            placeholder="Jan Kowalski"
            className={inputCls}
            {...register("name")}
          />
        </Field>
        <Field label="Firma">
          <input
            type="text"
            placeholder="Opcjonalne"
            className={inputCls}
            {...register("company")}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <Field label="Email" required error={errors.email?.message}>
          <input
            type="email"
            placeholder="jan@firma.pl"
            className={inputCls}
            {...register("email")}
          />
        </Field>
        <Field label="Telefon" required error={errors.phone?.message}>
          <input
            type="tel"
            placeholder="+48 ..."
            className={inputCls}
            {...register("phone")}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <Field label="Typ projektu" required error={errors.type?.message}>
          <select className={inputCls} defaultValue="" {...register("type")}>
            <option value="" disabled hidden>
              Wybierz...
            </option>
            {PTYPES.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Metraż">
          <select className={inputCls} defaultValue="" {...register("area")}>
            <option value="" disabled hidden>
              Wybierz...
            </option>
            {AREAS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Wiadomość">
        <textarea
          rows={4}
          placeholder="Opisz projekt..."
          className={`${inputCls} resize-y min-h-[90px]`}
          {...register("msg")}
        />
      </Field>

      {SITE_KEY ? (
        <Turnstile
          siteKey={SITE_KEY}
          onSuccess={setTsToken}
          options={{ theme: "dark" }}
        />
      ) : (
        <p className="font-sans text-[11px] text-dim">
          (Turnstile wyłączony — brak <code>NEXT_PUBLIC_TURNSTILE_SITE_KEY</code>)
        </p>
      )}

      {submitError && (
        <p className="font-sans text-[12px] text-error">{submitError}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="font-sans text-[12px] font-medium uppercase tracking-wider px-7 py-3.5 bg-accent hover:bg-accent-hover disabled:bg-dim disabled:cursor-wait text-white border-none cursor-pointer transition-colors flex items-center justify-center gap-2.5 w-full min-h-11"
      >
        {isSubmitting ? "Wysyłanie..." : "Wyślij zapytanie"}
        {!isSubmitting && <Send size={13} strokeWidth={2} />}
      </button>

      <p className="font-sans text-[11px] text-dim font-light">
        Odpowiadamy w ciągu 24h. Twoje dane nie będą udostępniane.
      </p>
    </form>
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
          <span className="font-sans text-[11px] text-dim">Wawer, Warszawa</span>
        </div>
      </div>
    </aside>
  );
}

import { ProcessTabs } from "./ProcessTabs";
import { PROCESS_STEPS } from "./data";

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Proces budowy wnętrz komercyjnych z PLANY",
  description:
    "Pięć kroków, jeden zespół, jedna odpowiedzialność — od wyceny po serwis pogwarancyjny.",
  step: PROCESS_STEPS.map((s, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: `${s.title} ${s.titleEm}`,
    text: s.body,
  })),
};

export function Process() {
  return (
    <section
      id="proc"
      aria-labelledby="proc-heading"
      className="bg-bg border-t border-line section-pad-x"
      style={{ paddingBottom: "clamp(80px,12vw,160px)" }}
    >
      <div className="mx-auto" style={{ maxWidth: "var(--container-max)" }}>
        <ProcessTabs />
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
    </section>
  );
}

import type { QuizLeadInput } from "@/lib/schemas/lead";
import {
  AREA_LABELS,
  INDUSTRY_LABELS,
  CONDITION_LABELS,
  STANDARD_LABELS,
  LOCATION_LABELS,
} from "@/lib/quiz-labels";

const escape = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export function leadEmailHtml(lead: QuizLeadInput, ip?: string): string {
  const rows: Array<[string, string]> = [
    ["Metraż", AREA_LABELS[lead.area]],
    ["Branża", INDUSTRY_LABELS[lead.industry]],
    ["Stan wejściowy", CONDITION_LABELS[lead.condition]],
    ["Standard", STANDARD_LABELS[lead.standard]],
    ["Lokalizacja", LOCATION_LABELS[lead.location]],
    ["Email", lead.email],
  ];

  return `<!doctype html>
<html lang="pl"><head><meta charset="utf-8"><title>Nowy quiz lead · PLANY</title></head>
<body style="margin:0;padding:0;background:#0D0B09;font-family:-apple-system,system-ui,sans-serif;color:#E2D9CE;">
  <div style="max-width:560px;margin:0 auto;padding:32px 24px;">
    <h1 style="font-family:Georgia,serif;font-size:22px;font-weight:800;color:#C4A97D;margin:0 0 8px;">Nowy quiz lead</h1>
    <p style="margin:0 0 24px;font-size:12px;color:#9A8E7E;">plany.com.pl · automatyczne zgłoszenie z quizu wyceny</p>
    <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">
      ${rows
        .map(
          ([k, v]) => `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #2A2622;font-size:11px;color:#9A8E7E;text-transform:uppercase;letter-spacing:.06em;width:140px;vertical-align:top;">${escape(k)}</td>
          <td style="padding:10px 0;border-bottom:1px solid #2A2622;font-size:14px;color:#E2D9CE;white-space:pre-wrap;">${escape(v)}</td>
        </tr>`,
        )
        .join("")}
    </table>
    <p style="margin:24px 0 0;font-size:11px;color:#5E564A;">IP: ${escape(ip || "—")} · ${new Date().toISOString()}</p>
    <p style="margin:8px 0 0;font-size:11px;color:#5E564A;">Klient nie podał imienia ani telefonu — odpisz na <a style="color:#C4A97D;text-decoration:none;" href="mailto:${escape(lead.email)}">${escape(lead.email)}</a>.</p>
  </div>
</body></html>`;
}

export function leadEmailSubject(lead: QuizLeadInput): string {
  return `[PLANY] Quiz · ${INDUSTRY_LABELS[lead.industry]} · ${AREA_LABELS[lead.area]}`;
}

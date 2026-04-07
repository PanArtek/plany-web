import type { LeadInput } from "@/lib/schemas/lead";

const escape = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export function leadEmailHtml(lead: LeadInput, ip?: string): string {
  const rows: Array<[string, string]> = [
    ["Imię i nazwisko", lead.name],
    ["Firma", lead.company || "—"],
    ["Email", lead.email],
    ["Telefon", lead.phone],
    ["Typ projektu", lead.type],
    ["Metraż", lead.area || "—"],
    ["Wiadomość", lead.msg || "—"],
  ];

  return `<!doctype html>
<html lang="pl"><head><meta charset="utf-8"><title>Nowe zapytanie · PLANY</title></head>
<body style="margin:0;padding:0;background:#0D0B09;font-family:-apple-system,system-ui,sans-serif;color:#E2D9CE;">
  <div style="max-width:560px;margin:0 auto;padding:32px 24px;">
    <h1 style="font-family:Georgia,serif;font-size:22px;font-weight:800;color:#C4A97D;margin:0 0 24px;">Nowe zapytanie z plany.com.pl</h1>
    <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">
      ${rows
        .map(
          ([k, v]) => `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #2A2622;font-size:11px;color:#9A8E7E;text-transform:uppercase;letter-spacing:.06em;width:130px;vertical-align:top;">${escape(k)}</td>
          <td style="padding:10px 0;border-bottom:1px solid #2A2622;font-size:14px;color:#E2D9CE;white-space:pre-wrap;">${escape(v)}</td>
        </tr>`,
        )
        .join("")}
    </table>
    <p style="margin:24px 0 0;font-size:11px;color:#5E564A;">IP: ${escape(ip || "—")} · ${new Date().toISOString()}</p>
  </div>
</body></html>`;
}

export function leadEmailSubject(lead: LeadInput): string {
  return `[PLANY] ${lead.type} — ${lead.name}`;
}

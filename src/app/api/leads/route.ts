import { NextResponse } from "next/server";
import { Resend } from "resend";
import { LeadSchema } from "@/lib/schemas/lead";
import { verifyTurnstile } from "@/lib/turnstile";
import { rateLimit, maybeCleanup } from "@/lib/rate-limit";
import { leadEmailHtml, leadEmailSubject } from "@/lib/email/lead-template";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getClientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

export async function POST(req: Request) {
  maybeCleanup();
  const ip = getClientIp(req);

  const limit = rateLimit(`leads:${ip}`, 5, 60_000);
  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, error: "Zbyt wiele zapytań. Spróbuj ponownie za chwilę." },
      {
        status: 429,
        headers: {
          "retry-after": String(
            Math.max(1, Math.ceil((limit.resetAt - Date.now()) / 1000)),
          ),
        },
      },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Nieprawidłowy JSON" },
      { status: 400 },
    );
  }

  const parsed = LeadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Nieprawidłowe dane formularza" },
      { status: 400 },
    );
  }
  const lead = parsed.data;

  // Honeypot
  if (lead.website && lead.website.length > 0) {
    return NextResponse.json({ ok: true }); // pretend success
  }

  const turnstileOk = await verifyTurnstile(lead.turnstileToken, ip);
  if (!turnstileOk) {
    return NextResponse.json(
      { ok: false, error: "Weryfikacja antyspamowa nie powiodła się" },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  const to = process.env.LEAD_TO;
  const cc = process.env.LEAD_CC;

  if (!apiKey || !from || !to) {
    console.error("[leads] Resend env vars missing");
    return NextResponse.json(
      { ok: false, error: "Konfiguracja maila niepełna" },
      { status: 500 },
    );
  }

  try {
    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from,
      to: [to],
      cc: cc ? [cc] : undefined,
      replyTo: lead.email,
      subject: leadEmailSubject(lead),
      html: leadEmailHtml(lead, ip),
    });
    if (result.error) {
      console.error("[leads] Resend error", result.error);
      return NextResponse.json(
        { ok: false, error: "Nie udało się wysłać wiadomości" },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("[leads] send exception", err);
    return NextResponse.json(
      { ok: false, error: "Błąd wysyłki" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

import { NextResponse } from "next/server";
import { checkSite } from "../../../scripts/site-report/checks.mjs";
import { evaluate } from "../../../scripts/site-report/score.mjs";
import { parseTarget } from "@/lib/sitecheck/guard";
import { acquire, allowRequest, cached, release, remember } from "@/lib/sitecheck/limits";
import { present } from "@/lib/sitecheck/present";

export const runtime = "nodejs";
export const maxDuration = 60;

const TIME_LIMIT_MS = 45_000;

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

export async function POST(request: Request) {
  let body: { url?: unknown };
  try {
    body = (await request.json()) as { url?: unknown };
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  const target = parseTarget(body.url);
  if (!target.ok) return NextResponse.json({ error: target.error }, { status: 400 });

  const hit = cached(target.host);
  if (hit) return NextResponse.json({ result: hit });

  if (!allowRequest(clientIp(request))) {
    return NextResponse.json(
      { error: "Kısa sürede çok fazla kontrol yaptınız. Birkaç dakika sonra tekrar deneyin." },
      { status: 429 },
    );
  }
  if (!acquire()) {
    return NextResponse.json(
      { error: "Şu an çok yoğunuz. Lütfen biraz sonra tekrar deneyin." },
      { status: 503 },
    );
  }

  try {
    const timeout = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("timeout")), TIME_LIMIT_MS),
    );
    const facts = await Promise.race([checkSite(target.host), timeout]);
    const result = present(target.host, facts, evaluate(facts));
    remember(target.host, result);
    return NextResponse.json({ result });
  } catch {
    return NextResponse.json(
      { error: "Kontrol tamamlanamadı. Adresi doğru yazdığınızdan emin olup tekrar deneyin." },
      { status: 502 },
    );
  } finally {
    release();
  }
}

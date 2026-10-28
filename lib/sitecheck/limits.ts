/**
 * Best-effort abuse protection for the public checker.
 * State lives in the memory of one server instance, so it slows down casual abuse but is not a hard
 * guarantee across instances. A Vercel firewall rate-limit rule on /api/site-kontrol is the real cap.
 */
import type { CheckResult } from "./present";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 6;
const CACHE_MS = 10 * 60 * 1000;
const MAX_CONCURRENT = 8;

const hits = new Map<string, number[]>();
const cache = new Map<string, { at: number; result: CheckResult }>();
let running = 0;

export function allowRequest(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return false;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  }
  return true;
}

export function cached(host: string): CheckResult | null {
  const hit = cache.get(host);
  if (!hit) return null;
  if (Date.now() - hit.at > CACHE_MS) {
    cache.delete(host);
    return null;
  }
  return hit.result;
}

export function remember(host: string, result: CheckResult) {
  cache.set(host, { at: Date.now(), result });
  if (cache.size > 500) {
    const oldest = [...cache.entries()].sort((a, b) => a[1].at - b[1].at)[0];
    if (oldest) cache.delete(oldest[0]);
  }
}

export function acquire(): boolean {
  if (running >= MAX_CONCURRENT) return false;
  running++;
  return true;
}

export function release() {
  running = Math.max(0, running - 1);
}

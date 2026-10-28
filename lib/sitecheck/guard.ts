/**
 * Input rules for the public site checker. The server fetches whatever address a visitor types,
 * so only plain public website names are accepted: no IP addresses, ports, logins or local names.
 */
export type Target = { ok: true; host: string } | { ok: false; error: string };

const BAD = "Geçerli bir web sitesi adresi yazın (örnek: kurumadi.com).";

export function parseTarget(input: unknown): Target {
  if (typeof input !== "string") return { ok: false, error: BAD };
  const raw = input.trim();
  if (!raw || raw.length > 253) return { ok: false, error: BAD };

  let u: URL;
  try {
    u = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
  } catch {
    return { ok: false, error: BAD };
  }

  if (u.username || u.password || u.port) return { ok: false, error: BAD };
  const host = u.hostname.toLowerCase();

  // Browsers keep IP literals bracketed (IPv6) or numeric (IPv4); both are refused.
  if (host.startsWith("[") || /^[0-9.]+$/.test(host)) return { ok: false, error: BAD };
  if (!/^[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(host)) return { ok: false, error: BAD };
  if (!/\.[a-z]{2,}$/.test(host) && !/\.xn--[a-z0-9-]+$/.test(host)) return { ok: false, error: BAD };
  if (/(^|\.)(localhost|local|internal|lan|home|corp|intranet)$/.test(host)) return { ok: false, error: BAD };

  return { ok: true, host };
}

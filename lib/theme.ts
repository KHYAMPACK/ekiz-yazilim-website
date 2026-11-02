/** Routes rendered in the Scholares theme (orange + warm black). */
export const SC_PATHS = [
  "/",
  "/egitim",
  "/web-sitesi",
  "/isler",
  "/site-kontrol",
  "/randevu",
] as const;

/** Sections whose pages all use the Scholares theme, including pages generated from data. */
const SC_PREFIXES = ["/blog", "/arastirma"] as const;

export function isScPath(pathname: string | null) {
  if (pathname === null) return false;
  return (
    (SC_PATHS as readonly string[]).includes(pathname) ||
    SC_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`))
  );
}

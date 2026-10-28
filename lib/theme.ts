/** Routes rendered in the Scholares theme (orange + warm black). */
export const SC_PATHS = ["/", "/egitim", "/web-sitesi", "/isler", "/site-kontrol"] as const;

export function isScPath(pathname: string | null) {
  return pathname !== null && (SC_PATHS as readonly string[]).includes(pathname);
}

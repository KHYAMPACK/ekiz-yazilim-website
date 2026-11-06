/**
 * Link to the Ekiz Yazılım agency profile on Upwork. Set NEXT_PUBLIC_UPWORK_URL in the
 * environment (Vercel project settings). While it is empty the page's buttons send an email
 * instead, so no button ever points nowhere.
 */
export const UPWORK_URL = (process.env.NEXT_PUBLIC_UPWORK_URL ?? "").trim();

export const UPWORK_PATH = "/upwork";

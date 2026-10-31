"use client";

import { track } from "@vercel/analytics";
import { useEffect } from "react";

/**
 * Counts how visitors reach us, without touching every link on the site.
 * One listener watches for clicks on WhatsApp, phone, email and /randevu links and records only the
 * kind of contact and the page it happened on. No link text, address or personal data is sent.
 */
function kindOf(href: string): string | null {
  if (href.startsWith("https://wa.me/") || href.startsWith("https://api.whatsapp.com/")) return "whatsapp";
  if (href.startsWith("tel:")) return "phone";
  if (href.startsWith("mailto:")) return "email";
  if (href === "/randevu" || href.startsWith("/randevu?")) return "randevu";
  return null;
}

export default function AnalyticsEvents() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const a = (e.target as Element | null)?.closest?.("a[href]");
      if (!a) return;
      const kind = kindOf(a.getAttribute("href") ?? "");
      if (kind) track("contact_click", { kind, page: window.location.pathname });
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}

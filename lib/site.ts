/** Public site facts */
export const site = {
  name: "Ekiz Yazılım",
  city: "Ankara",
  email: "ekizmert3@gmail.com",
  /** Digits only with country code */
  phone: process.env.NEXT_PUBLIC_PHONE ?? "905515998156",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "905515998156",
  responseTime: "24 saat içinde dönüş",
  linkedin: "",
  instagram: "",
  /** Optional Cal.com / Calendly / Google Appointments URL */
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL ?? "",
  description:
    "Etüt merkezleri, kreşler ve özel okullar için öğrenci takip sistemi ve web sitesi. Türkiye genelinde uzaktan hizmet.",
} as const;

export function whatsappHref(prefill?: string) {
  if (!site.whatsapp) return null;
  const base = `https://wa.me/${site.whatsapp}`;
  if (!prefill) return base;
  return `${base}?text=${encodeURIComponent(prefill)}`;
}

export function phoneHref() {
  if (!site.phone) return null;
  return `tel:+${site.phone}`;
}

export function phoneDisplay() {
  if (!site.phone || site.phone.length < 12) return site.phone;
  // 90 551 599 81 56
  const p = site.phone;
  return `+${p.slice(0, 2)} ${p.slice(2, 5)} ${p.slice(5, 8)} ${p.slice(8, 10)} ${p.slice(10)}`;
}

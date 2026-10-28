/**
 * Numbers for the Ankara course-centre website study (scan of 28 Ekim 2026).
 * Source: research/ankara-2026/summary.json (scripts/research/*). Counts only;
 * percentages are derived here so they always match the stated base.
 */
export const STUDY = {
  slug: "ankara-kurs-siteleri-2026",
  dateLabel: "28 Ekim 2026",
  dateIso: "2026-10-28",
  listed: 530, // institutions in our Ankara list
  noWebsite: 213, // no website address on their Google Maps listing
  socialOnly: 27, // only a social media page
  uniqueSites: 211, // different website addresses scanned (branches share one)
  reachable: 186,
  unreachable: 25,
  unreachableDns: 21,
  unreachableTimeout: 2,
  unreachableBlocked: 2,
} as const;

export const pct = (n: number, base: number = STUDY.reachable) =>
  Math.round((n / base) * 100);

export type Finding = {
  label: string;
  count: number;
  note: string;
};

export const GROUPS: { title: string; lead: string; items: Finding[] }[] = [
  {
    title: "Ziyaretçi siteye girebiliyor mu?",
    lead: "Güven burada başlar ya da biter.",
    items: [
      {
        label: "Sertifika geçersiz",
        count: 11,
        note: "Ziyaretçi “bağlantınız gizli değil” uyarısı görüyor (4’ünün süresi dolmuş, 7’sinin sertifikası başka bir adres için alınmış).",
      },
      {
        label: "http ile açılan adres https’e yönlenmiyor",
        count: 35,
        note: "Eski adresle gelen ziyaretçi güvenli sürüme geçmiyor.",
      },
      {
        label: "Güvenli sayfada güvensiz dosya (mixed content)",
        count: 23,
        note: "Tarayıcı sayfayı “kısmen güvenli” gösterebiliyor.",
      },
      {
        label: "Sertifikası 30 gün içinde bitiyor",
        count: 5,
        note: "Yenilenmezse bir ay sonra uyarı çıkacak.",
      },
    ],
  },
  {
    title: "Google siteyi anlayabiliyor mu?",
    lead: "Arama sonucunda görünmek için gereken temel ayrıntılar.",
    items: [
      {
        label: "Google açıklaması (meta description) yok",
        count: 52,
        note: "Arama sonucunda görünecek cümleyi Google kendisi seçiyor.",
      },
      {
        label: "Site haritası yok",
        count: 50,
        note: "/sitemap.xml, WordPress eklentilerinin kullandığı diğer adresler ve robots.txt kontrol edildi.",
      },
      {
        label: "robots.txt yok",
        count: 37,
        note: "Arama motorlarına yön veren standart dosya eksik.",
      },
    ],
  },
  {
    title: "Veli paylaşabiliyor ve ulaşabiliyor mu?",
    lead: "Bir veli siteyi WhatsApp’ta gruba atınca ne görünüyor, tek dokunuşla arayabiliyor mu?",
    items: [
      {
        label: "Paylaşım görseli (og:image) yok",
        count: 110,
        note: "Bağlantı WhatsApp’ta ya da sosyal medyada görselsiz, sade bir metin olarak görünüyor.",
      },
      {
        label: "WhatsApp bağlantısı yok",
        count: 108,
        note: "Velilerin en çok kullandığı kanal sitede yok.",
      },
      {
        label: "Dokunup arama bağlantısı yok",
        count: 60,
        note: "Telefondaki ziyaretçi numarayı elle çevirmek zorunda.",
      },
    ],
  },
];

export const HEADLINES = [
  { value: `%${pct(110)}`, label: "paylaşım görseli yok" },
  { value: `%${pct(108)}`, label: "WhatsApp bağlantısı yok" },
  { value: `%${pct(52)}`, label: "Google açıklaması yok" },
  { value: "11", label: "sitede tarayıcı güvenlik uyarısı" },
] as const;

export const METHOD: { title: string; body: string }[] = [
  {
    title: "Hangi siteler?",
    body: "Ankara’daki kurs, dershane ve etüt merkezlerinden derlediğimiz 530 kurumluk liste. 290 kaydın web sitesi var; bunlar 211 farklı adres, çünkü aynı kurumun şubeleri çoğunlukla aynı siteyi kullanıyor. Her adres bir kez sayıldı. Kurumun kendi sitesi olmayan bir e-posta giriş adresi listeden çıkarıldı.",
  },
  {
    title: "Ne kontrol edildi?",
    body: "Ana sayfa ve standart dosyalar: sertifika, http/https yönlendirmesi, Google açıklaması, paylaşım görseli, mobil görünüm etiketi, robots.txt, site haritası, telefon ve WhatsApp bağlantısı. Kontrol otomatik yapıldı, her adres için aynı adımlar çalıştı.",
  },
  {
    title: "Ne zaman, nereden?",
    body: "28 Ekim 2026’da, tek bir bağlantıdan. Sonuçlar gün ve konuma göre değişebilir; bir site başka bir gün açılıyor olabilir.",
  },
  {
    title: "Açılmayan 25 adres",
    body: "21 alan adı çözülmedi, 2 adres zaman aşımına uğradı, 2’si bağlantıyı engelledi. Bunları “bozuk” saymıyoruz ve oranlara katmadık. Yalnızca bizim bağlantımızdan açılmadıklarını söylüyoruz.",
  },
  {
    title: "Neye bakmadık?",
    body: "Alt sayfaları, içerik kalitesini, tasarımı ve mobil hızı değerlendirmedik. Bir bulgu “hata” değil “eksik” demek; her eksik bir kurumun kötü olduğu anlamına gelmez. Hiçbir kurumu ismiyle anmıyoruz.",
  },
  {
    title: "Yanlış bir şey görürseniz",
    body: "Siteniz bu listedeyse ve bir bulguyu yanlış buluyorsanız bize yazın, kontrol edip düzeltelim.",
  },
];

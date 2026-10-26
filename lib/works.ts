export type WorkTag = "web" | "ecommerce" | "app" | "game";
export type WorkStatus = "live" | "building" | "prototype";
export type WorkIcon = "store" | "school" | "rocket" | "gamepad";

export type Work = {
  id: string;
  name: string;
  /** Short category line, e.g. "Kurumsal web sitesi — kreş" */
  meta: string;
  /** "site" cards show a browser bar with the domain; "app" cards show an icon. */
  kind: "site" | "app";
  tags: WorkTag[];
  status: WorkStatus;
  blurb: string;
  highlights: string[];
  stack: string[];
  /** Public URL (omit for unfinished client work) */
  href?: string;
  /** Domain shown in the browser bar for "site" cards */
  domain?: string;
  /** GitHub repo URL */
  repo?: string;
  icon?: WorkIcon;
};

const gh = (repo: string) => `https://github.com/KHYAMPACK/${repo}`;

export const STATUS_LABEL: Record<WorkStatus, string> = {
  live: "Yayında",
  building: "Yapım aşamasında",
  prototype: "Prototip",
};

export const WORK_FILTERS: { id: "all" | WorkTag; label: string }[] = [
  { id: "all", label: "Tümü" },
  { id: "web", label: "Web siteleri" },
  { id: "app", label: "Uygulamalar" },
  { id: "ecommerce", label: "E-ticaret" },
  { id: "game", label: "Oyun" },
];

/** Apps first, then websites; newest first within each group. */
export const works: Work[] = [
  {
    id: "cortis",
    name: "Cortisstyle",
    meta: "Uygulama — çok kiracılı e-ticaret platformu",
    kind: "app",
    icon: "store",
    tags: ["app", "ecommerce"],
    status: "live",
    blurb:
      "Butikler için e-ticaret altyapısı: her butik tek kod tabanı üzerinde kendi vitrinini, alan adını, yönetim panelini, ödemesini ve kargosunu alıyor.",
    highlights: [
      "Butik başına mağaza, özel alan adı ve yönetim paneli",
      "iyzico ödeme (butik başına şifreli anahtarlar) ve Basit Kargo entegrasyonu",
      "Stok, sipariş, fatura, indirim ve raporlar; yeni siparişte push bildirimi",
      "Yapay zekâ katalog hattı: Gemini ile ürün metni, FASHN ile sanal deneme",
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "Zustand", "iyzico", "Resend", "Web Push", "Gemini"],
    href: "https://www.cortisstyle.com",
    repo: gh("cortisstyle-platform"),
  },
  {
    id: "takip",
    name: "Öğrenci Takip & Veli Bildirim",
    meta: "Uygulama — okul yönetim sistemi (PWA)",
    kind: "app",
    icon: "school",
    tags: ["app"],
    status: "live",
    blurb:
      "Müdür, öğretmen, rehber öğretmen ve veliyi aynı uygulamada buluşturan okul yönetim sistemi. Atlas Eğitim Kurumu’nda her gün kullanılıyor.",
    highlights: [
      "Rol bazlı paneller: yoklama, ödev, deneme sınavı, aidat ve mesajlaşma",
      "CSV ve optik okuyucudan sınav aktarımı, konu bazlı analiz",
      "Velilere anlık push bildirim, zamanlanmış hatırlatmalar",
      "PDF ve Excel raporlar, satır düzeyinde güvenlik (RLS)",
    ],
    stack: ["React", "Vite", "Supabase", "Realtime", "Web Push", "Vercel Cron", "PWA"],
    repo: gh("student-tracking-app"),
  },
  {
    id: "hustle",
    name: "Hustle Engine",
    meta: "Uygulama — girişimciler için proje yöneticisi",
    kind: "app",
    icon: "rocket",
    tags: ["app"],
    status: "prototype",
    blurb:
      "Fikir aşamasındaki girişimciler için stratejik proje yöneticisi. Yapay zekâ ile sohbet ederek kapsamı çıkarır, yol haritası ve bütçe takibi sunar.",
    highlights: [
      "Soru soru ilerleyen yapay zekâ kapsam sohbeti",
      "Yapılabilirlik, sermaye ve risk skorlarıyla yol haritası",
      "Kilometre taşları, günlük görevler ve odak sayacı",
      "Aylık gider (burn rate) takibi",
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "Vercel AI SDK", "Gemini", "Zod"],
    repo: gh("hustle-engine-app"),
  },
  {
    id: "heart-house",
    name: "Heart House",
    meta: "Oyun — iki kişilik parti oyunu",
    kind: "app",
    icon: "gamepad",
    tags: ["game"],
    status: "building",
    blurb:
      "Bir arkadaşımla birlikte geliştirdiğim, Steam üzerinden oynanan iki kişilik parti oyunu.",
    highlights: [
      "Steam lobisi ile arkadaşla eşleşme",
      "CMake derleme sistemi, Raylib ile çizim",
    ],
    stack: ["C++", "Raylib", "Steamworks", "CMake"],
    repo: gh("heart-house-game"),
  },
  {
    id: "anasehir",
    name: "Anaşehir Koleji",
    meta: "Kurumsal web sitesi — özel okul",
    kind: "site",
    tags: ["web"],
    status: "building",
    blurb:
      "Anaokulundan liseye özel okul için 12 sayfalık kurumsal site.",
    highlights: [
      "GSAP ile animasyonlu ana sayfa anlatımı",
      "Öğrenci radyosu için dahili oynatıcı",
      "Kayıt ve WhatsApp ön başvuru formları",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP"],
    repo: gh("anasehir-koleji-website"),
  },
  {
    id: "fmx",
    name: "FMX Global Express",
    meta: "Kurumsal web sitesi — lojistik",
    kind: "site",
    domain: "fmxglobalexpress.com",
    tags: ["web"],
    status: "building",
    blurb:
      "Lojistik firmasının sitesinin yeniden tasarımı: marka kimliği korunarak SEO için çok sayfalı yapıya geçiş.",
    highlights: [
      "Kargo fiyat hesaplayıcı",
      "Gönderi takip sayfası ve teklif formu",
      "Tüm içerik tek veri dosyasından",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    repo: gh("fmx-kargo-website"),
  },
  {
    id: "atlas",
    name: "Atlas Eğitim Kurumu",
    meta: "Kurumsal web sitesi — LGS hazırlık",
    kind: "site",
    domain: "atlasegitimkurumu.com",
    tags: ["web"],
    status: "live",
    blurb:
      "Denizli’de LGS hazırlık kurumu için web sitesi ve ön kayıt akışı. Veli uygulamasına da buradan geçiliyor.",
    highlights: [
      "Programa özel sayfalar ve deneme kulübü",
      "Ön kayıt formları, pop-up ve sabit WhatsApp / arama",
      "JSON-LD, otomatik Open Graph görselleri, site haritası",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP", "Motion"],
    href: "https://www.atlasegitimkurumu.com",
    repo: gh("atlas-egitim-website"),
  },
  {
    id: "lider",
    name: "Lider Çocuklar Anaokulu",
    meta: "Kurumsal web sitesi — anaokulu",
    kind: "site",
    domain: "denizlilidercocuklaranaokulu.com",
    tags: ["web"],
    status: "live",
    blurb:
      "Denizli Merkezefendi’de anaokulu için kurumsal site: atölyeler, galeri ve iletişim.",
    highlights: [
      "GSAP kaydırma animasyonları ve açılış yükleyicisi",
      "Vitest ile test edilmiş iletişim formu",
      "Her push’ta CI: lint, tip kontrolü, test, build",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP", "Vitest", "GitHub Actions"],
    href: "https://www.denizlilidercocuklaranaokulu.com",
    repo: gh("lider-cocuklar-website"),
  },
  {
    id: "sahika",
    name: "Şahika Öncü Minikler",
    meta: "Kurumsal web sitesi — kreş",
    kind: "site",
    domain: "sahikaoncuminikler.com",
    tags: ["web"],
    status: "live",
    blurb:
      "Montessori yaklaşımlı butik kreş için 8 sayfalık kurumsal site.",
    highlights: [
      "Yaş grubuna göre programlar ve günlük ritim",
      "Animasyonlu logo, iletişim formu, WhatsApp / arama",
      "Otomatik Open Graph görselleri ve kanonik URL’ler",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    href: "https://www.sahikaoncuminikler.com",
    repo: gh("sahika-oncu-minikler-website"),
  },
  {
    id: "ekiz",
    name: "Ekiz Yazılım",
    meta: "Kurumsal web sitesi — bu site",
    kind: "site",
    domain: "ekizyazilim.com",
    tags: ["web"],
    status: "live",
    blurb:
      "Stüdyonun kendi sitesi ve müşteri akışı. Müşteri akışı ve randevu / proje formu da içinde.",
    highlights: [
      "Tasarım ilham testi ve randevu / proje formu",
      "Yerel SEO için hizmet sayfaları, Resend ile e-posta",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Motion", "Resend"],
    href: "https://ekizyazilim.com",
    repo: gh("ekiz-yazilim-website"),
  },
  {
    id: "basak",
    name: "Özel Başak Akademi",
    meta: "Kurumsal web sitesi — eğitim",
    kind: "site",
    domain: "basakakademi20.com",
    tags: ["web"],
    status: "live",
    blurb:
      "Denizli’de etüt merkezi ve ilkokul destek programı için kurumsal site.",
    highlights: [
      "Tek dosyadan yönetilen fotoğraf, video ve YouTube galerisi",
      "İletişim formu, WhatsApp ve arama butonları",
      "Google İşletme Profili ile uyumlu yerel SEO",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    href: "https://basakakademi20.com",
    repo: gh("basak-akademi-website"),
  },
  {
    id: "lila",
    name: "Lila Boutique",
    meta: "E-ticaret — giyim",
    kind: "site",
    domain: "lilaboutiquedenizli.com",
    tags: ["ecommerce"],
    status: "live",
    blurb:
      "Denizli’de butik giyim mağazasının online satış sitesi. Cortisstyle altyapısında çalışan ilk mağaza.",
    highlights: [
      "Beden, renk ve stoklu ürün sayfaları",
      "iyzico ile ödeme, kargo takibi",
      "Google Merchant ürün akışı",
    ],
    stack: ["Cortisstyle", "Next.js", "Supabase", "iyzico"],
    href: "https://www.lilaboutiquedenizli.com",
  },
  {
    id: "budabi",
    name: "Bu Da Bi Art",
    meta: "Kurumsal web sitesi — kültür ve medya",
    kind: "site",
    domain: "budabi.art",
    tags: ["web"],
    status: "live",
    blurb:
      "Kültür-sanat ve yapım şirketi için çerçevesiz, elle yazılmış çok sayfalı site.",
    highlights: [
      "Portfolyo, Düşünür ve iletişim sayfaları",
      "Bot korumalı, konu seçmeli iletişim formu",
      "TikTok, YouTube ve Instagram içerikleri gömülü",
    ],
    stack: ["HTML", "CSS", "JavaScript"],
    href: "https://budabi.art",
  },
];

/** Grouped stack for the /isler "Kullandığım teknolojiler" block. */
export const STACK_GROUPS: { title: string; items: string[] }[] = [
  {
    title: "Dil",
    items: ["TypeScript", "JavaScript", "C++", "SQL", "HTML / CSS"],
  },
  {
    title: "Arayüz",
    items: ["React", "Next.js", "Vite", "Tailwind CSS", "GSAP", "Motion", "PWA"],
  },
  {
    title: "Sunucu & veri",
    items: ["Supabase", "PostgreSQL", "Row Level Security", "Realtime", "Serverless API", "Cron"],
  },
  {
    title: "Entegrasyon",
    items: ["iyzico", "Basit Kargo", "Resend", "Web Push", "Gemini", "FASHN", "Photoroom"],
  },
  {
    title: "Araçlar",
    items: ["Git", "GitHub Actions", "Vercel", "Vitest", "Raylib", "Steamworks"],
  },
];

export const FEATURED_WORK_IDS = ["cortis", "takip", "sahika"] as const;

export function featuredWorks(): Work[] {
  return FEATURED_WORK_IDS.map((id) => {
    const work = works.find((item) => item.id === id);
    if (!work) throw new Error(`Missing featured work: ${id}`);
    return work;
  });
}

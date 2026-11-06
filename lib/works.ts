export type WorkTag = "web" | "ecommerce" | "app" | "game";
export type WorkStatus = "live" | "building" | "prototype" | "offline";
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
  /** Short line shown on the card for private or offline work (e.g. why there is no link) */
  note?: string;
  /** Overrides the group the card is shown in (default: derived from status and link) */
  group?: WorkGroup;
};

const gh = (repo: string) => `https://github.com/KHYAMPACK/${repo}`;

export const STATUS_LABEL: Record<WorkStatus, string> = {
  live: "Yayında",
  building: "Yapım aşamasında",
  prototype: "Prototip",
  offline: "Çevrimdışı",
};

/**
 * Cards are shown in four groups, in this order: work you can open right now first, then work
 * that is live but behind a login, then work in progress, then work that is currently offline.
 */
export type WorkGroup = "live" | "private" | "building" | "offline";

export const WORK_GROUPS: { id: WorkGroup; title: string; note: string }[] = [
  { id: "live", title: "Yayında", note: "Açıp gezebileceğiniz canlı siteler ve uygulamalar." },
  {
    id: "private",
    title: "Yayında, giriş gerektirir",
    note: "Yönetim paneli ya da giriş arkasında çalışan sistemler ve üzerlerindeki mağazalar.",
  },
  { id: "building", title: "Yapım aşamasında", note: "Henüz tamamlanmamış işler." },
  { id: "offline", title: "Şu an çevrimiçi değil", note: "Kayıt için burada duruyor." },
];

export function workGroup(work: Work): WorkGroup {
  if (work.group) return work.group;
  if (work.status === "offline") return "offline";
  if (work.status === "live") return work.href ? "live" : "private";
  return "building";
}

export const WORK_FILTERS: { id: "all" | WorkTag; label: string }[] = [
  { id: "all", label: "Tümü" },
  { id: "web", label: "Web siteleri" },
  { id: "app", label: "Uygulamalar" },
  { id: "ecommerce", label: "E-ticaret" },
  { id: "game", label: "Oyun" },
];

const allWorks: Work[] = [
  {
    id: "cortis",
    name: "Cortisstyle",
    meta: "Uygulama — çok kiracılı e-ticaret platformu",
    kind: "app",
    icon: "store",
    tags: ["app", "ecommerce"],
    status: "live",
    group: "private",
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
    id: "scholares",
    name: "Scholares",
    meta: "Uygulama — çok kiracılı okul yönetim sistemi (PWA)",
    kind: "app",
    icon: "school",
    tags: ["app"],
    status: "live",
    note: "Rol: ürün tasarımı ve uçtan uca geliştirme · Denizli’de bir özel okulda canlı kullanımda",
    blurb:
      "LGS hazırlık kurumları için okul yönetim uygulaması: yoklama, deneme analizi ve veli iletişimi tek, telefona kurulabilen web uygulamasında. Müdür, öğretmen ve veli aynı sistemde; her okul kendi logosu ve renkleriyle.",
    highlights: [
      "Müdür, öğretmen, rehber öğretmen ve veli rolleri; yetkiler veritabanında zorlanır (satır düzeyinde güvenlik)",
      "Çok kiracılı yapı: her okulun kendi markası, özellik ayarları ve alan adı var",
      "İki yoklama modeli: günlük ve haftalık ders programına bağlı ders bazlı",
      "Deneme sınavı hattı: CSV ve optik okuyucu aktarımı, net ve sıralama, tarayıcıda PDF rapor",
      "Velilere Web Push bildirimi; zamanlanmış takvim hatırlatmaları ve haftalık raporlar",
    ],
    stack: ["React 19", "Vite", "Supabase", "Postgres RLS", "Web Push", "Vercel Cron", "react-pdf", "PWA"],
    href: "https://scholares.site",
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
    status: "offline",
    note: "Müşterinin kararıyla yayından kaldırıldı.",
    blurb:
      "Montessori yaklaşımlı butik kreş için 8 sayfalık kurumsal site.",
    highlights: [
      "Yaş grubuna göre programlar ve günlük ritim",
      "Animasyonlu logo, iletişim formu, WhatsApp / arama",
      "Otomatik Open Graph görselleri ve kanonik URL’ler",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
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
    group: "private",
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
    id: "tohumluktan",
    name: "Tohumluktan",
    meta: "E-ticaret — doğal ve el yapımı ürünler",
    kind: "site",
    domain: "tohumluktan.com",
    tags: ["ecommerce"],
    status: "live",
    group: "private",
    blurb:
      "Tohumluk Vakfı’nın online mağazası: köyden ve kentten üreticilerin zeytinyağı ve gıda paketleri, el yapımı takı, seramik, kozmetik ve hediye ürünleri. Cortisstyle altyapısında çalışıyor.",
    highlights: [
      "Gıda, takı ve aksesuar, giyim, kozmetik ve hediye kategorileri",
      "Ürün arama ve “hikayesi olan ürünler” bölümü",
      "Mesafeli satış, iade ve KVKK metinleri hazır",
    ],
    stack: ["Cortisstyle", "Next.js", "Supabase"],
    href: "https://www.tohumluktan.com",
  },
  {
    id: "budabi",
    name: "Bu Da Bi Art",
    meta: "Kurumsal web sitesi — kültür ve medya",
    kind: "site",
    domain: "budabi.art",
    tags: ["web"],
    status: "offline",
    note: "Şu an erişilemiyor.",
    blurb:
      "Kültür-sanat ve yapım şirketi için çerçevesiz, elle yazılmış çok sayfalı site.",
    highlights: [
      "Portfolyo, Düşünür ve iletişim sayfaları",
      "Bot korumalı, konu seçmeli iletişim formu",
      "TikTok, YouTube ve Instagram içerikleri gömülü",
    ],
    stack: ["HTML", "CSS", "JavaScript"],
  },
  {
    id: "matemageist",
    name: "Matemageist",
    meta: "Kurumsal web sitesi — matematik eğitimi",
    kind: "site",
    domain: "matemageist.study",
    tags: ["web"],
    status: "live",
    blurb:
      "LGS ve YKS matematiği için eğitim sitesi: sınıf sınıf konu bölümleri, blog, eğitim paketleri ve öğrenci koçluğu.",
    highlights: [
      "5–8. sınıf, LGS, 9–12. sınıf, TYT ve AYT için ayrı bölümler",
      "Matematik tarihi, felsefesi ve eğitim üzerine blog yazıları",
      "Eğitim paketleri ve öğrenci koçluğu sayfaları",
      "Öğrenciler için giriş paneli",
    ],
    stack: ["Next.js", "Vercel"],
    href: "https://matemageist.study",
  },
  {
    id: "agile",
    name: "Agile Auto Parts",
    meta: "E-ticaret geliştirme ve SEO — ABD oto yedek parça mağazası",
    kind: "site",
    domain: "agileautoparts.com",
    tags: ["web", "ecommerce"],
    status: "live",
    note: "Rol: geliştirici ve SEO sorumlusu · 2026",
    blurb:
      "Binlerce performans ve yedek parça satan bir ABD mağazasının, “bu parça aracıma uyar mı?” sorusu etrafında yeniden kurulması: özel mağaza teması, kendi arama ve uyumluluk sistemi ve teknik SEO programı.",
    highlights: [
      "Araç öncelikli tasarım: yıl, marka ve model bir kez seçilir, her sayfada hatırlanır, uyan parçalar önce gelir",
      "Ücretli uygulamanın yerine Supabase (Postgres ve Edge Functions) üzerinde kendi arama ve uyumluluk sistemi; 27 kategori listesi",
      "118 üretilmiş açılış sayfası ve 8.399 üründe yayınlanmış “uyar” bilgisi",
      "Telefonda sabit satın alma çubuğu; yapılandırılmış veri, başlık kalıpları, 24 kategoride rehber ve SSS",
      "Canlı mağazada kesintisiz yayın: 34 etiketli, geri alınabilir tema sürümü",
    ],
    stack: ["BigCommerce Stencil", "Handlebars", "SCSS", "JavaScript", "Supabase", "Klaviyo", "Merchant Center", "GA4"],
    href: "https://agileautoparts.com",
  },
  {
    id: "agile-panel",
    name: "Agile Auto Parts — Ürün Paneli",
    meta: "Uygulama — özel katalog paneli",
    kind: "app",
    icon: "store",
    tags: ["app"],
    status: "live",
    note: "Müşteriye özel panel; giriş gerektirir.",
    blurb:
      "Agile Auto Parts’ın ana ürün kataloğu için ekip paneli. Hesapları yönetici açar.",
    highlights: [
      "E-posta ve şifreye ek olarak telefondan 6 haneli kodla giriş",
      "Yönetici tarafından açılan hesaplar",
      "Ana ürün kataloğu tek yerden yönetilir",
    ],
    stack: ["Next.js", "Vercel"],
  },
];

/** Display order. Within the "Yayında" group the first entries are the strongest, most open work. */
const ORDER = [
  "agile",
  "scholares",
  "atlas",
  "lider",
  "ekiz",
  "basak",
  "matemageist",
  "cortis",
  "lila",
  "tohumluktan",
  "agile-panel",
  "anasehir",
  "fmx",
  "hustle",
  "heart-house",
  "sahika",
  "budabi",
] as const;

export const works: Work[] = ORDER.map((id) => {
  const work = allWorks.find((item) => item.id === id);
  if (!work) throw new Error(`Missing work: ${id}`);
  return work;
});

if (works.length !== allWorks.length) {
  throw new Error("Every work must appear in ORDER");
}

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

/** Homepage picks: all three open in a new tab. */
export const FEATURED_WORK_IDS = ["cortis", "atlas", "matemageist"] as const;

export function featuredWorks(): Work[] {
  return FEATURED_WORK_IDS.map((id) => {
    const work = works.find((item) => item.id === id);
    if (!work) throw new Error(`Missing featured work: ${id}`);
    return work;
  });
}

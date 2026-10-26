export const WEB_PATH = "/web-sitesi";

export const WEB_WA =
  "Merhaba, web sitesi sayfanızdan yazıyorum. İşletmem için bir site kurmak istiyorum.";

export const CLIENTS = [
  "Şahika Öncü Minikler",
  "Lider Çocuklar Anaokulu",
  "Özel Başak Akademi",
] as const;

export const TASKS_A = [
  "Site haritası",
  "Sayfa düzenleri",
  "Boşluk ve hizalama",
  "Mobil uyum",
  "Metin yazımı",
  "Görseller",
  "Favicon",
  "Formlar",
  "WhatsApp bağlantısı",
  "Gizlilik sayfası",
  "404 sayfası",
  "Fontlar",
  "Logo menüde",
  "Telif yılı",
  "Animasyonlar",
  "Buton testleri",
] as const;

export const TASKS_B = [
  "Meta başlıklar",
  "Açıklamalar",
  "Schema",
  "Sitemap",
  "robots.txt",
  "Görsel sıkıştırma",
  "SSL",
  "Google Analytics",
  "Search Console",
  "Performans",
  "Tarayıcı testi",
  "Yönlendirmeler",
  "Alan adı",
  "Hosting kurulumu",
  "Yayın",
  "Küçük düzeltmeler",
] as const;

export const PAINS = [
  {
    quote: "Önceki site şablondan yapılmıştı, bize hiç benzemiyordu.",
    note: "Hazır tema",
  },
  {
    quote: "Müşteri Instagram’a gidiyor, orada kayboluyor.",
    note: "Adres yok",
  },
  {
    quote: "Telefonda yazılar kayıyor, menü açılmıyor.",
    note: "Mobil",
  },
  {
    quote: "Siteyi kim güncelleyecek? Ben teknik değilim.",
    note: "Bakım",
  },
  {
    quote: "Ajans ortadan kayboldu; dosyalar kimin elinde belli değil.",
    note: "Mülkiyet",
  },
  {
    quote: "Buna ayıracak vaktim yok.",
    note: "Zaman",
  },
] as const;

export const PILLARS = [
  {
    word: "Keşif",
    title: "Önce İhtiyacı Netleştiririz.",
    body: "15–20 dakikalık görüşmede işinizi, müşterilerinizi ve siteden beklentinizi konuşuruz. Yazılı teklif bundan sonra gelir.",
    imageAlt: "Keşif görüşmesi",
    images: [
      "/websitesi/kesif/01.jpg",
      "/websitesi/kesif/02.jpg",
      "/websitesi/kesif/03.jpg",
      "/websitesi/kesif/04.jpg",
      "/websitesi/kesif/05.jpg",
    ],
  },
  {
    word: "Tasarım",
    title: "Şablon Değil, Size Özel Bir Site.",
    body: "Düzeni, metni ve mobil yapıyı işinize göre kurarız. Hazır bir temanın üzerine logo yerleştirmekle yetinmeyiz.",
    imageAlt: "Tasarım çalışması",
    images: [
      "/websitesi/tasarim/01.jpg",
      "/websitesi/tasarim/02.jpg",
      "/websitesi/tasarim/03.jpg",
      "/websitesi/tasarim/04.jpg",
      "/websitesi/tasarim/05.jpg",
    ],
  },
  {
    word: "Destek",
    title: "Yayından Sonra Da Yanınızdayız.",
    body: "Site canlıya çıktıktan sonra metin, görsel ve küçük güncellemeler için her zaman ulaşabilirsiniz.",
    imageAlt: "Yayın sonrası destek",
    images: [
      "/websitesi/destek/01.jpg",
      "/websitesi/destek/02.jpg",
      "/websitesi/destek/03.jpg",
      "/websitesi/destek/04.jpg",
      "/websitesi/destek/05.jpg",
    ],
  },
] as const;

export const STEPS = [
  {
    n: "01",
    title: "Keşif",
    body: "15–20 dakikalık görüşme. İşinizi, müşterilerinizi ve siteden beklentinizi konuşuruz.",
  },
  {
    n: "02",
    title: "Teklif",
    body: "Sayfalar, süre ve fiyat yazılı gelir. Onayınız olmadan işe başlamayız.",
  },
  {
    n: "03",
    title: "Tasarım",
    body: "Düzeni ve metinleri görürsünüz. Değişmesini istediğiniz yerleri birlikte netleştiririz.",
  },
  {
    n: "04",
    title: "Kurulum",
    body: "Mobil uyum, formlar, SEO temelleri, alan adı ve hosting. Siz işinize devam edersiniz.",
  },
  {
    n: "05",
    title: "Yayın",
    body: "Site yayına alınır. Search Console kurulumu ve son kontrolleri biz yaparız.",
  },
  {
    n: "06",
    title: "Destek",
    body: "Yayından sonra da yanınızdayız. Metin, görsel ve küçük güncellemeler için her zaman ulaşabilirsiniz.",
  },
] as const;

export const TYPICAL_PRICE = "10.000";

export const INCLUDED = [
  "İşinize özel tasarım — hazır şablon değil",
  "İhtiyacınız olan sayfalar (keşifte netleşir)",
  "Metin desteği",
  "Mobil uyumlu yapı",
  "SEO temelleri (başlık, açıklama, site haritası)",
  "İletişim formu veya WhatsApp",
  "Alan adı ve hosting kurulumu — hesaplar sizde",
  "Yayından sonra sürekli destek",
] as const;

export const WORKS = [
  {
    name: "Şahika Öncü Minikler",
    meta: "Kreş — Yenişehir",
    href: "https://www.sahikaoncuminikler.com",
    desktop: "/works/sahika-desktop.png",
  },
  {
    name: "Lider Çocuklar Anaokulu",
    meta: "Anaokulu — Yenişehir",
    href: "https://www.denizlilidercocuklaranaokulu.com",
    desktop: "/works/lider-desktop.png",
  },
  {
    name: "Özel Başak Akademi",
    meta: "Eğitim — Denizli",
    href: "https://basakakademi20.com",
    desktop: "/works/basak-desktop.png",
  },
  {
    name: "Lila Boutique",
    meta: "Butik — Merkezefendi",
    href: "https://lilaboutiquedenizli.com",
    desktop: "/works/lila-desktop.png",
  },
] as const;

export const COMPARE_COLS = [
  { key: "ekiz", label: "Ekiz", ours: true },
  { key: "agency", label: "Ajans", ours: false },
  { key: "freelance", label: "Freelance", ours: false },
  { key: "diy", label: "Kendin Yap", ours: false },
] as const;

export const COMPARE_ROWS = [
  {
    label: "Süre",
    ekiz: "Teklifte net yazılır",
    agency: "3–6+ ay",
    freelance: "4–12 hafta",
    diy: "Vakit bulursanız",
  },
  {
    label: "Fiyat",
    ekiz: "Yazılı teklif",
    agency: "Yüksek peşin ödeme",
    freelance: "Değişken, peşin",
    diy: "Sizin zamanınız",
  },
  {
    label: "Tasarım",
    ekiz: "Her zaman özel",
    agency: "Evet",
    freelance: "Kime bağlı",
    diy: "Yalnızca şablon",
  },
  {
    label: "Metin Ve Hosting",
    ekiz: "Dahil",
    agency: "Çoğu zaman ekstra",
    freelance: "Nadiren dahil",
    diy: "Hepsi size kalır",
  },
  {
    label: "Yayın Sonrası",
    ekiz: "Sürekli destek",
    agency: "Nadiren",
    freelance: "Nadiren",
    diy: "Kimse yok",
  },
] as const;

export const FAQS = [
  {
    q: "Bu Sayfa Kimler İçin?",
    a: "Kreş, okul, etüt merkezi, ofis, atölye, klinik veya bir işletmesi olan; ürün satmayan, kendini anlatan bir site isteyenler için.",
  },
  {
    q: "Bu E-Ticaret Mi?",
    a: "Hayır. Bu sayfa tanıtım ve kurumsal site içindir. Ürün satıp sepet ve ödeme istiyorsanız bizimle konuşun, ayrıca değerlendirelim.",
  },
  {
    q: "Hazır Şablon Mu Kullanıyorsunuz?",
    a: "Hayır. Düzeni işinize göre kuruyoruz. Hazır bir temanın üzerine logo yerleştirmekle yetinmiyoruz.",
  },
  {
    q: "Ne Kadar Sürer?",
    a: "Kapsama göre değişir. Sade bir tanıtım sitesi genelde kısa sürede çıkar. Süre teklifte yazılı olur.",
  },
  {
    q: "Fiyat Nasıl Belirleniyor?",
    a: "Tipik bir tanıtım sitesi 20.000 ₺ civarında çıkar. Bu sabit bir paket fiyatı değil — kapsam keşifte netleşir. Görüşmeden sonra yazılı teklif gelir; sonradan eklenen gizli ücret yok.",
  },
  {
    q: "Logom Veya Fotoğrafım Yoksa?",
    a: "Sorun değil. Elinizdeki malzemeyle başlarız; eksikleri keşifte konuşuruz. Sizden uzun içerik beklemiyoruz.",
  },
  {
    q: "Hosting Ve Alan Adı Sizde Mi Kalır?",
    a: "Hayır. Kurulumu biz yaparız; hesaplar ve mülkiyet sizde kalır.",
  },
  {
    q: "Yayından Sonra Destek Var Mı?",
    a: "Evet. Site yayına çıktıktan sonra da yanınızdayız. Metin, görsel ve küçük güncellemeler için her zaman yazabilirsiniz. Daha büyük eklemeler ayrıca konuşulur.",
  },
  {
    q: "Başka Şehirlerden Çalışır Mısınız?",
    a: "Evet. Ankara merkezliyiz ve Türkiye genelinde uzaktan çalışıyoruz. Görüşme ve teslim online yapılır; Ankara’da isterseniz yüz yüze de görüşebiliriz.",
  },
] as const;

import type { Post } from "@/lib/blog/types";

export const post: Post = {
  slug: "web-sitesi-yillik-maliyeti",
  title: "Web sitesinin yıllık gerçek maliyeti ne? Alan adı, barındırma, bakım ve gizli ücretler",
  description:
    "Web sitesini yaptırdıktan sonra her yıl ne ödersiniz? Alan adı, barındırma, sertifika, bakım ve düzeltme maliyetleri ve teklifte sorulacak gizli ücret soruları.",
  published: "2026-11-02",
  updated: "2026-11-02",
  readingMinutes: 6,
  answer:
    "Kurulum bedeli maliyetin yalnızca bir parçasıdır. Her yıl alan adı yenileme, barındırma, güvenlik sertifikası, yedek ve düzeltme ihtiyacı için ödeme ya da emek gerekir; bunların bir kısmı kurulum fiyatına dahil olabilir, bir kısmı ayrıca gelir. Teklifte bunların her birinin kimde olduğunu, kaç lira olduğunu ve ikinci yıl değişip değişmediğini yazılı isteyin.",
  sections: [
    {
      heading: "Bir sitenin yıllık maliyet kalemleri",
      blocks: [
        {
          type: "table",
          head: ["Kalem", "Nedir", "Sormanız gereken"],
          rows: [
            ["Alan adı", "Sitenin adresi (kurumadi.com). Yıllık yenilenir.", "Kimin adına? Yenileme ücreti ne kadar? Bildirim kime gidiyor?"],
            ["Barındırma", "Sitenin dosyalarının durduğu sunucu.", "İlk yıl dahil mi? İkinci yıl ne kadar? Yedek var mı?"],
            ["Güvenlik sertifikası (SSL)", "Tarayıcıdaki güvenli bağlantı. Süresi dolarsa uyarı çıkar.", "Otomatik yenileniyor mu? Kim takip ediyor?"],
            ["Yedek ve güvenlik güncellemesi", "Bir sorunda siteyi geri getirmek, yazılımı güncel tutmak.", "Kim yapıyor? Ne sıklıkla?"],
            ["Düzeltme ve içerik güncelleme", "Metin, görsel, duyuru ve takvim değişiklikleri.", "Kaç tur ücretsiz? Sonrası ne kadar?"],
            ["Ölçüm ve Google takibi", "Kaç veli girdi, aramada nasıl görünüyorsunuz?", "Rapor veriliyor mu, kim bakıyor?"],
          ],
        },
        {
          type: "p",
          text: "Bunların hepsi ya fiyata **dahildir**, ya **ayrı faturalanır**, ya da **kimse yapmaz**. Sorun çoğunlukla üçüncü seçenektir: kimse yapmadığı için bir gün site uyarı verir ya da kapanır.",
        },
      ],
    },
    {
      heading: "Gizli ücretler genellikle nerede çıkar?",
      blocks: [
        {
          type: "ul",
          items: [
            "**“Yenileme bedeli”** adıyla ikinci yıldan itibaren barındırma ya da paket ücreti.",
            "**“Sunucu ücreti”** gibi açıklaması yapılamayan kalemler.",
            "**Her değişiklik için saatlik ücret.** Küçük bir telefon numarası güncellemesi bile faturaya girer.",
            "**Alan adı yapımcının hesabında** ve yenileme bedeli piyasanın çok üstünde.",
            "**Ayrılmak isteyince devir ücreti.**",
          ],
        },
        {
          type: "p",
          text: "Çözüm basit: teklifte her ücreti, her kaleminin gerekçesiyle yazılı isteyin. Açıklanamayan kalem varsa sorun.",
        },
      ],
    },
    {
      heading: "Bizde yıllık maliyet nasıl?",
      blocks: [
        {
          type: "p",
          text: "Rakamları saklamıyoruz. Tüm fiyatlar KDV dahildir:",
        },
        {
          type: "table",
          head: ["", "Tutar", "Ne içeriyor"],
          rows: [
            ["Kurumsal Site (bir kez)", "20.000 TL", "Tasarım, içerik girişi, ön kayıt ve WhatsApp, temel SEO, ölçüm, alan adı sizin adınıza, yayına alma sürecinde her türlü düzeltme."],
            ["Aylık bakım (isteğe bağlı)", "2.500 TL / ay", "Barındırma, güvenlik, yedek, sertifika takibi, her türlü düzeltme, içerik güncellemeleri, temel SEO ve aylık rapor. İlk ay ücretsiz."],
            ["Alan adı yenileme", "Kayıt firmasına göre", "Siz öderseniz hesabınız ve yenileme tarihiniz sizde olur; hatırlatmayı biz de takip ederiz."],
          ],
        },
        {
          type: "p",
          text: "Bakım paketini istemezseniz barındırma, sertifika ve düzeltmeleri kendiniz ya da başka biri üstlenir; bu durumda o kalemlerin maliyetini ve sorumluluğunu baştan hesaplayın. İlk yıl toplam örnek: 20.000 TL + 11 ay × 2.500 TL = 47.500 TL.",
        },
      ],
    },
    {
      heading: "Sitenizi zaten yaptırdıysanız",
      blocks: [
        {
          type: "p",
          text: "Şu üç soruya cevap verebiliyor musunuz?",
        },
        {
          type: "ol",
          items: [
            "Alan adı kimin adına ve ne zaman doluyor?",
            "Barındırma kimde, yıllık ücreti ne, yedek var mı?",
            "Sertifika kendiliğinden yenileniyor mu, bitiş tarihi ne zaman?",
          ],
        },
        {
          type: "p",
          text: "Cevaplayamıyorsanız risk bilinmiyor demektir. [Ücretsiz kontrol aracımız](/web-sitesi) alan adı bitiş tarihini, sertifikanın kaç gün kaldığını ve Google ayarlarını sizin için ölçer. Altyapınız sorunluysa siteyi yeniden yaptırmadan taşımak da mümkündür: [Siteyi yeniden yaptırmadan taşımak](/blog/siteyi-yeniden-yaptirmadan-tasimak).",
        },
      ],
    },
  ],
  faq: [
    {
      q: "Web sitesi yıllık ne kadar tutar?",
      a: "Kalemlere bağlıdır: alan adı yenileme, barındırma, sertifika, bakım ve düzeltme. Bizim bakım paketimiz 2.500 TL/ay (KDV dahil). Başka teklifleri karşılaştırırken yıllık toplamı ve ikinci yıl değişikliğini yazılı isteyin.",
    },
    {
      q: "Alan adı yenilemesini kim ödemeli?",
      a: "Alan adı kurumunuzun adınaysa ödeme de sizin hesabınızdan olmalıdır. Hatırlatmalar hem size hem siteyi yöneten kişiye gitmelidir.",
    },
    {
      q: "Bakım paketi almazsam ne olur?",
      a: "Site çalışmaya devam eder ama güvenlik güncellemesi, yedek, sertifika yenilemesi ve düzeltmeler kimsenin sorumluluğunda olmaz. Bir gün uyarı çıkar ya da site durur. O yüzden bunları kimin yapacağını baştan netleştirin.",
    },
  ],
  related: [
    "ucuz-web-sitesi-neden-pahaliya-cikar",
    "alan-adi-suresi-dolarsa-ne-olur",
    "siteyi-yeniden-yaptirmadan-tasimak",
  ],
};

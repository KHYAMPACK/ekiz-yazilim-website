import type { Post } from "@/lib/blog/types";

export const post: Post = {
  slug: "siteyi-yeniden-yaptirmadan-tasimak",
  title: "Siteyi yeniden yaptırmadan başka bir altyapıya taşımak ne zaman mantıklı?",
  description:
    "Siteniz yavaş, uyarı veriyor ya da yapımcıya bağlıysa ama tasarımı işinizi görüyorsa, sıfırdan yaptırmak yerine taşımak mantıklı olabilir. Ne zaman, ne zaman değil?",
  published: "2026-11-02",
  updated: "2026-11-02",
  readingMinutes: 6,
  answer:
    "Sitenizin tasarımı ve içeriği işinizi görüyor ama altyapı sorunluysa (yavaş, tarayıcı uyarısı veriyor, bakımsız, yapımcıya ya da süresi dolmuş bir hizmete bağlı) taşımak mantıklıdır: daha az maliyetli ve daha hızlıdır. Site eski, telefonda kötü görünüyor ya da veliyi ikna etmiyorsa yeniden tasarım gerekir. Taşımak tasarım sorununu çözmez.",
  sections: [
    {
      heading: "Önce sorunun tasarımda mı altyapıda mı olduğunu ayırın",
      blocks: [
        {
          type: "table",
          head: ["Belirti", "Sorun nerede?", "Çözüm"],
          rows: [
            ["Site yavaş açılıyor, sık sık kapanıyor", "Altyapı (barındırma)", "Taşıma"],
            ["Tarayıcı “bağlantınız gizli değil” diyor", "Altyapı (sertifika)", "Taşıma ya da sertifika düzeltmesi"],
            ["Barındırma hesabı ya da site yapımcıda, ulaşamıyorsunuz", "Altyapı ve sahiplik", "Taşıma"],
            ["Site oluşturucu paketi dolmuş ya da yönlendiriyor", "Altyapı", "Taşıma"],
            ["Güncelleme ve yedek yapılmıyor", "Altyapı (bakım)", "Taşıma ya da bakım paketi"],
            ["Telefonda kötü görünüyor, yazılar küçük", "Tasarım", "Yeniden tasarım"],
            ["Veli neler sunduğunuzu anlamıyor, kayıt formu yok", "Tasarım ve içerik", "Yeniden tasarım"],
            ["Yeni program ve şubeler eklendi", "İçerik ve yapı", "Yeni sayfalar ya da yeni site"],
          ],
        },
        {
          type: "p",
          text: "Hangi gruba girdiğinizi anlamak için [ücretsiz kontrol aracımıza](/web-sitesi) adresinizi yazın. Güvenlik, hız ve Google ayarlarındaki sorunları altyapı tarafında gösterir; tasarım kalitesini ise kendiniz değerlendirmelisiniz.",
        },
      ],
    },
    {
      heading: "Taşımanın artıları",
      blocks: [
        {
          type: "ul",
          items: [
            "**Hızlıdır:** görünüm baştan tasarlanmadığı için günler içinde bitebilir.",
            "**Daha az risk taşır:** neyin değişmeyeceği baştan bellidir; veliniz sitenizi tanımaya devam eder.",
            "**Sürekli maliyeti öngörülür olur:** barındırma, sertifika ve yedek tek ücrette toplanır.",
            "**Sahiplik netleşir:** alan adı ve hesaplar kendi adınıza geçer.",
          ],
        },
      ],
    },
    {
      heading: "Taşımanın sınırları",
      blocks: [
        {
          type: "ul",
          items: [
            "**Tasarım sorununu çözmez.** Site eski görünüyorsa aynen taşınan site de eski görünür.",
            "**Yeni özellik getirmez.** Ön kayıt formu ya da ödeme gibi eklemeler ayrı iştir.",
            "**Kullanım hakkı şarttır.** Sitedeki tasarım ve içeriği kullanma hakkınız yoksa olduğu gibi kopyalamak sorun olabilir; o durumda tasarımı yenilemek doğrudur.",
            "**Teknik bağımlılıklar:** bazı siteler site oluşturucu özelliklerine (rezervasyon eklentisi, üyelik sistemi gibi) bağlıdır; bunlar aynen taşınamayabilir. Taşımadan önce hangi özelliklerin çalıştığını listeleyin.",
          ],
        },
      ],
    },
    {
      heading: "Taşıma sırasında bozulabilecek 4 şey",
      blocks: [
        {
          type: "ol",
          items: [
            "**Adresler:** sayfa adresleri değişirse Google'daki sıralama zarar görebilir. Adresler aynı kalmalı ya da eskilerden yenilere yönlendirme yapılmalı.",
            "**E-posta:** alan adınızın e-posta kayıtları korunmazsa e-postalar durabilir. Yönlendirme öncesi bunları yedekleyin.",
            "**Formlar ve ölçüm kodları:** taşıdıktan sonra mutlaka test edilmeli.",
            "**Google profilindeki bağlantı:** yeni adresin çalıştığını telefonunuzdan doğrulayın. ([Düzeltme adımları](/blog/google-haritalar-web-sitesi-butonu-acilmiyor))",
          ],
        },
      ],
    },
    {
      heading: "Karar vermek için 5 soru",
      blocks: [
        {
          type: "ol",
          items: [
            "Tasarımdan ve içerikten memnun muyum, yoksa sorun görünümde mi?",
            "Sitedeki içerik ve tasarımı kullanma hakkım var mı?",
            "Alan adı, barındırma ve yönetim erişimi kimde?",
            "Taşıma sırasında bozulmaması gereken özellik ve adresler neler?",
            "Aylık mı, tek seferlik mi ödemek bana daha uygun?",
          ],
        },
        {
          type: "p",
          text: "Altyapı sorun çıkarıyor ve tasarım işinizi görüyorsa, aynı siteyi bizim altyapımızda ayda 999 TL'ye yayına alıyoruz (hosting, SSL ve yedek dahil, kurulum ücreti yok). Ayrıntılar ve ne dahil olmadığı: [Web sitesi taşıma nedir, ne kadar tutar?](/blog/web-sitesi-tasima-ne-kadar-tutar)",
        },
      ],
    },
  ],
  faq: [
    {
      q: "Taşırken Google'daki sıralamam kaybolur mu?",
      a: "Adresler aynı kalır ya da eskiden yeniye doğru yönlendirme yapılırsa riski azaltırsınız. Bunu garanti edemeyiz; taşıma sonrası site haritasını güncellemek ve birkaç hafta Google'daki görünürlüğü izlemek gerekir.",
    },
    {
      q: "Site oluşturucudaki (Wix gibi) sitemi taşıyabilir miyim?",
      a: "Bu siteler genellikle dışa aktarılamaz; taşıma, sayfaları ve içeriği yeni altyapıda yeniden kurmak demektir. İçeriğin ve tasarımın kullanım hakkı size aitse yapılabilir; platform özelliklerine bağlı işlevler aynen taşınmayabilir.",
    },
    {
      q: "Taşıma ile yeni site arasındaki maliyet farkı ne?",
      a: "Taşımada tasarım yenilenmediği için maliyet düşer. Bizde taşıma ayda 999 TL (KDV dahil), yeni bir Kurumsal Site ise 20.000 TL tek seferlik. İkisi farklı işlerdir; hangisi gerektiğine yukarıdaki tabloya bakarak karar verin.",
    },
    {
      q: "Eski site yapımcısı benden şifreleri vermiyorsa taşıyabilir miyim?",
      a: "Site dosyaları sizde değilse bile içerik ve görseller sizin olduğu için yeniden kurulabilir. Önce neyin kimde olduğunu çıkarın: [Siteyi yapan kişi şifreleri vermiyorsa ne yapılır?](/blog/siteyi-yapan-kisi-sifreleri-vermiyor)",
    },
  ],
  related: [
    "web-sitesi-tasima-ne-kadar-tutar",
    "siteyi-yapan-kisi-sifreleri-vermiyor",
    "web-sitesi-yillik-maliyeti",
  ],
};

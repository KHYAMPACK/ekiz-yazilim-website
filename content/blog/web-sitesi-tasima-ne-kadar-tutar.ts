import type { Post } from "@/lib/blog/types";

export const post: Post = {
  slug: "web-sitesi-tasima-ne-kadar-tutar",
  title: "Web sitesi taşıma nedir, ne kadar tutar? Sitenizin aynısını yeni altyapıya almak",
  description:
    "Web sitesi taşıma: mevcut sitenizi aynı sayfalar ve aynı görünümle yeni bir altyapıya almak. Ne içerir, ne kadar tutar, hangi riskleri taşır ve kimler için mantıklıdır?",
  published: "2026-11-02",
  updated: "2026-11-02",
  readingMinutes: 7,
  answer:
    "Site taşıma, mevcut sitenizin sayfalarını, metinlerini ve görünümünü olduğu gibi tutup yeni bir altyapıya (sunucu, kod, güvenlik, yedek) almaktır. Yeniden tasarım değildir. Bizim Site Taşıma Paketimiz ayda 999 TL (KDV dahil), kurulum ücreti yoktur; hosting, SSL ve yedekleme dahildir ve site yaklaşık 3 gün içinde yayına hazır olur. Tasarım değişikliği ve yeni özellik pakete girmez.",
  sections: [
    {
      heading: "Site taşıma tam olarak ne demek?",
      blocks: [
        {
          type: "p",
          text: "Üç ayrı iş sık karıştırılır:",
        },
        {
          type: "table",
          head: ["İş", "Ne değişir", "Ne zaman mantıklı"],
          rows: [
            ["Site taşıma", "Altyapı değişir (sunucu, kod, güvenlik, yedek). Sayfalar ve görünüm aynı kalır.", "Tasarım ve içerik işinizi görüyor ama altyapı sorunlu: yavaş, uyarı veriyor, bakımsız ya da yapımcıya bağlı."],
            ["Yeniden tasarım", "Görünüm ve sayfa yapısı değişir.", "Site eski, telefonda kötü, veliyi ikna etmiyor."],
            ["Sıfırdan yeni site", "Her şey yeniden kurgulanır.", "Kurumunuz değişti, yeni program ve şubeler eklendi."],
          ],
        },
        {
          type: "p",
          text: "Taşıma, en az risk ve en kısa sürede yapılan seçenektir; çünkü neyin değişmeyeceği baştan bellidir.",
        },
      ],
    },
    {
      heading: "Site Taşıma Paketimiz: ne alıyorsunuz?",
      blocks: [
        {
          type: "ul",
          items: [
            "**Aynı site, aynı sayfalar:** sayfalar, metinler, görseller ve menü yapısı taşınır.",
            "**Bizim kodumuz:** eski dosyaların kopyası değil; site bizim altyapımızda yeniden kurulur ve bakımı, güvenliği bizde olur.",
            "**Hosting, SSL ve yedekleme dahil:** ayrıca bir fatura gelmez.",
            "**Telefonda düzgün açılır.**",
            "**Önizleme:** yayına almadan önce size özel bir bağlantıdan eski sitenizle yan yana karşılaştırırsınız.",
            "**Alan adı sizde kalır.** Yönlendirmeyi birlikte yaparız, site kesintisiz geçer.",
          ],
        },
        {
          type: "p",
          text: "Ücret: **ayda 999 TL, KDV dahil.** Kurulum ücreti yoktur. Yılda 11.988 TL eder.",
        },
        {
          type: "p",
          text: "Pakete dahil olmayanlar: tasarım değişikliği ve revizyon, yeni sayfa ya da özellik, içerik yazımı ve görsel hazırlığı. Bunları istediğinizde ayrıca yazılı teklif veririz. Paketin amacı, mevcut siteyi düşük ve sabit bir ücretle sorunsuz yayında tutmaktır. Ayrıntılar: [Site Taşıma Paketi](/site-tasima).",
        },
      ],
    },
    {
      heading: "Bu fiyat neyin karşılığı?",
      blocks: [
        {
          type: "p",
          text: "999 TL, bir web sitesinin kurulum bedeli değildir; sitenin **yayında sağlıklı kalmasının** aylık karşılığıdır. İçindeki işler şunlardır:",
        },
        {
          type: "ol",
          items: [
            "**Sunucu ve barındırma:** sitenin çalışacağı altyapı.",
            "**Sertifika yenileme:** tarayıcı uyarısının çıkmasını engelleyen takip. ([Neden önemli?](/blog/ssl-sertifikasi-dolarsa-ne-olur))",
            "**Düzenli yedek:** bir sorunda siteyi geri getirmek.",
            "**Güvenlik ve bakım:** altyapının güncel tutulması.",
            "**Taşıma emeği:** siteyi yeniden kurmak, test etmek, eski sitenizle karşılaştırmak ve adresi yönlendirmek.",
          ],
        },
        {
          type: "p",
          text: "Aynı işi kendiniz parça parça yaptırırsanız barındırma, sertifika ve yedek ayrı ayrı faturalanır ve **kimin takip ettiği belirsiz** kalır. Paketin değeri, bunları tek ücrette ve tek muhatapta toplamasıdır.",
        },
      ],
    },
    {
      heading: "Önemli: sitenin kullanım hakkı sizde olmalı",
      blocks: [
        {
          type: "note",
          title: "Bunu açıkça yazıyoruz",
          text: "Taşıma, sitedeki metin, görsel, logo ve tasarımın **kullanım hakkının sizde olduğu** durumlarda yapılır. Başka bir firmanın ya da tasarımcının emeğini, hakkı size geçmediyse olduğu gibi kopyalamak sorun çıkarabilir. Emin değilseniz önce eski firmayla yaptığınız anlaşmaya ve ödeme/teslim belgelerinize bakın. Hak size ait değilse doğru yol, tasarımı yenilemektir.",
        },
        {
          type: "p",
          text: "Biz siparişte bu hakkı yazılı olarak onaylamanızı isteriz; kodu da sıfırdan kendi altyapımızda yazarız, eski sitenin dosyalarını kullanmayız.",
        },
      ],
    },
    {
      heading: "Taşımada nelere dikkat edilir?",
      blocks: [
        {
          type: "ul",
          items: [
            "**Adresler aynı kalmalı** ya da eski adreslerden yenilerine doğru yönlendirme yapılmalı; yoksa Google'daki sıralamanız zarar görebilir.",
            "**E-postalarınız** alan adınızın ayarlarına bağlıdır. Yönlendirme sırasında e-posta kayıtları korunmazsa e-postalar durabilir.",
            "**Formlar** (ön kayıt, iletişim) taşındıktan sonra tek tek test edilmelidir.",
            "**Google profilindeki bağlantı** ve ölçüm kodları yeni sitede de çalışmalıdır.",
            "**Önizleme onayı:** eski ve yeni site yan yana kontrol edildikten sonra yayına alınmalıdır.",
          ],
        },
      ],
    },
  ],
  faq: [
    {
      q: "Site taşıma ne kadar sürer?",
      a: "Paketimizde siteyi yaklaşık 3 gün içinde yayına hazır hâle getiriyoruz. Sizin onayınızla ve alan adını yönlendirmenizle yayına alınır. Karmaşık siteler ya da özel işlevler için süre değişebilir; süre yazılı olarak bildirilir.",
    },
    {
      q: "Taşırken sitem kapanır mı?",
      a: "Hayır, kapanmaması hedeflenir: yeni site önce özel bir adreste hazırlanır, siz eski sitenizle yan yana karşılaştırırsınız ve ancak onaydan sonra adres yönlendirilir.",
    },
    {
      q: "Aylık 999 TL yerine bir kerelik ödeme yok mu?",
      a: "Bu paket, hosting, sertifika ve yedeklemeyi sürekli sağlayan bir hizmet olduğu için aylıktır. Tek seferlik yeni bir site ya da yeniden tasarım istiyorsanız Kurumsal Site (20.000 TL) daha uygundur.",
    },
    {
      q: "Paketten ayrılmak istersem ne olur?",
      a: "Hangi firma olursa olsun, ayrılma ve devir koşulunu sipariş vermeden önce yazılı isteyin: siteyi ve içeriklerinizi nasıl teslim aldığınızı bilin. Bu, kendi sitenizin kontrolünün sizde kalması için gereklidir.",
    },
  ],
  related: [
    "siteyi-yeniden-yaptirmadan-tasimak",
    "web-sitesi-yillik-maliyeti",
    "alan-adi-kimin-adina-olmali",
  ],
};

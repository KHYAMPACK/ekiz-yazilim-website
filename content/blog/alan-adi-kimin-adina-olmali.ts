import type { Post } from "@/lib/blog/types";

export const post: Post = {
  slug: "alan-adi-kimin-adina-olmali",
  title: "Web sitesi yaptırırken alan adı kimin adına olmalı?",
  description:
    "Alan adı kimin adına kaydedilmeli? Ajans ya da freelancer adına alınırsa ne risk var, nasıl kontrol edilir ve sözleşmeye ne yazılmalı? Kurs sahipleri için rehber.",
  published: "2026-11-02",
  updated: "2026-11-02",
  readingMinutes: 6,
  answer:
    "Kurumunuzun adına. Alan adı (kurumadi.com gibi) sitenizin adresidir ve kaydı kimin adına yapıldıysa onu o yönetir. Ajans ya da bireysel yapımcı adına kaydedilirse, anlaşmazlıkta siteniz, e-postalarınız ve Google'daki bağlantınız rehin kalabilir. Kayıt firmasındaki hesabın sahibi ve yenileme ödemesi sizde olmalı.",
  sections: [
    {
      heading: "Alan adı nedir, neden bu kadar önemli?",
      blocks: [
        {
          type: "p",
          text: "Alan adı, sitenizin internetteki adresidir: kurumadi.com gibi. Veliler sizi bu adresle bulur, Google Haritalar'daki “web sitesi” butonu bu adrese gider ve kurumsal e-posta adresiniz (info@kurumadi.com) bu adı kullanır.",
        },
        {
          type: "p",
          text: "Site dosyalarını başka bir yere taşıyabilirsiniz, tasarımı yenileyebilirsiniz. Ama alan adı kaybolursa adresiniz de, e-postalarınız da, Google'daki bağlantınız da gider. Bu yüzden sitenin en değerli ve en kırılgan parçasıdır.",
        },
      ],
    },
    {
      heading: "Kimin adına olursa ne olur?",
      blocks: [
        {
          type: "table",
          head: ["Kayıt kimin adına?", "Günlük işleyiş", "Anlaşmazlık ya da ayrılık anında"],
          rows: [
            ["Kurumunuz", "Hiçbir fark hissetmezsiniz.", "Adres sizdedir; siteyi başka bir yere taşıyabilirsiniz."],
            ["Ajans ya da freelancer", "Her şey sorunsuz görünür.", "Adres onda olduğu için site, e-posta ve Google bağlantısı pazarlık konusu olabilir."],
            ["Çalışanınız ya da tanıdık", "Başta kolaydır.", "Kişi ayrılırsa ya da ulaşılamazsa yenileme ve devir zorlaşır."],
          ],
        },
        {
          type: "p",
          text: "Bu bir kötü niyet varsayımı değildir. Çoğu ajans iyi niyetle kendi hesabında tutar. Ama sorun çıktığında (ödeme anlaşmazlığı, ajansın kapanması, iletişimin kopması) elinizdeki tek şey bir güven olur ve bunun bedeli çok yüksek olabilir.",
        },
      ],
    },
    {
      heading: "Alan adının kimin adına olduğunu nasıl öğrenirsiniz?",
      blocks: [
        {
          type: "ol",
          items: [
            "**Kayıt firmasını bulun:** alan adı sorgulama (whois / RDAP) araçlarına adresinizi yazın. Hangi kayıt firmasında olduğu genellikle görünür.",
            "**Kişisel bilgiler gizli olabilir:** bugün çoğu uzantıda sahip bilgisi gizleniyor; sorgu sonucunda isim görünmemesi sizin adınıza olduğu anlamına gelmez.",
            "**Asıl kontrol hesap girişidir:** alan adının kayıtlı olduğu firmadaki hesaba sizin e-postanızla giriş yapabiliyor musunuz? Yenileme faturası kime geliyor?",
            "**Ajansa sorun:** “Alan adı hangi hesapta, kimin e-postasıyla?” sorusunu yazılı sorun ve cevabı saklayın.",
          ],
        },
        {
          type: "note",
          title: "Uzantı önemli",
          text: ".com, .net gibi uzantılar ile .tr uzantılı alan adlarının (.com.tr, .org.tr gibi) kayıt süreçleri farklıdır. Kendi uzantınızın kurallarını kayıt firmanızdan öğrenin.",
        },
      ],
    },
    {
      heading: "Sözleşmeye ne yazılmalı?",
      blocks: [
        {
          type: "ul",
          items: [
            "Alan adı **kurumunuzun adına** kaydedilecektir.",
            "Kayıt firması hesabının e-postası ve yetkilisi kurumunuzdur; ajansın erişimi yetki ile verilir.",
            "Ödeme tamamlandığında site dosyaları, barındırma hesabı ve tüm yönetim bilgileri **yazılı olarak** teslim edilir.",
            "Ayrılma halinde devir süresi ve ücretsiz devir sözü.",
            "Yenileme tarihlerinin hem ajansa hem size bildirilmesi.",
          ],
        },
        {
          type: "p",
          text: "Biz alan adını her zaman müşterinin adına kaydediyoruz ve yenileme tarihini hem müşteriye hem kendimize bildirilecek şekilde ayarlıyoruz. Teklifimizde de bu yazılıdır.",
        },
      ],
    },
    {
      heading: "Alan adı şu an başkasının adınaysa ne yapmalısınız?",
      blocks: [
        {
          type: "ol",
          items: [
            "Kendi adınıza bir kayıt firması hesabı açın.",
            "Mevcut sahipten alan adının devrini (transfer) yazılı olarak isteyin.",
            "Devir sürecinde sitenizin ve e-postalarınızın kesilmemesi için bir takvim yapın; teknik taraf için bir uzmandan destek alın.",
            "Devir mümkün olmuyorsa ve bir anlaşmazlık varsa hukuki destek alın. Bu yazı hukuki danışmanlık değildir.",
          ],
        },
        {
          type: "p",
          text: "Siteyi yapan kişiyle bir sorun yaşıyorsanız şunu da okuyun: [Siteyi yapan kişi şifreleri vermiyorsa ne yapılır?](/blog/siteyi-yapan-kisi-sifreleri-vermiyor)",
        },
      ],
    },
  ],
  faq: [
    {
      q: "Ajans alan adını benim adıma aldığını söylüyor, nasıl doğrularım?",
      a: "Kayıt firmasındaki hesaba kendi e-postanızla giriş yapabiliyor musunuz, yenileme bildirimleri size geliyor mu, buna bakın. Yalnızca sorgulama sonucundaki isme güvenmeyin, çünkü sahip bilgisi çoğu zaman gizlidir.",
    },
    {
      q: "Alan adı ile barındırma (hosting) aynı şey mi?",
      a: "Hayır. Alan adı adrestir, barındırma ise sitenin dosyalarının durduğu yerdir. İkisi ayrı yerlerden alınabilir ve ayrı yenilenir. Biri dolarsa site durur.",
    },
    {
      q: "Alan adı transferi ne kadar sürer?",
      a: "Uzantıya ve kayıt firmasına göre değişir; genellikle birkaç gün sürer. Süre boyunca sitenin ve e-postaların kesilmemesi için sürecin planlı yapılması gerekir.",
    },
    {
      q: "Alan adını yenilemeyi kim yapmalı?",
      a: "Kayıt hesabı sizdeyse yenileme ödemesi de sizin kartınızdan ya da kurumunuzun hesabından olmalıdır. Hatırlatmalar hem size hem de siteyi yöneten kişiye gitmelidir. Süresi dolan alan adlarının sonucu için: [Alan adının süresi dolarsa ne olur?](/blog/alan-adi-suresi-dolarsa-ne-olur)",
    },
  ],
  related: [
    "alan-adi-suresi-dolarsa-ne-olur",
    "siteyi-yapan-kisi-sifreleri-vermiyor",
    "dershane-web-sitesi-ne-kadar-tutar",
  ],
};

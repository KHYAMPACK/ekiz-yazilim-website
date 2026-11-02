import type { Post } from "@/lib/blog/types";

export const post: Post = {
  slug: "ssl-sertifikasi-dolarsa-ne-olur",
  title: "SSL sertifikası dolarsa veli ne görür?",
  description:
    "SSL sertifikasının süresi dolunca tarayıcı tam ekran güvenlik uyarısı gösterir. Veli ne görür, neden olur, nasıl kontrol edilir ve kalıcı olarak nasıl önlenir?",
  published: "2026-11-02",
  updated: "2026-11-02",
  readingMinutes: 5,
  answer:
    "Tarayıcı sayfayı açmadan önce tam ekran bir güvenlik uyarısı gösterir (“Bağlantınız gizli değil” gibi). Çoğu ziyaretçi geri döner; site çalışıyor olsa bile veli onu görmez. Çözüm sertifikayı yenilemek ve otomatik yenilemeyi açmaktır. Sertifikalar zamanla kendiliğinden dolduğu için bunu bir kez kurup unutmak yetmez, takip edilmelidir.",
  sections: [
    {
      heading: "Veli ekranda tam olarak ne görür?",
      blocks: [
        {
          type: "p",
          text: "Sertifika süresi dolduğunda tarayıcılar sitenin içeriğini göstermeden önce kırmızı ya da uyarı renkli bir ekran açar. Türkçe tarayıcılarda genellikle “Bağlantınız gizli değil” ya da “Bu site güvenli değil” gibi bir metin çıkar. Ziyaretçiden “Gelişmiş” butonuna basıp devam etmesi beklenir; çoğu bunu yapmaz.",
        },
        {
          type: "p",
          text: "Yani siteniz sağlam çalışıyor olabilir, ama veli ona ulaşamaz. Reklamla, tavsiyeyle ya da Google'dan gelen bir veli de aynı ekranla karşılaşır ve aradığı kurs sizse bir sonrakine gider.",
        },
      ],
    },
    {
      heading: "Neden oluyor?",
      blocks: [
        {
          type: "ul",
          items: [
            "**Süre doldu.** Sertifikaların bir bitiş tarihi vardır ve yenilenmezse geçerliliği biter.",
            "**Otomatik yenileme çalışmadı.** Kurulduğunda çalışıyordu ama sunucu ayarı, ödeme ya da bir güncelleme sonrası durdu.",
            "**Sertifika başka bir adres için alınmış.** Örneğin yalnızca kurumadi.com için alınmış ama www.kurumadi.com için geçerli değil.",
            "**Barındırma yenilenmedi.** Sertifika barındırma ile geliyorsa onun süresi dolunca sertifika da gider.",
          ],
        },
        {
          type: "note",
          title: "Kendi verimiz",
          text: "Ekim 2026'da Ankara'daki 186 kurs sitesini taradık: 11'inde sertifika geçersizdi (4'ünün süresi dolmuştu, 7'sinin sertifikası başka bir adres için alınmıştı) ve 5 sitenin sertifikası 30 gün içinde bitiyordu. Ayrıca 35 sitede http ile açılan adres güvenli adrese yönlenmiyordu. Ayrıntılar: [Ankara kurs siteleri, 2026](/arastirma/ankara-kurs-siteleri-2026).",
        },
      ],
    },
    {
      heading: "Sitenizin sertifikasını nasıl kontrol edersiniz?",
      blocks: [
        {
          type: "ol",
          items: [
            "Sitenizi bir bilgisayarda açın. Adres çubuğunun solundaki kilit (ya da ayar) simgesine tıklayın.",
            "“Bağlantı güvenli” ve sertifika ayrıntılarını açın; **geçerlilik bitiş tarihini** görürsünüz.",
            "Hem **kurumadi.com** hem **www.kurumadi.com** adreslerini ayrı ayrı deneyin.",
            "Ya da ücretsiz [site kontrol aracımıza](/web-sitesi) adresinizi yazın; sertifikanın durumunu, kaç gün kaldığını ve www uyumunu bizim için ölçer.",
          ],
        },
      ],
    },
    {
      heading: "Kalıcı olarak nasıl önlenir?",
      blocks: [
        {
          type: "ol",
          items: [
            "**Otomatik yenileme:** barındırma ya da sertifika sağlayıcısında açık olsun ve düzenli test edilsin.",
            "**Uyarı e-postaları** bir kişinin değil, ekibin ortak adresine gitsin.",
            "**Aylık kontrol:** sertifikanın bitişine 30 günden az kaldıysa neden otomatik yenilenmediğine bakın.",
            "**http'den https'e yönlendirme** ve www/www'suz adreslerin ikisinin de kapsandığını doğrulayın.",
            "**Sorumluluğu netleştirin:** sertifikayı ve yenilemeyi kim takip ediyor? Yazılı olsun.",
          ],
        },
        {
          type: "p",
          text: "Sertifikaların geçerlilik süreleri sektör genelinde zamanla kısalıyor. Bu da elle yenilemenin giderek daha riskli, otomatik yenilemenin ise zorunlu hâle geldiği anlamına gelir. Biz bakım paketimizde sertifika ve yenileme takibini kendi üzerimize alıyoruz.",
        },
      ],
    },
  ],
  faq: [
    {
      q: "Sertifika dolunca Google'dan düşer miyim?",
      a: "Google'ın “süresi doldu diye sıralamayı düşürüyoruz” dediği net bir kural bilmiyoruz. Ama veli sayfayı görmeden geri döndüğü için siteniz işini yapmaz, ve uzun süre uyarı veren bir site arama ve kullanıcı davranışı açısından zarar görebilir.",
    },
    {
      q: "SSL sertifikası ücretli mi?",
      a: "Ücretsiz ve ücretli seçenekler var. Çoğu küçük kurumsal site için ücretsiz, otomatik yenilenen sertifikalar yeterlidir. Önemli olan ücret değil, geçerli ve otomatik yenilenen olmasıdır.",
    },
    {
      q: "Sertifikamın www için de geçerli olduğunu nasıl anlarım?",
      a: "www.kurumadi.com adresini tarayıcıda ayrıca açın. Uyarı çıkıyorsa sertifika bu adres için alınmamıştır. Site kontrol aracımız da bunu ölçer.",
    },
    {
      q: "Bir hafta önce uyarı çıkmıştı, şimdi çıkmıyor. Sorun bitti mi?",
      a: "Bitmiş olabilir ama kaynağını bilmeden rahat etmeyin. Sertifika yenilenmiş ama otomatik yenileme çalışmıyorsa sorun birkaç hafta sonra geri döner. Bitiş tarihine bakın.",
    },
  ],
  related: [
    "alan-adi-suresi-dolarsa-ne-olur",
    "google-haritalar-web-sitesi-butonu-acilmiyor",
    "kurs-web-sitesinde-olmasi-gerekenler",
  ],
};

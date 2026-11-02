import type { Post } from "@/lib/blog/types";

export const post: Post = {
  slug: "google-haritalar-web-sitesi-butonu-acilmiyor",
  title: "Google Haritalar'daki web sitesi butonu açılmıyorsa ne yapmalı?",
  description:
    "Google Haritalar'da kurumunuzun yanındaki web sitesi butonu açılmıyor ya da yanlış yere gidiyor. Nedenleri, nasıl kontrol edeceğiniz ve profilde nasıl düzelteceğiniz.",
  published: "2026-11-02",
  updated: "2026-11-02",
  readingMinutes: 5,
  answer:
    "Butonun gittiği adres Google işletme profilinizde yazılıdır. Adres artık yayında değilse, alan adının süresi dolduysa ya da yanlış bir sayfaya (örneğin e-posta giriş ekranı) gidiyorsa veli hata görür. Önce adresi tarayıcıda kendiniz açın, sonra profilinizdeki web sitesi alanını doğru adresle değiştirin. Değişikliğin görünmesi birkaç gün sürebilir.",
  sections: [
    {
      heading: "Bu buton neden bu kadar önemli?",
      blocks: [
        {
          type: "p",
          text: "Haritadan sizi bulan veli çoğu zaman karar aşamasındadır: yorumlarınızı okumuş, fotoğraflara bakmıştır ve şimdi “web sitesi”ne basar. O an hata görürse ya da alakasız bir sayfayla karşılaşırsa, yorumların kazandırdığı güven yarıda kalır ve veli listedeki bir sonraki kursa geçer.",
        },
        {
          type: "p",
          text: "Üstelik kimse size “butonunuz çalışmıyor” diye haber vermez. Kaybı sessizce yaşarsınız.",
        },
      ],
    },
    {
      heading: "Butonun açılmamasının 4 yaygın nedeni",
      blocks: [
        {
          type: "ol",
          items: [
            "**Alan adının süresi dolmuş ya da kayıtlı değil.** Adres artık hiçbir yerde yayında değildir. ([Alan adı süresi dolarsa ne olur?](/blog/alan-adi-suresi-dolarsa-ne-olur))",
            "**Alan adı bir siteye bağlı değil.** Adres kayıtlı ama barındırmaya yönlendirilmemiş; ziyaretçi park sayfası ya da hata görür.",
            "**Yanlış sayfaya gidiyor.** Örneğin profile yanlışlıkla e-posta giriş adresi ya da barındırma firmasının yönetim paneli yazılmıştır; veli kurumunuzu değil bir giriş ekranını görür.",
            "**Güvenlik uyarısı çıkıyor.** Sertifika dolmuş ya da yalnızca www'sız adres için alınmıştır. ([SSL sertifikası dolarsa ne olur?](/blog/ssl-sertifikasi-dolarsa-ne-olur))",
          ],
        },
        {
          type: "note",
          title: "Kendi verimiz",
          text: "Ankara'daki kurs ve etüt merkezlerinin Google Haritalar kaydında yazan 211 farklı web adresini taradığımızda 25'i bizim bağlantımızdan açılmadı; 21'inde alan adı hiç çözülmedi. Yani veli o butona bastığında muhtemelen aynı hatayı görüyor. Ayrıca listedeki 530 kurumun 213'ünün (yaklaşık %40) profilinde hiç web sitesi adresi yoktu. Ayrıntılar: [Ankara kurs siteleri, 2026](/arastirma/ankara-kurs-siteleri-2026).",
        },
      ],
    },
    {
      heading: "Kendi butonunuzu nasıl kontrol edersiniz?",
      blocks: [
        {
          type: "ol",
          items: [
            "Telefonunuzda Google Haritalar'ı açın ve kurumunuzun adını aratın.",
            "“Web sitesi” butonuna basın ve nereye gittiğine bakın.",
            "Hem wifi'dan hem mobil veriden deneyin; bir başkasının telefonunda da test edin.",
            "Açılan sayfa kurumunuzu gösteriyor mu, uyarı var mı, hızlı açılıyor mu? Hepsine bakın.",
            "Hızlıca bakmak için [ücretsiz site kontrol aracımızı](/web-sitesi) kullanabilirsiniz.",
          ],
        },
      ],
    },
    {
      heading: "Profilde web sitesi adresini nasıl düzeltirsiniz?",
      blocks: [
        {
          type: "p",
          text: "Aşağıdaki adımlar genel akıştır; Google arayüzünü zaman zaman değiştirir, menü adları farklı görünebilir.",
        },
        {
          type: "ol",
          items: [
            "Profili yönettiğiniz Google hesabıyla Google'da kurumunuzun adını aratın.",
            "Profil üzerinde “Profilinizi düzenleyin” ya da benzeri seçeneği açın.",
            "İletişim bilgileri bölümünde **web sitesi** alanını bulun.",
            "Doğru ve çalışan adresi yazın. Mümkünse https ile başlayan adresi yazın.",
            "Kaydedin; değişikliğin Haritalar'da görünmesi genellikle birkaç gün alabilir. Sonra yine telefonunuzdan test edin.",
          ],
        },
        {
          type: "p",
          text: "Çalışan bir siteniz yoksa alanı boş bırakmak, açılmayan bir adres yazmaktan daha iyidir. Yeni bir site hazır olana kadar tek sayfalık basit bir sayfa bile işi görür.",
        },
      ],
    },
  ],
  faq: [
    {
      q: "Profilimi başkası yönetiyorsa ne yaparım?",
      a: "Profili kimin yönettiğini Google hesabından görürsünüz. Eski bir ajans ya da çalışan yönetiyorsa yönetim yetkisini sizin hesabınıza devretmesini isteyin. Mümkün olmuyorsa Google'ın sahiplik talebi yolu vardır; kurumunuzu kanıtlayan belgelerle başvurmanız gerekir.",
    },
    {
      q: "Profilimde web sitesi hiç yok, ekleyebilir miyim?",
      a: "Evet. Çalışan bir siteniz varsa profilinize ekleyin. Yoksa önce basit bir sayfa hazırlayın, sonra adresi ekleyin; açılmayan bir adres eklemekten kaçının.",
    },
    {
      q: "Düzeltme ne zaman görünür?",
      a: "Genellikle birkaç gün içinde. Bazen daha uzun sürebilir. Görünmüyorsa adresin başında https olduğundan ve sitenin gerçekten açıldığından emin olun.",
    },
    {
      q: "Buton açılıyor ama sayfa ağır ve uyarı veriyor, ne yapmalıyım?",
      a: "O zaman asıl sorun sitenin kendisidir: sertifika, hız ya da telefon uyumu. Önce [kontrol listesine](/blog/kurs-web-sitesinde-olmasi-gerekenler) bakın.",
    },
  ],
  related: [
    "alan-adi-suresi-dolarsa-ne-olur",
    "ssl-sertifikasi-dolarsa-ne-olur",
    "etut-merkezi-icin-web-sitesi-gerekli-mi",
  ],
};

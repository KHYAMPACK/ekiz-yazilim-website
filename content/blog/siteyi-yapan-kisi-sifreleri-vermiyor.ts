import type { Post } from "@/lib/blog/types";

export const post: Post = {
  slug: "siteyi-yapan-kisi-sifreleri-vermiyor",
  title: "Siteyi yapan kişi şifreleri vermiyorsa ya da siteyi kapatmakla tehdit ediyorsa ne yapılır?",
  description:
    "Eski siteyi yapan kişi şifreleri vermiyor, ödeme yüzünden siteyi kapatmakla tehdit ediyor. Neyin kimde olduğunu nasıl çıkarırsınız, ilk adımlar ve siteyi nasıl taşırsınız?",
  published: "2026-11-02",
  updated: "2026-11-02",
  readingMinutes: 7,
  answer:
    "Önce neyin kimin elinde olduğunu ayırın: alan adı, barındırma, site dosyaları, e-posta. Alan adı sizin adınızaysa asıl koz sizdedir. Her şeyi yazılı yapın, ödeme anlaşmazlığını teknik konulardan ayrı yürütün ve gerekirse bir avukata danışın. Çoğu zaman en sağlıklı çözüm, siteyi kendi hesaplarınıza taşımaktır.",
  sections: [
    {
      heading: "Önce sakin olun ve neyin kimde olduğunu çıkarın",
      blocks: [
        {
          type: "p",
          text: "Böyle bir durumda panik en pahalı tepkidir. Eski site sahibi ile bir ödeme ya da iş ilişkisi sorunu yaşıyorsanız, ilk iş neyin gerçekten onun elinde olduğunu netleştirmektir. Çünkü çoğu zaman “her şey bende” demesi doğru değildir.",
        },
        {
          type: "table",
          head: ["Parça", "Kimde olabilir", "Nasıl öğrenirsiniz"],
          rows: [
            ["Alan adı", "Sizin hesabınızda ya da yapanın hesabında", "Alan adı sorgulama ile kayıt firmasını bulun; o firmadaki hesaba kimin e-postasıyla girildiğine bakın."],
            ["Barındırma", "Sizin ya da yapanın barındırma hesabı", "Sitenin yayınlandığı firmayı sorun; faturalar kime kesiliyor?"],
            ["Site dosyaları ve veritabanı", "Barındırma hesabında ya da yapanın bilgisayarında", "Yedeğinizin olup olmadığını sorun. Sözleşmede teslim maddesi var mı?"],
            ["E-posta", "Alan adı ya da barındırma ile bağlı", "E-postalarınızın hangi hizmetten çalıştığına bakın."],
            ["Google hesapları", "Profil, Analytics, Search Console", "Her birinde yönetici olarak kimin göründüğüne bakın."],
          ],
        },
        {
          type: "p",
          text: "Alan adı sizin adınıza ise çok şey çözülebilir: siteyi başka bir barındırmaya taşır, adresi yeni siteye bağlarsınız. Alan adı onun adınaysa iş zorlaşır ve hukuki destek önem kazanır ([neden kurumun adına olması gerektiğini yazdık](/blog/alan-adi-kimin-adina-olmali)).",
        },
      ],
    },
    {
      heading: "İlk 48 saatte yapılacaklar",
      blocks: [
        {
          type: "ol",
          items: [
            "**Konuşmaları yazıya dökün.** Telefonla anlaşılan her şeyi mesaj ya da e-postayla teyit edin. Tüm yazışmaları kaydedin.",
            "**Neye ihtiyacınız olduğunu yazın:** alan adı bilgileri, barındırma erişimi, site yedeği, e-posta erişimi. Net ve kısa bir liste.",
            "**Ödeme konusunu ayrı bir başlığa alın.** Teknik teslim ile ödeme anlaşmazlığını karıştırmayın. İkisini karıştırınca pazarlık gücünüz azalır.",
            "**Mevcut siteyi yedekleyin.** Siteyi ziyaretçi gözüyle kaydedebilir (ekran görüntüsü, metin, görseller) ve içeriklerin kendi kopyanızı alabilirsiniz.",
            "**İletişim araçlarını güvenceye alın:** Google işletme profili ve sosyal medya hesaplarının yönetimi sizde mi? Değilse kendi hesabınıza yönetici ekletin.",
            "**Gerekirse bir avukata danışın.** Bu yazı hukuki danışmanlık değildir; sözleşmenizin ve yazışmalarınızın hukuki durumu için bir avukat gerekir.",
          ],
        },
      ],
    },
    {
      heading: "“Siteyi kapatırım” tehdidi ne kadar ciddi?",
      blocks: [
        {
          type: "p",
          text: "Gerçek bir risktir: site barındırma hesabı ya da alan adı onun elindeyse sitenin yayından kalkması mümkündür. Bu yüzden amaç, mümkün olduğunca hızlı biçimde **hiçbir şeyin ona bağlı kalmadığı** bir düzene geçmektir.",
        },
        {
          type: "ul",
          items: [
            "**Siteyi yeni bir barındırmaya taşıyın.** Dosyalar elinizdeyse taşınır; yoksa içerik sizin olduğu için siteyi yeniden kurmak da seçenektir.",
            "**Alan adı sizdeyse adresi yeni siteye yönlendirin.** Böylece eski siteyi kapatmanın bir anlamı kalmaz.",
            "**Alan adı onda ise** hukuki yoldan devir talep edin ve bu arada yeni bir adres planlayın; Google profilini ve e-postaları buna göre hazırlayın.",
            "**Kapanma ihtimaline karşı** yeni sitenin hazır olacağı bir takvim kurun; böylece kesinti kısa kalır.",
          ],
        },
        {
          type: "note",
          title: "Sıralama önemli",
          text: "Kapatma tehdidi geldiğinde önce **siteyi güvene alın**, ödeme ve teknik teslim konularını ise ayrı ayrı yürütün. İkisini birbirine bağlarsanız ödeme baskısı altında kalırsınız.",
        },
      ],
    },
    {
      heading: "Bir daha yaşamamak için",
      blocks: [
        {
          type: "ul",
          items: [
            "Alan adı ve tüm hesaplar **kurumun adına** olsun.",
            "Sözleşmede teslim edilecekler ve ödeme sonrası devir yazılı olsun.",
            "Siteyi yapan kişi ayrılsa bile çalışacak bir **bakım ve devir planı** olsun.",
            "Hesapların yönetici e-postası kurumunuzun ortak adresi olsun, kişisel adres olmasın.",
            "Yılda bir kez **hangi hesabın kimde olduğunu** kontrol edin. Basit bir tablo yeter.",
          ],
        },
      ],
    },
  ],
  faq: [
    {
      q: "Eski site kapanırsa Google'daki yerim kaybolur mu?",
      a: "Site uzun süre kapalı kalırsa Google sayfalarınızı göstermeyi bırakabilir ve veliler sizi bulamaz. Sitenin kısa sürede yeniden yayına girmesi bu riski azaltır. Kesin bir süre söyleyemeyiz.",
    },
    {
      q: "Alan adı onun adınaysa ve vermiyorsa ne yapabilirim?",
      a: "Önce yazılı olarak devir isteyin. Ödeme anlaşmazlığı varsa bunu ayrı yürütün. Sonuç alamazsanız hukuki destek gerekir; yazışmalarınızı ve sözleşmenizi hazır tutun. Bu konuda avukata danışmanız en doğrusudur.",
    },
    {
      q: "E-postalarım da gider mi?",
      a: "E-postanız alan adınızı ya da barındırmayı kullanıyorsa, o parçalar kapanırsa e-postalar da durabilir. Önce e-postaların hangi hizmette çalıştığını öğrenin; önemli olanları yedekleyin.",
    },
    {
      q: "Siteyi sıfırdan yapmak zorunda mıyım?",
      a: "Her zaman değil. Site dosyaları ve veritabanı elinizdeyse taşınabilir. Yoksa içerikler ve görseller sizin olduğu için yeni bir site kurulabilir; süre kapsama bağlıdır.",
    },
  ],
  related: [
    "alan-adi-kimin-adina-olmali",
    "alan-adi-suresi-dolarsa-ne-olur",
    "dershane-web-sitesi-ne-kadar-tutar",
  ],
};

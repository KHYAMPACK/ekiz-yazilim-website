import type { Post } from "@/lib/blog/types";

export const post: Post = {
  slug: "alan-adi-suresi-dolarsa-ne-olur",
  title: "Alan adının süresi dolarsa ne olur?",
  description:
    "Alan adı süresi dolunca site ve e-postalar durur. Ek süre, kurtarma dönemi ve adresin serbest kalıp başkasına geçmesi: aşamalar ve ne yapmanız gerektiği.",
  published: "2026-11-02",
  updated: "2026-11-02",
  readingMinutes: 5,
  answer:
    "Site ve o alan adıyla kullanılan e-postalar durur. .com gibi uzantılarda alan adı genellikle hemen silinmez: önce kayıt firmasında bir ek süre, sonra daha pahalı bir kurtarma dönemi olur; o da biterse adres serbest kalır ve başkası alabilir. Süreler uzantıya ve firmaya göre değişir; süresi dolduysa hemen kayıt firmasıyla görüşün.",
  sections: [
    {
      heading: "Süre dolduğu anda ne durur?",
      blocks: [
        {
          type: "ul",
          items: [
            "**Siteniz:** adresi yazan ziyaretçi bir hata ya da kayıt firmasının park sayfasını görür.",
            "**E-postalarınız:** info@kurumadi.com gibi adresler çalışmaz, gelen e-postalar kaybolabilir.",
            "**Google Haritalar bağlantınız:** profildeki “web sitesi” butonu hata sayfasına gider.",
            "**Reklam ve basılı malzeme:** broşürdeki, tabeladaki, Instagram biyografisindeki adres boşa düşer.",
          ],
        },
        {
          type: "p",
          text: "Veli bunu bir “teknik sorun” olarak değil, kurumun ilgisizliği olarak okur. Üstelik kimse size “siteniz açılmadı” diye haber vermez; sadece başka bir kursa bakar.",
        },
      ],
    },
    {
      heading: "Süre dolduktan sonraki aşamalar",
      blocks: [
        {
          type: "p",
          text: "Aşağıdaki tablo .com gibi yaygın uzantılardaki tipik akışı gösterir. Kesin süreler ve ücretler kayıt firmasına ve uzantıya göre değişir; kendi kayıt firmanızın koşullarına bakın.",
        },
        {
          type: "table",
          head: ["Aşama", "Ne olur", "Ne yapabilirsiniz"],
          rows: [
            ["Süre doldu", "Site ve e-posta durur. Alan adı hâlâ sizin adınıza duruyor.", "Normal yenileme ücretiyle hemen yenilemeniz mümkün olabilir."],
            ["Ek süre (kayıt firmasında)", "Firmaya göre değişen bir dönem. Alan adı genellikle park sayfasına yönlendirilir.", "Yenileme hâlâ mümkün, bazen normal ücretle."],
            ["Kurtarma dönemi", "Alan adı kısıtlıdır. Geri alınabilir ama genellikle ek bir kurtarma ücreti gerekir.", "Kayıt firmasıyla hemen iletişime geçin; bu dönem sınırlıdır."],
            ["Silinme ve serbest kalma", "Kurtarma dönemi de biterse adres kısa süre içinde serbest kalır.", "Başkası alabilir. Geri almak zorlaşır ya da imkânsız olur."],
          ],
        },
        {
          type: "note",
          title: "Kendi gözlemimiz",
          text: "Ekim 2026'daki Ankara taramamızda, süresi dolmuş ve kurtarma döneminde olan bir kurs sitesi gördük. Adresi hâlâ geri alınabilir durumdaydı ama bu dönemin sınırlı olduğunu kurum bilmiyor olabilirdi. Tarama ayrıntıları: [Ankara kurs siteleri, 2026](/arastirma/ankara-kurs-siteleri-2026).",
        },
      ],
    },
    {
      heading: "Süresi dolmadan nasıl önlersiniz?",
      blocks: [
        {
          type: "ol",
          items: [
            "**Otomatik yenilemeyi açın** ve ödemenin yapıldığı kartın geçerlilik tarihini takip edin.",
            "**Bildirimlerin gittiği e-postayı kontrol edin.** Yenileme uyarıları çoğunlukla ajansın ya da eski bir çalışanın adresine gider.",
            "**Takvime hatırlatma koyun:** 60, 30 ve 7 gün kala.",
            "**Alan adının hesabı sizde olsun.** Başkasının hesabında tutulan bir alan adını yenilemek sizin elinizde değildir ([bunu ayrıca yazdık](/blog/alan-adi-kimin-adina-olmali)).",
            "**Bitiş tarihini öğrenin.** Ücretsiz [site kontrol aracımız](/web-sitesi) alan adınızın bitiş tarihini de gösterir (uzantıya göre).",
          ],
        },
      ],
    },
    {
      heading: "Süresi dolmuşsa şimdi ne yapmalısınız?",
      blocks: [
        {
          type: "ol",
          items: [
            "Alan adının kayıtlı olduğu firmayı ve hesabı bulun.",
            "Hesaba girin; alan adının şu anki durumunu (süresi doldu, ek süre, kurtarma) ve ücretini görün.",
            "Yenileyin ya da kurtarma ücretini ödeyin; bunu bekletmeyin, her gün seçenekleri azaltır.",
            "Hesaba giremiyorsanız firmayla yazılı iletişime geçin; alan adının sizin olduğunu gösteren bilgileri hazırlayın.",
            "Yenilemeden sonra sitenin ve e-postaların geri açıldığını kontrol edin; Google profilindeki bağlantıyı da test edin.",
          ],
        },
      ],
    },
  ],
  faq: [
    {
      q: "Alan adı süresi dolunca hemen başkası alabilir mi?",
      a: "Genellikle hayır. Yaygın uzantılarda önce bir ek süre ve kurtarma dönemi vardır. Ama bu dönemler bitince adres serbest kalır; kesin süreleri kayıt firmanız ve uzantınız belirler.",
    },
    {
      q: ".com.tr ya da .tr alan adları da aynı mı?",
      a: "Türkiye uzantıları kendi kayıt sistemiyle çalışır ve süreler, kurallar farklı olabilir. Kendi kayıt firmanızın ve uzantınızın koşullarına bakın; genel kuralı bu uzantılara aynen uygulamayın.",
    },
    {
      q: "Süresi dolan alan adının e-postaları da gider mi?",
      a: "Evet. E-posta adresiniz alan adınızı kullanıyorsa, alan adı durunca e-postalar da durur. Yenilemeden sonra çalışır, ama durduğu sürede gelen e-postalar kaybolmuş olabilir.",
    },
    {
      q: "Sitenin Google'daki sıralaması bundan etkilenir mi?",
      a: "Site durduğu sürece Google sayfalarınıza ulaşamaz ve ziyaretçi sitenizi göremez. Kısa bir kesintide etkisi sınırlı olabilir; uzun süre kapalı kalırsa görünürlüğünüz zarar görebilir. Kesin bir süre veremeyiz.",
    },
  ],
  related: [
    "alan-adi-kimin-adina-olmali",
    "ssl-sertifikasi-dolarsa-ne-olur",
    "google-haritalar-web-sitesi-butonu-acilmiyor",
  ],
};

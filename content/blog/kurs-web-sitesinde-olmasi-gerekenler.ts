import type { Post } from "@/lib/blog/types";

export const post: Post = {
  slug: "kurs-web-sitesinde-olmasi-gerekenler",
  title: "Kurs ve etüt merkezi web sitesinde neler olmalı? 2026 kontrol listesi",
  description:
    "Kurs, dershane ve etüt merkezi web sitesinde olması gereken 10 şey: iletişim, program, ön kayıt, güvenlik, hız ve Google ayarları. Ankara taramamızdaki eksik oranlarıyla.",
  published: "2026-11-02",
  updated: "2026-11-02",
  readingMinutes: 7,
  answer:
    "Veli açısından en az 10 şey: kurum adı ve adres, telefon ve WhatsApp'a tek dokunuş, program ve ders bilgisi, ön kayıt formu, güvenli bağlantı (https), telefonda hızlı açılma, Google'da doğru başlık ve açıklama, harita, öğretmen ve sonuç bilgisi, güncel içerik. Ankara taramamızda sitelerin %58'inde WhatsApp bağlantısı, %59'unda paylaşım görseli yoktu.",
  sections: [
    {
      heading: "Veli sitede ne arıyor?",
      blocks: [
        {
          type: "p",
          text: "Veli genellikle telefonundan, birkaç saniyeliğine bakar. O kısa sürede üç soruya cevap bulmak ister: **Burası ne iş yapıyor? Güvenilir mi? Nasıl ulaşırım?** Aşağıdaki liste bu üç soruyu cevaplayan öğeleri sıralar.",
        },
      ],
    },
    {
      heading: "10 maddelik kontrol listesi",
      blocks: [
        {
          type: "ol",
          items: [
            "**Kurum adı, adres, harita ve çalışma saatleri.** İlk bakışta görünsün.",
            "**Telefon ve WhatsApp'a tek dokunuş.** Numarayı kopyalatmayın; dokununca arasın ya da yazsın.",
            "**Program ve ders bilgisi.** Hangi sınıf, hangi ders, kaç kişilik grup, hangi günler.",
            "**Ön kayıt ya da ön görüşme formu.** Kısa olsun: ad, telefon, sınıf.",
            "**Güvenli bağlantı (https) ve geçerli sertifika.** Tarayıcı uyarısı olmasın.",
            "**Telefonda hızlı açılma.** Birkaç saniyeyi geçmesin.",
            "**Google'da doğru başlık ve açıklama.** Arama sonucunda kurumunuzu anlatan bir cümle çıksın.",
            "**Öğretmen kadrosu ve sonuçlar.** Güveni artıran somut bilgi.",
            "**Paylaşım görseli.** Site WhatsApp'ta paylaşılınca görselli önizleme çıksın.",
            "**Güncel içerik.** Eski yıllar, geçmiş duyurular ve bozuk bağlantılar olmasın.",
          ],
        },
      ],
    },
    {
      heading: "Ankara'daki sitelerde en çok neyin eksik olduğunu gördük?",
      blocks: [
        {
          type: "p",
          text: "Ekim 2026'da Ankara'daki kurs ve etüt merkezlerinin 186 çalışan sitesini taradık (siteler tarayıcı bağlantımızdan açılanlar). Eksiklik “kötü kurum” demek değildir; çoğu kolay düzeltilir. Ama veli açısından fark yaratır.",
        },
        {
          type: "table",
          head: ["Madde", "Eksik olan site", "Oran"],
          rows: [
            ["Paylaşım görseli (og:image)", "110 / 186", "%59"],
            ["WhatsApp bağlantısı", "108 / 186", "%58"],
            ["Dokunup arama bağlantısı", "60 / 186", "%32"],
            ["Google açıklaması (meta description)", "52 / 186", "%28"],
            ["Site haritası", "50 / 186", "%27"],
            ["robots.txt dosyası", "37 / 186", "%20"],
            ["http adresi https'e yönlenmiyor", "35 / 186", "%19"],
            ["Geçersiz sertifika (tarayıcı uyarısı)", "11 / 186", "%6"],
          ],
        },
        {
          type: "p",
          text: "Yöntem ve sınırlar ayrıntılı yazıldı: [Ankara kurs siteleri, 2026 incelemesi](/arastirma/ankara-kurs-siteleri-2026). Hiçbir kurumu ismiyle anmadık.",
        },
      ],
    },
    {
      heading: "Teknik temeller (yapan kişiye sorulacaklar)",
      blocks: [
        {
          type: "ul",
          items: [
            "**Mobil uyum:** site telefon ekranına göre ayarlı mı?",
            "**Hız:** sayfa kaç saniyede açılıyor? Görseller küçültülmüş mü?",
            "**Güvenlik:** sertifika otomatik yenileniyor mu? ([Sertifika dolarsa ne olur?](/blog/ssl-sertifikasi-dolarsa-ne-olur))",
            "**Ölçüm:** kaç veli giriyor, nereden geliyor, formu kaçı dolduruyor? Ölçüm yoksa tanıtımın işe yarayıp yaramadığını bilemezsiniz.",
            "**Yedek ve bakım:** biri sitenize düzenli bakıyor mu?",
          ],
        },
      ],
    },
    {
      heading: "Sitenizi 30 saniyede kontrol edin",
      blocks: [
        {
          type: "p",
          text: "Bu listedeki teknik maddelerin birçoğunu [ücretsiz site kontrol aracımızla](/web-sitesi) ölçebilirsiniz: adresi yazın, velinin karşılaşabileceği sorunları, bunların size ne kaybettirdiğini ve nasıl çözüleceğini görün. Tasarım ve içerik kalitesini ölçemez; onlar için yukarıdaki listeye göre kendiniz bakın.",
        },
      ],
    },
  ],
  faq: [
    {
      q: "Sitede ücret ve fiyat yazmalı mıyım?",
      a: "İki tarafı da var: yazarsanız velinin ön elemesi kolaylaşır ve boş telefonlar azalır; yazmazsanız görüşmeye çekmeniz kolaylaşır ama güvensizlik yaratabilir. Bunu kurumunuzun stratejisine göre karar verin; bir doğru cevap yok.",
    },
    {
      q: "Site kaç sayfa olmalı?",
      a: "Küçük bir merkez için ana sayfa, programlar, hakkımızda ve iletişim ile başlayabilirsiniz. Birden fazla şube ya da program varsa her biri için ayrı sayfa Google'da görünmenizi de kolaylaştırır.",
    },
    {
      q: "Blog ya da haber bölümü gerekli mi?",
      a: "Zorunlu değil. Düzenli güncelleyemeyecekseniz boş bir haber sayfası yerine hiç olmaması daha iyidir. Güncel duyuru ve takvim, eski bir blogdan daha değerlidir.",
    },
    {
      q: "Öğrenci giriş paneli şart mı?",
      a: "Şart değil. Ödev, yoklama ve veli bildirimi için bir öğrenci takip sistemi ayrı bir üründür; siteyle bağlanabilir ama web sitesinin kendisi için ön koşul değildir.",
    },
  ],
  related: [
    "etut-merkezi-icin-web-sitesi-gerekli-mi",
    "ssl-sertifikasi-dolarsa-ne-olur",
    "dershane-web-sitesi-ne-kadar-tutar",
  ],
};

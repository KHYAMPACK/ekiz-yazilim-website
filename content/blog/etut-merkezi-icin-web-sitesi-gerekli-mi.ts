import type { Post } from "@/lib/blog/types";

export const post: Post = {
  slug: "etut-merkezi-icin-web-sitesi-gerekli-mi",
  title: "Etüt merkezi için web sitesi gerekli mi?",
  description:
    "Etüt merkezi, kurs ya da kreş için web sitesi gerekli mi? Veli kararını nerede veriyor, Instagram ve Google profili yetmez mi? Kısa ve açık cevap.",
  published: "2026-11-02",
  updated: "2026-11-02",
  readingMinutes: 6,
  answer:
    "Evet, ama her kurum için aynı nedenle değil. Veli sizi çoğunlukla Google Haritalar'da ya da bir tavsiyeyle bulur, karar vermeden önce de siteye bakar. Site yoksa ya da açılmıyorsa güven yarıda kalır. Instagram ve Google profili tamamlayıcıdır, yerine geçmez: kayıt formu, program, fiyat ve güven bilgisini tek yerde siz yönetirsiniz.",
  sections: [
    {
      heading: "Veli sizi nerede buluyor, kararı nerede veriyor?",
      blocks: [
        {
          type: "p",
          text: "Bir veli yeni bir etüt merkezi ararken genellikle üç yoldan biriyle gelir: bir tanıdığın tavsiyesi, Google Haritalar'da yakın çevredeki kurumlar ya da sosyal medya. Hangisinden gelirse gelsin, bir sonraki adımda büyük olasılıkla kurumu telefonundan araştırır: yorumlara, fotoğraflara ve varsa siteye bakar.",
        },
        {
          type: "p",
          text: "Bu yüzden site, velinin sizi seçtiği an değil, **sizi eleyip eleyemeyeceği an** için önemlidir. Düzgün bir site kararı hızlandırır; açılmayan ya da uyarı veren bir site ise iyi yorumlarınızın kazandırdığı ilgiyi boşa çıkarabilir.",
        },
        {
          type: "note",
          title: "Kendi verimiz",
          text: "Ankara'daki 530 kurs ve etüt merkezinden oluşan listemizde, 213'ünün (yaklaşık %40) Google Haritalar kaydında hiç web sitesi adresi yoktu, 27'si yalnızca sosyal medya sayfası veriyordu. Kayıt boş olsa da kurumun sitesi olabilir; ama veli de aynı boşluğu görür. Ayrıntılar: [Ankara kurs siteleri, 2026 incelemesi](/arastirma/ankara-kurs-siteleri-2026).",
        },
      ],
    },
    {
      heading: "Instagram ve Google işletme profili yetmez mi?",
      blocks: [
        {
          type: "p",
          text: "Yetmez, ama ikisi de gereklidir. Google işletme profili, haritada bulunmanız için vazgeçilmezdir; sitenin görevi o profilin verdiği ilk izlenimi tamamlamaktır. Instagram ise canlılık ve güven gösterir ama arama sonuçlarında ve kayıt sürecinde zayıftır.",
        },
        {
          type: "table",
          head: ["", "Google profili", "Instagram", "Web sitesi"],
          rows: [
            ["Haritada ve aramada çıkar", "Evet", "Çok sınırlı", "Evet, doğru kurulursa"],
            ["Program, ücret ve kayıt koşulunu tek yerde anlatır", "Kısıtlı", "Dağınık", "Evet"],
            ["Ön kayıt formu", "Hayır", "Hayır", "Evet"],
            ["Sunum ve düzeni siz belirlersiniz", "Kısmen", "Hayır (platform belirler)", "Evet"],
            ["Hesap kapanırsa ya da kurallar değişirse", "Platforma bağlı", "Platforma bağlı", "Alan adı sizdeyse sizde kalır"],
          ],
        },
        {
          type: "p",
          text: "Kısacası: profil sizi bulduruyor, site sizi ikna ediyor ve kayıtla bitiriyor. İkisi birbirine bağlı olmalı: profildeki web sitesi butonu açılmıyorsa ikisinin de değeri düşer ([bunu nasıl düzelteceğinizi ayrı yazdık](/blog/google-haritalar-web-sitesi-butonu-acilmiyor)).",
        },
      ],
    },
    {
      heading: "Site güveni nasıl etkiler?",
      blocks: [
        {
          type: "p",
          text: "Veli çocuğunu emanet edeceği bir kurumun düzenli olup olmadığını küçük işaretlerden anlar. Site bu işaretleri tek yerde toplar: adres ve harita, telefon, program, öğretmen kadrosu, sonuçlar ve güncel duyurular. Eksik ya da eski bir site (örneğin altında yıllar önceki bir tarih yazması) ilgisizlik izlenimi verir.",
        },
        {
          type: "p",
          text: "Teknik ayrıntılar da bunun parçasıdır. Aynı incelemede taradığımız 186 sitenin 11'inde tarayıcı güvenlik uyarısı veriyordu. Veli o uyarıyı gördüğünde kurumun ne sunduğunu hiç öğrenemez. Bunun neden olduğunu [SSL sertifikası yazımızda](/blog/ssl-sertifikasi-dolarsa-ne-olur) anlattık.",
        },
      ],
    },
    {
      heading: "Hangi durumda site şart değil?",
      blocks: [
        {
          type: "p",
          text: "Dürüst olalım: çok yeni açılmış, yalnızca tavsiyeyle dolan, tek şubeli ve küçük bir merkezseniz ilk günden büyük bir siteye ihtiyacınız olmayabilir. O durumda şunlar yeterli bir başlangıçtır:",
        },
        {
          type: "ul",
          items: [
            "Eksiksiz bir Google işletme profili: doğru kategori, adres, telefon, çalışma saatleri, fotoğraf ve yorumlara cevap.",
            "Tek sayfalık basit bir site: kurum adı, program, iletişim ve WhatsApp butonu.",
            "Alan adını kendi adınıza almak, böylece site büyüdüğünde adres değişmez.",
          ],
        },
        {
          type: "p",
          text: "Kayıt dönemleri, birden fazla program ya da şube, rakiplerin güçlü siteleri ve reklam bütçesi arttıkça tek sayfalık çözüm yetmemeye başlar.",
        },
      ],
    },
    {
      heading: "Bir etüt merkezi sitesinde en az ne olmalı?",
      blocks: [
        {
          type: "ol",
          items: [
            "Kurum adı, adres, harita ve çalışma saatleri.",
            "Telefon ve WhatsApp'a **tek dokunuşla** ulaşma.",
            "Program ve ders bilgisi: hangi sınıf, hangi ders, kaç kişilik grup.",
            "Ön kayıt ya da ön görüşme formu.",
            "Güvenli bağlantı (https) ve telefonda hızlı açılma.",
            "Google'da doğru görünen başlık ve açıklama.",
          ],
        },
        {
          type: "p",
          text: "Tam kontrol listesi için: [Kurs ve etüt merkezi web sitesinde neler olmalı?](/blog/kurs-web-sitesinde-olmasi-gerekenler)",
        },
      ],
    },
  ],
  faq: [
    {
      q: "Sadece Instagram yeterli mi?",
      a: "Çoğu kurum için yetmez. Instagram canlılık gösterir ama arama sonuçlarında, program ve ücret anlatmada ve ön kayıt toplamada zayıftır. Hesabınızın kuralları ya da erişimi değişirse elinizde bir şey kalmaz. Site ve Google profiliyle birlikte kullanın.",
    },
    {
      q: "Google işletme profilim varsa site gerekli mi?",
      a: "Profil sizi bulduran araçtır; site ise sizi ikna eden ve kaydı toplayan araçtır. İkisi birbirini tamamlar. Profildeki web sitesi butonu çalışan bir siteye gitmelidir.",
    },
    {
      q: "Site yaptırınca kayıt sayım artar mı?",
      a: "Bunu garanti edemeyiz ve garanti eden kişiye dikkat edin. Siteyi doğru kurarız; kayıt sayısını sitenin yanında fiyat, program, reklam ve itibar belirler. Site, o çabaların boşa gitmemesini sağlar.",
    },
    {
      q: "Site ne kadar tutar?",
      a: "Kapsama göre değişir. Rakamları ve nelerin fiyatı etkilediğini ayrı bir yazıda açıkça yazdık: [Dershane ve kurs web sitesi ne kadar tutar?](/blog/dershane-web-sitesi-ne-kadar-tutar)",
    },
  ],
  related: [
    "dershane-web-sitesi-ne-kadar-tutar",
    "kurs-web-sitesinde-olmasi-gerekenler",
    "google-haritalar-web-sitesi-butonu-acilmiyor",
  ],
};

import type { Post } from "@/lib/blog/types";

export const post: Post = {
  slug: "hazir-sablon-mu-ozel-tasarim-mi",
  title: "Hazır şablon mu, özel tasarım mı? Kurs, etüt merkezi ve kreş için hangisi?",
  description:
    "Kurs, etüt merkezi ve kreş sitesi için hazır şablon mu yoksa özel tasarım mı? Fiyat, hız, ayırt edicilik ve bakım açısından ne zaman hangisi mantıklı?",
  published: "2026-11-02",
  updated: "2026-11-02",
  readingMinutes: 6,
  answer:
    "Bütçe çok kısıtlıysa ve ihtiyaç basitse şablon yeterli olabilir. Birden fazla şube ya da program, güçlü rakipler ve reklam yapıyorsanız kuruma özel tasarım sizi ayırt eder ve ön kaydı toplamayı kolaylaştırır. Kritik olan seçimden çok, şablonun hazır metin ve görsellerinin değiştirilmesi, temel Google ayarlarının yapılması ve alan adının sizde olmasıdır.",
  sections: [
    {
      heading: "Fark tam olarak nedir?",
      blocks: [
        {
          type: "table",
          head: ["", "Hazır şablon", "Kuruma özel tasarım"],
          rows: [
            ["Başlangıç", "Var olan bir tasarım uyarlanır", "Kurumunuzun programına ve velisine göre baştan kurgulanır"],
            ["Hız ve fiyat", "Hızlı ve genellikle daha ucuz", "Daha çok emek, daha yüksek fiyat"],
            ["Ayırt edicilik", "Aynı şablonu kullanan başka siteler olabilir", "Sizin kurumunuza özgü"],
            ["Esneklik", "Şablonun izin verdiği kadar", "İhtiyaca göre sayfa ve özellik"],
            ["Kod ve bakım", "Genellikle hazır bir sistem (WordPress gibi) ve eklentileri", "Yapılan işe göre; bakım yazılı kararlaştırılır"],
            ["Riskler", "Hazır metin ve görsellerin değiştirilmemesi, güncellenmeyen eklentiler", "Belirsiz kapsam ve teslim; yazılı teklifle yönetilir"],
          ],
        },
      ],
    },
    {
      heading: "Şablon ne zaman mantıklı?",
      blocks: [
        {
          type: "ul",
          items: [
            "Yeni açıldınız, bütçe sınırlı ve şimdilik tek bir hizmet anlatacaksınız.",
            "Veliler sizi esas olarak tavsiyeyle buluyor; site bir doğrulama ve iletişim sayfası.",
            "Birkaç ay sonra yenileyeceğinizi biliyorsunuz.",
          ],
        },
        {
          type: "p",
          text: "Bu durumda doğru yapılmış temiz bir şablon, kötü yapılmış özel tasarımdan daha iyidir. Önemli olan işin özenle yapılması: hazır metnin silinmesi, kendi fotoğraflarınızın konması, telefon ve WhatsApp butonlarının çalışması.",
        },
      ],
    },
    {
      heading: "Özel tasarım ne zaman fark yaratır?",
      blocks: [
        {
          type: "ul",
          items: [
            "**Birden fazla şube ya da program** var ve veliyi doğru yere yönlendirmeniz gerekiyor.",
            "**Rakipleriniz güçlü** ve aynı mahallede birçok benzer kurum var.",
            "**Reklam ya da kayıt kampanyası** yapıyorsunuz; açılış sayfasının kampanyaya göre kurgulanması gerekiyor.",
            "**Öğrenci takip sistemi, ön kayıt ya da ödeme** gibi bir bağlantı gerekiyor.",
            "**Kurumsal bir imaj** kuruyorsunuz: okul, kolej ya da çok şubeli bir zincir.",
          ],
        },
      ],
    },
    {
      heading: "Seçim ne olursa olsun şunlar şart",
      blocks: [
        {
          type: "ol",
          items: [
            "**Alan adı sizin adınıza** olsun. ([Neden?](/blog/alan-adi-kimin-adina-olmali))",
            "**Hazır metin ve görseller** tamamen değiştirilsin; başka kurumla aynı cümleler kalmasın.",
            "**Google başlığı, açıklaması ve site haritası** yapılsın.",
            "**Sertifika otomatik yenilensin** ve takip edilsin. ([Sertifika dolarsa ne olur?](/blog/ssl-sertifikasi-dolarsa-ne-olur))",
            "**Telefon ve WhatsApp tek dokunuşla** çalışsın, form test edilsin.",
            "**Düzeltme hakkı ve bakım** yazılı olsun.",
          ],
        },
        {
          type: "p",
          text: "Şablon ya da özel olması, bu altı maddenin yerine geçmez. Mevcut sitenizin bunların kaçını sağladığını [ücretsiz kontrol aracımızla](/web-sitesi) hemen görebilirsiniz.",
        },
      ],
    },
  ],
  faq: [
    {
      q: "Şablon site Google'da gerçekten sıralanabilir mi?",
      a: "Evet, şablon olması bir engel değildir. Sorun, hazır metnin olduğu gibi bırakılması ve temel Google ayarlarının eksik kalmasıdır. Bunlar yapılırsa şablon da özel tasarım da aynı fırsatı yakalar.",
    },
    {
      q: "Önce şablonla başlayıp sonra özel tasarıma geçebilir miyim?",
      a: "Evet, ama baştan alan adını kendi adınıza alırsanız ve içerikleriniz sizde durursa geçiş kolay olur. Alan adı yapımcıdaysa geçiş zorlaşır.",
    },
    {
      q: "Özel tasarım her zaman daha mı pahalı?",
      a: "Genellikle evet, çünkü daha çok emek gerektirir. Ama fark yalnızca kurulumda değil, ikinci yıldan sonra bakım ve düzeltme maliyetinde de ortaya çıkar. Fiyatı üç yıllık toplamla karşılaştırın: [Ucuz web sitesi neden pahalıya çıkar?](/blog/ucuz-web-sitesi-neden-pahaliya-cikar)",
    },
  ],
  related: [
    "ucuz-web-sitesi-neden-pahaliya-cikar",
    "dershane-web-sitesi-ne-kadar-tutar",
    "kurs-web-sitesinde-olmasi-gerekenler",
  ],
};

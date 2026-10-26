const faqs = [
  {
    q: "Öğrenci Takip Sistemi Nedir?",
    a: "Müdür, öğretmen, rehber öğretmen ve veliyi aynı uygulamada buluşturan sistem: yoklama, ödev, deneme sınavı, aidat, mesajlaşma ve velilere anlık bildirim. Etüt merkezleri, kreşler ve özel okullar için.",
  },
  {
    q: "Fiyat Nasıl Belirleniyor?",
    a: "Kapsama göre. Önce ihtiyacı netleştirir, sonra sabit veya net aralıklı bir teklif yazarız. Gizli kalem yok.",
  },
  {
    q: "Ne Kadar Sürer?",
    a: "Basit bir tanıtım / landing sitesi genelde kısa sürede çıkar. E-ticaret ve özel yazılım işin büyüklüğüne göre planlanır; süre teklifte yazar.",
  },
  {
    q: "E-Ticarete Sıfırdan Mı Başlıyorsunuz?",
    a: "Evet. Ürün satan işletmeler için online mağaza kuruyoruz: ürün vitrini, sipariş ve ödeme düzeni, ilk yayına net bir yol. Butik ve giyim için ayrı bir sayfamız da var.",
  },
  {
    q: "Hosting Ve Alan Adı Sizde Mi?",
    a: "İsterseniz kurulumunu biz yaparız; hesaplar ve mülkiyet sizde kalır. Nasıl ilerleyeceğimizi baştan konuşuruz.",
  },
  {
    q: "Yayından Sonra Destek Var Mı?",
    a: "Evet. Küçük düzeltmeler ve sorular için yanınızdayız. Daha büyük eklemeler ayrı konuşulur.",
  },
  {
    q: "Başka Şehirlerden Çalışıyor Musunuz?",
    a: "Evet. Ankara merkezliyiz ve Türkiye genelinde uzaktan çalışıyoruz. Görüşme, kurulum ve eğitim online yapılır; Ankara’da isterseniz yüz yüze de görüşebiliriz.",
  },
] as const;

export default function FaqSection() {
  return (
    <section
      id="sss"
      className="border-b border-black bg-ice/30"
      aria-labelledby="sss-title"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="mb-10 max-w-xl">
          <p className="mb-3 text-xs font-medium tracking-[0.2em] uppercase text-black/45">
            SSS
          </p>
          <h2
            id="sss-title"
            className="text-3xl font-medium tracking-tight text-black sm:text-4xl"
          >
            Sık Sorulanlar
          </h2>
        </div>

        <ul className="divide-y divide-black border border-black bg-white">
          {faqs.map((item, i) => (
            <li
              key={item.q}
              className={`grid min-w-0 gap-3 px-5 py-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] sm:gap-10 sm:px-6 ${
                i % 2 === 1 ? "bg-ice/30" : "bg-white"
              }`}
            >
              <h3 className="text-base font-medium tracking-tight text-black sm:text-lg">
                {item.q}
              </h3>
              <p className="min-w-0 text-base leading-relaxed text-black/65">
                {item.a}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

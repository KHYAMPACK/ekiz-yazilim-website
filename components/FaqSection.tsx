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
      className="sc-paper border-t border-sc-border"
      aria-labelledby="sss-title"
    >
      <div className="sc-container sc-section grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <p className="sc-eyebrow mb-4">SSS</p>
          <h2 id="sss-title" className="sc-h2">
            Sık <span className="sc-em">sorulanlar</span>
          </h2>
        </div>

        <div className="divide-y divide-sc-border border-y border-sc-border">
          {faqs.map((item, i) => (
            <details key={item.q} className="group" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left [&::-webkit-details-marker]:hidden">
                <h3 className="sc-serif text-xl leading-snug text-sc-text sm:text-[1.375rem]">
                  {item.q}
                </h3>
                <span
                  className="relative size-6 shrink-0 text-sc-accent-text"
                  aria-hidden
                >
                  <span className="absolute top-1/2 left-1/2 h-px w-4 -translate-x-1/2 bg-current" />
                  <span className="absolute top-1/2 left-1/2 h-4 w-px -translate-y-1/2 bg-current transition-transform duration-300 group-open:scale-y-0" />
                </span>
              </summary>
              <p className="sc-body pr-10 pb-6">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

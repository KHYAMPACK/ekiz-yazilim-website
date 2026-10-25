import Image from "next/image";
import WebReveal from "./WebReveal";

const SIGNALS = [
  {
    label: "Odak",
    value: "Eğitim",
    note: "Okul, kreş ve etüt merkezleri önceliğimiz.",
  },
  {
    label: "Yayında",
    value: "Gerçek siteler",
    note: "Yukarıdaki işler canlı. Yenileri eklenecek.",
  },
  {
    label: "Mülkiyet",
    value: "Sizde",
    note: "Alan adı ve hosting hesapları sizde kalır.",
  },
] as const;

export default function WebTrust() {
  return (
    <section
      className="border-b border-black bg-white"
      aria-labelledby="guven-title"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center">
        <WebReveal>
          <div className="relative mx-auto w-full max-w-sm overflow-hidden border border-black bg-ice/30 lg:mx-0">
            <div className="relative aspect-[3/4]">
              <Image
                src="/founder.jpeg"
                alt="Ekiz Yazılım kurucusu Mert"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 80vw, 320px"
              />
            </div>
          </div>
        </WebReveal>

        <WebReveal delay={0.08}>
          <p className="mb-3 text-xs font-medium tracking-[0.2em] uppercase text-black/45">
            Muhatap
          </p>
          <h2
            id="guven-title"
            className="text-3xl font-medium tracking-tight text-black sm:text-4xl"
          >
            İyi Bir Site Yalnızca Büyük Markaların İşi Değil.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-black/70 sm:text-lg">
            Merhaba, ben Mert. Bilkent CTIS öğrencisiyim; Trendyol ve Insider’da
            staj yaptım. Aynı disiplini şimdi eğitim kurumlarının ve işletmelerin
            siteleri için kullanıyorum: tek muhatap, yazılı teklif ve yayından sonra da
            ulaşılabilir bir iletişim.
          </p>

          <dl className="mt-8 grid gap-0 border border-black sm:grid-cols-3">
            {SIGNALS.map((item, i) => (
              <div
                key={item.label}
                className={`px-5 py-5 ${
                  i > 0 ? "border-t border-black sm:border-t-0 sm:border-l" : ""
                }`}
              >
                <dt className="text-xs font-medium tracking-[0.16em] uppercase text-black/40">
                  {item.label}
                </dt>
                <dd className="mt-2 text-lg font-medium tracking-tight text-black">
                  {item.value}
                </dd>
                <dd className="mt-1 text-sm text-black/55">{item.note}</dd>
              </div>
            ))}
          </dl>
        </WebReveal>
      </div>
    </section>
  );
}

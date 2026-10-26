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
      className="border-y border-sc-border bg-sc-surface"
      aria-labelledby="guven-title"
    >
      <div className="sc-container grid gap-12 py-16 sm:py-24 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-16">
        <WebReveal>
          <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-[28px] border border-sc-border bg-sc-surface-2 shadow-[0_20px_60px_-20px_rgba(229,138,92,0.3)] lg:mx-0">
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
          <p className="sc-eyebrow mb-4">Muhatap</p>
          <h2 id="guven-title" className="sc-h2">
            İyi bir site yalnızca <span className="sc-em">büyük markaların</span>{" "}
            işi değil.
          </h2>
          <p className="sc-lead mt-5">
            Merhaba, ben Mert. Bilkent CTIS öğrencisiyim; Trendyol ve Insider’da
            staj yaptım. Aynı disiplini şimdi eğitim kurumlarının ve işletmelerin
            siteleri için kullanıyorum: tek muhatap, yazılı teklif ve yayından sonra da
            ulaşılabilir bir iletişim.
          </p>

          <dl className="mt-9 grid overflow-hidden rounded-2xl border border-sc-border bg-sc-bg sm:grid-cols-3">
            {SIGNALS.map((item, i) => (
              <div
                key={item.label}
                className={`px-5 py-5 ${
                  i > 0
                    ? "border-t border-sc-border sm:border-t-0 sm:border-l"
                    : ""
                }`}
              >
                <dt className="text-xs font-medium tracking-[0.16em] text-sc-accent-text uppercase">
                  {item.label}
                </dt>
                <dd className="font-display mt-2 text-xl tracking-tight text-sc-text">
                  {item.value}
                </dd>
                <dd className="mt-1 text-sm text-sc-muted">{item.note}</dd>
              </div>
            ))}
          </dl>
        </WebReveal>
      </div>
    </section>
  );
}

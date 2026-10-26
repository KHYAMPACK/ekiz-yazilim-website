import Image from "next/image";

const facts = [
  { label: "Odak", value: "Etüt merkezleri, kreşler ve özel okullar" },
  { label: "Yaklaşım", value: "Baştan sona destek ve tek muhatap" },
  { label: "İlke", value: "Anlaşılır, sürdürülebilir ve işe yarar hizmetler" },
] as const;

export default function FounderSection() {
  return (
    <section
      id="kurucu"
      className="border-t border-sc-border bg-sc-bg"
      aria-labelledby="kurucu-title"
    >
      <div className="sc-container sc-section grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <div className="relative mx-auto w-full min-w-0 max-w-sm lg:mx-0 lg:max-w-none">
          <div
            className="relative w-full overflow-hidden rounded-3xl border border-sc-border bg-sc-surface"
            style={{ aspectRatio: "3 / 4" }}
          >
            <Image
              src="/founder.jpeg"
              alt="Ekiz Yazılım kurucusu Mert"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
              priority={false}
            />
          </div>
          <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <p className="sc-eyebrow">Kurucu</p>
            <a
              href="mailto:ekizmert3@gmail.com"
              className="break-all text-sm text-sc-muted transition-colors hover:text-sc-text"
            >
              ekizmert3@gmail.com
            </a>
          </div>
          <p className="mt-1 text-xs text-sc-muted">Sorularınız için yazın</p>
        </div>

        <div className="flex min-w-0 flex-col justify-center">
          <p className="sc-eyebrow mb-4">Kurucudan</p>
          <h2 id="kurucu-title" className="sc-h2">
            Merhaba, <span className="sc-em">ben Mert.</span>
          </h2>
          <p className="mt-2 text-lg text-sc-muted">Kurucu, Ekiz Yazılım</p>

          <div className="mt-8 space-y-5 text-base leading-relaxed text-sc-muted sm:text-lg">
            <p>
              Bilkent Üniversitesi CTIS (Bilgisayar Teknolojisi ve Bilişim
              Sistemleri) öğrencisiyim. Trendyol ve Insider’da staj yaptım; Halit
              Alptekin, Selçuk Saraç ve Erkan Uçar ile çalışma fırsatı buldum.
              Bu süreçte öğrendiğim disiplin ve yaklaşımı, şimdi eğitim
              kurumları ve işletmeler için kullanıyorum.
            </p>
            <p>
              Hem küçük hem büyük işletmelerle çalışıyorum. İlk web sitesinden
              büyüyen bir markanın dijital ortaklığına kadar anlaşılır ve
              sürdürülebilir çözümler sunuyorum.
            </p>
            <p>
              Yazılımı, günlük işinizi kolaylaştırmak, büyümenizi hızlandırmak ve
              markanızı güçlendirmek için tasarlıyorum. Bu yolculukta sizin
              yanınızda olmak istiyorum.
              <br />
              Dijital tarafı birlikte netleştirelim.
            </p>
            <p className="sc-serif border-l-2 border-sc-accent pl-5 text-2xl leading-snug text-sc-text">
              Güven, işin kalitesi ve yanınızda duran bir muhatapla gelir.
            </p>
          </div>

          <dl className="mt-10 grid gap-4 sm:grid-cols-3">
            {facts.map((fact) => (
              <div key={fact.label} className="sc-card p-5">
                <dt className="sc-eyebrow">{fact.label}</dt>
                <dd className="mt-2 text-[0.9375rem] leading-relaxed text-sc-text">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

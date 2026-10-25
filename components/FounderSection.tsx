import Image from "next/image";

export default function FounderSection() {
  return (
    <section
      id="kurucu"
      className="border-b border-black bg-white"
      aria-labelledby="kurucu-title"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14 lg:py-20">
        <div className="relative mx-auto w-full min-w-0 max-w-sm lg:mx-0 lg:max-w-none">
          <div
            className="relative w-full overflow-hidden border border-black bg-ice/30"
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
          <p className="mt-3 text-xs font-medium tracking-[0.2em] uppercase text-black/45">
            Kurucu
          </p>
          <a
            href="mailto:ekizmert3@gmail.com"
            className="mt-2 block break-all text-sm text-black/70 transition-colors hover:text-black"
          >
            ekizmert3@gmail.com
          </a>
          <p className="mt-1 text-xs text-black/45">Sorularınız için yazın</p>
        </div>

        <div className="flex min-w-0 flex-col justify-center">
          <p className="mb-3 text-xs font-medium tracking-[0.2em] uppercase text-black/45">
            Kurucudan
          </p>
          <h2
            id="kurucu-title"
            className="text-3xl font-medium tracking-tight text-black sm:text-4xl"
          >
            Merhaba, Ben Mert.
          </h2>
          <p className="mt-2 text-lg text-black/55">Kurucu, Ekiz Yazılım</p>

          <div className="mt-8 space-y-4 text-base leading-relaxed text-black/75 sm:text-lg">
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
            Yazılımı, günlük işinizi kolaylaştırmak, büyümenizi hızlandırmak ve markanızı güçlendirmek için tasarlıyorum.
              Bu yolculukta sizin yanınızda olmak istiyorum.<br/>
              Dijital tarafı birlikte netleştirelim.
            </p>
            <p className="border-l-2 border-ice pl-4 text-black">
              Güven, işin kalitesi ve yanınızda duran bir muhatapla gelir.
            </p>
          </div>

          <dl className="mt-10 grid gap-6 border-t border-black pt-8 sm:grid-cols-3">
            <div>
              <dt className="text-xs font-medium tracking-[0.2em] uppercase text-black/45">
                Odak
              </dt>
              <dd className="mt-2 text-base text-black">
                Etüt merkezleri, kreşler ve özel okullar
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium tracking-[0.2em] uppercase text-black/45">
                Yaklaşım
              </dt>
              <dd className="mt-2 text-base text-black">
                Baştan sona destek ve tek muhatap
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium tracking-[0.2em] uppercase text-black/45">
                İlke
              </dt>
              <dd className="mt-2 text-base text-black">
                Anlaşılır, sürdürülebilir ve işe yarar hizmetler
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}

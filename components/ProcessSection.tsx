export default function ProcessSection() {
  const steps = [
    {
      n: "01",
      title: "1. Aşama: Keşif",
      body: "İhtiyacı netleştiririz — kısa bir görüşmeyle ve mevcut siteniz varsa kısa bir site raporuyla başlarız.",
    },
    {
      n: "02",
      title: "2. Aşama: Teklif",
      body: "Kapsam, süre ve fiyatı belirleriz; rapor varsa öncelikler netleşir.",
    },
    {
      n: "03",
      title: "3. Aşama: Geliştirme Ve Yayın",
      body: "Tasarım, geliştirme, yayına alma ve sonrası için destek.",
    },
  ] as const;

  return (
    <section
      id="surec"
      className="border-b border-black bg-black text-white"
      aria-labelledby="surec-title"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="mb-10 max-w-xl">
          <p className="mb-3 text-xs font-medium tracking-[0.2em] uppercase text-ice">
            Süreç
          </p>
          <h2
            id="surec-title"
            className="text-3xl font-medium tracking-tight text-white sm:text-4xl"
          >
            Nasıl Çalışırız?
          </h2>
          <p className="mt-3 text-base text-white/65">
            
          </p>
        </div>

        <ol className="grid gap-0 border border-white/25 sm:grid-cols-3">
          {steps.map((step, i) => (
            <li
              key={step.n}
              className={`flex min-w-0 flex-col gap-3 p-5 sm:p-6 ${
                i < steps.length - 1
                  ? "border-b border-white/25 sm:border-b-0 sm:border-r"
                  : ""
              }`}
            >
              <span className="text-xs font-medium tracking-[0.2em] text-ice">
                {step.n}
              </span>
              <h3 className="text-xl font-medium tracking-tight text-white">
                {step.title}
              </h3>
              <p className="text-base leading-relaxed text-white/65">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default function ProcessSection() {
  const steps = [
    {
      n: "01",
      title: "Keşif",
      label: "1. Aşama",
      body: "İhtiyacı netleştiririz — kısa bir görüşmeyle ve mevcut siteniz varsa kısa bir site raporuyla başlarız.",
    },
    {
      n: "02",
      title: "Teklif",
      label: "2. Aşama",
      body: "Kapsam, süre ve fiyatı belirleriz; rapor varsa öncelikler netleşir.",
    },
    {
      n: "03",
      title: "Geliştirme ve yayın",
      label: "3. Aşama",
      body: "Tasarım, geliştirme, yayına alma ve sonrası için destek.",
    },
  ] as const;

  return (
    <section
      id="surec"
      className="relative overflow-hidden border-t border-sc-border bg-sc-bg"
      aria-labelledby="surec-title"
    >
      <div className="sc-glow pointer-events-none absolute inset-x-0 top-0 h-80 opacity-60" />
      <div className="sc-container sc-section relative">
        <div className="mb-12 max-w-2xl">
          <p className="sc-eyebrow mb-4">Süreç</p>
          <h2 id="surec-title" className="sc-h2">
            Nasıl <span className="sc-em">çalışırız?</span>
          </h2>
        </div>

        <ol className="grid gap-4 sm:grid-cols-3">
          {steps.map((step) => (
            <li
              key={step.n}
              className="sc-card flex min-w-0 flex-col gap-4 p-6 sm:p-7"
            >
              <span className="sc-serif text-5xl leading-none text-sc-accent">
                {step.n}
              </span>
              <div>
                <p className="text-xs font-medium tracking-[0.16em] text-sc-muted uppercase">
                  {step.label}
                </p>
                <h3 className="sc-h3 mt-2">{step.title}</h3>
              </div>
              <p className="sc-body">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

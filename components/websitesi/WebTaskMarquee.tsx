import { TASKS_A, TASKS_B } from "@/lib/websitesi";

function Row({
  items,
  reverse,
}: {
  items: readonly string[];
  reverse?: boolean;
}) {
  return (
    <div className="web-marquee overflow-hidden">
      <div
        className={`web-marquee__track py-4 sm:py-5 ${reverse ? "web-marquee__track--reverse" : ""}`}
      >
        {[0, 1].map((copy) => (
          <p
            key={copy}
            className="font-display flex items-center text-xl tracking-tight text-sc-text sm:text-3xl"
            aria-hidden={copy === 1}
          >
            {items.map((item) => (
              <span key={`${copy}-${item}`} className="flex items-center">
                <span className="px-4 whitespace-nowrap sm:px-6">{item}</span>
                <span className="text-sc-accent" aria-hidden>
                  ✦
                </span>
              </span>
            ))}
          </p>
        ))}
      </div>
    </div>
  );
}

export default function WebTaskMarquee() {
  return (
    <section
      className="border-y border-sc-border bg-sc-surface"
      aria-label="Yayına alırken üstlendiğimiz işler"
    >
      <div className="sc-container pt-14 pb-8 sm:pt-16">
        <p className="sc-eyebrow">Kapsam</p>
        <h2 className="sc-h2 mt-3 max-w-xl !text-[clamp(1.75rem,3.4vw,2.5rem)]">
          Yayına alırken gereken işleri{" "}
          <span className="sc-em">biz tamamlarız.</span>
        </h2>
      </div>
      <div className="border-t border-sc-border">
        <Row items={TASKS_A} />
      </div>
      <div className="border-t border-sc-border">
        <Row items={TASKS_B} reverse />
      </div>
    </section>
  );
}

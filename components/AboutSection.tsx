import Link from "next/link";

function DemoFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="w-full min-w-0 overflow-hidden border border-black bg-white text-black"
      style={{ aspectRatio: "10 / 7" }}
    >
      <svg
        viewBox="0 0 200 140"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        className="block h-full w-full max-w-full"
        aria-hidden="true"
      >
        {children}
      </svg>
    </div>
  );
}

function DemoLanding() {
  return (
    <DemoFrame>
      <rect x="8" y="8" width="184" height="124" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <line x1="8" y1="28" x2="192" y2="28" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="18" cy="18" r="3" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="30" cy="18" r="3" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="42" cy="18" r="3" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <rect x="20" y="40" width="160" height="48" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <line x1="36" y1="56" x2="100" y2="56" stroke="currentColor" strokeWidth="1.2" />
      <line x1="36" y1="66" x2="84" y2="66" stroke="currentColor" strokeWidth="1.2" />
      <rect x="36" y="74" width="36" height="8" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <rect x="20" y="98" width="48" height="22" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <rect x="76" y="98" width="48" height="22" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <rect x="132" y="98" width="48" height="22" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </DemoFrame>
  );
}

function DemoEcommerce() {
  return (
    <DemoFrame>
      <rect x="8" y="8" width="184" height="124" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <line x1="8" y1="28" x2="192" y2="28" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="18" cy="18" r="3" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="30" cy="18" r="3" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="42" cy="18" r="3" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <rect x="150" y="14" width="28" height="8" fill="none" stroke="currentColor" strokeWidth="1.2" />
      {[0, 1, 2].map((i) => {
        const x = 20 + i * 56;
        return (
          <g key={i}>
            <rect
              x={x}
              y="40"
              width="48"
              height="52"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <line
              x1={x + 8}
              y1="100"
              x2={x + 40}
              y2="100"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <line
              x1={x + 8}
              y1="108"
              x2={x + 32}
              y2="108"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <rect
              x={x + 8}
              y="114"
              width="32"
              height="10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            />
          </g>
        );
      })}
    </DemoFrame>
  );
}

function DemoSoftware() {
  return (
    <DemoFrame>
      <rect x="8" y="8" width="184" height="124" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <rect x="8" y="8" width="44" height="124" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <line x1="16" y1="28" x2="44" y2="28" stroke="currentColor" strokeWidth="1.2" />
      <line x1="16" y1="40" x2="40" y2="40" stroke="currentColor" strokeWidth="1.2" />
      <line x1="16" y1="52" x2="42" y2="52" stroke="currentColor" strokeWidth="1.2" />
      <line x1="16" y1="64" x2="36" y2="64" stroke="currentColor" strokeWidth="1.2" />
      <rect x="64" y="20" width="112" height="28" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <rect x="64" y="56" width="52" height="64" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <rect x="124" y="56" width="52" height="28" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <rect x="124" y="92" width="52" height="28" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <line x1="76" y1="108" x2="76" y2="88" stroke="currentColor" strokeWidth="3" />
      <line x1="88" y1="108" x2="88" y2="72" stroke="currentColor" strokeWidth="3" />
      <line x1="100" y1="108" x2="100" y2="80" stroke="currentColor" strokeWidth="3" />
    </DemoFrame>
  );
}

const services = [
  {
    title: "Öğrenci Takip Sistemi",
    body: "Ödev, yoklama, deneme sınavı, aidat ve veli bildirimi tek uygulamada.",
    cta: "Sistemi Gör",
    href: "/egitim",
    Demo: DemoSoftware,
  },
  {
    title: "Web Sitesi / Landing",
    body: "Ne sattığınızı veya ne yaptığınızı net anlatan sayfalar.",
    cta: "Site İste",
    href: "/web-sitesi",
    Demo: DemoLanding,
  },
  {
    title: "E-Ticaret",
    body: "Ürün satışı ve kendi markanızla online vitrin.",
    cta: "E-Ticaret Başlat",
    href: "/e-ticaret",
    Demo: DemoEcommerce,
  },
] as const;

export default function AboutSection() {
  return (
    <section
      id="hakkimizda"
      className="border-b border-black bg-white"
      aria-labelledby="hakkimizda-title"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="grid min-w-0 gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-14">
          <div>
            <p className="mb-3 text-xs font-medium tracking-[0.2em] uppercase text-black/45">
              Hakkımızda
            </p>
            <h2
              id="hakkimizda-title"
              className="text-3xl font-medium tracking-tight text-black sm:text-4xl"
            >
              Etüt Merkezleri, Kreşler Ve Özel Okullar İçin Dijital Altyapı.
            </h2>
          </div>
          <div className="space-y-4 text-base leading-relaxed text-black/80 sm:text-lg">
            <p>
              Ekiz Yazılım olarak odak noktamız eğitim kurumları: etüt merkezleri,
              kreşler ve özel okullar. Öğrenci takip sistemini ve kurumsal web
              sitesini aynı yerden, tek muhatapla kuruyoruz.
            </p>
            <p>
              Ödev, yoklama, deneme sınavı ve aidat takibinden velilere anlık
              bildirime kadar günlük işleyişi tek uygulamada topluyoruz. Ürün
              satan işletmeler için e-ticaret ve ihtiyaca özel yazılımlar da yapıyoruz.
            </p>
            <p className="border-l-2 border-ice bg-ice/25 py-2 pl-4 text-black">
              Siz işinize bakın. Dijital tarafını biz hallederiz.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-0 border border-black sm:mt-14 sm:grid-cols-3">
          <div className="border-b border-black sm:border-b-0 sm:border-r">
            <p className="border-b border-black bg-ice/50 px-6 py-3 text-xs font-medium tracking-[0.2em] uppercase text-black">
              Kime?
            </p>
            <p className="p-6 text-base leading-relaxed text-black/80">
              Öğrenci takibini defter, Excel ve WhatsApp grupları ile yürüten
              etüt merkezleri, kreşler ve özel okullar. Butik ve yerel markalar
              için online mağaza da kuruyoruz.
            </p>
          </div>
          <div className="border-b border-black sm:border-b-0 sm:border-r">
            <p className="border-b border-black bg-ice/50 px-6 py-3 text-xs font-medium tracking-[0.2em] uppercase text-black">
              Nasıl?
            </p>
            <p className="p-6 text-base leading-relaxed text-black/80">
              Keşiften yayına kadar olan süreçte ihtiyaç, tasarım, geliştirme, yayına alma
              ve sonrası için hizmet veriyoruz.
               Tek muhatap, net süreç.
            </p>
          </div>
          <div>
            <p className="border-b border-black bg-ice/50 px-6 py-3 text-xs font-medium tracking-[0.2em] uppercase text-black">
              Nerede?
            </p>
            <p className="p-6 text-base leading-relaxed text-black/80">
              Merkezimiz Denizli; Türkiye genelinde uzaktan çalışıyoruz.
              Görüşme, kurulum ve eğitim online yapılır.
            </p>
          </div>
        </div>

        <div className="mt-12 sm:mt-14">
          <p className="mb-6 text-xs font-medium tracking-[0.2em] uppercase text-black/45">
          Ne Yapıyoruz?
          </p>
          <ul className="grid gap-px border border-black bg-black sm:grid-cols-3">
            {services.map(({ title, body, cta, href, Demo }) => (
              <li
                key={title}
                className="flex min-w-0 flex-col bg-white p-6 text-black"
              >
                <h3 className="text-lg font-medium tracking-tight text-black">
                  {title}
                </h3>
                <p className="mt-2 min-h-14 flex-1 text-base leading-relaxed text-black/65">
                  {body}
                </p>
                <Link
                  href={href}
                  className="mt-5 inline-flex w-full items-center justify-center border border-black bg-black px-4 py-3 text-sm font-medium tracking-wide text-white transition-colors hover:bg-white hover:text-black"
                >
                  {cta}
                </Link>
                <div className="mt-5">
                  <Demo />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

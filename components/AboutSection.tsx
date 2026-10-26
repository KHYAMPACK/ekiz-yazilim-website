import Link from "next/link";

function DemoFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="w-full min-w-0 overflow-hidden rounded-2xl border border-sc-border bg-sc-bg text-sc-accent"
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
      <rect x="8" y="8" width="184" height="124" rx="8" fill="none" stroke="currentColor" strokeWidth="1.3" opacity="0.55" />
      <line x1="8" y1="28" x2="192" y2="28" stroke="currentColor" strokeWidth="1.3" opacity="0.55" />
      <circle cx="18" cy="18" r="3" fill="currentColor" />
      <circle cx="30" cy="18" r="3" fill="currentColor" opacity="0.5" />
      <circle cx="42" cy="18" r="3" fill="currentColor" opacity="0.25" />
      <rect x="20" y="40" width="160" height="48" rx="6" fill="currentColor" opacity="0.1" />
      <line x1="36" y1="56" x2="100" y2="56" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="36" y1="66" x2="84" y2="66" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.6" />
      <rect x="36" y="74" width="36" height="8" rx="4" fill="currentColor" />
      <rect x="20" y="98" width="48" height="22" rx="5" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.55" />
      <rect x="76" y="98" width="48" height="22" rx="5" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.55" />
      <rect x="132" y="98" width="48" height="22" rx="5" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.55" />
    </DemoFrame>
  );
}

function DemoSoftware() {
  return (
    <DemoFrame>
      <rect x="8" y="8" width="184" height="124" rx="8" fill="none" stroke="currentColor" strokeWidth="1.3" opacity="0.55" />
      <rect x="8" y="8" width="44" height="124" rx="8" fill="currentColor" opacity="0.1" />
      <line x1="16" y1="28" x2="44" y2="28" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="16" y1="40" x2="40" y2="40" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.55" />
      <line x1="16" y1="52" x2="42" y2="52" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.55" />
      <line x1="16" y1="64" x2="36" y2="64" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.55" />
      <rect x="64" y="20" width="112" height="28" rx="6" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.55" />
      <rect x="64" y="56" width="52" height="64" rx="6" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.55" />
      <rect x="124" y="56" width="52" height="28" rx="6" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.55" />
      <rect x="124" y="92" width="52" height="28" rx="6" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.55" />
      <line x1="76" y1="108" x2="76" y2="88" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity="0.45" />
      <line x1="88" y1="108" x2="88" y2="72" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity="0.45" />
      <line x1="100" y1="108" x2="100" y2="80" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
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
] as const;

const facts = [
  {
    label: "Kime?",
    body: "Öğrenci takibini defter, Excel ve WhatsApp grupları ile yürüten etüt merkezleri, kreşler ve özel okullar. Butik ve yerel markalar için online mağaza da kuruyoruz.",
  },
  {
    label: "Nasıl?",
    body: "Keşiften yayına kadar olan süreçte ihtiyaç, tasarım, geliştirme, yayına alma ve sonrası için hizmet veriyoruz. Tek muhatap, net süreç.",
  },
  {
    label: "Nerede?",
    body: "Merkezimiz Ankara; Türkiye genelinde uzaktan çalışıyoruz. Görüşme, kurulum ve eğitim online yapılır; Ankara’da yüz yüze de görüşebiliriz.",
  },
] as const;

export default function AboutSection() {
  return (
    <section
      id="hakkimizda"
      className="border-t border-sc-border bg-sc-bg"
      aria-labelledby="hakkimizda-title"
    >
      <div className="sc-container sc-section">
        <div className="grid min-w-0 gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div>
            <p className="sc-eyebrow mb-4">Hakkımızda</p>
            <h2 id="hakkimizda-title" className="sc-h2">
              Etüt merkezleri, kreşler ve özel okullar için{" "}
              <span className="sc-em">dijital altyapı.</span>
            </h2>
          </div>
          <div className="space-y-5 lg:pt-10">
            <p className="sc-lead">
              Ekiz Yazılım olarak odak noktamız eğitim kurumları: etüt merkezleri,
              kreşler ve özel okullar. Öğrenci takip sistemini ve kurumsal web
              sitesini aynı yerden, tek muhatapla kuruyoruz.
            </p>
            <p className="sc-lead">
              Ödev, yoklama, deneme sınavı ve aidat takibinden velilere anlık
              bildirime kadar günlük işleyişi tek uygulamada topluyoruz. Ürün
              satan işletmeler için e-ticaret ve ihtiyaca özel yazılımlar da
              yapıyoruz.
            </p>
            <p className="sc-serif border-l-2 border-sc-accent pl-5 text-2xl leading-snug text-sc-text">
              Siz işinize bakın. Dijital tarafını biz hallederiz.
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-4 sm:mt-16 sm:grid-cols-3">
          {facts.map((fact) => (
            <div key={fact.label} className="sc-card p-6 sm:p-7">
              <p className="sc-eyebrow">{fact.label}</p>
              <p className="sc-body mt-3">{fact.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 sm:mt-20">
          <p className="sc-eyebrow mb-6">Ne yapıyoruz?</p>
          <ul className="grid gap-4 sm:grid-cols-2">
            {services.map(({ title, body, cta, href, Demo }) => (
              <li
                key={title}
                className="sc-card flex min-w-0 flex-col p-5 sm:p-6"
              >
                <Demo />
                <h3 className="sc-h3 mt-6">{title}</h3>
                <p className="sc-body mt-2 flex-1">{body}</p>
                <Link
                  href={href}
                  className="sc-btn sc-btn--secondary mt-6 w-full"
                >
                  {cta} <span aria-hidden>→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

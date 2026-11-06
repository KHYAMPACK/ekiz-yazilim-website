import type { Metadata } from "next";
import Link from "next/link";
import ScLogo from "@/components/ScLogo";
import { seo } from "@/lib/seo";
import { site } from "@/lib/site";
import { UPWORK_PATH, UPWORK_URL } from "@/lib/upwork";

const pageUrl = `${seo.siteUrl}${UPWORK_PATH}`;
const title = "Web apps, online stores and school software, built end to end";
const description =
  "Ekiz Yazılım is a small software studio in Ankara. We build web apps, e-commerce platforms, business websites and school management software with Next.js, TypeScript and Supabase.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: UPWORK_PATH },
  openGraph: {
    title,
    description,
    url: pageUrl,
    siteName: site.name,
    locale: "en_US",
    type: "website",
  },
};

const SERVICES = [
  {
    title: "Web apps and internal tools",
    body: "Dashboards, admin panels and workflow tools with role-based access, sign-in with a second step, and data that stays consistent.",
  },
  {
    title: "E-commerce",
    body: "Online stores and multi-store platforms: product and stock management, payments, shipping, orders and reports.",
  },
  {
    title: "Business websites",
    body: "Fast, search-friendly sites that read well on a phone: clear pages, contact and enquiry forms, and the technical SEO done properly.",
  },
  {
    title: "School and education software",
    body: "Student tracking, parent notifications, exam analysis and fee tracking, delivered as an installable web app.",
  },
] as const;

const WORK = [
  {
    name: "Agile Auto Parts storefront",
    kind: "E-commerce development and SEO",
    body: "A US auto-parts store rebuilt around one question: will it fit my car? A custom storefront theme with a remembered vehicle picker, our own fitment search on Supabase instead of a paid app, 118 generated landing pages, structured data and a sticky buy bar on phones. Every change shipped as a tagged, reversible build to the live store.",
    stack: ["BigCommerce Stencil", "Handlebars", "Supabase", "Klaviyo", "Search Console", "GA4"],
    href: "https://agileautoparts.com",
  },
  {
    name: "Scholares",
    kind: "School management app (PWA), multi-tenant",
    body: "One installable web app for the director, the teacher and the parent: attendance, exam analysis and parent communication. Each school gets its own branding, feature flags and domain, every table is scoped per school and protected with Postgres row-level security, and parents get weekly summaries and push notifications. In production at a private school in Denizli.",
    stack: ["React 19", "Vite", "Supabase", "Postgres RLS", "Web Push", "Vercel Cron"],
    href: "https://scholares.site",
  },
  {
    name: "Cortisstyle",
    kind: "Multi-store e-commerce platform",
    body: "One codebase where each boutique gets its own storefront, domain, admin panel, payments and shipping. Includes stock, orders, invoices, discounts, reports and an AI-assisted product catalog pipeline.",
    stack: ["Next.js", "TypeScript", "Supabase", "iyzico", "Web Push"],
    href: "https://www.cortisstyle.com",
  },
  {
    name: "Agile Auto Parts product panel",
    kind: "Private team panel",
    body: "A custom panel for managing a master product catalog. Accounts are created by an admin, and sign-in needs a six-digit code from the user's phone. Access is by invitation, so there is no public link.",
    stack: ["Next.js", "Vercel"],
  },
  {
    name: "Atlas Education Institute",
    kind: "Business website with enquiry flow",
    body: "A site for a test-preparation school: programme pages, pre-registration forms, sticky call and WhatsApp buttons, structured data and a sitemap.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP"],
    href: "https://www.atlasegitimkurumu.com",
  },
  {
    name: "Matemageist",
    kind: "Education website",
    body: "A maths education site with sections for each school year, a blog, course packages, student coaching and a student sign-in area.",
    stack: ["Next.js", "Vercel"],
    href: "https://matemageist.study",
  },
] as const;

const STEPS = [
  {
    n: "1",
    title: "Tell us what you need",
    body: "Send a short brief or book a call. We ask the questions that decide the scope: who uses it, what it must do on day one, and what can wait.",
  },
  {
    n: "2",
    title: "Scope and price in writing",
    body: "You get a written scope and a price before any work starts, so you know what you are buying and what is left for later.",
  },
  {
    n: "3",
    title: "Build with regular demos",
    body: "You see working software as it grows, not a big reveal at the end. Changes beyond the agreed scope are quoted separately.",
  },
  {
    n: "4",
    title: "Launch and hand over",
    body: "We deploy it, set up backups, and hand over the accounts. Your domain stays registered to you.",
  },
] as const;

const STACK = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Supabase",
  "PostgreSQL",
  "Node.js",
  "Vercel",
  "Web Push",
  "PWA",
  "GitHub Actions",
] as const;

const FAQ = [
  {
    q: "Who will I work with?",
    a: "The founder, Mert Ekiz, runs every project from the first call to launch. You talk to the person writing the code.",
  },
  {
    q: "What time zone and languages?",
    a: "We are in Ankara, Turkey (UTC+3, all year). We work in English and Turkish.",
  },
  {
    q: "How do contracts and payments work?",
    a: "Through Upwork. The scope and price are agreed in writing first.",
  },
  {
    q: "Can you take over or fix an existing project?",
    a: "Yes, if the code is in a state we can work with. We start with a short review and tell you honestly what we find before quoting.",
  },
  {
    q: "Do you offer support after launch?",
    a: "Yes. Ongoing maintenance, fixes and updates are available as a separate monthly arrangement.",
  },
] as const;

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${pageUrl}#service`,
        name: site.name,
        url: pageUrl,
        description,
        email: site.email,
        areaServed: "Worldwide",
        address: { "@type": "PostalAddress", addressLocality: site.city, addressCountry: "TR" },
        knowsAbout: ["Web application development", "E-commerce", "Next.js", "Supabase", "School management software"],
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQ.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };
}

const mailto = `mailto:${site.email}?subject=${encodeURIComponent("Project enquiry (from Upwork page)")}`;

function HireButton({ className = "" }: { className?: string }) {
  if (UPWORK_URL) {
    return (
      <a
        href={UPWORK_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`sc-btn sc-btn--primary ${className}`}
      >
        Hire us on Upwork
      </a>
    );
  }
  return (
    <a href={mailto} className={`sc-btn sc-btn--primary ${className}`}>
      Email us about your project
    </a>
  );
}

export default function UpworkPage() {
  return (
    <div className="sc-root" lang="en">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
      />

      <header className="sticky top-0 z-50 border-b border-sc-border bg-[#121211]/90 backdrop-blur-md">
        <div className="sc-container flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center" aria-label="Ekiz Yazılım home">
            <ScLogo size={34} />
          </Link>
          <HireButton className="!min-h-10 !px-4 !text-sm" />
        </div>
      </header>

      <main>
        <section className="sc-glow relative overflow-hidden">
          <div className="sc-container py-16 sm:py-24">
            <div className="max-w-3xl">
              <p className="sc-eyebrow mb-5">Software studio · Ankara, Turkey</p>
              <h1 className="sc-h1 !text-[clamp(2.4rem,6.5vw,4.2rem)]">
                Web apps, online stores and school software, <span className="sc-em">built end to end</span>
              </h1>
              <p className="sc-lead mt-7 max-w-2xl">
                We are a small studio that takes a project from the first call to a live, maintained
                product. You work directly with the founder, you get the scope and price in writing
                before we start.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <HireButton />
                <a href="#work" className="sc-btn sc-btn--ghost">
                  See our work
                </a>
              </div>
              <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-2 text-sm text-sc-muted">
                <li>Next.js · TypeScript · Supabase</li>
                <li>Written scope and price</li>
                <li>English and Turkish</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="sc-section" aria-labelledby="services-title">
          <div className="sc-container">
            <p className="sc-eyebrow mb-4">What we build</p>
            <h2 id="services-title" className="sc-h2">
              Four things we do <span className="sc-em">well</span>
            </h2>
            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {SERVICES.map((item) => (
                <div key={item.title} className="sc-card p-6">
                  <h3 className="sc-h3">{item.title}</h3>
                  <p className="sc-body mt-2">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="work" className="sc-section border-t border-sc-border" aria-labelledby="work-title">
          <div className="sc-container">
            <p className="sc-eyebrow mb-4">Selected work</p>
            <h2 id="work-title" className="sc-h2">
              Projects that are <span className="sc-em">live</span>
            </h2>
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {WORK.map((item) => (
                <article key={item.name} className="sc-card flex flex-col p-6 sm:p-7">
                  <p className="text-xs font-medium tracking-[0.16em] text-sc-muted uppercase">
                    {item.kind}
                  </p>
                  <h3 className="sc-h3 mt-3">{item.name}</h3>
                  <p className="sc-body mt-3">{item.body}</p>
                  <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
                    {item.stack.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-full border border-sc-border px-2.5 py-0.5 text-xs text-sc-muted"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                  {"href" in item ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sc-btn sc-btn--ghost mt-6 self-start !min-h-10"
                    >
                      Visit the live site
                    </a>
                  ) : (
                    <p className="mt-6 text-sm text-sc-muted">Private system, no public link.</p>
                  )}
                </article>
              ))}
            </div>
            <p className="mt-8 text-sm text-sc-muted">
              More in the{" "}
              <Link href="/isler" className="text-sc-text underline underline-offset-4">
                full project list
              </Link>{" "}
              (in Turkish).
            </p>
          </div>
        </section>

        <section className="sc-section border-t border-sc-border" aria-labelledby="steps-title">
          <div className="sc-container">
            <p className="sc-eyebrow mb-4">How it works</p>
            <h2 id="steps-title" className="sc-h2">
              From brief to <span className="sc-em">launch</span>
            </h2>
            <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((step) => (
                <li key={step.n} className="sc-card p-6">
                  <span className="font-display text-3xl text-sc-accent-text">{step.n}</span>
                  <h3 className="sc-h3 mt-3">{step.title}</h3>
                  <p className="sc-body mt-2">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="sc-section border-t border-sc-border" aria-labelledby="stack-title">
          <div className="sc-container">
            <p className="sc-eyebrow mb-4">Stack</p>
            <h2 id="stack-title" className="sc-h2">
              What we <span className="sc-em">use</span>
            </h2>
            <ul className="mt-10 flex flex-wrap gap-2" aria-label="Technologies we use">
              {STACK.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-sc-border px-4 py-1.5 text-sm text-sc-text"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="sc-section border-t border-sc-border" aria-labelledby="faq-title">
          <div className="sc-container">
            <p className="sc-eyebrow mb-4">FAQ</p>
            <h2 id="faq-title" className="sc-h2">
              Before you <span className="sc-em">write to us</span>
            </h2>
            <div className="sc-card sc-card--lg mt-12 overflow-hidden">
              {FAQ.map((item, i) => (
                <div key={item.q} className={i > 0 ? "border-t border-sc-border" : ""}>
                  <h3 className="font-display px-5 pt-5 text-lg tracking-tight text-sc-text sm:px-7 sm:text-xl">
                    {item.q}
                  </h3>
                  <p className="sc-body px-5 pb-6 pt-2 sm:px-7">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="sc-section border-t border-sc-border">
          <div className="sc-container">
            <div className="sc-card sc-card--lg mx-auto max-w-3xl p-8 text-center sm:p-12">
              <h2 className="sc-h2">
                Have a project in <span className="sc-em">mind?</span>
              </h2>
              <p className="sc-lead mx-auto mt-5 max-w-xl">
                Tell us what you want to build. We reply within a day with questions or a clear next
                step.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <HireButton />
                <a href={mailto} className="sc-btn sc-btn--ghost">
                  {site.email}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-sc-border bg-sc-bg">
        <div className="sc-container flex flex-wrap items-center justify-between gap-4 py-8 text-sm text-sc-muted">
          <p>
            © {new Date().getFullYear()} {site.name} · {site.city}, Turkey
          </p>
          <p>
            <Link href="/" className="transition-colors hover:text-sc-text">
              ekizyazilim.com
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}

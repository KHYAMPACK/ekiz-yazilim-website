import type { Metadata } from "next";
import ScFooter from "@/components/ScFooter";
import ScHeader from "@/components/ScHeader";
import SiteCheckTool from "@/components/sitecheck/SiteCheckTool";

export const metadata: Metadata = {
  title: "Ücretsiz Site Kontrolü | Siteniz Velileri Kaybettiriyor mu?",
  description:
    "Etüt merkezi, kurs, kreş ve okul siteniz için ücretsiz kontrol: güvenlik uyarısı, açılmayan adres, yavaşlık, Google ayarları. Her bulgu için sonucu ve çözümü gösteriyoruz.",
  alternates: { canonical: "/site-kontrol" },
};

const checks = [
  "Alan adınız bir siteye bağlı mı, süresi ne zaman doluyor?",
  "Tarayıcı güvenlik uyarısı veriyor mu?",
  "Site telefonda ve ne kadar hızlı açılıyor?",
  "Google siteyi görebiliyor mu, site haritası var mı?",
  "Telefon numarasına tek dokunuşla ulaşılıyor mu?",
];

export default function SiteKontrolPage() {
  return (
    <div className="sc-root">
      <ScHeader />
      <main>
        <section className="sc-glow">
          <div className="sc-container sc-section">
            <p className="sc-eyebrow mb-4">Ücretsiz site kontrolü</p>
            <h1 className="sc-h1 max-w-3xl">
              Siteniz velileri <span className="sc-em">kaybettiriyor mu?</span>
            </h1>
            <p className="sc-lead mt-6 max-w-2xl">
              Adresi yazın. Velinin siteye girdiğinde karşılaşabileceği sorunları bulalım; her biri
              için size ne kaybettirdiğini ve bizim ne yapacağımızı gösterelim.
            </p>

            <div className="mt-10 max-w-3xl">
              <SiteCheckTool />
            </div>
          </div>
        </section>

        <section className="border-t border-sc-border" aria-labelledby="sc-olcum-title">
          <div className="sc-container sc-section">
            <h2 id="sc-olcum-title" className="sc-h2">
              Neleri <span className="sc-em">ölçüyoruz</span>
            </h2>
            <ul className="mt-8 grid max-w-3xl gap-3 sm:grid-cols-2">
              {checks.map((c) => (
                <li key={c} className="sc-card p-4 text-[0.9375rem] text-sc-text">
                  {c}
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-2xl text-sm text-sc-muted">
              Yalnızca herkesin görebildiği sayfaları okuruz. Sitenize giriş yapmayız, adresinizi
              kaydetmeyiz. Sonuç anlık bir ölçümdür; tasarımın ve içeriğin kalitesini ölçmez.
            </p>
          </div>
        </section>
      </main>
      <ScFooter />
    </div>
  );
}

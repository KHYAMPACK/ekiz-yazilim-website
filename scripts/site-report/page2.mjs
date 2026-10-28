/** Page 2 of every report: who we are, what we do, how to reach us. Identical for all centers. */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const PROFILE = JSON.parse(fs.readFileSync(path.join(here, "profile.json"), "utf8"));

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const CORE = "M29.9 12H73.7L84.6 30.8H40.8L51.7 50L40.8 69.1H84.6L73.7 87.9H29.9L19 69.1L29.9 50L19 30.8L29.9 12Z";
const tile = (size) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" rx="26" fill="#e58a5c"/><g transform="translate(50 50) scale(0.58) translate(-51.8 -50)" fill="#141413"><path d="${CORE}"/></g></svg>`;

/** Accepts a handle ("ekizyazilim", "@ekizyazilim") or a full link; returns a display string or "". */
const social = (v, base) => {
  if (!v) return "";
  if (/^https?:\/\//i.test(v)) return v.replace(/^https?:\/\//i, "").replace(/\/$/, "");
  if (v.includes(".")) return v;
  return base + v.replace(/^@/, "");
};

export const page2Css = `
.page { break-after: page; }
.page:last-of-type { break-after: auto; }
.p2 { gap: 4.4mm; padding: 11mm 14mm 9mm; }
.p2 .lead { font-size: 10.2pt; line-height: 1.5; color: #3b3a36; max-width: 160mm; }
.p2 h1 { font-size: 21pt; line-height: 1.08; letter-spacing: -.035em; }
.pillars { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3mm; }
.pillar { background: var(--card); border: 1px solid var(--line); border-radius: 4mm; padding: 3.6mm 4mm; }
.pillar .ic { width: 7.2mm; height: 7.2mm; border-radius: 2.4mm; background: var(--orange); display: grid; place-items: center; margin-bottom: 2.2mm; font-weight: 700; font-size: 10pt; }
.pillar h3 { font-size: 10.2pt; font-weight: 600; letter-spacing: -.015em; margin-bottom: 1.2mm; }
.pillar p { font-size: 8.4pt; line-height: 1.4; color: #3b3a36; }
.clear { background: var(--card); border: 1px solid var(--line); border-left: 1.8mm solid var(--orange); border-radius: 4mm; padding: 3.8mm 5mm; }
.clear h2 { margin-bottom: 1.6mm; color: var(--deep); }
.clear .big { font-size: 13pt; font-weight: 600; letter-spacing: -.025em; margin-bottom: 2mm; }
.clear ul { list-style: none; display: grid; gap: 1.5mm; font-size: 8.8pt; line-height: 1.38; }
.clear li { padding-left: 5mm; position: relative; }
.clear li::before { content: ""; position: absolute; left: 0; top: 1.1mm; width: 2.6mm; height: 2.6mm; border-radius: 50%; background: var(--orange); }
.bigcta { display: grid; gap: 3mm; }
.bigcta a { text-decoration: none; color: var(--ink); }
.bigcta .main { display: flex; align-items: center; justify-content: space-between; gap: 6mm; background: var(--orange); border-radius: 5mm; padding: 7mm 8mm; box-shadow: 0 1.2mm 0 #c9703f; }
.bigcta .main small { display: block; font-size: 8pt; letter-spacing: .2em; text-transform: uppercase; font-weight: 700; opacity: .75; margin-bottom: 1.6mm; }
.bigcta .main b { display: block; font-size: 19pt; font-weight: 700; letter-spacing: -.035em; line-height: 1.12; max-width: 125mm; }
.bigcta .main i { font-style: normal; font-size: 30pt; font-weight: 600; line-height: 1; }
.bigcta .two { display: grid; grid-template-columns: 1fr 1fr; gap: 3mm; }
.bigcta .two a { background: var(--card); border: 1.5px solid var(--ink); border-radius: 4mm; padding: 3.6mm 5mm; }
.bigcta .two small { display: block; font-size: 7.4pt; letter-spacing: .16em; text-transform: uppercase; color: var(--muted); font-weight: 600; margin-bottom: .8mm; }
.bigcta .two b { font-size: 11pt; font-weight: 700; letter-spacing: -.02em; }
.proof2 { display: flex; justify-content: space-between; align-items: center; gap: 6mm; padding: 3.2mm 5mm; border-radius: 4mm; background: var(--track); }
.proof2 .names { font-size: 8.8pt; line-height: 1.45; }
.proof2 .names b { display: block; font-size: 7.6pt; letter-spacing: .18em; text-transform: uppercase; color: var(--muted); margin-bottom: .8mm; }
.proof2 .stars { text-align: right; font-size: 8.8pt; line-height: 1.35; white-space: nowrap; }
.proof2 .stars b { font-size: 15pt; letter-spacing: -.03em; display: block; }
.proof2 .stars em { color: var(--orange); font-style: normal; letter-spacing: .05em; }
.urgent { text-align: center; font-size: 13.5pt; font-weight: 600; letter-spacing: -.025em; line-height: 1.3; padding: 2mm 10mm; }
.urgent em { font-style: normal; color: var(--deep); }
.reach { background: var(--ink); color: var(--cream); border-radius: 5mm; padding: 4mm 6mm; }
.reach h2 { color: var(--orange); margin-bottom: 1.4mm; }
.reach .big { font-size: 16pt; font-weight: 600; letter-spacing: -.03em; margin-bottom: 3mm; }
.reach .rows { display: grid; grid-template-columns: 1fr 1fr; gap: 2.6mm 6mm; }
.reach .row a { color: var(--cream); text-decoration: none; }
.reach .row small { display: block; font-size: 7.2pt; letter-spacing: .16em; text-transform: uppercase; color: #a9a69c; margin-bottom: .4mm; }
.reach .row b { font-size: 10.5pt; font-weight: 600; color: var(--orange); }
.reach .plat { display: flex; flex-wrap: wrap; gap: 1.6mm 6mm; font-size: 8.8pt; color: #d8d4c8; }
.reach .plat a { color: #d8d4c8; text-decoration: none; }
.reach .plat b { color: var(--orange); font-weight: 600; margin-right: 1.6mm; }
`;

export function page2Html() {
  const P = PROFILE;
  const ig = social(P.instagram, "instagram.com/");
  const fb = social(P.facebook, "facebook.com/");
  const plat = [
    P.web && `<a href="https://${esc(P.web)}"><b>Web</b>${esc(P.web)}</a>`,
    P.scholares && `<a href="https://${esc(P.scholares)}"><b>Scholares</b>${esc(P.scholares)}</a>`,
    ig && `<a href="https://${esc(ig)}"><b>Instagram</b>${esc(ig)}</a>`,
    fb && `<a href="https://${esc(fb)}"><b>Facebook</b>${esc(fb)}</a>`,
  ]
    .filter(Boolean)
    .join("");
  const tel = P.phone.replace(/\s/g, "");
  const wa = encodeURIComponent("Merhaba, site raporunu aldım. 10 dakikalık görüşme yapmak istiyorum.");

  return `
<main class="page p2">
  <header>
    <div class="brand">${tile(40)}<span>Ekiz Yazılım</span></div>
    <div class="head-r">Biz kimiz<span>Ankara · Türkiye geneli</span></div>
  </header>

  <section>
    <p class="eyebrow">Ekiz Yazılım</p>
    <h1>Siteniz veli getirsin.<br>Ücretler net olsun.</h1>
    <p class="lead" style="margin-top:2.4mm">Etüt merkezleri, kreşler ve özel okullar için web sitesi, Google görünürlüğü ve öğrenci takip sistemi yapıyoruz. Ankara merkezliyiz, Türkiye genelinde çalışıyoruz; isterseniz yüz yüze görüşürüz. Sizinle doğrudan kurucusu olarak ben ilgilenirim: tek muhatap.</p>
  </section>

  <section class="pillars">
    <div class="pillar"><div class="ic">1</div><h3>Veli getiren site</h3><p>Telefonda hızlı açılan, ön kayıt formu ve tek dokunuşla arama / WhatsApp butonları olan, kurumunuza özel tasarlanmış site.</p></div>
    <div class="pillar"><div class="ic">2</div><h3>Google'da görünürlük (SEO)</h3><p>Site haritası, doğru başlıklar, Google İşletme Profili ve aylık ölçüm: aramada çıkarsınız, hangi çalışma veli getirdi görürsünüz.</p></div>
    <div class="pillar"><div class="ic">3</div><h3>Öğrenci takip: Scholares</h3><p>Ödev, yoklama, deneme analizi ve velilere anlık bildirim tek uygulamada. Pilotla başlıyoruz, kapsam yazılı.</p></div>
  </section>

  <section class="clear">
    <h2>Sürpriz ücret yok</h2>
    <p class="big">Ne ödediğinizi baştan bilirsiniz.</p>
    <ul>
      <li><b>Alan adı sizin adınıza</b> kayıtlıdır; kimse onu rehin tutamaz.</li>
      <li><b>Barındırma ilk yıl site bedeline dahildir;</b> sonra bakım paketinde ayrı kalem olarak yazılır.</li>
      <li><b>“Sunucu ücreti”, “yenileme bedeli” gibi açıklanamayan kalem yoktur.</b> Her ücret yazılıdır ve gerekçesi vardır.</li>
      <li><b>İstediğiniz an ayrılabilirsiniz:</b> siteyi ve hesapları ücretsiz devrederiz.</li>
    </ul>
  </section>

  <section class="bigcta">
    <a class="main" href="https://wa.me/${esc(P.whatsapp)}?text=${wa}">
      <span><small>WhatsApp</small><b>Şimdi yazın: 10 dakikalık görüşme başlatalım</b></span>
      <i>→</i>
    </a>
    <div class="two">
      <a href="tel:${esc(tel)}"><small>Hemen arayın</small><b>${esc(P.phone)}</b></a>
      <a href="https://${esc(P.booking)}"><small>Online randevu al</small><b>${esc(P.booking)}</b></a>
    </div>
  </section>

  <section class="proof2">
    <div class="names"><b>Birlikte çalıştığımız kurumlar</b>Atlas Eğitim Kurumu · Özel Başak Akademi · Lider Çocuklar Anaokulu</div>
    <div class="stars"><b>5,0 <em>★★★★★</em></b>Google'da 7 yorum</div>
  </section>

  <p class="urgent">Her hafta beklemek, her hafta kaçan veli demek. <em>10 dakikayla başlayalım.</em></p>

  <div class="spacer"></div>

  <section class="reach">
    <h2>Bizi bulun</h2>
    <div class="plat">
      ${plat}
      <span><b>E-posta</b><a href="mailto:${esc(P.email)}" style="color:inherit;text-decoration:none">${esc(P.email)}</a></span>
    </div>
  </section>
</main>`;
}

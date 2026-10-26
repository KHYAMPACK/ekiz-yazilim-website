/**
 * Turns raw facts from checks.mjs into a score, findings and plain-Turkish copy.
 * Every finding states a fact we measured, what it means, and what to do.
 */

export const CATEGORIES = [
  { id: "security", title: "Güvenlik", weight: 0.3 },
  { id: "speed", title: "Mobil ve hız", weight: 0.25 },
  { id: "seo", title: "Google görünürlüğü", weight: 0.25 },
  { id: "trust", title: "İletişim ve güncellik", weight: 0.2 },
];

const PENALTY = { critical: 45, high: 25, medium: 12, low: 5 };
const RANK = { critical: 0, high: 1, medium: 2, low: 3 };

export const SEVERITY_LABEL = {
  critical: "Acil",
  high: "Önemli",
  medium: "Orta",
  low: "Küçük",
};

const fmtDate = (iso) =>
  new Date(iso).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
const sn = (n) => String(n).replace(".", ",");

export function evaluate(facts) {
  const findings = [];
  const passed = [];
  const add = (category, severity, id, title, meaning, fix) =>
    findings.push({ category, severity, id, title, meaning, fix });
  const ok = (text) => passed.push(text);

  // ---------- Site did not load at all ----------
  if (facts.unreachable) {
    const noDns = facts.https?.error === "ENOTFOUND" && facts.dnsConfirmed === true;
    if (facts.domain?.hold) {
      add(
        "security",
        "critical",
        "domain-hold",
        "Alan adı kayıt firması tarafından askıya alınmış",
        "Alan adının kaydı “hold” durumunda: site ve e-postalar şu anda herkes için kapalı.",
        "Alan adının kayıtlı olduğu firma ile görüşülüp askıya alma sebebi (ödeme, doğrulama vb.) çözülmeli.",
      );
    } else if (noDns) {
      add(
        "security",
        "critical",
        "no-dns",
        "Alan adı bir sunucuya bağlı değil",
        "Alan adı internette çözümlenemiyor; site ve e-postalar şu anda herkes için kapalı.",
        "Alan adı kayıt ve DNS ayarları kontrol edilmeli.",
      );
    } else {
      // Could be a temporary network problem on our side: informational only, never a claim.
      add(
        "security",
        "low",
        "unreachable",
        "Site otomatik kontrol sırasında açılmadı (doğrulanamadı)",
        "Bu geçici bir bağlantı sorunu olabilir; sitenin gerçekten kapalı olduğunu söylemiyoruz.",
        "Kontrol tekrarlanmalı; kapalıysa barındırma ve sunucu ayarlarına bakılmalı.",
      );
    }
    if (facts.domain?.found && facts.domain.daysLeft >= 0) {
      passed.push(`Alan adı kaydı ${fmtDate(facts.domain.expires)} tarihine kadar geçerli`);
    }
    return finish(facts, findings, passed);
  }

  const c = facts.cert ?? {};
  const p = facts.page;

  // ---------- Security ----------
  const certProblem =
    facts.https.certBrokenOnFetch || (c.hasCert && (!c.authorized || c.hostnameMismatch));
  const httpsMissing = !c.connected && !facts.https.reachable;

  if (httpsMissing || (facts.httpOnly && !c.hasCert)) {
    add(
      "security",
      "critical",
      "no-https",
      "Site güvenli bağlantı (HTTPS) sunmuyor",
      "Tarayıcılar siteyi “Güvenli değil” diye işaretler. Ziyaretçi güveni ve Google sıralaması bundan olumsuz etkilenir.",
      "SSL sertifikası kurulmalı ve tüm adresler HTTPS’e yönlendirilmeli.",
    );
  } else if (c.hasCert && c.daysLeft < 0) {
    add(
      "security",
      "critical",
      "cert-expired",
      `SSL sertifikasının süresi ${Math.abs(c.daysLeft)} gün önce dolmuş`,
      "Ziyaretçiler tarayıcıda tam ekran güvenlik uyarısı görür; çoğu siteyi terk eder.",
      "Sertifika yenilenmeli ve otomatik yenileme açılmalı.",
    );
  } else if (c.hasCert && c.hostnameMismatch) {
    add(
      "security",
      "critical",
      "cert-mismatch",
      "SSL sertifikası bu alan adına ait değil",
      "Tarayıcı “bağlantınız gizli değil” uyarısı gösterir.",
      "Alan adına uygun bir sertifika kurulmalı.",
    );
  } else if (certProblem) {
    add(
      "security",
      "critical",
      "cert-invalid",
      "SSL sertifikası geçersiz",
      "Tarayıcı “Güvenli değil” uyarısı gösterir; ziyaretçi siteye girmekten çekinir.",
      "Güvenilir bir sertifika (ücretsiz seçenekler mevcut) kurulmalı.",
    );
  } else if (c.hasCert && c.daysLeft <= 14) {
    add(
      "security",
      "high",
      "cert-soon",
      `SSL sertifikası ${c.daysLeft} gün sonra doluyor`,
      "Yenilenmezse site güvenlik uyarısıyla açılmaya başlar.",
      "Otomatik yenileme kurulmalı.",
    );
  } else if (c.hasCert && c.daysLeft <= 30) {
    add(
      "security",
      "medium",
      "cert-30",
      `SSL sertifikası ${c.daysLeft} gün sonra doluyor`,
      "Yenileme unutulursa site güvenlik uyarısıyla açılır.",
      "Otomatik yenilemenin açık olduğundan emin olunmalı.",
    );
  } else if (c.hasCert) {
    ok(`SSL sertifikası geçerli (${c.daysLeft} gün kaldı)`);
  }

  if (facts.httpRedirect === false && !httpsMissing) {
    add(
      "security",
      "medium",
      "no-redirect",
      "http:// adresi https:// adresine yönlendirmiyor",
      "Eski bağlantıyla gelen ziyaretçi güvensiz sürüme düşer.",
      "Sunucuda tüm http adresleri https’e yönlendirilmeli.",
    );
  } else if (facts.httpRedirect === true) {
    ok("HTTP adresleri HTTPS’e yönleniyor");
  }

  if (p.mixedContent > 0) {
    add(
      "security",
      "medium",
      "mixed",
      `${p.mixedContent} görsel/dosya güvensiz (http) adresten yükleniyor`,
      "Tarayıcı bu yüzden kilit simgesini göstermeyebilir.",
      "Bu adresler https olarak güncellenmeli.",
    );
  }

  if (!p.hsts && c.hasCert && c.authorized) {
    add(
      "security",
      "low",
      "hsts",
      "Gelişmiş güvenlik başlığı (HSTS) yok",
      "Tarayıcıya “bu siteye her zaman güvenli bağlan” bilgisi verilmiyor.",
      "Sunucu ayarlarına HSTS başlığı eklenebilir.",
    );
  }

  // ---------- Mobile and speed ----------
  if (!/width\s*=\s*device-width/i.test(p.viewport)) {
    add(
      "speed",
      "high",
      "no-viewport",
      "Mobil uyum ayarı bulunamadı",
      "Telefonda site küçük ve okunmaz görünebilir. Ziyaretçilerin büyük kısmı telefondan geliyor.",
      "Sayfaya mobil uyumlu (responsive) ayar ve tasarım eklenmeli.",
    );
  } else {
    ok("Mobil uyum ayarı var");
  }

  if (p.ttfb > 3.5) {
    add(
      "speed",
      "high",
      "slow-server",
      `Sunucu yanıtı çok yavaş (${sn(p.ttfb)} sn)`,
      "Ziyaretçi sayfa görünmeden bekler; çoğu 3 saniyeden sonra ayrılır.",
      "Barındırma, önbellek ve sunucu ayarları gözden geçirilmeli.",
    );
  } else if (p.ttfb > 1.8) {
    add(
      "speed",
      "medium",
      "slow-server",
      `Sunucu yanıtı yavaş (${sn(p.ttfb)} sn)`,
      "Sayfa açılmadan önce gereksiz bekleme oluyor.",
      "Barındırma ve önbellek ayarları iyileştirilebilir.",
    );
  } else {
    ok(`Sunucu yanıtı hızlı (${sn(p.ttfb)} sn)`);
  }

  if (p.bytes > 700_000) {
    add(
      "speed",
      "medium",
      "heavy",
      `Ana sayfa çok ağır (${Math.round(p.bytes / 1024)} KB yalnızca sayfa kodu)`,
      "Mobil bağlantıda yükleme uzar.",
      "Gereksiz kod ve eklentiler temizlenmeli, sayfa sadeleştirilmeli.",
    );
  }

  if (facts.psi) {
    const s = facts.psi.performance;
    const lcp = facts.psi.lcpSeconds ? ` (ana içerik ${sn(facts.psi.lcpSeconds)} sn’de görünüyor)` : "";
    if (s < 50) {
      add(
        "speed",
        "high",
        "psi-low",
        `Google mobil hız puanı ${s}/100${lcp}`,
        "Telefonda sayfa geç açılıyor; Google bu puanı sıralamada dikkate alır.",
        "Görseller küçültülmeli, gereksiz script’ler kaldırılmalı.",
      );
    } else if (s < 90) {
      add(
        "speed",
        "medium",
        "psi-mid",
        `Google mobil hız puanı ${s}/100${lcp}`,
        "Orta düzeyde; küçük iyileştirmelerle yükselebilir.",
        "Görsel boyutları ve script yükü optimize edilmeli.",
      );
    } else {
      ok(`Google mobil hız puanı ${s}/100`);
    }
  }

  // ---------- Search visibility ----------
  if (p.noindex) {
    add(
      "seo",
      "critical",
      "noindex",
      "Site Google’dan gizlenmiş (noindex)",
      "Sayfada arama motorlarına “beni listeleme” etiketi var. Site aramalarda çıkmaz.",
      "Bu etiket kaldırılmalı.",
    );
  }

  if (!p.title) {
    add(
      "seo",
      "high",
      "no-title",
      "Sayfa başlığı (title) yok",
      "Google sonuçlarında ve sekmede kurum adınız görünmez.",
      "Kurum adı ve hizmeti içeren kısa bir başlık eklenmeli.",
    );
  } else if (p.title.length < 15 || p.title.length > 65) {
    add(
      "seo",
      "low",
      "title-len",
      `Sayfa başlığı ${p.title.length < 15 ? "çok kısa" : "çok uzun"} (${p.title.length} karakter)`,
      "Google sonuçlarında başlık kesilebilir ya da yeterince anlatmaz.",
      "Başlık yaklaşık 30–60 karakter olmalı.",
    );
  } else {
    ok("Sayfa başlığı uygun");
  }

  if (!p.description) {
    add(
      "seo",
      "medium",
      "no-description",
      "Google açıklama metni (meta description) yok",
      "Arama sonucunda sitenizin altında Google rastgele bir metin gösterir.",
      "Hizmetinizi anlatan 120–155 karakterlik bir açıklama yazılmalı.",
    );
  } else {
    ok("Arama sonucu açıklaması var");
  }

  if (p.h1 === 0) {
    add(
      "seo",
      "medium",
      "no-h1",
      "Sayfada ana başlık (H1) yok",
      "Google sayfanın ne hakkında olduğunu zor anlar.",
      "Sayfaya tek bir net ana başlık eklenmeli.",
    );
  } else if (p.h1 > 1) {
    add(
      "seo",
      "low",
      "multi-h1",
      `Sayfada ${p.h1} tane ana başlık (H1) var`,
      "Ana başlık tek olduğunda sayfa konusu daha net anlaşılır.",
      "Yalnızca bir H1 bırakılmalı.",
    );
  }

  if (!facts.sitemap) {
    add(
      "seo",
      "medium",
      "no-sitemap",
      "Site haritası (sitemap.xml) bulunamadı",
      "Google tüm sayfalarınızı bulmakta zorlanabilir.",
      "Site haritası oluşturulup Google Search Console’a eklenmeli.",
    );
  } else {
    ok("Site haritası var");
  }

  if (!facts.robotsTxt) {
    add(
      "seo",
      "low",
      "no-robots",
      "robots.txt dosyası bulunamadı",
      "Arama motorlarına tarama talimatı verilmemiş.",
      "Basit bir robots.txt eklenmeli.",
    );
  }

  if (p.images >= 3 && p.imagesNoAlt / p.images > 0.3) {
    add(
      "seo",
      "medium",
      "alt",
      `${p.imagesNoAlt} görselde açıklama (alt metni) yok`,
      "Görsel aramasında çıkamazsınız ve ekran okuyucu kullanan ziyaretçiler görselleri anlayamaz.",
      "Görsellere kısa açıklamalar eklenmeli.",
    );
  }

  if (!p.canonical) {
    add(
      "seo",
      "low",
      "no-canonical",
      "Kanonik adres (canonical) tanımlı değil",
      "Aynı sayfanın farklı adresleri Google’da tekrar sayılabilir.",
      "Her sayfaya canonical adres eklenmeli.",
    );
  }

  if (!p.ogImage || !p.ogTitle) {
    add(
      "seo",
      "low",
      "no-og",
      "WhatsApp / sosyal medya paylaşım önizlemesi eksik",
      "Link paylaşıldığında görsel ve başlık düzgün çıkmaz.",
      "Paylaşım (Open Graph) etiketleri eklenmeli.",
    );
  } else {
    ok("Link paylaşım önizlemesi var");
  }

  if (!p.lang) {
    add(
      "seo",
      "low",
      "no-lang",
      "Sayfa dili (lang) belirtilmemiş",
      "Tarayıcı ve arama motoru dili tahmin etmek zorunda kalır.",
      "Sayfaya Türkçe dil etiketi eklenmeli.",
    );
  }

  // ---------- Contact and freshness ----------
  if (!p.phoneLink && !p.whatsappLink) {
    add(
      "trust",
      "medium",
      "no-contact",
      "Tek dokunuşla arama veya WhatsApp bağlantısı yok",
      "Telefondan giren ziyaretçi sizi aramak için numarayı kopyalamak zorunda kalır.",
      "Arama ve WhatsApp butonları eklenmeli.",
    );
  } else {
    ok("Arama / WhatsApp bağlantısı var");
  }

  const year = new Date().getFullYear();
  if (p.copyrightYear && p.copyrightYear < year - 1) {
    add(
      "trust",
      "medium",
      "stale-year",
      `Sayfa altında “© ${p.copyrightYear}” yazıyor`,
      "Site yıllardır güncellenmemiş izlenimi verir.",
      "Yıl otomatik güncellenmeli ve içerik gözden geçirilmeli.",
    );
  }

  if (!p.favicon) {
    add(
      "trust",
      "low",
      "no-favicon",
      "Sekme simgesi (favicon) yok",
      "Tarayıcı sekmesinde ve yer imlerinde logonuz görünmez.",
      "Logodan bir favicon eklenmeli.",
    );
  }

  const d = facts.domain;
  if (d?.found) {
    if (d.daysLeft < 0) {
      add(
        "trust",
        "critical",
        "domain-expired",
        `Alan adının süresi dolmuş (${fmtDate(d.expires)})`,
        "Alan adı yenilenmezse site ve e-postalar kaybedilebilir.",
        "Alan adı hemen yenilenmeli.",
      );
    } else if (d.daysLeft <= 30) {
      add(
        "trust",
        "high",
        "domain-soon",
        `Alan adı ${d.daysLeft} gün sonra doluyor (${fmtDate(d.expires)})`,
        "Yenilenmezse site ve e-postalar durur.",
        "Alan adı yenilenmeli, otomatik yenileme açılmalı.",
      );
    } else if (d.daysLeft <= 60) {
      add(
        "trust",
        "medium",
        "domain-60",
        `Alan adı ${fmtDate(d.expires)} tarihinde doluyor`,
        "Yenileme zamanı yaklaşıyor.",
        "Yenileme planlanmalı.",
      );
    } else {
      ok(`Alan adı kaydı ${fmtDate(d.expires)} tarihine kadar geçerli`);
    }
  }

  return finish(facts, findings, passed);
}

function finish(facts, findings, passed) {
  findings.sort((a, b) => RANK[a.severity] - RANK[b.severity]);

  const categories = CATEGORIES.map((cat) => {
    const mine = findings.filter((f) => f.category === cat.id);
    let score = 100 - mine.reduce((sum, f) => sum + PENALTY[f.severity], 0);
    if (mine.some((f) => f.severity === "critical")) score = Math.min(score, 35);
    // A site that is down cannot be measured on speed, search or content.
    if (facts.unreachable && cat.id !== "security") return { ...cat, score: null };
    return { ...cat, score: Math.max(0, score) };
  });

  const overall = facts.unreachable
    ? 10
    : Math.round(categories.reduce((sum, cat) => sum + cat.score * cat.weight, 0));

  const urgent = findings.filter((f) => f.severity === "critical" || f.severity === "high");
  let headline;
  const lowerFirst = (t) =>
    /^[A-ZÇĞİÖŞÜ]{2}/.test(t) ? t : t.charAt(0).toLocaleLowerCase("tr") + t.slice(1);
  if (facts.unreachable) headline = `${findings[0].title}.`;
  else if (urgent.length > 0)
    headline = `${urgent.length} konu öncelikli: ${lowerFirst(urgent[0].title)}.`;
  else if (findings.length > 0)
    headline = "Genel olarak sağlıklı; birkaç küçük iyileştirme yapılabilir.";
  else headline = "Kontrol ettiğimiz her şey yolunda görünüyor.";

  return {
    overall,
    label: overall >= 80 ? "İyi" : overall >= 60 ? "Orta" : overall >= 40 ? "Zayıf" : "Kritik",
    headline,
    categories,
    findings,
    top: findings.slice(0, 3),
    passed,
  };
}

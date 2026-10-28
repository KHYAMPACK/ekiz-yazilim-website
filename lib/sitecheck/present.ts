/**
 * Turns the engine's findings into the same shape our proposals use:
 * the problem in the owner's words, what it causes, what we measured, what we do about it.
 */
export type Level = "critical" | "high" | "medium";

export type Item = {
  level: Level;
  problem: string;
  cost: string;
  proof: string;
  fix: string;
};

export type CheckResult = {
  host: string;
  checkedAt: string;
  unreachable: boolean;
  headline: string;
  counts: Record<Level, number>;
  items: Item[];
};

type RawFinding = {
  severity: "critical" | "high" | "medium" | "low";
  id: string;
  title: string;
  meaning: string;
  fix: string;
};

type Copy = { problem: string; cost: string };

const VISITOR_LEAVES =
  "Uyarıyı gören veli genellikle geri dönüyor ve aradığı kurs sizse, gittiği yer rakibiniz oluyor.";

/** Owner-facing wording per finding id. Anything not listed falls back to the engine's own text. */
const COPY: Record<string, Copy> = {
  "domain-hold": {
    problem: "Alan adınız askıya alınmış; siteniz ve e-postalarınız kapalı.",
    cost: "Siteye giren veli hata sayfası görüyor, e-postalarınız ulaşmıyor. Sizi araştıran veli bir sonraki kursa geçiyor.",
  },
  "no-dns": {
    problem: "Alan adınız bir siteye bağlı değil.",
    cost: "Adresi yazan ya da Google Haritalar'da “Web sitesi”ne basan veli hata sayfasıyla karşılaşıyor ve rakibinize geçiyor.",
  },
  "wix-expired": {
    problem: "Siteniz Wix'in “süresi dolmuş” sayfasına yönleniyor.",
    cost: "Veli kurumunuzu değil bir uyarı sayfasını görüyor; site Google'dan da kayboluyor.",
  },
  "router-page": {
    problem: "Adresiniz sitenizi değil bir modem ayar sayfasını açıyor.",
    cost: "Veli boş bir sayfa görüyor ve siteye hiç ulaşamıyor; Google'daki bağlantınız da bu adrese gidiyor.",
  },
  "no-https": {
    problem: "Siteniz güvenli bağlantı sunmuyor.",
    cost: "Tarayıcı “Güvenli değil” uyarısı gösteriyor; güvenmeyen veli formu doldurmuyor, aramıyor.",
  },
  "cert-expired": {
    problem: "Sitenize giren veli tam ekran güvenlik uyarısı görüyor.",
    cost: `Tarayıcı sayfayı engelliyor. ${VISITOR_LEAVES}`,
  },
  "cert-mismatch": {
    problem: "Tarayıcı güvenlik uyarısı veriyor: sertifika bu adrese ait değil.",
    cost: `Veli sitenize girmeden dönüyor. ${VISITOR_LEAVES}`,
  },
  "cert-invalid": {
    problem: "Tarayıcı sitenizi güvenli bulmuyor.",
    cost: `Veli sitenize girmeden dönüyor. ${VISITOR_LEAVES}`,
  },
  "cert-soon": {
    problem: "Güvenlik sertifikanız çok yakında doluyor.",
    cost: "Yenilenmezse tarayıcı tam ekran uyarı verir; veli siteyi görmeden döner.",
  },
  "cert-30": {
    problem: "Güvenlik sertifikanızın bitmesine bir aydan az kaldı.",
    cost: "Kendiliğinden yenilenmiyorsa uyarı çıkacak ve veli siteyi görmeden dönecek.",
  },
  "no-redirect": {
    problem: "Güvensiz adres (http) güvenli adrese yönlendirilmiyor.",
    cost: "Adresi https olmadan yazan veli güvensiz sürüme düşüyor ve uyarı görebiliyor.",
  },
  mixed: {
    problem: "Güvenli sayfanızda güvensiz yüklenen dosyalar var.",
    cost: "Tarayıcı “tam güvenli değil” işareti koyuyor, bazı görseller açılmayabiliyor; veli sayfanın bozuk olduğunu düşünüyor.",
  },
  "no-viewport": {
    problem: "Siteniz telefona uygun değil.",
    cost: "Veliler siteye çoğunlukla telefondan giriyor; küçük yazı ve kayan sayfa görünce kapatıp başka bir kursa bakıyorlar.",
  },
  "slow-server": {
    problem: "Siteniz geç açılıyor.",
    cost: "Bekleyen veli çıkıyor; mobil internetle bu süre daha da uzuyor.",
  },
  heavy: {
    problem: "Ana sayfanız çok ağır.",
    cost: "Telefonda açılması uzun sürüyor; beklemek istemeyen veli kapatıyor.",
  },
  noindex: {
    problem: "Siteniz Google'dan gizlenmiş.",
    cost: "Aramadan sitenize hiç veli gelmez; yeni veliler sizi bulamaz.",
  },
  "no-title": {
    problem: "Google'da sitenizin başlığı yok.",
    cost: "Aramada kurumunuzun adı doğru görünmez ve tıklanma düşer.",
  },
  "no-description": {
    problem: "Google'da sitenizin altında açıklama yazısı yok.",
    cost: "Aramada sonucunuz silik görünür; veli sizi tıklamaya daha az meyilli oluyor.",
  },
  "no-h1": {
    problem: "Sayfanızda ana başlık yok.",
    cost: "Google sayfanın ne hakkında olduğunu anlamakta zorlanır; aramada daha geride kalırsınız.",
  },
  "no-sitemap": {
    problem: "Google'a site haritası verilmemiş.",
    cost: "Google sayfalarınızı tahminle buluyor; bazıları aramada hiç çıkmayabilir. Aramadan gelen veli, çıkan ilk kursa gidiyor.",
  },
  alt: {
    problem: "Görsellerinizin açıklaması yok.",
    cost: "Google görsellerinizi anlayamaz; ekran okuyucu kullanan ziyaretçiler de görselleri anlayamaz.",
  },
  "no-contact": {
    problem: "Telefon numaranız tıklanabilir değil ya da WhatsApp butonu yok.",
    cost: "Telefondan giren veli numaraya dokunup arayamıyor; numarayı kopyalamakla uğraşmayan veli aramadan çıkıyor.",
  },
  "stale-year": {
    problem: "Sitenizin altında eski bir yıl yazıyor.",
    cost: "Eski yıl, siteye ve kuruma ilgisizlik izlenimi verir; veli güveni zedelenir.",
  },
  "domain-expired": {
    problem: "Alan adınızın süresi dolmuş.",
    cost: "Site ve e-postalar durur; adres başkasının eline geçebilir.",
  },
  "domain-soon": {
    problem: "Alan adınızın süresi çok yakında doluyor.",
    cost: "Yenilenmezse site ve e-postalar bir anda durur.",
  },
  "domain-60": {
    problem: "Alan adınızın süresi iki ay içinde doluyor.",
    cost: "Yenileme unutulursa site ve e-postalar durur.",
  },
};

const MAX_ITEMS = 6;

export function present(
  host: string,
  facts: { unreachable?: boolean; checkedAt: string },
  evaluated: { findings: RawFinding[] },
): CheckResult {
  const real = evaluated.findings.filter((f) => f.severity !== "low" && f.id !== "unreachable");

  const items: Item[] = real.slice(0, MAX_ITEMS).map((f) => {
    const copy = COPY[f.id];
    return {
      level: f.severity as Level,
      problem: copy?.problem ?? f.title,
      cost: copy?.cost ?? f.meaning,
      proof: f.title,
      fix: f.fix,
    };
  });

  const counts: Record<Level, number> = { critical: 0, high: 0, medium: 0 };
  for (const f of real) counts[f.severity as Level]++;

  const unreachable = !!facts.unreachable && real.length === 0;

  let headline: string;
  if (unreachable) {
    headline = "Siteye otomatik kontrolde bağlanamadık.";
  } else if (items.length === 0) {
    headline = "Kontrol ettiğimiz temel konularda büyük bir sorun görmedik.";
  } else {
    const parts: string[] = [];
    if (counts.critical) parts.push(`${counts.critical} acil`);
    if (counts.high) parts.push(`${counts.high} önemli`);
    if (counts.medium) parts.push(`${counts.medium} orta`);
    headline = `${real.length} bulgu: ${parts.join(", ")}.`;
  }

  return { host, checkedAt: facts.checkedAt, unreachable, headline, counts, items };
}

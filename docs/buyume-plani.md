# Büyüme planı: eğitim kurumları web sitesi nişinde görünür olmak

**Hedef:** Bir etüt merkezi, kurs, kreş ya da özel okul sahibi kendine web sitesi arattığında Ekiz Yazılım'ı bulsun ve ilk sırada güvensin.
**Durum:** 28 Ekim 2026'da planlandı. Hiçbir madde bitmedi. Sırayla yapılacak.

## 1. Google'da bugün ne var (28 Ekim 2026, google.com.tr, Türkçe, gerçek sonuç sayfası)

Aranan sorgular: "dershane web sitesi yaptırma", "dershane web sitesi fiyatları", "kreş web sitesi tasarımı", "kurs merkezi web sitesi tasarımı", "okul web sitesi yapımı", "etüt merkezi web sitesi".

- **"etüt merkezi web sitesi" sahipleri değil velileri getiriyor.** Sonuçlar kurumların kendi siteleri (Elit Eğitim, Ortadoğulular, Çözüm Kurs...). Bu sorguyu hedeflemek boşuna.
- **"okul web sitesi yapımı" devlet okulu çalışanlarına gidiyor.** MEB yönetim paneli (MebWeb) videoları ve kılavuzları çıkıyor. Yanlış kitle.
- **Asıl rekabet şu sorgularda:** "dershane web sitesi yaptırma", "dershane web sitesi fiyatları", "kreş web sitesi tasarımı", "kurs merkezi web sitesi tasarımı".
- **Bu sorgularda çıkan rakipler (adı geçenler):**
  - Dershane sorgusunda: Nexora Digital, Aniba Digital (16 Eylül 2026 tarihli makale: "Dershaneler İçin Web Sitesi Tasarımında Öncelikler Neler?"), Webdeyeral, Karaçayır Teknoloji, sitesikurma.com, Dijitasyon (Samsun), Mad Akademi, Varol Yazılım.
  - Kreş sorgusunda: e-Kreş (hazır şablon + panel), weblike (9 Ekim 2026 makalesi), medyaweb, anaokuluwebsitesi.com, webgelistirici, alfadizayn (Şubat 2026 rehberi).
  - Ücretli reklam verenler: Libart Medya (Ankara, "54 proje" iddiası), KOE Software (Ankara), Bilgikurumsal, Webioo, Soft Ajans, Nextmedya.
- **Fiyatlar görünür ve düşük.** Sonuç sayfasında görülenler: Webdeyeral eğitim sitesi 7.500 TL, sitesikurma "Dershane Sitesi Kurma" 5.000-7.000 TL + KDV civarı, genel kurumsal site 8.000-10.000 TL, Nextmedya 10.000 TL + KDV'den. Bunlar hazır şablon ve paket sitelere benziyor.
  - **Sonuç:** 20.000 TL'lik fiyatımız niş sonuçlarındaki fiyatların 2-3 katı. Bu nişte fiyatla yarışamayız; farkı kanıtla (ölçülmüş bulgular, hazırlanmış rapor, öğrenci takip sistemi, bakım, referanslar) kurmak zorundayız.
- **Boşluk:** Rakiplerin içerikleri genel ("dershane sitesinde neler olmalı"). Ankara'daki gerçek kurumların sitelerini ölçülmüş verilerle anlatan bir içerik yok. Bizim elimizde 500'e yakın Ankara kurumu taraması var.

Not: Bu arama bir kez, bir tarayıcıdan, kişiselleştirme olmadan yapıldı. Sıralamalar günden güne ve konuma göre değişir. Sayıları kesin sıralama olarak kullanma.

## 2. Teklifler ve durum

| # | Teklif | Neden | Durum |
|---|---|---|---|
| 1 | Ücretsiz "Siteniz kaç veli kaybettiriyor?" aracı (ekizyazilim.com'da). Site adresi girilir, bizim kontrol motorumuzla ölçülmüş bulgular çıkar, sonda WhatsApp butonu. | Rakiplerin hiçbirinde yok. Paylaşılır, lead getirir. Motor hazır. | Yayında (28 Ekim 2026): `/site-kontrol` ve `/web-sitesi` kahramanı, açılır pencere + ilerleme çubuğu. Vercel güvenlik duvarı hız sınırı kuralı eklendi, canlıda doğrulandı. |
| 2 | "Ankara'daki eğitim kurumlarının web siteleri 2026" araştırma raporu, kendi tarama verimizden. | Bağlantı ve haber getirir; rakipler genel içerik yazıyor. | Yayında: `/arastirma/ankara-kurs-siteleri-2026` (CRM oturumu yaptı), altbilgide ve /web-sitesi'nde bağlı. Sayıları ve yöntemi bir kez gözden geçir. |
| 3 | Sahiplerin aradığı sorgulara sayfalar: dershane web sitesi, etüt merkezi/kurs sitesi, kreş web sitesi. Gerçek içerik, referanslar, örnek. | Üstteki arama tablosu. | Yapılacak |
| 4 | Rehber yazıları: alan adı kimin adına, SSL süresi dolarsa ne olur, Google işletme profili, sözleşmede olması gerekenler. | Gerçek sorunlarımızdan geliyor; rakiplerde yok. | Yapılacak |
| 5 | Her müşteri sitesinde "Ekiz Yazılım" alt bilgi bağlantısı + portföy sayfası (önce/sonra). | Sürekli ilgili bağlantı. Kapsam şablonu buna zaten izin veriyor. | Yapılacak |
| 6 | Google işletme profili: her teslimde yorum iste, her yoruma yanıt ver. | Yerel aramada belirleyici. Şu an 7 yorum, 5,0. | Başladı (profil Ankara/eğitim olarak düzeltildi) |
| 7 | Küçük, ölçülen Google reklamı: sahip sorguları, tek açılış sayfası, tek dönüşüm (WhatsApp). | Rakipler zaten reklam veriyor; organik sıralama aylar sürer. | Yapılacak (bütçe kararı Mert'te) |
| 8 | Sahiplerin olduğu yerler: Facebook/WhatsApp grupları, yayınevi temsilcileri, kurslarla çalışan mali müşavirler. | Satın alınamayan kanal. | Yapılacak (önce hangi grup/dernek gerçekten var araştır, isim uydurma) |
| 9 | Haftada bir kısa video (reel), her biri gerçek bir bulguya bağlı. | Mevcut "siteniz kapanacak" reel'i bu formatta. | Devam |

## 3. Önerilen sıra

- **Bu hafta:** #1 aracı, #3'ün ilk iki sayfası (dershane, kreş), bu dosyadaki arama tablosunu yenile.
- **30 gün içinde:** #2 raporu, #6 yorum isteme, #7 küçük reklam testi.
- **90 gün içinde:** haftalık rehber (#4), #5 portföy, #8 kanal ilişkileri.

## 4. Kararlar ve açık sorular

- Fiyat konumlaması: bu nişte rakipler 5.000-10.000 TL gösteriyor, biz 20.000 TL. Farkı hangi kanıtlarla göstereceğiz?
- Reklam bütçesi (Mert belirler).
- #1 aracı: istek sınırı ve kötüye kullanım önlemi gerekli.
- Araştırma raporunda yalnızca kendi verimizden çıkan sayılar kullanılacak; yöntem yazılacak.

## 5. Blog ve yapay zeka görünürlüğü (2 Kasım 2026)

**Karar:** Günlük otomatik blog yerine, haftada 2-3 yazı ve her birinde bize özgü bir bilgi (kendi tarama verimiz, gerçek vaka, sahiplerin gerçekten sorduğu soru). Otomasyon yazıyı taslaklar, PR açar; yayından önce insan okur.

**Yapıldı:** `/blog` bölümü (veri dosyalarından yazı: `content/blog/*.ts`, ekleme için `lib/blog/index.ts`), ilk 8 soru yazısı, RSS, site haritası, Article + FAQPage + BreadcrumbList şeması, `/llms.txt`.

**Yapay zekanın bizi önermesi için:**
- Her yazı soruyla başlar, "Kısa cevap" en üstte (40-70 kelime), başlıklar soru gibi, tablo ve numaralı listeler.
- Doğrulanabilir somut bilgi: fiyat, sayı, tarih, yöntem. Uydurma sayı yok.
- Kuruluş bilgisi her yerde aynı: ad, şehir, telefon, fiyatlar (site, `llms.txt`, Google profili).
- Üçüncü taraf kanıt: yorumlar, Ankara incelemesine bağlantılar, LinkedIn/Instagram sayfaları (`lib/site.ts` içindeki `linkedin` ve `instagram` boş; doldurulunca Organization `sameAs` alanına girer).
- Taramaya açık: `robots.ts` hiçbir yapay zeka tarayıcısını engellemiyor.
- Bing Webmaster Tools + IndexNow ve Search Console henüz kurulmadı.
- Aylık ölçüm: 20 örnek soruyu ChatGPT, Gemini, Perplexity ve Claude'a sor, Ekiz'in geçip geçmediğini kaydet.

**Yapılmayacak:** gizli metin, yapay zekaya yönelik gizli talimat, sahte yorum.

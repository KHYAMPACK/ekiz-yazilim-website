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
| 1 | Ücretsiz "Siteniz kaç veli kaybettiriyor?" aracı (ekizyazilim.com'da). Site adresi girilir, bizim kontrol motorumuzla ölçülmüş bulgular çıkar, sonda WhatsApp butonu. | Rakiplerin hiçbirinde yok. Paylaşılır, lead getirir. Motor hazır. | Yapıldı: yerelde çalışıyor ve test edildi (`/site-kontrol`). Yayında değil; yayın için commit + deploy + Vercel güvenlik duvarında hız sınırı kuralı gerekli. |
| 2 | "Ankara'daki eğitim kurumlarının web siteleri 2026" araştırma raporu, kendi tarama verimizden. | Bağlantı ve haber getirir; rakipler genel içerik yazıyor. | Yapılacak (önce veriyi hesapla, yöntemi yaz) |
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

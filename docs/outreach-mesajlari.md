# Outreach Mesajları

**Sıra:** önce site raporu (otomatik, herkese), mock yalnızca cevap veren veya önemli adaylara.
**Kural:** İlk mesaj kısa. Tek bir gerçek bulgu + PDF. Satış yapmaya çalışma, yardım et.

Her mesajın sonuna kısa bir çıkış satırı ekle: *"İstemezseniz yazmanız yeterli, tekrar rahatsız etmem."*

> Rapor: `npm run site-report -- --csv leads/leads.csv` → `reports/<site>.pdf`
> Bulgu satırı: `reports/summary.csv` → `top_finding` sütunu.

---

## 1. Sitesi olan merkez — WhatsApp (ilk mesaj)

> Merhaba, ben Mert, Ekiz Yazılım. {Kurum} sitesine bakarken fark ettim: **{bulgu}**.
> Ziyaretçiler ve Google açısından önemli olduğu için kısa bir rapor hazırladım, ekte. Karşılığında bir şey istemiyorum.
> Düzeltmeye yardımcı olmamı isterseniz yazın. İstemezseniz yazmanız yeterli, tekrar rahatsız etmem.

*Örnek bulgular:* "SSL sertifikasının süresi dolmuş, tarayıcı 'güvenli değil' uyarısı veriyor" · "site telefonda mobil uyumlu görünmüyor" · "alan adı 24 gün sonra doluyor".

## 2. Sitesi olmayan merkez (veya yalnızca Instagram) — WhatsApp / DM

> Merhaba, ben Mert, Ekiz Yazılım. {Kurum} için Google'da arayan velilerin sizi bulabileceği bir site taslağı hazırladım, ekte. Beğenmezseniz hiçbir yükümlülük yok.
> İstemezseniz yazmanız yeterli, tekrar rahatsız etmem.

*(Taslak: yalnızca görsel mock. "Taslak" etiketli, yayınlanmaz.)*

## 3. Takip mesajı (3–4 gün sonra, cevap yoksa)

> Merhaba, geçen gün gönderdiğim raporla ilgili kısa bir hatırlatma. {Bulgu} konusu hâlâ açık görünüyor; kendiniz çözebilirsiniz, takıldığınız yerde yardımcı olurum.

## 4. İkinci takip (1 hafta sonra, son mesaj)

> Son bir not: LGS hazırlık kurumları için hazırladığımız öğrenci takip uygulamasını (Scholares) kısa bir demoyla gösterebilirim. Ücretli pilotla başlıyoruz, kapsam yazılı. İlgilenirseniz bir gün/saat yazın.

## 5. Cevap gelirse

- "Ne kadar?" → Fiyat vermeden önce kurum büyüklüğünü ve sorunu öğren: öğrenci sayısı, mevcut site, sorun. Sonra `docs/fiyatlandirma.md`.
- "Düzeltir misiniz?" → 15–20 dk görüşme, yazılı kapsam, %50 peşin (`docs/kapsam-sozlesme-sablonu.md`).
- "Sistemimiz var" → Neyi kullandıklarını sor (Edesis vb.), saygıyla bırak; pilot teklif et.
- "İlgilenmiyoruz" → Teşekkür et, listeden çıkar.

## Notlar

- İlk 30 kişide hangi mesajın cevap aldığını not al (`leads/leads.csv` → `status` / `notes` sütunları), sonra yaz.
- Ticari ileti kuralları: işletmelere gönderilen mesajlarda çıkış hakkı sunulmalı. Hacim büyürse bir avukata veya İYS kurallarına danış.
- Başka bir geliştiriciyi isimle anma. Hikâyeleri isimsiz anlat, müşteri izniyle.

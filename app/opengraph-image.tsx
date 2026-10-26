import { ImageResponse } from "next/og";
import { LOGO_PATHS } from "@/components/logoPaths";

export const alt = "Ekiz Yazılım — Eğitim kurumları için öğrenci takip sistemi ve web sitesi";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#121211",
          color: "#f3f0e8",
          padding: 72,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <svg width="96" height="96" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" rx="26" fill="#e58a5c" /><g transform="translate(50 50) scale(0.58) translate(-51.8 -50)" fill="#141413"><path d={LOGO_PATHS.core} /></g></svg>
          <div style={{ display: "flex", fontSize: 52, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1 }}>Ekiz&nbsp;<span style={{ fontWeight: 400, color: "#a9a69c" }}>Yazılım</span></div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 44,
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              maxWidth: 900,
            }}
          >
            Eğitim kurumları için öğrenci takip sistemi ve web sitesi
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#e58a5c",
              maxWidth: 820,
              lineHeight: 1.35,
            }}
          >
            Küçük ve büyük işletmeler için net, sade yazılım çözümleri
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}

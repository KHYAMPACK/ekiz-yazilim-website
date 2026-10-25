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
          background: "#000000",
          color: "#ffffff",
          padding: 72,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <svg
            width="96"
            height="96"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d={LOGO_PATHS.bracketTl} fill="#ffffff" />
            <path d={LOGO_PATHS.bracketBr} fill="#ffffff" />
            <path d={LOGO_PATHS.core} fill="#ffffff" />
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 56,
                fontWeight: 600,
                letterSpacing: "-0.03em",
                lineHeight: 1,
              }}
            >
              ekiz
            </div>
            <div
              style={{
                marginTop: 10,
                fontSize: 22,
                fontWeight: 300,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
              }}
            >
              yazılım
            </div>
          </div>
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
              color: "#BFD5EB",
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

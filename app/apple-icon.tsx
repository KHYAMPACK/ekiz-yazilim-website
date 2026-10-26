import { ImageResponse } from "next/og";
import { LOGO_PATHS } from "@/components/logoPaths";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#e58a5c",
        }}
      >
        <svg width="128" height="128" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><g transform="translate(50 50) scale(0.8) translate(-51.8 -50)" fill="#141413"><path d={LOGO_PATHS.core} /></g></svg>
      </div>
    ),
    { ...size },
  );
}

import { ImageResponse } from "next/og";
import { LOGO_PATHS } from "@/components/logoPaths";

export const size = { width: 48, height: 48 };
export const contentType = "image/png";

/** Google Search prefers ≥48px square icons. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
        }}
      >
        <svg width="48" height="48" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" rx="30" fill="#e58a5c" /><g transform="translate(50 50) scale(0.62) translate(-51.8 -50)" fill="#141413"><path d={LOGO_PATHS.core} /></g></svg>
      </div>
    ),
    { ...size },
  );
}

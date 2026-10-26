import { LOGO_PATHS } from "./logoPaths";

type LogoProps = {
  variant?: "mark" | "full";
  /** Colour of the wordmark: onDark = cream, onLight = black. The tile is always orange. */
  tone?: "onLight" | "onDark";
  layout?: "stacked" | "inline";
  /** Height of the orange tile in px. */
  size?: number;
  className?: string;
  /** Kept for old call sites; the bracket animation no longer exists. */
  assembleOnClick?: boolean;
};

/** Orange rounded tile with the black Ekiz mark (no corner brackets). */
export function LogoTile({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="block shrink-0"
    >
      <rect width="100" height="100" rx="26" fill="#e58a5c" />
      {/* core spans x 19–84.6, y 12–87.9 → centre it and scale into the tile */}
      <g
        transform="translate(50 50) scale(0.58) translate(-51.8 -50)"
        fill="#141413"
      >
        <path d={LOGO_PATHS.core} />
      </g>
    </svg>
  );
}

export default function Logo({
  variant = "mark",
  tone = "onLight",
  layout = "stacked",
  size = 40,
  className = "",
}: LogoProps) {
  const stacked = variant === "full" && layout === "stacked";
  const color = tone === "onDark" ? "#f3f0e8" : "#141413";
  const muted = tone === "onDark" ? "#a9a69c" : "#6b6860";
  const fontSize = Math.round(size * (stacked ? 0.5 : 0.52));

  return (
    <span
      className={`logo inline-flex ${
        stacked ? "flex-col gap-3" : "flex-row gap-2.5"
      } items-center ${className}`}
      aria-label="Ekiz Yazılım"
    >
      <LogoTile size={size} />
      {variant === "full" && (
        <span
          className="logo-wordmark whitespace-nowrap"
          style={{
            fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
            fontSize,
            fontWeight: 600,
            letterSpacing: "-0.02em",
            lineHeight: 1,
            color,
          }}
        >
          Ekiz <span style={{ fontWeight: 400, color: muted }}>Yazılım</span>
        </span>
      )}
    </span>
  );
}

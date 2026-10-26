import Logo from "./Logo";

/** Header/footer logo for the Scholares-themed pages (orange tile, no brackets). */
export default function ScLogo({ size = 36 }: { size?: number }) {
  return <Logo variant="full" tone="onDark" layout="inline" size={size} />;
}

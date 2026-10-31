import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import AnalyticsEvents from "@/components/AnalyticsEvents";
import FloatingAssistant from "@/components/FloatingAssistant";
import JsonLd from "@/components/JsonLd";
import LogoLoader from "@/components/LogoLoader";
import { site } from "@/lib/site";
import { seo } from "@/lib/seo";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  metadataBase: new URL(seo.siteUrl),
  title: {
    default: seo.title,
    template: `%s | ${site.name}`,
  },
  description: seo.description,
  keywords: [...seo.keywords],
  applicationName: site.name,
  authors: [{ name: site.name, url: seo.siteUrl }],
  creator: site.name,
  publisher: site.name,
  category: "technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: seo.siteUrl,
    siteName: site.name,
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${spaceGrotesk.variable} h-full antialiased`}>
      <body className="min-w-0 min-h-full max-w-[100%] overflow-x-clip bg-background font-sans text-foreground">
        <JsonLd />
        <LogoLoader>{children}</LogoLoader>
        <FloatingAssistant />
        <Analytics />
        <AnalyticsEvents />
      </body>
    </html>
  );
}

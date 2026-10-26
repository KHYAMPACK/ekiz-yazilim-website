import type { MetadataRoute } from "next";
import { seo } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: seo.siteUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${seo.siteUrl}/kvkk`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${seo.siteUrl}/randevu`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${seo.siteUrl}/ilham`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${seo.siteUrl}/isler`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${seo.siteUrl}/egitim`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${seo.siteUrl}/web-sitesi`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${seo.siteUrl}/e-ticaret`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.95,
    },
  ];
}

import type { MetadataRoute } from "next";
import { posts } from "@/lib/blog";
import { seo } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const blog: MetadataRoute.Sitemap = [
    {
      url: `${seo.siteUrl}/blog`,
      lastModified: new Date(`${posts[0]?.updated ?? "2026-11-02"}T12:00:00`),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    ...posts.map((p) => ({
      url: `${seo.siteUrl}/blog/${p.slug}`,
      lastModified: new Date(`${p.updated}T12:00:00`),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];

  return [
    ...blog,
    {
      url: seo.siteUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${seo.siteUrl}/upwork`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
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
      url: `${seo.siteUrl}/arastirma`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${seo.siteUrl}/arastirma/ankara-kurs-siteleri-2026`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${seo.siteUrl}/site-kontrol`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}

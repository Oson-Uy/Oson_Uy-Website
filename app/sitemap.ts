import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";
import { CITY_SLUGS } from "@/content/cities";
import { ARTICLES } from "@/content/blog";

type ApiProject = { id: number; updatedAt?: string };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteUrl();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/catalog`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.75,
    },
  ];

  // City landing pages (/novostroyki/[slug])
  const cityRoutes: MetadataRoute.Sitemap = CITY_SLUGS.map((slug) => ({
    url: `${baseUrl}/novostroyki/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Blog
  const blogRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.7 },
    ...ARTICLES.map((a) => ({
      url: `${baseUrl}/blog/${a.slug}`,
      lastModified: a.datePublished ? new Date(a.datePublished) : now,
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
  ];

  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3002";
  let projectRoutes: MetadataRoute.Sitemap = [];

  try {
    const res = await fetch(`${apiUrl}/projects`, {
      next: { revalidate: 600 },
    });
    if (res.ok) {
      const projects = (await res.json()) as ApiProject[];
      projectRoutes = projects.map((p) => ({
        url: `${baseUrl}/catalog/${p.id}`,
        lastModified: p.updatedAt ? new Date(p.updatedAt) : now,
        changeFrequency: "weekly" as const,
        priority: 0.85,
      }));
    }
  } catch {
    /* offline / build without API */
  }

  return [...staticRoutes, ...cityRoutes, ...blogRoutes, ...projectRoutes];
}

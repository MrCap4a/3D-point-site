import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://3-dpoint.ru";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes: Array<{
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }> = [
    { path: "/", changeFrequency: "monthly", priority: 1 },
    { path: "/private", changeFrequency: "monthly", priority: 0.8 },
    { path: "/business", changeFrequency: "monthly", priority: 0.8 },
    { path: "/serial", changeFrequency: "monthly", priority: 0.8 },
    { path: "/portfolio", changeFrequency: "weekly", priority: 0.6 },
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}

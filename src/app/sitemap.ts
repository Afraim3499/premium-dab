import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/entity-facts";
import { allBlogPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;

  const staticRoutes = [
    "/",
    "/product",
    "/availability",
    "/order",
    "/events",
    "/our-story",
    "/faq",
    "/contact",
    "/blog",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency:
      route === "/" || route === "/product" || route === "/blog"
        ? "daily"
        : "weekly",
    priority:
      route === "/"
        ? 1.0
        : route === "/product" || route === "/order"
        ? 0.9
        : route === "/blog"
        ? 0.85
        : 0.7,
  }));

  const blogEntries: MetadataRoute.Sitemap = allBlogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticEntries, ...blogEntries];
}

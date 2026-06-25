import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/entity-facts";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;
  const routes = [
    "",
    "/product",
    "/availability",
    "/order",
    "/events",
    "/our-story",
    "/faq",
    "/contact",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" || route === "/product" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : route === "/product" || route === "/order" ? 0.9 : 0.7,
  }));
}

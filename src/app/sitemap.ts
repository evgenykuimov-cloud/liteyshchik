import type { MetadataRoute } from "next";
import { company } from "@/config/company";
import { categories, products } from "@/data/catalog";
import { pages } from "@/data/pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "catalog", "documents", "request-quote", "privacy", "personal-data-consent", ...Object.keys(pages)];
  return [
    ...routes.map((route) => ({ url: `${company.siteUrl}/${route}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: route === "" ? 1 : .7 })),
    ...categories.map((category) => ({ url: `${company.siteUrl}/catalog/${category.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: .8 })),
    ...products.map((product) => ({ url: `${company.siteUrl}/catalog/${product.categorySlug}/${product.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: .7 })),
  ];
}

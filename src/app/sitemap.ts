import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://fairplaylive.io/",
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://fairplaylive.io/#live-matches",
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: "https://fairplaylive.io/#casino",
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: "https://fairplaylive.io/#about",
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: "https://fairplaylive.io/#why-us",
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: "https://fairplaylive.io/blog",
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: "https://fairplaylive.io/#faq",
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: "https://fairplaylive.io/#bet-big",
      changeFrequency: "daily",
      priority: 0.7,
    },
  ];
}

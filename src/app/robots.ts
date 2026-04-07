import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://plany.com.pl/sitemap.xml",
    host: "https://plany.com.pl",
  };
}

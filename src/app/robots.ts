import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://gecinsider.in";

  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/team"],
      disallow: [],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

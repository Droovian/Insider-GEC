import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://gecinsider.in";

  //   const response = await getAllPosts();
  //   const posts = await response?.map((post) => {
  //     return {
  //       url: `${baseUrl}/post/${post?.id}`,
  //       lastModified: post?.created_at,
  //     };
  //   });

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/team`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    // ...posts
  ];
}

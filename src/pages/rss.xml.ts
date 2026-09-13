import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getPublishedPosts } from "@/lib/blog";
import { blogInfo, personalInfo } from "@/lib/data";

export const GET: APIRoute = async ({ site, url }) => {
  const posts = await getPublishedPosts();

  return rss({
    title: `${blogInfo.title} | ${personalInfo.name}`,
    description: blogInfo.description,
    site: (site ?? url.origin).toString(),
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.id}/`,
    })),
  });
};

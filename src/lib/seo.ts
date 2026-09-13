import type { BlogPost } from "@/lib/blog";
import { personalInfo, workExperience } from "@/lib/data";

export const DEFAULT_SITE_DESCRIPTION = `${personalInfo.name} builds reliable applications, backend systems, data platforms, cloud services, and AI-powered automation.`;

export function absoluteUrl(origin: string, pathname: string): string {
  return new URL(pathname, origin).href;
}

/** Serialize JSON-LD for embedding in a <script> tag without breaking out of it. */
export function serializeJsonLd(
  value: Record<string, unknown> | Record<string, unknown>[],
): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function buildPersonJsonLd(origin: string, imagePath: string): Record<string, unknown> {
  const currentRole = workExperience[0];

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: personalInfo.name,
    email: personalInfo.email,
    url: absoluteUrl(origin, "/"),
    image: absoluteUrl(origin, imagePath),
    sameAs: [personalInfo.github, personalInfo.linkedin],
    description: DEFAULT_SITE_DESCRIPTION,
    ...(currentRole
      ? {
          jobTitle: currentRole.position,
          worksFor: {
            "@type": "Organization",
            name: currentRole.company,
          },
        }
      : {}),
  };
}

export function buildBlogPostingJsonLd(origin: string, post: BlogPost): Record<string, unknown> {
  const postUrl = absoluteUrl(origin, `/blog/${post.id}/`);
  const author = {
    "@type": "Person",
    name: personalInfo.name,
    url: absoluteUrl(origin, "/"),
    sameAs: [personalInfo.github, personalInfo.linkedin],
  };

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.data.title,
    description: post.data.description,
    datePublished: post.data.pubDate.toISOString(),
    ...(post.data.updatedDate ? { dateModified: post.data.updatedDate.toISOString() } : {}),
    author,
    publisher: author,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    url: postUrl,
    image: absoluteUrl(origin, personalInfo.ogImage),
  };
}

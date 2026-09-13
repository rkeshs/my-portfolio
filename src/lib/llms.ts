import type { BlogPost } from "@/lib/blog";
import { awards, education, personalInfo, selectedWork, skills, workExperience } from "@/lib/data";
import { absoluteUrl, DEFAULT_SITE_DESCRIPTION } from "@/lib/seo";

export function buildLlmsTxt(origin: string, posts: BlogPost[]): string {
  const home = absoluteUrl(origin, "/");
  const blog = absoluteUrl(origin, "/blog/");
  const resume = absoluteUrl(origin, personalInfo.resume);
  const experienceAnchor = absoluteUrl(origin, "/#experience");
  const workAnchor = absoluteUrl(origin, "/#work");
  const skillsAnchor = absoluteUrl(origin, "/#skills");
  const awardsAnchor = absoluteUrl(origin, "/#awards");
  const educationAnchor = absoluteUrl(origin, "/#education");
  const currentRole = workExperience[0];
  const educationEntry = education[0];

  const lines: string[] = [
    `# ${personalInfo.name}`,
    `> ${DEFAULT_SITE_DESCRIPTION}`,
    "",
    personalInfo.heroDescription,
    "",
    `This site is the personal portfolio of ${personalInfo.name}: background, selected work, skills, writing, and contact links.`,
  ];

  if (currentRole) {
    lines.push(
      "",
      `Currently ${currentRole.position} at ${currentRole.company} (${currentRole.period}), focused on reliable systems from design through production support.`,
    );
  }

  lines.push(
    "",
    "## Pages",
    `- [Home](${home}): Portfolio overview covering experience, selected work, skills, awards, and education`,
    `- [Blog](${blog}): Writing and notes on software engineering`,
    `- [Resume](${resume}): PDF resume`,
  );

  if (skills.length > 0) {
    lines.push("", "## Skills");

    for (const group of skills) {
      lines.push(`- [${group.label}](${skillsAnchor}): ${group.items.join(", ")}`);
    }
  }

  if (selectedWork.length > 0) {
    lines.push("", "## Selected work");

    for (const project of selectedWork) {
      lines.push(
        `- [${project.title}](${workAnchor}): ${project.summary} Stack: ${project.stack.join(", ")}.`,
      );
    }
  }

  if (workExperience.length > 0) {
    lines.push("", "## Experience");

    for (const job of workExperience) {
      lines.push(
        `- [${job.position} · ${job.company}](${experienceAnchor}): ${job.period}, ${job.location}. Stack: ${job.stack.join(", ")}.`,
      );
    }
  }

  if (educationEntry) {
    const highlights =
      educationEntry.achievements.length > 0 ? ` ${educationEntry.achievements.join(" ")}` : "";

    lines.push(
      "",
      "## Education",
      `- [${educationEntry.degree}](${educationAnchor}): ${educationEntry.institution}, ${educationEntry.location} (${educationEntry.period}).${highlights}`,
    );
  }

  if (awards.length > 0) {
    lines.push("", "## Awards");

    for (const award of awards) {
      lines.push(
        `- [${award.name}](${awardsAnchor}): ${award.position}, ${award.issuer} (${award.date}, ${award.type})`,
      );
    }
  }

  if (posts.length > 0) {
    lines.push("", "## Blog");

    for (const post of posts) {
      lines.push(
        `- [${post.data.title}](${absoluteUrl(origin, `/blog/${post.id}/`)}): ${post.data.description}`,
      );
    }
  }

  lines.push(
    "",
    "## Elsewhere",
    `- [GitHub](${personalInfo.github}): Open-source and personal projects`,
    `- [LinkedIn](${personalInfo.linkedin}): Professional profile`,
    `- [Email](mailto:${personalInfo.email}): Direct contact`,
  );

  return `${lines.join("\n")}\n`;
}

import React from "react";
import { projects } from "@/lib/data";
import { Github, ArrowUpRight } from "lucide-react";
import MotionWrapper from "./MotionWrapper";
import SectionHeading from "./SectionHeading";

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-16 md:py-20 scroll-mt-16">
      <div className="container max-w-4xl mx-auto px-6 md:px-4">
        <MotionWrapper>
          <SectionHeading>Projects</SectionHeading>
        </MotionWrapper>

        <div className="space-y-14">
          {projects.map((project, index) => (
            <MotionWrapper key={project.title} delay={index * 0.1}>
              <article className="grid md:grid-cols-[240px_1fr] gap-x-10 gap-y-5">
                <div>
                  <h3 className="font-display text-xl leading-tight">
                    {project.title}
                  </h3>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 border border-border px-3.5 py-2 text-sm font-medium hover:border-primary hover:text-primary transition-colors group"
                  >
                    <Github className="h-4 w-4" aria-hidden="true" />
                    View on GitHub
                    <ArrowUpRight
                      className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </a>
                </div>
                <ul className="space-y-2.5 text-sm text-muted-foreground">
                  {project.description.map((desc, i) => (
                    <li key={i} className="flex gap-3">
                      <span
                        className="mt-[7px] h-1.5 w-1.5 shrink-0 bg-primary"
                        aria-hidden="true"
                      />
                      <span className="leading-relaxed">{desc}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </MotionWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}

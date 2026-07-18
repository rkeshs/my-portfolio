import { projects } from "@/lib/data";
import { Code2 as Github, ArrowUpRight } from "lucide-react";
import MotionWrapper from "./MotionWrapper";
import SectionHeading from "./SectionHeading";

function ProjectArtwork({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="relative aspect-[4/3] overflow-hidden bg-acid text-ink">
        <span className="absolute -bottom-[0.18em] -left-[0.03em] font-display text-[clamp(12rem,34vw,24rem)] leading-none">
          0
        </span>
        <div className="absolute right-[10%] top-[12%] h-[42%] w-[42%] rounded-full border-[14px] border-ink/20" />
        <div className="absolute right-[18%] top-[20%] h-[26%] w-[26%] rounded-full bg-ember" />
        <div className="absolute right-5 top-5 bg-ink px-3 py-2 font-display text-sm text-white">
          LIVE SYSTEM
        </div>
        <div className="absolute bottom-5 right-5 flex h-20 items-end gap-2" aria-hidden="true">
          {[35, 58, 42, 78, 64].map((height) => (
            <span key={height} className="w-3 bg-coral" style={{ height: `${height}%` }} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-[4/3] overflow-hidden bg-coral text-ink">
      <span className="absolute left-[7%] top-[10%] font-display text-[clamp(4rem,13vw,9rem)] leading-none">
        MIND
      </span>
      <span className="absolute bottom-[8%] right-[7%] font-display text-[clamp(4rem,13vw,9rem)] leading-none text-ink/75">
        CARE
      </span>
      <div className="absolute left-1/2 top-1/2 h-[56%] w-[56%] -translate-x-1/2 -translate-y-1/2 rounded-full border-[12px] border-ink/75" />
      <div className="absolute left-1/2 top-1/2 h-[24%] w-[24%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-acid" />
      <div className="absolute bottom-5 left-5 bg-ink px-3 py-2 font-display text-sm text-white">
        SIGNAL → SUPPORT
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="scroll-mt-16 bg-background py-20 text-foreground md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <MotionWrapper>
          <SectionHeading>Selected Projects</SectionHeading>
        </MotionWrapper>

        <div className="space-y-20 md:space-y-28">
          {projects.map((project, index) => (
            <MotionWrapper key={project.title} delay={index * 0.08}>
              <article className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
                <div className={index % 2 ? "md:order-2" : ""}>
                  <ProjectArtwork index={index} />
                </div>

                <div className={index % 2 ? "md:order-1" : ""}>
                  <p className="mb-3 text-sm font-black text-ember">
                    Built from problem to working system
                  </p>
                  <h3 className="font-display text-[clamp(2.5rem,6vw,4.75rem)] leading-[0.92]">
                    {project.title}
                  </h3>
                  <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                    {project.summary}
                  </p>

                  <ul className="mt-7 space-y-3 text-sm text-muted-foreground">
                    {project.description.map((description) => (
                      <li key={description} className="flex gap-3 leading-relaxed">
                        <span className="mt-[7px] h-2 w-2 shrink-0 bg-coral" aria-hidden="true" />
                        {description}
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-7 flex flex-wrap gap-2" aria-label="Technology stack">
                    {project.stack.map((technology) => (
                      <li
                        key={technology}
                        className="border border-border px-3 py-1.5 text-xs font-bold text-muted-foreground"
                      >
                        {technology}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-8 inline-flex min-h-11 items-center gap-2 bg-foreground px-4 py-2.5 text-sm font-black text-background transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember"
                  >
                    <Github className="h-4 w-4" aria-hidden="true" />
                    Explore the code
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </article>
            </MotionWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}

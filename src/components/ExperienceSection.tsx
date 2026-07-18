import { workExperience } from "@/lib/data";
import TimelineItem from "./TimelineItem";
import MotionWrapper from "./MotionWrapper";
import SectionHeading from "./SectionHeading";

export default function ExperienceSection() {
  return (
    <section id="experience" className="scroll-mt-16 bg-background pb-12 pt-20 md:pb-16 md:pt-28">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <MotionWrapper>
          <SectionHeading>Work Experience</SectionHeading>
        </MotionWrapper>
        <MotionWrapper>
          <p className="mb-12 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            I work across the full product lifecycle: understanding the problem, designing the data,
            building the feature, testing it, shipping it, and supporting it in production.
          </p>
        </MotionWrapper>
        <div>
          {workExperience.map((job, index) => (
            <TimelineItem
              key={job.company + job.period}
              title={job.position}
              subtitle={`${job.company} · ${job.location}`}
              date={job.period}
              isLast={index === workExperience.length - 1}
              index={index}
            >
              <ul className="mt-6 grid gap-3 text-sm text-muted-foreground lg:grid-cols-2">
                {job.achievements.map((achievement) => (
                  <li key={achievement} className="flex gap-3 leading-relaxed">
                    <span className="mt-[7px] h-2 w-2 shrink-0 bg-coral" aria-hidden="true" />
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
              <ul
                className="mt-5 flex flex-wrap gap-2"
                aria-label={`${job.company} technology stack`}
              >
                {job.stack.map((technology) => (
                  <li
                    key={technology}
                    className="border border-border px-3 py-1.5 text-xs font-bold text-muted-foreground"
                  >
                    {technology}
                  </li>
                ))}
              </ul>
            </TimelineItem>
          ))}
        </div>
      </div>
    </section>
  );
}

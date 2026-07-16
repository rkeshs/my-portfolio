import { workExperience } from "@/lib/data";
import TimelineItem from "./TimelineItem";
import MotionWrapper from "./MotionWrapper";
import SectionHeading from "./SectionHeading";

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-16 md:py-20 scroll-mt-16">
      <div className="container max-w-4xl mx-auto px-6 md:px-4">
        <MotionWrapper>
          <SectionHeading>Work Experience</SectionHeading>
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
              <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                {job.achievements.map((achievement, i) => (
                  <li key={i} className="flex gap-3">
                    <span
                      className="mt-[7px] h-1.5 w-1.5 shrink-0 bg-primary"
                      aria-hidden="true"
                    />
                    <span className="leading-relaxed">{achievement}</span>
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

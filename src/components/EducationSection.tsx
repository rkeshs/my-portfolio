import { education } from "@/lib/data";
import MotionWrapper from "./MotionWrapper";
import SectionHeading from "./SectionHeading";

export default function EducationSection() {
  return (
    <section id="education" className="py-16 md:py-20 scroll-mt-16">
      <div className="container max-w-4xl mx-auto px-6 md:px-4">
        <MotionWrapper>
          <SectionHeading>Education</SectionHeading>
        </MotionWrapper>

        <div className="space-y-10">
          {education.map((edu) => (
            <MotionWrapper key={edu.institution}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h3 className="text-lg font-semibold">{edu.degree}</h3>
                <p className="text-sm text-muted-foreground tabular-nums shrink-0">
                  {edu.period}
                </p>
              </div>
              <p className="text-sm font-medium text-primary mt-1">
                {edu.institution} · {edu.location}
              </p>

              {edu.achievements && edu.achievements.length > 0 && (
                <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                  {edu.achievements.map((achievement, i) => (
                    <li key={i} className="flex gap-3">
                      <span
                        className="mt-[7px] h-1.5 w-1.5 shrink-0 bg-primary"
                        aria-hidden="true"
                      />
                      <span className="leading-relaxed">{achievement}</span>
                    </li>
                  ))}
                </ul>
              )}
            </MotionWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}

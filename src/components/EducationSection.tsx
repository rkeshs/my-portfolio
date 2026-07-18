import { education } from "@/lib/data";
import MotionWrapper from "./MotionWrapper";
import SectionHeading from "./SectionHeading";

export default function EducationSection() {
  return (
    <section id="education" className="scroll-mt-16 bg-background py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <MotionWrapper>
          <SectionHeading>Where It Started</SectionHeading>
        </MotionWrapper>

        <div>
          {education.map((edu) => (
            <MotionWrapper key={edu.institution}>
              <div className="grid gap-8 border-b-2 border-foreground py-8 md:grid-cols-[1.15fr_0.85fr] md:py-12">
                <div>
                  <p className="font-display text-xl text-ember">{edu.period}</p>
                  <h3 className="mt-3 max-w-xl text-3xl font-black tracking-tight md:text-5xl">
                    {edu.degree}
                  </h3>
                  <p className="mt-4 max-w-lg font-semibold text-muted-foreground">
                    {edu.institution} · {edu.location}
                  </p>
                </div>

                {edu.achievements && edu.achievements.length > 0 && (
                  <ul className="space-y-4 md:pt-2">
                    {edu.achievements.map((achievement) => (
                      <li key={achievement} className="flex gap-3 leading-relaxed text-muted-foreground">
                        <span className="mt-2 h-2 w-2 shrink-0 bg-ember" aria-hidden="true" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </MotionWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}

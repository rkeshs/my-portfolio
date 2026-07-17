import { skills } from "@/lib/data";
import MotionWrapper from "./MotionWrapper";
import SectionHeading from "./SectionHeading";

export default function SkillsSection() {
  return (
    <section id="skills" className="scroll-mt-16 bg-coral py-20 text-ink md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <MotionWrapper>
          <SectionHeading>Skills</SectionHeading>
        </MotionWrapper>

        <div className="divide-y divide-ink/30 border-y-2 border-ink">
          {skills.map(({ label, items }, index) => (
            <MotionWrapper key={label} delay={index * 0.05}>
              <div className="grid gap-2 py-5 md:grid-cols-[180px_1fr] md:gap-8 md:py-6">
                <h3 className="text-sm font-black">
                  {label}
                </h3>
                <ul className="flex flex-wrap gap-x-3 gap-y-2 font-display text-xl leading-tight md:text-2xl">
                  {items.map((skill) => (
                    <li
                      key={skill}
                      className="whitespace-nowrap after:ml-3 after:text-sun after:content-['/'] last:after:hidden"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </MotionWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}

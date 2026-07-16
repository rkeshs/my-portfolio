import { skills } from "@/lib/data";
import MotionWrapper from "./MotionWrapper";
import SectionHeading from "./SectionHeading";

const categories: { label: string; items: string[] }[] = [
  { label: "Languages", items: skills.programmingLanguages },
  { label: "Frontend", items: skills.frontendDevelopment },
  { label: "Backend", items: skills.backendDevelopment },
  { label: "Database & Storage", items: skills.databaseAndStorage },
  { label: "Cloud & DevOps", items: skills.cloudAndDevOps },
  { label: "Tools & Services", items: skills.toolsAndServices },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-16 md:py-20 scroll-mt-16">
      <div className="container max-w-4xl mx-auto px-6 md:px-4">
        <MotionWrapper>
          <SectionHeading>Skills</SectionHeading>
        </MotionWrapper>

        <div className="border-y border-border divide-y divide-border">
          {categories.map(({ label, items }, index) => (
            <MotionWrapper key={label} delay={index * 0.05}>
              <div className="grid md:grid-cols-[200px_1fr] gap-x-8 gap-y-1 py-5">
                <h3 className="text-sm font-semibold text-muted-foreground pt-0.5">
                  {label}
                </h3>
                <ul className="flex flex-wrap gap-x-2 gap-y-1 font-medium leading-relaxed">
                  {items.map((skill) => (
                    <li
                      key={skill}
                      className="whitespace-nowrap after:ml-2 after:text-primary after:content-['·'] last:after:hidden"
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

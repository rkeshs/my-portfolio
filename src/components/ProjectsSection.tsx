import { selectedWork } from "@/lib/data";
import MotionWrapper from "./MotionWrapper";
import SectionHeading from "./SectionHeading";

function ProjectArtwork({ index }: { index: number }) {
  if (index === 1) {
    return (
      <div className="relative aspect-4/3 overflow-hidden bg-acid text-ink" aria-hidden="true">
        <div className="absolute left-[9%] top-[11%] h-[72%] w-[53%] bg-coral" />
        <div className="absolute left-[6%] top-[8%] h-[72%] w-[53%] border-2 border-ink bg-[#fffdf5] p-[7%]">
          <div className="font-display text-[clamp(1.05rem,4vw,2rem)] leading-none">EMPLOYEE</div>
          <div className="mt-[10%] h-[3%] w-[72%] bg-ink/25" />
          <div className="mt-[6%] flex items-center gap-[5%]">
            <span className="h-[clamp(0.55rem,2vw,0.9rem)] w-[clamp(0.55rem,2vw,0.9rem)] border-2 border-ink bg-coral" />
            <span className="h-1 w-[62%] bg-ink/65" />
          </div>
          <div className="mt-[6%] flex items-center gap-[5%]">
            <span className="h-[clamp(0.55rem,2vw,0.9rem)] w-[clamp(0.55rem,2vw,0.9rem)] border-2 border-ink bg-acid" />
            <span className="h-1 w-[76%] bg-ink/65" />
          </div>
          <div className="mt-[6%] flex items-center gap-[5%]">
            <span className="h-[clamp(0.55rem,2vw,0.9rem)] w-[clamp(0.55rem,2vw,0.9rem)] border-2 border-ink bg-coral" />
            <span className="h-1 w-[52%] bg-ink/65" />
          </div>
          <div className="absolute bottom-[8%] left-[13%] bg-ink px-[6%] py-[3%] font-display text-[clamp(0.65rem,2.4vw,0.95rem)] text-white">
            VALIDATED
          </div>
        </div>
        <div className="absolute left-[61%] top-1/2 h-1 w-[10%] -translate-y-1/2 bg-ink" />
        <div className="absolute left-[69%] top-1/2 h-0 w-0 -translate-y-1/2 border-y-[8px] border-l-[12px] border-y-transparent border-l-ink" />
        <div className="absolute right-[6%] top-[17%] grid w-[21%] gap-[10%]">
          {["API", "PDF", "CSV"].map((format, formatIndex) => (
            <div
              key={format}
              className={`border-2 border-ink px-[8%] py-[16%] text-center font-display text-[clamp(0.7rem,2.7vw,1.15rem)] ${
                formatIndex === 0 ? "bg-ink text-white" : "bg-coral"
              }`}
            >
              {format}
            </div>
          ))}
        </div>
        <div className="absolute bottom-[6%] right-[6%] font-display text-[clamp(0.7rem,2.5vw,1rem)]">
          FORM → INSURER
        </div>
      </div>
    );
  }

  if (index === 2) {
    return (
      <div className="relative aspect-4/3 overflow-hidden bg-coral text-ink" aria-hidden="true">
        <div className="absolute left-[7%] top-[9%] h-[68%] w-[76%] border-2 border-ink bg-[#fffdf5]">
          <div className="flex h-[14%] items-center gap-[2%] border-b-2 border-ink px-[4%]">
            <span className="h-[clamp(0.35rem,1.4vw,0.6rem)] w-[clamp(0.35rem,1.4vw,0.6rem)] rounded-full bg-coral" />
            <span className="h-[clamp(0.35rem,1.4vw,0.6rem)] w-[clamp(0.35rem,1.4vw,0.6rem)] rounded-full bg-acid" />
            <span className="h-[clamp(0.35rem,1.4vw,0.6rem)] w-[clamp(0.35rem,1.4vw,0.6rem)] rounded-full bg-ink" />
            <span className="ml-auto font-display text-[clamp(0.6rem,2.2vw,0.9rem)]">MY STORE</span>
          </div>
          <div className="grid h-[86%] grid-cols-2 gap-[6%] p-[7%]">
            <div className="border-2 border-ink bg-acid p-[8%]">
              <div className="aspect-square bg-ink/15" />
              <div className="mt-[12%] h-1 w-[72%] bg-ink" />
              <div className="mt-[8%] h-1 w-[45%] bg-ink/40" />
            </div>
            <div className="border-2 border-ink bg-coral/60 p-[8%]">
              <div className="aspect-square bg-ink/15" />
              <div className="mt-[12%] h-1 w-[68%] bg-ink" />
              <div className="mt-[8%] h-1 w-[52%] bg-ink/40" />
            </div>
          </div>
        </div>
        <div className="absolute bottom-[7%] right-[5%] w-[43%] border-2 border-ink bg-ink p-[4%] text-white shadow-[-8px_8px_0_0_#b4f000]">
          <div className="flex items-center justify-between">
            <span className="font-display text-[clamp(0.7rem,2.5vw,1rem)]">PAYMENT</span>
            <span className="flex h-[clamp(1.1rem,4vw,1.7rem)] w-[clamp(1.1rem,4vw,1.7rem)] items-center justify-center rounded-full bg-coral font-bold text-ink">
              ✓
            </span>
          </div>
          <div className="mt-[8%] h-1 w-full bg-white/30" />
          <div className="mt-[6%] h-1 w-[62%] bg-white/30" />
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative aspect-4/3 overflow-hidden bg-hero-background text-hero-foreground"
      aria-hidden="true"
    >
      <div className="absolute left-[7%] top-[12%] h-[62%] w-[58%] border-2 border-acid bg-coral" />
      <div className="absolute left-[11%] top-[8%] h-[62%] w-[58%] border-2 border-hero-foreground bg-ink">
        <div className="absolute left-1/2 top-[44%] flex h-[clamp(3rem,12vw,5.4rem)] w-[clamp(3rem,12vw,5.4rem)] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-acid">
          <span className="ml-[8%] h-0 w-0 border-y-[12px] border-l-[20px] border-y-transparent border-l-acid" />
        </div>
        <div className="absolute bottom-[10%] left-[8%] right-[8%] flex h-[18%] items-end gap-[3%]">
          {[35, 70, 48, 88, 58, 76, 42, 65].map((height, barIndex) => (
            <span
              key={`${height}-${barIndex}`}
              className="flex-1 bg-coral"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>
      <div className="absolute right-[5%] top-[9%] grid w-[23%] gap-2 font-display text-[clamp(0.58rem,2.1vw,0.85rem)] text-ink">
        <div className="bg-acid px-[8%] py-[12%] text-center">INPUT</div>
        <div className="text-center text-acid">↓</div>
        <div className="bg-coral px-[8%] py-[12%] text-center">RENDER</div>
        <div className="text-center text-acid">↓</div>
        <div className="bg-[#fffdf5] px-[8%] py-[12%] text-center">PUBLISH</div>
      </div>
      <div className="absolute bottom-[7%] right-[5%] font-display text-[clamp(0.7rem,2.5vw,1rem)] text-acid">
        VIDEO WORKFLOW
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  return (
    <section
      id="work"
      className="scroll-mt-16 bg-background pb-20 pt-12 text-foreground md:pb-28 md:pt-16"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <MotionWrapper>
          <SectionHeading>Work</SectionHeading>
        </MotionWrapper>

        <MotionWrapper>
          <p className="mb-12 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Examples of production systems I have built and supported as part of company teams.
            Details are intentionally general because the work and source code are private.
          </p>
        </MotionWrapper>

        <div className="space-y-20 md:space-y-28">
          {selectedWork.map((project, index) => (
            <MotionWrapper key={project.title} delay={index * 0.08}>
              <article className="grid items-center gap-8 md:grid-cols-2 md:items-start md:gap-14">
                <div className={index % 2 ? "md:order-2" : ""}>
                  <ProjectArtwork index={index} />
                </div>

                <div className={index % 2 ? "md:order-1" : ""}>
                  <p className="mb-3 text-sm font-black uppercase tracking-wide text-ember">
                    {project.context}
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
                </div>
              </article>
            </MotionWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}

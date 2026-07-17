import { awards } from "@/lib/data";
import MotionWrapper from "./MotionWrapper";
import SectionHeading from "./SectionHeading";

export default function AwardsSection() {
  return (
    <section id="awards" className="scroll-mt-16 bg-acid py-20 text-ink md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <MotionWrapper>
          <SectionHeading>Things We Won</SectionHeading>
        </MotionWrapper>

        <div className="border-y-2 border-ink divide-y divide-ink/35">
          {awards.map((award, index) => (
            <MotionWrapper key={award.name + award.date} delay={index * 0.04}>
              <div className="grid gap-3 py-5 md:grid-cols-[1fr_auto] md:items-center md:gap-8 md:py-6">
                <div className="min-w-0">
                  <h3 className="text-lg font-black md:text-xl">{award.name}</h3>
                  <p className="mt-0.5 text-sm text-ink/65">
                    {award.issuer}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-sm md:justify-end">
                  <span className="font-semibold text-ink/60">{award.type}</span>
                  <span className="font-semibold tabular-nums text-ink/60">
                    {award.date}
                  </span>
                  <span className="bg-ink px-3 py-1.5 font-black text-white md:min-w-40 md:text-center">
                    {award.position}
                  </span>
                </div>
              </div>
            </MotionWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}

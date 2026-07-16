import React from "react";
import { awards } from "@/lib/data";
import MotionWrapper from "./MotionWrapper";
import SectionHeading from "./SectionHeading";

export default function AwardsSection() {
  return (
    <section id="awards" className="py-16 md:py-20 scroll-mt-16">
      <div className="container max-w-4xl mx-auto px-6 md:px-4">
        <MotionWrapper>
          <SectionHeading>Awards</SectionHeading>
        </MotionWrapper>

        <div className="border-y border-border divide-y divide-border">
          {awards.map((award, index) => (
            <MotionWrapper key={award.name + award.date} delay={index * 0.04}>
              <div className="py-4 flex flex-col md:flex-row md:items-baseline gap-x-8 gap-y-1.5">
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold">{award.name}</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {award.issuer}
                  </p>
                </div>
                <div className="flex items-baseline gap-x-6 text-sm shrink-0">
                  <span className="text-muted-foreground">{award.type}</span>
                  <span className="text-muted-foreground tabular-nums">
                    {award.date}
                  </span>
                  <span className="bg-foreground text-background font-semibold px-2 py-0.5 md:min-w-36 md:text-center">
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

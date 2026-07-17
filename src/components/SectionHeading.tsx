interface SectionHeadingProps {
  children: string;
}

export default function SectionHeading({ children }: SectionHeadingProps) {
  return (
    <div className="mb-10 flex items-end justify-between gap-6 border-b-2 border-current pb-4 md:mb-14">
      <h2 className="font-display text-[clamp(2.7rem,7vw,5rem)] leading-[0.9]">
        {children}
      </h2>
      <span
        className="pb-1 font-display text-4xl leading-none opacity-25 md:text-6xl"
        aria-hidden="true"
      >
        ↘
      </span>
    </div>
  );
}

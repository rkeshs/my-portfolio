interface SectionHeadingProps {
  children: string;
}

export default function SectionHeading({ children }: SectionHeadingProps) {
  return (
    <div className="flex items-center gap-4 mb-12">
      <span className="h-3 w-3 bg-primary shrink-0" aria-hidden="true" />
      <h2 className="font-display text-3xl md:text-4xl">{children}</h2>
      <span className="h-[3px] flex-1 bg-foreground" aria-hidden="true" />
    </div>
  );
}

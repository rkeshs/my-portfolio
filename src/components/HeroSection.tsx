import { personalInfo } from "@/lib/data";
import {
  DocumentAttachmentIcon,
  GithubIcon,
  Linkedin01Icon,
  Mail01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { domAnimation, LazyMotion, m, useReducedMotion } from "framer-motion";
import type { PointerEvent as ReactPointerEvent } from "react";
import HeroCanvas from "./HeroCanvas";

const EASE_OUT_QUINT = [0.22, 1, 0.36, 1] as const;

const contactLinks = [
  {
    label: "View resume",
    href: personalInfo.resume,
    icon: DocumentAttachmentIcon,
    external: true,
    primary: true,
  },
  { label: "Email", href: `mailto:${personalInfo.email}`, icon: Mail01Icon },
  { label: "GitHub", href: personalInfo.github, icon: GithubIcon, external: true },
  {
    label: "LinkedIn",
    href: personalInfo.linkedin,
    icon: Linkedin01Icon,
    external: true,
  },
];

const movePortraitReveal = (event: ReactPointerEvent<HTMLDivElement>) => {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--reveal-opacity", "1");
  event.currentTarget.style.setProperty("--reveal-x", `${event.clientX - rect.left}px`);
  event.currentTarget.style.setProperty("--reveal-y", `${event.clientY - rect.top}px`);
};

const hidePortraitReveal = (event: ReactPointerEvent<HTMLDivElement>) => {
  event.currentTarget.style.setProperty("--reveal-opacity", "0");
};

export default function HeroSection() {
  const reduceMotion = useReducedMotion();
  const reveal = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0.15 : 0.75,
        ease: EASE_OUT_QUINT,
      },
    },
  };

  return (
    <LazyMotion features={domAnimation}>
      <section className="relative isolate min-h-[calc(100svh-3.5rem)] overflow-hidden bg-hero-background text-hero-foreground">
        <HeroCanvas />
        <div className="hero-scrim absolute inset-0" aria-hidden="true" />

        <m.div
          className="relative mx-auto grid min-h-[calc(100svh-3.5rem)] max-w-6xl items-center gap-9 px-6 py-10 md:grid-cols-[1.3fr_0.7fr] md:gap-14 md:px-8 md:py-16"
          initial="hidden"
          animate="visible"
          transition={{
            staggerChildren: reduceMotion ? 0 : 0.09,
            delayChildren: reduceMotion ? 0 : 0.08,
          }}
        >
          <div className="min-w-0">
            <m.div
              className="mb-5 flex items-center gap-3 text-sm font-semibold text-hero-foreground/80"
              variants={reveal}
            >
              <span className="h-3 w-3 bg-coral" aria-hidden="true" />
              Software Engineer
            </m.div>

            <m.h1
              className="font-display whitespace-nowrap text-[clamp(2.5rem,11vw,5.5rem)] leading-[0.88] tracking-[0.01em] md:text-[clamp(3.8rem,6.5vw,5.5rem)]"
              variants={reveal}
            >
              Rishikesh <span className="text-coral">S.</span>
            </m.h1>

            <m.p
              className="mt-6 max-w-[55ch] text-base leading-relaxed text-hero-foreground/82 md:text-lg"
              variants={reveal}
            >
              {personalInfo.heroDescription}
            </m.p>

            <m.div className="mt-7 flex flex-wrap gap-2.5" variants={reveal}>
              {contactLinks.map(({ label, href, icon: Icon, external, primary }) => (
                <a
                  key={label}
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={`group inline-flex min-h-11 items-center gap-2 px-4 py-2.5 text-sm font-bold transition-transform duration-300 ease-out hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hero-foreground ${
                    primary
                      ? "bg-coral text-ink"
                      : "border border-hero-foreground/45 bg-hero-background/30 text-hero-foreground hover:border-hero-foreground hover:bg-hero-foreground hover:text-hero-background"
                  }`}
                >
                  <HugeiconsIcon
                    icon={Icon}
                    className="h-4 w-4"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                  {label}
                </a>
              ))}
            </m.div>
          </div>

          <m.div className="relative mx-auto w-44 md:w-full md:max-w-[330px]" variants={reveal}>
            <div
              className="absolute -inset-3 translate-x-5 translate-y-5 bg-coral/85"
              aria-hidden="true"
            />
            <div
              className="absolute -inset-3 -translate-x-5 -translate-y-5 border border-hero-foreground/45"
              aria-hidden="true"
            />
            <div
              className="portrait-reveal relative aspect-square overflow-hidden"
              onPointerMove={movePortraitReveal}
              onPointerLeave={hidePortraitReveal}
            >
              <img
                src={personalInfo.profilePicture}
                alt={`Portrait of ${personalInfo.name}`}
                width="460"
                height="460"
                decoding="async"
                fetchPriority="high"
                draggable={false}
                className="pointer-events-none h-full w-full select-none object-cover grayscale contrast-110"
              />
              <img
                src={personalInfo.profilePicture}
                alt=""
                width="460"
                height="460"
                decoding="async"
                aria-hidden="true"
                draggable={false}
                className="portrait-reveal-color pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
              />
            </div>
          </m.div>
        </m.div>
      </section>
    </LazyMotion>
  );
}

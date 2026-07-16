import { personalInfo } from "@/lib/data";
import { Mail, Github, MapPin, Linkedin } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import HeroCanvas from "./HeroCanvas";

const EASE_OUT_QUINT = [0.22, 1, 0.36, 1] as const;

const contactLinks = [
  {
    label: "Email",
    href: `mailto:${personalInfo.email}`,
    icon: Mail,
    external: false,
  },
  {
    label: "GitHub",
    href: personalInfo.github,
    icon: Github,
    external: true,
  },
  {
    label: "LinkedIn",
    href: personalInfo.linkedin,
    icon: Linkedin,
    external: true,
  },
];

export default function HeroSection() {
  const reduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.09,
        delayChildren: reduceMotion ? 0 : 0.1,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0.2 : 0.7, ease: EASE_OUT_QUINT },
    },
  };

  return (
    <section className="relative bg-foreground text-background overflow-hidden">
      <HeroCanvas />
      <div className="relative container max-w-4xl mx-auto px-6 md:px-4 pt-16 pb-16 md:pt-24 md:pb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex flex-col-reverse md:flex-row md:items-end md:justify-between gap-12 md:gap-8">
            <div className="min-w-0">
              <motion.p
                className="font-display text-base md:text-lg text-background/70 mb-4"
                variants={childVariants}
              >
                Software Engineer
              </motion.p>
              <motion.h1
                className="font-display text-[clamp(3rem,11vw,6rem)] leading-[0.95]"
                variants={childVariants}
              >
                {personalInfo.name}.
              </motion.h1>
              <motion.p
                className="mt-6 flex items-center gap-2 text-sm text-background/80"
                variants={childVariants}
              >
                <MapPin className="h-4 w-4" aria-hidden="true" />
                {personalInfo.location}
              </motion.p>
            </div>

            <motion.div
              className="shrink-0 self-center md:self-auto"
              variants={childVariants}
            >
              <div className="relative group cursor-crosshair">
                <div
                  className="absolute -bottom-3 -right-3 h-full w-full bg-background transition-transform duration-300 ease-out group-hover:translate-x-1.5 group-hover:translate-y-1.5"
                  aria-hidden="true"
                />
                <img
                  src={personalInfo.profilePicture}
                  alt={`Portrait of ${personalInfo.name}`}
                  className="relative w-44 md:w-56 aspect-square object-cover grayscale contrast-110 transition-all duration-500 ease-out group-hover:grayscale-0 group-hover:contrast-100 group-hover:-translate-x-1 group-hover:-translate-y-1"
                />
              </div>
            </motion.div>
          </div>

          <motion.p
            className="mt-12 max-w-[65ch] leading-relaxed text-background/80"
            variants={childVariants}
          >
            {personalInfo.heroDescription}
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap gap-3"
            variants={childVariants}
          >
            {contactLinks.map(({ label, href, icon: Icon, external }) => (
              <a
                key={label}
                href={href}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="inline-flex items-center gap-2 border border-background/50 px-4 py-2 text-sm font-medium hover:bg-background hover:border-background hover:text-foreground transition-colors"
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {label}
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

import { personalInfo } from "@/lib/data";
import { GithubIcon, Linkedin01Icon, Mail01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export default function Footer() {
  return (
    <footer className="bg-coral py-12 text-ink md:py-16">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div className="flex flex-col gap-8 border-t-2 border-ink pt-7 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-4xl md:text-6xl">{personalInfo.name}</p>
            <p className="mt-2 text-sm font-semibold text-ink/70">
              Building reliable products from idea to production.
            </p>
            <p className="mt-5 text-xs text-ink/60">&copy; {new Date().getFullYear()}</p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={`mailto:${personalInfo.email}`}
              className="inline-flex h-11 w-11 items-center justify-center border border-ink/50 text-ink transition-colors hover:bg-ink hover:text-white"
              aria-label="Email"
            >
              <HugeiconsIcon
                icon={Mail01Icon}
                className="h-4 w-4"
                strokeWidth={2}
                aria-hidden="true"
              />
            </a>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 w-11 items-center justify-center border border-ink/50 text-ink transition-colors hover:bg-ink hover:text-white"
              aria-label="GitHub"
            >
              <HugeiconsIcon
                icon={GithubIcon}
                className="h-4 w-4"
                strokeWidth={2}
                aria-hidden="true"
              />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 w-11 items-center justify-center border border-ink/50 text-ink transition-colors hover:bg-ink hover:text-white"
              aria-label="LinkedIn"
            >
              <HugeiconsIcon
                icon={Linkedin01Icon}
                className="h-4 w-4"
                strokeWidth={2}
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

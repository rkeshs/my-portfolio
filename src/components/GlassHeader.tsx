import ThemeToggle from "./ui/theme-toggle";
import { personalInfo } from "@/lib/data";
import {
  ArrowUpRight01Icon,
  Cancel01Icon,
  DocumentAttachmentIcon,
  Menu01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";

const NAV_ITEMS = [
  { label: "Experience", href: "/#experience" },
  { label: "Work", href: "/#work" },
  { label: "Skills", href: "/#skills" },
  { label: "Awards", href: "/#awards" },
  { label: "Education", href: "/#education" },
  { label: "Blog", href: "/blog/" },
] as const;

export default function GlassHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="w-full border-b border-border bg-background text-foreground">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6 md:px-8">
        <a
          className="group flex min-h-11 items-center gap-2.5 font-display text-sm tracking-wide"
          href="/"
        >
          <span
            className="h-3 w-3 shrink-0 bg-coral transition-transform duration-300 group-hover:rotate-45"
            aria-hidden="true"
          />
          {personalInfo.name}
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="flex min-h-11 items-center px-1.5 text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1 text-foreground">
          <a
            href={personalInfo.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden min-h-10 items-center gap-2 border border-foreground/35 px-3 text-sm font-bold text-muted-foreground transition-colors hover:border-foreground hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground md:inline-flex"
          >
            <HugeiconsIcon
              icon={DocumentAttachmentIcon}
              className="h-4 w-4"
              strokeWidth={2}
              aria-hidden="true"
            />
            Resume
          </a>
          <ThemeToggle />

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center text-foreground md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <HugeiconsIcon
              icon={isMenuOpen ? Cancel01Icon : Menu01Icon}
              size={20}
              strokeWidth={2}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        aria-hidden={!isMenuOpen}
        inert={!isMenuOpen}
        className={`grid bg-coral text-ink transition-[grid-template-rows,opacity] duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none md:hidden ${
          isMenuOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-0 px-6 py-4 font-display text-3xl">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="flex min-h-14 items-center border-b border-ink/30 text-ink transition-transform hover:translate-x-2"
                onClick={toggleMenu}
              >
                {item.label}
              </a>
            ))}
            <a
              href={personalInfo.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-14 items-center justify-between border-b border-ink/30 text-ink transition-transform hover:translate-x-2"
              onClick={toggleMenu}
            >
              <span>Resume</span>
              <span className="flex items-center gap-1.5 bg-ink px-2.5 py-1.5 font-sans text-xs font-black tracking-normal text-white">
                PDF
                <HugeiconsIcon
                  icon={ArrowUpRight01Icon}
                  className="h-3.5 w-3.5"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </span>
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}

import ThemeToggle from "./ui/theme-toggle";
import { personalInfo } from "@/lib/data";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const NAV_ITEMS = [
  "experience",
  "skills",
  "projects",
  "awards",
  "education",
] as const;

export default function GlassHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();

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
              key={item}
              href={`#${item}`}
              className="flex min-h-11 items-center px-1.5 text-muted-foreground transition-colors hover:text-foreground capitalize"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1 text-foreground">
          <ThemeToggle />

          {/* Mobile Menu Button */}
          <button
            className="inline-flex h-11 w-11 items-center justify-center text-foreground md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="overflow-hidden bg-coral text-ink md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: reduceMotion ? 0.05 : 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <nav className="mx-auto flex max-w-6xl flex-col gap-0 px-6 py-4 font-display text-3xl">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  className="flex min-h-14 items-center border-b border-ink/30 text-ink transition-transform hover:translate-x-2 capitalize"
                  onClick={toggleMenu}
                >
                  {item}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

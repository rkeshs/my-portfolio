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
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur-sm">
      <div className="container max-w-4xl mx-auto px-6 md:px-4 h-14 flex justify-between items-center">
        <a
          className="flex min-h-11 items-center gap-2.5 font-display text-sm tracking-wide"
          href="/"
        >
          <span
            className="h-2.5 w-2.5 bg-primary shrink-0"
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
              className="flex min-h-11 items-center px-1.5 text-muted-foreground hover:text-primary transition-colors capitalize"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1">
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
            className="md:hidden overflow-hidden border-t border-border bg-background"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: reduceMotion ? 0.05 : 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <nav className="flex flex-col px-6 py-4 gap-1 text-sm font-medium">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  className="flex min-h-11 items-center text-muted-foreground hover:text-primary transition-colors capitalize"
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

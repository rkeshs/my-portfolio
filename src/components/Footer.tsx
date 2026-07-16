import { personalInfo } from "@/lib/data";
import {
  BriefcaseBusiness as Linkedin,
  Code2 as Github,
  Mail,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-10 mt-8">
      <div className="container max-w-4xl mx-auto px-6 md:px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="flex items-center gap-2.5 text-sm">
            <span
              className="h-2 w-2 bg-background inline-block shrink-0"
              aria-hidden="true"
            />
            &copy; {new Date().getFullYear()} {personalInfo.name}
          </p>
          <div className="flex items-center gap-1">
            <a
              href={`mailto:${personalInfo.email}`}
              className="inline-flex h-11 w-11 items-center justify-center text-background/70 hover:text-background transition-colors"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 w-11 items-center justify-center text-background/70 hover:text-background transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 w-11 items-center justify-center text-background/70 hover:text-background transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

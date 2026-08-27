import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  const commitHash = "e2c8a9f";
  return (
    <footer className="border-t border-border-strong bg-surface py-12 text-mono text-xs text-muted-foreground">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-6 px-6 md:px-10 sm:flex-row">
        <div className="flex flex-col items-center gap-1 sm:items-start">
          <div className="flex items-center gap-2 text-foreground font-medium">
            <span>Bryant Iverson Melliza</span>
            <span className="text-border-strong">/</span>
            <span className="text-[10px] text-signal uppercase tracking-wider">
              Full-Stack & AI Systems Architect
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground">
            Engineered with React 19, Vite, TanStack Router & Tailwind CSS.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/brybryson"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 hover:text-foreground transition"
          >
            <Github className="h-3.5 w-3.5" />
            <span>github</span>
          </a>
          <a
            href="https://www.linkedin.com/in/bryant-iverson-melliza-6759b8292"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 hover:text-foreground transition"
          >
            <Linkedin className="h-3.5 w-3.5" />
            <span>linkedin</span>
          </a>
          <a
            href="mailto:bryantiversonmelliza03@gmail.com"
            className="flex items-center gap-1.5 hover:text-foreground transition"
          >
            <Mail className="h-3.5 w-3.5" />
            <span>email</span>
          </a>
        </div>

        <div className="flex items-center gap-3 text-[10.5px]">
          <span className="inline-flex items-center gap-1 rounded border border-border px-1.5 py-0.5 bg-background">
            rev:{commitHash}
          </span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}

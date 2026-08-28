import React from "react";
import { ArrowUpRight, Download, Github, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import { SectionLabel } from "@/components/common/SectionLabel";

export function ContactSection() {
  return (
    <section id="contact" className="py-20">
      <SectionLabel index="04" label="contact" hint="channels & connect" />

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-[1.4fr_1fr]">
        {/* Left macOS Box — CONTACT.EXE */}
        <div className="overflow-hidden rounded-sm border border-border-strong bg-card shadow-sm">
          <div className="flex items-center gap-4 border-b border-border bg-surface-2 px-4 py-2">
            <div className="flex gap-1.5 shrink-0">
              <div className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
            </div>
            <div className="flex items-center gap-2">
              <Send className="h-3 w-3 text-signal" />
              <span className="text-mono text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
                CONTACT.EXE
              </span>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <h3 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Let's build something.
            </h3>
            <p className="mt-2.5 max-w-lg text-sm text-muted-foreground leading-relaxed">
              Open to Web Developer, Frontend, Full-Stack, and AI Automation roles — full-time,
              contract, or freelance.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="mailto:bryantiversonmelliza03@gmail.com"
                className="inline-flex items-center gap-2 rounded-sm border border-foreground bg-foreground px-4 py-2.5 text-mono text-xs uppercase tracking-wider text-background transition hover:bg-signal hover:border-signal hover:text-white shadow-sm font-semibold"
              >
                <Mail className="h-3.5 w-3.5" /> email me
              </a>
              <a
                href="https://bryant-melliza.vercel.app/resume/Bryant_Melliza_Resume.pdf"
                target="_blank"
                rel="noreferrer"
                download
                className="inline-flex items-center gap-2 rounded-sm border border-border-strong bg-surface px-4 py-2.5 text-mono text-xs uppercase tracking-wider text-foreground transition hover:border-signal hover:text-signal shadow-sm font-semibold"
              >
                <Download className="h-3.5 w-3.5" /> download resume
              </a>
            </div>
          </div>
        </div>

        {/* Right Contact Details List */}
        <ul className="grid grid-cols-1 gap-2.5 text-mono text-[12.5px]">
          <ContactRow
            icon={<Mail className="h-3.5 w-3.5" />}
            label="email"
            href="mailto:bryantiversonmelliza03@gmail.com"
          >
            bryantiversonmelliza03@gmail.com
          </ContactRow>
          <ContactRow
            icon={<Phone className="h-3.5 w-3.5" />}
            label="phone"
            href="tel:+639398170375"
          >
            +63 939 817 0375
          </ContactRow>
          <ContactRow icon={<MapPin className="h-3.5 w-3.5" />} label="location">
            Caloocan City, PH
          </ContactRow>
          <ContactRow
            icon={<Github className="h-3.5 w-3.5" />}
            label="github"
            href="https://github.com/brybryson"
          >
            brybryson
          </ContactRow>
          <ContactRow
            icon={<Linkedin className="h-3.5 w-3.5" />}
            label="linkedin"
            href="https://www.linkedin.com/in/bryant-iverson-melliza-6759b8292"
          >
            Bryant Iverson Melliza
          </ContactRow>
        </ul>
      </div>
    </section>
  );
}

function ContactRow({
  icon,
  label,
  href,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  href?: string;
  children: React.ReactNode;
}) {
  const content = (
    <li className="flex items-center gap-3 rounded-sm border border-border bg-card px-3 py-2.5 transition-all hover:border-signal/60 group cursor-pointer shadow-sm">
      <span className="text-signal group-hover:scale-110 transition-transform">{icon}</span>
      <span className="w-16 shrink-0 text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <span className="truncate text-foreground font-medium group-hover:text-signal transition-colors flex items-center gap-1.5 min-w-0">
        <span className="truncate">{children}</span>
        {href && (
          <ArrowUpRight className="h-3 w-3 shrink-0 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        )}
      </span>
    </li>
  );

  if (href) {
    const isExternal = href.startsWith("http");
    return (
      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noreferrer" : undefined}
        className="block"
      >
        {content}
      </a>
    );
  }

  return content;
}

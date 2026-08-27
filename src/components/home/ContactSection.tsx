import { ArrowUpRight, Github, Linkedin, Mail, MapPin, Phone, Send, Terminal } from "lucide-react";
import { SectionLabel } from "@/components/common/SectionLabel";

export function ContactSection() {
  return (
    <section id="contact" className="py-16">
      <SectionLabel index="07" label="connect // channels" hint="open for roles" />

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_1fr]">
        {/* Left: Contact Info Cards */}
        <div className="flex flex-col gap-3 text-mono text-xs">
          <div className="rounded-sm border border-border-strong bg-card p-6 shadow-sm">
            <h3 className="text-xl font-bold tracking-tight text-foreground font-sans">
              Let's engineer something great together.
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground font-sans">
              Currently open to Full-Stack Developer, Frontend Engineer, and AI Automation
              Specialist roles — full-time, contract, or high-impact consulting.
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <ContactRow
                icon={Mail}
                label="Email"
                value="bryantiversonmelliza03@gmail.com"
                href="mailto:bryantiversonmelliza03@gmail.com"
              />
              <ContactRow
                icon={Phone}
                label="Phone"
                value="+63 939 817 0375"
                href="tel:+639398170375"
              />
              <ContactRow
                icon={Linkedin}
                label="LinkedIn"
                value="bryant-iverson-melliza"
                href="https://www.linkedin.com/in/bryant-iverson-melliza-6759b8292"
              />
              <ContactRow
                icon={Github}
                label="GitHub"
                value="brybryson"
                href="https://github.com/brybryson"
              />
              <ContactRow
                icon={MapPin}
                label="Location"
                value="Caloocan City, Metro Manila, Philippines"
              />
            </div>
          </div>
        </div>

        {/* Right: Quick Terminal Mailer */}
        <div className="flex flex-col justify-between rounded-sm border border-border-strong bg-surface p-6 text-mono text-xs shadow-sm">
          <div>
            <div className="flex items-center gap-2 border-b border-border pb-3 text-signal font-semibold">
              <Terminal className="h-4 w-4" />
              <span>TRANSMIT MESSAGE // DIRECT DISPATCH</span>
            </div>
            <p className="mt-3 text-[11px] text-muted-foreground">
              Send a direct dispatch to Bryant's primary email. Clicking below opens your default
              mail client with a pre-configured header.
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <a
              href="mailto:bryantiversonmelliza03@gmail.com?subject=Inquiry%20from%20Portfolio&body=Hi%20Bryant,%0D%0A%0D%0AI%20reviewed%20your%20portfolio%20and%20would%20like%20to%20connect%20regarding..."
              className="flex items-center justify-center gap-2 rounded-sm bg-signal px-5 py-3 text-xs font-semibold text-background transition hover:bg-signal/90 shadow-sm uppercase tracking-wider"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Launch Mail Composer</span>
            </a>
            <span className="text-center text-[10px] text-muted-foreground">
              Response SLA: &lt; 12 hours
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-border/60 pb-2">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className="h-3.5 w-3.5 text-signal" />
        <span className="text-[11px] uppercase tracking-wider">{label}</span>
      </div>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1 font-medium text-foreground hover:text-signal transition"
        >
          <span className="truncate max-w-[220px] sm:max-w-none">{value}</span>
          <ArrowUpRight className="h-3 w-3 text-muted-foreground" />
        </a>
      ) : (
        <span className="text-foreground truncate max-w-[220px] sm:max-w-none">{value}</span>
      )}
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { Award } from "lucide-react";
import { CertificatesSection } from "@/components/home/CertificatesSection";

export const Route = createFileRoute("/certificates")({
  head: () => ({
    meta: [
      { title: "Certificates & Badges — Bryant Melliza" },
      {
        name: "description",
        content:
          "Verified certifications in n8n Workflow Automation, Postman API Testing, Agile Scrum, AI Risk Management, and Leadership.",
      },
    ],
  }),
  component: CertificatesPage,
});

function CertificatesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-3 border-b border-border-strong pb-8">
        <div className="flex items-center gap-2 text-mono text-xs text-signal font-semibold">
          <Award className="h-4 w-4" />
          <span>VERIFIED CREDENTIALS // CERTIFICATION DIRECTORY</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Certifications, Badges & Professional Credentials
        </h1>
        <p className="text-sm leading-relaxed text-muted-foreground md:text-base max-w-3xl">
          Continuous professional development spanning n8n Academy workflow automation, LinkedIn
          Learning API & QA foundations, Professional Scrum, and Data Privacy governance.
        </p>
      </div>

      <CertificatesSection showFilter={true} />
    </div>
  );
}

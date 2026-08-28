import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PaletteDialog } from "@/components/layout/PaletteDialog";
import { OwleyFloatingWidget } from "@/components/ai/OwleyFloatingWidget";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-mono">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-signal">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">PAGE NOT FOUND</h2>
        <p className="mt-2 text-xs text-muted-foreground">
          The requested system node or route does not exist.
        </p>
        <div className="mt-6">
          <Link
            to="/home"
            className="inline-flex items-center justify-center rounded-sm bg-signal px-5 py-2.5 text-xs font-semibold text-background transition hover:bg-signal/90"
          >
            RETURN TO ROOT
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-mono">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-bold text-destructive">RUNTIME ERROR DETECTED</h1>
        <p className="mt-2 text-xs text-muted-foreground">
          {error?.message || "An unexpected error occurred during execution."}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-sm bg-signal px-4 py-2 text-xs font-semibold text-background transition hover:bg-signal/90"
          >
            RETRY EXECUTION
          </button>
          <Link
            to="/home"
            className="inline-flex items-center justify-center rounded-sm border border-border bg-surface px-4 py-2 text-xs font-medium text-foreground transition hover:bg-surface-2"
          >
            GO HOME
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Bryant Melliza — Full-Stack & AI Systems Architect" },
      {
        name: "description",
        content:
          "Portfolio of Bryant Melliza — Full-Stack Developer & AI Systems Architect engineering scalable web apps and fault-tolerant RAG automation pipelines. Based in Caloocan City, PH.",
      },
      { name: "author", content: "Bryant Melliza" },
      { property: "og:title", content: "Bryant Melliza — Full-Stack & AI Systems Architect" },
      {
        property: "og:description",
        content:
          "Engineering scalable digital solutions. React 19 · Next.js 15 · Supabase · n8n · Google Gemini AI RAG.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/images/experience/portfolio logo.png", type: "image/png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap",
      },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen flex flex-col bg-paper text-foreground antialiased selection:bg-signal-dim selection:text-foreground">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    const currentPath = window.location.pathname;
    const pagePath = currentPath === "/" ? "/home" : currentPath;

    // Telemetry webhook logging
    fetch("https://dummyaccountbry.app.n8n.cloud/webhook/fe9a0d1d-484c-4997-97b7-0fb419dc91bb", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        page: pagePath,
        referrer: document.referrer,
      }),
    }).catch(() => {});

    // Keyboard shortcut for Cmd+K and /
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isInput =
        target &&
        (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);
      if (isInput) return;

      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setPaletteOpen((prev) => !prev);
      } else if (e.key === "/" && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        setPaletteOpen(true);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Navbar onOpenPalette={() => setPaletteOpen(true)} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <PaletteDialog open={paletteOpen} onOpenChange={setPaletteOpen} />
      <OwleyFloatingWidget />
    </QueryClientProvider>
  );
}

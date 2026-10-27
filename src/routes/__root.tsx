import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

function NotFoundComponent() {
  return (
    <div className="container-site py-32 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 text-5xl">Page not found</h1>
      <p className="mt-4 text-muted-foreground">The page you're looking for doesn't exist or has moved.</p>
      <Button asChild className="mt-8"><Link to="/">Return home</Link></Button>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="container-site py-32 text-center">
      <h1 className="text-4xl">This page didn't load</h1>
      <p className="mt-3 text-muted-foreground">Something went wrong. Try again or head back home.</p>
      <div className="mt-8 flex justify-center gap-3">
        <Button onClick={() => { router.invalidate(); reset(); }}>Try again</Button>
        <Button asChild variant="outline"><a href="/">Go home</a></Button>
      </div>
    </div>
  );
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "RealEstateAgent",
      "@id": SITE.url + "/#business",
      name: SITE.name,
      url: SITE.url + "/",
      logo: SITE.url + "/favicon.png",
      telephone: "+1-513-305-0102",
      email: SITE.email,
      parentOrganization: { "@type": "Organization", name: SITE.brokerage },
      founder: [
        { "@type": "Person", name: "Heather Alley" },
        { "@type": "Person", name: "John Alley" },
      ],
      address: {
        "@type": "PostalAddress",
        streetAddress: SITE.street,
        addressLocality: SITE.city,
        addressRegion: SITE.region,
        postalCode: SITE.zip,
        addressCountry: "US",
      },
      areaServed: SITE.areasServed.map((a) => ({ "@type": "Place", name: `${a}, OH` })),
      sameAs: [SITE.facebook, SITE.youtube],
    },
    { "@type": "WebSite", "@id": SITE.url + "/#website", url: SITE.url + "/", name: SITE.name, publisher: { "@id": SITE.url + "/#business" } },
  ],
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Estate Alley Group | Cincinnati & Dayton Real Estate" },
      { name: "description", content: "Estate Alley Group, Keller Williams Advisors — real estate for buyers and sellers in Cincinnati, Dayton and surrounding areas." },
      { property: "og:site_name", content: "Estate Alley Group" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Manrope:wght@400;500;600;700&display=swap" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
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
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-background focus:px-4 focus:py-2">Skip to content</a>
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <div className="h-16 md:hidden" aria-hidden="true" />
      <nav aria-label="Quick contact" className="fixed inset-x-0 bottom-0 z-40 border-t border-champagne md:hidden" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
        <a href={`tel:${SITE.phone.replace(/[^0-9]/g, "")}`} className="flex h-16 w-full items-center justify-center gap-2.5 bg-primary text-sm font-semibold uppercase tracking-[0.1em] text-primary-foreground"><Phone className="h-5 w-5 shrink-0" /> Call {SITE.phone}</a>
      </nav>

    </QueryClientProvider>
  );
}

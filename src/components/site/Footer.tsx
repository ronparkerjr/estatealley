import { Link } from "@tanstack/react-router";
import logo from "@/assets/eag-logo.png.asset.json";
import { NAV, SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-charcoal text-on-dark">
      <div className="container-site grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="inline-block bg-background px-4 py-3">
            <img src={logo.url} alt="Estate Alley Group Real Estate" width={322} height={185} className="h-14 w-auto" loading="lazy" />
          </div>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-on-dark-muted">
            Real estate guidance for buyers and sellers across {SITE.serviceArea}.
          </p>
        </div>

        <nav aria-label="Footer" className="md:col-span-3">
          <p className="eyebrow !text-champagne">Explore</p>
          <ul className="mt-5 space-y-3 text-sm">
            {NAV.map((n) => (
              <li key={n.to}><Link to={n.to} className="link-underline text-on-dark-muted hover:text-on-dark">{n.label}</Link></li>
            ))}
          </ul>
        </nav>

        <address className="not-italic md:col-span-5">
          <p className="eyebrow !text-champagne">Contact</p>
          <p className="mt-5 font-serif text-2xl">{SITE.name}</p>
          <p className="text-sm text-on-dark-muted">{SITE.brokerage}</p>
          <p className="mt-4 text-sm leading-relaxed text-on-dark-muted">
            {SITE.street}<br />{SITE.city}, {SITE.region} {SITE.zip}
          </p>
          <p className="mt-4 space-y-1 text-sm">
            <a href={SITE.phoneHref} className="link-underline block w-fit">{SITE.phone}</a>
            <a href={SITE.emailHref} className="link-underline block w-fit">{SITE.email}</a>
          </p>
        </address>
      </div>
      <div className="border-t border-on-dark/10">
        <div className="container-site flex flex-col gap-2 py-6 text-xs text-on-dark-muted md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} {SITE.name}. Affiliated with {SITE.brokerage}. Each office independently owned and operated.</p>
          <p>Equal Housing Opportunity</p>
        </div>
      </div>
    </footer>
  );
}

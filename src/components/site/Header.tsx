import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, Phone, X } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { NAV, SITE } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-background/95 backdrop-blur transition-shadow duration-300 ${scrolled ? "border-b shadow-soft" : ""}`}
      >
        <div className="mx-auto flex h-20 w-full max-w-[90rem] items-center justify-between gap-6 px-5 md:px-10">
          <Logo className={`w-auto transition-all duration-300 ${scrolled ? "h-12" : "h-16"}`} />

          <nav aria-label="Primary" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {NAV.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="whitespace-nowrap rounded-full border border-transparent px-2 py-1.5 text-[0.66rem] uppercase tracking-[0.06em] transition-colors hover:border-foreground/30 font-medium text-foreground/80 hover:text-foreground"
                    activeOptions={{ exact: item.to === "/" }}
                    activeProps={{ className: "!border-foreground/60 text-foreground" }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center gap-3 xl:flex min-[1440px]:gap-4">
            <a
              href={SITE.phoneHref}
              aria-label={`Call ${SITE.phone}`}
              className="hidden h-10 w-10 items-center justify-center rounded-full border border-foreground/20 transition-colors hover:border-foreground/60 min-[1330px]:flex min-[1440px]:hidden"
            >
              <Phone className="h-4 w-4" aria-hidden />
            </a>
            <a href={SITE.phoneHref} className="hidden items-center gap-2 whitespace-nowrap text-sm font-medium min-[1440px]:flex">
              <Phone className="h-4 w-4" aria-hidden /> {SITE.phone}
            </a>
            <Button asChild size="sm" variant="outline" className="whitespace-nowrap px-4">
              <Link to="/contact" search={{ form: "valuation" }}>Free Home Valuation</Link>
            </Button>
            <Button asChild size="sm" className="whitespace-nowrap px-4">
              <a href={SITE.mlsSearch} target="_blank" rel="noopener noreferrer">
                Search the MLS Listings
              </a>
            </Button>
          </div>

          <button
            type="button"
            className="xl:hidden -mr-2 p-2"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-x-0 top-20 bottom-0 z-40 overflow-y-auto bg-background xl:hidden animate-in fade-in">
          <nav aria-label="Mobile" className="container-site flex flex-col py-8 pb-28">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="border-b py-4 font-serif text-3xl"
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "text-muted-foreground" }}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-8 flex flex-col gap-3">
              <Button asChild size="lg">
                <a href={SITE.mlsSearch} target="_blank" rel="noopener noreferrer">
                  Search the MLS Listings
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/contact" search={{ form: "valuation" }} onClick={() => setOpen(false)}>Free Home Valuation</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={SITE.phoneHref}>Call {SITE.phone}</a>
              </Button>
              <a href={SITE.emailHref} className="mt-2 text-center text-sm text-muted-foreground">{SITE.email}</a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}

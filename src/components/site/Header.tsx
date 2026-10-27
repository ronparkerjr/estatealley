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
        <div className="container-site flex h-20 items-center justify-between gap-6">
          <Logo className={`w-auto transition-all duration-300 ${scrolled ? "h-12" : "h-16"}`} />

          <nav aria-label="Primary" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {NAV.filter((n) => n.to !== "/").map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="rounded-full border border-transparent px-3.5 py-1.5 text-[0.7rem] uppercase tracking-[0.16em] transition-colors hover:border-foreground/30 font-medium tracking-wide text-foreground/80 hover:text-foreground"
                    activeProps={{ className: "!border-foreground/60 text-foreground" }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center gap-5 xl:flex">
            <a href={SITE.phoneHref} className="flex items-center gap-2 text-sm font-medium">
              <Phone className="h-4 w-4" aria-hidden /> {SITE.phone}
            </a>
            <Button asChild size="sm">
              <Link to="/contact" search={{ form: "valuation" }}>Free Home Valuation</Link>
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
          <nav aria-label="Mobile" className="container-site flex flex-col py-8">
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

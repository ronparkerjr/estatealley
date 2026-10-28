import { Link } from "@tanstack/react-router";
import logo from "@/assets/eag-logo.png.asset.json";
import { scrollToTopIfCurrent } from "@/lib/scroll-to-top";

export function Logo({ className = "h-12 w-auto" }: { className?: string }) {
  return (
    <Link
      to="/"
      aria-label="Estate Alley Group home"
      onClick={() => scrollToTopIfCurrent("/")}
      className="inline-flex shrink-0"
    >
      <img src={logo.url} alt="Estate Alley Group Real Estate" width={166} height={95} className={className} />
    </Link>
  );
}


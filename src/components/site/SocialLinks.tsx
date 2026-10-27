import { Facebook, Youtube } from "lucide-react";
import { SITE } from "@/lib/site";

const LINKS = [
  { href: SITE.facebook, label: "Estate Alley Group on Facebook", Icon: Facebook },
  { href: SITE.youtube, label: "Estate Alley Group on YouTube", Icon: Youtube },
] as const;

export function SocialLinks({
  className = "",
  tone = "light",
  compact = false,
}: {
  className?: string;
  tone?: "light" | "dark";
  compact?: boolean;
}) {
  const box = compact ? "h-9 w-9" : "h-10 w-10";
  const ring =
    tone === "dark"
      ? "border-on-dark/30 text-on-dark hover:border-champagne hover:text-champagne"
      : "border-foreground/25 text-foreground hover:border-foreground hover:bg-foreground hover:text-background";

  return (
    <ul className={`flex items-center gap-3 ${className}`}>
      {LINKS.map(({ href, label, Icon }) => (
        <li key={href}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className={`flex ${box} items-center justify-center rounded-full border transition-colors ${ring}`}
          >
            <Icon className="h-4 w-4" aria-hidden />
          </a>
        </li>
      ))}
    </ul>
  );
}

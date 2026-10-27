import { SITE } from "@/lib/site";

export function ComplianceNote({ historical }: { historical: boolean }) {
  return (
    <p className="mt-10 border-t pt-5 text-xs leading-relaxed text-muted-foreground">
      {SITE.name} · {SITE.brokerage}, {SITE.street}, {SITE.city}, {SITE.region} {SITE.zip} · {SITE.phone}.{" "}
      {historical
        ? "Historical transaction shown for portfolio purposes only; this property is not currently offered for sale. Prices and details are as recorded at the time of sale."
        : "Information deemed reliable but not guaranteed. Listing data is not synchronized live; confirm current status with an agent."}{" "}
      Each Keller Williams office is independently owned and operated. Equal Housing Opportunity.
    </p>
  );
}

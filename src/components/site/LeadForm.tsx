import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

const ENDPOINT = `https://formsubmit.co/ajax/${SITE.email}`;

export type LeadKind = "contact" | "valuation" | "buyer" | "showing" | "question" | "firstTimeBuyer";

const phone = z.string().trim().regex(/^[\d\s()+.-]{7,20}$/, "Please enter a valid phone number");
const base = {
  firstName: z.string().trim().min(1, "Please enter your first name").max(60),
  lastName: z.string().trim().min(1, "Please enter your last name").max(60),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone,
  contactMethod: z.enum(["Email", "Phone", "Text"], { message: "Please choose one" }),
  message: z.string().trim().max(2000).optional(),
  smsConsent: z.literal("yes").optional(),
};

const CONFIG: Record<LeadKind, { subject: string; cta: string; extra: z.ZodRawShape }> = {
  firstTimeBuyer: {
    subject: "First-time homebuyer consultation request", cta: "Submit",
    extra: {
      buyingTimeline: z.string().trim().max(200).optional(),
      desiredLocation: z.string().trim().max(200).optional(),
      propertyType: z.string().trim().max(200).optional(),
      buyingProcessInfo: z.enum(["Yes", "No", "Not sure"]).optional(),
      message: z.string().trim().min(1, "Please share your concerns or a brief message").max(2000),
    },
  },
  contact: {
    subject: "Website inquiry", cta: "Send My Message",
    extra: {
      interest: z.enum(["Buying", "Selling", "Investing", "Joining the Team", "General Inquiry"], { message: "Please choose one" }),
      message: z.string().trim().min(1, "Please add a short message").max(2000),
    },
  },
  valuation: {
    subject: "Free home valuation request", cta: "Request My Free Valuation",
    extra: {
      address: z.string().trim().min(5, "Please enter the property address").max(200),
      timeline: z.enum(["0–3 months", "3–6 months", "6–12 months", "Just curious"], { message: "Please choose one" }),
    },
  },
  buyer: {
    subject: "Buyer consultation request", cta: "Schedule My Consultation",
    extra: {
      areas: z.string().trim().min(1, "Which areas interest you?").max(200),
      budget: z.string().trim().max(60).optional(),
      timeline: z.enum(["0–3 months", "3–6 months", "6–12 months", "Just exploring"], { message: "Please choose one" }),
    },
  },
  showing: {
    subject: "Property showing request", cta: "Request a Showing",
    extra: {
      property: z.string().trim().min(3, "Which property or MLS #?").max(200),
      when: z.string().trim().max(120).optional(),
    },
  },
  question: {
    subject: "Real estate question", cta: "Ask My Question",
    extra: { message: z.string().trim().min(1, "Please enter your question").max(2000) },
  },
};

const field = "mt-2 w-full rounded-sm border bg-background px-4 py-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring";
const LABELS: Record<string, string> = {
  firstName: "First name", lastName: "Last name", email: "Email", phone: "Phone", contactMethod: "Preferred contact",
  interest: "Interested in", address: "Property address", timeline: "Timeline", areas: "Areas of interest", budget: "Budget",
  property: "Property", when: "Preferred days/times", message: "Message", smsConsent: "SMS consent",
  buyingTimeline: "How soon are you looking to buy?", desiredLocation: "Desired location or neighborhood",
  propertyType: "Property type", buyingProcessInfo: "Seeking information on the buying process?",
};
type Status = "idle" | "sending" | "success" | "error";

export function leadSchema(kind: LeadKind) {
  return z.object({ ...base, ...CONFIG[kind].extra });
}

export function LeadForm({ kind, defaultValues = {} }: { kind: LeadKind; defaultValues?: Record<string, string> }) {
  const cfg = CONFIG[kind];
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    if (fd.get("_honey")) return;
    const raw = Object.fromEntries([...fd].filter(([k, v]) => k !== "_honey" && v !== ""));
    const parsed = leadSchema(kind).safeParse(raw);
    if (!parsed.success) {
      setErrors(Object.fromEntries(parsed.error.issues.map((i) => [String(i.path[0]), i.message])));
      return;
    }
    setErrors({});
    setStatus("sending");
    const d = parsed.data as Record<string, string | undefined> & { firstName: string; lastName: string; email: string; smsConsent?: string };
    const payload: Record<string, string> = {
      _subject: `${cfg.subject}: ${d.firstName} ${d.lastName}`, _template: "table", _captcha: "false", _replyto: d.email,
    };
    for (const [k, v] of Object.entries(d)) payload[LABELS[k] ?? k] = v ?? "—";
    payload["SMS consent"] = d.smsConsent ? "Yes" : "No";
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !(json.success === true || json.success === "true")) throw new Error();
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success")
    return (
      <div role="status" className="border bg-background p-10">
        <h3 className="text-3xl">Thank you — your message was sent.</h3>
        <p className="mt-3 text-muted-foreground">An Estate Alley Group agent will reach out using your preferred contact method.</p>
        <Button variant="outline" className="mt-6" onClick={() => setStatus("idle")}>Send another</Button>
      </div>
    );

  const Err = ({ n }: { n: string }) => (errors[n] ? <p id={`${kind}-${n}-err`} className="mt-1 text-xs text-destructive">{errors[n]}</p> : null);
  const a = (n: string) => ({ name: n, defaultValue: defaultValues[n], "aria-invalid": !!errors[n], "aria-describedby": errors[n] ? `${kind}-${n}-err` : undefined });
  const Select = ({ n, label, opts, wide }: { n: string; label: string; opts: string[]; wide?: boolean }) => (
    <label className={`text-sm font-medium ${wide ? "sm:col-span-2" : ""}`}>{label}
      <select {...a(n)} defaultValue={defaultValues[n] ?? ""} className={field}>
        <option value="" disabled>Select…</option>{opts.map((o) => <option key={o}>{o}</option>)}
      </select><Err n={n} /></label>
  );
  const Input = ({ n, label, type = "text", wide, optional, ac, ph }: { n: string; label: string; type?: string; wide?: boolean; optional?: boolean; ac?: string; ph?: string }) => (
    <label className={`text-sm font-medium ${wide ? "sm:col-span-2" : ""}`}>{label}{optional && <span className="font-normal text-muted-foreground"> (optional)</span>}
      <input {...a(n)} type={type} autoComplete={ac} placeholder={ph} maxLength={n === "email" ? 255 : n === "phone" ? 20 : n === "firstName" || n === "lastName" ? 60 : 200} className={field} /><Err n={n} /></label>
  );
  const msgRequired = kind === "contact" || kind === "question" || kind === "firstTimeBuyer";

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 border bg-background p-6 sm:grid-cols-2 md:p-10">
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      {kind === "valuation" && <Input n="address" label="Property address" wide ac="street-address" />}
      {kind === "showing" && <Input n="property" label="Property address or MLS #" wide />}
      {kind === "contact" && <Select n="interest" label="I'm interested in" opts={["Buying", "Selling", "Investing", "Joining the Team", "General Inquiry"]} wide />}
      <Input n="firstName" label="First name" ac="given-name" />
      <Input n="lastName" label="Last name" ac="family-name" />
      <Input n="email" label="Email" type="email" ac="email" />
      <Input n="phone" label="Phone" type="tel" ac="tel" />
      {kind === "valuation" && <Select n="timeline" label="When are you thinking of selling?" opts={["0–3 months", "3–6 months", "6–12 months", "Just curious"]} />}
      {kind === "buyer" && <>
        <Input n="areas" label="Areas of interest" ph="e.g. Mason, West Chester" />
        <Input n="budget" label="Budget" optional ph="e.g. $400K–$500K" />
        <Select n="timeline" label="Timeline" opts={["0–3 months", "3–6 months", "6–12 months", "Just exploring"]} />
      </>}
      {kind === "showing" && <Input n="when" label="Preferred days/times" optional />}
      <Select n="contactMethod" label="Preferred contact method" opts={["Email", "Phone", "Text"]} />
      {kind === "firstTimeBuyer" && <>
        <Input n="buyingTimeline" label="How soon are you looking to buy?" optional />
        <Input n="desiredLocation" label="Do you have a desired location or neighborhood?" wide optional />
        <Input n="propertyType" label="What kind of property are you interested in?" ph="Single family, condo, etc." wide optional />
        <Select n="buyingProcessInfo" label="As a first-time homebuyer, are you seeking information on the buying process? (optional)" opts={["Yes", "No", "Not sure"]} wide />
      </>}
      <label className="text-sm font-medium sm:col-span-2">{kind === "firstTimeBuyer" ? "Any additional concerns or a brief message about what you are seeking as a first-time homebuyer" : kind === "question" ? "Your question" : "Message"}{msgRequired ? " *" : <span className="font-normal text-muted-foreground"> (optional)</span>}
        <textarea {...a("message")} rows={4} maxLength={2000} className={field} /><Err n="message" /></label>
      <label className="flex items-start gap-3 text-xs leading-relaxed text-muted-foreground sm:col-span-2">
        <input type="checkbox" name="smsConsent" value="yes" className="mt-0.5 h-4 w-4" />
        <span>Optional: I agree to receive text messages from {SITE.name} about my inquiry. Message and data rates may apply. Reply STOP to opt out. Consent is not required to work with us.</span>
      </label>
      {status === "error" && <p role="alert" className="text-sm text-destructive sm:col-span-2">We couldn't send your message right now. Please email {SITE.email} or call {SITE.phone}.</p>}
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <Button type="submit" size="lg" disabled={status === "sending"}>{status === "sending" ? "Sending…" : cfg.cta}</Button>
        <p className="max-w-sm text-xs text-muted-foreground">Your information is sent only to {SITE.name} and used solely to respond to your inquiry. We never sell or share it.</p>
      </div>
    </form>
  );
}

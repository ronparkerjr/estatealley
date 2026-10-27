import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";
import { sendFormSubmission } from "@/lib/form-submit";

const schema = z.object({
  firstName: z.string().trim().min(1, "Please enter your first name").max(60),
  lastName: z.string().trim().min(1, "Please enter your last name").max(60),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().regex(/^[\d\s()+.-]{7,20}$/, "Please enter a valid phone number"),
  licensed: z.enum(["Yes", "No", "In process"], { message: "Please choose one" }),
  experience: z.string().trim().min(1, "Please enter your experience").max(40),
  brokerage: z.string().trim().max(100).optional(),
  message: z.string().trim().min(1, "Please add a short message").max(2000),
  contactMethod: z.enum(["Email", "Phone", "Text"], { message: "Please choose one" }),
});

type Status = { kind: "idle" | "sending" | "success" } | { kind: "error"; msg: string };
const field = "mt-2 w-full rounded-sm border bg-background px-4 py-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function AgentInquiryForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    if (fd.get("_honey")) return; // bot
    const parsed = schema.safeParse(Object.fromEntries(fd));
    if (!parsed.success) {
      setErrors(Object.fromEntries(parsed.error.issues.map((i) => [String(i.path[0]), i.message])));
      return;
    }
    setErrors({});
    setStatus({ kind: "sending" });
    const d = parsed.data;
    try {
      await sendFormSubmission({
          _subject: `Agent inquiry: ${d.firstName} ${d.lastName}`,
          _template: "table",
          _captcha: "false",
          _replyto: d.email,
          Name: `${d.firstName} ${d.lastName}`,
          Email: d.email,
          Phone: d.phone,
          "Currently licensed": d.licensed,
          "Years of experience": d.experience,
          "Current brokerage": d.brokerage || "—",
          "Preferred contact": d.contactMethod,
          Message: d.message,
      });
      setStatus({ kind: "success" });
      form.reset();
    } catch {
      setStatus({ kind: "error", msg: `We couldn't send your inquiry right now. Please email ${SITE.email} or call ${SITE.phone}.` });
    }
  }

  if (status.kind === "success") {
    return (
      <div role="status" className="border bg-background p-10 text-center">
        <h3 className="text-3xl">Thank you — your inquiry was sent.</h3>
        <p className="mt-3 text-muted-foreground">Heather will reach out using your preferred contact method. Your conversation stays confidential.</p>
      </div>
    );
  }

  const Err = ({ n }: { n: string }) => errors[n] ? <p id={`${n}-err`} className="mt-1 text-xs text-destructive">{errors[n]}</p> : null;
  const aria = (n: string) => ({ "aria-invalid": !!errors[n], "aria-describedby": errors[n] ? `${n}-err` : undefined });

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 border bg-background p-6 sm:grid-cols-2 md:p-10">
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <label className="text-sm font-medium">First name<input name="firstName" autoComplete="given-name" className={field} {...aria("firstName")} /><Err n="firstName" /></label>
      <label className="text-sm font-medium">Last name<input name="lastName" autoComplete="family-name" className={field} {...aria("lastName")} /><Err n="lastName" /></label>
      <label className="text-sm font-medium">Email<input name="email" type="email" autoComplete="email" className={field} {...aria("email")} /><Err n="email" /></label>
      <label className="text-sm font-medium">Phone<input name="phone" type="tel" autoComplete="tel" className={field} {...aria("phone")} /><Err n="phone" /></label>
      <label className="text-sm font-medium">Currently licensed?
        <select name="licensed" defaultValue="" className={field} {...aria("licensed")}>
          <option value="" disabled>Select…</option><option>Yes</option><option>No</option><option>In process</option>
        </select><Err n="licensed" /></label>
      <label className="text-sm font-medium">Years of real estate experience<input name="experience" placeholder="e.g. 3, or new to real estate" className={field} {...aria("experience")} /><Err n="experience" /></label>
      <label className="text-sm font-medium">Current brokerage <span className="font-normal text-muted-foreground">(optional)</span><input name="brokerage" className={field} /></label>
      <label className="text-sm font-medium">Preferred contact method
        <select name="contactMethod" defaultValue="" className={field} {...aria("contactMethod")}>
          <option value="" disabled>Select…</option><option>Email</option><option>Phone</option><option>Text</option>
        </select><Err n="contactMethod" /></label>
      <label className="text-sm font-medium sm:col-span-2">Message<textarea name="message" rows={5} className={field} {...aria("message")} /><Err n="message" /></label>
      {status.kind === "error" && <p role="alert" className="text-sm text-destructive sm:col-span-2">{status.msg}</p>}
      <div className="sm:col-span-2">
        <Button type="submit" size="lg" disabled={status.kind === "sending"}>
          {status.kind === "sending" ? "Sending…" : "Start a Confidential Conversation"}
        </Button>
      </div>
    </form>
  );
}

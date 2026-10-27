import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";
import { sendFormSubmission } from "@/lib/form-submit";

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().regex(/^[\d\s()+.-]{7,20}$/, "Please enter a valid phone number"),
  request: z.enum(["Private showing", "Find a home like this", "Home valuation", "General question"]),
  message: z.string().trim().max(2000).optional(),
});

const field = "mt-2 w-full rounded-sm border bg-background px-4 py-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring";
type Status = "idle" | "sending" | "success" | "error";

export function PropertyInquiryForm({ property, defaultRequest }: { property: string; defaultRequest: z.infer<typeof schema>["request"] }) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    if (fd.get("_honey")) return;
    const parsed = schema.safeParse(Object.fromEntries(fd));
    if (!parsed.success) {
      setErrors(Object.fromEntries(parsed.error.issues.map((i) => [String(i.path[0]), i.message])));
      return;
    }
    setErrors({});
    setStatus("sending");
    const d = parsed.data;
    try {
      await sendFormSubmission({
          _subject: `${d.request}: ${property}`, _template: "table", _captcha: "false", _replyto: d.email,
          Property: property, Request: d.request, Name: d.name, Email: d.email, Phone: d.phone, Message: d.message || "—",
      });
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success")
    return <div role="status" className="border bg-background p-8"><h3 className="text-2xl">Thank you — your request was sent.</h3><p className="mt-2 text-sm text-muted-foreground">An Estate Alley agent will be in touch soon.</p></div>;

  const Err = ({ n }: { n: string }) => (errors[n] ? <p id={`${n}-err`} className="mt-1 text-xs text-destructive">{errors[n]}</p> : null);
  const aria = (n: string) => ({ "aria-invalid": !!errors[n], "aria-describedby": errors[n] ? `${n}-err` : undefined });

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4 border bg-background p-6 md:p-8">
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <label className="text-sm font-medium">I'd like to…
        <select name="request" defaultValue={defaultRequest} className={field}>
          <option>Private showing</option><option>Find a home like this</option><option>Home valuation</option><option>General question</option>
        </select></label>
      <label className="text-sm font-medium">Name<input name="name" autoComplete="name" className={field} {...aria("name")} /><Err n="name" /></label>
      <label className="text-sm font-medium">Email<input name="email" type="email" autoComplete="email" className={field} {...aria("email")} /><Err n="email" /></label>
      <label className="text-sm font-medium">Phone<input name="phone" type="tel" autoComplete="tel" className={field} {...aria("phone")} /><Err n="phone" /></label>
      <label className="text-sm font-medium">Message <span className="font-normal text-muted-foreground">(optional)</span><textarea name="message" rows={3} className={field} /></label>
      {status === "error" && <p role="alert" className="text-sm text-destructive">We couldn't send your request right now. Please email {SITE.email} or call {SITE.phone}.</p>}
      <Button type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Speak With an Estate Alley Agent"}</Button>
    </form>
  );
}

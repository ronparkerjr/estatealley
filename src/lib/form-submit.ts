import { SITE } from "@/lib/site";

// Every webform uses the same recipient and confirmed-response handling.
export async function sendFormSubmission(fields: Record<string, string>) {
  const response = await fetch(`https://formsubmit.co/ajax/${SITE.email}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ ...fields, _template: "table", _captcha: "false" }),
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok || !(result.success === true || result.success === "true")) {
    throw new Error("FormSubmit did not confirm the submission");
  }
}
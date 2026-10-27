import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { LeadForm, type LeadKind } from "@/components/site/LeadForm";
import { AgentInquiryForm } from "@/components/site/AgentInquiryForm";
import { PropertyInquiryForm } from "@/components/site/PropertyInquiryForm";
import { sendFormSubmission } from "@/lib/form-submit";

afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

const values: Record<string, string> = {
  firstName: "Form", lastName: "Test", name: "Form Test", email: "form-test@example.com",
  phone: "513-555-0100", contactMethod: "Email", message: "Delivery test; no follow-up needed.",
  interest: "Buying", address: "123 Test Street", timeline: "0–3 months", areas: "Mason",
  property: "123 Test Street", licensed: "Yes", experience: "3", request: "Private showing",
};

describe("Every webform sends to Heather through FormSubmit", () => {
  const kinds: LeadKind[] = ["contact", "valuation", "buyer", "showing", "question", "firstTimeBuyer"];
  const forms = [
    ...kinds.map(kind => ({ name: kind, element: <LeadForm kind={kind} /> })),
    { name: "agent inquiry", element: <AgentInquiryForm /> },
    { name: "property inquiry", element: <PropertyInquiryForm property="123 Test Street" defaultRequest="Private showing" /> },
  ];

  it.each(forms)("routes $name to heather@estatealley.com", async ({ element }) => {
    const send = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ success: "true" }) });
    vi.stubGlobal("fetch", send);
    const { container, getByRole } = render(element);
    const form = container.querySelector("form");
    if (!form) throw new Error("Missing webform");
    for (const control of form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>("input, select, textarea")) {
      if (values[control.name]) fireEvent.change(control, { target: { value: values[control.name] } });
    }
    fireEvent.submit(form);
    await waitFor(() => expect(send).toHaveBeenCalledOnce());
    const [url, options] = send.mock.calls[0];
    expect(url).toBe("https://formsubmit.co/ajax/heather@estatealley.com");
    const payload = JSON.parse(options.body);
    expect(payload._replyto).toBe("form-test@example.com");
    expect(payload._subject).toBeTruthy();
    await waitFor(() => expect(getByRole("status")).toBeInTheDocument());
  });

  it.each([
    { ok: false, result: { success: true } },
    { ok: true, result: { success: false } },
    { ok: true, result: {} },
  ])("rejects unconfirmed or failed submissions: %j", async ({ ok, result }) => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok, json: async () => result }));
    await expect(sendFormSubmission({ Message: "Test" })).rejects.toThrow();
  });
});
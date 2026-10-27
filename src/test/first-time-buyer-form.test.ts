import { describe, expect, it } from "vitest";
import { leadSchema } from "@/components/site/LeadForm";

const requiredFields = {
  firstName: "Test", lastName: "Buyer", email: "buyer@example.com",
  phone: "513-555-0100", contactMethod: "Email", message: "I have questions about buying my first home.",
};

describe("First-time buyer form requirements from the original form", () => {
  it.each(["firstName", "lastName", "email", "phone", "contactMethod", "message"])("requires %s", (field) => {
    const values: Record<string, string> = { ...requiredFields };
    delete values[field];
    expect(leadSchema("firstTimeBuyer").safeParse(values).success).toBe(false);
  });
  it("allows the four buyer-specific questions to be omitted", () => {
    expect(leadSchema("firstTimeBuyer").safeParse(requiredFields).success).toBe(true);
  });
  it.each(["Email", "Phone", "Text"])("accepts %s as the preferred contact method", (contactMethod) => {
    expect(leadSchema("firstTimeBuyer").safeParse({ ...requiredFields, contactMethod }).success).toBe(true);
  });
  it("retains all four buyer-specific answers", () => {
    const answers = { buyingTimeline: "This winter", desiredLocation: "Mason", propertyType: "Condo", buyingProcessInfo: "Yes" };
    const parsed = leadSchema("firstTimeBuyer").parse({ ...requiredFields, ...answers });
    expect(parsed).toMatchObject(answers);
  });
});
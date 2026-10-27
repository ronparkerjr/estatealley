import { createFileRoute, redirect } from "@tanstack/react-router";

// Permanent redirect from the old Wix URL.
export const Route = createFileRoute("/contact-us")({
  beforeLoad: () => {
    throw redirect({ to: "/contact", statusCode: 301 });
  },
});

import { createFileRoute, redirect } from "@tanstack/react-router";

// Permanent redirect from the old Wix URL.
export const Route = createFileRoute("/first-time-homebuyer")({
  beforeLoad: () => {
    throw redirect({ to: "/resources/first-time-homebuyers", statusCode: 301 });
  },
});

import { createFileRoute, redirect } from "@tanstack/react-router";

// Permanent redirect from the old Wix URL.
export const Route = createFileRoute("/properties")({
  beforeLoad: () => {
    throw redirect({ to: "/sold-properties", statusCode: 301 });
  },
});

import { createFileRoute, redirect } from "@tanstack/react-router";

// Permanent redirect from the old Wix URL.
export const Route = createFileRoute("/work")({
  beforeLoad: () => {
    throw redirect({ to: "/join-our-team", statusCode: 301 });
  },
});

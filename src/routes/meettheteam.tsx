import { createFileRoute, redirect } from "@tanstack/react-router";

// Permanent redirect from the old Wix URL.
export const Route = createFileRoute("/meettheteam")({
  beforeLoad: () => {
    throw redirect({ to: "/about", statusCode: 301 });
  },
});

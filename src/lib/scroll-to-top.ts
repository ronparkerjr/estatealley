/**
 * Clicking a link to the page you're already on should return you to the top.
 * The router's scroll restoration keeps the current scroll position for a
 * same-page click, so we scroll to the top ourselves.
 */
export function scrollToTopIfCurrent(to: string) {
  if (typeof window === "undefined") return;
  const target = (to.split("#")[0] || "/").replace(/\/$/, "") || "/";
  const current = target === "/" ? window.location.pathname === "/" : window.location.pathname === target;
  if (!current) return;
  window.scrollTo({ top: 0, behavior: "instant" });
  // Re-assert after the router settles: scroll restoration can override the click.
  requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "instant" }));
}

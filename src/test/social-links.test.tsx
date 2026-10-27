import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SocialLinks } from "@/components/site/SocialLinks";
import { SITE } from "@/lib/site";
import { YOUTUBE_URL } from "@/lib/home-content";

// The two profiles the team published, checked against what they sent us.
describe("Social links", () => {
  it("points at the Facebook page and YouTube channel the team gave us", () => {
    expect(SITE.facebook).toBe("https://www.facebook.com/EstateAlley");
    expect(SITE.youtube).toBe("https://www.youtube.com/@heatherandjohnalleywithest3684");
    expect(YOUTUBE_URL).toBe(SITE.youtube);
  });

  it("renders one labelled link per profile that opens in a new tab", () => {
    render(<SocialLinks />);

    const fb = screen.getByRole("link", { name: "Estate Alley Group on Facebook" });
    const yt = screen.getByRole("link", { name: "Estate Alley Group on YouTube" });

    expect(fb).toHaveAttribute("href", SITE.facebook);
    expect(yt).toHaveAttribute("href", SITE.youtube);
    for (const link of [fb, yt]) {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
    }
    expect(screen.getAllByRole("link")).toHaveLength(2);
  });
});

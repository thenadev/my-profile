import { siteConfig } from "@/config/site";
import { describe, expect, it } from "vitest";

describe("Testumgebung", () => {
  it("löst den @-Alias auf src/ auf", () => {
    expect(siteConfig.contactEmail).toContain("@");
  });
});

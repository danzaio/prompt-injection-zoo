import { describe, expect, it } from "vitest";
import { loadScenario } from "../src/lib/zoo/load";

describe("project skeleton", () => {
  it("loads the first validated scenario fixture", async () => {
    expect((await loadScenario("red-panda-footnote")).slug).toBe("red-panda-footnote");
  });
});

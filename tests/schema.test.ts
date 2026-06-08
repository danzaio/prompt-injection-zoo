import { describe, expect, it } from "vitest";
import { loadAllScenarios, loadScenario } from "../src/lib/zoo/load";
import { scenarioSchema } from "../src/lib/zoo/schema";

describe("scenario schema", () => {
  it("validates the MVP scenario fixtures", async () => {
    const scenarios = await loadAllScenarios();
    expect(scenarios).toHaveLength(10);
    expect(scenarios.map((scenario) => scenario.slug)).toEqual(expect.arrayContaining([
      "hermit-crab-tool-shell",
      "magpie-retriever",
      "red-panda-footnote",
    ]));
    for (const scenario of scenarios) {
      expect(scenarioSchema.parse(scenario).metadata.references.length).toBeGreaterThan(0);
      expect(scenario.owasp.length).toBeGreaterThan(0);
      expect(scenario.safety.notes.length).toBeGreaterThan(0);
    }
  });

  it("fails malformed scenarios with useful path errors", () => {
    const result = scenarioSchema.safeParse({ slug: "bad" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.map((issue) => issue.path.join("."))).toContain("id");
      expect(result.error.issues.map((issue) => issue.path.join("."))).toContain("title");
    }
  });

  it("loads a fixture by slug", async () => {
    await expect(loadScenario("red-panda-footnote")).resolves.toMatchObject({
      title: "Red Panda Footnote",
      category: "indirect_prompt_injection",
    });
  });
});

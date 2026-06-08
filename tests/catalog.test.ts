import { describe, expect, it } from "vitest";
import { loadAllScenarios, loadTraceFixture } from "../src/lib/zoo/load";
import { runScenarioPair } from "../src/lib/zoo/runner";
import { assertScenarioSafety } from "../src/lib/zoo/safety";

describe("full MVP catalog", () => {
  it("contains ten safe complete scenarios", async () => {
    const scenarios = await loadAllScenarios();
    expect(scenarios).toHaveLength(10);
    for (const scenario of scenarios) {
      expect(() => assertScenarioSafety(scenario)).not.toThrow();
      expect(scenario.learningObjectives.length).toBeGreaterThan(0);
      expect(scenario.owasp.length).toBeGreaterThan(0);
      expect(scenario.untrustedInputs[0]?.safePayloadShape).toBeTruthy();
      expect(scenario.defenses.length).toBeGreaterThan(0);
      expect(scenario.scoring.signals).toContain("instruction_boundary_integrity");
    }
  });

  it("has baseline and defended golden traces for every scenario", async () => {
    const scenarios = await loadAllScenarios();
    for (const scenario of scenarios) {
      await expect(loadTraceFixture(scenario.slug, "baseline")).resolves.toEqual(expect.any(Array));
      await expect(loadTraceFixture(scenario.slug, "defended")).resolves.toEqual(expect.any(Array));
    }
  });

  it("keeps defended scores greater than or equal to baseline across the catalog", async () => {
    const scenarios = await loadAllScenarios();
    for (const scenario of scenarios) {
      const { baseline, defended } = await runScenarioPair(scenario);
      expect(defended.score.total).toBeGreaterThanOrEqual(baseline.score.total);
      expect(defended.verdict).toBe("pass");
    }
  });
});

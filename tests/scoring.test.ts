import { describe, expect, it } from "vitest";
import { loadScenario } from "../src/lib/zoo/load";
import { baselineSignalsFor, defendedSignalsFor, scoreRun } from "../src/lib/zoo/scoring";

describe("deterministic scoring", () => {
  it("scores defended runs above baseline", async () => {
    const scenario = await loadScenario("red-panda-footnote");
    const baseline = scoreRun(scenario, baselineSignalsFor(scenario));
    const defended = scoreRun(scenario, defendedSignalsFor());
    expect(baseline.total).toBeLessThan(defended.total);
    expect(defended.verdict).toBe("pass");
  });

  it("does not award tool containment when baseline follows a tool-injection scenario", async () => {
    const scenario = await loadScenario("hermit-crab-tool-shell");
    const baseline = scoreRun(scenario, baselineSignalsFor(scenario));
    expect(baseline.dimensions.find((dimension) => dimension.id === "tool_memory_containment")?.earned).toBe(0);
  });
});

import { describe, expect, it } from "vitest";
import { loadScenario } from "../src/lib/zoo/load";
import { runScenario, runScenarioPair } from "../src/lib/zoo/runner";

describe("scenario runner", () => {
  it("produces baseline and defended score differences", async () => {
    const scenario = await loadScenario("red-panda-footnote");
    const { baseline, defended } = await runScenarioPair(scenario);
    expect(baseline.score.total).toBeLessThan(defended.score.total);
    expect(baseline.verdict).toBe("fail");
    expect(defended.verdict).toBe("pass");
  });

  it("blocks unsafe toy tool calls in defended mode", async () => {
    const scenario = await loadScenario("hermit-crab-tool-shell");
    const defended = await runScenario(scenario, { mode: "defended" });
    expect(defended.trace.some((event) => event.phase === "tool" && event.decision?.verdict === "block")).toBe(false);
    expect(defended.finalOutput).toContain("treated untrusted payloads as data");
  });

  it("records baseline attempted toy tool misuse", async () => {
    const scenario = await loadScenario("hermit-crab-tool-shell");
    const baseline = await runScenario(scenario, { mode: "baseline" });
    expect(baseline.trace.some((event) => event.phase === "tool" && event.summary.includes("toy_send_message"))).toBe(true);
  });
});

import { describe, expect, it } from "vitest";
import { loadScenario } from "../src/lib/zoo/load";
import { reportJson, reportJsonl, reportMarkdown, reportTerminal } from "../src/lib/zoo/reporters";
import { runScenario } from "../src/lib/zoo/runner";
import { runResultSchema } from "../src/lib/zoo/schema";
import { parseTraceJsonl } from "../src/lib/zoo/trace";

describe("run reporters", () => {
  it("renders JSON as the full validated run result", async () => {
    const scenario = await loadScenario("red-panda-footnote");
    const result = await runScenario(scenario, { mode: "defended" });
    expect(runResultSchema.parse(JSON.parse(reportJson(result))).runId).toBe("red-panda-footnote:defended:fixed");
  });

  it("renders JSONL as trace events only", async () => {
    const scenario = await loadScenario("red-panda-footnote");
    const result = await runScenario(scenario, { mode: "defended" });
    const events = parseTraceJsonl(reportJsonl(result));
    expect(events.map((event) => event.sequence)).toEqual(result.trace.map((event) => event.sequence));
    expect(events.every((event) => !("finalOutput" in event))).toBe(true);
  });

  it("renders terminal and markdown summaries with scores and final output", async () => {
    const scenario = await loadScenario("red-panda-footnote");
    const result = await runScenario(scenario, { mode: "defended" });
    expect(reportTerminal(scenario, result)).toContain("score: 100/80");
    expect(reportTerminal(scenario, result)).toContain("Instruction-boundary integrity: 25/25");
    expect(reportMarkdown(scenario, result)).toContain("# Red Panda Footnote");
    expect(reportMarkdown(scenario, result)).toContain(result.finalOutput);
  });
});

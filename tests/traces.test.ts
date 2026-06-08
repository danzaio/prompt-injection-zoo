import { readFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { loadTraceFixture } from "../src/lib/zoo/load";
import { loadScenario } from "../src/lib/zoo/load";
import { runScenario } from "../src/lib/zoo/runner";
import { traceEventSchema } from "../src/lib/zoo/schema";
import { serializeTraceJsonl } from "../src/lib/zoo/trace";

describe("trace fixtures", () => {
  it("validates golden traces and preserves sequence order", async () => {
    const trace = await loadTraceFixture("red-panda-footnote", "defended");
    expect(trace.length).toBeGreaterThan(5);
    trace.forEach((event, index) => {
      expect(traceEventSchema.parse(event).sequence).toBe(index + 1);
    });
  });

  it("keeps defended traces deterministic", async () => {
    const scenario = await loadScenario("red-panda-footnote");
    const result = await runScenario(scenario, { mode: "defended" });
    const golden = await readFile(path.join(process.cwd(), "fixtures", "traces", "red-panda-footnote.defended.jsonl"), "utf8");
    expect(serializeTraceJsonl(result.trace)).toBe(golden);
  });
});

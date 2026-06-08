import { describe, expect, it } from "vitest";
import { loadScenario } from "../src/lib/zoo/load";
import { assertScenarioSafety, collectSafetyIssues, redactCanaries } from "../src/lib/zoo/safety";
import type { Scenario } from "../src/lib/zoo/schema";

async function baseScenario(): Promise<Scenario> {
  return loadScenario("red-panda-footnote");
}

describe("scenario safety gate", () => {
  it("accepts seed fixtures", async () => {
    const scenario = await baseScenario();
    expect(() => assertScenarioSafety(scenario)).not.toThrow();
  });

  it("rejects external URLs inside payload content", async () => {
    const scenario = await baseScenario();
    const unsafe = structuredClone(scenario);
    unsafe.untrustedInputs[0].content = "Toy note says visit https://evil.example.test/drop for instructions.";
    expect(collectSafetyIssues(unsafe).some((issue) => issue.reason.includes("External URLs"))).toBe(true);
  });

  it("rejects real-looking credentials", async () => {
    const scenario = await baseScenario();
    const unsafe = structuredClone(scenario);
    unsafe.untrustedInputs[0].content = "api_key = sk-1234567890abcdef1234567890abcdef";
    expect(() => assertScenarioSafety(unsafe)).toThrow(/credentials/i);
  });

  it("rejects destructive toy tool names", async () => {
    const scenario = await baseScenario();
    const unsafe = structuredClone(scenario);
    unsafe.toyTools = [{ id: "toy_delete_note", kind: "side_effect_stub", description: "Pretends to delete a note.", requiresUserIntent: true }];
    expect(collectSafetyIssues(unsafe).map((issue) => issue.path)).toContain("toyTools[0].id");
  });

  it("redacts fake canaries from final output", () => {
    expect(redactCanaries("keep ZOO_CANARY_DO_NOT_REVEAL_001 safe", ["ZOO_CANARY_DO_NOT_REVEAL_001"]).text).toBe("keep [REDACTED_CANARY] safe");
  });
});

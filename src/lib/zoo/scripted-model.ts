import type { Scenario } from "./schema";

export type ModelInput = {
  scenario: Scenario;
  mode: "baseline" | "defended";
  defenseLabels: readonly string[];
};

export type ModelOutput = {
  text: string;
  attemptedToolCalls: string[];
  attemptedMemoryWrites: string[];
  followedUntrustedInstruction: boolean;
};

export type ModelAdapter = {
  id: string;
  complete(input: ModelInput): Promise<ModelOutput>;
};

export class ScriptedModelAdapter implements ModelAdapter {
  id = "scripted-local-v1";

  async complete(input: ModelInput): Promise<ModelOutput> {
    const { scenario, mode } = input;
    if (mode === "baseline") {
      return {
        text: `Baseline run drifted toward untrusted content: ${scenario.expected.unsafeBehavior[0]}`,
        attemptedToolCalls: scenario.expected.mustNotCallTools ?? [],
        attemptedMemoryWrites: scenario.expected.mustNotPersistMemory ?? [],
        followedUntrustedInstruction: true,
      };
    }
    const explanation = input.defenseLabels.length > 0 ? ` Defenses: ${input.defenseLabels.join(" ")}` : "";
    return {
      text: `Defended run treated untrusted payloads as data: ${scenario.expected.safeBehavior[0]}${explanation}`,
      attemptedToolCalls: [],
      attemptedMemoryWrites: [],
      followedUntrustedInstruction: false,
    };
  }
}

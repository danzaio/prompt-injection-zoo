import { applyDefensePipeline, createInitialState } from "./defenses";
import { assertScenarioSafety, redactCanaries } from "./safety";
import { baselineSignalsFor, defendedSignalsFor, scoreRun } from "./scoring";
import type { RunResult, Scenario } from "./schema";
import { ScriptedModelAdapter, type ModelAdapter } from "./scripted-model";
import { createTraceRecorder } from "./trace";

export type RunMode = "baseline" | "defended";

export async function runScenario(
  scenario: Scenario,
  options: { mode: RunMode; adapter?: ModelAdapter; timestamp?: string } = { mode: "defended" },
): Promise<RunResult> {
  const mode = options.mode;
  const runId = `${scenario.slug}:${mode}:fixed`;
  const recorder = createTraceRecorder({ runId, scenarioId: scenario.id, timestamp: options.timestamp });
  const adapter = options.adapter ?? new ScriptedModelAdapter();

  recorder.add({ phase: "load", actor: "runner", event: "scenario_loaded", summary: `Loaded ${scenario.title}` });
  assertScenarioSafety(scenario);
  recorder.add({ phase: "validate", actor: "runner", event: "schema_and_safety_passed", summary: "Scenario passed Zod schema and local safety gates", decision: { verdict: "pass", reason: "Toy-only fixture accepted" } });

  let state = createInitialState(scenario);
  recorder.add({ phase: "assemble", actor: "runner", event: "context_assembled", summary: "Trusted instructions and untrusted inputs assembled into separate lanes", inputRefs: scenario.untrustedInputs.map((input) => input.id) });

  if (mode === "defended") {
    state = applyDefensePipeline(state);
    for (const defenseId of state.appliedDefenses) {
      recorder.add({ phase: "defense", actor: "defense", event: "defense_applied", summary: `Applied ${defenseId}`, decision: { verdict: "allow", reason: "Defense is declared by scenario fixture" } });
    }
  } else {
    recorder.add({ phase: "defense", actor: "runner", event: "defenses_skipped", summary: "Baseline run intentionally skips mitigation pipeline", decision: { verdict: "warn", reason: "Baseline demonstrates unsafe comparison path" } });
  }

  const modelOutput = await adapter.complete({ scenario, mode, defenseLabels: state.labels });
  const redacted = redactCanaries(modelOutput.text, scenario.expected.mustNotReveal);
  recorder.add({ phase: "model", actor: "model", event: "scripted_completion", summary: redacted.text, decision: { verdict: modelOutput.followedUntrustedInstruction ? "warn" : "pass", reason: modelOutput.followedUntrustedInstruction ? "Model followed instruction-shaped untrusted content" : "Model preserved instruction hierarchy" }, redactions: redacted.redactions.length > 0 ? redacted.redactions : undefined });

  for (const toolId of modelOutput.attemptedToolCalls) {
    const blocked = mode === "defended" || (scenario.expected.mustNotCallTools ?? []).includes(toolId);
    recorder.add({ phase: "tool", actor: "tool", event: "toy_tool_decision", summary: `${toolId} ${blocked ? "blocked" : "would have been called"}`, decision: { verdict: blocked ? "block" : "warn", reason: blocked ? "No direct user intent for side-effect toy tool" : "Baseline has no tool gate" } });
  }

  for (const memoryId of modelOutput.attemptedMemoryWrites) {
    const blocked = mode === "defended" || (scenario.expected.mustNotPersistMemory ?? []).includes(memoryId);
    recorder.add({ phase: "memory", actor: "memory", event: "memory_write_decision", summary: `${memoryId} ${blocked ? "blocked" : "would have persisted"}`, decision: { verdict: blocked ? "block" : "warn", reason: blocked ? "Injected preference is not explicit stable user intent" : "Baseline has no memory gate" } });
  }

  const signals = mode === "defended" ? defendedSignalsFor() : baselineSignalsFor(scenario);
  const score = scoreRun(scenario, signals);
  recorder.add({ phase: "score", actor: "scorer", event: "score_computed", summary: `${score.total}/${score.passThreshold} ${score.verdict}`, scores: Object.fromEntries(score.dimensions.map((dimension) => [dimension.id, dimension.earned])), decision: { verdict: score.verdict === "pass" ? "pass" : "fail", reason: "Deterministic observable scoring" } });
  recorder.add({ phase: "report", actor: "runner", event: "report_ready", summary: "Run result ready for CLI and web trace viewer" });

  return {
    runId,
    scenarioId: scenario.id,
    defenseIds: mode === "defended" ? state.appliedDefenses : [],
    score,
    trace: recorder.events(),
    finalOutput: redacted.text,
    verdict: score.verdict,
    mode,
  };
}

export async function runScenarioPair(scenario: Scenario) {
  const baseline = await runScenario(scenario, { mode: "baseline" });
  const defended = await runScenario(scenario, { mode: "defended" });
  return { baseline, defended };
}

import type { Scenario, DefensePattern } from "./schema";

export type RunnerState = {
  scenario: Scenario;
  labels: string[];
  blockedTools: string[];
  memoryWritesBlocked: string[];
  appliedDefenses: string[];
};

const PATTERN_LABELS: Record<DefensePattern, string> = {
  boundary_labeling: "Trusted and untrusted context are explicitly labeled.",
  tool_gate: "Side-effect toy tools require direct user intent.",
  source_tiers: "Canonical toy sources outrank untrusted or stale sources.",
  memory_gate: "Memory writes require explicit stable user preference.",
  canary_guard: "Fake canaries are redacted from final output.",
  output_validation: "Structured evidence beats narrative claims.",
  context_budget: "Low-integrity context is summarized with provenance.",
};

export function createInitialState(scenario: Scenario): RunnerState {
  return { scenario, labels: [], blockedTools: [], memoryWritesBlocked: [], appliedDefenses: [] };
}

export function applyDefensePipeline(state: RunnerState): RunnerState {
  return state.scenario.defenses.reduce((current, defense) => {
    const next: RunnerState = {
      ...current,
      labels: [...current.labels, PATTERN_LABELS[defense.pattern]],
      appliedDefenses: [...current.appliedDefenses, defense.id],
    };
    if (defense.pattern === "tool_gate") {
      next.blockedTools = [...new Set([...next.blockedTools, ...(state.scenario.expected.mustNotCallTools ?? [])])];
    }
    if (defense.pattern === "memory_gate") {
      next.memoryWritesBlocked = [...new Set([...next.memoryWritesBlocked, ...(state.scenario.expected.mustNotPersistMemory ?? [])])];
    }
    return next;
  }, state);
}

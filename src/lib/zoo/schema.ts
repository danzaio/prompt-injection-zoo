import { z } from "zod";

export const scenarioCategorySchema = z.enum([
  "indirect_prompt_injection",
  "tool_misuse",
  "rag_poisoning",
  "memory_poisoning",
  "cross_agent_contamination",
  "context_poisoning",
  "output_handling",
  "instruction_hierarchy",
]);

export const defensePatternSchema = z.enum([
  "boundary_labeling",
  "tool_gate",
  "source_tiers",
  "memory_gate",
  "canary_guard",
  "output_validation",
  "context_budget",
]);

export const scenarioSchema = z.object({
  id: z.string().min(3),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().min(3),
  animal: z.object({
    name: z.string().min(2),
    species: z.string().min(2),
    tagline: z.string().min(3),
  }),
  summary: z.string().min(20),
  category: scenarioCategorySchema,
  difficulty: z.enum(["intro", "intermediate", "advanced"]),
  safetyLevel: z.enum(["benign", "simulated_sensitive", "blocked_real_world"]),
  owasp: z.array(z.string().min(2)).min(1),
  learningObjectives: z.array(z.string().min(8)).min(1),
  mission: z.object({
    userPrompt: z.string().min(8),
    successCriteria: z.array(z.string().min(4)).min(1),
  }),
  trustedContext: z.object({
    systemPrompt: z.string().min(8),
    developerPrompt: z.string().min(8).optional(),
  }),
  untrustedInputs: z.array(z.object({
    id: z.string().min(1),
    channel: z.enum(["retrieved_doc", "tool_output", "webpage", "email", "file", "memory", "peer_agent", "cache", "log"]),
    label: z.string().min(2),
    content: z.string().min(12),
    safePayloadShape: z.string().min(8),
  })).min(1),
  toyTools: z.array(z.object({
    id: z.string().regex(/^toy_[a-z0-9_]+$/),
    kind: z.enum(["read_only", "side_effect_stub", "memory_stub"]),
    description: z.string().min(8),
    requiresUserIntent: z.boolean(),
  })),
  defenses: z.array(z.object({
    id: z.string().min(2),
    name: z.string().min(3),
    description: z.string().min(12),
    pattern: defensePatternSchema,
  })).min(1),
  expected: z.object({
    safeBehavior: z.array(z.string().min(5)).min(1),
    unsafeBehavior: z.array(z.string().min(5)).min(1),
    mustNotReveal: z.array(z.string()).default([]),
    mustNotCallTools: z.array(z.string()).optional(),
    mustNotPersistMemory: z.array(z.string()).optional(),
  }),
  scoring: z.object({
    passThreshold: z.number().int().min(1).max(100),
    weights: z.record(z.string(), z.number().int().min(0).max(100)),
    signals: z.array(z.string().min(3)).min(1),
  }),
  safety: z.object({
    allowed: z.array(z.string().min(3)).min(1),
    forbidden: z.array(z.string().min(3)).min(1),
    notes: z.array(z.string().min(3)).min(1),
  }),
  metadata: z.object({
    version: z.string().min(1),
    references: z.array(z.string().min(2)).min(1),
    tags: z.array(z.string().min(2)).min(1),
  }),
});

export const traceEventSchema = z.object({
  traceId: z.string().min(1),
  runId: z.string().min(1),
  scenarioId: z.string().min(1),
  sequence: z.number().int().min(1),
  timestamp: z.string().datetime(),
  phase: z.enum(["load", "validate", "assemble", "defense", "model", "tool", "memory", "score", "report"]),
  actor: z.enum(["runner", "defense", "model", "tool", "memory", "scorer"]),
  event: z.string().min(1),
  summary: z.string().min(1),
  inputRefs: z.array(z.string()).optional(),
  outputRef: z.string().optional(),
  decision: z.object({
    verdict: z.enum(["allow", "block", "warn", "pass", "fail"]),
    reason: z.string().min(1),
  }).optional(),
  scores: z.record(z.string(), z.number()).optional(),
  redactions: z.array(z.object({
    field: z.string().min(1),
    reason: z.string().min(1),
  })).optional(),
});

export const scoreDimensionSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  earned: z.number().min(0),
  possible: z.number().min(0),
  passed: z.boolean(),
});

export const scoreSummarySchema = z.object({
  total: z.number().min(0).max(100),
  passThreshold: z.number().min(0).max(100),
  verdict: z.enum(["pass", "fail", "warning"]),
  dimensions: z.array(scoreDimensionSchema),
});

export const runResultSchema = z.object({
  runId: z.string().min(1),
  scenarioId: z.string().min(1),
  defenseIds: z.array(z.string()),
  score: scoreSummarySchema,
  trace: z.array(traceEventSchema),
  finalOutput: z.string(),
  verdict: z.enum(["pass", "fail", "warning"]),
  mode: z.enum(["baseline", "defended"]),
});

export type Scenario = z.infer<typeof scenarioSchema>;
export type TraceEvent = z.infer<typeof traceEventSchema>;
export type ScoreSummary = z.infer<typeof scoreSummarySchema>;
export type RunResult = z.infer<typeof runResultSchema>;
export type DefensePattern = z.infer<typeof defensePatternSchema>;

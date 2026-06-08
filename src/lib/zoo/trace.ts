import { traceEventSchema, type TraceEvent } from "./schema";

export type TraceRecorder = {
  add(event: Omit<TraceEvent, "traceId" | "runId" | "scenarioId" | "sequence" | "timestamp">): TraceEvent;
  events(): TraceEvent[];
};

export function createTraceRecorder(input: { runId: string; scenarioId: string; timestamp?: string }): TraceRecorder {
  const trace: TraceEvent[] = [];
  const timestamp = input.timestamp ?? "2026-01-01T00:00:00.000Z";
  return {
    add(event) {
      const next = traceEventSchema.parse({
        ...event,
        traceId: `${input.runId}:trace:${String(trace.length + 1).padStart(3, "0")}`,
        runId: input.runId,
        scenarioId: input.scenarioId,
        sequence: trace.length + 1,
        timestamp,
      });
      trace.push(next);
      return next;
    },
    events() {
      return [...trace];
    },
  };
}

export function serializeTraceJsonl(trace: readonly TraceEvent[]): string {
  return trace.map((event) => JSON.stringify(event)).join("\n") + "\n";
}

export function parseTraceJsonl(jsonl: string): TraceEvent[] {
  return jsonl
    .split(/\r?\n/)
    .filter(Boolean)
    .map((line) => traceEventSchema.parse(JSON.parse(line)));
}

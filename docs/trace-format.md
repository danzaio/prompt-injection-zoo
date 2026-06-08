# Trace format

Traces are JSONL files. Each line is one `TraceEvent` validated by `traceEventSchema`.

```ts
type TraceEvent = {
  traceId: string;
  runId: string;
  scenarioId: string;
  sequence: number;
  timestamp: string;
  phase: 'load' | 'validate' | 'assemble' | 'defense' | 'model' | 'tool' | 'memory' | 'score' | 'report';
  actor: 'runner' | 'defense' | 'model' | 'tool' | 'memory' | 'scorer';
  event: string;
  summary: string;
  inputRefs?: string[];
  outputRef?: string;
  decision?: {
    verdict: 'allow' | 'block' | 'warn' | 'pass' | 'fail';
    reason: string;
  };
  scores?: Record<string, number>;
  redactions?: Array<{ field: string; reason: string }>;
};
```

## Determinism

MVP traces use a fixed timestamp and run ID format:

```txt
<scenario-slug>:<mode>:fixed
```

Sequences start at 1 and increase by one. Golden traces live in `fixtures/traces`.

No trace should include random IDs, current timestamps, machine-local paths, external URLs from payloads, provider output, or network results.

## Lanes in the UI

The web viewer groups trace meaning through phase and actor:

- Trusted and untrusted assembly: `assemble`.
- Defense decisions: `defense`.
- Scripted local model output: `model`.
- Toy tool containment: `tool`.
- Toy memory containment: `memory`.
- Deterministic score: `score`.

## JSONL export

```bash
pnpm zoo:run red-panda-footnote --mode defended --format jsonl
```

This prints only trace events, one JSON object per line. Use `--format json` for the full run result and `--format markdown` for a report view.

## Validation checks

Trace tests should verify:

- Every JSONL line parses with `traceEventSchema`.
- `sequence` is contiguous and starts at 1.
- Regenerated deterministic traces match committed golden fixtures.
- Redaction metadata appears when final output contains a fake canary.

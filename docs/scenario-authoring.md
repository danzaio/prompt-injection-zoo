# Scenario authoring

[Português do Brasil](pt-BR/scenario-authoring.md)

A Prompt Injection Zoo scenario is a local, toy, versioned fixture. It teaches one agent-context failure mode without enabling real-world abuse.

## Required shape

Create `scenarios/<slug>.json` and validate it through `scenarioSchema` in `src/lib/zoo/schema.ts`.

Every scenario needs:

- `id`, `slug`, `title`, `animal`, and `summary`.
- One category from the schema enum.
- `safetyLevel` set to `benign` or `simulated_sensitive` for MVP use.
- OWASP mappings.
- Learning objectives.
- Benign user mission and success criteria.
- Trusted context.
- At least one untrusted input with `safePayloadShape`.
- Defense entries with known defense patterns.
- Expected safe and unsafe behavior.
- Safety metadata with allowed, forbidden, and notes.

## Safety rules

Do not include:

- Real target URLs in payload content.
- Real-looking credentials or API keys.
- Live exfiltration endpoints.
- Real phishing, scraping, malware, exploit, shell, or destructive instructions.
- Non-toy tool names.
- Tools with network, shell, delete, wipe, or scrape semantics.

Use fake canaries such as `ZOO_CANARY_DO_NOT_REVEAL_011`.

## Add a scenario

1. Copy an existing scenario JSON.
2. Change the animal, category, mission, untrusted input, defense, expected behavior, and tags.
3. Run `pnpm test tests/schema.test.ts tests/safety.test.ts`.
4. Generate traces with `pnpm tsx src/cli/write-traces.ts <slug>`.
5. Run `pnpm zoo:run <slug> --mode baseline`.
6. Run `pnpm zoo:run <slug> --mode defended`.
7. Run `pnpm zoo:run <slug> --mode defended --format jsonl`.
8. Run `pnpm zoo:eval`.
9. Add docs if the scenario creates a new teaching pattern.

## Golden trace requirements

For each MVP scenario, commit both:

- `fixtures/traces/<slug>.baseline.jsonl`.
- `fixtures/traces/<slug>.defended.jsonl`.

Traces must use the fixed timestamp and run ID format from `docs/trace-format.md`. Do not include random IDs, current clocks, provider responses, network results, or host-specific paths.

## Review checklist

- Payload is harmless and local.
- Defense teaches a named mitigation.
- Expected safe behavior is observable.
- Expected unsafe behavior is toy-only.
- Defended score is at least baseline score.
- Trace is deterministic under fixed ID and timestamp.
- The scenario passes `assertScenarioSafety`.
- README catalog and docs stay accurate.

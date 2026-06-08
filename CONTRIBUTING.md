# Contributing

Prompt Injection Zoo accepts defensive, local-first scenario and tooling contributions only.

## Safe scenario rules

A scenario must:

- Use toy-only payloads and fake canaries.
- Use local toy tools only, such as `toy_search`, `toy_send_message`, or `toy_write_memory`.
- Include `safetyLevel`, OWASP mappings, learning objectives, safety notes, and explicit non-goals.
- Show the compromised context or channel without providing real-world offensive instructions.
- Produce deterministic baseline and defended traces.
- Pass schema validation, safety gates, runner tests, trace tests, and catalog invariants.

A scenario must not include:

- Real targets, real URLs in payload content, real credentials, or operational exploit steps.
- Real exfiltration, phishing, malware, scraping, destructive actions, or host/network automation.
- Prompt packs for attacking deployed systems.
- Model-provider dependencies or API-key requirements in MVP fixtures.

## Local checks

Run the release gate before opening a pull request:

```bash
pnpm install
pnpm lint
pnpm test
pnpm build
pnpm zoo:eval
```

For a new scenario, also verify one focused run:

```bash
pnpm zoo:run <scenario-slug> --mode baseline
pnpm zoo:run <scenario-slug> --mode defended
pnpm zoo:run <scenario-slug> --mode defended --format jsonl
```

## Authoring flow

1. Copy an existing scenario fixture in `scenarios/`.
2. Keep the payload harmless and explicitly labeled as untrusted content.
3. Add or regenerate matching baseline and defended trace fixtures in `fixtures/traces/`.
4. Add tests if the new scenario exercises a new safety, scoring, or runner invariant.
5. Update README catalog/docs when the public teaching path changes.

See `docs/scenario-authoring.md` for the full scenario contract.

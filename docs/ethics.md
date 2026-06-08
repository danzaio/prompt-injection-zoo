# Safety and ethics

[Português do Brasil](pt-BR/ethics.md)

Prompt Injection Zoo is defensive education software. Every scenario is local, toy-only, and written to teach context-boundary handling without enabling real-world abuse.

## Boundaries

- Fake canaries only, for example `ZOO_CANARY_DO_NOT_REVEAL_001`.
- Toy tools only, such as `toy_search`, `toy_send_message`, and `toy_write_memory`.
- No live targets, real credentials, real exfiltration URLs, destructive tools, browser automation, host filesystem control, or network actions.
- No provider adapters in the MVP.
- No prompt packs for attacking deployed systems.

## Scenario rule

A valid scenario must include safety metadata, OWASP mappings, learning objectives, safe payload shape, explicit non-goals, and forbidden behavior.

The safety gate rejects real-looking credentials, external URLs in scenario content, destructive toy tool names, blocked real-world safety levels, and untrusted payload text aimed at real systems.

## Intended use

Use this repo to teach and evaluate defensive concepts:

- Instruction hierarchy.
- Trust-boundary labeling.
- Tool and memory authorization.
- Source provenance.
- Evidence over narrative logs.
- Canary redaction.

Do not use it to develop, package, or distribute operational jailbreaks, phishing flows, credential collection, malware, exfiltration, scraping, or live target scanning.

## Reporting safety issues

See `SECURITY.md` for the reporting policy. Do not include real secrets or real target data in a report. Use fake canaries instead.

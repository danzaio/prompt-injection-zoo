# Documentation

[Português do Brasil](pt-BR/index.md)

Prompt Injection Zoo docs are split by task so readers can start from the artifact they need, like major GitHub projects that keep the README short and route deeper material into focused guides.

## Start here

- [Safety and ethics](ethics.md): scope, boundaries, and intended defensive use.
- [Scenario authoring](scenario-authoring.md): required JSON shape, safety rules, golden traces, and review checklist.
- [Scoring](scoring.md): deterministic scoring dimensions, verdicts, and guardrails.
- [Trace format](trace-format.md): JSONL schema, determinism rules, UI lanes, and validation checks.
- [Landscape](landscape.md): how this project differs from scanners, provider red-team suites, benchmarks, and games.
- [Demo script](demo-script.md): browser and CLI flow for screenshots, README GIFs, or portfolio recordings.

## Language support

- English docs live in `docs/`.
- Brazilian Portuguese docs live in `docs/pt-BR/`.
- Root-level documents have matching PT-BR files where useful: `README.pt-BR.md`, `CONTRIBUTING.pt-BR.md`, and `SECURITY.pt-BR.md`.

## Documentation rule

Keep English and PT-BR docs semantically aligned. The translation can use natural Portuguese, but it must not change safety scope, release checks, scenario requirements, or claims about benchmark/provider support.

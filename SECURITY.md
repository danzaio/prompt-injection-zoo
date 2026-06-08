# Security policy

Prompt Injection Zoo is a defensive education lab. It does not scan external targets, execute real tools, call paid model providers, or require credentials in the MVP.

## Supported surface

Security reports for this repository should focus on:

- Scenario safety gate bypasses.
- Real credential or target data accidentally accepted by fixtures.
- Toy tools that could become real side-effect or network tools.
- Output redaction failures for fake canaries.
- Documentation that overstates the repo as a production scanner or benchmark.

## Out of scope

The following are not valid security findings for this MVP:

- Prompt attacks against real third-party models or deployed systems.
- Requests for jailbreak prompt packs or offensive payload corpora.
- Network exploitation, phishing, scraping, malware, or credential-harvesting workflows.
- Issues requiring a paid provider adapter, because provider adapters are not part of the MVP.

## Reporting

If you find a safety or security issue, open a GitHub issue with:

- The affected file or scenario slug.
- The exact local command that reproduces the issue.
- The expected defensive behavior.
- The observed behavior.

Do not include real secrets or real target data in a report. Replace them with fake canaries such as `ZOO_CANARY_DO_NOT_REVEAL_REPORT`.

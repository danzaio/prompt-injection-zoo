# Landscape

[Português do Brasil](pt-BR/landscape.md)

Prompt Injection Zoo is intentionally not a clone of existing scanners, eval frameworks, benchmarks, or hosted games.

| Project | Main purpose | Difference |
| --- | --- | --- |
| NVIDIA garak | Broad LLM vulnerability scanner | Zoo is curated local education with deterministic toy traces. |
| promptfoo red-team | Developer red-team and eval framework | Zoo is not CI red-teaming or provider scanning in the MVP. |
| Microsoft PyRIT | Professional GenAI risk framework | Zoo is a small portfolio-grade teaching lab. |
| AgentDojo and InjecAgent | Academic tool-agent benchmarks | Zoo has no leaderboard and makes no benchmark-validity claim. |
| Gandalf and HackAPrompt | Hosted prompt-hacking games | Zoo is defensive, local-first, and trace-first. |

## Positioning

Zoo is a premium local teaching lab plus deterministic toy eval runner. It does not try to replace scanner workflows, model-provider red-team suites, or academic benchmark harnesses.

Each animal keeps the learning unit small:

1. A benign mission.
2. One compromised context or channel.
3. A harmless payload shape.
4. A named defense pattern.
5. A trace replay.
6. Observable scoring signals.

## Non-claims

Zoo does not claim broad model coverage, leaderboard validity, exploit completeness, or production assurance. Its value is traceable agent-safety literacy: builders can see why a boundary failed and how a deterministic defense changed the run.

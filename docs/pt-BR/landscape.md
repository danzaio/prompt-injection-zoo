# Landscape

[English](../landscape.md) | Português do Brasil

Prompt Injection Zoo intencionalmente não é clone de scanners, frameworks de eval, benchmarks ou jogos hospedados existentes.

| Projeto | Propósito principal | Diferença |
| --- | --- | --- |
| NVIDIA garak | Scanner amplo de vulnerabilidades de LLM | Zoo é educação local curada com traces toy determinísticos. |
| promptfoo red-team | Framework de red-team e eval para devs | Zoo não é red-team em CI nem scanner de provedores no MVP. |
| Microsoft PyRIT | Framework profissional de risco GenAI | Zoo é um laboratório pequeno, portfolio-grade, para ensino. |
| AgentDojo e InjecAgent | Benchmarks acadêmicos para agentes com ferramentas | Zoo não tem leaderboard e não reivindica validade de benchmark. |
| Gandalf e HackAPrompt | Jogos hospedados de prompt hacking | Zoo é defensivo, local-first e trace-first. |

## Posicionamento

Zoo é um laboratório local premium de ensino mais um runner toy determinístico de eval. Ele não tenta substituir workflows de scanner, suites de red-team com provedores de modelos ou harnesses acadêmicos de benchmark.

Cada animal mantém pequena a unidade de aprendizado:

1. Uma missão benigna.
2. Um contexto ou canal comprometido.
3. Um formato de payload inofensivo.
4. Um padrão de defesa nomeado.
5. Um replay de trace.
6. Sinais observáveis de pontuação.

## Não reivindica

Zoo não reivindica cobertura ampla de modelos, validade de leaderboard, completude de exploração ou garantia de produção. Seu valor é alfabetização rastreável em segurança de agentes: builders conseguem ver por que uma fronteira falhou e como uma defesa determinística mudou a execução.

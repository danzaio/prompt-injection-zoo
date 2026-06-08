# Autoria de cenários

[English](../scenario-authoring.md) | Português do Brasil

Um cenário do Prompt Injection Zoo é uma fixture local, toy e versionada. Ele ensina um modo de falha em contexto de agente sem habilitar abuso real.

## Formato obrigatório

Crie `scenarios/<slug>.json` e valide com `scenarioSchema` em `src/lib/zoo/schema.ts`.

Todo cenário precisa de:

- `id`, `slug`, `title`, `animal` e `summary`.
- Uma categoria do enum do schema.
- `safetyLevel` como `benign` ou `simulated_sensitive` para uso no MVP.
- Mapeamentos OWASP.
- Objetivos de aprendizado.
- Missão benigna do usuário e critérios de sucesso.
- Contexto confiável.
- Pelo menos uma entrada não confiável com `safePayloadShape`.
- Entradas de defesa com padrões de defesa conhecidos.
- Comportamento seguro e inseguro esperado.
- Metadados de segurança com permitido, proibido e notas.

## Regras de segurança

Não inclua:

- URLs de alvos reais no conteúdo do payload.
- Credenciais ou API keys com aparência real.
- Endpoints vivos de exfiltração.
- Phishing, scraping, malware, exploit, shell ou instruções destrutivas reais.
- Nomes de ferramentas não-toy.
- Ferramentas com semântica de rede, shell, delete, wipe ou scrape.

Use canaries falsos como `ZOO_CANARY_DO_NOT_REVEAL_011`.

## Adicionar um cenário

1. Copie um JSON de cenário existente.
2. Altere animal, categoria, missão, entrada não confiável, defesa, comportamento esperado e tags.
3. Rode `pnpm test tests/schema.test.ts tests/safety.test.ts`.
4. Gere traces com `pnpm tsx src/cli/write-traces.ts <slug>`.
5. Rode `pnpm zoo:run <slug> --mode baseline`.
6. Rode `pnpm zoo:run <slug> --mode defended`.
7. Rode `pnpm zoo:run <slug> --mode defended --format jsonl`.
8. Rode `pnpm zoo:eval`.
9. Adicione docs se o cenário criar um novo padrão de ensino.

## Requisitos de golden trace

Para cada cenário do MVP, commite ambos:

- `fixtures/traces/<slug>.baseline.jsonl`.
- `fixtures/traces/<slug>.defended.jsonl`.

Traces precisam usar timestamp fixo e formato de run ID de `docs/pt-BR/trace-format.md`. Não inclua IDs aleatórios, relógios atuais, respostas de provedores, resultados de rede ou caminhos específicos da máquina.

## Checklist de revisão

- Payload é inofensivo e local.
- Defesa ensina uma mitigação nomeada.
- Comportamento seguro esperado é observável.
- Comportamento inseguro esperado é toy-only.
- Pontuação defended é pelo menos a baseline.
- Trace é determinístico com ID e timestamp fixos.
- O cenário passa `assertScenarioSafety`.
- Catálogo do README e docs permanecem corretos.

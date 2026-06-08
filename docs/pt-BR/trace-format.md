# Formato de trace

[English](../trace-format.md) | Português do Brasil

Traces são arquivos JSONL. Cada linha é um `TraceEvent` validado por `traceEventSchema`.

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

## Determinismo

Traces do MVP usam timestamp fixo e formato de run ID:

```txt
<scenario-slug>:<mode>:fixed
```

Sequências começam em 1 e aumentam de um em um. Golden traces ficam em `fixtures/traces`.

Nenhum trace deve incluir IDs aleatórios, timestamps atuais, caminhos locais da máquina, URLs externas vindas de payloads, saída de provedor ou resultados de rede.

## Trilhas na UI

O visualizador web agrupa o significado do trace por phase e actor:

- Montagem confiável e não confiável: `assemble`.
- Decisões de defesa: `defense`.
- Saída local do modelo roteirizado: `model`.
- Contenção de ferramenta toy: `tool`.
- Contenção de memória toy: `memory`.
- Pontuação determinística: `score`.

## Exportação JSONL

```bash
pnpm zoo:run red-panda-footnote --mode defended --format jsonl
```

Isso imprime apenas eventos de trace, um objeto JSON por linha. Use `--format json` para o resultado completo da execução e `--format markdown` para uma visão em relatório.

## Checks de validação

Testes de trace devem verificar:

- Cada linha JSONL faz parse com `traceEventSchema`.
- `sequence` é contígua e começa em 1.
- Traces determinísticos regenerados batem com fixtures golden commitadas.
- Metadados de redação aparecem quando a saída final contém um canary falso.

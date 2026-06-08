# Contribuindo

[English](CONTRIBUTING.md) | Português do Brasil

Prompt Injection Zoo aceita apenas contribuições defensivas, local-first, de cenários e ferramentas.

## Regras para cenários seguros

Um cenário deve:

- Usar apenas payloads toy e canaries falsos.
- Usar apenas ferramentas toy locais, como `toy_search`, `toy_send_message` ou `toy_write_memory`.
- Incluir `safetyLevel`, mapeamentos OWASP, objetivos de aprendizado, notas de segurança e não-objetivos explícitos.
- Mostrar o contexto ou canal comprometido sem fornecer instruções ofensivas reais.
- Produzir traces determinísticos baseline e defended.
- Passar validação de schema, safety gates, testes do runner, testes de trace e invariantes de catálogo.

Um cenário não deve incluir:

- Alvos reais, URLs reais no conteúdo do payload, credenciais reais ou passos operacionais de exploração.
- Exfiltração real, phishing, malware, scraping, ações destrutivas ou automação de host/rede.
- Pacotes de prompts para atacar sistemas implantados.
- Dependências de provedores de modelo ou requisitos de API key em fixtures do MVP.

## Checks locais

Rode o release gate antes de abrir um pull request:

```bash
pnpm install
pnpm lint
pnpm test
pnpm build
pnpm zoo:eval
```

Para um novo cenário, verifique também uma execução focada:

```bash
pnpm zoo:run <scenario-slug> --mode baseline
pnpm zoo:run <scenario-slug> --mode defended
pnpm zoo:run <scenario-slug> --mode defended --format jsonl
```

## Fluxo de autoria

1. Copie uma fixture existente em `scenarios/`.
2. Mantenha o payload inofensivo e explicitamente rotulado como conteúdo não confiável.
3. Adicione ou regenere as fixtures de trace baseline e defended correspondentes em `fixtures/traces/`.
4. Adicione testes se o novo cenário exercitar uma nova invariável de segurança, pontuação ou runner.
5. Atualize o catálogo do README/docs quando o caminho público de ensino mudar.

Veja `docs/pt-BR/scenario-authoring.md` para o contrato completo de cenário.

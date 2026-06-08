# Roteiro de demo

[English](../demo-script.md) | Português do Brasil

Use esta sequência para um GIF de README ou uma gravação curta de portfolio.

## Setup

```bash
pnpm install
pnpm dev
```

Abra `http://localhost:3000`.

## Fluxo no browser

1. Abra `/` no desktop.
2. Mostre o preview de trace no hero e o banner de segurança.
3. Role até o índice de espécimes.
4. Abra Red Panda Footnote.
5. Mostre missão confiável vs payload não confiável.
6. Mostre a pontuação baseline ao lado da pontuação defended.
7. Role pelo replay do trace defended.
8. Repita o mesmo fluxo em viewport mobile estreita e confirme que não há overflow horizontal.

## Corte para CLI

```bash
pnpm zoo:run red-panda-footnote --mode baseline
pnpm zoo:run red-panda-footnote --mode defended
pnpm zoo:run red-panda-footnote --mode defended --format jsonl
pnpm zoo:eval
```

## Alvos de screenshot

- `docs/screenshots/home-desktop.png`: landing page com preview real de trace.
- `docs/screenshots/red-panda-detail-desktop.png`: detalhe de cenário com payload, defesa, pontuação e trace.

Se screenshots forem atualizados, capture apenas dados reais de fixture. Não adicione overlays falsos de dashboard nem screenshots de produtos externos.

## Notas de captura

- Mantenha o terminal grande o suficiente para ler pontuações.
- Inclua o framing de segurança antes de mostrar texto de payload.
- Evite movimento rápido na gravação.
- Se reduced motion estiver habilitado, o trace precisa continuar legível sem animação.
- Não grave API keys nem variáveis de ambiente. O MVP não precisa de nenhuma.

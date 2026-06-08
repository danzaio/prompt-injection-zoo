# Demo script

Use this sequence for a README GIF or short portfolio recording.

## Setup

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Browser flow

1. Open `/` on desktop.
2. Show the hero trace preview and safety banner.
3. Scroll to the specimen index.
4. Open Red Panda Footnote.
5. Show trusted mission vs untrusted payload.
6. Show baseline score beside defended score.
7. Scroll through defended trace replay.
8. Repeat the same flow in a narrow mobile viewport and confirm no horizontal overflow.

## CLI cutaway

```bash
pnpm zoo:run red-panda-footnote --mode baseline
pnpm zoo:run red-panda-footnote --mode defended
pnpm zoo:run red-panda-footnote --mode defended --format jsonl
pnpm zoo:eval
```

## Screenshot targets

- `docs/screenshots/home-desktop.png`: landing page with real trace preview.
- `docs/screenshots/red-panda-detail-desktop.png`: scenario detail with payload, defense, score, and trace.

If screenshots are refreshed, capture real fixture data only. Do not add fake dashboard overlays or external product screenshots.

## Capture notes

- Keep the terminal large enough to read scores.
- Include safety framing before showing payload text.
- Avoid fast motion in the recording.
- If reduced motion is enabled, the trace must remain readable without playback animation.
- Do not record API keys or environment variables. The MVP does not need any.

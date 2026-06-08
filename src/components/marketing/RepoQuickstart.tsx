export function RepoQuickstart() {
  return (
    <section id="quickstart" className="mx-auto max-w-7xl px-4 py-20 md:px-8">
      <div className="grid gap-6 md:grid-cols-[0.8fr_1.2fr] md:items-center">
        <div>
          <h2 className="text-4xl font-semibold tracking-[-0.05em]">Start locally in three commands.</h2>
          <p className="mt-4 max-w-[52ch] text-sm leading-6 text-[color:var(--zoo-muted)]">Everything runs from local fixtures and a scripted adapter. No API key, cloud account, browser automation, or database is required.</p>
        </div>
        <div className="rounded-[2rem] border border-[color:var(--zoo-line)] bg-white/[0.035] p-2">
          <pre className="overflow-x-auto rounded-[calc(2rem-0.5rem)] bg-[#0a1513] p-6 font-mono text-sm leading-7 text-[color:var(--zoo-accent)] md:p-8"><code>{"pnpm install\npnpm dev\npnpm zoo:eval"}</code></pre>
        </div>
      </div>
    </section>
  );
}

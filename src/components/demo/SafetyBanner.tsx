export function SafetyBanner() {
  return (
    <aside className="rounded-[1.75rem] border border-[color:var(--zoo-line)] bg-[rgba(115,243,191,0.06)] p-2">
      <div className="rounded-[calc(1.75rem-0.5rem)] bg-[#091613] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.10)]">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--zoo-accent)]">Safety note</p>
        <p className="mt-3 max-w-[70ch] text-sm leading-6 text-[color:var(--zoo-muted)]">
          This is a safe teaching lab. It uses fake canaries, local fixtures, and toy tools only. No live targets, provider keys, telemetry, scraping, or destructive actions.
        </p>
      </div>
    </aside>
  );
}

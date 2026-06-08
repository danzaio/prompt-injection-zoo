import type { ScoreSummary } from "@/lib/zoo/schema";

export function ScoreBreakdown({ score, label }: { score: ScoreSummary; label: string }) {
  const isPass = score.verdict === "pass";
  return (
    <div className="rounded-[1.75rem] border border-[color:var(--zoo-line)] bg-white/[0.035] p-2">
      <div className="rounded-[calc(1.75rem-0.5rem)] bg-[#0b1715] p-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs text-[color:var(--zoo-muted)]">{label}</p>
            <p className={`mt-1 text-5xl font-semibold tracking-[-0.05em] ${isPass ? "text-[color:var(--zoo-accent)]" : "text-[color:var(--zoo-fail)]"}`}>{score.total}</p>
          </div>
          <span className="rounded-full border border-[color:var(--zoo-line)] px-3 py-1 font-mono text-xs uppercase tracking-[0.16em] text-[color:var(--zoo-text)]">{score.verdict}</span>
        </div>
        <p className="mt-3 text-sm leading-6 text-[color:var(--zoo-muted)]">{isPass ? "This run kept the untrusted instruction from taking control." : "This run followed or trusted the unsafe text."}</p>
        <div className="mt-6 grid gap-2">
          {score.dimensions.map((dimension) => (
            <div key={dimension.id} className="grid grid-cols-[1fr_auto] gap-3 rounded-2xl border border-[color:var(--zoo-line)] bg-white/[0.025] p-3 text-sm">
              <span className="text-[color:var(--zoo-muted)]">{dimension.label}</span>
              <span className="font-mono text-[color:var(--zoo-text)]">{dimension.earned}/{dimension.possible}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

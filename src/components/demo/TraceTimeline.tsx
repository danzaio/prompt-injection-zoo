import type { TraceEvent } from "@/lib/zoo/schema";

const phaseTone: Record<TraceEvent["phase"], string> = {
  load: "text-slate-200",
  validate: "text-emerald-200",
  assemble: "text-cyan-200",
  defense: "text-[color:var(--zoo-accent)]",
  model: "text-violet-200",
  tool: "text-amber-200",
  memory: "text-amber-200",
  score: "text-green-200",
  report: "text-slate-200",
};

export function TraceTimeline({ trace }: { trace: TraceEvent[] }) {
  return (
    <ol className="grid gap-3">
      {trace.map((event) => (
        <li key={event.traceId} className="rounded-3xl border border-[color:var(--zoo-line)] bg-white/[0.03] p-4">
          <div className="grid gap-3 md:grid-cols-[7rem_1fr_auto] md:items-start">
            <div className="font-mono text-xs text-[color:var(--zoo-muted)]">#{String(event.sequence).padStart(2, "0")}</div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className={`font-mono text-xs ${phaseTone[event.phase]}`}>{event.phase}</span>
                <span className="font-mono text-xs text-[color:var(--zoo-muted)]">{event.actor}</span>
                {event.decision ? (
                  <span className="rounded-full border border-[color:var(--zoo-line)] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--zoo-accent)]">{event.decision.verdict}</span>
                ) : null}
              </div>
              <p className="mt-2 text-sm font-medium text-[color:var(--zoo-text)]">{event.event.replaceAll("_", " ")}</p>
              <p className="mt-1 text-sm leading-6 text-[color:var(--zoo-muted)]">{event.summary}</p>
            </div>
            {event.scores ? <span className="font-mono text-xs text-[color:var(--zoo-accent)]">scored</span> : null}
          </div>
        </li>
      ))}
    </ol>
  );
}

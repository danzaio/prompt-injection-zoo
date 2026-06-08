import type { RunResult, Scenario } from "@/lib/zoo/schema";

export function DefenseMatrix({ scenario, baseline, defended }: { scenario: Scenario; baseline: RunResult; defended: RunResult }) {
  const rows = [
    ["Attack source", scenario.untrustedInputs.map((input) => input.channel).join(", ")],
    ["Attack goal", scenario.expected.unsafeBehavior[0]],
    ["Unsafe text", scenario.untrustedInputs[0]?.label ?? "Untrusted fixture"],
    ["Defense used", scenario.defenses.map((defense) => defense.name).join(", ")],
    ["Baseline result", `${baseline.score.total}`],
    ["Defended result", `${defended.score.total}`],
  ];
  return (
    <div className="rounded-[1.75rem] border border-[color:var(--zoo-line)] bg-white/[0.035] p-2">
      <div className="rounded-[calc(1.75rem-0.5rem)] bg-[#0b1715] p-5">
        <h2 className="text-2xl font-semibold tracking-[-0.04em]">What this scenario compares</h2>
        <p className="mt-3 text-sm leading-6 text-[color:var(--zoo-muted)]">Baseline is the unsafe version. Defended shows the same scenario after the protection turns on.</p>
        <dl className="mt-5 grid gap-2">
          {rows.map(([label, value]) => (
            <div key={label} className="grid gap-2 rounded-2xl border border-[color:var(--zoo-line)] bg-white/[0.025] p-3 md:grid-cols-[11rem_1fr]">
              <dt className="font-mono text-xs text-[color:var(--zoo-accent)]">{label}</dt>
              <dd className="text-sm leading-6 text-[color:var(--zoo-muted)]">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

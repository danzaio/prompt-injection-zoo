import type { Scenario } from "@/lib/zoo/schema";

export function ScenarioSpecimen({ scenario }: { scenario: Scenario }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
      <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2rem] border border-[color:var(--zoo-line)] bg-white/[0.035] p-2">
          <div className="rounded-[calc(2rem-0.5rem)] bg-[#0b1715] p-6 md:p-8">
            <h2 className="text-4xl font-semibold tracking-[-0.05em]">Featured scenario: {scenario.animal.name}</h2>
            <p className="mt-4 max-w-[60ch] text-sm leading-6 text-[color:var(--zoo-muted)]">{scenario.summary}</p>
            <div className="mt-8 grid gap-3">
              <div className="rounded-3xl border border-[color:var(--zoo-line)] bg-white/[0.025] p-4">
                <p className="font-mono text-xs text-[color:var(--zoo-accent)]">goal</p>
                <p className="mt-2 text-sm leading-6 text-[color:var(--zoo-text)]">{scenario.mission.userPrompt}</p>
              </div>
              <div className="rounded-3xl border border-[color:var(--zoo-line)] bg-white/[0.025] p-4">
                <p className="font-mono text-xs text-[color:var(--zoo-accent)]">unsafe text shape</p>
                <p className="mt-2 text-sm leading-6 text-[color:var(--zoo-text)]">{scenario.untrustedInputs[0]?.safePayloadShape}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-[2rem] border border-[color:var(--zoo-line)] bg-[rgba(115,243,191,0.07)] p-2">
          <div className="rounded-[calc(2rem-0.5rem)] bg-[#07100f] p-6 md:p-8">
            <p className="font-mono text-xs text-[color:var(--zoo-accent)]">what it teaches</p>
            <ul className="mt-5 grid gap-3">
              {scenario.learningObjectives.map((objective) => (
                <li key={objective} className="rounded-2xl border border-[color:var(--zoo-line)] bg-white/[0.025] p-3 text-sm leading-6 text-[color:var(--zoo-muted)]">{objective}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import type { Scenario, TraceEvent } from "@/lib/zoo/schema";
import { SafetyBanner } from "../demo/SafetyBanner";

export function Hero({ scenario, trace }: { scenario: Scenario; trace: TraceEvent[] }) {
  const preview = trace.slice(0, 5);
  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-4 pt-16 md:grid-cols-[0.92fr_1.08fr] md:items-center md:px-8 md:pt-20">
      <div>
        <p className="mb-5 inline-flex rounded-full border border-[color:var(--zoo-line)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--zoo-accent)]">Safe local demo</p>
        <h1 className="max-w-4xl text-5xl font-semibold leading-[0.94] tracking-[-0.06em] text-balance md:text-7xl">Learn prompt injection with safe local examples.</h1>
        <p className="mt-6 max-w-[58ch] text-base leading-7 text-[color:var(--zoo-muted)]">Pick a scenario, compare the unsafe baseline with the defended run, and read the trace that explains the score.</p>
        <ul className="mt-6 grid gap-2 text-sm leading-6 text-[color:var(--zoo-muted)] md:max-w-[58ch]">
          <li>1. Open a scenario from the list below.</li>
          <li>2. Compare the baseline run with the defended run.</li>
          <li>3. Read the trace to see which step changed the score.</li>
        </ul>
        <div className="mt-8 flex flex-wrap gap-3">
          <a className="group inline-flex items-center gap-3 rounded-full bg-[color:var(--zoo-accent)] px-5 py-2.5 text-sm font-semibold text-[#06201a]" href="#quickstart">Start here <span className="grid h-7 min-w-7 place-items-center rounded-full bg-[#06201a]/10 px-2 font-mono text-[10px] uppercase tracking-[0.12em] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1">go</span></a>
          <Link className="inline-flex items-center rounded-full border border-[color:var(--zoo-line)] px-5 py-2.5 text-sm font-semibold text-[color:var(--zoo-text)]" href={`/scenarios/${scenario.slug}`}>Open scenario</Link>
        </div>
        <div className="mt-8"><SafetyBanner /></div>
      </div>
      <div className="rounded-[2rem] border border-[color:var(--zoo-line)] bg-white/[0.04] p-2 shadow-[0_30px_120px_rgba(0,0,0,0.35)]">
        <div className="rounded-[calc(2rem-0.5rem)] bg-[#0b1715] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
          <div className="flex items-center justify-between gap-4 font-mono text-xs text-[color:var(--zoo-muted)]">
            <span>Example defended trace</span>
            <span className="text-[color:var(--zoo-accent)]">From a real fixture</span>
          </div>
          <p className="mt-4 text-sm leading-6 text-[color:var(--zoo-muted)]">Each row is one step in the run: load, validate, assemble, defend, score, report.</p>
          <div className="mt-5 grid gap-3 font-mono text-xs">
            {preview.map((event) => (
              <div key={event.traceId} className="grid grid-cols-[6.5rem_1fr] gap-3 rounded-2xl border border-[color:var(--zoo-line)] bg-white/[0.035] p-3">
                <span className="text-[color:var(--zoo-accent)]">{event.phase}</span>
                <span className="text-[color:var(--zoo-text)]">{event.summary}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

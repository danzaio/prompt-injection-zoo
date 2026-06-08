import Link from "next/link";
import { notFound } from "next/navigation";
import { DefenseMatrix } from "@/components/demo/DefenseMatrix";
import { SafetyBanner } from "@/components/demo/SafetyBanner";
import { ScoreBreakdown } from "@/components/demo/ScoreBreakdown";
import { TraceTimeline } from "@/components/demo/TraceTimeline";
import { getScenarioSlugs } from "@/lib/zoo/load";
import { getScenarioViewModel } from "@/lib/zoo/catalog";

export async function generateStaticParams() {
  const slugs = await getScenarioSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ScenarioPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const slugs = await getScenarioSlugs();
  if (!slugs.includes(slug)) notFound();
  const { scenario, runs } = await getScenarioViewModel(slug);
  return (
    <main className="min-h-[100dvh] px-4 py-10 text-[color:var(--zoo-text)] md:px-8">
      <div className="mx-auto max-w-7xl">
        <Link href="/" className="font-mono text-sm text-[color:var(--zoo-accent)]">← Back to scenarios</Link>
        <section className="grid gap-8 pt-10 md:grid-cols-[0.9fr_1.1fr] md:items-start">
          <div>
            <p className="font-mono text-xs text-[color:var(--zoo-accent)]">{scenario.category.replaceAll("_", " ")}</p>
            <h1 className="mt-4 text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-7xl">{scenario.title}</h1>
            <p className="mt-5 max-w-[62ch] text-base leading-7 text-[color:var(--zoo-muted)]">{scenario.summary}</p>
            <div className="mt-6"><SafetyBanner /></div>
          </div>
          <DefenseMatrix scenario={scenario} baseline={runs.baseline} defended={runs.defended} />
        </section>

        <section className="grid gap-6 py-16 md:grid-cols-2">
          <div className="rounded-[1.75rem] border border-[color:var(--zoo-line)] bg-white/[0.035] p-2">
            <div className="rounded-[calc(1.75rem-0.5rem)] bg-[#0b1715] p-5">
              <h2 className="text-2xl font-semibold tracking-[-0.04em]">Trusted prompt</h2>
              <p className="mt-4 text-sm leading-6 text-[color:var(--zoo-muted)]">{scenario.mission.userPrompt}</p>
            </div>
          </div>
          <div className="rounded-[1.75rem] border border-[rgba(255,122,144,0.25)] bg-[rgba(255,122,144,0.05)] p-2">
            <div className="rounded-[calc(1.75rem-0.5rem)] bg-[#160d10] p-5">
              <h2 className="text-2xl font-semibold tracking-[-0.04em]">Untrusted text</h2>
              <p className="mt-4 text-sm leading-6 text-[color:var(--zoo-muted)]">{scenario.untrustedInputs[0]?.content}</p>
            </div>
          </div>
        </section>

        <section className="grid gap-6 pb-16 md:grid-cols-2">
          <ScoreBreakdown score={runs.baseline.score} label="Baseline score" />
          <ScoreBreakdown score={runs.defended.score} label="Defended score" />
        </section>

        <section className="pb-20">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-4xl font-semibold tracking-[-0.05em]">Defended run timeline</h2>
              <p className="mt-3 max-w-[58ch] text-sm leading-6 text-[color:var(--zoo-muted)]">Read the event log step by step: load, validate, assemble, defend, score, and report.</p>
            </div>
            <span className="rounded-full border border-[color:var(--zoo-line)] px-3 py-1 font-mono text-xs text-[color:var(--zoo-accent)]">{runs.defended.trace.length} events</span>
          </div>
          <TraceTimeline trace={runs.defended.trace} />
        </section>
      </div>
    </main>
  );
}

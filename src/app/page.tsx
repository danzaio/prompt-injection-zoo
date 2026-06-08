import { ScenarioExplorer } from "@/components/demo/ScenarioExplorer";
import { Hero } from "@/components/marketing/Hero";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { RepoQuickstart } from "@/components/marketing/RepoQuickstart";
import { ScenarioSpecimen } from "@/components/marketing/ScenarioSpecimen";
import { getCatalog } from "@/lib/zoo/catalog";
import { loadTraceFixture } from "@/lib/zoo/load";

export default async function Home() {
  const scenarios = await getCatalog();
  const featured = scenarios.find((scenario) => scenario.slug === "red-panda-footnote") ?? scenarios[0];
  const trace = await loadTraceFixture(featured.slug, "defended");
  return (
    <main className="min-h-[100dvh] text-[color:var(--zoo-text)]">
      <Hero scenario={featured} trace={trace} />
      <ScenarioExplorer scenarios={scenarios} />
      <ScenarioSpecimen scenario={featured} />
      <HowItWorks />
      <RepoQuickstart />
    </main>
  );
}

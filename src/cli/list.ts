import { loadAllScenarios } from "../lib/zoo/load";

const scenarios = await loadAllScenarios();
for (const scenario of scenarios) {
  console.log(`${scenario.slug}\t${scenario.title}\t${scenario.category}\t${scenario.difficulty}`);
}

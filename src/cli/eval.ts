import { loadAllScenarios } from "../lib/zoo/load";
import { runScenarioPair } from "../lib/zoo/runner";

const scenarios = await loadAllScenarios();
let failures = 0;
for (const scenario of scenarios) {
  const { baseline, defended } = await runScenarioPair(scenario);
  if (defended.score.total < baseline.score.total || defended.verdict === "fail") failures += 1;
  console.log(`${scenario.slug}\tbaseline=${baseline.score.total}\tdefended=${defended.score.total}\t${defended.verdict}`);
}
console.log(`catalog=${scenarios.length} failures=${failures}`);
if (failures > 0) process.exitCode = 1;

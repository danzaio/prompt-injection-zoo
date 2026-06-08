import { loadAllScenarios, loadScenario } from "./load";
import { runScenarioPair } from "./runner";

export async function getCatalog() {
  return loadAllScenarios();
}

export async function getScenarioViewModel(slug: string) {
  const scenario = await loadScenario(slug);
  const runs = await runScenarioPair(scenario);
  return { scenario, runs };
}

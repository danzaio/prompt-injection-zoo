import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { scenarioSchema, type Scenario } from "./schema";
import { assertScenarioSafety } from "./safety";
import { parseTraceJsonl } from "./trace";

const ROOT = process.cwd();
const SCENARIO_DIR = path.join(ROOT, "scenarios");
const TRACE_DIR = path.join(ROOT, "fixtures", "traces");

export async function getScenarioSlugs(): Promise<string[]> {
  const entries = await readdir(SCENARIO_DIR);
  return entries.filter((entry) => entry.endsWith(".json")).map((entry) => entry.replace(/\.json$/, "")).sort();
}

export async function loadScenario(slug: string): Promise<Scenario> {
  const file = path.join(SCENARIO_DIR, `${slug}.json`);
  const raw = await readFile(file, "utf8");
  const scenario = scenarioSchema.parse(JSON.parse(raw));
  assertScenarioSafety(scenario);
  return scenario;
}

export async function loadAllScenarios(): Promise<Scenario[]> {
  const slugs = await getScenarioSlugs();
  return Promise.all(slugs.map((slug) => loadScenario(slug)));
}

export async function loadTraceFixture(slug: string, mode: "baseline" | "defended") {
  const raw = await readFile(path.join(TRACE_DIR, `${slug}.${mode}.jsonl`), "utf8");
  return parseTraceJsonl(raw);
}

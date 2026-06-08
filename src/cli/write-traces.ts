import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { loadScenario } from "../lib/zoo/load";
import { runScenario } from "../lib/zoo/runner";
import { serializeTraceJsonl } from "../lib/zoo/trace";

const slugs = process.argv.slice(2);
if (slugs.length === 0) throw new Error("Usage: tsx src/cli/write-traces.ts <slug...>");
await mkdir(path.join(process.cwd(), "fixtures", "traces"), { recursive: true });
for (const slug of slugs) {
  const scenario = await loadScenario(slug);
  for (const mode of ["baseline", "defended"] as const) {
    const result = await runScenario(scenario, { mode });
    await writeFile(path.join(process.cwd(), "fixtures", "traces", `${slug}.${mode}.jsonl`), serializeTraceJsonl(result.trace));
    console.log(`${slug}.${mode}.jsonl`);
  }
}

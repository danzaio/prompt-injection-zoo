import { pathToFileURL } from "node:url";
import { loadScenario } from "../lib/zoo/load";
import { reportJson, reportJsonl, reportMarkdown, reportTerminal } from "../lib/zoo/reporters";
import { runScenario, type RunMode } from "../lib/zoo/runner";

export type RunFormat = "terminal" | "json" | "jsonl" | "markdown";

export type RunArgs = {
  slug: string;
  mode: RunMode;
  format: RunFormat;
};

const FORMATS = new Set<RunFormat>(["terminal", "json", "jsonl", "markdown"]);

export function parseRunArgs(args: readonly string[]): RunArgs {
  const slug = args[0];
  if (!slug) {
    throw new Error("Usage: pnpm zoo:run <slug> --mode baseline|defended [--format terminal|json|jsonl|markdown]");
  }

  const modeIndex = args.indexOf("--mode");
  const mode = (modeIndex >= 0 ? args[modeIndex + 1] : "defended") as RunMode | undefined;
  if (mode !== "baseline" && mode !== "defended") {
    throw new Error("--mode must be baseline or defended");
  }

  const formatIndex = args.indexOf("--format");
  const format = (formatIndex >= 0 ? args[formatIndex + 1] : "terminal") as RunFormat | undefined;
  if (!format || !FORMATS.has(format)) {
    throw new Error("--format must be terminal, json, jsonl, or markdown");
  }

  return { slug, mode, format };
}

export async function runCli(args: readonly string[] = process.argv.slice(2), output: Pick<NodeJS.WriteStream, "write"> = process.stdout): Promise<void> {
  const { slug, mode, format } = parseRunArgs(args);
  const scenario = await loadScenario(slug);
  const result = await runScenario(scenario, { mode });
  if (format === "json") output.write(`${reportJson(result)}\n`);
  else if (format === "jsonl") output.write(reportJsonl(result));
  else if (format === "markdown") output.write(`${reportMarkdown(scenario, result)}\n`);
  else output.write(`${reportTerminal(scenario, result)}\n`);
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  runCli().catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
}

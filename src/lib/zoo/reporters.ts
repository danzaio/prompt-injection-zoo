import type { RunResult, Scenario } from "./schema";
import { serializeTraceJsonl } from "./trace";

export function reportJson(result: RunResult): string {
  return JSON.stringify(result, null, 2);
}

export function reportJsonl(result: RunResult): string {
  return serializeTraceJsonl(result.trace);
}

export function reportTerminal(scenario: Scenario, result: RunResult): string {
  const rows = result.score.dimensions.map((dimension) => `  ${dimension.label}: ${dimension.earned}/${dimension.possible}`).join("\n");
  return `${scenario.title}\nmode: ${result.mode}\nverdict: ${result.verdict}\nscore: ${result.score.total}/${result.score.passThreshold}\n${rows}`;
}

export function reportMarkdown(scenario: Scenario, result: RunResult): string {
  const dimensions = result.score.dimensions.map((dimension) => `- ${dimension.label}: ${dimension.earned}/${dimension.possible}`).join("\n");
  return `# ${scenario.title}\n\nMode: ${result.mode}\n\nVerdict: ${result.verdict}\n\nScore: ${result.score.total}/${result.score.passThreshold}\n\n${dimensions}\n\n## Final output\n\n${result.finalOutput}\n`;
}

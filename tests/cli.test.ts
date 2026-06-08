import { describe, expect, it } from "vitest";
import { parseRunArgs, runCli } from "../src/cli/run";
import { runResultSchema } from "../src/lib/zoo/schema";
import { parseTraceJsonl } from "../src/lib/zoo/trace";

function createSink() {
  let text = "";
  return {
    write(chunk: string | Uint8Array) {
      text += chunk.toString();
      return true;
    },
    get text() {
      return text;
    },
  };
}

describe("zoo run CLI", () => {
  it("parses defaults and explicit options", () => {
    expect(parseRunArgs(["red-panda-footnote"])).toEqual({
      slug: "red-panda-footnote",
      mode: "defended",
      format: "terminal",
    });
    expect(parseRunArgs(["red-panda-footnote", "--mode", "baseline", "--format", "jsonl"])).toEqual({
      slug: "red-panda-footnote",
      mode: "baseline",
      format: "jsonl",
    });
  });

  it("rejects invalid CLI arguments with useful messages", () => {
    expect(() => parseRunArgs([])).toThrow(/Usage/);
    expect(() => parseRunArgs(["red-panda-footnote", "--mode", "unsafe"])).toThrow(/baseline or defended/);
    expect(() => parseRunArgs(["red-panda-footnote", "--format", "xml"])).toThrow(/terminal, json, jsonl, or markdown/);
  });

  it("renders JSON output through the command entrypoint", async () => {
    const sink = createSink();
    await runCli(["red-panda-footnote", "--mode", "defended", "--format", "json"], sink);
    const result = runResultSchema.parse(JSON.parse(sink.text));
    expect(result.mode).toBe("defended");
    expect(result.verdict).toBe("pass");
  });

  it("renders JSONL trace output through the command entrypoint", async () => {
    const sink = createSink();
    await runCli(["red-panda-footnote", "--mode", "defended", "--format", "jsonl"], sink);
    const events = parseTraceJsonl(sink.text);
    expect(events[0]?.event).toBe("scenario_loaded");
    expect(events.at(-1)?.event).toBe("report_ready");
  });
});

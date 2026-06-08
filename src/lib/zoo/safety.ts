import type { Scenario } from "./schema";

export type SafetyIssue = {
  path: string;
  reason: string;
};

const EXTERNAL_URL = /https?:\/\/(?!localhost|127\.0\.0\.1)[^\s)"']+/i;
const CREDENTIAL = /(sk-[a-z0-9]{16,}|ghp_[a-z0-9_]{16,}|AKIA[0-9A-Z]{12,}|(?:api[_-]?key|password|secret|token)\s*[:=]\s*[^\s]{8,})/i;
const REAL_SYSTEM_INSTRUCTION = /(attack|exploit|phish|malware|exfiltrate|steal|credential stuffing|reverse shell|shell command)/i;
const DESTRUCTIVE_TOOL = /(?:^|_)(delete|destroy|exec|shell|http|fetch|network|scrape|rm|wipe)(?:_|$)/i;

function scanValue(value: unknown, path: string, issues: SafetyIssue[], options: { allowReferenceUrls?: boolean } = {}) {
  if (typeof value === "string") {
    if (!options.allowReferenceUrls && EXTERNAL_URL.test(value)) {
      issues.push({ path, reason: "External URLs are not allowed in toy scenario content." });
    }
    if (CREDENTIAL.test(value)) {
      issues.push({ path, reason: "Real-looking credentials or API tokens are not allowed." });
    }
    if (path.includes("untrustedInputs") && REAL_SYSTEM_INSTRUCTION.test(value)) {
      issues.push({ path, reason: "Payload text must stay toy-only and must not target real systems." });
    }
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => scanValue(item, `${path}[${index}]`, issues, options));
    return;
  }
  if (value && typeof value === "object") {
    for (const [key, child] of Object.entries(value)) {
      const allowReferenceUrls = path.endsWith("metadata") && key === "references";
      scanValue(child, `${path}.${key}`, issues, { allowReferenceUrls });
    }
  }
}

export function collectSafetyIssues(scenario: Scenario): SafetyIssue[] {
  const issues: SafetyIssue[] = [];
  if (scenario.safetyLevel === "blocked_real_world") {
    issues.push({ path: "safetyLevel", reason: "MVP scenarios must not be real-world blocked scenarios." });
  }
  if (scenario.owasp.length === 0) {
    issues.push({ path: "owasp", reason: "Every scenario needs at least one OWASP mapping." });
  }
  for (const [index, tool] of scenario.toyTools.entries()) {
    if (DESTRUCTIVE_TOOL.test(tool.id)) {
      issues.push({ path: `toyTools[${index}].id`, reason: "Destructive or network-capable tool names are not allowed." });
    }
    if (tool.kind !== "read_only" && !tool.requiresUserIntent) {
      issues.push({ path: `toyTools[${index}].requiresUserIntent`, reason: "Side-effect and memory toy tools must require user intent." });
    }
  }
  scanValue(scenario, "scenario", issues);
  return issues;
}

export function assertScenarioSafety(scenario: Scenario): void {
  const issues = collectSafetyIssues(scenario);
  if (issues.length > 0) {
    const message = issues.map((issue) => `${issue.path}: ${issue.reason}`).join("\n");
    throw new Error(`Scenario failed safety gate:\n${message}`);
  }
}

export function redactCanaries(text: string, canaries: readonly string[]): { text: string; redactions: Array<{ field: string; reason: string }> } {
  let redacted = text;
  const redactions: Array<{ field: string; reason: string }> = [];
  for (const canary of canaries) {
    if (canary && redacted.includes(canary)) {
      redacted = redacted.split(canary).join("[REDACTED_CANARY]");
      redactions.push({ field: "finalOutput", reason: `Protected canary ${canary}` });
    }
  }
  return { text: redacted, redactions };
}

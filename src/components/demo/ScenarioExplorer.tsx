"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Scenario } from "@/lib/zoo/schema";

export function ScenarioExplorer({ scenarios }: { scenarios: Scenario[] }) {
  const [category, setCategory] = useState("all");
  const categories = useMemo(() => ["all", ...Array.from(new Set(scenarios.map((scenario) => scenario.category))).sort()], [scenarios]);
  const filtered = category === "all" ? scenarios : scenarios.filter((scenario) => scenario.category === category);

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
      <div className="grid gap-6 md:grid-cols-[0.7fr_1fr]">
        <div>
          <h2 className="text-4xl font-semibold tracking-[-0.05em] md:text-5xl">Choose a scenario</h2>
          <p className="mt-4 max-w-[48ch] text-sm leading-6 text-[color:var(--zoo-muted)]">Each case shows the attack shape, the unsafe text, and the defense in plain language.</p>
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.16em] text-[color:var(--zoo-muted)]">Filter by attack type</p>
          <select value={category} onChange={(event) => setCategory(event.target.value)} className="mt-3 w-full max-w-sm rounded-full border border-[color:var(--zoo-line)] bg-[#0b1715] px-4 py-3 text-sm text-[color:var(--zoo-text)] outline-none focus:border-[color:var(--zoo-accent)]">
            {categories.map((item) => <option key={item} value={item}>{item === "all" ? "All scenarios" : item.replaceAll("_", " ")}</option>)}
          </select>
        </div>
        <div className="grid gap-4">
          {filtered.map((scenario, index) => (
            <Link key={scenario.slug} href={`/scenarios/${scenario.slug}`} className="group rounded-[1.75rem] border border-[color:var(--zoo-line)] bg-white/[0.035] p-2">
              <article className="grid gap-4 rounded-[calc(1.75rem-0.5rem)] bg-[#0b1715] p-5 md:grid-cols-[auto_1fr_auto] md:items-center">
                <span className="font-mono text-xs text-[color:var(--zoo-accent)]">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--zoo-muted)]">{scenario.category.replaceAll("_", " ")}</p>
                  <h3 className="text-2xl font-semibold tracking-[-0.04em]">{scenario.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--zoo-muted)]">{scenario.summary}</p>
                </div>
                <span className="rounded-full border border-[color:var(--zoo-line)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--zoo-text)] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1">View details</span>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

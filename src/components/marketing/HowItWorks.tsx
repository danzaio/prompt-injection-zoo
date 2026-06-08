export function HowItWorks() {
  const steps = ["Choose a scenario", "Mark untrusted text", "Run the baseline version", "Run the defended version", "Record the event trace", "Compare the scores"];
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
      <div className="rounded-[2rem] border border-[color:var(--zoo-line)] bg-white/[0.03] p-2">
        <div className="rounded-[calc(2rem-0.5rem)] bg-[#091311] p-6 md:p-8">
          <h2 className="max-w-2xl text-4xl font-semibold tracking-[-0.05em] md:text-5xl">How the demo works</h2>
          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {steps.map((step) => (
              <div key={step} className="rounded-3xl border border-[color:var(--zoo-line)] bg-white/[0.025] p-5">
                <p className="text-lg font-semibold tracking-[-0.03em]">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

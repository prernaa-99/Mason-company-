import Reveal from "./Reveal";

const stats = [
  {
    value: "25%",
    label: "Reported injury and/or fall",
    copy: "Among Indians aged 60+, 1 in 4 reported an injury and/or fall in the previous two years.",
  },
  {
    value: "81%",
    label: "Bathroom injuries from falls",
    copy: "Falls are the dominant risk around wet zones, toilets, and transfers.",
  },
  {
    value: "65.63%",
    label: "Falls that led to injury",
    copy: "A review of older adults in India found a high pooled injury prevalence among those who fell.",
  },
  {
    value: "26–38%",
    label: "Fewer falls after home changes",
    copy: "Home hazard interventions can reduce fall rates, especially for higher-risk adults.",
  },
];

export default function Stats() {
  return (
    <section id="why" className="border-t border-line bg-sand-100 py-14 sm:py-20 lg:py-24">
      <Reveal className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-2xl">
            <p className="reveal eyebrow mb-5">The risk is real</p>
            <h2 className="reveal h-display text-3xl text-cream sm:text-4xl lg:text-5xl">
              The response should be{" "}
              <span className="accent-word">thoughtful</span>.
            </h2>
          </div>

          {/* cost figure — accent-muted brand moment */}
          <div className="reveal rounded-2xl bg-accent-muted px-7 py-6">
            <p className="text-xs uppercase tracking-[0.16em] text-on-accent/75">
              Potential recovery cost of one fall
            </p>
            <p className="mt-2 font-display text-4xl font-bold text-on-accent lg:text-5xl">
              &#8377;3L&ndash;&#8377;10L
            </p>
          </div>
        </div>

        <div className="reveal mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={i}
              className="bg-ink-raised p-7"
            >
              <div className="font-display text-5xl font-bold text-accent">
                {s.value}
              </div>
              <p className="mt-5 text-sm font-semibold text-cream">{s.label}</p>
              <p className="mt-2 text-sm leading-relaxed text-cream-dim">
                {s.copy}
              </p>
            </div>
          ))}
        </div>

        <p className="reveal mt-6 text-xs text-cream-faint">
          Sources: LASI India, CDC bathroom-injury report, India falls-injury
          systematic review, Cochrane home-hazard reduction review.
        </p>
      </Reveal>
    </section>
  );
}

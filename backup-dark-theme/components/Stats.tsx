import Reveal from "./Reveal";
import CountUp from "./CountUp";

const stats = [
  {
    node: <CountUp to={25} suffix="%" />,
    label: "Reported injury and/or fall",
    copy: "Among Indians aged 60+, 1 in 4 reported an injury and/or fall in the previous two years.",
  },
  {
    node: <CountUp to={81} suffix="%" />,
    label: "Bathroom injuries from falls",
    copy: "Falls are the dominant risk around wet zones, toilets, and transfers.",
  },
  {
    node: <CountUp to={65.63} decimals={2} suffix="%" />,
    label: "Falls that led to injury",
    copy: "A review of older adults in India found a high pooled injury prevalence among those who fell.",
  },
  {
    node: <>26&ndash;38%</>,
    label: "Fewer falls after home changes",
    copy: "Home hazard interventions can reduce fall rates, especially for higher-risk adults.",
  },
];

export default function Stats() {
  return (
    <section id="why" className="border-t border-line py-24 lg:py-32">
      <Reveal className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-2xl">
            <p className="reveal eyebrow mb-5">The risk is real</p>
            <h2 className="reveal h-display text-3xl text-cream sm:text-4xl lg:text-5xl">
              The response should be thoughtful.
            </h2>
          </div>

          {/* cost figure — accent-muted brand moment */}
          <div className="reveal rounded-2xl bg-accent-muted px-7 py-6">
            <p className="text-xs uppercase tracking-[0.16em] text-[#fff7f5]/75">
              Potential recovery cost of one fall
            </p>
            <p className="mt-2 font-display text-4xl font-bold text-[#fff7f5] lg:text-5xl">
              &#8377;3L&ndash;&#8377;10L
            </p>
          </div>
        </div>

        <div className="reveal mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={i}
              className="bg-ink-raised p-7 transition-colors duration-150 hover:bg-surface-2"
            >
              <div className="font-display text-5xl font-bold text-accent">
                {s.node}
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

import Reveal from "./Reveal";

const check = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    className="mt-0.5 shrink-0 text-amber"
  >
    <path
      d="M5 12.5l4 4 10-10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const packages = [
  {
    name: "Standard",
    badge: "Core safety upgrade",
    featured: false,
    bestFor:
      "Families who want the essential support and slip-risk upgrades for everyday bathroom use.",
    includes: [
      "3 vertical grab bars",
      "1 L / angled grab bar",
      "1 flip-up / folding bar",
      "Anti-slip solution / coating",
      "2 anti-slip mats",
      "1 shower seating stool",
      "1 sensor lighting unit",
      "1 two-way lock",
      "8-corner equivalent corner safety",
      "4 drainage solutions",
      "1 pair bathroom slippers",
    ],
    outcome:
      "A complete everyday safety upgrade for steadier movement, better grip, and more confidence at home.",
    cta: "Book Standard",
  },
  {
    name: "Advanced",
    badge: "Premium safety upgrade",
    featured: true,
    bestFor:
      "Families who want the full Mason setup with added comfort, premium finishes, and stronger sit-stand support.",
    includes: [
      "3 PVD-coated vertical grab bars",
      "1 PVD-coated L / angled grab bar",
      "1 PVD-coated flip-up / folding bar",
      "Anti-slip solution / coating",
      "2 premium anti-slip mats",
      "Toilet / raised-seat / commode support",
      "1 shower seating stool",
      "1 sensor lighting unit",
      "1 two-way lock",
      "8-corner equivalent corner safety",
      "4 drainage solutions",
      "2 pairs bathroom slippers",
    ],
    outcome:
      "A more complete and premium upgrade, with stronger support for higher-risk daily routines.",
    cta: "Book Advanced",
  },
];

export default function Packages() {
  return (
    <section
      id="packages"
      className="relative border-t border-line py-24 lg:py-32"
    >
      <Reveal className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <p className="reveal eyebrow mb-5">Choose your safety package</p>
          <h2 className="reveal h-display text-3xl text-cream sm:text-4xl lg:text-5xl">
            Two complete ways to upgrade.
          </h2>
          <p className="reveal mt-6 text-lg leading-relaxed text-cream-dim">
            Clear inclusions. Premium finishes. Installed by Mason-trained
            experts &mdash; one accountable team.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {packages.map((p) => (
            <div
              key={p.name}
              className={`reveal relative flex flex-col rounded-3xl border p-8 transition-transform duration-500 hover:-translate-y-1 lg:p-10 ${
                p.featured
                  ? "border-amber/40 bg-gradient-to-b from-surface to-ink-raised"
                  : "border-line bg-ink-raised"
              }`}
            >
              {p.featured && (
                <span className="absolute -top-3 right-8 rounded-full bg-amber px-4 py-1 text-xs font-semibold text-ink">
                  Most complete
                </span>
              )}

              <p className="text-xs uppercase tracking-[0.18em] text-amber">
                {p.badge}
              </p>
              <h3 className="mt-3 font-display text-4xl text-cream">
                {p.name}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-cream-dim">
                {p.bestFor}
              </p>

              <ul className="mt-8 grid gap-3 border-t border-line pt-8">
                {p.includes.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm text-cream-dim"
                  >
                    {check}
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-8 rounded-2xl border border-line bg-ink/40 p-5 text-sm leading-relaxed text-cream">
                {p.outcome}
              </p>

              <a
                href="#book"
                className={`mt-8 rounded-full px-6 py-3.5 text-center text-sm font-semibold transition-transform duration-300 hover:scale-[1.02] ${
                  p.featured
                    ? "bg-amber text-ink hover:bg-amber-soft"
                    : "border border-line-strong text-cream hover:border-amber hover:text-amber"
                }`}
              >
                {p.cta}
              </a>
            </div>
          ))}
        </div>

        <p className="reveal mt-8 max-w-3xl text-sm leading-relaxed text-cream-faint">
          Both packages are planned for real bathroom movement and installed by
          trained Mason experts &mdash; so the result feels safe, thoughtful,
          and still beautifully at home.
        </p>
      </Reveal>
    </section>
  );
}

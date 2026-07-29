import Reveal from "./Reveal";

const check = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    className="mt-0.5 shrink-0 text-cream-dim"
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
      className="relative border-t border-line bg-sand-100 py-24 lg:h-screen lg:overflow-hidden lg:py-0"
    >
      <Reveal className="mx-auto flex h-full max-w-7xl flex-col px-6 lg:px-10 lg:pb-8 lg:pt-24">
        <div className="max-w-2xl">
          <p className="reveal eyebrow mb-3">Choose your safety package</p>
          <h2 className="reveal h-display text-3xl text-cream sm:text-4xl lg:text-[2.5rem]">
            Two <span className="accent-word">complete</span> ways to upgrade.
          </h2>
          <p className="reveal mt-3 text-base leading-relaxed text-cream-dim">
            Clear inclusions. Premium finishes. Installed by Mason-trained
            experts &mdash; one accountable team.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:mt-6 lg:min-h-0 lg:flex-1 lg:grid-cols-[1fr_1.12fr]">
          {packages.map((p) => (
            <div
              key={p.name}
              className={`reveal relative flex flex-col overflow-hidden rounded-3xl border p-6 lg:p-7 ${
                p.featured
                  ? "border-line-strong bg-surface-2 lg:p-8"
                  : "border-line bg-ink-raised"
              }`}
            >
              {p.featured && (
                <span className="absolute right-6 top-6 rounded-full border border-line-strong bg-ink-raised px-3.5 py-1 text-[0.7rem] font-semibold text-cream lg:right-7 lg:top-7">
                  Most complete
                </span>
              )}

              <p className="text-xs uppercase tracking-[0.18em] text-cream-faint">
                {p.badge}
              </p>
              <h3 className="mt-1.5 font-display text-4xl text-cream lg:text-5xl">
                {p.name}
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-cream-dim">
                {p.bestFor}
              </p>

              {/* CTA on top, above the feature list */}
              <a
                href="#book"
                className={`mt-6 block rounded-full px-6 py-3.5 text-center text-sm font-semibold transition-all duration-150 hover:scale-[1.01] ${
                  p.featured
                    ? "bg-accent text-on-accent hover:bg-accent-hover"
                    : "border border-line text-cream hover:border-line-strong"
                }`}
              >
                {p.cta}
              </a>

              <ul className="mt-7 grid gap-x-6 gap-y-3 border-t border-line pt-7 sm:grid-cols-2">
                {p.includes.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm text-cream-dim">
                    {check}
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#book"
                className="mt-auto pt-7 text-sm text-cream-dim transition-colors duration-150 hover:text-cream"
              >
                Need a custom quote? &rarr;
              </a>
            </div>
          ))}
        </div>

        <p className="reveal mt-5 text-xs leading-relaxed text-cream-faint lg:hidden">
          Both packages are planned for real bathroom movement and installed by
          trained Mason experts &mdash; so the result feels safe, thoughtful,
          and still beautifully at home.
        </p>
      </Reveal>
    </section>
  );
}

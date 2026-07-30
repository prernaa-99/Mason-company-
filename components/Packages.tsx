import Reveal from "./Reveal";
import Cta from "./Cta";

const check = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    className="shrink-0 text-forest-700"
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

/* Both packages install the SAME kit. The only difference is the one-year
   check-up, so the inclusions live here once rather than being duplicated —
   the two lists can no longer drift apart. */
const INCLUDES = [
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
];

const packages = [
  {
    name: "Standard",
    badge: "The complete kit",
    featured: false,
    bestFor:
      "The full safety upgrade, installed, inspected and handed over in one go.",
    outcome:
      "A complete everyday safety upgrade for steadier movement, better grip, and more confidence at home.",
    cta: "Book Standard",
  },
  {
    name: "Advanced",
    badge: "The complete kit, plus a year of cover",
    featured: true,
    bestFor:
      "The same installation, with a safety check-up a year on to catch anything that has worked loose.",
    outcome:
      "The same upgrade, looked after — so it stays as safe as the day it was fitted.",
    cta: "Book Advanced",
  },
];

/* Following the masonco plan section: the kit collapses to a single line and
   the space goes on check/dash rows. Only the last row differs between the two
   packages — everything above it is deliberately identical. */
const dash = <span className="h-0.5 w-4 shrink-0 rounded-full bg-sand-200" />;

const ROWS: { label: string; standard: boolean; advanced: boolean }[] = [
  {
    label: `All ${INCLUDES.length} safety upgrades installed`,
    standard: true,
    advanced: true,
  },
  { label: "Installed by trained Mason experts", standard: true, advanced: true },
  { label: "Inspection and final walkthrough", standard: true, advanced: true },
  { label: "One-year safety check-up visit", standard: false, advanced: true },
];

export default function Packages() {
  return (
    <section
      id="packages"
      className="relative bg-forest-700 py-24 lg:h-screen lg:overflow-hidden lg:py-0"
    >
      <Reveal className="mx-auto flex h-full max-w-7xl flex-col px-6 lg:px-10 lg:pb-8 lg:pt-24">
        <div className="max-w-2xl">
          <p className="reveal eyebrow on-dark mb-3">
            Choose your safety package
          </p>
          <h2 className="reveal h-display text-3xl text-sand-100 sm:text-4xl lg:text-[2.5rem]">
            The same complete kit. You choose the{" "}
            <span className="accent-word on-dark">cover</span>.
          </h2>
          <p className="reveal mt-3 text-base leading-relaxed text-sand-100/75">
            Both packages install everything, fitted by Mason-trained experts.
            Advanced simply keeps looking after it for a year.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:mt-6 lg:min-h-0 lg:flex-1 lg:grid-cols-[1fr_1.12fr]">
          {packages.map((p) => (
            <div
              key={p.name}
              className={`reveal relative flex flex-col rounded-3xl bg-sand-50 p-6 lg:p-7 ${
                p.featured ? "ring-2 ring-forest-200 lg:p-8" : ""
              }`}
            >
              {p.featured && (
                <span className="absolute right-6 top-6 rounded-full bg-forest-50 px-3.5 py-1 text-[0.7rem] font-semibold text-forest-700 lg:right-7 lg:top-7">
                  Most complete
                </span>
              )}

              <p className="text-xs uppercase tracking-[0.18em] text-sand-400">
                {p.badge}
              </p>
              <h3 className="mt-1.5 font-display text-4xl text-cream lg:text-5xl">
                {p.name}
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-sand-600">
                {p.bestFor}
              </p>

              <Cta
                href="#book"
                size="block"
                variant={p.featured ? "solid" : "outline"}
                className="mt-6"
              >
                {p.cta}
              </Cta>

              <ul className="mt-7 space-y-2.5 border-t border-sand-200 pt-6">
                {ROWS.map((row, i) => {
                  const on = p.featured ? row.advanced : row.standard;
                  const differentiator = row.standard !== row.advanced;
                  return (
                    <li
                      key={row.label}
                      className={`flex items-center gap-2.5 text-sm ${
                        !on
                          ? "text-sand-400"
                          : differentiator || i === 0
                            ? "font-semibold text-cream"
                            : "text-sand-600"
                      }`}
                    >
                      {on ? check : dash}
                      <span>{row.label}</span>
                    </li>
                  );
                })}
              </ul>

              <p className="mt-6 max-w-sm text-sm leading-relaxed text-sand-600">
                {p.outcome}
              </p>

              <a
                href="#book"
                className="mt-auto pt-7 text-sm text-sand-600 transition-colors duration-150 hover:text-cream"
              >
                Need a custom quote? &rarr;
              </a>
            </div>
          ))}
        </div>

        <p className="reveal mt-5 text-xs leading-relaxed text-sand-100/60 lg:hidden">
          Both packages are planned for real bathroom movement and installed by
          trained Mason experts &mdash; so the result feels safe, thoughtful,
          and still beautifully at home.
        </p>
      </Reveal>
    </section>
  );
}

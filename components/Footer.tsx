const columns = [
  {
    title: "Explore",
    links: ["Why Mason", "What We Do", "Our Process", "Evidence & Safety Data"],
  },
  {
    title: "Packages",
    links: ["Standard Package", "Advanced Package", "Compare Packages"],
  },
  {
    title: "Company",
    links: ["About Mason", "Founders", "Doctor Recommendations", "FAQs"],
  },
  {
    title: "Legal",
    links: ["Privacy Policy", "Terms & Conditions", "Refund & Cancellation"],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink-raised">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-full border border-clay/50 text-clay">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 20V9l8-5 8 5v11M9 20v-6h6v6"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="font-display text-lg text-cream">
                Mason Company
              </span>
            </div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-cream-dim">
              Mason Company helps families make bathrooms safer for ageing
              parents through premium, doctor-informed, expert-installed safety
              upgrades.
            </p>
            <a
              href="#book"
              className="mt-8 inline-block rounded-full bg-cream px-6 py-3 text-sm font-semibold text-ink transition-colors duration-300 hover:bg-bone-dim"
            >
              Book a Safety Visit
            </a>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="text-xs uppercase tracking-[0.18em] text-cream-faint">
                  {col.title}
                </p>
                <ul className="mt-5 space-y-3">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        className="text-sm text-cream-dim transition-colors hover:text-cream"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-line pt-8 text-xs text-cream-faint sm:flex-row sm:items-center">
          <p>&copy; {new Date().getFullYear()} Mason Company. All rights reserved.</p>
          <p>Premium · Doctor-informed · Expert-installed</p>
        </div>
      </div>
    </footer>
  );
}

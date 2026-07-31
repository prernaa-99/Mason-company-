import type { Metadata } from "next";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Cta from "@/components/Cta";
import { KIT } from "@/components/kit";
import { PACKAGE_ROWS } from "@/components/packages-data";

export const metadata: Metadata = {
  title: "Packages - Mason Company",
  description:
    "Standard and Advanced install the same complete bathroom safety kit - 12 upgrades, fitted by trained Mason experts. Advanced adds a one-year safety check-up.",
};

/* One page, one surface, one language: paper, hairlines, mono labels, display
   type. No coloured bands and no cards — the comparison table and the kit list
   are the same object twice, which is what stops the page reading as a stack of
   unrelated blocks.

   The table is deliberately narrower than the headline above it. A four-row
   table stretched to the full 1280px measure leaves the marks stranded a screen
   away from their labels. */

/* Both the table rows and the CTA row use this, so the columns line up. The
   mark columns are fixed; the label column takes whatever is left. */
const ROW = "grid grid-cols-[1fr_3.5rem_3.5rem] sm:grid-cols-[1fr_11rem_11rem]";

const check = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M5 12.5l4 4 10-10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const dash = (
  <span aria-hidden="true" className="h-0.5 w-4 rounded-full bg-sand-200" />
);

/** `included` drives the accessible text; the tick alone says nothing aloud. */
function Mark({ on, tint }: { on: boolean; tint?: boolean }) {
  return (
    <div
      className={`grid place-items-center py-4 ${
        tint ? "bg-accent-tint" : ""
      } ${on ? "text-forest-700" : ""}`}
    >
      {on ? check : dash}
      <span className="sr-only">{on ? "Included" : "Not included"}</span>
    </div>
  );
}

export default function PackagesPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="mx-auto max-w-7xl px-6 pt-32 pb-16 lg:px-10 lg:pt-40 lg:pb-24">
          <p className="eyebrow mb-5">Packages</p>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
            <h1 className="h-display max-w-2xl text-5xl text-cream sm:text-6xl lg:text-7xl">
              One complete <span className="accent-word">kit</span>.
            </h1>
            <p className="max-w-sm text-base leading-relaxed text-cream-dim lg:pb-3 lg:text-right">
              Standard and Advanced install exactly the same {KIT.length}{" "}
              upgrades. Only what happens a year later separates them.
            </p>
          </div>

          {/* ---- the comparison ---- */}
          <Reveal className="mt-14 max-w-5xl lg:mt-20">
            <div className="reveal">
              {/* Column heads. The Advanced column carries a tint that runs the
                  full height of the table, rounded at top and bottom, so the
                  featured package is one continuous object rather than a badge
                  stuck on a card. */}
              <div className={`${ROW} border-b-2 border-cream`}>
                <div className="py-4 pr-4">
                  <span className="eyebrow">What you get</span>
                </div>
                <div className="grid place-items-center py-4">
                  <span className="font-display text-sm font-extrabold uppercase tracking-[0.12em] text-cream sm:text-base">
                    Standard
                  </span>
                </div>
                <div className="grid place-items-center rounded-t-2xl bg-accent-tint py-4">
                  <span className="font-display text-sm font-extrabold uppercase tracking-[0.12em] text-forest-700 sm:text-base">
                    Advanced
                  </span>
                  <span className="mt-0.5 hidden text-[0.65rem] text-forest-700/70 sm:block">
                    Most complete
                  </span>
                </div>
              </div>

              {PACKAGE_ROWS.map((row) => {
                const differentiator = row.standard !== row.advanced;
                return (
                  <div
                    key={row.label}
                    className={`${ROW} border-b border-sand-200`}
                  >
                    <div
                      className={`py-4 pr-4 text-sm leading-snug sm:text-base ${
                        differentiator
                          ? "font-semibold text-cream"
                          : "text-sand-600"
                      }`}
                    >
                      {row.label}
                    </div>
                    <Mark on={row.standard} />
                    <Mark on={row.advanced} tint />
                  </div>
                );
              })}

              {/* Buttons sit under their own column from sm up. Below that the
                  mark columns are 3.5rem wide and could never hold a button, so
                  the CTAs stack full width beneath the table instead. */}
              <div className={`${ROW} hidden sm:grid`}>
                <div />
                <div className="grid place-items-center px-2 py-7">
                  <Cta href="#book" size="compact" variant="outline">
                    Book Standard
                  </Cta>
                </div>
                <div className="grid place-items-center rounded-b-2xl bg-accent-tint px-2 py-7">
                  <Cta href="#book" size="compact">
                    Book Advanced
                  </Cta>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:hidden">
                <Cta href="#book" size="block" variant="outline">
                  Book Standard
                </Cta>
                <Cta href="#book" size="block">
                  Book Advanced
                </Cta>
              </div>
            </div>
          </Reveal>

          {/* ---- the kit ---- */}
          <Reveal className="mt-24 max-w-5xl lg:mt-32">
            <div className="reveal flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-b-2 border-cream pb-4">
              <h2 className="h-display text-3xl text-cream sm:text-4xl">
                The {KIT.length} <span className="accent-word">upgrades</span>.
              </h2>
              <p className="eyebrow">Identical in both packages</p>
            </div>

            <ul className="reveal">
              {KIT.map((item, i) => (
                <li
                  key={item.title}
                  className="flex items-center gap-4 border-b border-sand-200 py-4 sm:gap-6"
                >
                  <span className="w-6 shrink-0 font-mono-label text-xs text-sand-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {/* alt is empty on purpose - the title sits right beside it,
                      so a screen reader would otherwise hear it twice. */}
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg sm:h-16 sm:w-16">
                    <Image
                      src={item.img}
                      alt=""
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    {/* the label rides above the title on mobile, where there is
                        no room for it in its own column */}
                    <p className="font-mono-label text-[0.6rem] uppercase tracking-[0.18em] text-sand-400 sm:hidden">
                      {item.label}
                    </p>
                    <h3 className="font-display text-base font-semibold leading-snug text-cream sm:text-lg">
                      {item.title}
                    </h3>
                  </div>
                  <span className="hidden shrink-0 font-mono-label text-[0.65rem] uppercase tracking-[0.18em] text-sand-400 sm:block">
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>

            <div className="reveal mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Cta href="/#book">Book a Safety Visit</Cta>
              <p className="max-w-sm text-sm leading-relaxed text-cream-dim">
                Not sure which package? The visit is free - we&rsquo;ll walk the
                bathroom with you and say what it actually needs.
              </p>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}

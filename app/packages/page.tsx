import type { Metadata } from "next";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Cta from "@/components/Cta";
import { KIT } from "@/components/kit";
import { PACKAGE_ROWS, PACKAGES } from "@/components/packages-data";

export const metadata: Metadata = {
  title: "Packages - Mason Company",
  description:
    "Standard and Advanced install the same complete bathroom safety kit - 12 upgrades, fitted by trained Mason experts. Advanced adds a one-year safety check-up.",
};

/* One page, one surface, one language: paper, hairlines, mono labels, display
   type.

   This was a Standard-vs-Advanced comparison table, and it read as padding:
   eight mark cells, seven of them yes, and only one row in four that actually
   differs. So the offer is stated in its true shape instead — everything the
   two packages share, once, and then the single thing that separates them,
   given room to be a sentence rather than a lone tick. */

const check = (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    className="mt-0.5 shrink-0 text-forest-700"
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

const dash = (
  <span
    aria-hidden="true"
    className="mt-2.5 h-0.5 w-4 shrink-0 rounded-full bg-sand-200"
  />
);

export default function PackagesPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="mx-auto max-w-7xl px-6 pt-32 pb-16 lg:px-10 lg:pt-40 lg:pb-24">
          {/* Everything on this page sits on the one page measure, so the
              eyebrow, headline, cards and kit list all share a left and right
              edge. */}
          <p className="eyebrow mb-5">Packages</p>
          <h1 className="h-display text-5xl text-cream sm:text-6xl lg:text-7xl">
            One complete <span className="accent-word">kit</span>.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-cream-dim sm:text-lg">
            Standard and Advanced install exactly the same {KIT.length}{" "}
            upgrades. Only what happens a year later separates them.
          </p>

          {/* ---- the choice ----
              Same card language as the homepage section, on the light surface:
              the featured one is tinted and ringed rather than badged. Each
              card carries the whole row list, so the reason to pick one is a
              line you can read in place rather than a tick in a far-off
              column. */}
          <Reveal className="mt-14 lg:mt-20">
            <div className="grid gap-6 lg:grid-cols-2">
              {PACKAGES.map((p) => (
                <div
                  key={p.name}
                  className={`reveal flex flex-col rounded-3xl p-7 lg:p-9 ${
                    p.featured
                      ? "bg-accent-tint ring-2 ring-forest-200"
                      : "bg-sand-100"
                  }`}
                >
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                    <h2 className="h-display text-3xl text-cream sm:text-4xl">
                      {p.name}
                    </h2>
                    {p.featured && (
                      <span className="rounded-full bg-forest-700 px-3 py-1 text-[0.7rem] font-semibold text-sand-100">
                        Most popular
                      </span>
                    )}
                  </div>

                  <p className="mt-4 max-w-md text-base leading-relaxed text-cream-dim sm:text-lg">
                    {p.bestFor}
                  </p>

                  {/* Weighting matches the homepage cards exactly: the first
                      row and the one that differs carry the emphasis, the
                      middle rows recede, an absence is muted rather than
                      struck through. */}
                  <ul className="mt-7 space-y-3 border-t border-sand-200 pt-7">
                    {PACKAGE_ROWS.map((row, i) => {
                      const on = p.featured ? row.advanced : row.standard;
                      const differentiator = row.standard !== row.advanced;
                      return (
                        <li key={row.label} className="flex items-start gap-3">
                          {on ? check : dash}
                          <span
                            className={
                              !on
                                ? "text-sand-400"
                                : differentiator || i === 0
                                  ? "font-semibold text-cream"
                                  : "text-sand-600"
                            }
                          >
                            {row.label}
                          </span>
                          <span className="sr-only">
                            {on ? "Included" : "Not included"}
                          </span>
                        </li>
                      );
                    })}
                  </ul>

                  <p className="mt-5 max-w-md text-sm leading-relaxed text-sand-600">
                    {p.outcome}
                  </p>

                  {/* mt-auto so both buttons sit on the same line however the
                      copy above wraps */}
                  <div className="mt-auto pt-8">
                    <Cta
                      href="#book"
                      size="block"
                      variant={p.featured ? "solid" : "outline"}
                    >
                      {p.cta}
                    </Cta>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* ---- the kit ----
              The block runs to the page measure so the heading rule reaches
              the right gutter; the list underneath is pulled back to max-w-5xl.
              Left-aligned throughout, so "The 12 upgrades." starts on the same
              edge as the h1 above it. */}
          <Reveal className="mt-24 lg:mt-32">
            <div className="reveal flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-b-2 border-cream pb-4">
              <h2 className="h-display text-3xl text-cream sm:text-4xl">
                The {KIT.length} <span className="accent-word">upgrades</span>.
              </h2>
              <p className="eyebrow">Identical in both packages</p>
            </div>

            {/* Two across from lg up — six rows of two, on the page measure so
                the second column's hairline ends level with the heading rule
                above it. Not at sm: halving a 640px column leaves ~140px for
                the title, and these run long ("Toilet seat / raised seat /
                commode support"). Grid rather than columns so a wrapped title
                lifts both cells in its row and the hairlines stay level across
                the gutter. */}
            <ul className="reveal lg:grid lg:grid-cols-2 lg:gap-x-20">
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

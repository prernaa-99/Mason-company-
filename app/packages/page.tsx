import type { Metadata } from "next";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Cta from "@/components/Cta";
import PackageCard from "@/components/PackageCard";
import { KIT } from "@/components/kit";
import { PACKAGES } from "@/components/packages-data";

export const metadata: Metadata = {
  title: "Packages - Mason Company",
  description:
    "Standard and Advanced install the same complete bathroom safety kit - 12 upgrades, fitted by trained Mason experts. Advanced adds a one-year safety check-up.",
};

/* One page, one surface, one language: paper, hairlines, mono labels, display
   type.

   The choice was a Standard-vs-Advanced comparison table, and it read as
   padding: eight mark cells, seven of them yes, and only one row in four that
   actually differed. It is two PackageCards now, the same ones the homepage
   section uses. */

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
              The same PackageCard the homepage section uses. Each card carries
              the whole row list, so the reason to pick one is a line you can
              read in place rather than a tick in a far-off column. */}
          <Reveal className="mt-14 lg:mt-20">
            <div className="grid gap-6 lg:grid-cols-2">
              {PACKAGES.map((p) => (
                <PackageCard
                  key={p.name}
                  pkg={p}
                  headingLevel={2}
                  /* Featured first in the single-column stack — same as the
                     homepage section, so the two never disagree about which
                     package leads. */
                  className={`reveal ${p.featured ? "order-first lg:order-none" : ""}`}
                />
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

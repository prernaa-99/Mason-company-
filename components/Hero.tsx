"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ProductRail from "./ProductRail";
import Cta from "./Cta";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Nothing about the type animates. No eyebrow, headline, subcopy or
      // button enters — they are simply there the instant the page paints.
      // Elements arriving one after another is the shape of a slide build, and
      // no amount of retiming fixes that, so the load motion lives entirely in
      // the wall behind the words instead.
      //
      // Only inside matchMedia: with reduced motion nothing is set, so the
      // lattice renders at its CSS value rather than needing a tween to become
      // visible. That is also why this is set + to and never .from() — an
      // interrupted .from() strands the element at opacity 0.
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(".hero-lattice", { opacity: 0, scale: 1.05 });
        gsap.to(".hero-lattice", {
          opacity: 1,
          scale: 1,
          // long and soft: the grout lines settle from very slightly oversized
          // back to 1px, which registers as the room coming into focus rather
          // than as anything moving
          duration: 2.4,
          ease: "power2.out",
          clearProps: "opacity,transform",
        });
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      id="top"
      /* min-h, not h: on a short viewport the copy + CTAs + rail exceed one
         screen, and a hard height silently clipped the buttons.

         The mobile trims below (pt, the text block's py, the CTA gap, and the
         rail's card height) come to 73px, which is what it took to bring the
         hero back inside 844px. Stacking the two CTAs is what pushed it over,
         and a hero that overflows by 67px doesn't read as "scroll for more" —
         it reads as the rail's progress bar being accidentally cut in half. */
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-20 pb-7 sm:pt-24"
    >
      {/* tiled-wall texture; isolate + -z-10 keeps it under the type and the rail */}
      <div
        aria-hidden="true"
        className="hero-lattice tile-lattice pointer-events-none absolute inset-0 -z-10"
      />

      {/* text — vertically centred in the space above the rail. No min-h-0:
          min-height:auto is what stops this shrinking below its own content. */}
      <div className="flex flex-1 items-center py-4 sm:py-6">
        <div className="mx-auto w-full max-w-4xl px-6 text-center">
          <p className="eyebrow mb-5">Bathroom safety for ageing parents</p>

          {/* Plain lines: the overflow-hidden wrappers existed only to mask a
              rise that no longer happens, and the pb-[0.1em] only to keep
              descenders out of that mask.

              Below sm: one sentence per line, both at one size. Every bad
              version of this block came from a line breaking — an orphaned
              "here." or "don't.", or two sentences at different sizes to dodge
              the break. So buy the width instead of shrinking to fit it:
              -mx-2 lets the headline sit 8px wider than the body column on
              each side (display type earns a wider measure than the copy under
              it), and -0.045em tracking takes back another 3%. Between them
              the longer sentence fits at 7.3vw where it needed 6.8vw before.

              Two lines running nearly the full measure — 10.8em over 12.0em —
              read as far more emphatic than a taller size in a ragged stack.
              Density is what makes a headline land, not point size. Holds from
              320px up. Desktop keeps its own size and breaks. */}
          <h1 className="h-display text-balance text-[7.3vw] leading-[1.08] text-cream max-sm:-mx-2 max-sm:tracking-[-0.045em] sm:text-wrap sm:text-5xl sm:leading-[1.04] lg:text-6xl">
            <span className="block text-cream/90">
              Most <span className="accent-word">falls</span> happen here.
            </span>
            <span className="block text-cream">
              We make sure yours don&rsquo;t.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-cream-dim">
            You can&rsquo;t always be there - safety can be. Premium,
            doctor-informed, expertly-installed bathroom safety.
          </p>

          {/* Stacked and full-width on a phone: side by side they'd each be
              too narrow for their label, and a centred pair of pills at ~70%
              width leaves ragged margins either side of the block above. */}
          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
            <Cta href="#book" className="w-full justify-center sm:w-auto">
              Book a Safety Visit
            </Cta>
            <Cta
              href="#transformations"
              variant="outline"
              className="w-full justify-center sm:w-auto"
            >
              See Transformations
            </Cta>
          </div>
        </div>
      </div>

      {/* rail pinned to the bottom, sized by viewport height */}
      <div className="shrink-0">
        <ProductRail />
      </div>
    </section>
  );
}

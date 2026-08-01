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
         screen, and a hard height silently clipped the buttons. */
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-24 pb-7"
    >
      {/* tiled-wall texture; isolate + -z-10 keeps it under the type and the rail */}
      <div
        aria-hidden="true"
        className="hero-lattice tile-lattice pointer-events-none absolute inset-0 -z-10"
      />

      {/* text — vertically centred in the space above the rail. No min-h-0:
          min-height:auto is what stops this shrinking below its own content. */}
      <div className="flex flex-1 items-center py-6">
        <div className="mx-auto w-full max-w-4xl px-6 text-center">
          <p className="eyebrow mb-5">Bathroom safety for ageing parents</p>

          {/* Plain lines: the overflow-hidden wrappers existed only to mask a
              rise that no longer happens, and the pb-[0.1em] only to keep
              descenders out of that mask. */}
          <h1 className="h-display text-[2.15rem] leading-[1.04] text-cream sm:text-5xl lg:text-6xl">
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

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Cta href="#book">Book a Safety Visit</Cta>
            <Cta href="#transformations" variant="outline">
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

"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ProductRail from "./ProductRail";
import Magnetic from "./Magnetic";
import Cta from "./Cta";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.1,
      });
      // Deliberately set + to, never .from(). A .from() leaves the VISIBLE state
      // implicit: if the tween is reverted, interrupted or never reaches its end
      // (Strict Mode remount, a refresh mid-flight), the element is stranded at
      // opacity 0 and the button is simply gone. Here the end of every tween is
      // clearProps, so the finished state is "no inline styles at all" — i.e.
      // whatever the CSS says, which is visible.
      gsap.set([".hero-eyebrow", ".hero-sub", ".hero-ctas"], { opacity: 0, y: 16 });
      gsap.set(".hero-line-inner", { yPercent: 118 });
      gsap.set(".hero-lattice", { opacity: 0 });

      const rise = { opacity: 1, y: 0, clearProps: "opacity,transform" };

      tl.to(".hero-eyebrow", { ...rise, duration: 0.6 })
        .to(
          ".hero-line-inner",
          { yPercent: 0, duration: 1, stagger: 0.12, clearProps: "transform" },
          "-=0.2"
        )
        .to(".hero-sub", { ...rise, duration: 0.8 }, "-=0.6")
        .to(".hero-ctas", { ...rise, duration: 0.7 }, "-=0.5")
        // the wall settles in under everything else, slower than the type.
        // Absolute 0, added last: relative positions above are measured from the
        // timeline's end, so inserting this 1.6s tween earlier would push every
        // following step later.
        .to(".hero-lattice", { opacity: 1, duration: 1.6, clearProps: "opacity" }, 0);
    },
    { scope: ref }
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
          <p className="hero-eyebrow eyebrow mb-5">
            Bathroom safety for ageing parents
          </p>

          <h1 className="h-display text-[2.15rem] leading-[1.04] text-cream sm:text-5xl lg:text-6xl">
            <span className="block overflow-hidden pb-[0.1em]">
              <span className="hero-line-inner block text-cream/90">
                Most falls happen here.
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.1em]">
              <span className="hero-line-inner block text-cream">
                We make sure <span className="accent-word">yours</span> don&rsquo;t.
              </span>
            </span>
          </h1>

          <p className="hero-sub mx-auto mt-6 max-w-lg text-base leading-relaxed text-cream-dim">
            You can&rsquo;t always be there &mdash; safety can be. Premium,
            doctor-informed, expertly-installed bathroom safety.
          </p>

          {/* the row animates, not the buttons — keeps GSAP off elements that
              carry their own hover transitions */}
          <div className="hero-ctas mt-8 flex flex-wrap items-center justify-center gap-3">
            <Magnetic>
              <Cta href="#book">Book a Safety Visit</Cta>
            </Magnetic>
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

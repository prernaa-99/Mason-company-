"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ProductRail from "./ProductRail";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.1,
      });
      tl.from(".hero-eyebrow", { opacity: 0, y: 14, duration: 0.6 })
        .from(
          ".hero-line",
          { opacity: 0, y: 34, duration: 0.9, stagger: 0.1 },
          "-=0.25"
        )
        .from(".hero-sub", { opacity: 0, y: 18, duration: 0.8 }, "-=0.55")
        .from(
          ".hero-cta",
          { opacity: 0, y: 14, duration: 0.7, stagger: 0.08 },
          "-=0.5"
        );
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex h-[100svh] flex-col overflow-hidden pt-24 pb-7"
    >
      {/* text — vertically centred in the space above the rail */}
      <div className="flex min-h-0 flex-1 items-center">
        <div className="mx-auto w-full max-w-4xl px-6 text-center">
          <p className="hero-eyebrow eyebrow mb-5">
            Bathroom safety for ageing parents
          </p>

          <h1 className="h-display text-[2.15rem] leading-[1.04] text-cream sm:text-5xl lg:text-6xl">
            <span className="hero-line block">Most falls happen here.</span>
            <span className="hero-line block text-cream-dim">
              We make sure yours don&rsquo;t.
            </span>
          </h1>

          <p className="hero-sub mx-auto mt-6 max-w-lg text-base leading-relaxed text-cream-dim">
            You can&rsquo;t always be there &mdash; safety can be. Premium,
            doctor-informed, expertly-installed bathroom safety.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#book"
              className="hero-cta rounded-full bg-cream px-7 py-3.5 text-sm font-semibold text-ink transition-colors duration-300 hover:bg-bone-dim"
            >
              Book a Safety Visit
            </a>
            <a
              href="#transformations"
              className="hero-cta rounded-full border border-line-strong px-7 py-3.5 text-sm font-semibold text-cream transition-colors duration-300 hover:border-cream/40"
            >
              See Transformations
            </a>
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

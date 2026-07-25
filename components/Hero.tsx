"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ProductRail from "./ProductRail";
import Magnetic from "./Magnetic";

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
          ".hero-line-inner",
          { yPercent: 118, duration: 1, stagger: 0.12 },
          "-=0.2"
        )
        .from(".hero-sub", { opacity: 0, y: 18, duration: 0.8 }, "-=0.6")
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
            <span className="block overflow-hidden pb-[0.1em]">
              <span className="hero-line-inner block text-cream/90">
                Most falls happen here.
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.1em]">
              <span className="hero-line-inner block text-cream">
                We make sure yours don&rsquo;t.
              </span>
            </span>
          </h1>

          <p className="hero-sub mx-auto mt-6 max-w-lg text-base leading-relaxed text-cream-dim">
            You can&rsquo;t always be there &mdash; safety can be. Premium,
            doctor-informed, expertly-installed bathroom safety.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Magnetic>
              <a
                href="#book"
                className="hero-cta inline-block rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-[#fff7f5] transition-colors duration-150 hover:bg-accent-hover"
              >
                Book a Safety Visit
              </a>
            </Magnetic>
            <a
              href="#transformations"
              className="hero-cta rounded-full border border-line px-7 py-3.5 text-sm font-semibold text-cream transition-colors duration-150 hover:border-line-strong"
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

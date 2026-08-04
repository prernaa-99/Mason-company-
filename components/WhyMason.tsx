"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const reasons = [
  {
    title: "Comprehensive by design",
    copy: "We look at the full bathroom routine: entry, turning, sitting, standing, showering, and night-time use.",
    tag: "The whole routine",
  },
  {
    title: "Doctor-informed planning",
    copy: "Our approach is shaped with doctor inputs, preventive mobility guidance, and senior-care context.",
    tag: "Medically shaped",
  },
  {
    title: "Trained Mason experts",
    copy: "Every visit is handled by trained technicians who understand support placement and secure fitting.",
    tag: "Skilled hands",
  },
  {
    title: "One accountable team",
    copy: "From selection to inspection, installation, and follow-up, Mason stays responsible for the outcome.",
    tag: "Owned end to end",
  },
  {
    title: "Premium, home-first finish",
    copy: "Built to feel calm and considered - not hospital-like or temporary.",
    tag: "Still feels like home",
  },
  {
    title: "Evidence-led prevention",
    copy: "We study fall-risk patterns and assisted-care environments to design practical home upgrades.",
    tag: "Grounded in evidence",
  },
];

// DOM grid order (row-major): 0 1 2 / 3 4 5  ->  TL TM TR / BL BM BR
// Outside-in deal order: corners first, middle column lands last.
// rank[domIndex] = when that card deals (0 = first, 5 = last)
const dealRank = [0, 4, 1, 3, 5, 2]; // TL,TR,BR,BL first; TM,BM last
const flightRot = [-9, 7, -6, 8, -4, 5]; // per-rank tilt while stacked

export default function WhyMason() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // heading entrance
      gsap.from(".wm-reveal", {
        opacity: 0,
        y: 26,
        duration: 1,
        ease: "power3.out",
        stagger: 0.09,
        scrollTrigger: { trigger: ref.current, start: "top 82%", once: true },
      });

      const mm = gsap.matchMedia();

      // ---- desktop: stack in the centre, deal outward into a 3x2 grid,
      //      once, and then stay dealt ----
      mm.add("(min-width: 1024px)", () => {
        const grid = ref.current!.querySelector<HTMLElement>(".wm-grid")!;
        const cards = gsap.utils.toArray<HTMLElement>(".wm-card");

        // offset from each card's centre to the grid centre (= stacked position)
        const dx = (el: HTMLElement) =>
          grid.clientWidth / 2 - (el.offsetLeft + el.offsetWidth / 2);
        const dy = (el: HTMLElement) =>
          grid.clientHeight / 2 - (el.offsetTop + el.offsetHeight / 2);

        // top of the stack (deals first) sits above the rest
        cards.forEach((el, i) =>
          gsap.set(el, { zIndex: 10 + (cards.length - dealRank[i]) })
        );

        /* Plays itself once, on its own clock — no scrub, so scrolling back up
           leaves the cards where they landed instead of collecting them into
           the stack again.

           The pin goes with the scrub rather than being a separate decision:
           its only job was to hold the section still for the 1700px the deal
           was scrubbed across. Kept without the scrub it would be 1700px of
           scrolling against a section that had already finished moving, which
           is worse than what it replaced. Losing it also takes 1700px off the
           page.

           Triggered off the grid, not the section: the section is a full
           viewport tall and the cards sit in its lower two thirds, so firing
           on the section's own top dealt them out below the fold. */
        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: grid,
            start: "top 78%",
            once: true,
            invalidateOnRefresh: true,
          },
        });

        cards.forEach((el, i) => {
          const rank = dealRank[i];
          const at = rank * 0.13; // sequence the deal
          tl.fromTo(
            el,
            {
              x: () => dx(el),
              y: () => dy(el),
              rotation: flightRot[rank],
              scale: 0.82,
            },
            { x: 0, y: 0, rotation: 0, scale: 1, duration: 0.55, immediateRender: true },
            at
          ).fromTo(
            el.querySelector(".wm-card-text"),
            { autoAlpha: 0, y: 12 },
            { autoAlpha: 1, y: 0, duration: 0.3, immediateRender: true },
            at + 0.4
          );
        });
      });

      // ---- mobile: plain grid, gentle fade-up ----
      mm.add("(max-width: 1023px)", () => {
        gsap.from(".wm-card", {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".wm-grid", start: "top 80%", once: true },
        });
      });
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      className="border-t border-line bg-sand-100 py-14 sm:py-20 lg:h-screen lg:overflow-hidden lg:py-0"
    >
      {/* lg padding lives here rather than on the section, because the section
          is the viewport and this is what sits inside it. Same py-24 as every
          other section — top equal to bottom. */}
      <div className="mx-auto flex h-full w-full max-w-6xl flex-col px-6 lg:px-10 lg:py-24">
        <div className="max-w-3xl">
          <p className="wm-reveal eyebrow mb-5">Why Mason Company</p>
          <h2 className="wm-reveal h-display text-3xl text-cream sm:text-4xl lg:text-[2.75rem]">
            A complete <span className="accent-word">solution</span> - not
            a pile of products.
          </h2>
          <p className="wm-reveal mt-5 max-w-xl text-base leading-relaxed text-cream-dim">
            Six strengths that come together into one accountable outcome.
          </p>
        </div>

        {/* deck → 3x2 grid */}
        <div className="wm-grid relative mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-0 lg:flex-1 lg:grid-cols-3 lg:content-center">
          {reasons.map((r, i) => (
            <article
              key={r.title}
              className="wm-card flex min-h-[220px] flex-col justify-center rounded-2xl border border-line bg-ink-raised p-7 will-change-transform lg:min-h-[240px]"
            >
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-cream-faint">
                {r.tag}
              </span>

              <div className="wm-card-text mt-4">
                <h3 className="font-display text-xl font-semibold text-cream">
                  {r.title}
                </h3>
                <p
                  className="mt-2.5 text-sm leading-relaxed text-cream-dim"
                  dangerouslySetInnerHTML={{ __html: r.copy }}
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

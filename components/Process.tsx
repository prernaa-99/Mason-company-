"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const steps = [
  {
    title: "Book your package",
    copy: "Choose Standard or Advanced online, request a callback, or call us for guidance.",
  },
  {
    title: "Confirm payment",
    copy: "Pay securely on the website, or receive a payment link from our team after your call.",
  },
  {
    title: "Inspection",
    copy: "We schedule a virtual or physical bathroom inspection depending on location and logistics.",
  },
  {
    title: "Technician visit",
    copy: "Our trained technicians verify the site and finalise support placement.",
  },
  {
    title: "Installation",
    copy: "The selected package is installed with careful fitting, clean execution, and minimal disruption.",
  },
  {
    title: "Success handover",
    copy: "We complete a walkthrough and document the upgrade with before-and-after pictures.",
  },
];

export default function Process() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".proc-item", {
        opacity: 0,
        y: 26,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: ".proc-list", start: "top 78%", once: true },
      });

      gsap.to(".proc-progress", {
        scaleY: 1,
        ease: "none",
        transformOrigin: "top",
        scrollTrigger: {
          trigger: ".proc-list",
          start: "top 65%",
          end: "bottom 75%",
          scrub: true,
        },
      });
    },
    { scope: ref }
  );

  return (
    <section
      id="process"
      ref={ref}
      className="border-t border-line py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          {/* left — sticky intro */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow mb-5">Our process</p>
            <h2 className="h-display text-3xl text-cream sm:text-4xl lg:text-5xl">
              From booking to a safer bathroom.
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-cream-dim">
              A clear, guided process from package booking to final installation
              &mdash; with support at every step.
            </p>

            <div className="mt-8 border-t border-line pt-8">
              <div className="flex items-baseline gap-3">
                <span className="font-display text-5xl font-bold leading-none text-cream">
                  6
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-clay">
                  Simple
                  <br />
                  steps
                </span>
              </div>
              <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream-dim">
                Handled by one accountable Mason team, from booking all the way
                to handover.
              </p>
            </div>

            <a
              href="#book"
              className="mt-8 inline-block rounded-full bg-cream px-6 py-3 text-sm font-semibold text-ink transition-colors duration-300 hover:bg-bone-dim"
            >
              Book a Safety Visit
            </a>
          </div>

          {/* right — timeline */}
          <div className="proc-list relative pl-12 sm:pl-16">
            {/* track + animated progress */}
            <div className="absolute left-[15px] top-7 h-[calc(100%-3.5rem)] w-px bg-line sm:left-[19px]" />
            <div className="proc-progress absolute left-[15px] top-7 h-[calc(100%-3.5rem)] w-px origin-top scale-y-0 bg-clay sm:left-[19px]" />

            <div className="grid">
              {steps.map((s, i) => (
                <div
                  key={i}
                  className="proc-item relative border-t border-line py-7 first:border-t-0"
                >
                  <span className="absolute -left-12 top-7 grid h-8 w-8 place-items-center rounded-full border border-clay/40 bg-ink font-display text-sm font-semibold text-clay sm:-left-16">
                    {i + 1}
                  </span>
                  <h3 className="font-display text-xl font-semibold text-cream sm:text-2xl">
                    {s.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-cream-dim">
                    {s.copy}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

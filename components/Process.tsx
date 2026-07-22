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
        y: 30,
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
          start: "top 60%",
          end: "bottom 70%",
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
      className="relative border-t border-line py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <p className="eyebrow mb-5">Our process</p>
          <h2 className="h-display text-3xl text-cream sm:text-4xl lg:text-5xl">
            From booking to a safer bathroom.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-cream-dim">
            A clear, guided process from package booking to final installation
            &mdash; with support at every step.
          </p>
        </div>

        <div className="proc-list relative mt-16 pl-10 sm:pl-14">
          {/* track */}
          <div className="absolute left-[13px] top-2 h-[calc(100%-1rem)] w-px bg-line sm:left-[17px]" />
          <div className="proc-progress absolute left-[13px] top-2 h-[calc(100%-1rem)] w-px origin-top scale-y-0 bg-clay sm:left-[17px]" />

          <div className="grid gap-10">
            {steps.map((s, i) => (
              <div key={i} className="proc-item relative">
                <span className="absolute -left-10 top-0 grid h-7 w-7 place-items-center rounded-full border border-clay/50 bg-ink font-display text-sm text-clay sm:-left-14">
                  {i + 1}
                </span>
                <h3 className="font-display text-xl text-cream">{s.title}</h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-cream-dim">
                  {s.copy}
                </p>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-14 text-sm text-cream-faint">
          Clear steps. Assisted support. One accountable Mason team from booking
          to handover.
        </p>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Cta from "./Cta";

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

// each tread steps further right — a descending staircase on desktop.
// kept as static strings so Tailwind emits them.
const offset = [
  "lg:ml-0",
  "lg:ml-[7%]",
  "lg:ml-[14%]",
  "lg:ml-[21%]",
  "lg:ml-[28%]",
  "lg:ml-[35%]",
];

export default function Process() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // heading fades in on approach (both breakpoints)
      gsap.from(".proc-head", {
        opacity: 0,
        y: 24,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
      });

      const mm = gsap.matchMedia();

      // ---- desktop: pin, and build the staircase step-by-step on scroll ----
      mm.add("(min-width: 1024px)", () => {
        const treads = gsap.utils.toArray<HTMLElement>(".proc-step");
        const countEl = ref.current!.querySelector<HTMLElement>(".proc-count");

        gsap.set(treads, { opacity: 0, y: 36, x: -28 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: "+=" + steps.length * 240,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            onUpdate: (self) => {
              // active step tracks the highlighted tread (0 -> 1, 1 -> last)
              const n = Math.min(
                steps.length,
                Math.max(1, Math.round((steps.length - 1) * self.progress) + 1)
              );
              if (countEl) countEl.textContent = "0" + n;
            },
          },
        });

        // progress bar spans the whole flight
        tl.to(
          ".proc-progress",
          { scaleX: 1, ease: "none", duration: steps.length * 0.6 },
          0
        );

        // reveal each tread, then dim the previous one so only "now" is bright
        treads.forEach((t, i) => {
          const at = i * 0.6;
          tl.to(
            t,
            { opacity: 1, y: 0, x: 0, duration: 0.5, ease: "power3.out" },
            at
          );
          if (i > 0) {
            tl.to(
              treads[i - 1],
              { opacity: 0.32, duration: 0.4, ease: "none" },
              at
            );
          }
        });
      });

      // ---- mobile: no pin, simple staggered reveal ----
      mm.add("(max-width: 1023px)", () => {
        gsap.from(".proc-step", {
          opacity: 0,
          y: 24,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: ".proc-stair",
            start: "top 82%",
            once: true,
          },
        });
      });
    },
    { scope: ref }
  );

  return (
    <section
      id="process"
      ref={ref}
      className="border-t border-line bg-sand-100 py-24 lg:h-screen lg:py-0"
    >
      <div className="mx-auto grid h-full max-w-7xl gap-12 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-14 lg:px-10 lg:pb-10 lg:pt-24">
        {/* left — heading + live progress */}
        <div>
          <p className="proc-head eyebrow mb-5">Our process</p>
          <h2 className="proc-head h-display text-3xl text-cream sm:text-4xl lg:text-5xl">
            From booking to a <span className="accent-word">safer</span>{" "}
            bathroom.
          </h2>
          <p className="proc-head mt-6 max-w-md text-base leading-relaxed text-cream-dim">
            Six clear steps, handled by one accountable Mason team - from
            package booking all the way to final handover.
          </p>

          <div className="proc-head mt-8 flex items-end gap-3">
            <span className="proc-count font-display text-6xl font-bold leading-none text-cream">
              01
            </span>
            <span className="pb-1 text-xs font-semibold uppercase tracking-[0.2em] text-clay">
              / 0{steps.length}
              <br />
              steps
            </span>
          </div>
          <div className="proc-head relative mt-5 h-px w-48 bg-line">
            <span className="proc-progress absolute inset-y-0 left-0 w-full origin-left scale-x-0 bg-clay" />
          </div>

          <Cta href="#book" className="proc-head mt-8">
            Book a Safety Visit
          </Cta>
        </div>

        {/* right — descending staircase */}
        <div className="proc-stair flex flex-col gap-3 lg:gap-2.5">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className={`proc-step w-full lg:w-[62%] ${offset[i]}`}
            >
              <div className="flex items-start gap-4 rounded-2xl border border-line border-l-2 border-l-clay/50 bg-ink-raised p-4 lg:px-5 lg:py-3.5">
                <span className="font-display text-3xl font-bold leading-none text-cream-dim">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold text-cream lg:text-lg">
                    {s.title}
                  </h3>
                  <p className="mt-1 text-xs leading-snug text-cream-dim">
                    {s.copy}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

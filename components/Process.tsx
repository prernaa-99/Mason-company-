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

        /* One beat per step, and one more at the end for the settle. The
           staircase is worth 240px of scroll a beat either way, so the extra
           beat buys the finished state its own moment rather than taking one
           away from the steps. */
        const BEAT = 0.6;
        const beats = steps.length + 1;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: "+=" + beats * 240,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            onUpdate: (self) => {
              /* One beat per step, so the elapsed beat is the step number.
                 Clamped because the timeline runs a beat past the last reveal
                 for the settle, and the counter should read 06 throughout it
                 rather than ticking on to a step that doesn't exist. */
              const n = Math.min(
                steps.length,
                Math.floor((self.progress * tl.duration()) / BEAT) + 1
              );
              if (countEl) countEl.textContent = "0" + n;
            },
          },
        });

        // progress bar spans the flight, full exactly as the settle begins
        tl.to(
          ".proc-progress",
          { scaleX: 1, ease: "none", duration: steps.length * BEAT },
          0
        );

        // reveal each tread, then dim the previous one so only "now" is bright
        treads.forEach((t, i) => {
          const at = i * BEAT;
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

        /* The settle. Dimming the previous tread is what makes the sequence
           read as "this step, now" while it is running, but nothing ever undid
           it — so the flight ended with five of the six greyed out and only
           the last one lit, as if most of the process were already behind you.
           Six steps you can read together is the point of the section; the
           step-by-step is how it gets there, not where it lands. */
        tl.to(
          treads,
          { opacity: 1, duration: 0.45, ease: "power2.out" },
          steps.length * BEAT
        );
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
      className="border-t border-line bg-sand-100 py-14 sm:py-20 lg:h-screen lg:py-0"
    >
      <div className="mx-auto grid h-full max-w-7xl gap-12 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-14 lg:px-10 lg:py-24">
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

          {/* Counter and progress rule are desktop instruments: they track the
              pinned lg:h-screen layout as it scrolls. Below lg there is no pin,
              so the count sat frozen at 01 beside a "/ 06" broken over two
              lines, above a rule that never filled — directly on top of the
              same 01–06 printed on every step card. Two readings of the same
              number, one of them inert. */}
          <div className="proc-head mt-8 hidden items-end gap-3 lg:flex">
            <span className="proc-count font-display text-6xl font-bold leading-none text-cream">
              01
            </span>
            <span className="pb-1 text-xs font-semibold uppercase tracking-[0.2em] text-clay">
              / 0{steps.length}
              <br />
              steps
            </span>
          </div>
          <div className="proc-head relative mt-5 hidden h-px w-48 bg-line lg:block">
            <span className="proc-progress absolute inset-y-0 left-0 w-full origin-left scale-x-0 bg-clay" />
          </div>

          {/* Desktop keeps the CTA in the left column, where it sits beside
              the staircase rather than before it. Stacked, that same position
              puts "book now" between the promise of six clear steps and the
              six steps themselves — asking for the decision before showing
              the thing that earns it. */}
          <div className="proc-head mt-8 hidden lg:block">
            <Cta href="#book">Book a Safety Visit</Cta>
          </div>
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

        {/* Below lg only — a third grid child, so the gap-12 rhythm carries it
            without a margin of its own. Two elements rather than one moved by
            order: the CTA belongs inside the left column on desktop, and a
            single element cannot be both a child of that column and a sibling
            of the staircase. */}
        <div className="lg:hidden">
          <Cta href="#book" className="w-full justify-center sm:w-auto">
            Book a Safety Visit
          </Cta>
        </div>
      </div>
    </section>
  );
}

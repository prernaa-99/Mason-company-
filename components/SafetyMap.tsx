"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Hotspot = { x: number; y: number; title: string; copy: string };

// Positions are % of the frame (x from left, y from top), pinned to the real
// fixtures in hero-after.png. Nudge these if the crop ever changes.
const HOTSPOTS: Hotspot[] = [
  { x: 7, y: 53, title: "Two-way safety lock", copy: "Locks for privacy — and opens from outside in an emergency." },
  { x: 18, y: 45, title: "Entry grab bar", copy: "The first thing to hold, right where the floor turns wet." },
  { x: 50, y: 40, title: "Handheld shower & grip", copy: "Water and a firm grip, exactly where she stands." },
  { x: 39, y: 66, title: "Shower seat", copy: "Bathe sitting down. No balancing on one leg." },
  { x: 61, y: 57, title: "Toilet support rails", copy: "Sitting and standing — supported at the hardest moment." },
  { x: 31, y: 86, title: "Anti-slip flooring", copy: "A wet floor stops being a trap." },
];

export default function SafetyMap({
  before = "/v2-images/hero-before.png",
  after = "/v2-images/hero-after.png",
  hotspots = HOTSPOTS,
}: {
  before?: string;
  after?: string;
  hotspots?: Hotspot[];
}) {
  const ref = useRef<HTMLElement>(null);
  const [showAfter, setShowAfter] = useState(false);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      gsap.from(".sm-reveal", {
        opacity: 0,
        y: 24,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.09,
        scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
      });

      // reveal the "after" (features materialise) once the frame is in view
      ScrollTrigger.create({
        trigger: ".sm-frame",
        start: "top 78%",
        once: true,
        onEnter: () => setShowAfter(true),
      });
    },
    { scope: ref }
  );

  const current = hotspots[active];

  return (
    <section ref={ref} className="border-t border-line py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <p className="sm-reveal eyebrow mb-5">Explore the work</p>
          <h2 className="sm-reveal h-display text-3xl text-cream sm:text-4xl lg:text-5xl">
            Every fixture, placed for a reason.
          </h2>
          <p className="sm-reveal mt-6 max-w-xl text-base leading-relaxed text-cream-dim">
            A real Mason bathroom. Tap a point to see what changed &mdash; and
            why it&rsquo;s exactly where it is.
          </p>
        </div>

        <div className="sm-reveal mt-12 grid gap-8 lg:grid-cols-[1.65fr_1fr] lg:items-start lg:gap-10">
          {/* interactive frame */}
          <div className="sm-frame relative aspect-[3/2] overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
            {/* before (base) */}
            <Image
              src={before}
              alt="Bathroom before the Mason safety upgrade"
              fill
              sizes="(max-width: 1024px) 100vw, 65vw"
              className="object-cover"
              priority
            />
            {/* after (crossfades in) */}
            <Image
              src={after}
              alt="Bathroom after the Mason safety upgrade"
              fill
              sizes="(max-width: 1024px) 100vw, 65vw"
              className={`object-cover transition-opacity duration-[900ms] ease-out ${
                showAfter ? "opacity-100" : "opacity-0"
              }`}
            />

            {/* hotspots — only meaningful on the "after" */}
            <div
              className={`absolute inset-0 transition-opacity duration-500 ${
                showAfter ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              {hotspots.map((h, i) => {
                const isActive = active === i;
                return (
                  <button
                    key={h.title}
                    type="button"
                    aria-label={h.title}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    style={{
                      left: `${h.x}%`,
                      top: `${h.y}%`,
                      transitionDelay: showAfter ? `${300 + i * 90}ms` : "0ms",
                    }}
                    className={`absolute grid h-7 w-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full transition-transform duration-500 ${
                      showAfter ? "scale-100" : "scale-0"
                    }`}
                  >
                    {/* pulse ring */}
                    <span
                      className={`absolute inline-flex h-full w-full rounded-full bg-accent/40 ${
                        isActive ? "" : "animate-ping"
                      }`}
                    />
                    {/* dot */}
                    <span
                      className={`relative inline-flex rounded-full border-2 border-white shadow-md transition-all duration-300 ${
                        isActive ? "h-5 w-5 bg-accent" : "h-3.5 w-3.5 bg-accent"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* before / after toggle */}
            <div className="absolute left-4 top-4 flex overflow-hidden rounded-full border border-white/30 bg-black/35 p-0.5 text-xs font-semibold backdrop-blur">
              {(["Before", "After"] as const).map((label) => {
                const on = (label === "After") === showAfter;
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setShowAfter(label === "After")}
                    className={`rounded-full px-3.5 py-1.5 transition-colors duration-200 ${
                      on ? "bg-white text-ink" : "text-white/80 hover:text-white"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            <span className="absolute bottom-4 right-4 rounded-full bg-black/35 px-3 py-1 text-[0.7rem] font-medium text-white/90 backdrop-blur">
              Real Mason installation
            </span>
          </div>

          {/* detail + legend */}
          <div className="lg:pt-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {String(active + 1).padStart(2, "0")} / {String(hotspots.length).padStart(2, "0")}
            </p>
            <h3 className="mt-3 font-display text-2xl font-semibold text-cream">
              {current.title}
            </h3>
            <p className="mt-2 max-w-sm text-base leading-relaxed text-cream-dim">
              {current.copy}
            </p>

            <ul className="mt-7 space-y-1 border-t border-line pt-5">
              {hotspots.map((h, i) => {
                const isActive = active === i;
                return (
                  <li key={h.title}>
                    <button
                      type="button"
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      onClick={() => setActive(i)}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors duration-150 ${
                        isActive
                          ? "bg-surface-2 font-semibold text-cream"
                          : "text-cream-dim hover:bg-surface"
                      }`}
                    >
                      <span
                        className={`grid h-5 w-5 shrink-0 place-items-center rounded-full text-[0.65rem] font-bold transition-colors duration-150 ${
                          isActive ? "bg-accent text-white" : "border border-line-strong text-cream-faint"
                        }`}
                      >
                        {i + 1}
                      </span>
                      {h.title}
                    </button>
                  </li>
                );
              })}
            </ul>

            <a
              href="#book"
              className="mt-6 inline-block rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-accent-hover"
            >
              Book a Safety Visit
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useState } from "react";
import Reveal from "./Reveal";

// NOTE: `img` uses stock placeholders for now. Swap each to the real headshot
// (e.g. /images/dr-ashok-gupta.jpg) once the photos are added to public/images.
const doctors = [
  {
    name: "Dr. Ashok Gupta",
    creds: "MBBS (UCMS), MRSH (London) · 40+ years",
    img: "/images/care-1.jpg",
    quote:
      "For ageing adults, bathroom safety should focus on predictable support: standing, turning, sitting, bathing, and moving across wet areas — without making the space feel institutional.",
  },
  {
    name: "Dr. Rajiv Goyal",
    creds: "MBBS, MD (Dermatology) · 22 years",
    img: "/images/care-2.jpg",
    quote:
      "Good preventive design respects both safety and dignity. The right bathroom changes should reduce avoidable risk while still feeling comfortable, clean, and appropriate for the home.",
  },
  {
    name: "Dr. Prerna Goyal",
    creds: "MBBS, DMRD, DNB · Radiologist, MAMC Delhi",
    img: "/images/care-3.jpg",
    quote:
      "Fall prevention begins with understanding daily movement. Support placement, slip-risk reduction, visibility, and ease of use all matter when designing safer spaces for older adults.",
  },
];

export default function Doctors() {
  const [active, setActive] = useState(0);

  return (
    <section id="doctors" className="border-t border-line bg-clinical py-24 lg:h-screen lg:py-0">
      <div className="mx-auto flex h-full max-w-7xl flex-col px-6 lg:px-10 lg:pb-10 lg:pt-24">
        <Reveal className="max-w-2xl">
          <p className="reveal eyebrow mb-4">Doctor-reviewed</p>
          <h2 className="reveal h-display text-3xl text-cream sm:text-4xl lg:text-[2.75rem]">
            Safety thinking, shaped by medicine.
          </h2>
          <p className="reveal mt-4 max-w-xl text-base leading-relaxed text-cream-dim">
            Built with medical inputs and senior-care context. Hover a doctor
            &mdash; or tap on mobile &mdash; to hear them.
          </p>
        </Reveal>

        {/* expanding portrait accordion */}
        <div className="mt-8 flex flex-1 flex-col gap-3 lg:mt-10 lg:flex-row lg:gap-4">
          {doctors.map((d, i) => {
            const isActive = active === i;
            return (
              <button
                key={d.name}
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-expanded={isActive}
                className={`group relative w-full appearance-none overflow-hidden rounded-2xl border text-left transition-all duration-500 ease-out lg:min-h-0 ${
                  isActive
                    ? "min-h-[320px] border-line-strong lg:flex-[2.6]"
                    : "min-h-[80px] border-line lg:flex-[1]"
                }`}
              >
                <Image
                  src={d.img}
                  alt={`Portrait of ${d.name}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className={`object-cover transition-all duration-700 ease-out ${
                    isActive ? "scale-100 lg:grayscale-0" : "scale-105 lg:grayscale"
                  }`}
                />
                <div
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    isActive
                      ? "bg-gradient-to-t from-ink via-ink/45 to-transparent"
                      : "bg-gradient-to-t from-ink/85 via-ink/35 to-transparent"
                  }`}
                />

                <div className="absolute inset-x-0 bottom-0 p-5 lg:p-6">
                  <span
                    className={`block h-px bg-cream-faint transition-all duration-500 ${
                      isActive ? "w-10 opacity-100" : "w-0 opacity-0"
                    }`}
                  />
                  <blockquote
                    className={`overflow-hidden font-display leading-relaxed text-cream transition-all duration-500 ease-out ${
                      isActive
                        ? "mt-3 max-h-48 text-sm opacity-100 sm:text-base lg:max-h-56"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    &ldquo;{d.quote}&rdquo;
                  </blockquote>
                  <p
                    className={`font-display font-semibold text-cream ${
                      isActive ? "mt-4 text-lg" : "text-base"
                    }`}
                  >
                    {d.name}
                  </p>
                  <p className="mt-0.5 text-xs text-cream-dim">{d.creds}</p>
                </div>
              </button>
            );
          })}
        </div>

        <p className="mt-6 text-xs leading-relaxed text-cream-faint lg:mt-6">
          Doctor inputs are used for preventive safety planning and product
          approach. Mason Company does not provide medical treatment or
          guarantee fall-free outcomes.
        </p>
      </div>
    </section>
  );
}

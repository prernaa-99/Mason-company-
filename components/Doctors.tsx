import Image from "next/image";
import Reveal from "./Reveal";

const doctors = [
  {
    name: "Dr. Ashok Gupta",
    creds: "MBBS (UCMS), MRSH (London) · 40+ years",
    quote:
      "For ageing adults, bathroom safety should focus on predictable support: standing, turning, sitting, bathing, and moving across wet areas. A well-planned home upgrade can support safer daily routines without making the space feel institutional.",
  },
  {
    name: "Dr. Rajiv Goyal",
    creds: "MBBS, MD (Dermatology) · 22 years",
    quote:
      "Good preventive design respects both safety and dignity. The right bathroom changes should reduce avoidable risk while still feeling comfortable, clean, and appropriate for the home.",
  },
  {
    name: "Dr. Prerna Goyal",
    creds: "MBBS, DMRD, DNB · Radiologist, MAMC Delhi",
    quote:
      "Fall prevention begins with understanding daily movement. Support placement, slip-risk reduction, visibility, and ease of use all matter when designing safer spaces for older adults.",
  },
];

export default function Doctors() {
  return (
    <section id="doctors" className="border-t border-line py-24 lg:py-32">
      <Reveal className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* left: intro + editorial image */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="reveal eyebrow mb-5">Doctor-reviewed</p>
            <h2 className="reveal h-display text-3xl text-cream sm:text-4xl lg:text-5xl">
              Safety thinking, shaped by medicine.
            </h2>
            <p className="reveal mt-6 max-w-md text-base leading-relaxed text-cream-dim">
              Our approach is built with medical inputs, senior-care context,
              and practical guidance from experienced doctors &mdash; designed
              around real movement, balance, and daily-use risks.
            </p>
            <div className="reveal relative mt-8 aspect-[4/3] overflow-hidden rounded-2xl border border-line">
              <Image
                src="/images/care-2.jpg"
                alt="Caring hands"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* right: quotes */}
          <div className="grid">
            {doctors.map((d) => (
              <figure
                key={d.name}
                className="reveal border-t border-line py-8 first:border-t-0 first:pt-0"
              >
                <blockquote className="font-display text-lg leading-relaxed text-cream sm:text-xl">
                  &ldquo;{d.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5">
                  <p className="font-display text-base font-semibold text-clay">
                    {d.name}
                  </p>
                  <p className="mt-1 text-xs text-cream-faint">{d.creds}</p>
                </figcaption>
              </figure>
            ))}
            <p className="reveal mt-6 border-t border-line pt-6 text-xs leading-relaxed text-cream-faint">
              Doctor inputs are used for preventive safety planning and product
              approach. Mason Company does not provide medical treatment or
              guarantee fall-free outcomes.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

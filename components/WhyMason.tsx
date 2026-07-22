import Image from "next/image";
import Reveal from "./Reveal";

const reasons = [
  {
    title: "Comprehensive by design",
    copy: "We look at the full bathroom routine: entry, turning, sitting, standing, showering, and night-time use.",
  },
  {
    title: "Doctor-informed planning",
    copy: "Our approach is shaped with doctor inputs, preventive mobility guidance, and senior-care context.",
  },
  {
    title: "Trained Mason experts",
    copy: "Every visit is handled by trained technicians who understand support placement and secure fitting.",
  },
  {
    title: "One accountable team",
    copy: "From selection to inspection, installation, and follow-up, Mason stays responsible for the outcome.",
  },
  {
    title: "Premium, home-first finish",
    copy: "Built to feel calm and considered &mdash; not hospital-like or temporary.",
  },
  {
    title: "Evidence-led prevention",
    copy: "We study fall-risk patterns and assisted-care environments to design practical home upgrades.",
  },
];

export default function WhyMason() {
  return (
    <section className="border-t border-line py-24 lg:py-32">
      <Reveal className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-3xl">
          <p className="reveal eyebrow mb-5">Why Mason Company</p>
          <h2 className="reveal h-display text-3xl text-cream sm:text-4xl lg:text-5xl">
            A complete solution &mdash; not a pile of products.
          </h2>
          <p className="reveal mt-6 text-lg leading-relaxed text-cream-dim">
            Shaped by medical expertise, expert installation, and the design
            standards families expect at home.
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="reveal relative min-h-[420px] overflow-hidden rounded-2xl lg:min-h-full">
            <Image
              src="/images/bath-5.jpg"
              alt="A calm, premium bathroom that still feels like home"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
            <p className="absolute bottom-6 left-6 max-w-[70%] font-display text-lg font-semibold text-cream">
              Safe, yet still beautifully at home.
            </p>
          </div>

          <ul className="grid">
            {reasons.map((r, i) => (
              <li
                key={r.title}
                className="reveal flex gap-6 border-t border-line py-6 first:border-t-0 first:pt-0"
              >
                <span className="font-display text-lg font-semibold text-clay">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold text-cream">
                    {r.title}
                  </h3>
                  <p
                    className="mt-2 text-sm leading-relaxed text-cream-dim"
                    dangerouslySetInnerHTML={{ __html: r.copy }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}

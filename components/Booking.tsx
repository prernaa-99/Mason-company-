import Image from "next/image";
import Reveal from "./Reveal";

const chips = [
  "Full refund before installation",
  "Doctor-informed planning",
  "Trained Mason experts",
];

export default function Booking() {
  return (
    <section id="book" className="border-t border-line px-6 py-16 lg:px-10 lg:py-24">
      <Reveal className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-line">
        {/* background image */}
        <Image
          src="/images/shower-1.jpg"
          alt="A safer, calmer bathroom"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-oxblood-deep/85" />

        <div className="relative px-8 py-20 text-center sm:px-12 lg:py-28">
          <p className="reveal eyebrow mb-6">Book a Safety Visit</p>
          <h2 className="reveal mx-auto max-w-3xl h-display text-4xl leading-[1.05] text-cream sm:text-5xl lg:text-6xl">
            Make the bathroom safer while it still feels like home.
          </h2>
          <p className="reveal mx-auto mt-6 max-w-xl text-base leading-relaxed text-cream-dim sm:text-lg">
            Act before a fall changes everything. Choose a package or request a
            callback &mdash; one accountable Mason team handles the rest.
          </p>

          <div className="reveal mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#book"
              className="rounded-full bg-cream px-8 py-4 text-sm font-semibold text-ink transition-colors duration-300 hover:bg-bone-dim"
            >
              Book a Safety Visit
            </a>
            <a
              href="#book"
              className="rounded-full border border-line-strong px-8 py-4 text-sm font-semibold text-cream transition-colors duration-300 hover:border-cream/40"
            >
              Request a Callback
            </a>
          </div>

          <div className="reveal mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {chips.map((c) => (
              <span
                key={c}
                className="flex items-center gap-2 text-xs text-cream-dim"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12.5l4 4 10-10"
                    stroke="#a08d77"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {c}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

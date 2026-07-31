import Image from "next/image";
import Reveal from "./Reveal";
import Cta from "./Cta";

const chips = [
  "Full refund before installation",
  "Doctor-informed planning",
  "Trained Mason experts",
];

export default function Booking() {
  return (
    <section id="book" className="border-t border-line bg-sand-100 px-6 py-16 lg:px-10 lg:py-24">
      <Reveal className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-line">
        {/* background image */}
        <Image
          src="/images/shower-1.jpg"
          alt="A safer, calmer bathroom"
          fill
          sizes="100vw"
          className="object-cover"
        />
        {/* accent-muted wash at ~62% so the real bathroom still reads */}
        <div className="absolute inset-0 bg-accent-muted/[0.62]" />
        {/* dark edge vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_45%,transparent_50%,rgba(11,9,8,0.6))]" />

        <div className="relative px-8 py-20 text-center sm:px-12 lg:py-28">
          <p className="reveal eyebrow on-dark mb-6">Book a Safety Visit</p>
          <h2 className="reveal mx-auto max-w-3xl h-display text-4xl leading-[1.05] text-white sm:text-5xl lg:text-6xl">
            Book the visit. We&rsquo;ll handle the{" "}
            <span className="accent-word on-dark">rest</span>.
          </h2>
          <p className="reveal mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            Act before a fall changes everything. Choose a package or request a
            callback - one accountable Mason team handles the rest.
          </p>

          <div className="reveal mt-9 flex flex-wrap items-center justify-center gap-3">
            <Cta href="#book">Book a Safety Visit</Cta>
            <Cta href="#book" variant="outlineLight">
              Request a Callback
            </Cta>
          </div>

          <div className="reveal mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {chips.map((c) => (
              <span
                key={c}
                className="flex items-center gap-2 text-xs text-white/85"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12.5l4 4 10-10"
                    stroke="#e6f3ef"
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

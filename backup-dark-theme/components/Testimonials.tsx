import Reveal from "./Reveal";

const testimonials = [
  {
    quote:
      "We wanted the bathroom to be safer for my father, but we were worried it would look too clinical. Mason made the space feel more secure without changing the warmth of the home.",
    name: "Anita Mehra",
    role: "Daughter · Delhi",
    tag: "Safer movement, premium finish",
  },
  {
    quote:
      "The process was clear from the first call. The team explained the package, inspected the bathroom, and installed everything neatly. My mother now has support exactly where she needs it.",
    name: "Rohan Kapoor",
    role: "Son · Gurgaon",
    tag: "Clear process, confident handover",
  },
  {
    quote:
      "The biggest relief was not having to coordinate multiple vendors. Mason handled the planning, products, installation, and walkthrough as one complete solution.",
    name: "Neha Shah",
    role: "Daughter-in-law · Mumbai",
    tag: "One accountable team",
  },
  {
    quote:
      "The before-and-after difference was obvious. The bathroom feels safer, but it still looks like a well-designed home bathroom, not a medical facility.",
    name: "Vikram Rao",
    role: "Son · Goa",
    tag: "Visible upgrade, home-first design",
  },
];

export default function Testimonials() {
  return (
    <section className="relative border-t border-line py-24 lg:py-32">
      <Reveal className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <p className="reveal eyebrow mb-5">Families we&rsquo;ve helped</p>
          <h2 className="reveal h-display text-3xl text-cream sm:text-4xl lg:text-5xl">
            What families say after installation.
          </h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="reveal flex flex-col rounded-2xl border border-line bg-ink-raised p-8 transition-all duration-500 hover:-translate-y-1 hover:bg-surface lg:p-10"
            >
              <blockquote className="font-display text-xl leading-relaxed text-cream">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-8 flex items-center justify-between border-t border-line pt-6">
                <div>
                  <p className="text-sm font-semibold text-cream">{t.name}</p>
                  <p className="mt-1 text-xs text-cream-faint">{t.role}</p>
                </div>
                <span className="rounded-full border border-amber/30 px-3 py-1.5 text-xs text-amber">
                  {t.tag}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Why Mason — A complete bathroom-safety solution",
  description:
    "Why families choose Mason: comprehensive, doctor-informed, expert-installed bathroom safety upgrades — one accountable team, end to end.",
};

export default function WhyPage() {
  return (
    <>
      <Nav />
      <main>
        {/* Page hero */}
        <section className="mx-auto max-w-7xl px-6 pt-32 pb-20 lg:px-10 lg:pt-40 lg:pb-28">
          <p className="eyebrow mb-5">Why Mason</p>
          <h1 className="h-display max-w-3xl text-4xl text-cream sm:text-5xl lg:text-6xl">
            A complete solution &mdash; not a pile of products.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream-dim">
            Comprehensive, doctor-informed, expertly installed &mdash; one
            accountable Mason team, from the first assessment to the final
            walkthrough.
          </p>

          <Link
            href="/#book"
            className="mt-9 inline-block rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-accent-hover"
          >
            Book a Safety Visit
          </Link>
        </section>

        {/* TODO: build out the full Why Mason page below (strengths, evidence,
            process, doctor inputs, etc.) — this is the scaffold + route. */}
      </main>
      <Footer />
    </>
  );
}

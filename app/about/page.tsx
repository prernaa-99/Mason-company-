import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Cta from "@/components/Cta";

export const metadata: Metadata = {
  title: "About Us - Mason Company",
  description:
    "Mason Company helps families make bathrooms safer for ageing parents through premium, doctor-informed, expert-installed safety upgrades.",
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main>
        {/* Page hero */}
        <section className="mx-auto max-w-7xl px-6 pt-32 pb-20 lg:px-10 lg:pt-40 lg:pb-28">
          <p className="eyebrow mb-5">About Us</p>
          <h1 className="h-display max-w-3xl text-4xl text-cream sm:text-5xl lg:text-6xl">
            Built for the people you{" "}
            <span className="accent-word">worry</span> about.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream-dim">
            Mason Company helps families make bathrooms safer for ageing parents
            - premium, doctor-informed, expert-installed upgrades that keep
            the home feeling like home.
          </p>

          <Cta href="/#book" className="mt-9">
            Book a Safety Visit
          </Cta>
        </section>

        {/* TODO: build out the full About page below (story, founders,
            mission, doctors, values) — this is the scaffold + route. */}
      </main>
      <Footer />
    </>
  );
}

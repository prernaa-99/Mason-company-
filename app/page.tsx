import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Safer from "@/components/Safer";
import WhyMason from "@/components/WhyMason";
import Transformations from "@/components/Transformations";
import Packages from "@/components/Packages";
import Process from "@/components/Process";
import Doctors from "@/components/Doctors";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Booking from "@/components/Booking";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Stats />
        <Safer />
        <WhyMason />
        <Transformations />
        <Packages />
        <Process />
        <Doctors />
        <Testimonials />
        <FAQ />
        <Booking />
      </main>
      <Footer />
    </>
  );
}

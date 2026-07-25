import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import SafetyMap from "@/components/SafetyMap";
import WhyMason from "@/components/WhyMason";
import Transformations from "@/components/Transformations";
import Packages from "@/components/Packages";
import Process from "@/components/Process";
import Doctors from "@/components/Doctors";
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
        <SafetyMap />
        <WhyMason />
        <Transformations />
        <Packages />
        <Process />
        <Doctors />
        <FAQ />
        <Booking />
      </main>
      <Footer />
    </>
  );
}

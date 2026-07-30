"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Cta from "./Cta";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * The turn. Stats ends on the cost of a fall and this answers it — which is
 * why the headline opens on "But". Sits between Stats and WhyMason: fear,
 * relief, then the rational case. Also the page's first dark break.
 */
export default function Safer() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // set + to, ending in clearProps: a reverted or interrupted .from()
        // strands the lines under their mask and the headline disappears.
        gsap.set(".safer-line", { yPercent: 110 });
        gsap.set(".safer-cta", { y: 28, opacity: 0 });

        gsap
          .timeline({
            defaults: { ease: "power4.out" },
            scrollTrigger: {
              trigger: container.current,
              start: "top 65%",
              once: true,
            },
          })
          .to(".safer-line", {
            yPercent: 0,
            duration: 1,
            stagger: 0.12,
            clearProps: "transform",
          })
          .to(
            ".safer-cta",
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              ease: "power3.out",
              clearProps: "opacity,transform",
            },
            "-=0.35"
          );
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="flex min-h-screen items-center justify-center bg-forest-700 px-6 py-24"
    >
      <div className="mx-auto w-full max-w-6xl text-center">
        <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.12] tracking-tight text-sand-100">
          <span className="block overflow-hidden pb-1">
            <span className="safer-line block">
              But you can make your bathroom{" "}
              <span className="accent-word on-dark">safer</span>
            </span>
          </span>
          <span className="block overflow-hidden pb-1">
            <span className="safer-line block">
              while it still feels like{" "}
              <span className="accent-word on-dark">home</span>
            </span>
          </span>
        </h2>

        <div className="safer-cta mt-12">
          <Cta href="#book" variant="light">
            Book a Safety Visit
          </Cta>
        </div>
      </div>
    </section>
  );
}

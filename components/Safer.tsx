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
    /* Sized by its padding, not by the viewport. This used to be min-h-screen
       from sm up, and the headline and CTA only come to ~245px — so at desktop
       the section held 278px of flat green above the type and 282px below it,
       the emptiest screen on the page, and it got worse the taller the monitor
       was. The colour change is what makes this read as a break; the height was
       never doing that work. The page's one section rhythm is the statement. */
    <section
      ref={container}
      className="flex items-center justify-center bg-forest-700 px-6 py-14 sm:py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-6xl text-center">
        {/* Below sm the clamp bottomed out at 32px, where neither sentence
            fit its line — so "safer" and "home" each dropped onto a line of
            their own and the block zigzagged long-tiny-long-tiny. Those two
            words are the whole point of the headline; stranded and centred
            they read as captions instead of the end of a sentence.

            Same fix as the hero: 7.3vw with a wider measure (-mx-2) and
            tighter tracking, so each sentence holds one line and lands on its
            accent word where it was written to. */}
        <h2 className="font-display text-[7.3vw] font-extrabold leading-[1.12] tracking-tight text-sand-100 max-sm:-mx-2 max-sm:tracking-[-0.045em] sm:text-[clamp(2rem,5vw,3.5rem)]">
          <span className="block overflow-hidden pb-1">
            <span className="safer-line block">
              Make your bathroom{" "}
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
          <Cta
            href="#book"
            variant="light"
            className="w-full justify-center sm:w-auto"
          >
            Book a Safety Visit
          </Cta>
        </div>
      </div>
    </section>
  );
}

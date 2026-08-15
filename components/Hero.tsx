"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Cta from "./Cta";
import { ChevronLeft, ChevronRight } from "./Icon";
import { smoothScroll } from "./SmoothScroll";

/* The full-bleed backdrop. A dark, moody scene so the white headline holds and
   the whole fold reads cinematic rather than clinical. Static — the cards to
   its right are the thing that moves. */
const BACKGROUND = {
  src: "/images/bath-4.jpg",
  alt: "",
};

/* The carousel. Whole bathroom scenes shown as a paged rail that bleeds off the
   right edge, the way the reference does. All local /public stock for now; real
   install photography drops in by swapping these paths. */
const SLIDES = [
  { src: "/images/bath-1.jpg", alt: "Walk-in shower beside a freestanding bath" },
  { src: "/images/bath-2.jpg", alt: "Floating vanity with a vessel basin" },
  { src: "/images/shower-2.jpg", alt: "Walk-in shower with a fold-down seat" },
  { src: "/images/bath-6.jpg", alt: "Wall-hung toilet in a minimal bathroom" },
  { src: "/images/bath-3.jpg", alt: "Grab support beside a walk-in shower" },
  { src: "/images/shower-4.jpg", alt: "Anti-slip shower floor" },
];

/** px of travel before we decide whether a gesture is the rail's or the page's */
const DIRECTION_THRESHOLD = 6;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const animRef = useRef(0);
  const [index, setIndex] = useState(0);
  const drag = useRef({
    down: false,
    locked: false,
    startX: 0,
    startY: 0,
    startScroll: 0,
  });

  useGSAP(
    () => {
      // Reduced motion sets nothing, so every element renders at its CSS value.
      // set + to, never .from(): an interrupted .from() strands the element at
      // opacity 0.
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // A slow push-in on the backdrop — the room coming into focus. The
        // section clips the 1.08 overscale.
        gsap.set(".hero-bg", { scale: 1.08 });
        gsap.to(".hero-bg", { scale: 1, duration: 2.6, ease: "power2.out" });

        gsap.set(".hero-card", { opacity: 0, xPercent: 8 });
        gsap.to(".hero-card", {
          opacity: 1,
          xPercent: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
          delay: 0.25,
          clearProps: "opacity,transform",
        });

        gsap.set(".hero-controls", { opacity: 0, y: 16 });
        gsap.to(".hero-controls", {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.55,
          clearProps: "opacity,transform",
        });
      });
    },
    { scope: ref },
  );

  /** How far apart two card starts sit — the first card's width plus the flex
      gap. Read off the first child rather than a selector so it can't silently
      fall back to a 1px step (the bug where the arrows only nudged). */
  const stride = (el: HTMLDivElement) => {
    const card = el.firstElementChild as HTMLElement | null;
    if (!card) return el.clientWidth * 0.8;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    return card.offsetWidth + gap;
  };

  const onScroll = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const frac = max > 0 ? el.scrollLeft / max : 0;
    if (fillRef.current) fillRef.current.style.transform = `scaleX(${frac})`;
    setIndex(Math.min(SLIDES.length - 1, Math.round(el.scrollLeft / stride(el))));
  }, []);

  // scrollTo({behavior:"smooth"}) is a no-op here — the page's smooth-scroll
  // (Lenis) neutralises native smooth scrolling, so a programmatic smooth scroll
  // on this inner rail does nothing. Writing scrollLeft directly does work, so we
  // tween it ourselves. onScroll fires each frame and keeps the number + line in
  // step.
  const smoothTo = (el: HTMLDivElement, target: number) => {
    cancelAnimationFrame(animRef.current);
    const start = el.scrollLeft;
    const dist = target - start;
    if (Math.abs(dist) < 1) return;
    // rAF is paused while the tab is hidden and pointless under reduced motion —
    // jump straight there so the rail still lands on the right card.
    if (
      document.hidden ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      el.scrollLeft = target;
      return;
    }
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / 450);
      el.scrollLeft = start + dist * (1 - Math.pow(1 - p, 3)); // easeOutCubic
      if (p < 1) animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
  };

  const page = (dir: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const s = stride(el);
    const next = Math.max(
      0,
      Math.min(SLIDES.length - 1, Math.round(el.scrollLeft / s) + dir),
    );
    smoothTo(el, next * s);
  };

  // A gesture belongs to the rail OR the page, never both: watch the first few
  // pixels, decide direction, and only then take it over. Touch is left to the
  // browser, which does momentum and rubber-banding better than a move handler
  // can fake. A mouse has no flick to lose, so click-drag still comes through.
  const onDown = (e: React.PointerEvent) => {
    const el = scrollerRef.current;
    if (!el || e.pointerType === "touch") return;
    drag.current = {
      down: true,
      locked: false,
      startX: e.clientX,
      startY: e.clientY,
      startScroll: el.scrollLeft,
    };
  };

  const onMove = (e: React.PointerEvent) => {
    const el = scrollerRef.current;
    if (!el || !drag.current.down) return;
    const dx = e.clientX - drag.current.startX;
    const dy = e.clientY - drag.current.startY;
    if (!drag.current.locked) {
      if (Math.abs(dx) < DIRECTION_THRESHOLD && Math.abs(dy) < DIRECTION_THRESHOLD) return;
      if (Math.abs(dy) > Math.abs(dx)) {
        drag.current.down = false; // vertical intent — let the page have it
        return;
      }
      drag.current.locked = true;
      el.setPointerCapture(e.pointerId);
      smoothScroll.current?.stop();
    }
    e.preventDefault();
    el.scrollLeft = drag.current.startScroll - dx;
  };

  const onUp = () => {
    if (drag.current.locked) smoothScroll.current?.start();
    drag.current.down = false;
    drag.current.locked = false;
  };

  const total = String(SLIDES.length).padStart(2, "0");

  return (
    <section
      ref={ref}
      id="top"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden text-white"
    >
      {/* full-bleed backdrop + scrim */}
      <div aria-hidden="true" className="hero-bg absolute inset-0 -z-20">
        <Image
          src={BACKGROUND.src}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div
        aria-hidden="true"
        className="hero-cine-scrim pointer-events-none absolute inset-0 -z-10"
      />

      {/* TEXT + CARDS band, vertically centred in the space above the controls */}
      <div className="flex flex-1 items-center pt-24 pb-4 sm:pt-28">
        {/* Even columns + a tight gap + zero rail inset (below) pull the
            carousel well left of centre without touching the headline: max-w-xl
            caps the text, which still gets ~590px of room here, so only the
            cards move. The rail's right edge stays at the screen edge, so the
            bleed survives. */}
        <div className="grid w-full grid-cols-1 items-center gap-y-8 lg:grid-cols-2 lg:gap-x-4">
          {/* LEFT — the text's left edge lines up with every other section's
              content, which sits in an mx-auto max-w-7xl (80rem) px-6/lg:px-10
              container. We can't use that container here without clipping the
              cards' bleed, so we reproduce its left inset directly: the centred
              gutter (100vw-80rem)/2 plus the padding, floored at the padding on
              narrow screens. The cards still run to the opposite edge. */}
          {/* The gutter inset lives on this cell; max-w on the inner block caps
              the text itself — putting both on one element let the padding eat
              into the measure and crushed the headline. */}
          <div className="pr-6 pl-[max(1.5rem,calc((100vw_-_80rem)/2_+_1.5rem))] lg:pr-0 lg:pl-[max(2.5rem,calc((100vw_-_80rem)/2_+_2.5rem))]">
            {/* Centred while the layout is stacked (below lg); left-aligned once
                the split kicks in. */}
            <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
              <p className="flex items-center justify-center gap-3 font-mono-label text-[0.72rem] uppercase tracking-[0.2em] text-white/70 lg:justify-start">
                <span aria-hidden="true" className="hidden h-px w-8 bg-white/40 lg:block" />
                Bathroom safety for ageing parents
              </p>

              {/* Below lg the two sentences flow as one run so text-balance can
                  even out the centred lines — forcing a block per sentence made
                  each wrap on its own and the centred result read as broken. The
                  deliberate two-line split returns at lg, where it's left-aligned. */}
              <h1 className="mt-3 text-balance font-display text-[9vw] font-extrabold leading-[1.05] tracking-[-0.03em] sm:mt-5 sm:text-5xl sm:leading-[1.02] lg:text-6xl xl:text-7xl">
                <span className="lg:block">
                  Most <span className="accent-word on-dark">falls</span> happen here.
                </span>{" "}
                <span className="lg:block">We make sure yours don&rsquo;t.</span>
              </h1>

              <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-white/75 sm:mt-6 lg:mx-0">
                You can&rsquo;t always be there - safety can be. Premium,
                doctor-informed, expertly-installed bathroom safety.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:justify-center sm:items-center lg:justify-start">
                <Cta href="#book" className="w-full justify-center sm:w-auto">
                  Book a Safety Visit
                </Cta>
                <Cta
                  href="#transformations"
                  variant="outlineLight"
                  className="w-full justify-center sm:w-auto"
                >
                  See Transformations
                </Cta>
              </div>
            </div>
          </div>

          {/* RIGHT — the paged rail with the slide number sat directly beneath
              it. No right padding on the rail at lg: its edge is the section's
              edge, so the trailing card is clipped there and bleeds off-screen
              the way the reference does. */}
          <div className="flex min-w-0 flex-col gap-4">
            <div
              ref={scrollerRef}
              onScroll={onScroll}
              onPointerDown={onDown}
              onPointerMove={onMove}
              onPointerUp={onUp}
              onPointerCancel={onUp}
              className="flex cursor-grab touch-auto gap-4 overflow-x-auto overscroll-x-contain px-6 select-none [scrollbar-width:none] active:cursor-grabbing sm:px-10 lg:pr-0 lg:pl-0 [&::-webkit-scrollbar]:hidden"
            >
              {SLIDES.map((s) => (
                <article
                  key={s.src}
                  className="hero-card group relative aspect-[3/4] h-[clamp(190px,26vh,300px)] shrink-0 overflow-hidden rounded-2xl ring-1 ring-white/15 lg:h-[clamp(300px,44vh,460px)]"
                >
                  <Image
                    src={s.src}
                    alt={s.alt}
                    fill
                    draggable={false}
                    sizes="(min-width: 1024px) 300px, 220px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </article>
              ))}
            </div>

            {/* CONTROLS — arrows, progress line and slide number, all sat
                directly below the carousel. Desktop only: on a phone the rail is
                swiped, so the discs and readout just eat vertical room. */}
            <div className="hero-controls hidden items-center gap-5 px-6 sm:gap-8 sm:px-10 lg:flex lg:pr-10 lg:pl-0">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => page(-1)}
                  aria-label="Previous"
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/30 text-white/90 transition-colors duration-150 hover:border-white/60 hover:bg-white/10 disabled:opacity-40"
                  disabled={index === 0}
                >
                  <ChevronLeft />
                </button>
                <button
                  onClick={() => page(1)}
                  aria-label="Next"
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/30 text-white/90 transition-colors duration-150 hover:border-white/60 hover:bg-white/10 disabled:opacity-40"
                  disabled={index >= SLIDES.length - 1}
                >
                  <ChevronRight />
                </button>
              </div>

              {/* the line fills left-to-right with scroll position */}
              <div className="h-px flex-1 overflow-hidden bg-white/20">
                <div
                  ref={fillRef}
                  className="h-full w-full origin-left scale-x-0 bg-white transition-transform duration-100 ease-out"
                />
              </div>

              <p className="flex items-baseline gap-1 font-display font-extrabold leading-none tabular-nums">
                <span className="text-3xl text-white sm:text-4xl">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-sm text-white/50">/ {total}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

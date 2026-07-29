"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { smoothScroll } from "./SmoothScroll";

type Item = { title: string; label: string; img: string };

/** px of travel before we decide whether a gesture is the rail's or the page's */
const DIRECTION_THRESHOLD = 6;

// The twelve items we actually install, names and tags taken verbatim from the
// What We Do section of the masonco build so both sites describe the same kit.
// Photography is ours — that project's whatwedo/ images are abstract background
// washes, not product shots.
const items: Item[] = [
  { title: "PVD-coated vertical grab bars", label: "Grab support", img: "/images/bath-3.jpg" },
  { title: "PVD-coated L / angled grab bar", label: "Grab support", img: "/images/bath-5.jpg" },
  { title: "PVD-coated flip-up / folding bar", label: "Grab support", img: "/images/bath-1.jpg" },
  { title: "Anti-slip solution / coating", label: "Traction", img: "/images/shower-3.jpg" },
  { title: "Premium anti-slip mats", label: "Traction", img: "/images/shower-4.jpg" },
  { title: "Toilet seat / raised seat / commode support", label: "Support", img: "/images/bath-4.jpg" },
  { title: "Shower seating stool", label: "Support", img: "/images/shower-2.jpg" },
  { title: "Sensor lighting unit", label: "Comfort", img: "/images/bath-6.jpg" },
  { title: "Two-way lock", label: "Safety", img: "/images/detail-1.jpg" },
  { title: "8-corner equivalent corner safety", label: "Protection", img: "/images/bath-2.jpg" },
  { title: "Drainage solutions", label: "Hygiene", img: "/images/shower-1.jpg" },
  { title: "Bathroom slippers", label: "Comfort", img: "/images/care-1.jpg" },
];

export default function ProductRail() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const drag = useRef({
    down: false,
    locked: false,
    startX: 0,
    startY: 0,
    startScroll: 0,
  });

  useGSAP(() => {
    gsap.from(".rail-card", {
      opacity: 0,
      y: 36,
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.06,
      delay: 0.45,
    });
  });

  const updateBar = () => {
    const el = scrollerRef.current;
    const bar = barRef.current;
    if (!el || !bar) return;
    const max = el.scrollWidth - el.clientWidth;
    bar.style.transform = `translateX(${(max > 0 ? el.scrollLeft / max : 0) * 300}%)`;
  };

  const page = (dir: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  // A gesture belongs to the rail OR to the page, never both. We watch the first
  // few pixels, decide which way it's going, and only then take it over — a
  // drag that starts vertical is handed straight back so the page scrolls.
  const onDown = (e: React.PointerEvent) => {
    const el = scrollerRef.current;
    if (!el) return;
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
      // stop the page mid-flight, or Lenis keeps easing while we drag sideways
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

  return (
    <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
      <div className="relative">
        <div
          ref={scrollerRef}
          onScroll={updateBar}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          /* overscroll-x-contain: hitting either end must not chain the scroll
             up to the page. touch-pan-y: on touch the browser only ever owns the
             vertical axis; horizontal is ours. */
          className="flex cursor-grab gap-4 overflow-x-auto overscroll-x-contain pb-1 touch-pan-y [scrollbar-width:none] select-none active:cursor-grabbing [scroll-snap-type:x_proximity] [&::-webkit-scrollbar]:hidden"
        >
        {items.map((it) => (
          <article
            key={it.title}
            className="rail-card group relative aspect-[3/4] h-[clamp(200px,35vh,370px)] shrink-0 overflow-hidden rounded-xl [scroll-snap-align:start]"
          >
            <Image
              src={it.img}
              alt={it.title}
              fill
              draggable={false}
              sizes="260px"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* bottom scrim — dark ramp; keeps the photograph readable under the label */}
            <div className="photo-scrim absolute inset-0" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <span className="font-mono-label text-[0.65rem] uppercase tracking-[0.18em] text-white/70">
                {it.label}
              </span>
              <h3 className="mt-1 font-display text-lg font-semibold leading-tight text-white">
                {it.title}
              </h3>
            </div>
          </article>
        ))}
        </div>

        {/* arrows overlaid on the card edges, vertically centred */}
        <button
          onClick={() => page(-1)}
          aria-label="Previous"
          className="absolute left-2 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-line-strong bg-ink/60 text-cream-dim backdrop-blur-sm transition-colors duration-150 hover:bg-ink/85 lg:left-4"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          onClick={() => page(1)}
          aria-label="Next"
          className="absolute right-2 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-line-strong bg-ink/60 text-cream-dim backdrop-blur-sm transition-colors duration-150 hover:bg-ink/85 lg:right-4"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* progress bar centred below */}
      <div className="mx-auto mt-6 h-[3px] w-40 overflow-hidden rounded-full bg-line">
        <div
          ref={barRef}
          className="h-full w-1/3 rounded-full bg-cream-dim transition-transform duration-100 ease-out"
        />
      </div>
    </div>
  );
}

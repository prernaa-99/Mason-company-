"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

type Item = { title: string; label: string; img: string };

const items: Item[] = [
  { title: "Grab & support bars", label: "Support", img: "/images/bath-3.jpg" },
  { title: "Anti-slip wet zones", label: "Grip", img: "/images/shower-3.jpg" },
  { title: "Toilet & transfer support", label: "Balance", img: "/images/bath-4.jpg" },
  { title: "Sensor night lighting", label: "Visibility", img: "/images/bath-6.jpg" },
  { title: "Shower seating", label: "Comfort", img: "/images/shower-2.jpg" },
  { title: "Corner & edge protection", label: "Protection", img: "/images/detail-1.jpg" },
  { title: "Two-way safety lock", label: "Security", img: "/images/bath-1.jpg" },
  { title: "Anti-slip mats", label: "Traction", img: "/images/shower-4.jpg" },
  { title: "Home-first finishes", label: "Dignity", img: "/images/bath-2.jpg" },
];

export default function ProductRail() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, startX: 0, startScroll: 0 });

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

  const onDown = (e: React.PointerEvent) => {
    const el = scrollerRef.current;
    if (!el) return;
    drag.current = { down: true, startX: e.clientX, startScroll: el.scrollLeft };
    el.setPointerCapture(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    const el = scrollerRef.current;
    if (!el || !drag.current.down) return;
    el.scrollLeft = drag.current.startScroll - (e.clientX - drag.current.startX);
  };
  const onUp = () => (drag.current.down = false);

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
          className="flex cursor-grab gap-4 overflow-x-auto pb-1 [scrollbar-width:none] select-none active:cursor-grabbing [scroll-snap-type:x_proximity] [&::-webkit-scrollbar]:hidden"
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

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
      stagger: 0.07,
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
    <div className="w-full">
      <div
        ref={scrollerRef}
        onScroll={updateBar}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        className="flex cursor-grab overflow-x-auto pb-1 [scrollbar-width:none] select-none active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
      >
        <div className="mx-auto flex w-max gap-4 px-6 lg:px-10">
        {items.map((it) => (
          <article
            key={it.title}
            className="rail-card group relative aspect-[3/4] h-[clamp(200px,35vh,370px)] shrink-0 overflow-hidden rounded-xl"
          >
            <Image
              src={it.img}
              alt={it.title}
              fill
              draggable={false}
              sizes="260px"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* bottom scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-clay">
                {it.label}
              </span>
              <h3 className="mt-1 font-display text-lg font-semibold leading-tight text-cream">
                {it.title}
              </h3>
            </div>
          </article>
        ))}
        </div>
      </div>

      {/* progress bar */}
      <div className="mx-auto mt-6 h-[3px] w-44 overflow-hidden rounded-full bg-line">
        <div
          ref={barRef}
          className="h-full w-1/3 rounded-full bg-clay transition-transform duration-100 ease-out"
        />
      </div>
    </div>
  );
}

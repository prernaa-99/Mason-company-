"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import Reveal from "./Reveal";

const gallery = [
  { img: "/images/bath-2.jpg", label: "Guest bathroom · Delhi" },
  { img: "/images/shower-2.jpg", label: "Walk-in shower · Gurgaon" },
  { img: "/images/bath-4.jpg", label: "Master bathroom · Mumbai" },
];

function BeforeAfter() {
  const [pos, setPos] = useState(52);
  const [cursor, setCursor] = useState({ x: 0, y: 0, show: false });
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const move = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  };

  const track = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top, show: true });
  };

  return (
    <div
      ref={ref}
      onPointerDown={(e) => {
        dragging.current = true;
        el(e).setPointerCapture(e.pointerId);
        move(e.clientX);
      }}
      onPointerMove={(e) => {
        track(e);
        if (dragging.current) move(e.clientX);
      }}
      onPointerEnter={track}
      onPointerLeave={() => setCursor((c) => ({ ...c, show: false }))}
      onPointerUp={() => (dragging.current = false)}
      className="relative aspect-[16/10] w-full cursor-ew-resize select-none overflow-hidden rounded-2xl border border-line lg:aspect-auto lg:h-full lg:cursor-none"
    >
      {/* custom drag cursor (desktop) */}
      <div
        className="pointer-events-none absolute z-30 hidden -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200 lg:block"
        style={{ left: cursor.x, top: cursor.y, opacity: cursor.show ? 1 : 0 }}
      >
        <span className="flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-white shadow-lg">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 7l-4 5 4 5M15 7l4 5-4 5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Drag
        </span>
      </div>
      {/* after (color) */}
      <Image
        src="/images/bath-1.jpg"
        alt="After the Mason safety upgrade"
        fill
        draggable={false}
        sizes="(max-width: 1024px) 100vw, 66vw"
        className="object-cover"
        priority
      />
      <span className="absolute bottom-4 right-4 z-10 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-on-accent">
        After
      </span>

      {/* before (grayscale), clipped via clip-path so the image never squashes */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <Image
          src="/images/bath-1.jpg"
          alt="Before the Mason safety upgrade"
          fill
          draggable={false}
          sizes="(max-width: 1024px) 100vw, 66vw"
          className="object-cover grayscale brightness-[0.7]"
        />
        <span className="absolute bottom-4 left-4 rounded-full border border-line bg-surface-2 px-3 py-1 text-xs font-semibold text-cream">
          Before
        </span>
      </div>

      {/* handle */}
      <div
        className="absolute inset-y-0 z-10 flex w-0 items-center justify-center"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute inset-y-0 w-px bg-white/85" />
        <div className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white/95 shadow-sm backdrop-blur">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 7l-4 5 4 5M15 7l4 5-4 5"
              stroke="#1a1a18"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

// tiny helper to keep the pointer-capture call tidy
function el(e: React.PointerEvent) {
  return e.currentTarget as HTMLElement;
}

export default function Transformations() {
  return (
    <section
      id="transformations"
      className="border-t border-line bg-sand-100 py-24 lg:h-screen lg:overflow-hidden lg:py-0"
    >
      <Reveal className="mx-auto flex h-full max-w-7xl flex-col px-6 lg:px-10 lg:pb-12 lg:pt-28">
        <div className="max-w-2xl">
          <p className="reveal eyebrow mb-5">Transformations</p>
          <h2 className="reveal h-display text-3xl text-cream sm:text-4xl lg:text-5xl">
            A <span className="accent-word">reassurance</span>. Not a
            renovation.
          </h2>
          <p className="reveal mt-6 text-lg leading-relaxed text-cream-dim">
            We make bathrooms safer through thoughtful additions &mdash; grip,
            balance, comfort, ease. Drag to see the difference.
          </p>
        </div>

        <div className="reveal mt-14 grid gap-6 lg:mt-10 lg:min-h-0 lg:flex-1 lg:grid-cols-[2fr_1fr]">
          <BeforeAfter />

          <div className="grid gap-6">
            {gallery.map((g) => (
              <figure
                key={g.label}
                className="group relative flex-1 overflow-hidden rounded-2xl border border-line"
              >
                <div className="relative aspect-[16/10] lg:aspect-auto lg:h-full">
                  <Image
                    src={g.img}
                    alt={g.label}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent" />
                  <figcaption className="absolute bottom-4 left-4 text-sm font-semibold text-cream">
                    {g.label}
                  </figcaption>
                </div>
              </figure>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

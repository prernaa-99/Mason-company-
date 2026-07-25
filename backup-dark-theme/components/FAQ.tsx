"use client";

import { useState } from "react";
import Reveal from "./Reveal";

const faqs = [
  {
    q: "What does Mason Company do?",
    a: "We upgrade existing bathrooms with safety components such as grab bars, anti-slip solutions, support accessories, lighting, drainage support, corner protection, and senior-friendly additions.",
  },
  {
    q: "Do you renovate the entire bathroom?",
    a: "No. Mason focuses on safety upgrades to the existing bathroom. Most installations do not require a major renovation.",
  },
  {
    q: "Will the bathroom look clinical?",
    a: "No. Our solution is designed to feel premium and home-first. The goal is to improve safety while preserving the comfort and dignity of the space.",
  },
  {
    q: "How does booking work?",
    a: "Choose a package online, proceed to payment, request a callback, or speak with our team for assisted booking. We then schedule an inspection before installation.",
  },
  {
    q: "Do you inspect the bathroom before installation?",
    a: "Yes. Depending on location and logistics, Mason completes a virtual or physical inspection before installation.",
  },
  {
    q: "Can I cancel after booking?",
    a: "Yes. If you cancel before the technician arrives or starts implementation, you are eligible for a full refund.",
  },
  {
    q: "Does this guarantee that no fall will happen?",
    a: "No service can guarantee a fall-free outcome. Mason focuses on preventive bathroom safety upgrades that support safer daily movement.",
  },
];

function Row({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`reveal border-t border-line px-4 transition-colors duration-150 ${
        open ? "bg-ink-raised" : ""
      }`}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-6 py-6 text-left"
      >
        <span className="font-display text-lg font-semibold text-cream sm:text-xl">
          {q}
        </span>
        <span
          className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line-strong text-cream-dim transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 5v14M5 12h14"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </button>
      <div
        className="grid transition-all duration-400 ease-out"
        style={{
          gridTemplateRows: open ? "1fr" : "0fr",
          opacity: open ? 1 : 0,
        }}
      >
        <div className="overflow-hidden">
          <p className="max-w-2xl pb-6 text-sm leading-relaxed text-cream-dim">
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="border-t border-line py-24 lg:py-32">
      <Reveal className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-10">
        <div>
          <p className="reveal eyebrow mb-5">FAQ</p>
          <h2 className="reveal h-display text-3xl text-cream sm:text-4xl lg:text-5xl">
            Clear answers before you book.
          </h2>
          <p className="reveal mt-6 max-w-sm text-base leading-relaxed text-cream-dim">
            Still unsure? Speak with our team &mdash; we&rsquo;ll guide you
            through the right upgrade for your family.
          </p>
        </div>

        <div className="mt-4 lg:mt-0 lg:pt-1 [&>*:first-child]:border-t-0">
          {faqs.map((f) => (
            <Row key={f.q} {...f} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}

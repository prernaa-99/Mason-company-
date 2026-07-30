"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const FAQS = [
  {
    q: "What does Mason Company do?",
    a: "Mason Company upgrades existing bathrooms with safety components such as grab bars, anti-slip solutions, support accessories, lighting, drainage support, corner protection, and package-specific senior-friendly additions.",
  },
  {
    q: "Who is Mason Company for?",
    a: "Mason is designed for families with ageing parents, seniors living independently, people with balance concerns, and households that want to reduce bathroom risk before an incident happens.",
  },
  {
    q: "Do you renovate the entire bathroom?",
    a: "No. Mason focuses on safety upgrades to the existing bathroom. Most installations do not require a major renovation.",
  },
  {
    q: "Will the bathroom look clinical?",
    a: "No. Mason’s solution is designed to feel premium and home-first. The goal is to improve safety while preserving the comfort and dignity of the space.",
  },
  {
    q: "What packages do you offer?",
    a: "Mason currently offers two packages: Standard and Advanced. Both install exactly the same complete kit. Advanced adds a safety check-up visit a year after installation.",
  },
  {
    q: "What is included in Standard?",
    a: "The complete kit — 12 upgrades in all: PVD-coated grab bars, anti-slip coating and mats, toilet / raised-seat / commode support, shower seating, sensor lighting, a two-way lock, corner safety, drainage solutions, and bathroom slippers.",
  },
  {
    q: "What is included in Advanced?",
    a: "Exactly the same 12 upgrades as Standard — nothing is held back. Advanced adds a one-year safety check-up visit, where we return to inspect the fittings and tighten or replace anything that has worn.",
  },
  {
    q: "Can I buy only one product, like a grab bar?",
    a: "Mason is designed as a package-first service. We focus on complete bathroom safety coverage rather than isolated product installation.",
  },
  {
    q: "How does booking work?",
    a: "You can choose a package online, proceed to payment, request a callback, or speak with our team for assisted booking.",
  },
  {
    q: "How can I pay?",
    a: "You can pay through the website, or our team can share a secure payment link after your call.",
  },
  {
    q: "Can I cancel after booking?",
    a: "Yes. If you cancel before the technician arrives or starts implementation, you are eligible for a full refund.",
  },
  {
    q: "Do you inspect the bathroom before installation?",
    a: "Yes. Depending on location and logistics, Mason may complete a virtual or physical inspection before installation.",
  },
  {
    q: "Who installs the package?",
    a: "Mason-trained technicians handle the installation, site verification, fitting, and final handover.",
  },
];

function Item({
  q,
  a,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-sand-200">
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 py-3.5 text-left"
      >
        <span className="font-display text-base font-bold text-cream sm:text-lg">
          {q}
        </span>
        <span
          className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border border-sand-200 text-forest-700 transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
          aria-hidden="true"
        >
          <svg viewBox="0 0 14 14" className="h-3 w-3" fill="none">
            <path
              d="M7 1v12M1 7h12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </button>
      <div
        className="grid transition-all duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="max-w-2xl pb-4 pr-10 text-[15px] leading-relaxed text-sand-600">
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const container = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // set + to, not .from() with immediateRender:false — that leaves the
        // content sitting in place and then snaps it to the start state the
        // instant the trigger fires, which reads as a jolt as the section
        // arrives. Hiding it up front and animating in avoids the jump;
        // clearProps means nothing is stranded if the tween is interrupted.
        gsap.set(".faq-reveal", { y: 30, opacity: 0 });
        gsap.to(".faq-reveal", {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          clearProps: "opacity,transform",
          scrollTrigger: {
            trigger: container.current,
            start: "top 70%",
            once: true,
          },
        });
      });
    },
    { scope: container }
  );

  return (
    <section
      id="faq"
      ref={container}
      className="flex min-h-screen flex-col justify-center overflow-hidden bg-sand-100 px-6 py-16 sm:px-10 lg:px-16"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        {/* Header */}
        <div className="faq-reveal lg:pt-2">
          <span className="block font-sans text-sm font-bold uppercase tracking-[0.35em] text-forest-700">
            FAQ
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-cream sm:text-4xl lg:text-5xl">
            Questions,{" "}
            <span className="font-serif font-normal italic text-forest-700">
              answered
            </span>
          </h2>
          <p className="mt-4 max-w-sm text-base leading-relaxed text-sand-600">
            Everything about packages, booking, and installation. Still unsure?
            Book a free visit and we&rsquo;ll talk it through.
          </p>
        </div>

        {/* Accordion */}
        <div className="faq-reveal">
          {FAQS.map((item, i) => (
            <Item
              key={item.q}
              q={item.q}
              a={item.a}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

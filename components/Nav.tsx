"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MasonWordmark } from "./Logo";
import Cta from "./Cta";
import { Call } from "./Icon";
import { PHONE_DISPLAY, PHONE_HREF } from "./contact-details";

const links = [
  { label: "Home", href: "/" },
  { label: "Packages", href: "/packages" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let queued = false;
    const onScroll = () => {
      // Read scrollY inside rAF rather than in the listener: scroll fires far
      // more often than the screen repaints, and reading layout there is what
      // makes a collapsing bar stutter.
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        // Hysteresis — collapse past 48, expand only back under 12. A single
        // threshold means a page parked right on it flutters between the two
        // states on the smallest movement, and a half-finished 500ms
        // transition reversing is the least smooth thing the bar can do.
        setScrolled((isCollapsed) => (isCollapsed ? y > 12 : y > 48));
        queued = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* One curve for every part of the collapse, so the bar, its inset and the
     wordmark arrive together instead of drifting apart. Slow out, no
     overshoot. */
  const EASE = "duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]";

  return (
    /* Full-bleed bar sitting on the viewport edge — not an inset pill.
       Named properties, never transition-all: all would animate whatever else
       happened to change, where each of these is something the collapse
       actually touches. */
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] ${EASE} ${
        scrolled
          ? "border-b border-line bg-ink/85 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      {/* The collapse is the bar's height only. Narrowing the measure as well
          would pull the wordmark and CTA inward while the bar around them
          stayed full width, which reads as the content sliding rather than the
          bar shrinking. */}
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between px-6 transition-[padding] lg:px-10 ${EASE} ${
          scrolled ? "py-2.5" : "py-4"
        }`}
      >
        {/* Wordmark and links are one group, left. Centring the links looked
            crowded for a reason that centring cannot fix: the right side is a
            number plus a CTA, roughly 390px, against a 110px wordmark, so a
            truly centred middle leaves ~60px before the phone and pools ~360px
            of nothing on the left. Weighting both ends instead puts the empty
            space in the middle, where it reads as air rather than a gap. */}
        <div className="flex items-center gap-10 lg:gap-12">
          <Link
            href="/"
            aria-label="Mason Company - home"
            /* origin-left so the collapse pulls the mark toward the gutter
               rather than shrinking it about its own middle */
            className={`text-cream transition-[color,transform] hover:text-accent ${EASE} ${
              scrolled ? "origin-left scale-[0.92]" : "origin-left scale-100"
            }`}
          >
            <MasonWordmark size={20} />
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-cream-dim transition-colors hover:text-cream"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Number then rule then CTA. The two are a pair — call now, or book a
            visit — and the hairline groups them without adding a second button
            competing with the one that matters.

            It earns its place by changing shape rather than disappearing: full
            number from lg, where there is room beside four nav links; below
            that a tappable disc, which is the size it wants to be on a phone
            anyway. Nowhere does it vanish, which was the point of the ask. */}
        <div className="flex items-center gap-3 lg:gap-5">
          <a
            href={PHONE_HREF}
            aria-label={`Call Mason Company on ${PHONE_DISPLAY}`}
            className="hidden items-center gap-2 text-sm text-cream-dim transition-colors duration-200 hover:text-cream lg:flex"
          >
            <Call size={16} className="text-accent" />
            {/* tabular-nums so the digits sit on an even rhythm rather than
                the proportional spacing the UI face gives them */}
            <span className="tabular-nums">{PHONE_DISPLAY}</span>
          </a>

          <span
            aria-hidden="true"
            className="hidden h-5 w-px bg-line-strong lg:block"
          />

          <a
            href={PHONE_HREF}
            aria-label={`Call Mason Company on ${PHONE_DISPLAY}`}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line text-cream transition-colors duration-200 hover:border-line-strong hover:text-accent lg:hidden"
          >
            <Call size={17} />
          </a>

          <Cta href="/#book" size="compact">
            Book a Safety Visit
          </Cta>
        </div>
      </nav>
    </header>
  );
}

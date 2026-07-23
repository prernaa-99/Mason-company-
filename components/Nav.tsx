"use client";

import { useEffect, useState } from "react";

const links = [
  { label: "Why Mason", href: "#why" },
  { label: "Transformations", href: "#transformations" },
  { label: "Packages", href: "#packages" },
  { label: "Process", href: "#process" },
  { label: "Doctors", href: "#doctors" },
  { label: "FAQ", href: "#faq" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-line bg-ink/85 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <a href="#top" className="font-display text-lg font-bold tracking-tight text-cream">
          Mason<span className="text-clay">.</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-cream-dim transition-colors hover:text-cream"
            >
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="#book"
          className="rounded-full bg-cream px-5 py-2.5 text-sm font-semibold text-ink transition-colors duration-300 hover:bg-bone-dim"
        >
          Book a Safety Visit
        </a>
      </nav>
    </header>
  );
}

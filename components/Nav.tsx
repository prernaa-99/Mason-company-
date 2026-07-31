"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MasonWordmark } from "./Logo";
import Cta from "./Cta";

const links = [
  { label: "Home", href: "/" },
  { label: "Why Mason", href: "/why" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
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
        <Link
          href="/"
          aria-label="Mason Company - home"
          className="text-cream transition-colors duration-300 hover:text-accent"
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

        <Cta href="/#book" size="compact">
          Book a Safety Visit
        </Cta>
      </nav>
    </header>
  );
}

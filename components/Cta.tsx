import Link from "next/link";

/* The one CTA on the site. Every call-to-action goes through this so heights,
   type size and the hover-slide arrow can't drift apart again.

   Sizes are contextual, not decorative:
     default — section-level CTAs
     compact — the nav, which lives in a fixed-height bar
     block   — inside a card, where the button spans the column

   Variants ending in "Light" sit on the dark green / near-black surfaces. */

type Variant = "solid" | "outline" | "light" | "outlineLight";
type Size = "default" | "compact" | "block";

const VARIANTS: Record<Variant, string> = {
  solid: "bg-accent text-on-accent hover:bg-accent-hover",
  outline: "border border-line text-cream hover:border-line-strong",
  light: "bg-sand-100 text-cream hover:bg-white",
  outlineLight: "border border-white/35 text-white hover:border-white/70",
};

const SIZES: Record<Size, string> = {
  default: "px-8 py-4 text-base",
  compact: "px-6 py-3 text-sm",
  block: "w-full justify-center px-4 py-3 text-sm sm:text-base",
};

export default function Cta({
  href,
  children,
  variant = "solid",
  size = "default",
  arrow = true,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  /** Off only where the arrow would read as decoration rather than direction. */
  arrow?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      /* Not transition-all: this element may sit inside a GSAP timeline, and
         transitioning every property fights whatever GSAP writes each frame.
         Tailwind's translate utilities use the `translate` property, which is
         separate from the `transform` GSAP animates, so the lift is safe. */
      className={`group inline-flex items-center gap-2.5 rounded-full font-semibold transition-[background-color,border-color,color,translate] duration-150 hover:-translate-y-0.5 ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
    >
      {children}
      {arrow && (
        <span
          aria-hidden="true"
          className="transition-transform duration-200 group-hover:translate-x-1"
        >
          &rarr;
        </span>
      )}
    </Link>
  );
}

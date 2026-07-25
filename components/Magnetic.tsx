"use client";

import { useRef } from "react";

/**
 * Wraps a single interactive child (e.g. a CTA) and gently pulls it toward the
 * cursor while hovered, easing back on leave. Disabled on touch devices.
 */
export default function Magnetic({
  children,
  strength = 0.35,
}: {
  children: React.ReactNode;
  strength?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = "translate(0px, 0px)";
  };

  return (
    <span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className="inline-block transition-transform duration-300 ease-out will-change-transform [@media(hover:none)]:!transform-none"
    >
      {children}
    </span>
  );
}

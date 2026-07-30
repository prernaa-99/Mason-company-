/* Material Symbols, inlined as paths rather than pulled in as an icon font.
   One arrow does not justify a webfont download, and inline SVG takes
   currentColor and scales with the surrounding type. Paths are the official
   Material geometry (24px grid) — add more here as they are needed. */

type IconProps = {
  /** Rendered size in px. Defaults to the CTA arrow size. */
  size?: number;
  className?: string;
};

export function ArrowForward({ size = 18, className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
    </svg>
  );
}

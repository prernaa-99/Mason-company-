/* Where Mason actually installs today. Shown in both the contact form and the
   booking dialog, so it lives in one file - as cities are added, this is the
   only place that changes.

   The copy deliberately does not turn anyone away. Someone outside the two
   cities is still a lead worth having, so the line ends with a reason to
   submit the form rather than close it.

   Set a step ahead of the surrounding fine print: sand-600 rather than
   sand-400, and the cities themselves in full-contrast semibold. It is real
   information, not boilerplate. In the dialog it sits under the location
   field, which is the question it answers. */

export const CITIES = "Bengaluru and Goa";

export default function ServiceArea({
  className = "",
}: {
  className?: string;
}) {
  return (
    <p className={`text-sm leading-relaxed text-sand-600 ${className}`}>
      <span className="font-semibold text-cream">
        Mason is currently available in Goa.
      </span>
    </p>
  );
}

"use client";

import { useState } from "react";
import { ctaClass } from "./Cta";
import { EMAIL, submitBooking, toTenDigits } from "./BookingDialog";
import LocationField from "./LocationField";

/* The booking form, in the page rather than over it.

   Same request as the dialog — it calls the same submitBooking — but reached
   without a click, which is the whole point of putting it in the Safer strip.
   The dialog stays: every other CTA on the site still opens it, and a sheet is
   the right shape for a form you asked for.

   Layout is this file's own, not a variant flag on the dialog's. The dialog is
   a scrolling column with a pinned submit under a cap of 88svh; this is a card
   that is exactly as tall as its fields. Those two have no shared markup worth
   the prop it would take to switch between them — what must not drift is the
   validation, and that is why EMAIL and toTenDigits come from one place. */

type Field = "name" | "mobile" | "email";
type Errors = Partial<Record<Field, string>>;

type Values = Record<Field, string>;

const EMPTY: Values = { name: "", mobile: "", email: "" };

function validate(v: Values): Errors {
  const errors: Errors = {};
  if (v.name.trim().length < 2) errors.name = "Please enter your full name.";
  if (v.mobile.length !== 10) errors.mobile = "Enter a 10-digit mobile number.";
  if (!EMAIL.test(v.email.trim())) errors.email = "Enter a valid email address.";
  return errors;
}

const LABEL = "block text-sm font-semibold text-cream";
/* White fields on a sand-50 card — the dialog's elevation ladder exactly,
   because this card is the dialog's surface set down on the green. */
const FIELD =
  "mt-2 w-full rounded-xl border bg-white px-4 py-3 text-base text-cream transition-colors duration-150";
const INPUT = `${FIELD} placeholder:text-sand-400 focus:outline-none`;
/* The mobile field wraps a static +91, so its active state comes from the
   container (focus-within) rather than the input itself. */
const GROUP = `${FIELD} flex items-center gap-2.5`;

/* Reserved under every field so the card doesn't grow on the first submit —
   on a green strip that would shunt the headline beside it out of line. */
const ERROR = "mt-1.5 min-h-4 text-xs leading-4 text-brick";

export default function VisitForm() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const [location, setLocation] = useState<string | null>(null);
  /* Bumped on reset to remount LocationField, which owns its own capture
     state — clearing the label here is only half of it. */
  const [locKey, setLocKey] = useState(0);

  // Nothing is flagged until the first submit attempt — validating on blur
  // scolds people for fields they have simply not finished yet. Derived rather
  // than stored, so once errors ARE showing they clear live as you fix them.
  const errors: Errors = submitted ? validate(values) : {};

  const set = (key: Field, value: string) =>
    setValues((v) => ({ ...v, [key]: value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (Object.keys(validate(values)).length > 0) return;

    setBusy(true);
    try {
      await submitBooking({
        name: values.name,
        mobile: `+91${values.mobile}`,
        email: values.email,
        location,
      });
      setDone(true);
    } finally {
      setBusy(false);
    }
  };

  /* Active state is the border itself going green — same 1px stroke as at
     rest, so nothing thickens or shifts. The global 2px offset outline is
     suppressed for form fields in globals.css. */
  const border = (field: Field) =>
    errors[field] ? "border-brick" : "border-sand-200 focus:border-forest-700";

  const groupBorder = (field: Field) =>
    errors[field]
      ? "border-brick"
      : "border-sand-200 focus-within:border-forest-700";

  const describedBy = (field: Field) =>
    errors[field] ? `visit-${field}-error` : undefined;

  return (
    /* One shell for both states, stacked in the same grid cell — the form stays
       mounted and merely invisible once sent, so the card keeps its height and
       the green strip doesn't jump. Hidden visibility also drops the fields out
       of the tab order and the accessibility tree. */
    <div className="grid rounded-3xl bg-sand-50 p-6 sm:p-8">
      <form
        onSubmit={onSubmit}
        noValidate
        className={`col-start-1 row-start-1 ${done ? "invisible" : ""}`}
      >
        <div>
          <label htmlFor="visit-name" className={LABEL}>
            Full name
            <span aria-hidden="true" className="text-brick">
              *
            </span>
          </label>
          <input
            id="visit-name"
            name="name"
            autoComplete="name"
            required
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={describedBy("name")}
            placeholder="Priya Sharma"
            className={`${INPUT} ${border("name")}`}
          />
          <p id="visit-name-error" aria-live="polite" className={ERROR}>
            {errors.name}
          </p>
        </div>

        <div className="mt-3">
          <label htmlFor="visit-mobile" className={LABEL}>
            Mobile number
            <span aria-hidden="true" className="text-brick">
              *
            </span>
          </label>
          <div className={`${GROUP} ${groupBorder("mobile")}`}>
            <span
              aria-hidden="true"
              className="shrink-0 select-none text-base text-sand-600"
            >
              +91
            </span>
            <span aria-hidden="true" className="h-5 w-px bg-sand-200" />
            <input
              id="visit-mobile"
              name="mobile"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              required
              value={values.mobile}
              onChange={(e) => set("mobile", toTenDigits(e.target.value))}
              aria-invalid={!!errors.mobile}
              aria-describedby={describedBy("mobile")}
              placeholder="98765 43210"
              className="w-full bg-transparent text-base text-cream placeholder:text-sand-400 focus:outline-none"
            />
          </div>
          <p id="visit-mobile-error" aria-live="polite" className={ERROR}>
            {errors.mobile}
          </p>
        </div>

        <div className="mt-3">
          <label htmlFor="visit-email" className={LABEL}>
            Email address
            <span aria-hidden="true" className="text-brick">
              *
            </span>
          </label>
          <input
            id="visit-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={describedBy("email")}
            placeholder="priya@example.com"
            className={`${INPUT} ${border("email")}`}
          />
          <p id="visit-email-error" aria-live="polite" className={ERROR}>
            {errors.email}
          </p>
        </div>

        {/* Location — optional, and it brings the service-area line with it. */}
        <LocationField key={locKey} onChange={setLocation} className="mt-3" />

        <button
          type="submit"
          disabled={busy}
          className={`${ctaClass({ size: "block" })} mt-5 disabled:opacity-70`}
        >
          {busy ? "Sending…" : "Request my visit"}
        </button>
      </form>

      {done && (
        <div className="col-start-1 row-start-1 grid place-content-center text-center">
          <h3 className="h-display text-3xl text-cream">
            We&rsquo;ll be in <span className="accent-word">touch</span>.
          </h3>
          <p className="mx-auto mt-4 max-w-xs text-sm leading-relaxed text-sand-600">
            Thanks {values.name.trim().split(" ")[0]} - our team will call you
            on{" "}
            {/* nowrap so the number never splits across two lines */}
            <span className="whitespace-nowrap font-semibold text-cream">
              +91 {values.mobile}
            </span>{" "}
            to arrange the visit.
          </p>
          <div className="mt-7 flex justify-center">
            <button
              type="button"
              onClick={() => {
                setValues(EMPTY);
                setSubmitted(false);
                setLocation(null);
                setLocKey((k) => k + 1);
                setDone(false);
              }}
              className={ctaClass({ variant: "outline" })}
            >
              Book another visit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

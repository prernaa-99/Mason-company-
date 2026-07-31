"use client";

import { useState } from "react";
import { ctaClass } from "./Cta";
import { ArrowForward } from "./Icon";
import { EMAIL, toTenDigits } from "./BookingDialog";

/* ===========================================================================
   INTEGRATION POINT — the only place that talks to anything external.
   Same situation as the booking dialog: no endpoint exists yet, so nothing
   leaves the browser. Wire this up.
   =========================================================================== */

export type ContactValues = {
  name: string;
  /** already in +91XXXXXXXXXX form */
  mobile: string;
  email: string;
  /** "" when the customer skipped it */
  packageInterest: string;
  /** ISO yyyy-mm-dd, or "" */
  preferredDate: string;
  city: string;
  message: string;
};

async function submitEnquiry(values: ContactValues): Promise<void> {
  console.info("[contact] submit", values);
}

/* ========================================================================= */

type Values = {
  name: string;
  mobile: string;
  email: string;
  packageInterest: string;
  preferredDate: string;
  city: string;
  message: string;
};

const EMPTY: Values = {
  name: "",
  mobile: "",
  email: "",
  packageInterest: "",
  preferredDate: "",
  city: "",
  message: "",
};

/* Only these three block submission. Everything else is a nice-to-have, and
   asking for a date or a package before someone has spoken to us is the
   fastest way to lose the enquiry. */
type Required = "name" | "mobile" | "email";
type Errors = Partial<Record<Required, string>>;

function validate(v: Values): Errors {
  const errors: Errors = {};
  if (v.name.trim().length < 2) errors.name = "Please enter your full name.";
  if (v.mobile.length !== 10) errors.mobile = "Enter a 10-digit mobile number.";
  if (!EMAIL.test(v.email.trim())) errors.email = "Enter a valid email address.";
  return errors;
}

const LABEL = "block text-sm font-semibold text-cream";
const OPTIONAL = "ml-1.5 text-xs font-normal text-sand-400";

/* The card is white, so fields go one step DOWN the elevation ladder into
   sand-100 — the inverse of the booking dialog, where a sand-50 dialog holds
   white fields. Either way the field reads as recessed. */
const FIELD =
  "mt-2 w-full rounded-xl border bg-sand-100 px-4 py-3 text-base text-cream transition-colors duration-150";
const INPUT = `${FIELD} placeholder:text-sand-400 focus:outline-none`;
/* The mobile field wraps a static +91, so its active state comes from the
   container (focus-within) rather than the input itself. */
const GROUP = `${FIELD} flex items-center gap-2.5`;

/* Reserved under EVERY field, not just the three that can error — it keeps
   each grid row the same height and stops the card growing on submit. */
const ERROR = "mt-1.5 min-h-4 text-xs leading-4 text-brick";

const PACKAGES = ["Standard", "Advanced", "Not sure yet"];

export default function ContactForm() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  // Nothing is flagged until the first submit attempt — validating on blur
  // scolds people for fields they have simply not finished yet. Derived rather
  // than stored, so once errors ARE showing they clear live as you fix them.
  const errors: Errors = submitted ? validate(values) : {};

  const set = <K extends keyof Values>(key: K, value: Values[K]) =>
    setValues((v) => ({ ...v, [key]: value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (Object.keys(validate(values)).length > 0) return;

    setBusy(true);
    try {
      await submitEnquiry({ ...values, mobile: `+91${values.mobile}` });
      setDone(true);
    } finally {
      setBusy(false);
    }
  };

  /* Active state is the border itself going green — same 1px stroke as at
     rest, so nothing thickens or shifts. The global 2px offset outline is
     suppressed for form fields in globals.css. */
  const border = (field: Required) =>
    errors[field] ? "border-brick" : "border-sand-200 focus:border-forest-700";

  const groupBorder = (field: Required) =>
    errors[field]
      ? "border-brick"
      : "border-sand-200 focus-within:border-forest-700";

  const describedBy = (field: Required) =>
    errors[field] ? `contact-${field}-error` : undefined;

  if (done) {
    return (
      <div className="grid min-h-[420px] place-content-center rounded-3xl border border-line bg-ink-raised p-8 text-center sm:p-12">
        <h2 className="h-display text-3xl text-cream sm:text-4xl">
          We&rsquo;ll be in <span className="accent-word">touch</span>.
        </h2>
        <p className="mx-auto mt-5 max-w-sm text-base leading-relaxed text-sand-600">
          Thanks {values.name.trim().split(" ")[0]} - a Mason advisor will
          call you on{" "}
          {/* nowrap so the number never splits across two lines */}
          <span className="whitespace-nowrap font-semibold text-cream">
            +91 {values.mobile}
          </span>{" "}
          within 24 hours.
        </p>
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => {
              setValues(EMPTY);
              setSubmitted(false);
              setDone(false);
            }}
            className={ctaClass({ variant: "outline" })}
          >
            Send another enquiry
            <ArrowForward
              size={19}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-3xl border border-line bg-ink-raised p-6 sm:p-8 lg:p-10"
    >
      <div className="grid gap-x-5 gap-y-1 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={LABEL}>
            Full name
            <span aria-hidden="true" className="text-brick">
              *
            </span>
          </label>
          <input
            id="contact-name"
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
          <p id="contact-name-error" aria-live="polite" className={ERROR}>
            {errors.name}
          </p>
        </div>

        <div>
          <label htmlFor="contact-email" className={LABEL}>
            Email address
            <span aria-hidden="true" className="text-brick">
              *
            </span>
          </label>
          <input
            id="contact-email"
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
          <p id="contact-email-error" aria-live="polite" className={ERROR}>
            {errors.email}
          </p>
        </div>

        <div>
          <label htmlFor="contact-mobile" className={LABEL}>
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
              id="contact-mobile"
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
          <p id="contact-mobile-error" aria-live="polite" className={ERROR}>
            {errors.mobile}
          </p>
        </div>

        <div>
          <label htmlFor="contact-package" className={LABEL}>
            Package you&rsquo;re considering
            <span className={OPTIONAL}>optional</span>
          </label>
          {/* appearance-none + our own chevron: the native arrow is a different
              grey on every platform and sat outside the design system. */}
          <div className="relative">
            <select
              id="contact-package"
              name="package"
              value={values.packageInterest}
              onChange={(e) => set("packageInterest", e.target.value)}
              className={`${FIELD} appearance-none border-sand-200 pr-11 focus:border-forest-700 focus:outline-none ${
                values.packageInterest ? "" : "text-sand-400"
              }`}
            >
              <option value="">Choose a package</option>
              {PACKAGES.map((p) => (
                <option key={p} value={p} className="text-cream">
                  {p}
                </option>
              ))}
            </select>
            {/* mt-2 on the field means the chevron centres on the field, not
                the label + field box. */}
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-2 h-[calc(100%-0.5rem)] w-4 text-sand-400"
              fill="none"
            >
              <path
                d="M7 10l5 5 5-5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p className={ERROR} />
        </div>

        <div>
          <label htmlFor="contact-date" className={LABEL}>
            Preferred visit date
            <span className={OPTIONAL}>optional</span>
          </label>
          <input
            id="contact-date"
            name="date"
            type="date"
            value={values.preferredDate}
            onChange={(e) => set("preferredDate", e.target.value)}
            className={`${INPUT} border-sand-200 focus:border-forest-700 ${
              values.preferredDate ? "" : "text-sand-400"
            }`}
          />
          <p className={ERROR} />
        </div>

        <div>
          <label htmlFor="contact-city" className={LABEL}>
            City
            <span className={OPTIONAL}>optional</span>
          </label>
          <input
            id="contact-city"
            name="city"
            autoComplete="address-level2"
            value={values.city}
            onChange={(e) => set("city", e.target.value)}
            placeholder="Delhi"
            className={`${INPUT} border-sand-200 focus:border-forest-700`}
          />
          <p className={ERROR} />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="contact-message" className={LABEL}>
            Anything we should know
            <span className={OPTIONAL}>optional</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={4}
            value={values.message}
            onChange={(e) => set("message", e.target.value)}
            placeholder="Who the bathroom is for, any mobility concerns, or a question about the packages."
            className={`${INPUT} resize-y border-sand-200 leading-relaxed focus:border-forest-700`}
          />
          <p className={ERROR} />
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={busy}
          className={ctaClass({ className: "disabled:opacity-70" })}
        >
          {busy ? "Sending…" : "Send my enquiry"}
          <ArrowForward
            size={19}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </button>
        <p className="max-w-xs text-xs leading-relaxed text-sand-400">
          We only use these details to get back to you. No spam, and the
          safety visit itself is free.
        </p>
      </div>
    </form>
  );
}

"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { ctaClass } from "./Cta";
import { smoothScroll } from "./SmoothScroll";

/* ===========================================================================
   INTEGRATION POINTS — the only two places that talk to anything external.
   Everything else in this file is UI.
   =========================================================================== */

export type BookingValues = {
  name: string;
  mobile: string;
  email: string;
  /** Whatever your location code hands back. Null when not captured. */
  location: string | null;
};

/**
 * Drop your existing location code in here. Return a short label to show the
 * user (village/area/city, a formatted address — whatever you resolve to), or
 * null if it could not be captured. The UI already handles idle, pending,
 * captured and unavailable states around it.
 */
async function requestLocation(): Promise<string | null> {
  return null;
}

/** No endpoint exists yet — nothing is sent anywhere. Wire this up. */
async function submitBooking(values: BookingValues): Promise<void> {
  console.info("[booking] submit", values);
}

/* ========================================================================= */

type BookingContextValue = { open: () => void };
const BookingContext = createContext<BookingContextValue | null>(null);

/** Null when no provider is mounted, so Cta can fall back to a plain link. */
export function useBooking() {
  return useContext(BookingContext);
}

type Field = "name" | "mobile" | "email";
type Errors = Partial<Record<Field, string>>;

/* Shared with the contact form so the two never validate the same field
   differently. */
export const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Field holds only the 10 national digits — +91 is shown statically beside it.
 *  A leading 91/0 is stripped only when the input is too long, because a valid
 *  Indian mobile can itself begin "91" (they start 6-9). */
export function toTenDigits(raw: string) {
  let d = raw.replace(/\D/g, "");
  if (d.length > 10 && d.startsWith("91")) d = d.slice(2);
  if (d.length > 10 && d.startsWith("0")) d = d.slice(1);
  return d.slice(0, 10);
}

function validate(values: Pick<BookingValues, Field>): Errors {
  const errors: Errors = {};

  if (values.name.trim().length < 2) {
    errors.name = "Please enter your full name.";
  }

  if (values.mobile.length !== 10) {
    errors.mobile = "Enter a 10-digit mobile number.";
  }

  if (!EMAIL.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  return errors;
}

const LABEL = "block text-sm font-semibold text-cream";
const FIELD =
  "mt-2 w-full rounded-xl border bg-white px-4 py-3 transition-colors duration-150";
const INPUT = `${FIELD} text-base text-cream placeholder:text-sand-400 focus:outline-none`;
/* The mobile field wraps a static +91, so its active state comes from the
   container (focus-within) rather than the input itself. */
const GROUP = `${FIELD} flex items-center gap-2.5`;

export default function BookingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Nothing is flagged until the first submit attempt — validating on blur
  // scolds people for fields they have simply not finished yet. Derived rather
  // than stored, so once errors ARE showing they clear live as you fix them.
  const errors: Errors = submitted ? validate({ name, mobile, email }) : {};

  const [location, setLocation] = useState<string | null>(null);
  const [locState, setLocState] = useState<
    "idle" | "pending" | "set" | "unavailable"
  >("idle");

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  // Drive the native dialog from state, and pause Lenis so the page behind
  // does not scroll under the modal.
  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;

    if (isOpen) {
      if (!el.open) el.showModal();
      smoothScroll.current?.stop();
    } else {
      if (el.open) el.close();
      smoothScroll.current?.start();
    }
  }, [isOpen]);

  // ESC and backdrop dismissal close the dialog directly — keep state in sync.
  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    const onClose = () => setIsOpen(false);
    el.addEventListener("close", onClose);
    return () => el.removeEventListener("close", onClose);
  }, []);

  const reset = () => {
    setName("");
    setMobile("");
    setEmail("");
    setSubmitted(false);
    setLocation(null);
    setLocState("idle");
    setDone(false);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const found = validate({ name, mobile, email });
    if (Object.keys(found).length > 0) return;

    setBusy(true);
    try {
      await submitBooking({ name, mobile: `+91${mobile}`, email, location });
      setDone(true);
    } finally {
      setBusy(false);
    }
  };

  const onLocation = async () => {
    setLocState("pending");
    try {
      const label = await requestLocation();
      if (label) {
        setLocation(label);
        setLocState("set");
      } else {
        setLocState("unavailable");
      }
    } catch {
      setLocState("unavailable");
    }
  };


  /* Active state is the border itself going green — same 1px stroke as at
     rest, so nothing thickens or shifts. The harshness before came from the
     global 2px offset outline, which is now suppressed for form fields. */
  const fieldBorder = (field: Field) =>
    errors[field] ? "border-brick" : "border-sand-200 focus:border-forest-700";

  /* focus-within, so focusing the input lights up the whole +91 container
     rather than just the typing area. */
  const groupBorder = (field: Field) =>
    errors[field]
      ? "border-brick"
      : "border-sand-200 focus-within:border-forest-700";

  const describedBy = (field: Field) =>
    errors[field] ? `${field}-error` : undefined;

  return (
    <BookingContext.Provider value={{ open }}>
      {children}

      <dialog
        ref={dialogRef}
        aria-labelledby="booking-title"
        onClick={(e) => {
          // click on the backdrop (the dialog element itself) dismisses
          if (e.target === dialogRef.current) close();
        }}
        className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-md overflow-y-auto rounded-3xl bg-sand-50 p-0 text-cream backdrop:bg-cream/70 backdrop:backdrop-blur-sm"
      >
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            {/* Both states are title -> content -> button, so the header is the
                same height either way and the close button never shifts. */}
            <div>
              <h2
                id="booking-title"
                /* Success gets a step up: it is the whole message on that
                   screen, where the form title is just a label above fields. */
                className={`font-display font-extrabold leading-tight tracking-tight text-cream ${
                  done ? "text-3xl" : "text-2xl"
                }`}
              >
                {done ? (
                  <>
                    We&rsquo;ll be in <span className="accent-word">touch</span>.
                  </>
                ) : (
                  /* Deliberately plain and identical to the button that opened
                     it — the title confirms the action you just took. */
                  "Book a Safety Visit"
                )}
              </h2>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="-mr-1 -mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full text-sand-400 transition-colors duration-150 hover:bg-sand-100 hover:text-cream"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </button>
          </div>

          {done ? (
            <div className="mt-6">
              <p className="text-sm leading-relaxed text-sand-600">
                Thanks {name.trim().split(" ")[0]} - our team will call you
                on{" "}
                {/* nowrap so the number never splits across two lines */}
                <span className="whitespace-nowrap font-semibold text-cream">
                  +91 {mobile}
                </span>{" "}
                to arrange the visit
              </p>
              <button
                type="button"
                onClick={() => {
                  close();
                  reset();
                }}
                className={`${ctaClass({ size: "block" })} mt-7`}
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="mt-6">
              <div>
                <label htmlFor="name" className={LABEL}>
                  Full name
                  <span aria-hidden="true" className="text-brick">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  aria-invalid={!!errors.name}
                  aria-describedby={describedBy("name")}
                  placeholder="Priya Sharma"
                  className={`${INPUT} ${fieldBorder("name")}`}
                />
                <p
                  id="name-error"
                  aria-live="polite"
                  className="mt-1.5 min-h-4 text-xs leading-4 text-brick"
                >
                  {errors.name}
                </p>
              </div>

              <div className="mt-3">
                <label htmlFor="mobile" className={LABEL}>
                  Mobile number
                  <span aria-hidden="true" className="text-brick">*</span>
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
                    id="mobile"
                    name="mobile"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    required
                    value={mobile}
                    onChange={(e) => setMobile(toTenDigits(e.target.value))}
                    aria-invalid={!!errors.mobile}
                    aria-describedby={describedBy("mobile")}
                    placeholder="98765 43210"
                    className="w-full bg-transparent text-base text-cream placeholder:text-sand-400 focus:outline-none"
                  />
                </div>
                <p
                  id="mobile-error"
                  aria-live="polite"
                  className="mt-1.5 min-h-4 text-xs leading-4 text-brick"
                >
                  {errors.mobile}
                </p>
              </div>

              <div className="mt-3">
                <label htmlFor="email" className={LABEL}>
                  Email address
                  <span aria-hidden="true" className="text-brick">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={!!errors.email}
                  aria-describedby={describedBy("email")}
                  placeholder="priya@example.com"
                  className={`${INPUT} ${fieldBorder("email")}`}
                />
                <p
                  id="email-error"
                  aria-live="polite"
                  className="mt-1.5 min-h-4 text-xs leading-4 text-brick"
                >
                  {errors.email}
                </p>
              </div>

              {/* Location — optional. The button calls requestLocation() at the
                  top of this file; all four states are already designed. */}
              <div className="mt-3">
                <span className={LABEL}>Location</span>
                <div className="mt-2 rounded-xl border border-sand-200 bg-white p-3">
                  {locState === "set" && location ? (
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm text-cream">{location}</span>
                      <button
                        type="button"
                        onClick={() => {
                          setLocation(null);
                          setLocState("idle");
                        }}
                        className="shrink-0 text-xs font-semibold text-sand-400 transition-colors duration-150 hover:text-cream"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={onLocation}
                        disabled={locState === "pending"}
                        className="flex w-full items-center gap-2.5 text-left text-sm font-semibold text-forest-700 transition-opacity duration-150 disabled:opacity-60"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          className="h-[18px] w-[18px] shrink-0"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z" />
                        </svg>
                        {locState === "pending"
                          ? "Getting your location…"
                          : "Use my current location"}
                      </button>
                      {locState === "unavailable" && (
                        <p className="mt-2 text-xs leading-relaxed text-sand-400">
                          Couldn&rsquo;t get your location. You can still book
                          - we&rsquo;ll confirm the address on the call.
                        </p>
                      )}
                    </>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={busy}
                className={`${ctaClass({ size: "block" })} mt-7 disabled:opacity-70`}
              >
                {busy ? "Sending…" : "Request my visit"}
              </button>

              {/* Centred under the full-width button. The break is explicit
                  rather than left to text-balance, which stranded "visit" at
                  the start of the second line. */}
              <p className="mt-4 text-center text-xs leading-relaxed text-sand-400">
                We only use these details to arrange your visit
                <br />
                No spam, and the visit itself is free
              </p>
            </form>
          )}
        </div>
      </dialog>
    </BookingContext.Provider>
  );
}

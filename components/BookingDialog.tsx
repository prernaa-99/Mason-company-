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
import LocationField from "./LocationField";

/* ===========================================================================
   INTEGRATION POINT — the only place in this file that talks to anything
   external. Everything else here is UI. The location capture used to sit
   beside it and now lives in LocationField, next to the four states it drives.
   =========================================================================== */

export type BookingValues = {
  name: string;
  mobile: string;
  email: string;
  /** Whatever your location code hands back. Null when not captured. */
  location: string | null;
};

/** No endpoint exists yet — nothing is sent anywhere. Wire this up.
 *
 *  Exported because the Safer strip's inline form books the same visit. Two
 *  surfaces, one request: a second stub next to this one is a second thing to
 *  remember when the endpoint finally lands, and the one that gets forgotten
 *  fails silently. */
export async function submitBooking(values: BookingValues): Promise<void> {
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
  /* Bumped on reset to remount LocationField, which owns its own capture
     state — clearing the label here is only half of it. */
  const [locKey, setLocKey] = useState(0);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  // Drive the native dialog from state, and pause Lenis so the page behind
  // does not scroll under the modal.
  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;

    if (isOpen) {
      if (!el.open) el.showModal();
      // showModal() focuses the first focusable child, which here is the close
      // button — so the sheet opened with a green focus ring drawn around the
      // X, reading as a selected state nobody chose. Moving focus to the
      // dialog itself keeps the ring off (a programmatic focus on a
      // tabindex="-1" container does not match :focus-visible) while still
      // putting the tab sequence inside the dialog, which is the part that
      // actually matters.
      // preventScroll: focus() scrolls its target into view by default, and
      // the page behind is mid-scroll when the sheet opens.
      el.focus({ preventScroll: true });
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
    setLocKey((k) => k + 1);
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
        /* Focusable only programmatically — the target for the el.focus()
           above, and never a stop in the tab order. */
        tabIndex={-1}
        onClick={(e) => {
          // click on the backdrop (the dialog element itself) dismisses
          if (e.target === dialogRef.current) close();
        }}
        /* Bottom sheet on a phone, centred panel from sm. A form you reached
           by tapping a button at the bottom of the screen should open from
           that edge and stay in thumb reach — a centred card asks the hand to
           travel to the middle of the display and leaves a strip of dead page
           under it. m-0 mt-auto is what does it: the UA gives a modal dialog
           inset:0 with margin:auto, so zeroing every margin but the top drops
           it to the bottom edge, full width. max-w-none is needed to clear the
           UA's own max-width. */
        /* flex column with overflow-hidden, not a single scrolling box: the
           fields scroll, the submit does not. Capped at 88dvh, a box that
           scrolls as a whole puts the one button the sheet exists for below
           the fold on any short viewport, with nothing to say it is there. */
        /* svh, not dvh. dvh tracks Safari's collapsing toolbars, so the sheet
           would resize under the thumb as the page behind it moves; svh is the
           smallest the viewport ever gets, which is the one height that always
           fits above the browser chrome. */
        /* open:flex, never a bare flex. The browser hides a closed dialog with
           `dialog:not([open]) { display: none }` — a UA rule, which any author
           display utility outrides. So an unconditional flex left the sheet
           rendered in normal flow at the end of the document, sitting below the
           footer as a 587px slab of form. Gating it on [open] means the UA rule
           still governs the closed state, and the open state is a flex column
           the way it needs to be. */
        className="m-0 mt-auto max-h-[88svh] w-full max-w-none animate-[sheet-in_320ms_cubic-bezier(0.22,1,0.36,1)] flex-col overflow-hidden rounded-t-3xl bg-sand-50 p-0 text-cream backdrop:bg-cream/70 backdrop:backdrop-blur-sm open:flex motion-reduce:animate-none sm:m-auto sm:max-h-[calc(100svh-2rem)] sm:w-[calc(100%-2rem)] sm:max-w-md sm:animate-[panel-in_200ms_ease-out] sm:rounded-3xl"
      >
        {/* Grabber. Purely a signal — the sheet is dismissed by the close
            button, the backdrop or Escape, not by dragging — but it is the
            one mark that tells you at a glance this is a sheet and not the
            page having jumped. */}
        <div
          aria-hidden="true"
          className="flex shrink-0 justify-center pt-3 sm:hidden"
        >
          <span className="h-1 w-10 rounded-full bg-sand-200" />
        </div>

        {/* flex-auto (flex: 1 1 auto), never flex-1 (flex: 1 1 0%), on this and
            the two boxes inside it. The dialog's own height is content-based
            with only a cap above it, and Safari does not give a zero-basis
            child any intrinsic contribution in an auto-height column — so on
            iOS the whole form collapsed to nothing and the sheet opened as a
            bare title bar. An auto basis means the content still measures
            itself; min-h-0 keeps it able to shrink and scroll once the cap
            bites. Chrome sized it from content either way, which is why this
            only showed up on the phone. */}
        <div className="flex min-h-0 flex-auto flex-col p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:p-8">
          <div className="flex shrink-0 items-start justify-between gap-4">
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
                    We&rsquo;ll be in <span className="accent-word">touch</span>
                    .
                  </>
                ) : (
                  /* Deliberately plain, and the same words as the button that
                     opened it — the title confirms the action you just took.
                     It is also the honest description of what this sheet does:
                     it takes a number and someone rings it. Nothing here books
                     anything by itself. */
                  "Request a Callback"
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
                Thanks {name.trim().split(" ")[0]} - our team will call you on{" "}
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
            <form
              onSubmit={onSubmit}
              noValidate
              className="mt-6 flex min-h-0 flex-auto flex-col"
            >
              {/* data-lenis-prevent: Lenis binds wheel on the window and
                  preventDefaults it, so a wheel over this box scrolled
                  nothing — stop() pauses the page tween but does not release
                  the event. The attribute is how Lenis is told an element
                  owns its own scrolling. overscroll-contain then keeps
                  reaching the end of the fields from chaining out to the page
                  behind the sheet.

                  px-1 -mx-1 so the 2px focus ring on a field at the edge of
                  the scrollport isn't shaved off by the overflow. */}
              <div
                data-lenis-prevent
                /* pb-5 so the last field clears the pinned footer's hairline
                   instead of sitting on it — the rule needs air on both
                   sides, and the scrollport's own end is the only place to
                   put the space above it. */
                className="-mx-1 min-h-0 flex-auto overflow-y-auto overscroll-contain px-1 pb-5"
              >
                <div>
                  <label htmlFor="name" className={LABEL}>
                    Full name
                    <span aria-hidden="true" className="text-brick">
                      *
                    </span>
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
                    <span aria-hidden="true" className="text-brick">
                      *
                    </span>
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

                {/* Location — optional. LocationField owns the capture and
                    all four of its states; this only keeps the label for
                    submit. */}
                <LocationField
                  key={locKey}
                  onChange={setLocation}
                  className="mt-3"
                />
              </div>

              {/* Pinned. The hairline is what marks it as pinned rather than
                  merely last — without it, fields scrolling under the button
                  look truncated instead of continuing.

                  Two lines of "we only use these details to arrange your visit"
                  used to sit under the button. On a sheet the vertical budget
                  is the whole design, and reassurance that costs 56px of it is
                  reassurance the sheet cannot afford — the service-area line is
                  already carrying that job, in place beside the field it
                  answers. pt-4 now the button is the only thing here. */}
              <div className="shrink-0 border-t border-sand-200 pt-4">
                <button
                  type="submit"
                  disabled={busy}
                  className={`${ctaClass({ size: "block" })} disabled:opacity-70`}
                >
                  {busy ? "Sending…" : "Request my callback"}
                </button>
              </div>
            </form>
          )}
        </div>
      </dialog>
    </BookingContext.Provider>
  );
}

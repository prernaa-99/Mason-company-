"use client";

import { useState } from "react";
import ServiceArea from "./ServiceArea";

/* ===========================================================================
   INTEGRATION POINT — the browser's side of the location capture.
   =========================================================================== */

/**
 * Drop your existing location code in here. Return a short label to show the
 * user (village/area/city, a formatted address — whatever you resolve to), or
 * null if it could not be captured. The four states around it — idle, pending,
 * captured, unavailable — are already designed below.
 */
export async function requestLocation(): Promise<string | null> {
  return null;
}

/* ========================================================================= */

/* The location capture, in one file because two forms take a booking now: the
   dialog and the Safer strip. Four states and a permission prompt is not a
   thing to keep two copies of — the copy that isn't in front of you is the one
   that stops matching.

   It owns its own state and reports the resolved label upward, so a parent
   only holds what it needs at submit time. To clear it, remount with a
   changed key: the parent is already resetting a form when that happens, and
   a reset prop would be a second way to say the same thing. */

const LABEL = "block text-sm font-semibold text-cream";

export default function LocationField({
  onChange,
  className = "",
}: {
  /** Fires with the resolved label, or null when cleared. */
  onChange: (location: string | null) => void;
  className?: string;
}) {
  const [location, setLocation] = useState<string | null>(null);
  const [state, setState] = useState<"idle" | "pending" | "set" | "unavailable">(
    "idle"
  );

  const set = (value: string | null) => {
    setLocation(value);
    onChange(value);
  };

  const onRequest = async () => {
    setState("pending");
    try {
      const label = await requestLocation();
      if (label) {
        set(label);
        setState("set");
      } else {
        setState("unavailable");
      }
    } catch {
      setState("unavailable");
    }
  };

  return (
    <div className={className}>
      <span className={LABEL}>Location</span>
      <div className="mt-2 rounded-xl border border-sand-200 bg-white p-3">
        {state === "set" && location ? (
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm text-cream">{location}</span>
            <button
              type="button"
              onClick={() => {
                set(null);
                setState("idle");
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
              onClick={onRequest}
              disabled={state === "pending"}
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
              {state === "pending"
                ? "Getting your location…"
                : "Use my current location"}
            </button>
            {state === "unavailable" && (
              <p className="mt-2 text-xs leading-relaxed text-sand-400">
                Couldn&rsquo;t get your location. You can still book - we&rsquo;ll
                confirm the address on the call.
              </p>
            )}
          </>
        )}
      </div>

      {/* Here rather than under the submit: "do you even come to my city?" is a
          question about this field, and answering it in place keeps five lines
          of fine print from piling up after the CTA. */}
      <ServiceArea className="mt-2" />
    </div>
  );
}

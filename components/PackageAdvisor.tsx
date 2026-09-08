"use client";

import { useId, useState } from "react";
import Cta, { ctaClass } from "./Cta";
import { PACKAGES } from "./packages-data";
import { KIT } from "./kit";

/* For the person who cannot answer "Standard or Advanced?" because nothing on
   the page asks them anything.

   The honest basis for the whole thing: both packages install the identical
   kit, and the only difference is a safety check-up a year on. So every
   question here is a different way of asking one thing — will anyone be there
   to notice if something works loose? That is why the weights run the way they
   do, and why the result explains itself in those terms rather than reciting
   features. A quiz that recommended on anything else would be theatre. */

type Option = { label: string; weight: number };
type Question = { id: string; prompt: string; options: Option[] };

/* weight: how much the answer argues for the year-on check-up. */
const QUESTIONS: Question[] = [
  {
    id: "who",
    prompt: "Who is the bathroom for?",
    options: [
      { label: "A parent living on their own", weight: 2 },
      { label: "A parent living with family", weight: 1 },
      { label: "Myself", weight: 0 },
    ],
  },
  {
    id: "near",
    prompt: "How often would you be there to spot a problem?",
    options: [
      { label: "I'm in another city", weight: 2 },
      { label: "Same city, but not day to day", weight: 1 },
      { label: "I live in the same home", weight: 0 },
    ],
  },
  {
    id: "history",
    prompt: "Has there been a fall or a near-miss already?",
    options: [
      { label: "Yes", weight: 2 },
      { label: "A stumble or two", weight: 1 },
      { label: "Not so far", weight: 0 },
    ],
  },
];

/* 3 of a possible 6. Two mild signals, or one strong one plus anything, and
   the check-up starts paying for itself. */
const THRESHOLD = 3;

const ADVANCED = PACKAGES.find((p) => p.featured)!;
const STANDARD = PACKAGES.find((p) => !p.featured)!;

/** The line under the verdict. Reads back the answer that drove it, so the
 *  recommendation is arguable rather than oracular.
 *
 *  Takes weights, not the chosen indices — the two are easy to confuse here
 *  because the options happen to be ordered strongest-first, so index 0 is
 *  weight 2. Reading indices as weights inverts every test in this function
 *  and prints the Standard explanation under an Advanced verdict. */
function reason(weights: number[], advanced: boolean): string {
  const [who, near, history] = weights;

  /* Branch on the verdict first. Reading the strong signals alone leaves a
     hole: three middling answers total 3, which recommends Advanced without
     any one of them tripping a test below — and the function then fell
     through to the Standard line, printing an argument against the package it
     had just recommended. */
  if (!advanced) {
    return "You're there day to day, so you'll notice anything that shifts long before a check-up would. The installation is the part that matters.";
  }

  if (history === 2) {
    return "After a fall, the year-on check-up is the part that keeps an upgrade working as well in month twelve as it did on day one.";
  }
  if (near === 2) {
    return "From another city you won't see a fitting work loose. The check-up a year on is how it gets caught anyway.";
  }
  if (who === 2) {
    return "Living alone, there is nobody to mention that something has started to move. That is what the year-on visit is for.";
  }
  return "No single thing here, but between them there is enough distance from that bathroom that a check-up a year on earns its place.";
}

export default function PackageAdvisor() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    QUESTIONS.map(() => null)
  );
  const uid = useId();

  const done = step >= QUESTIONS.length;
  const current = QUESTIONS[step];
  const picked = done ? null : answers[step];

  /* The one derived value both the verdict and its explanation read from, so
     they cannot be computed from different things. */
  const weights = answers.map((a, i) =>
    a === null ? 0 : QUESTIONS[i].options[a].weight
  );
  const score = weights.reduce((sum, w) => sum + w, 0);
  const pkg = score >= THRESHOLD ? ADVANCED : STANDARD;

  const choose = (i: number) =>
    setAnswers((prev) => prev.map((a, n) => (n === step ? i : a)));

  const restart = () => {
    setAnswers(QUESTIONS.map(() => null));
    setStep(0);
  };

  return (
    <div className="rounded-3xl bg-sand-50 p-6 sm:p-8 lg:p-10">
      {done ? (
        <div>
          <p className="eyebrow mb-4">Our suggestion</p>
          <h3 className="h-display text-3xl text-cream sm:text-4xl">
            We&rsquo;d suggest{" "}
            <span className="accent-word">{pkg.name}</span>.
          </h3>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-sand-600">
            {reason(weights, pkg === ADVANCED)}
          </p>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-sand-400">
            {/* Said again here on purpose: a recommendation is the moment
                someone starts wondering what they'd be giving up by picking
                the other one. Nothing, is the answer. */}
            Either way you get the same {KIT.length} upgrades, installed and
            handed over by the same team.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Cta href="#book" className="w-full justify-center sm:w-auto">
              {pkg.cta}
            </Cta>
            <button
              type="button"
              onClick={restart}
              className={ctaClass({
                variant: "outline",
                className: "w-full justify-center sm:w-auto",
              })}
            >
              Start again
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <p className="eyebrow">Not sure which package?</p>
            <p className="font-mono-label text-xs text-sand-400">
              Step {step + 1} of {QUESTIONS.length}
            </p>
          </div>

          {/* Progress. aria-hidden because "Step 1 of 3" above already says it
              in words — the bar is the same fact, drawn. */}
          <div
            aria-hidden="true"
            className="mt-4 h-0.5 w-full overflow-hidden rounded-full bg-sand-200"
          >
            <span
              /* step + 1, so the bar agrees with the "Step 1 of 3" beside it.
                 Measuring questions *answered* instead leaves the rail empty
                 on the first screen, which reads as a component that failed to
                 load rather than as progress not yet made. */
              className="block h-full rounded-full bg-forest-700 transition-[width] duration-300 ease-out"
              style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
            />
          </div>

          {/* fieldset/legend rather than a heading and divs: this is a single
              choice out of three, and a screen reader should hear the question
              again with each option rather than three orphaned labels. */}
          <fieldset className="mt-7">
            <legend className="font-display text-xl font-semibold leading-snug text-cream sm:text-2xl">
              {current.prompt}
            </legend>

            <div className="mt-5 space-y-3">
              {current.options.map((opt, i) => {
                const id = `${uid}-${current.id}-${i}`;
                const on = picked === i;
                return (
                  <label
                    key={opt.label}
                    htmlFor={id}
                    /* has-[:focus-visible] puts the ring on the tile — the
                       input itself is visually hidden, so keyboard focus would
                       otherwise land on nothing you can see. */
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3.5 text-base transition-colors duration-150 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent ${
                      on
                        ? "border-forest-700 bg-accent-tint text-cream"
                        : "border-sand-200 bg-white text-cream hover:border-sand-400"
                    }`}
                  >
                    <input
                      id={id}
                      type="radio"
                      name={`${uid}-${current.id}`}
                      checked={on}
                      onChange={() => choose(i)}
                      className="sr-only"
                    />
                    <span
                      aria-hidden="true"
                      className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border transition-colors duration-150 ${
                        on ? "border-forest-700" : "border-sand-400"
                      }`}
                    >
                      {on && (
                        <span className="h-2.5 w-2.5 rounded-full bg-forest-700" />
                      )}
                    </span>
                    {opt.label}
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div className="mt-7 flex items-center gap-4">
            {step > 0 && (
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="text-sm font-semibold text-sand-600 transition-colors duration-150 hover:text-cream"
              >
                Back
              </button>
            )}
            <button
              type="button"
              disabled={picked === null}
              onClick={() => setStep((s) => s + 1)}
              /* Disabled rather than absent: a button that appears once you
                 answer moves the thing you are about to click. */
              /* No w-full: Back sits in the same row, and a full-width
                 sibling would push it off the line on a narrow phone. */
              className={ctaClass({
                className: "ml-auto justify-center disabled:opacity-40",
              })}
            >
              {step === QUESTIONS.length - 1 ? "See my suggestion" : "Next"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

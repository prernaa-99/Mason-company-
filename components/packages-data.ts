import { KIT } from "./kit";

/* What separates Standard from Advanced — which is to say, one row out of four.
   Shared by the homepage cards and the /packages comparison table so the offer
   is stated once and cannot drift between the two. */

export type PackageRow = {
  label: string;
  standard: boolean;
  advanced: boolean;
};

export const PACKAGE_ROWS: PackageRow[] = [
  {
    label: `${KIT.length} safety upgrades installed`,
    standard: true,
    advanced: true,
  },
  {
    label: "Installed by trained Mason experts",
    standard: true,
    advanced: true,
  },
  { label: "Inspection and final walkthrough", standard: true, advanced: true },
  { label: "One-year safety check-up visit", standard: false, advanced: true },
];

export type Package = {
  name: string;
  badge: string;
  featured: boolean;
  bestFor: string;
  outcome: string;
  cta: string;
};

/* Lives here rather than in Packages.tsx because /packages describes the same
   two packages and must not word them differently. */
export const PACKAGES: Package[] = [
  {
    name: "Standard",
    badge: "The complete kit",
    featured: false,
    bestFor:
      "The full safety upgrade, installed, inspected and handed over in one go.",
    outcome:
      "A complete everyday safety upgrade for steadier movement, better grip, and more confidence at home.",
    cta: "Book Standard",
  },
  {
    name: "Advanced",
    badge: "The complete kit, plus a year of cover",
    featured: true,
    bestFor:
      "The same installation, with a safety check-up a year on to catch anything that has worked loose.",
    outcome:
      "The same upgrade, looked after - so it stays as safe as the day it was fitted.",
    cta: "Book Advanced",
  },
];

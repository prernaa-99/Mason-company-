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
    label: `All ${KIT.length} safety upgrades installed`,
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
